"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

const registerFormSchema = z.object({
  username: z.string().min(3, { message: "O nome de usuário deve ter no mínimo 3 caracteres." }),
  email: z.string().email({ message: "E-mail inválido." }),
  password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),
  confirmPassword: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"],
})

type RegisterFormValues = z.infer<typeof registerFormSchema>

export function RegisterForm() {
  const router = useRouter()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: RegisterFormValues) {
    // Simulação de cadastro
    if (values.username && values.email && values.password) {
      toast({
        title: "Cadastro bem-sucedido!",
        description: "Você será redirecionado para a página de login.",
      })
      router.push("/auth/login")
    } else {
      toast({
        title: "Erro no Cadastro",
        description: "Ocorreu um erro ao tentar cadastrar. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md bg-slate-800 p-8 rounded-lg shadow-lg space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-yellow-500 p-3 rounded-xl">
            <Shield className="h-8 w-8 text-black" />
          </div>
          <h1 className="text-2xl font-bold text-white">Cadastro</h1>
          <p className="text-slate-400 text-sm">Crie sua conta</p>
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Usuário</FormLabel>
                <FormControl>
                  <Input placeholder="nome_de_usuario" {...field} className="bg-slate-700 border-slate-600 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Email</FormLabel>
                <FormControl>
                  <Input placeholder="m@example.com" {...field} className="bg-slate-700 border-slate-600 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Senha</FormLabel>
                <FormControl>
                  <Input type="password" {...field} className="bg-slate-700 border-slate-600 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-300">Confirmar Senha</FormLabel>
                <FormControl>
                  <Input type="password" {...field} className="bg-slate-700 border-slate-600 text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Registrar</Button>
        </div>

        <div className="text-center text-sm text-slate-400">
          Já tem uma conta?{" "}
          <Link href="/auth/login" className="underline text-blue-400">
            Entrar
          </Link>
        </div>
      </form>
    </Form>
  )
} 
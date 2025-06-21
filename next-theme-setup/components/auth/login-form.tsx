"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Logo from "@/assets/Logo.jpeg"
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

const loginFormSchema = z.object({
  email: z.string().email({ message: "E-mail inválido." }),
  password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),
})

type LoginFormValues = z.infer<typeof loginFormSchema>

export function LoginForm() {
  const router = useRouter()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: LoginFormValues) {
    // Simulação de login
    if (values.email === "test@example.com" && values.password === "password") {
      toast({
        title: "Login bem-sucedido!",
        description: "Você será redirecionado para o dashboard.",
      })
      router.push("/dashboard")
    } else {
      toast({
        title: "Erro de Login",
        description: "E-mail ou senha inválidos.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md bg-slate-800 p-8 rounded-lg shadow-lg space-y-6"         style={{ backgroundColor: '#073F5A' }}
>
        <div className="flex flex-col items-center space-y-2">
          <Image 
            src={Logo}
            alt="Logo"
            width={123}  // ou o tamanho que você quiser
            height={123}
            className="rounded-[8px]" // border-radius de 25px
          />
          <h1 className="text-2xl font-bold text-white">Login</h1>
          <p className="text-slate-400 text-sm">Acesse sua conta para continuar</p>
        </div>

        <div className="space-y-4">
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
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Entrar</Button>
        </div>

        <div className="text-center text-sm text-slate-400">
          Não tem uma conta?{" "}
          <Link href="/auth/register" className="underline text-blue-400">
            Cadastre-se
          </Link>
        </div>
      </form>
    </Form>
  )
} 
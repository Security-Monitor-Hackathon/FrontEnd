"use client"

import { Shield, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"
import Logo from "@/assets/Logo.jpeg"

export function DashboardHeader() {
  const router = useRouter()

  const handleLogout = () => {
    toast({
      title: "Logout realizado!",
      description: "Você foi desconectado.",
    })
    router.push("/auth/login")
  }

  const handleMenuItemClick = (item: string) => {
    toast({
      title: `${item} em desenvolvimento`,
      description: `A funcionalidade de ${item.toLowerCase()} ainda não está disponível.`,
    })
  }

  return (
    <header className="bg-slate-900 text-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image 
          src={Logo}
          alt="Logo"
          width={43}  // ou o tamanho que você quiser
          height={43}
          className="rounded-[8px]" // border-radius de 25px
        />
        <h1 className="text-xl font-semibold">Security Monitor</h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-slate-800">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-slate-700 text-white text-sm">JT</AvatarFallback>
            </Avatar>
            <span>Joaquim T.</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => handleMenuItemClick("Perfil")}>
            <User className="mr-2 h-4 w-4" />
            Perfil
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuItemClick("Configurações")}>Configurações</DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

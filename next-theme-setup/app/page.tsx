import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-yellow-500 p-4 rounded-2xl">
            <Shield className="h-12 w-12 text-black" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">Security Monitor</h1>
          <p className="text-xl text-slate-300">Dashboard de Monitoramento de Segurança</p>
        </div>

        <div className="space-y-4">
          <p className="text-slate-400 max-w-md mx-auto">
            Sistema completo de monitoramento com mapas interativos, análise de riscos e relatórios em tempo real.
          </p>

          <Link href="/auth/login">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Entrar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

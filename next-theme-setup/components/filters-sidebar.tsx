"use client"

import { useState } from "react"
import { Filter, Calendar, MapPin, AlertTriangle, Eye, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

export function FiltersSidebar() {
  const [riskLevel, setRiskLevel] = useState([50])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const locationTypes = [
    { id: "shopping", label: "Shopping Centers", count: 12 },
    { id: "restaurants", label: "Restaurantes", count: 8 },
    { id: "parks", label: "Parques", count: 5 },
    { id: "schools", label: "Escolas", count: 15 },
    { id: "hospitals", label: "Hospitais", count: 3 },
    { id: "banks", label: "Bancos", count: 7 },
  ]

  const toggleType = (typeId: string) => {
    setSelectedTypes((prev) => (prev.includes(typeId) ? prev.filter((id) => id !== typeId) : [...prev, typeId]))
  }

  return (
    <div className="w-80 bg-slate-900 text-white p-4 overflow-y-auto">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Filtros</h2>
      </div>

      <div className="space-y-6">
        {/* Período */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2 text-white">
              <Calendar className="h-4 w-4" />
              Período
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select defaultValue="today">
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Esta Semana</SelectItem>
                <SelectItem value="month">Este Mês</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Tipos de Local */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2 text-white">
              <MapPin className="h-4 w-4" />
              Tipos de Local
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {locationTypes.map((type) => (
              <div key={type.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={type.id}
                    checked={selectedTypes.includes(type.id)}
                    onCheckedChange={() => toggleType(type.id)}
                    className="border-slate-600"
                  />
                  <label htmlFor={type.id} className="text-sm text-white cursor-pointer">
                    {type.label}
                  </label>
                </div>
                <Badge variant="secondary" className="bg-slate-700 text-white">
                  {type.count}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Nível de Risco */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2 text-white">
              <AlertTriangle className="h-4 w-4" />
              Nível de Risco
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Baixo</span>
                <span>Alto</span>
              </div>
              <Slider value={riskLevel} onValueChange={setRiskLevel} max={100} step={1} className="w-full" />
              <div className="text-center text-sm text-slate-300">Nível: {riskLevel[0]}%</div>
            </div>
          </CardContent>
        </Card>

        {/* Qualidade da Iluminação */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2 text-white">
              <Eye className="h-4 w-4" />
              Iluminação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select defaultValue="all">
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Níveis</SelectItem>
                <SelectItem value="excellent">Excelente</SelectItem>
                <SelectItem value="good">Boa</SelectItem>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="poor">Ruim</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Horário */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2 text-white">
              <Clock className="h-4 w-4" />
              Horário
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select defaultValue="all">
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todo o Dia</SelectItem>
                <SelectItem value="morning">Manhã (6h-12h)</SelectItem>
                <SelectItem value="afternoon">Tarde (12h-18h)</SelectItem>
                <SelectItem value="evening">Noite (18h-24h)</SelectItem>
                <SelectItem value="dawn">Madrugada (0h-6h)</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="space-y-2">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">Aplicar Filtros</Button>
          <Button variant="outline" className="w-full border-slate-600 text-white hover:bg-slate-800">
            Limpar Filtros
          </Button>
        </div>
      </div>
    </div>
  )
}

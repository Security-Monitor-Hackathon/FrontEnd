"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const riskData = [
  { name: "Baixo", value: 45, color: "#22c55e" },
  { name: "Moderado", value: 35, color: "#eab308" },
  { name: "Alto", value: 20, color: "#ef4444" },
]

const lightingData = [
  { name: "Excelente", value: 30, color: "#22c55e" },
  { name: "Boa", value: 40, color: "#84cc16" },
  { name: "Regular", value: 20, color: "#eab308" },
  { name: "Ruim", value: 10, color: "#ef4444" },
]

const cptedData = [
  { category: "Vigilância Natural", score: 0.8 },
  { category: "Controle de Acesso", score: 0.6 },
  { category: "Manutenção", score: 0.9 },
  { category: "Territorialidade", score: 0.7 },
  { category: "Atividade", score: 0.5 },
]

export function ChartsSection() {
  return (
    <div className="bg-slate-900 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Distribuição do Índice CPTED Geral */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-white text-base !text-base">Distribuição do Índice CPTED Geral</CardTitle>
            <p className="text-slate-400 text-xs">Contagem por Nível de Risco</p>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={cptedData} margin={{ top: 10, right: 15, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="category"
                  tick={{ fill: "#9ca3af", fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} domain={[0, 1]} />
                <Bar dataKey="score" fill="#3b82f6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Qualidade da Iluminação nos Locais */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-white text-base !text-base">Qualidade da Iluminação nos Locais</CardTitle>
            <p className="text-slate-400 text-xs">Proporção por Nível de Iluminação</p>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center justify-between">
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie
                    data={lightingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {lightingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="space-y-2">
                {lightingData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <div className="text-white">
                      <div className="text-xs font-medium">{item.name}</div>
                      <div className="text-xs text-slate-400">{item.value}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
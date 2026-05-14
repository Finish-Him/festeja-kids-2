import SupervisorLayout from "@/components/SupervisorLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { formatCurrency } from "@/const";
import { PartyPopper, DollarSign, TrendingUp, Calendar, CheckCircle2, Clock } from "lucide-react";

export default function DashboardSupervisor() {
  const { data: stats, isLoading } = trpc.festas.stats.useQuery();

  // Calcular métricas do mês atual
  const mesAtual = new Date().toLocaleString("pt-BR", { month: "long", year: "numeric" });

  if (isLoading) {
    return (
      <SupervisorLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
        </div>
      </SupervisorLayout>
    );
  }

  const cards = [
    {
      title: "Contratos Fechados",
      value: stats?.total || 0,
      subtitle: "Total de festas cadastradas",
      icon: PartyPopper,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Valores Arrecadados",
      value: formatCurrency((stats?.valorTotal || 0) - (stats?.valorAReceber || 0)),
      subtitle: "Pagamentos recebidos",
      icon: DollarSign,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Festas Realizadas",
      value: stats?.realizadas || 0,
      subtitle: "Eventos já concluídos",
      icon: CheckCircle2,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Festas a Realizar",
      value: stats?.agendadas || 0,
      subtitle: "Eventos agendados",
      icon: Clock,
      gradient: "from-orange-500 to-yellow-500",
    },
  ];

  return (
    <SupervisorLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              📊 Dashboard do Mês
            </h1>
            <p className="text-gray-600 text-lg capitalize">{mesAtual}</p>
          </div>

          {/* Cards de Métricas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Card key={index} className="border-2 border-purple-200 hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-gray-600">
                        {card.title}
                      </CardTitle>
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${card.gradient}`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold mb-1">
                      {card.value}
                    </div>
                    <p className="text-xs text-gray-500">
                      {card.subtitle}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Resumo Financeiro */}
          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-green-600" />
                Resumo Financeiro
              </CardTitle>
              <CardDescription>Visão geral dos valores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 font-medium">Valor Recebido</p>
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency((stats?.valorTotal || 0) - (stats?.valorAReceber || 0))}
                  </p>
                  <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-600 rounded-full"
                      style={{ 
                        width: `${((stats?.valorTotal || 0) - (stats?.valorAReceber || 0)) / (stats?.valorTotal || 1) * 100}%` 
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 font-medium">Valor a Receber</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {formatCurrency(stats?.valorAReceber || 0)}
                  </p>
                  <div className="h-2 bg-orange-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-orange-600 rounded-full"
                      style={{ 
                        width: `${(stats?.valorAReceber || 0) / (stats?.valorTotal || 1) * 100}%` 
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 font-medium">Faturamento Total</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {formatCurrency(stats?.valorTotal || 0)}
                  </p>
                  <div className="h-2 bg-purple-200 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full w-full" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ticket Médio e Meta */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-cyan-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-cyan-600" />
                  Ticket Médio
                </CardTitle>
                <CardDescription>Valor médio por festa</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-cyan-600">
                  {formatCurrency(stats?.ticketMedio || 0)}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Baseado em {stats?.realizadas || 0} festas realizadas
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-pink-600" />
                  Próximas Festas
                </CardTitle>
                <CardDescription>Eventos nos próximos 7 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-pink-600">
                  {stats?.agendadas || 0}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Festas agendadas para realizar
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SupervisorLayout>
  );
}

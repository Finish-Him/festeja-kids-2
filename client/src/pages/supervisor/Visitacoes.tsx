import SupervisorLayout from "@/components/SupervisorLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { formatCurrency, formatDate } from "@/const";
import { Users, Phone, Mail, Calendar, DollarSign, Plus, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function VisitacoesSupervisor() {
  const [, setLocation] = useLocation();
  const { data: visitacoes, isLoading } = trpc.visitacoes.list.useQuery();

  if (isLoading) {
    return (
      <SupervisorLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
        </div>
      </SupervisorLayout>
    );
  }

  const pendentes = visitacoes?.filter((v: any) => v.status === "aguardando_retorno") || [];
  const convertidas = visitacoes?.filter((v: any) => v.status === "convertido") || [];

  return (
    <SupervisorLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                👥 Visitações
              </h1>
              <p className="text-gray-600 mt-1">Gerencie leads e conversões</p>
            </div>
            <Button
              onClick={() => setLocation("/visitacoes")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Visitação
            </Button>
          </div>

          {/* Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600">Total de Visitações</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-purple-600">{visitacoes?.length || 0}</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600">Aguardando Retorno</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-orange-600">{pendentes.length}</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600">Convertidas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-green-600">{convertidas.length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Visitações Pendentes */}
          <Card className="border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                Aguardando Retorno ({pendentes.length})
              </CardTitle>
              <CardDescription>Leads que precisam de acompanhamento</CardDescription>
            </CardHeader>
            <CardContent>
              {pendentes.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Nenhuma visitação pendente</p>
              ) : (
                <div className="space-y-4">
                  {pendentes.map((visitacao: any) => (
                    <Card key={visitacao.id} className="border border-orange-200 bg-orange-50">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <Users className="h-5 w-5 text-orange-600" />
                              <p className="font-semibold text-lg">{visitacao.nomeCliente}</p>
                            </div>
                            {visitacao.telefone && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Phone className="h-4 w-4" />
                                <p className="text-sm">{visitacao.telefone}</p>
                              </div>
                            )}
                            {visitacao.email && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <Mail className="h-4 w-4" />
                                <p className="text-sm">{visitacao.email}</p>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <p className="text-sm">Visitação: {formatDate(visitacao.dataVisitacao)}</p>
                            </div>
                            {visitacao.valorEstimado && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <DollarSign className="h-4 w-4" />
                                <p className="text-sm">Valor estimado: {formatCurrency(visitacao.valorEstimado)}</p>
                              </div>
                            )}
                            {visitacao.observacoes && (
                              <p className="text-sm text-gray-600 mt-2 italic">{visitacao.observacoes}</p>
                            )}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setLocation(`/visitacoes/converter/${visitacao.id}`)}
                            className="border-green-200 text-green-600 hover:bg-green-50"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Converter
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Visitações Convertidas */}
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Convertidas ({convertidas.length})
              </CardTitle>
              <CardDescription>Leads que viraram contratos</CardDescription>
            </CardHeader>
            <CardContent>
              {convertidas.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Nenhuma visitação convertida ainda</p>
              ) : (
                <div className="space-y-4">
                  {convertidas.map((visitacao: any) => (
                    <Card key={visitacao.id} className="border border-green-200 bg-green-50">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <Users className="h-5 w-5 text-green-600" />
                              <p className="font-semibold text-lg">{visitacao.nomeCliente}</p>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <p className="text-sm">Visitação: {formatDate(visitacao.dataVisitacao)}</p>
                            </div>
                            {visitacao.valorEstimado && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <DollarSign className="h-4 w-4" />
                                <p className="text-sm">Valor: {formatCurrency(visitacao.valorEstimado)}</p>
                              </div>
                            )}
                          </div>
                          <div className="px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-full">
                            Convertida
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </SupervisorLayout>
  );
}

import SupervisorLayout from "@/components/SupervisorLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Download } from "lucide-react";
import { useLocation } from "wouter";

export default function ContratosSupervisor() {
  const [, setLocation] = useLocation();

  return (
    <SupervisorLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                📄 Contratos
              </h1>
              <p className="text-gray-600 mt-1">Registre festas e gere contratos PDF</p>
            </div>
            <Button
              onClick={() => setLocation("/festas/nova")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Festa
            </Button>
          </div>

          {/* Instruções */}
          <Card className="border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-purple-600" />
                Como Registrar uma Nova Festa
              </CardTitle>
              <CardDescription>Siga os passos abaixo para criar um contrato</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Preencha os Dados do Cliente</p>
                    <p className="text-sm text-gray-600">Nome, CPF, telefone e endereço do contratante</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Defina os Detalhes da Festa</p>
                    <p className="text-sm text-gray-600">Data do evento, tema, aniversariante, número de convidados</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Configure Valores e Pagamento</p>
                    <p className="text-sm text-gray-600">Valor total, forma de pagamento e observações</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Gere o Contrato PDF</p>
                    <p className="text-sm text-gray-600">Após salvar, você poderá gerar e imprimir o contrato</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-purple-200">
                <Button
                  onClick={() => setLocation("/festas/nova")}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-6 text-lg"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Registrar Nova Festa
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Funcionalidades Futuras */}
          <Card className="border-2 border-cyan-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-6 w-6 text-cyan-600" />
                Funcionalidades em Desenvolvimento
              </CardTitle>
              <CardDescription>Recursos que serão adicionados em breve</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                  <p className="text-gray-700">Geração automática de PDF do contrato</p>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                  <p className="text-gray-700">Modelo de contrato personalizável</p>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                  <p className="text-gray-700">Envio de contrato por e-mail</p>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                  <p className="text-gray-700">Assinatura digital de contratos</p>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                  <p className="text-gray-700">Histórico de contratos gerados</p>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Atalhos Rápidos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-purple-200 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setLocation("/festas")}>
              <CardContent className="pt-6 text-center">
                <FileText className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                <p className="font-semibold text-gray-800">Ver Todas as Festas</p>
                <p className="text-sm text-gray-600 mt-1">Consultar festas cadastradas</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-200 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setLocation("/clientes")}>
              <CardContent className="pt-6 text-center">
                <FileText className="h-12 w-12 text-pink-600 mx-auto mb-3" />
                <p className="font-semibold text-gray-800">Ver Clientes</p>
                <p className="text-sm text-gray-600 mt-1">Consultar cadastro de clientes</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-cyan-200 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setLocation("/calendario")}>
              <CardContent className="pt-6 text-center">
                <FileText className="h-12 w-12 text-cyan-600 mx-auto mb-3" />
                <p className="font-semibold text-gray-800">Calendário</p>
                <p className="text-sm text-gray-600 mt-1">Visualizar agenda de festas</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SupervisorLayout>
  );
}

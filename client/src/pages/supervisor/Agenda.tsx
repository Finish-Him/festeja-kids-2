import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Users, DollarSign, MessageSquare, Plus, Trash2, Phone } from "lucide-react";
import { toast } from "sonner";
import { formatCurrency, formatDate } from "@/const";
import SupervisorLayout from "@/components/SupervisorLayout";

export default function AgendaSupervisor() {
  const [selectedFestaId, setSelectedFestaId] = useState<number | null>(null);
  const [novoFuncionario, setNovoFuncionario] = useState({ nome: "", telefone: "", funcao: "" });
  const [novaObservacao, setNovaObservacao] = useState({ tipo: "geral" as const, texto: "" });

  // Queries
  const { data: festas, isLoading: loadingFestas } = trpc.festas.list.useQuery();
  const { data: funcionarios, refetch: refetchFuncionarios } = trpc.agenda.listarFuncionarios.useQuery(
    { festaId: selectedFestaId! },
    { enabled: !!selectedFestaId }
  );
  const { data: observacoes, refetch: refetchObservacoes } = trpc.agenda.listarObservacoes.useQuery(
    { festaId: selectedFestaId! },
    { enabled: !!selectedFestaId }
  );
  const { data: allPagamentos } = trpc.pagamentos.listAll.useQuery();
  const pagamentos = allPagamentos?.filter((p: any) => p.festaId === selectedFestaId);

  // Mutations
  const adicionarFuncionarioMutation = trpc.agenda.adicionarFuncionario.useMutation({
    onSuccess: () => {
      toast.success("Funcionário adicionado!");
      refetchFuncionarios();
      setNovoFuncionario({ nome: "", telefone: "", funcao: "" });
    },
  });

  const removerFuncionarioMutation = trpc.agenda.removerFuncionario.useMutation({
    onSuccess: () => {
      toast.success("Funcionário removido!");
      refetchFuncionarios();
    },
  });

  const adicionarObservacaoMutation = trpc.agenda.adicionarObservacao.useMutation({
    onSuccess: () => {
      toast.success("Observação adicionada!");
      refetchObservacoes();
      setNovaObservacao({ tipo: "geral", texto: "" });
    },
  });

  const removerObservacaoMutation = trpc.agenda.removerObservacao.useMutation({
    onSuccess: () => {
      toast.success("Observação removida!");
      refetchObservacoes();
    },
  });

  const festaAtual = festas?.find((f: any) => f.id === selectedFestaId);

  const handleAdicionarFuncionario = () => {
    if (!selectedFestaId || !novoFuncionario.nome || !novoFuncionario.funcao) {
      toast.error("Preencha nome e função");
      return;
    }
    adicionarFuncionarioMutation.mutate({
      festaId: selectedFestaId,
      ...novoFuncionario,
    });
  };

  const handleAdicionarObservacao = () => {
    if (!selectedFestaId || !novaObservacao.texto) {
      toast.error("Preencha o texto da observação");
      return;
    }
    adicionarObservacaoMutation.mutate({
      festaId: selectedFestaId,
      ...novaObservacao,
    });
  };

  return (
    <SupervisorLayout>
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              📅 Agenda
            </h1>
            <p className="text-gray-600 mt-1">Gerencie festas, funcionários e observações</p>
          </div>
        </div>

        {/* Seletor de Festa */}
        <Card className="border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              Selecionar Festa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={selectedFestaId?.toString() || ""}
              onValueChange={(value) => setSelectedFestaId(Number(value))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Escolha uma festa..." />
              </SelectTrigger>
              <SelectContent>
                {loadingFestas ? (
                  <SelectItem value="loading" disabled>
                    Carregando...
                  </SelectItem>
                ) : (
                  festas?.map((festa: any) => (
                    <SelectItem key={festa.id} value={festa.id.toString()}>
                      {formatDate(festa.dataFesta)} - {festa.tema} ({festa.nomeAniversariante})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {selectedFestaId && festaAtual && (
          <>
            {/* Info da Festa */}
            <Card className="border-2 border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50">
              <CardHeader>
                <CardTitle>{festaAtual.tema}</CardTitle>
                <CardDescription>
                  {formatDate(festaAtual.dataFesta)} • {festaAtual.numeroConvidados} convidados •{" "}
                  {formatCurrency(festaAtual.valorTotal)}
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Funcionários */}
              <Card className="border-2 border-cyan-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-cyan-600" />
                    Funcionários na Festa
                  </CardTitle>
                  <CardDescription>Equipe alocada para este evento</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Lista de Funcionários */}
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {funcionarios?.length === 0 && (
                      <p className="text-gray-500 text-center py-4">Nenhum funcionário alocado</p>
                    )}
                    {funcionarios?.map((func) => (
                      <div
                        key={func.id}
                        className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg border border-cyan-200"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{func.nome}</p>
                          <p className="text-sm text-gray-600">{func.funcao}</p>
                          {func.telefone && (
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <Phone className="h-3 w-3" />
                              {func.telefone}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removerFuncionarioMutation.mutate({ id: func.id })}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {/* Adicionar Funcionário */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar Funcionário
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Adicionar Funcionário</DialogTitle>
                        <DialogDescription>Alocar um funcionário para esta festa</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Nome *</Label>
                          <Input
                            value={novoFuncionario.nome}
                            onChange={(e) => setNovoFuncionario({ ...novoFuncionario, nome: e.target.value })}
                            placeholder="Nome completo"
                          />
                        </div>
                        <div>
                          <Label>Telefone</Label>
                          <Input
                            value={novoFuncionario.telefone}
                            onChange={(e) => setNovoFuncionario({ ...novoFuncionario, telefone: e.target.value })}
                            placeholder="(00) 00000-0000"
                          />
                        </div>
                        <div>
                          <Label>Função *</Label>
                          <Select
                            value={novoFuncionario.funcao}
                            onValueChange={(value) => setNovoFuncionario({ ...novoFuncionario, funcao: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a função" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Decoradora">Decoradora</SelectItem>
                              <SelectItem value="Assistente">Assistente</SelectItem>
                              <SelectItem value="Garçom">Garçom</SelectItem>
                              <SelectItem value="Cozinheiro">Cozinheiro</SelectItem>
                              <SelectItem value="Segurança">Segurança</SelectItem>
                              <SelectItem value="Recreador">Recreador</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={handleAdicionarFuncionario} className="w-full">
                          Adicionar
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              {/* Pagamentos */}
              <Card className="border-2 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    Pagamentos Recebidos
                  </CardTitle>
                  <CardDescription>Histórico de pagamentos desta festa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {pagamentos?.length === 0 && (
                      <p className="text-gray-500 text-center py-4">Nenhum pagamento registrado</p>
                    )}
                    {pagamentos?.map((pag: any) => (
                      <div
                        key={pag.id}
                        className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
                      >
                        <div>
                          <p className="font-semibold text-gray-800">{formatCurrency(pag.valor)}</p>
                          <p className="text-sm text-gray-600">{formatDate(pag.dataPagamento)}</p>
                          <p className="text-sm text-gray-500">{pag.formaPagamento}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Observações */}
            <Card className="border-2 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-yellow-600" />
                  Observações
                </CardTitle>
                <CardDescription>Notas e lembretes sobre esta festa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Lista de Observações */}
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {observacoes?.length === 0 && (
                    <p className="text-gray-500 text-center py-4">Nenhuma observação registrada</p>
                  )}
                  {observacoes?.map((obs) => (
                    <div
                      key={obs.id}
                      className={`p-3 rounded-lg border ${
                        obs.tipo === "urgente"
                          ? "bg-red-50 border-red-300"
                          : obs.tipo === "pagamento"
                          ? "bg-green-50 border-green-300"
                          : "bg-yellow-50 border-yellow-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">{obs.tipo}</p>
                          <p className="text-gray-800">{obs.texto}</p>
                          <p className="text-xs text-gray-500 mt-1">{formatDate(obs.createdAt)}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removerObservacaoMutation.mutate({ id: obs.id })}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Adicionar Observação */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Nova Observação
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Nova Observação</DialogTitle>
                      <DialogDescription>Adicionar nota ou lembrete sobre esta festa</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Tipo</Label>
                        <Select
                          value={novaObservacao.tipo}
                          onValueChange={(value: any) => setNovaObservacao({ ...novaObservacao, tipo: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="geral">Geral</SelectItem>
                            <SelectItem value="pagamento">Pagamento</SelectItem>
                            <SelectItem value="decoracao">Decoração</SelectItem>
                            <SelectItem value="buffet">Buffet</SelectItem>
                            <SelectItem value="urgente">Urgente</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Texto *</Label>
                        <Textarea
                          value={novaObservacao.texto}
                          onChange={(e) => setNovaObservacao({ ...novaObservacao, texto: e.target.value })}
                          placeholder="Digite a observação..."
                          rows={4}
                        />
                      </div>
                      <Button onClick={handleAdicionarObservacao} className="w-full">
                        Adicionar
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
    </SupervisorLayout>
  );
}

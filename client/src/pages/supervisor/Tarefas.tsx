import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";
import SupervisorLayout from "@/components/SupervisorLayout";

export default function TarefasSupervisor() {
  return (
    <SupervisorLayout>
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="border-2 border-yellow-200">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Construction className="h-16 w-16 text-yellow-600" />
            </div>
            <CardTitle className="text-3xl">Tarefas</CardTitle>
            <CardDescription className="text-lg">Em Desenvolvimento</CardDescription>
          </CardHeader>
          <CardContent className="text-center text-gray-600">
            <p>Esta funcionalidade está sendo desenvolvida.</p>
            <p className="mt-2">Em breve você poderá:</p>
            <ul className="mt-4 space-y-2 text-left max-w-md mx-auto">
              <li>✅ Criar tarefas</li>
              <li>✅ Atribuir responsáveis</li>
              <li>✅ Vincular tarefas à agenda</li>
              <li>✅ Acompanhar status de conclusão</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
    </SupervisorLayout>
  );
}

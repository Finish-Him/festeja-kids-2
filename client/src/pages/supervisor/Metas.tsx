import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";
import SupervisorLayout from "@/components/SupervisorLayout";

export default function MetasSupervisor() {
  return (
    <SupervisorLayout>
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="border-2 border-blue-200">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Construction className="h-16 w-16 text-blue-600" />
            </div>
            <CardTitle className="text-3xl">Metas</CardTitle>
            <CardDescription className="text-lg">Em Desenvolvimento</CardDescription>
          </CardHeader>
          <CardContent className="text-center text-gray-600">
            <p>Esta funcionalidade está sendo desenvolvida.</p>
            <p className="mt-2">Em breve você poderá:</p>
            <ul className="mt-4 space-y-2 text-left max-w-md mx-auto">
              <li>📊 Definir metas mensais</li>
              <li>📈 Acompanhar progresso</li>
              <li>🎯 Visualizar indicadores</li>
              <li>💰 Metas de faturamento</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
    </SupervisorLayout>
  );
}

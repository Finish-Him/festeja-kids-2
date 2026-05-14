import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO } from "@/const";
import { useLocation } from "wouter";
import { User, Shield } from "lucide-react";

export default function UserSelector() {
  const [, setLocation] = useLocation();

  const handleSelectUser = (role: string) => {
    // Simular login (sem autenticação real por enquanto)
    localStorage.setItem("currentUser", role);
    
    if (role === "admin") {
      setLocation("/dashboard");
    } else if (role === "supervisor") {
      setLocation("/supervisor/agenda");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-cyan-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        {/* Logo e Título */}
        <div className="text-center space-y-4">
          <img src={APP_LOGO} alt="Festeja Kids" className="w-32 h-32 mx-auto rounded-2xl shadow-2xl" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
            Festeja Kids 2.0
          </h1>
          <p className="text-xl text-gray-600">Sistema de Gestão de Festas Infantis</p>
        </div>

        {/* Seletor de Usuário */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Admin - Moises */}
          <Card className="border-4 border-purple-300 hover:border-purple-500 transition-all hover:shadow-2xl cursor-pointer group">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                  <Shield className="h-12 w-12 text-purple-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-purple-700">Administrador</CardTitle>
              <CardDescription className="text-lg">Moises - Acesso Total</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                onClick={() => handleSelectUser("admin")}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-6 text-lg"
              >
                Entrar como Admin
              </Button>
              <p className="text-sm text-gray-500 mt-3">
                Dashboard completo, relatórios, configurações, usuários
              </p>
            </CardContent>
          </Card>

          {/* Supervisor - Gabriel */}
          <Card className="border-4 border-cyan-300 hover:border-cyan-500 transition-all hover:shadow-2xl cursor-pointer group">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-cyan-100 rounded-full group-hover:bg-cyan-200 transition-colors">
                  <User className="h-12 w-12 text-cyan-600" />
                </div>
              </div>
              <CardTitle className="text-2xl text-cyan-700">Supervisor</CardTitle>
              <CardDescription className="text-lg">Gabriel - Gestão Operacional</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                onClick={() => handleSelectUser("supervisor")}
                className="w-full bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-semibold py-6 text-lg"
              >
                Entrar como Supervisor
              </Button>
              <p className="text-sm text-gray-500 mt-3">
                Agenda, dashboard mensal, visitações, contratos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Nota de Desenvolvimento */}
        <Card className="border-2 border-yellow-300 bg-yellow-50">
          <CardContent className="pt-6">
            <p className="text-center text-gray-700">
              <span className="font-semibold">🚧 Modo de Desenvolvimento:</span> Seletor temporário para facilitar testes.
              Sistema de login será implementado posteriormente.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

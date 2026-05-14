import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE } from "@/const";
import { 
  Calendar, 
  LayoutDashboard, 
  Users, 
  FileText, 
  CheckSquare, 
  Target,
  LogOut,
  Menu
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface SupervisorLayoutProps {
  children: ReactNode;
}

export default function SupervisorLayout({ children }: SupervisorLayoutProps) {
  const [location, setLocation] = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setLocation("/");
  };

  const navItems = [
    { href: "/supervisor/agenda", label: "Agenda", icon: Calendar },
    { href: "/supervisor/dashboard", label: "Dashboard do Mês", icon: LayoutDashboard },
    { href: "/supervisor/visitacoes", label: "Visitações", icon: Users },
    { href: "/supervisor/contratos", label: "Contratos", icon: FileText },
    { href: "/supervisor/tarefas", label: "Tarefas", icon: CheckSquare },
    { href: "/supervisor/metas", label: "Metas", icon: Target },
  ];

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo e Título */}
      <div className="p-6 border-b border-purple-200">
        <div className="flex items-center gap-3">
          <img src={APP_LOGO} alt={APP_TITLE} className="w-12 h-12 rounded-lg" />
          <div>
            <h1 className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {APP_TITLE}
            </h1>
            <p className="text-xs text-gray-600">Supervisor</p>
          </div>
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start gap-3 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "hover:bg-purple-50"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-purple-200">
        <Button
          variant="outline"
          onClick={handleLogout}
          className="w-full justify-start gap-3 border-red-200 text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          Trocar Usuário
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-white border-r-4 border-purple-200 shadow-xl">
        <NavContent />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-purple-200 shadow-lg">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <img src={APP_LOGO} alt={APP_TITLE} className="w-10 h-10 rounded-lg" />
            <h1 className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {APP_TITLE}
            </h1>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <NavContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <main className="lg:pl-64 pt-20 lg:pt-0">
        {children}
      </main>
    </div>
  );
}

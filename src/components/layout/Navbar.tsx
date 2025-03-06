"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface NavbarProps {
	user?: {
		name: string;
		email: string;
	};
}

export function Navbar({ user = { name: "Admin Usuario", email: "admin@example.com" } }: NavbarProps) {
	// Función para obtener las iniciales del nombre
	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((part) => part[0])
			.join("")
			.toUpperCase()
			.substring(0, 2);
	};

	const handleLogout = () => {
		// Aquí iría la lógica para cerrar sesión
		console.log("Cerrando sesión...");
	};

	return (
		<header className="h-16 border-b bg-white flex items-center justify-between px-6">
			<div className="flex-1">{/* Espacio para título o breadcrumbs si se necesita */}</div>

			<div className="flex items-center gap-4">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="relative h-8 w-8 rounded-full">
							<Avatar className="h-8 w-8">
								<AvatarFallback className="bg-primary text-primary-foreground">{getInitials(user.name)}</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56" align="end" forceMount>
						<DropdownMenuLabel className="font-normal">
							<div className="flex flex-col space-y-1">
								<p className="text-sm font-medium leading-none">{user.name}</p>
								<p className="text-xs leading-none text-muted-foreground">{user.email}</p>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleLogout}>
							<LogOut className="mr-2 h-4 w-4" />
							<span>Cerrar sesión</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<Button variant="outline" size="sm" onClick={handleLogout}>
					<LogOut className="mr-2 h-4 w-4" />
					Cerrar sesión
				</Button>
			</div>
		</header>
	);
}

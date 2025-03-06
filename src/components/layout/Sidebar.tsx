"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import getIconByName from "@/lib/getIconByName";
import { Tooltip } from "@/components/ui/tooltip";

const sidebarLinks = [
	{
		name: "Empleados",
		href: "/gestion/empleados",
		icon: "FaUsers",
	},
	{
		name: "Áreas",
		href: "/gestion/areas",
		icon: "FaRegBuilding",
	},
	{
		name: "Puestos",
		href: "/gestion/puestos",
		icon: "MdOutlineWork",
	},
];

export function Sidebar() {
	const pathname = usePathname();
	const [collapsed] = useState(true);

	return (
		<div className={cn("flex flex-col h-screen bg-white border-r transition-all duration-300 ease-in-out", collapsed ? "w-16" : "w-64")}>
			<div className={cn("flex items-center p-4", collapsed ? "justify-center" : "justify-between")}>
				<h2 className={cn("font-bold text-lg", collapsed && "hidden")}>Madrid Marcaciones</h2>
				<div className="flex items-center justify-center h-8 w-8">
					<p>MI</p>
				</div>
			</div>

			<nav className={cn("flex-1", collapsed ? "px-1" : "p-2")}>
				<ul className="space-y-6">
					{sidebarLinks.map((link) => {
						const isActive = pathname === link.href;
						const Icon = getIconByName(link.icon);

						return (
							<li key={link.href} className="flex justify-center">
								<Tooltip content={link.name} disabled={!collapsed}>
									<Link
										href={link.href}
										className={cn(
											"flex items-center transition-colors",
											collapsed ? "justify-center h-10 w-10" : "gap-3 px-3 py-2 w-full",
											isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground hover:text-foreground",
											"rounded-md"
										)}
									>
										{Icon && <Icon className="h-4 w-4" />}
										<span className={cn("text-sm font-medium", collapsed && "hidden")}>{link.name}</span>
									</Link>
								</Tooltip>
							</li>
						);
					})}
				</ul>
			</nav>

			<div className="p-4 border-t">
				<div className={cn("text-xs text-muted-foreground", collapsed && "hidden")}>v1.0.0</div>
			</div>
		</div>
	);
}

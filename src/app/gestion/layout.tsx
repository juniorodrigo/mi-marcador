import type React from "react";
import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
	title: "Madrid Marcaciones",
	description: "Sistema de gestión empresarial",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex h-screen">
			<Sidebar />
			<div className="flex flex-col flex-1 overflow-hidden">
				<Navbar user={{ name: "Admin Usuario", email: "admin@example.com" }} />
				<main className="flex-1 overflow-auto p-6">
					<div className="mx-auto max-w-5xl">{children}</div>
				</main>
			</div>
		</div>
	);
}

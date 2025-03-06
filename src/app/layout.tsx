import "@/app/ui/globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import type React from "react";
import { siteConfig } from "@/config/site.config";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="es" suppressHydrationWarning>
			<body className={cn("min-h-screen bg-background", inter.className, "antialiased")}>
				<Toaster />
				{children}
			</body>
		</html>
	);
}

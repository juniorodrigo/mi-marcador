"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Breadcrumb } from "./Breadcrumb";
import { Button } from "@/components/ui/button";
import getIconByName from "@/lib/getIconByName";

export type ButtonProps = {
	label: string;
	onClick: () => void;
	icon?: string; // Ahora es un string que representa el nombre del ícono
	disabled?: boolean;
	className?: string;
	variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
};

export type PageHeaderTypes = {
	title: string;
	description?: string;
	breadcrumb?: { name: string; href?: string }[];
	className?: string;
	primaryButton?: ButtonProps;
	secondaryButton?: ButtonProps;
};

export default function PageHeader({ title, description, breadcrumb, children, className, primaryButton, secondaryButton }: React.PropsWithChildren<PageHeaderTypes>) {
	return (
		<header className={cn("pb-2 w-full xs:-mt-2 lg:mb-2", className)}>
			<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full">
				<div>
					<h2 className="mb-1 text-2xl font-bold lg:text-2xl 4xl:text-[26px]">{title}</h2>

					{/* Descripción opcional */}
					{description && <p className="text-sm text-muted-foreground mb-2 max-w-3xl">{description}</p>}

					{/* Breadcrumb con separador tipo "circle" (•) y clase flex-wrap */}
					{breadcrumb && (
						<Breadcrumb separator="" separatorVariant="circle" className="flex-wrap">
							{breadcrumb.map((item) => (
								<Breadcrumb.Item key={item.name} href={item.href}>
									{item.name}
								</Breadcrumb.Item>
							))}
						</Breadcrumb>
					)}
				</div>
				<div className="flex items-center mt-4 lg:mt-0">
					{secondaryButton && (
						<Button variant="secondary" onClick={secondaryButton.onClick} disabled={secondaryButton.disabled} className={cn(secondaryButton.className)}>
							{secondaryButton.icon && <span className="mr-2">{React.createElement(getIconByName(secondaryButton.icon) || "span", { size: 10 })}</span>}
							{secondaryButton.label}
						</Button>
					)}
					{primaryButton && (
						<Button
							variant="default"
							onClick={primaryButton.onClick}
							disabled={primaryButton.disabled}
							className={cn("bg-black text-white hover:bg-gray-800", primaryButton.className, secondaryButton ? "ml-2" : "")}
						>
							{primaryButton.icon && <span className="mr-2">{React.createElement(getIconByName(primaryButton.icon) || "span", { size: 10 })}</span>}
							{primaryButton.label}
						</Button>
					)}
					{children && <div className="ml-2">{children}</div>}
				</div>
			</div>
		</header>
	);
}

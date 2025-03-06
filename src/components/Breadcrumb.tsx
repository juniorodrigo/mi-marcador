'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface BreadcrumbItemProps {
	children: React.ReactNode;
	href?: string;
}

function BreadcrumbItem({ children, href }: BreadcrumbItemProps) {
	if (href) {
		return (
			<Link href={href} className="text-sm font-medium hover:underline text-primary">
				{children}
			</Link>
		);
	}

	return <span className="text-sm text-muted-foreground">{children}</span>;
}

export interface BreadcrumbProps {
	children: React.ReactNode;
	className?: string;
	separator?: string;
	separatorVariant?: 'circle' | 'slash' | 'none';
}

/**
 * Componente principal Breadcrumb. Recibe subcomponentes Breadcrumb.Item como hijos.
 */
export function Breadcrumb({ children, className, separator = '', separatorVariant = 'circle' }: BreadcrumbProps) {
	// Renderizamos cada hijo y entre cada uno, si no es el último,
	// mostramos el separador que elijas (por defecto es "•" si variant = circle).
	return (
		<nav aria-label="breadcrumb" className={cn('flex items-center space-x-2', className)}>
			{React.Children.map(children, (child, index) => {
				if (!React.isValidElement(child)) return child;
				const isLast = index === React.Children.count(children) - 1;

				// Determina el separador a usar
				let sep = separator;
				if (!sep) {
					if (separatorVariant === 'circle') {
						sep = '•';
					} else if (separatorVariant === 'slash') {
						sep = '/';
					} else {
						sep = ''; // 'none' u otra
					}
				}

				return (
					<div className="flex items-center">
						{child}
						{/* Si NO es el último item y la variante no es "none", mostramos separador */}
						{!isLast && separatorVariant !== 'none' && sep && <span className="mx-1 text-muted-foreground">{sep}</span>}
					</div>
				);
			})}
		</nav>
	);
}

// Exportamos también la propiedad estática para poder usar <Breadcrumb.Item />
Breadcrumb.Item = BreadcrumbItem;

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
	content: string;
	children: React.ReactNode;
	disabled?: boolean;
	position?: "top" | "right" | "bottom" | "left";
	delay?: number;
}

export function Tooltip({ content, children, disabled = false, position = "right", delay = 300 }: TooltipProps) {
	const [isVisible, setIsVisible] = React.useState(false);
	const [isMounted, setIsMounted] = React.useState(false);
	const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

	React.useEffect(() => {
		setIsMounted(true);
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const handleMouseEnter = React.useCallback(() => {
		if (disabled) return;
		timeoutRef.current = setTimeout(() => {
			setIsVisible(true);
		}, delay);
	}, [disabled, delay]);

	const handleMouseLeave = React.useCallback(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		setIsVisible(false);
	}, []);

	const positionStyles = {
		top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
		right: "left-full top-1/2 -translate-y-1/2 ml-2",
		bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
		left: "right-full top-1/2 -translate-y-1/2 mr-2",
	};

	if (!isMounted) return <>{children}</>;

	return (
		<div className="relative inline-flex" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onFocus={handleMouseEnter} onBlur={handleMouseLeave}>
			{children}
			{isVisible && !disabled && (
				<div
					className={cn(
						"absolute z-50 px-3 py-2 text-sm font-medium text-white bg-zinc-800 rounded-md shadow-md",
						"animate-in fade-in-50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
						positionStyles[position]
					)}
					style={{ maxWidth: "200px" }}
				>
					{content}
					<div
						className={cn(
							"absolute w-2 h-2 bg-zinc-800 rotate-45",
							position === "top" && "top-full left-1/2 -translate-x-1/2 -translate-y-1/2",
							position === "right" && "right-full top-1/2 translate-x-1/2 -translate-y-1/2",
							position === "bottom" && "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2",
							position === "left" && "left-full top-1/2 -translate-x-1/2 -translate-y-1/2"
						)}
					/>
				</div>
			)}
		</div>
	);
}

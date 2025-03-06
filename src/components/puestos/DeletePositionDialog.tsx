"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import type { Position } from "@/types/position";

interface DeletePositionDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	position: Position | null;
	onConfirm: (position: Position) => void;
}

export function DeletePositionDialog({ open, onOpenChange, position, onConfirm }: DeletePositionDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
					<AlertDialogDescription>
						Esta acción {position?.is_unactive ? "activará" : "desactivará"} el puesto "{position?.position_name}".
						{!position?.is_unactive && " El puesto no estará disponible para nuevas asignaciones."}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction onClick={() => position && onConfirm(position)}>{position?.is_unactive ? "Activar" : "Desactivar"}</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

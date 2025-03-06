"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import type { Department } from "@/types/department";

interface DeleteDepartmentDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	department: Department | null;
	onConfirm: (department: Department) => void;
}

export function DeleteDepartmentDialog({ open, onOpenChange, department, onConfirm }: DeleteDepartmentDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
					<AlertDialogDescription>
						Esta acción {department?.is_unactive ? "activará" : "desactivará"} el área "{department?.dept_name}".
						{!department?.is_unactive && " El área no estará disponible para nuevas asignaciones."}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction onClick={() => department && onConfirm(department)}>{department?.is_unactive ? "Activar" : "Desactivar"}</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

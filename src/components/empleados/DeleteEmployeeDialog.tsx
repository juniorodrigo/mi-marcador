"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Employee } from "@/types/employee";

interface DeleteEmployeeDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	employee: Employee | null;
	onConfirm: (employee: Employee) => void;
}

export function DeleteEmployeeDialog({ open, onOpenChange, employee, onConfirm }: DeleteEmployeeDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
					<AlertDialogDescription>
						Esta acción {employee?.is_active ? "desactivará" : "activará"} al empleado "{employee?.first_name} {employee?.last_name}".
						{employee?.is_active && " El empleado no estará disponible para nuevas asignaciones."}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction onClick={() => employee && onConfirm(employee)}>{employee?.is_active ? "Desactivar" : "Activar"}</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

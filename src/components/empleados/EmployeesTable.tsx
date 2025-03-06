"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import type { Employee } from "@/types/employee";
import { Badge } from "@/components/ui/badge";

interface EmployeesTableProps {
	employees: Employee[];
	onEdit: (employee: Employee) => void;
	onDelete: (employee: Employee) => void;
}

export function EmployeesTable({ employees, onEdit, onDelete }: EmployeesTableProps) {
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Código</TableHead>
						<TableHead>Nombre</TableHead>
						<TableHead>Área</TableHead>
						<TableHead>Puesto</TableHead>
						<TableHead>Fecha Contratación</TableHead>
						<TableHead>Estado</TableHead>
						<TableHead className="text-right">Acciones</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{employees.length === 0 ? (
						<TableRow>
							<TableCell colSpan={7} className="h-24 text-center">
								No hay empleados registrados.
							</TableCell>
						</TableRow>
					) : (
						employees.map((employee) => (
							<TableRow key={employee.id}>
								<TableCell className="font-medium">{employee.emp_code}</TableCell>
								<TableCell>{`${employee.first_name} ${employee.last_name}`}</TableCell>
								<TableCell>{employee.personnel_department?.dept_name || "-"}</TableCell>
								<TableCell>{employee.personnel_position?.position_name || "-"}</TableCell>
								<TableCell>{employee.hire_date ? format(new Date(employee.hire_date), "dd/MM/yyyy", { locale: es }) : "-"}</TableCell>
								<TableCell>
									<Badge variant={employee.is_active ? "success" : "destructive"}>{employee.is_active ? "Activo" : "Inactivo"}</Badge>
								</TableCell>
								<TableCell className="text-right">
									<div className="flex justify-end gap-2">
										<Button variant="outline" size="icon" onClick={() => onEdit(employee)}>
											<Edit className="h-4 w-4" />
											<span className="sr-only">Editar</span>
										</Button>
										<Button variant="outline" size="icon" onClick={() => onDelete(employee)}>
											<Trash2 className="h-4 w-4" />
											<span className="sr-only">Eliminar</span>
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}

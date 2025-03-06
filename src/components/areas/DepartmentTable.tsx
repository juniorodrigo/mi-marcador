"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import type { Department } from "@/types/department";
import { Badge } from "@/components/ui/badge";

interface DepartmentsTableProps {
	departments: Department[];
	onEdit: (department: Department) => void;
	onDelete: (department: Department) => void;
}

export function DepartmentsTable({ departments, onEdit, onDelete }: DepartmentsTableProps) {
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Código</TableHead>
						<TableHead>Nombre</TableHead>
						<TableHead>Departamento Padre</TableHead>
						<TableHead>Estado</TableHead>
						<TableHead>Por defecto</TableHead>
						<TableHead className="text-right">Acciones</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{departments.length === 0 ? (
						<TableRow>
							<TableCell colSpan={6} className="h-24 text-center">
								No hay áreas registradas.
							</TableCell>
						</TableRow>
					) : (
						departments.map((department) => (
							<TableRow key={department.id}>
								<TableCell className="font-medium">{department.dept_code}</TableCell>
								<TableCell>{department.dept_name}</TableCell>
								<TableCell>{department.parent_dept_id || "-"}</TableCell>
								<TableCell>
									<Badge variant={department.is_unactive ? "destructive" : "default"}>{department.is_unactive ? "Inactivo" : "Activo"}</Badge>
								</TableCell>
								<TableCell>{department.is_default ? "Sí" : "No"}</TableCell>
								<TableCell className="text-right">
									<div className="flex justify-end gap-2">
										<Button variant="outline" size="icon" onClick={() => onEdit(department)}>
											<Edit className="h-4 w-4" />
											<span className="sr-only">Editar</span>
										</Button>
										<Button variant="outline" size="icon" onClick={() => onDelete(department)}>
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

"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DepartmentsTable } from "@/components/areas/DepartmentTable";
import { DepartmentForm } from "@/components/areas/DepartmentForm";
import { DeleteDepartmentDialog } from "@/components/areas/DeleteDepartmentDialog";
import type { Department } from "@/types/department";
import { toast } from "sonner";
import { createDepartment, updateDepartment, toggleDepartmentStatus } from "@/services/departments";

interface AreasProps {
	initialDepartments: Department[];
}

export function Areas({ initialDepartments }: AreasProps) {
	const [departments, setDepartments] = useState<Department[]>(initialDepartments);
	const [formOpen, setFormOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [selectedDepartment, setSelectedDepartment] = useState<Department | undefined>();
	const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null);

	const handleCreateOrUpdate = async (values: Omit<Department, "id">, id?: number) => {
		try {
			if (id) {
				const updated = await updateDepartment(id, values);
				setDepartments(departments.map((dept) => (dept.id === id ? updated : dept)));
				toast.success("Área actualizada", {
					description: `El área "${values.dept_name}" ha sido actualizada correctamente.`,
				});
			} else {
				const created = await createDepartment(values);
				setDepartments([...departments, created]);
				toast.success("Área creada", {
					description: `El área "${values.dept_name}" ha sido creada correctamente.`,
				});
			}
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Error al procesar la operación");
		}
	};

	const handleEdit = (department: Department) => {
		setSelectedDepartment(department);
		setFormOpen(true);
	};

	const handleDelete = (department: Department) => {
		setDepartmentToDelete(department);
		setDeleteDialogOpen(true);
	};

	const confirmDelete = async (department: Department) => {
		try {
			const updated = await toggleDepartmentStatus(department.id);
			setDepartments(departments.map((dept) => (dept.id === department.id ? updated : dept)));

			toast.success(updated.is_unactive ? "Área desactivada" : "Área activada", {
				description: `El área "${department.dept_name}" ha sido ${updated.is_unactive ? "desactivada" : "activada"} correctamente.`,
			});
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Error al cambiar estado");
		}
	};

	return (
		<>
			<div className="flex justify-end mb-6">
				<Button
					onClick={() => {
						setSelectedDepartment(undefined);
						setFormOpen(true);
					}}
				>
					<Plus className="mr-2 h-4 w-4" />
					Crear área
				</Button>
			</div>
			<DepartmentsTable departments={departments} onEdit={handleEdit} onDelete={handleDelete} />
			<DepartmentForm open={formOpen} onOpenChange={setFormOpen} department={selectedDepartment} departments={departments} onSubmit={handleCreateOrUpdate} />
			<DeleteDepartmentDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} department={departmentToDelete} onConfirm={confirmDelete} />
		</>
	);
}

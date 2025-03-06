"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmployeesTable } from "@/components/empleados/EmployeesTable";
import { EmployeeForm } from "@/components/empleados/EmployeeForm";
import { DeleteEmployeeDialog } from "@/components/empleados/DeleteEmployeeDialog";
import { createEmployee, updateEmployee, toggleEmployeeStatus } from "@/services/employees";
import { getDepartments } from "@/services/departments";
import { getPositions } from "@/services/positions";
import type { Employee, EmployeeFormData } from "@/types/employee";
import type { Department } from "@/types/department";
import type { Position } from "@/types/position";
import { toast } from "sonner";
import { useEffect } from "react";

interface EmployeesProps {
	initialEmployees: Employee[];
}

export function Employees({ initialEmployees }: EmployeesProps) {
	const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
	const [departments, setDepartments] = useState<Department[]>([]);
	const [positions, setPositions] = useState<Position[]>([]);
	const [formOpen, setFormOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>();
	const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

	useEffect(() => {
		const loadData = async () => {
			try {
				const departmentsData = await getDepartments();
				setDepartments(departmentsData);

				const positionsData = await getPositions();
				setPositions(positionsData);
			} catch (error) {
				toast.error("Error al cargar datos", {
					description: "No se pudieron cargar los departamentos o puestos.",
				});
			}
		};

		loadData();
	}, []);

	const handleCreateOrUpdate = async (values: EmployeeFormData, id?: string) => {
		try {
			if (id) {
				// Actualizar
				const updatedEmployee = await updateEmployee(id, values);
				setEmployees(employees.map((emp) => (emp.id === id ? updatedEmployee : emp)));
				toast("Empleado actualizado", {
					description: `El empleado "${values.first_name} ${values.last_name}" ha sido actualizado correctamente.`,
				});
			} else {
				// Crear
				const newEmployee = await createEmployee(values);
				setEmployees([...employees, newEmployee]);
				toast("Empleado creado", {
					description: `El empleado "${values.first_name} ${values.last_name}" ha sido creado correctamente.`,
				});
			}
			setFormOpen(false);
		} catch (error) {
			toast.error("Error", {
				description: `No se pudo ${id ? "actualizar" : "crear"} el empleado.`,
			});
		}
	};

	const handleEdit = (employee: Employee) => {
		setSelectedEmployee(employee);
		setFormOpen(true);
	};

	const handleDelete = (employee: Employee) => {
		setEmployeeToDelete(employee);
		setDeleteDialogOpen(true);
	};

	const confirmDelete = async (employee: Employee) => {
		try {
			// Cambiar el estado de activación
			const updatedEmployee = await toggleEmployeeStatus(employee.id);
			setEmployees(employees.map((emp) => (emp.id === employee.id ? updatedEmployee : emp)));

			toast(employee.is_active ? "Empleado desactivado" : "Empleado activado", {
				description: `El empleado "${employee.first_name} ${employee.last_name}" ha sido ${employee.is_active ? "desactivado" : "activado"} correctamente.`,
			});
		} catch (error) {
			toast.error("Error", {
				description: "No se pudo cambiar el estado del empleado.",
			});
		}
	};

	return (
		<>
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Usuarios</h1>
					<p className="text-muted-foreground">Gestione los empleados y usuarios del sistema.</p>
				</div>
				<Button
					onClick={() => {
						setSelectedEmployee(undefined);
						setFormOpen(true);
					}}
				>
					<Plus className="mr-2 h-4 w-4" />
					Crear usuario
				</Button>
			</div>

			<EmployeesTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />

			<EmployeeForm open={formOpen} onOpenChange={setFormOpen} employee={selectedEmployee} departments={departments} positions={positions} onSubmit={handleCreateOrUpdate} />

			<DeleteEmployeeDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} employee={employeeToDelete} onConfirm={confirmDelete} />
		</>
	);
}

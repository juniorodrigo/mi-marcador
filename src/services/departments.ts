import type { Department } from "@/types/department";
import { env } from "@/env.mjs";

// Datos de ejemplo para departamentos
const sampleDepartments: Department[] = [
	{
		id: 1,
		dept_code: "01",
		dept_name: "Gerencia General",
		is_default: true,
		parent_dept_id: null,
		is_unactive: false,
	},
	{
		id: 2,
		dept_code: "02",
		dept_name: "Contabilidad",
		is_default: false,
		parent_dept_id: 1,
		is_unactive: false,
	},
	{
		id: 3,
		dept_code: "03",
		dept_name: "Recursos Humanos",
		is_default: false,
		parent_dept_id: 1,
		is_unactive: false,
	},
	{
		id: 4,
		dept_code: "04",
		dept_name: "Ventas",
		is_default: false,
		parent_dept_id: 1,
		is_unactive: false,
	},
];

// Función para simular delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getDepartments(): Promise<Department[]> {
	// Aquí se haría una llamada a tu API
	// Por ejemplo: const response = await fetch('/api/departments');
	// return await response.json();

	await delay(300); // Simular latencia de red
	return [...sampleDepartments];
}

export async function createDepartment(department: Omit<Department, "id">) {
	const response = await fetch(`/api/departments`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(department),
	});
	if (!response.ok) throw new Error("Error al crear departamento");
	return response.json() as Promise<Department>;
}

export async function updateDepartment(id: number, department: Omit<Department, "id">) {
	const response = await fetch(`/api/departments/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(department),
	});
	if (!response.ok) throw new Error("Error al actualizar departamento");
	return response.json() as Promise<Department>;
}

export async function toggleDepartmentStatus(id: number) {
	const response = await fetch(`/api/departments/${id}/toggle`, {
		method: "PATCH",
	});
	if (!response.ok) throw new Error("Error al cambiar estado del departamento");
	return response.json() as Promise<Department>;
}

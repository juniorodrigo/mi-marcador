import type { Employee, EmployeeFormData } from "@/types/employee";

// Datos de ejemplo para empleados - esto sería reemplazado por llamadas API reales
const initialEmployees: Employee[] = [
	{
		id: "3222715994936",
		emp_code: "09303146",
		first_name: "César Roberto",
		last_name: "Madrid Zagazeta",
		department_id: 1,
		position_id: 1,
		hire_date: "2004-09-01T00:00:00.000Z",
		is_active: true,
		create_time: "2025-03-05T06:17:02.793Z",
		change_time: "2025-03-05T12:03:32.497Z",
		personnel_position: {
			position_name: "Analista Contable",
		},
		personnel_department: {
			dept_name: "Gerencia General",
		},
	},
	{
		id: "3222715994937",
		emp_code: "09303147",
		first_name: "Ana María",
		last_name: "Rodríguez López",
		department_id: 2,
		position_id: 2,
		hire_date: "2010-03-15T00:00:00.000Z",
		is_active: true,
		create_time: "2025-03-05T06:17:02.793Z",
		change_time: "2025-03-05T12:03:32.497Z",
		personnel_position: {
			position_name: "Contador Principal",
		},
		personnel_department: {
			dept_name: "Contabilidad",
		},
	},
	{
		id: "3222715994938",
		emp_code: "09303148",
		first_name: "Juan Carlos",
		last_name: "Pérez Gómez",
		department_id: 3,
		position_id: 4,
		hire_date: "2015-07-22T00:00:00.000Z",
		is_active: true,
		create_time: "2025-03-05T06:17:02.793Z",
		change_time: "2025-03-05T12:03:32.497Z",
		personnel_position: {
			position_name: "Gerente de RRHH",
		},
		personnel_department: {
			dept_name: "Recursos Humanos",
		},
	},
	{
		id: "3222715994939",
		emp_code: "09303149",
		first_name: "Laura",
		last_name: "Sánchez Torres",
		department_id: 4,
		position_id: 6,
		hire_date: "2018-11-05T00:00:00.000Z",
		is_active: false,
		create_time: "2025-03-05T06:17:02.793Z",
		change_time: "2025-03-05T12:03:32.497Z",
		personnel_position: {
			position_name: "Analista de Ventas",
		},
		personnel_department: {
			dept_name: "Ventas",
		},
	},
];

// Función para simular delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getEmployees(): Promise<Employee[]> {
	// Aquí se haría una llamada a tu API
	// Por ejemplo: const response = await fetch('/api/employees');
	// return await response.json();

	await delay(500); // Simular latencia de red
	return [...initialEmployees];
}

export async function createEmployee(data: EmployeeFormData): Promise<Employee> {
	// Aquí se haría un POST a tu API
	// const response = await fetch('/api/employees', {
	//   method: 'POST',
	//   headers: { 'Content-Type': 'application/json' },
	//   body: JSON.stringify(data)
	// });
	// return await response.json();

	await delay(500); // Simular latencia de red

	// Simular la respuesta de la API
	return {
		id: Math.random().toString().substring(2, 16),
		create_time: new Date().toISOString(),
		change_time: new Date().toISOString(),
		...data,
		personnel_department: {
			dept_name: data.department_id === 1 ? "Gerencia General" : data.department_id === 2 ? "Contabilidad" : data.department_id === 3 ? "Recursos Humanos" : "Ventas",
		},
		personnel_position: {
			position_name: "Puesto Asignado", // En un caso real esto vendría del backend
		},
	};
}

export async function updateEmployee(id: string, data: EmployeeFormData): Promise<Employee> {
	// Aquí se haría un PUT a tu API
	// const response = await fetch(`/api/employees/${id}`, {
	//   method: 'PUT',
	//   headers: { 'Content-Type': 'application/json' },
	//   body: JSON.stringify(data)
	// });
	// return await response.json();

	await delay(500); // Simular latencia de red

	// Encontrar el empleado existente
	const existingEmployee = initialEmployees.find((emp) => emp.id === id);

	if (!existingEmployee) {
		throw new Error("Empleado no encontrado");
	}

	// Simular la respuesta de la API
	return {
		...existingEmployee,
		...data,
		change_time: new Date().toISOString(),
		personnel_department: {
			dept_name: data.department_id === 1 ? "Gerencia General" : data.department_id === 2 ? "Contabilidad" : data.department_id === 3 ? "Recursos Humanos" : "Ventas",
		},
		personnel_position: {
			position_name: "Puesto Actualizado", // En un caso real esto vendría del backend
		},
	};
}

export async function toggleEmployeeStatus(id: string): Promise<Employee> {
	// Aquí se haría un PATCH a tu API
	// const response = await fetch(`/api/employees/${id}/toggle-status`, {
	//   method: 'PATCH'
	// });
	// return await response.json();

	await delay(500); // Simular latencia de red

	// Encontrar el empleado existente
	const existingEmployee = initialEmployees.find((emp) => emp.id === id);

	if (!existingEmployee) {
		throw new Error("Empleado no encontrado");
	}

	// Simular la respuesta de la API
	return {
		...existingEmployee,
		is_active: !existingEmployee.is_active,
		change_time: new Date().toISOString(),
	};
}

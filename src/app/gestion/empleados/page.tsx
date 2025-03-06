import { getEmployees } from "@/services/employees";
import { Employees } from "@/components/empleados/Employees";

export default async function EmpleadosPage() {
	const initialEmployees = await getEmployees();

	return (
		<div className="container mx-auto py-10">
			<Employees initialEmployees={initialEmployees} />
		</div>
	);
}

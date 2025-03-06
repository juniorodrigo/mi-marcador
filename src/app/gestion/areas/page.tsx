import { getDepartments } from "@/services/departments";
import { Areas } from "@/components/areas/Areas";

export default async function AreasEmpresaPage() {
	const initialDepartments = await getDepartments();

	return (
		<div className="container mx-auto py-10">
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Áreas de la empresa</h1>
					<p className="text-muted-foreground">Gestione las áreas y departamentos de su organización.</p>
				</div>
			</div>
			<Areas initialDepartments={initialDepartments} />
		</div>
	);
}

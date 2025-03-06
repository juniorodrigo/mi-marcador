import { getPositions } from "@/services/positions";
import { Positions } from "@/components/puestos/Positions";

export default async function PuestosPage() {
	const initialPositions = await getPositions();

	return (
		<div className="container mx-auto py-10">
			<Positions initialPositions={initialPositions} />
		</div>
	);
}

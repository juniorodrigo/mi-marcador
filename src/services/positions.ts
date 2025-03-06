import type { Position } from "@/types/position";

// Por ahora retornamos datos de ejemplo
export async function getPositions(): Promise<Position[]> {
	return [
		{
			id: 1,
			position_code: "1",
			position_name: "Director General",
			is_default: true,
			is_unactive: false,
			company_id: "6b969e80-f3ff-11e9-afc7-acde48001122",
			parent_position_id: null,
		},
		{
			id: 2,
			position_code: "2",
			position_name: "Gerente de Ventas",
			is_default: false,
			is_unactive: false,
			company_id: "6b969e80-f3ff-11e9-afc7-acde48001122",
			parent_position_id: 1,
		},
		{
			id: 6,
			position_code: "6",
			position_name: "Analista de Ventas",
			is_default: false,
			is_unactive: false,
			company_id: "6b969e80-f3ff-11e9-afc7-acde48001122",
			parent_position_id: 2,
		},
		{
			id: 8,
			position_code: "8",
			position_name: "Asistente de Marketing",
			is_default: false,
			is_unactive: true,
			company_id: "6b969e80-f3ff-11e9-afc7-acde48001122",
			parent_position_id: 2,
		},
	];
}

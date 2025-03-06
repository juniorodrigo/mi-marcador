export interface Position {
	id: number;
	position_code: string;
	position_name: string;
	is_default: boolean;
	is_unactive: boolean;
	company_id: string;
	parent_position_id: number | null;
}

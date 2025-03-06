export interface Department {
	id: number;
	dept_code: string;
	dept_name: string;
	is_default: boolean;
	parent_dept_id: number | null;
	is_unactive: boolean;
}

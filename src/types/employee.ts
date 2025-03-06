export interface Employee {
	id: string;
	emp_code: string;
	first_name: string;
	last_name: string;
	department_id: number;
	position_id: number;
	hire_date: string;
	is_active: boolean;
	create_time: string;
	change_time: string;
	personnel_position?: {
		position_name: string;
	};
	personnel_department?: {
		dept_name: string;
	};
}

export interface EmployeeFormData {
	emp_code: string;
	first_name: string;
	last_name: string;
	department_id: number;
	position_id: number;
	hire_date: string;
	is_active: boolean;
}

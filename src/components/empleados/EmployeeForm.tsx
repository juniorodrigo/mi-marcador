"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Employee, EmployeeFormData } from "@/types/employee";
import { Department } from "@/types/department";
import { Position } from "@/types/position";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
	emp_code: z.string().min(1, "El código es requerido"),
	first_name: z.string().min(1, "El nombre es requerido"),
	last_name: z.string().min(1, "El apellido es requerido"),
	department_id: z.number().min(1, "El área es requerida"),
	position_id: z.number().min(1, "El puesto es requerido"),
	hire_date: z.date({
		required_error: "La fecha de contratación es requerida",
	}),
	is_active: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

interface EmployeeFormProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	employee?: Employee;
	departments: Department[];
	positions: Position[];
	onSubmit: (values: EmployeeFormData, id?: string) => void;
}

export function EmployeeForm({ open, onOpenChange, employee, departments, positions, onSubmit }: EmployeeFormProps) {
	// Filtrar posiciones basadas en el departamento seleccionado
	const [filteredPositions, setFilteredPositions] = useState<Position[]>(positions);
	const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(null);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			emp_code: "",
			first_name: "",
			last_name: "",
			department_id: 0,
			position_id: 0,
			hire_date: new Date(),
			is_active: true,
		},
	});

	// Actualizar posiciones filtradas cuando cambia el departamento
	useEffect(() => {
		if (selectedDepartmentId) {
			// Aquí podrías filtrar las posiciones por departamento si tienes esa relación
			// Por ahora, simplemente mostramos todas las posiciones
			setFilteredPositions(positions);
		} else {
			setFilteredPositions(positions);
		}
	}, [selectedDepartmentId, positions]);

	useEffect(() => {
		if (employee) {
			const hireDate = employee.hire_date ? new Date(employee.hire_date) : new Date();

			form.reset({
				emp_code: employee.emp_code,
				first_name: employee.first_name,
				last_name: employee.last_name,
				department_id: employee.department_id,
				position_id: employee.position_id,
				hire_date: hireDate,
				is_active: employee.is_active,
			});

			setSelectedDepartmentId(employee.department_id);
		} else {
			form.reset({
				emp_code: "",
				first_name: "",
				last_name: "",
				department_id: 0,
				position_id: 0,
				hire_date: new Date(),
				is_active: true,
			});

			setSelectedDepartmentId(null);
		}
	}, [employee, form]);

	const handleSubmit = (values: FormValues) => {
		const formattedValues: EmployeeFormData = {
			...values,
			hire_date: values.hire_date.toISOString(),
		};

		onSubmit(formattedValues, employee?.id);
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>{employee ? "Editar empleado" : "Crear nuevo empleado"}</DialogTitle>
					<DialogDescription>Complete los campos para {employee ? "actualizar" : "crear"} un empleado.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="emp_code"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Código</FormLabel>
										<FormControl>
											<Input placeholder="Ej: 09303146" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="hire_date"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>Fecha de Contratación</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
														{field.value ? format(field.value, "dd/MM/yyyy") : <span>Seleccione una fecha</span>}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="first_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nombres</FormLabel>
										<FormControl>
											<Input placeholder="Ej: César Roberto" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="last_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Apellidos</FormLabel>
										<FormControl>
											<Input placeholder="Ej: Madrid Zagazeta" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="department_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Área</FormLabel>
										<Select
											onValueChange={(value) => {
												const numValue = parseInt(value);
												field.onChange(numValue);
												setSelectedDepartmentId(numValue);
											}}
											value={field.value ? field.value.toString() : ""}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Seleccione un área" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{departments
													.filter((dept) => !dept.is_unactive)
													.map((dept) => (
														<SelectItem key={dept.id} value={dept.id.toString()}>
															{dept.dept_name}
														</SelectItem>
													))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="position_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Puesto</FormLabel>
										<Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value ? field.value.toString() : ""} disabled={!selectedDepartmentId}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder={selectedDepartmentId ? "Seleccione un puesto" : "Primero seleccione un área"} />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{filteredPositions
													.filter((pos) => !pos.is_unactive)
													.map((pos) => (
														<SelectItem key={pos.id} value={pos.id.toString()}>
															{pos.position_name}
														</SelectItem>
													))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="is_active"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
									<FormControl>
										<Checkbox checked={field.value} onCheckedChange={field.onChange} />
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>Activo</FormLabel>
										<FormDescription>Marcar si el empleado está activo en la empresa</FormDescription>
									</div>
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button type="submit">{employee ? "Actualizar" : "Crear"}</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Department } from "@/types/department";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
	dept_code: z.string().min(1, "El código es requerido"),
	dept_name: z.string().min(1, "El nombre es requerido"),
	is_default: z.boolean().default(false),
	parent_dept_id: z.number().nullable(),
	is_unactive: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface DepartmentFormProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	department?: Department;
	departments: Department[];
	onSubmit: (values: FormValues, id?: number) => void;
}

export function DepartmentForm({ open, onOpenChange, department, departments, onSubmit }: DepartmentFormProps) {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			dept_code: "",
			dept_name: "",
			is_default: false,
			parent_dept_id: null,
			is_unactive: false,
		},
	});

	useEffect(() => {
		if (department) {
			form.reset({
				dept_code: department.dept_code,
				dept_name: department.dept_name,
				is_default: department.is_default,
				parent_dept_id: department.parent_dept_id,
				is_unactive: department.is_unactive,
			});
		} else {
			form.reset({
				dept_code: "",
				dept_name: "",
				is_default: false,
				parent_dept_id: null,
				is_unactive: false,
			});
		}
	}, [department, form]);

	const handleSubmit = (values: FormValues) => {
		onSubmit(values, department?.id);
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>{department ? "Editar área" : "Crear nueva área"}</DialogTitle>
					<DialogDescription>Complete los campos para {department ? "actualizar" : "crear"} un área de la empresa.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="dept_code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Código</FormLabel>
									<FormControl>
										<Input placeholder="Ej: 16" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="dept_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre</FormLabel>
									<FormControl>
										<Input placeholder="Ej: Marketing" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="parent_dept_id"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Departamento Padre</FormLabel>
									<Select onValueChange={(value) => field.onChange(value ? Number.parseInt(value) : null)} value={field.value?.toString() || ""}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Seleccione un departamento padre" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="0">Ninguno</SelectItem>
											{departments
												.filter((d) => d.id !== department?.id)
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
						<div className="flex space-x-4">
							<FormField
								control={form.control}
								name="is_default"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
										<FormControl>
											<Checkbox checked={field.value} onCheckedChange={field.onChange} />
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel>Por defecto</FormLabel>
											<FormDescription>Marcar como departamento por defecto</FormDescription>
										</div>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="is_unactive"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
										<FormControl>
											<Checkbox checked={field.value} onCheckedChange={field.onChange} />
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel>Inactivo</FormLabel>
											<FormDescription>Marcar como departamento inactivo</FormDescription>
										</div>
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter>
							<Button type="submit">{department ? "Actualizar" : "Crear"}</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

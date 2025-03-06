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
import type { Position } from "@/types/position";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
	position_code: z.string().min(1, "El código es requerido"),
	position_name: z.string().min(1, "El nombre es requerido"),
	is_default: z.boolean().default(false),
	parent_position_id: z.number().nullable(),
	is_unactive: z.boolean().default(false),
	company_id: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface PositionFormProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	position?: Position;
	positions: Position[];
	onSubmit: (values: FormValues, id?: number) => void;
	companyId: string;
}

export function PositionForm({ open, onOpenChange, position, positions, onSubmit, companyId }: PositionFormProps) {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			position_code: "",
			position_name: "",
			is_default: false,
			parent_position_id: null,
			is_unactive: false,
			company_id: companyId,
		},
	});

	useEffect(() => {
		if (position) {
			form.reset({
				position_code: position.position_code,
				position_name: position.position_name,
				is_default: position.is_default,
				parent_position_id: position.parent_position_id,
				is_unactive: position.is_unactive,
				company_id: position.company_id,
			});
		} else {
			form.reset({
				position_code: "",
				position_name: "",
				is_default: false,
				parent_position_id: null,
				is_unactive: false,
				company_id: companyId,
			});
		}
	}, [position, form, companyId]);

	const handleSubmit = (values: FormValues) => {
		onSubmit(values, position?.id);
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>{position ? "Editar puesto" : "Crear nuevo puesto"}</DialogTitle>
					<DialogDescription>Complete los campos para {position ? "actualizar" : "crear"} un puesto en la empresa.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="position_code"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Código</FormLabel>
									<FormControl>
										<Input placeholder="Ej: 6" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="position_name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nombre</FormLabel>
									<FormControl>
										<Input placeholder="Ej: Analista de Ventas" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="parent_position_id"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Puesto Superior</FormLabel>
									<Select onValueChange={(value) => field.onChange(value ? Number.parseInt(value) : null)} value={field.value?.toString() || ""}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Seleccione un puesto superior" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="0">Ninguno</SelectItem>
											{positions
												.filter((p) => p.id !== position?.id)
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
											<FormDescription>Marcar como puesto por defecto</FormDescription>
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
											<FormDescription>Marcar como puesto inactivo</FormDescription>
										</div>
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter>
							<Button type="submit">{position ? "Actualizar" : "Crear"}</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

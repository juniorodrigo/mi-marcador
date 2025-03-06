"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import type { Position } from "@/types/position";
import { Badge } from "@/components/ui/badge";

interface PositionsTableProps {
	positions: Position[];
	onEdit: (position: Position) => void;
	onDelete: (position: Position) => void;
}

export function PositionsTable({ positions, onEdit, onDelete }: PositionsTableProps) {
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Código</TableHead>
						<TableHead>Nombre</TableHead>
						<TableHead>Puesto Superior</TableHead>
						<TableHead>Estado</TableHead>
						<TableHead>Por defecto</TableHead>
						<TableHead className="text-right">Acciones</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{positions.length === 0 ? (
						<TableRow>
							<TableCell colSpan={6} className="h-24 text-center">
								No hay puestos registrados.
							</TableCell>
						</TableRow>
					) : (
						positions.map((position) => (
							<TableRow key={position.id}>
								<TableCell className="font-medium">{position.position_code}</TableCell>
								<TableCell>{position.position_name}</TableCell>
								<TableCell>{position.parent_position_id || "-"}</TableCell>
								<TableCell>
									<Badge variant={position.is_unactive ? "destructive" : "success"}>{position.is_unactive ? "Inactivo" : "Activo"}</Badge>
								</TableCell>
								<TableCell>{position.is_default ? "Sí" : "No"}</TableCell>
								<TableCell className="text-right">
									<div className="flex justify-end gap-2">
										<Button variant="outline" size="icon" onClick={() => onEdit(position)}>
											<Edit className="h-4 w-4" />
											<span className="sr-only">Editar</span>
										</Button>
										<Button variant="outline" size="icon" onClick={() => onDelete(position)}>
											<Trash2 className="h-4 w-4" />
											<span className="sr-only">Eliminar</span>
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}

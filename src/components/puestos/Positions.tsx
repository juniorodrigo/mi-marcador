"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PositionsTable } from "@/components/puestos/PositionsTable";
import { PositionForm } from "@/components/puestos/PositionForm";
import { DeletePositionDialog } from "@/components/puestos/DeletePositionDialog";
import type { Position } from "@/types/position";
import { toast } from "sonner";

// ID de la empresa actual (normalmente vendría de un contexto o estado global)
const COMPANY_ID = "6b969e80-f3ff-11e9-afc7-acde48001122";

export function Positions({ initialPositions }: { initialPositions: Position[] }) {
	const [positions, setPositions] = useState<Position[]>(initialPositions);
	const [formOpen, setFormOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [selectedPosition, setSelectedPosition] = useState<Position | undefined>();
	const [positionToDelete, setPositionToDelete] = useState<Position | null>(null);

	const handleCreateOrUpdate = (values: any, id?: number) => {
		if (id) {
			setPositions(positions.map((pos) => (pos.id === id ? { ...pos, ...values } : pos)));
			toast("Puesto actualizado", {
				description: `El puesto "${values.position_name}" ha sido actualizado correctamente.`,
			});
		} else {
			const newPosition: Position = {
				id: Math.max(...positions.map((p) => p.id)) + 1,
				...values,
			};
			setPositions([...positions, newPosition]);
			toast("Puesto creado", {
				description: `El puesto "${values.position_name}" ha sido creado correctamente.`,
			});
		}
	};

	const handleEdit = (position: Position) => {
		setSelectedPosition(position);
		setFormOpen(true);
	};

	const handleDelete = (position: Position) => {
		setPositionToDelete(position);
		setDeleteDialogOpen(true);
	};

	const confirmDelete = (position: Position) => {
		setPositions(positions.map((pos) => (pos.id === position.id ? { ...pos, is_unactive: !pos.is_unactive } : pos)));

		toast(position.is_unactive ? "Puesto activado" : "Puesto desactivado", {
			description: `El puesto "${position.position_name}" ha sido ${position.is_unactive ? "activado" : "desactivado"} correctamente.`,
		});
	};

	return (
		<>
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">Puestos</h1>
					<p className="text-muted-foreground">Gestione los puestos y cargos de su organización.</p>
				</div>
				<Button
					onClick={() => {
						setSelectedPosition(undefined);
						setFormOpen(true);
					}}
				>
					<Plus className="mr-2 h-4 w-4" />
					Crear puesto
				</Button>
			</div>

			<PositionsTable positions={positions} onEdit={handleEdit} onDelete={handleDelete} />

			<PositionForm open={formOpen} onOpenChange={setFormOpen} position={selectedPosition} positions={positions} onSubmit={handleCreateOrUpdate} companyId={COMPANY_ID} />

			<DeletePositionDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} position={positionToDelete} onConfirm={confirmDelete} />
		</>
	);
}

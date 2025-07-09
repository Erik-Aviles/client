import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import DeleteBtn from "../Actions/DeleteBtn";

export default function ActionsColumns({ row, endpoint, title }) {
  const showTitle = row.getValue(title);
  const id = row.original.id;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>
          <Copy className="w-2 h-2 " /> Copiar ID
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Pencil className="w-2 h-2 " /> Editar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <DeleteBtn id={id} endpoint={endpoint} title={showTitle} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

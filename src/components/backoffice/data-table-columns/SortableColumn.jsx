import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  EyeOff,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SortableColumn({ column, title, className }) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2 ", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="uppercase " variant="ghost">
            <span>{title}</span>
            <ChevronsUpDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {column.getIsSorted() === "desc" ? (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => column.toggleSorting(false)}
            >
              <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />
              Ascendiente
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => column.toggleSorting(true)}
            >
              <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />
              Descendiente
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => column.toggleVisibility(false)}
          >
            <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" />
            Ocultar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

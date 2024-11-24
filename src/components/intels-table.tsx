"use client";

import { SelectTranscript } from "@/lib/schemas";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ExternalLinkIcon,
  TrashIcon,
  ClockIcon,
  UsersIcon,
  CalendarIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteIntel } from "@/queries/intel-queries";
import { toast } from "sonner";
export default function IntelsTable({
  intels,
  className,
}: {
  intels: SelectTranscript[];
  className?: string;
}) {
  const router = useRouter();

  const handleView = (id: string) => {
    router.push(`/intels/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteIntel(id);
      toast.success("Intel deleted successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete intel");
    }
  };

  const sentimentColors = {
    positive: "bg-green-500",
    negative: "bg-red-500",
    neutral: "bg-yellow-500",
  };
  const columns: ColumnDef<SelectTranscript>[] = [
    {
      header: "Title",
      accessorKey: "title",
      cell: ({ row }) => {
        return <p className="font-medium text-nowrap">{row.original.title}</p>;
      },
    },
    {
      header: "Audio Duration",
      accessorFn: (row) => row.duration,
      cell: ({ row }) => {
        return (
          <div className="flex text-nowrap items-center gap-2">
            <ClockIcon className="w-4 h-4" />
            {row.original.duration}
          </div>
        );
      },
    },
    {
      header: "Speakers",
      accessorFn: (row) => row.speakerCount,
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <UsersIcon className="w-4 h-4" />
            {row.original.speakerCount}
          </div>
        );
      },
    },
    {
      header: "Overall Sentiment",
      accessorKey: "overallSentiment",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                sentimentColors[
                  (row.original.overallSentiment?.toLowerCase() as keyof typeof sentimentColors) ||
                    "neutral"
                ]
              )}
            />
            {row.original.overallSentiment}
          </div>
        );
      },
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            {row.original.createdAt.toLocaleDateString()}
          </div>
        );
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleView(row.original.id)}
              variant="outline"
              size="sm"
            >
              <ExternalLinkIcon className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => handleDelete(row.original.id)}
              variant="destructive"
              size="sm"
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: intels,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={cn("rounded-md border", className)}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
"use client";

import { LeaderboardEntry } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

export default function LeaderboardTable({ entries }: LeaderboardTableProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No scores yet. Be the first!
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Mode</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry, i) => (
          <TableRow key={`${entry.name}-${entry.date}`}>
            <TableCell className="font-mono font-bold text-muted-foreground">
              {i + 1}
            </TableCell>
            <TableCell className="font-medium">{entry.name}</TableCell>
            <TableCell className="font-mono">
              {entry.score}/{entry.total}{" "}
              <span className="text-muted-foreground">
                ({Math.round((entry.score / entry.total) * 100)}%)
              </span>
            </TableCell>
            <TableCell className="capitalize text-muted-foreground">
              {entry.mode}
            </TableCell>
            <TableCell className="text-right text-muted-foreground">
              {new Date(entry.date).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

"use client";

import { LeaderboardEntry } from "@/lib/types";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

export default function LeaderboardTable({ entries }: LeaderboardTableProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-base-content/50">
        No scores yet. Be the first!
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
            <th>Mode</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr key={`${entry.name}-${entry.date}`}>
              <td className="font-bold">{i + 1}</td>
              <td>{entry.name}</td>
              <td>
                {entry.score}/{entry.total} (
                {Math.round((entry.score / entry.total) * 100)}%)
              </td>
              <td className="capitalize">{entry.mode}</td>
              <td>{new Date(entry.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client"
import { BoardList } from "@/components/board-list";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full overflow-x-auto p-4">
      <BoardList />
    </div>
  );
}

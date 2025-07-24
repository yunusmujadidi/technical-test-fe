import { useDroppable } from "@dnd-kit/core";
import { Card } from "./card";
import { Task } from "@/lib/types";

interface CardGroupProps {
  status: string;
  tasks: Task[];
}

export const CardGroup = ({ status, tasks }: CardGroupProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  const statusColors: Record<string, string> = {
    "In Progress": "bg-green-800",
    "Ready to start": "bg-teal-700",
    "Waiting for review": "bg-red-600",
    Done: "bg-red-800",
    Stuck: "bg-yellow-600",
    "Pending Deploy": "bg-blue-800",
  };

  const backgroundColor = statusColors[status] || "bg-gray-700";

  return (
    <div
      ref={setNodeRef}
      className={`rounded h-full w-full m-2 p-2 transition-colors border-2 ${
        isOver
          ? "bg-gray-200 border-blue-300"
          : "bg-gray-100 border-transparent"
      }`}
    >
      <div className={backgroundColor}>
        <h1 className="text-2xl text-white m-2">{status}</h1>
      </div>
      <div className="flex-row space-y-5 m-4 ">
        {tasks.map((task, index) => (
          <Card key={index} task={task} />
        ))}
      </div>
    </div>
  );
};

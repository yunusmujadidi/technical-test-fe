import { useDraggable } from "@dnd-kit/core";
import { Avatar } from "./avatar";
import { Badge } from "./badge";
import { Task } from "@/lib/types";

interface CardProps {
  task: Task;
}

export const Card = ({ task }: CardProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.title,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const developers = task.developer.split(", ").map((dev) => dev.trim());

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`bg-white shadow-sm space-y-2 p-2 rounded-sm cursor-grab ${
        isDragging ? "opacity-50 shadow-lg" : ""
      }`}
    >
      <div>{task.title}</div>
      <Badge type={task.type} />
      <div className="flex items-center">
        {developers.map((dev, index) => (
          <div
            key={index}
            className={`relative ${index > 0 ? "-ml-2" : ""}`}
            style={{ zIndex: developers.length - index }}
          >
            <Avatar name={dev} />
          </div>
        ))}
      </div>
    </div>
  );
};

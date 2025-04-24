
import { Task } from "@/types/task";
import { TaskItem } from "./TaskItem";
import { Button } from "@/components/ui/button";
import { Plus, CheckCircle2 } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (taskId: number, completed: boolean) => void;
}

export const TaskList = ({ tasks, onEdit, onDelete, onStatusChange }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="p-8 text-center">
        <CheckCircle2 className="h-12 w-12 mx-auto text-muted mb-3 opacity-50" />
        <h3 className="text-lg font-medium">No tasks found</h3>
        <p className="text-muted-foreground mt-1">Create a new task to get started</p>
        <Button className="mt-4">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 divide-y">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

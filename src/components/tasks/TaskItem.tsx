
import { Task } from "@/types/task";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2, CheckCircle2, Calendar, AlertCircle, Clock } from "lucide-react";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onStatusChange: (taskId: number, completed: boolean) => void;
}

export const TaskItem = ({ task, onEdit, onDelete, onStatusChange }: TaskItemProps) => {
  const priorityColors = {
    high: "text-red-500 border-red-200",
    medium: "text-amber-500 border-amber-200",
    low: "text-green-500 border-green-200",
  };

  const statusIcons = {
    completed: CheckCircle2,
    upcoming: Calendar,
    overdue: AlertCircle,
    today: Clock,
  };

  const StatusIcon = statusIcons[task.status];

  return (
    <div className={`p-4 hover:bg-gray-50 ${task.status === "completed" ? "opacity-60" : ""}`}>
      <div className="flex items-start">
        <Checkbox
          id={`task-${task.id}`}
          className="mt-1 h-5 w-5"
          checked={task.status === "completed"}
          onCheckedChange={(checked) => onStatusChange(task.id, checked as boolean)}
        />
        <div className="ml-3 flex-grow">
          <div className="flex items-start justify-between">
            <div>
              <label
                htmlFor={`task-${task.id}`}
                className={`font-medium cursor-pointer ${
                  task.status === "completed" ? "line-through text-muted-foreground" : ""
                }`}
              >
                {task.title}
              </label>
              <div className="flex items-center mt-1 space-x-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <StatusIcon className="h-3.5 w-3.5 mr-1.5" />
                  <span>{task.dueDate}</span>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs font-normal ${priorityColors[task.priority]}`}
                >
                  {task.priority}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                  {task.related.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-500 hover:text-primary"
                  onClick={() => onEdit(task)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-500 hover:text-red-500"
                  onClick={() => onDelete(task)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

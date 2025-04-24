
export interface Task {
  id: number;
  title: string;
  dueDate: string;
  status: "completed" | "upcoming" | "overdue" | "today";
  priority: "high" | "medium" | "low";
  related: {
    type: "contact" | "deal";
    name: string;
    initials: string;
  };
}

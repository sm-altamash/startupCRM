
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Search,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Circle,
  MoreHorizontal,
  Filter,
  CalendarDays
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample data
interface Task {
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

const tasks: Task[] = [
  {
    id: 1,
    title: "Follow up with Alex about website proposal",
    dueDate: "Today, 2:00 PM",
    status: "today",
    priority: "high",
    related: {
      type: "contact",
      name: "Alex Johnson",
      initials: "AJ",
    },
  },
  {
    id: 2,
    title: "Prepare presentation for Globex Inc meeting",
    dueDate: "Tomorrow, 10:00 AM",
    status: "upcoming",
    priority: "medium",
    related: {
      type: "deal",
      name: "Globex Marketing Campaign",
      initials: "GM",
    },
  },
  {
    id: 3,
    title: "Send follow-up email to David",
    dueDate: "Yesterday, 3:00 PM",
    status: "overdue",
    priority: "high",
    related: {
      type: "contact",
      name: "David Martinez",
      initials: "DM",
    },
  },
  {
    id: 4,
    title: "Review contract from Massive Dynamic",
    dueDate: "Aug 28, 5:00 PM",
    status: "upcoming",
    priority: "high",
    related: {
      type: "deal",
      name: "Annual Contract",
      initials: "AC",
    },
  },
  {
    id: 5,
    title: "Update contact information for Stark Industries",
    dueDate: "Aug 25, 12:00 PM",
    status: "completed",
    priority: "low",
    related: {
      type: "contact",
      name: "James Wilson",
      initials: "JW",
    },
  },
];

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "completed") return matchesSearch && task.status === "completed";
    if (activeTab === "today") return matchesSearch && task.status === "today";
    if (activeTab === "upcoming") return matchesSearch && task.status === "upcoming";
    if (activeTab === "overdue") return matchesSearch && task.status === "overdue";
    
    return matchesSearch;
  });

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Track and manage your tasks</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative col-span-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search tasks..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="w-full">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <CalendarDays className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Due Date</DropdownMenuItem>
              <DropdownMenuItem>Priority</DropdownMenuItem>
              <DropdownMenuItem>Recently Created</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tasks list */}
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 divide-y">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => {
                    const StatusIcon = statusIcons[task.status];
                    
                    return (
                      <div 
                        key={task.id} 
                        className={`p-4 hover:bg-gray-50 ${
                          task.status === "completed" ? "opacity-60" : ""
                        }`}
                      >
                        <div className="flex items-start">
                          <Checkbox 
                            id={`task-${task.id}`} 
                            className="mt-1 h-5 w-5"
                            checked={task.status === "completed"}
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
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            
                            <p className="mt-2 text-xs text-muted-foreground">
                              Related to: {task.related.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center">
                    <CheckCircle2 className="h-12 w-12 mx-auto text-muted mb-3 opacity-50" />
                    <h3 className="text-lg font-medium">No tasks found</h3>
                    <p className="text-muted-foreground mt-1">Create a new task to get started</p>
                    <Button className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Task
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tasks;


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "recharts";
import { ArrowUp, Users, Phone, BadgeDollarSign, Calendar, ArrowUpRight, MessageSquare } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Sample data for charts
const performanceData = [
  { name: "Jan", deals: 4, contacts: 10 },
  { name: "Feb", deals: 3, contacts: 8 },
  { name: "Mar", deals: 5, contacts: 12 },
  { name: "Apr", deals: 7, contacts: 15 },
  { name: "May", deals: 5, contacts: 9 },
  { name: "Jun", deals: 9, contacts: 17 },
  { name: "Jul", deals: 11, contacts: 20 },
];

const recentActivities = [
  { id: 1, type: "contact", message: "New contact added", time: "5 minutes ago", icon: Users },
  { id: 2, type: "deal", message: "Deal moved to negotiation", time: "1 hour ago", icon: BadgeDollarSign },
  { id: 3, type: "call", message: "Call scheduled with John", time: "3 hours ago", icon: Phone },
  { id: 4, type: "message", message: "New message from Sarah", time: "Yesterday", icon: MessageSquare },
];

const upcomingTasks = [
  { id: 1, title: "Follow up with Acme Corp", date: "Today, 2:00 PM", status: "due-soon" },
  { id: 2, title: "Prepare proposal for XYZ Inc", date: "Tomorrow, 10:00 AM", status: "upcoming" },
  { id: 3, title: "Product demo with new lead", date: "Wed, 11:30 AM", status: "upcoming" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Button>Add Contact</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Contacts",
            value: "45",
            change: "+12%",
            icon: Users,
            description: "vs. last month",
          },
          {
            title: "Active Deals",
            value: "12",
            change: "+5%",
            icon: BadgeDollarSign,
            description: "vs. last month",
          },
          {
            title: "Deal Value",
            value: "$24,500",
            change: "+18%",
            icon: ArrowUpRight,
            description: "vs. last month",
          },
          {
            title: "Upcoming Tasks",
            value: "8",
            change: "0%",
            icon: Calendar,
            description: "vs. last month",
          },
        ].map((stat, index) => (
          <Card key={index} className="card-hover">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className="p-2 rounded-md bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-3 text-xs">
                <ArrowUp className="h-3 w-3 mr-1 text-emerald-500" />
                <span className="text-emerald-500 font-medium">{stat.change}</span>
                <span className="text-muted-foreground ml-1">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Performance Overview</CardTitle>
            <CardDescription>Monthly contacts and deals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={performanceData}
                  margin={{
                    top: 5,
                    right: 5,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="deals" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="contacts" stackId="2" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
              <CardDescription>Latest updates and actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="p-2 rounded-md bg-muted flex-shrink-0 mt-0.5">
                      <activity.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Upcoming Tasks</CardTitle>
              <CardDescription>Your scheduled tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.date}</p>
                    </div>
                    <Badge variant={task.status === "due-soon" ? "destructive" : "secondary"}>
                      {task.status === "due-soon" ? "Due Soon" : "Upcoming"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MoreHorizontal, 
  Search, 
  Filter, 
  Plus, 
  Phone, 
  Mail, 
  MapPin, 
  Building,
  UserPlus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample contacts data
const contacts = [
  {
    id: 1,
    name: "Alex Johnson",
    company: "Acme Corp",
    email: "alex@acmecorp.com",
    phone: "555-123-4567",
    location: "San Francisco, CA",
    status: "customer",
    lastContact: "2 days ago",
    initials: "AJ",
  },
  {
    id: 2,
    name: "Samantha Lee",
    company: "Globex Inc",
    email: "sam@globexinc.com",
    phone: "555-987-6543",
    location: "New York, NY",
    status: "lead",
    lastContact: "1 week ago",
    initials: "SL",
  },
  {
    id: 3,
    name: "David Martinez",
    company: "Initech",
    email: "david@initech.com",
    phone: "555-456-7890",
    location: "Austin, TX",
    status: "lead",
    lastContact: "Yesterday",
    initials: "DM",
  },
  {
    id: 4,
    name: "Emily Wong",
    company: "Massive Dynamic",
    email: "emily@massivedynamic.com",
    phone: "555-789-0123",
    location: "Seattle, WA",
    status: "customer",
    lastContact: "3 days ago",
    initials: "EW",
  },
  {
    id: 5,
    name: "James Wilson",
    company: "Stark Industries",
    email: "james@starkindustries.com",
    phone: "555-234-5678",
    location: "Chicago, IL",
    status: "prospect",
    lastContact: "5 days ago",
    initials: "JW",
  },
];

const statusColors = {
  lead: "bg-yellow-100 text-yellow-800",
  prospect: "bg-blue-100 text-blue-800",
  customer: "bg-green-100 text-green-800",
};

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && contact.status === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contacts</h1>
          <p className="text-muted-foreground">Manage your contacts and leads</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative col-span-2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search contacts..."
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Export CSV</DropdownMenuItem>
              <DropdownMenuItem>Print list</DropdownMenuItem>
              <DropdownMenuItem>Import contacts</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tabs & Content */}
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Contacts</TabsTrigger>
          <TabsTrigger value="lead">Leads</TabsTrigger>
          <TabsTrigger value="prospect">Prospects</TabsTrigger>
          <TabsTrigger value="customer">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 divide-y">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <div key={contact.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex space-x-4">
                          <Avatar className="h-12 w-12 mt-1">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {contact.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center mb-1">
                              <h3 className="font-medium">{contact.name}</h3>
                              <Badge className={`ml-2 ${statusColors[contact.status as keyof typeof statusColors]}`}>
                                {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mb-2">
                              <Building className="h-3.5 w-3.5 inline mr-1" />
                              {contact.company}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-1 gap-x-4 text-sm">
                              <div className="flex items-center text-muted-foreground">
                                <Mail className="h-3.5 w-3.5 mr-1.5" />
                                {contact.email}
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Phone className="h-3.5 w-3.5 mr-1.5" />
                                {contact.phone}
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <MapPin className="h-3.5 w-3.5 mr-1.5" />
                                {contact.location}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                          <div className="text-xs text-muted-foreground text-right mt-1">
                            Last contacted: {contact.lastContact}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <h3 className="text-lg font-medium">No contacts found</h3>
                    <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
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

export default Contacts;

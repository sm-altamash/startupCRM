import { useState, useEffect } from "react";
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
  UserPlus,
  Edit,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AddContactModal from "@/components/modals/AddContactModal";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const statusColors = {
  lead: "bg-yellow-100 text-yellow-800",
  prospect: "bg-blue-100 text-blue-800",
  customer: "bg-green-100 text-green-800",
};

const Contacts = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [contactsList, setContactsList] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContactsList(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching contacts",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = contactsList.filter(contact => {
    const matchesSearch = 
      contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && contact.status === activeTab;
  });

  const handleAddContact = async (newContact: any) => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([{
          ...newContact,
          user_id: supabase.auth.getUser().then(({ data }) => data.user?.id),
        }])
        .select()
        .single();

      if (error) throw error;
      setContactsList(prev => [data, ...prev]);
      toast({
        title: "Contact added",
        description: "New contact has been successfully created.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error adding contact",
        description: error.message,
      });
    }
  };

  const handleEdit = async (contactId: string) => {
    // This will be implemented in the next update
    console.log("Edit contact:", contactId);
  };

  const handleDelete = async (contactId: string) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', contactId);

      if (error) throw error;
      setContactsList(prev => prev.filter(contact => contact.id !== contactId));
      toast({
        title: "Contact deleted",
        description: "Contact has been successfully removed.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error deleting contact",
        description: error.message,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contacts</h1>
          <p className="text-muted-foreground">Manage your contacts and leads</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>

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
                              {contact.name?.charAt(0).toUpperCase() + contact.name?.split(" ")[1]?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center mb-1">
                              <h3 className="font-medium">{contact.name}</h3>
                              <Badge className={`ml-2 ${statusColors[contact.status as keyof typeof statusColors]}`}>
                                {contact.status?.charAt(0).toUpperCase() + contact.status?.slice(1)}
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
                          <div className="flex items-center space-x-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-slate-500 hover:text-primary"
                              onClick={() => handleEdit(contact.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-slate-500 hover:text-red-500"
                              onClick={() => handleDelete(contact.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
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

      <AddContactModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddContact}
      />
    </div>
  );
};

export default Contacts;

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, MoreHorizontal, ChevronDown, Briefcase, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import AddDealModal from "@/components/modals/AddDealModal";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Deal {
  id: string;
  title: string;
  company: string;
  value: string;
  contact: string;
  contactInitials: string;
  dueDate: string;
}

interface Column {
  id: string;
  title: string;
  dealIds: string[];
  color: string;
}

const initialDeals: Record<string, Deal> = {
  "deal-1": {
    id: "deal-1",
    title: "Website Redesign",
    company: "Acme Corp",
    value: "$8,500",
    contact: "Alex Johnson",
    contactInitials: "AJ",
    dueDate: "Aug 28",
  },
  "deal-2": {
    id: "deal-2",
    title: "Marketing Campaign",
    company: "Globex Inc",
    value: "$12,000",
    contact: "Samantha Lee",
    contactInitials: "SL",
    dueDate: "Sep 15",
  },
  "deal-3": {
    id: "deal-3",
    title: "Software Integration",
    company: "Initech",
    value: "$15,800",
    contact: "David Martinez",
    contactInitials: "DM",
    dueDate: "Aug 31",
  },
  "deal-4": {
    id: "deal-4",
    title: "Annual Contract",
    company: "Massive Dynamic",
    value: "$24,000",
    contact: "Emily Wong",
    contactInitials: "EW",
    dueDate: "Sep 8",
  },
  "deal-5": {
    id: "deal-5",
    title: "Consulting Project",
    company: "Stark Industries",
    value: "$9,200",
    contact: "James Wilson",
    contactInitials: "JW",
    dueDate: "Sep 22",
  },
};

const initialColumns: Record<string, Column> = {
  "column-1": {
    id: "column-1",
    title: "New Leads",
    dealIds: ["deal-1", "deal-2"],
    color: "bg-blue-500",
  },
  "column-2": {
    id: "column-2",
    title: "Qualified",
    dealIds: ["deal-3"],
    color: "bg-purple-500",
  },
  "column-3": {
    id: "column-3",
    title: "Negotiation",
    dealIds: ["deal-4"],
    color: "bg-yellow-500",
  },
  "column-4": {
    id: "column-4",
    title: "Closed Won",
    dealIds: ["deal-5"],
    color: "bg-green-500",
  },
};

const columnOrder = ["column-1", "column-2", "column-3", "column-4"];

const Deals = () => {
  const [deals, setDeals] = useState(initialDeals);
  const [columns, setColumns] = useState(initialColumns);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const { toast } = useToast();

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    if (sourceColumn.id === destColumn.id) {
      const newDealIds = Array.from(sourceColumn.dealIds);
      newDealIds.splice(source.index, 1);
      newDealIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...sourceColumn,
        dealIds: newDealIds,
      };

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });
      return;
    }

    const sourceIds = Array.from(sourceColumn.dealIds);
    sourceIds.splice(source.index, 1);
    const newSourceColumn = {
      ...sourceColumn,
      dealIds: sourceIds,
    };

    const destIds = Array.from(destColumn.dealIds);
    destIds.splice(destination.index, 0, draggableId);
    const newDestColumn = {
      ...destColumn,
      dealIds: destIds,
    };

    setColumns({
      ...columns,
      [newSourceColumn.id]: newSourceColumn,
      [newDestColumn.id]: newDestColumn,
    });
  };

  const handleAddDeal = (newDeal: any) => {
    setDeals((prev) => ({
      ...prev,
      [newDeal.id]: newDeal,
    }));
    setColumns((prev) => ({
      ...prev,
      "column-1": {
        ...prev["column-1"],
        dealIds: [...prev["column-1"].dealIds, newDeal.id],
      },
    }));
  };

  const handleEdit = (dealId: string) => {
    const deal = deals[dealId];
    setSelectedDeal(deal);
    setIsEditModalOpen(true);
  };

  const handleDelete = (dealId: string) => {
    setSelectedDeal(deals[dealId]);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedDeal) {
      setDeals(prev => {
        const newDeals = { ...prev };
        delete newDeals[selectedDeal.id];
        return newDeals;
      });
      
      const columnWithDeal = Object.values(columns).find(col => 
        col.dealIds.includes(selectedDeal.id)
      );
      
      if (columnWithDeal) {
        setColumns(prev => ({
          ...prev,
          [columnWithDeal.id]: {
            ...columnWithDeal,
            dealIds: columnWithDeal.dealIds.filter(id => id !== selectedDeal.id)
          }
        }));
      }

      toast({
        title: "Deal deleted",
        description: "Deal has been successfully removed.",
      });
      setIsDeleteModalOpen(false);
      setSelectedDeal(null);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDeal) {
      setDeals(prev => ({
        ...prev,
        [selectedDeal.id]: selectedDeal
      }));
      toast({
        title: "Deal updated",
        description: "Deal has been successfully updated.",
      });
      setIsEditModalOpen(false);
      setSelectedDeal(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Deal Pipeline</h1>
          <p className="text-muted-foreground">Track and manage your deals</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Briefcase className="h-4 w-4 mr-2" />
          Add Deal
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {columnOrder.map((columnId, index) => {
          const column = columns[columnId];
          const totalValue = column.dealIds
            .map(dealId => deals[dealId])
            .reduce((sum, deal) => {
              const value = parseFloat(deal.value.replace(/[$,]/g, ''));
              return sum + value;
            }, 0);

          return (
            <Card key={column.id}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                  <h3 className="font-medium">{column.title}</h3>
                </div>
                <div className="mt-2">
                  <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">
                    {column.dealIds.length} {column.dealIds.length === 1 ? 'deal' : 'deals'}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="pb-6">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {columnOrder.map((columnId) => {
              const column = columns[columnId];
              const columnDeals = column.dealIds.map(dealId => deals[dealId]);

              return (
                <div key={column.id} className="flex flex-col h-[calc(100vh-370px)]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                      <h3 className="font-medium">{column.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {column.dealIds.length}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <div 
                        ref={provided.innerRef} 
                        {...provided.droppableProps}
                        className="bg-gray-50 rounded-md p-2 flex-grow overflow-y-auto"
                      >
                        {columnDeals.map((deal, index) => (
                          <Draggable key={deal.id} draggableId={deal.id} index={index}>
                            {(provided) => (
                              <Card 
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="mb-2 shadow-sm"
                              >
                                <CardContent className="p-3">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium text-sm">{deal.title}</h4>
                                      <p className="text-xs text-muted-foreground">{deal.company}</p>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-6 w-6 text-slate-500 hover:text-primary"
                                        onClick={() => handleEdit(deal.id)}
                                      >
                                        <Edit className="h-3.5 w-3.5" />
                                      </Button>
                                      <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-6 w-6 text-slate-500 hover:text-red-500"
                                        onClick={() => handleDelete(deal.id)}
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between mt-3">
                                    <Badge variant="secondary" className="text-xs font-normal">
                                      {deal.value}
                                    </Badge>
                                    <div className="flex items-center">
                                      <Avatar className="h-6 w-6">
                                        <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                          {deal.contactInitials}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="text-xs ml-1.5 text-muted-foreground">
                                        {deal.dueDate}
                                      </span>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        <Button variant="ghost" className="w-full mt-1 h-auto py-1.5 text-muted-foreground text-xs">
                          <Plus className="h-3.5 w-3.5 mr-1" />
                          Add Deal
                        </Button>
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>

      <AddDealModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddDeal}
      />

      <Dialog open={isEditModalOpen} onOpenChange={() => setIsEditModalOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Deal</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Input
                  value={selectedDeal?.title || ""}
                  onChange={(e) => setSelectedDeal(prev => prev ? {...prev, title: e.target.value} : null)}
                  placeholder="Deal title"
                />
                <Input
                  value={selectedDeal?.company || ""}
                  onChange={(e) => setSelectedDeal(prev => prev ? {...prev, company: e.target.value} : null)}
                  placeholder="Company name"
                />
                <Input
                  value={selectedDeal?.value.replace(/[$,]/g, '') || ""}
                  onChange={(e) => setSelectedDeal(prev => prev ? {...prev, value: `$${e.target.value}`} : null)}
                  placeholder="Deal value"
                  type="number"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onOpenChange={() => setIsDeleteModalOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Deal</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this deal? This action cannot be undone.</p>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Deals;

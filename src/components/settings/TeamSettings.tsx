import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useTeamManagement } from "@/hooks/use-team-management";

export const TeamSettings = () => {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [showTeamEditDialog, setShowTeamEditDialog] = useState(false);
  const {
    teamMembers,
    selectedMember,
    newTeamMember,
    setSelectedMember,
    setNewTeamMember,
    inviteTeamMember,
    updateTeamMember,
    removeTeamMember,
  } = useTeamManagement();

  const handleInviteTeamMember = () => {
    if (inviteTeamMember()) {
      setInviteDialogOpen(false);
    }
  };

  const handleEditTeamMember = () => {
    if (updateTeamMember()) {
      setShowTeamEditDialog(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Manage team access and permissions</CardDescription>
        </div>
        <Button onClick={() => setInviteDialogOpen(true)}>
          <Users className="mr-2 h-4 w-4" />
          Invite Team Member
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div 
                key={member.id} 
                className="flex items-center justify-between p-3 rounded-lg border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    className={
                      member.status === "pending" 
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200" 
                        : "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
                    }
                  >
                    {member.status === "pending" ? "Pending" : member.role}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setSelectedMember(member);
                      setShowTeamEditDialog(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {teamMembers.length === 0 && (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-muted" />
              <h3 className="mt-2 text-lg font-medium">No team members</h3>
              <p className="text-sm text-muted-foreground">Invite team members to collaborate</p>
            </div>
          )}

          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium mb-2">Team Roles</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="font-medium">Admin</span>
                <span className="text-muted-foreground">Full access to all features</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Member</span>
                <span className="text-muted-foreground">Can view and edit most content</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Viewer</span>
                <span className="text-muted-foreground">Can only view content</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>

      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Send an invitation to a new team member to join your organization.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="invite-email">Email Address</Label>
              <Input 
                id="invite-email" 
                placeholder="colleague@example.com" 
                value={newTeamMember.email}
                onChange={(e) => setNewTeamMember({...newTeamMember, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invite-role">Role</Label>
              <Select 
                value={newTeamMember.role} 
                onValueChange={(value) => setNewTeamMember({...newTeamMember, role: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Member">Member</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInviteTeamMember}>
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showTeamEditDialog} onOpenChange={setShowTeamEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
            <DialogDescription>
              Update the information and permissions for this team member.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {selectedMember && (
              <>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedMember.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedMember.email}</p>
                    {selectedMember.status === "pending" && (
                      <Badge className="mt-1 bg-yellow-100 text-yellow-800 border-yellow-200">
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input 
                    id="edit-name" 
                    value={selectedMember.name}
                    onChange={(e) => setSelectedMember({...selectedMember, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select 
                    value={selectedMember.role} 
                    onValueChange={(value) => setSelectedMember({...selectedMember, role: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Member">Member</SelectItem>
                      <SelectItem value="Viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
          <DialogFooter className="flex justify-between">
            <Button 
              variant="destructive" 
              onClick={() => {
                if (selectedMember) {
                  removeTeamMember(selectedMember.id);
                  setShowTeamEditDialog(false);
                }
              }}
            >
              Remove
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setShowTeamEditDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditTeamMember}>
                Save Changes
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

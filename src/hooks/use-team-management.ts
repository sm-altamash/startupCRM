
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: string;
  initials: string;
  status: "active" | "pending";
};

type NewTeamMember = {
  email: string;
  role: string;
};

export const useTeamManagement = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 1, name: "Alex Johnson", email: "alex@startup.com", role: "Admin", initials: "AJ", status: "active" },
    { id: 2, name: "Sarah Chen", email: "sarah@startup.com", role: "Member", initials: "SC", status: "active" },
    { id: 3, name: "Michael Lee", email: "michael@startup.com", role: "Member", initials: "ML", status: "pending" }
  ]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [newTeamMember, setNewTeamMember] = useState<NewTeamMember>({ email: "", role: "Member" });

  const inviteTeamMember = () => {
    if (!newTeamMember.email) {
      toast({
        title: "Error",
        description: "Please enter an email address.",
        variant: "destructive",
      });
      return false;
    }

    const newMember = {
      id: teamMembers.length + 1,
      name: newTeamMember.email.split('@')[0],
      email: newTeamMember.email,
      role: newTeamMember.role,
      initials: newTeamMember.email.substring(0, 2).toUpperCase(),
      status: "pending" as const
    };

    setTeamMembers([...teamMembers, newMember]);
    setNewTeamMember({ email: "", role: "Member" });
    
    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${newTeamMember.email}.`,
    });
    return true;
  };

  const updateTeamMember = () => {
    if (!selectedMember) return false;
    
    setTeamMembers(members => 
      members.map(member => 
        member.id === selectedMember.id ? selectedMember : member
      )
    );
    
    toast({
      title: "Team member updated",
      description: `${selectedMember.name}'s information has been updated.`,
    });
    return true;
  };

  const removeTeamMember = (id: number) => {
    setTeamMembers(members => members.filter(member => member.id !== id));
    toast({
      title: "Team member removed",
      description: "The team member has been removed from your organization.",
    });
  };

  return {
    teamMembers,
    selectedMember,
    newTeamMember,
    setSelectedMember,
    setNewTeamMember,
    inviteTeamMember,
    updateTeamMember,
    removeTeamMember,
  };
};

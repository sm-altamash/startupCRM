
import { useState, useRef, ChangeEvent } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Upload, Trash2, Bell, AlertCircle, Edit, Lock, User, Building2, Users, Link, CreditCard } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const Settings = () => {
  // Profile section state
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "Startup Team",
    email: "team@startup.com",
    phone: "555-123-4567",
    role: "Administrator"
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Team section state
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Alex Johnson", email: "alex@startup.com", role: "Admin", initials: "AJ", status: "active" },
    { id: 2, name: "Sarah Chen", email: "sarah@startup.com", role: "Member", initials: "SC", status: "active" },
    { id: 3, name: "Michael Lee", email: "michael@startup.com", role: "Member", initials: "ML", status: "pending" }
  ]);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [newTeamMember, setNewTeamMember] = useState({ email: "", role: "Member" });
  
  // Integration state
  const [connectedApps, setConnectedApps] = useState({
    "Google Calendar": true,
    "Slack": true,
    "Gmail": false,
    "Zoom": false
  });
  
  // Billing state
  const [currentPlan, setCurrentPlan] = useState("Free");
  const [showConfirmUpgrade, setShowConfirmUpgrade] = useState(false);
  const [selectedUpgradePlan, setSelectedUpgradePlan] = useState("");
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    "email-notif": true,
    "task-reminders": true,
    "deal-updates": true,
    "mobile-push": false,
    "browser-notif": true,
    "weekly-summary": true
  });

  // Confirmation dialogs
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showTeamEditDialog, setShowTeamEditDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  // Handle profile image upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
          toast({
            title: "Profile photo updated",
            description: "Your profile photo has been updated successfully.",
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form data changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Save profile changes
  const saveProfileChanges = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  // Delete profile photo
  const deleteProfilePhoto = () => {
    setProfileImage(null);
    toast({
      title: "Photo deleted",
      description: "Your profile photo has been removed.",
    });
  };

  // Handle notification toggle
  const handleNotificationToggle = (id: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    
    toast({
      title: "Notification setting updated",
      description: `${id.replace(/-/g, ' ')} has been ${notificationSettings[id as keyof typeof notificationSettings] ? 'disabled' : 'enabled'}.`,
    });
  };

  // Handle team member invite
  const handleInviteTeamMember = () => {
    if (!newTeamMember.email) {
      toast({
        title: "Error",
        description: "Please enter an email address.",
        variant: "destructive",
      });
      return;
    }

    const newMember = {
      id: teamMembers.length + 1,
      name: newTeamMember.email.split('@')[0],
      email: newTeamMember.email,
      role: newTeamMember.role,
      initials: newTeamMember.email.substring(0, 2).toUpperCase(),
      status: "pending"
    };

    setTeamMembers([...teamMembers, newMember]);
    setNewTeamMember({ email: "", role: "Member" });
    setInviteDialogOpen(false);
    
    toast({
      title: "Invitation sent",
      description: `An invitation has been sent to ${newTeamMember.email}.`,
    });
  };

  // Handle team member edit
  const handleEditTeamMember = () => {
    if (!selectedMember) return;
    
    setTeamMembers(members => 
      members.map(member => 
        member.id === selectedMember.id ? selectedMember : member
      )
    );
    
    setShowTeamEditDialog(false);
    toast({
      title: "Team member updated",
      description: `${selectedMember.name}'s information has been updated.`,
    });
  };

  // Handle team member removal
  const handleRemoveTeamMember = (id: number) => {
    setTeamMembers(members => members.filter(member => member.id !== id));
    toast({
      title: "Team member removed",
      description: "The team member has been removed from your organization.",
    });
  };

  // Handle app connection toggle
  const handleAppConnection = (app: string) => {
    setConnectedApps(prev => ({
      ...prev,
      [app]: !prev[app]
    }));
    
    const isConnected = connectedApps[app as keyof typeof connectedApps];
    
    toast({
      title: isConnected ? `${app} disconnected` : `${app} connected`,
      description: isConnected 
        ? `${app} has been disconnected from your account.` 
        : `${app} has been successfully connected to your account.`,
    });
  };

  // Handle plan upgrade
  const handleUpgrade = (planName: string) => {
    setSelectedUpgradePlan(planName);
    setShowConfirmUpgrade(true);
  };

  // Confirm plan upgrade
  const confirmUpgrade = () => {
    setCurrentPlan(selectedUpgradePlan);
    setShowConfirmUpgrade(false);
    
    toast({
      title: "Plan upgraded",
      description: `Your subscription has been upgraded to ${selectedUpgradePlan}. Thank you for your support!`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings</p>
        </div>
        <Button variant="outline" onClick={() => toast({ title: "Settings refreshed", description: "All settings have been refreshed." })}>
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="mb-4 grid grid-cols-3 md:grid-cols-5 w-full max-w-4xl">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User size={16} />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building2 size={16} />
            <span>Company</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users size={16} />
            <span>Team</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Link size={16} />
            <span>Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard size={16} />
            <span>Billing</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <Avatar className="h-20 w-20">
                    {profileImage ? (
                      <AvatarImage src={profileImage} alt="Profile" />
                    ) : (
                      <AvatarFallback className="text-xl bg-primary/10 text-primary">
                        ST
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Profile Photo</h3>
                    <p className="text-sm text-muted-foreground">
                      This will be displayed on your profile
                    </p>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowDeleteConfirmation(true)}
                    disabled={!profileImage}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                  <Button size="sm" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              <Separator />

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Your name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Email address" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="Phone number" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input 
                    id="role" 
                    placeholder="Your role" 
                    value={formData.role} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>

              <Separator />

              {/* Security */}
              <div>
                <h3 className="font-medium mb-3">Security</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full">
                      <Lock className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full">
                      Enable Two-Factor Authentication
                    </Button>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Switch id="session-timeout" defaultChecked={true} />
                    <div>
                      <Label htmlFor="session-timeout" className="text-base font-normal cursor-pointer">
                        Auto Session Timeout
                      </Label>
                      <p className="text-sm text-muted-foreground">Automatically log out after 30 minutes of inactivity</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Notifications */}
              <div>
                <h3 className="font-medium mb-3">Notification Settings</h3>
                <div className="space-y-3">
                  {[
                    { id: "email-notif", label: "Email Notifications", description: "Receive email notifications about activity", icon: <Bell className="h-4 w-4 text-muted-foreground" /> },
                    { id: "task-reminders", label: "Task Reminders", description: "Get reminders about upcoming tasks", icon: <AlertCircle className="h-4 w-4 text-muted-foreground" /> },
                    { id: "deal-updates", label: "Deal Updates", description: "Be notified when deals are updated", icon: <CheckCircle2 className="h-4 w-4 text-muted-foreground" /> },
                    { id: "mobile-push", label: "Mobile Push Notifications", description: "Receive push notifications on your mobile device", icon: <Bell className="h-4 w-4 text-muted-foreground" /> },
                    { id: "browser-notif", label: "Browser Notifications", description: "Show notifications in your browser", icon: <Bell className="h-4 w-4 text-muted-foreground" /> },
                    { id: "weekly-summary", label: "Weekly Summary", description: "Get a weekly summary of your activity", icon: <CheckCircle2 className="h-4 w-4 text-muted-foreground" /> },
                  ].map((setting) => (
                    <div key={setting.id} className="flex items-start space-x-3">
                      <Switch 
                        id={setting.id} 
                        checked={notificationSettings[setting.id as keyof typeof notificationSettings]}
                        onCheckedChange={() => handleNotificationToggle(setting.id)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center">
                          {setting.icon}
                          <Label htmlFor={setting.id} className="text-base font-normal cursor-pointer ml-2">
                            {setting.label}
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={saveProfileChanges}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Settings</CardTitle>
              <CardDescription>Update your company information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Company Logo */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <div className="h-20 w-20 bg-muted rounded-md flex items-center justify-center">
                    <Building2 className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">Company Logo</h3>
                    <p className="text-sm text-muted-foreground">
                      This will be displayed on all company materials
                    </p>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    Delete
                  </Button>
                  <Button size="sm">
                    Upload
                  </Button>
                </div>
              </div>

              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" placeholder="Company name" defaultValue="Startup Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select defaultValue="Technology">
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select defaultValue="1-10">
                    <SelectTrigger id="companySize">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="501+">501+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://..." defaultValue="https://startup.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Input 
                  id="description" 
                  placeholder="Brief description of your company" 
                  defaultValue="A startup focused on innovative CRM solutions."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Address" defaultValue="123 Startup St." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" defaultValue="San Francisco" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" placeholder="State / Province" defaultValue="CA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP / Postal Code</Label>
                  <Input id="zip" placeholder="ZIP / Postal Code" defaultValue="94107" />
                </div>
              </div>

              <Separator />

              {/* Company preferences */}
              <div>
                <h3 className="font-medium mb-3">Company Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Switch id="fiscal-year" defaultChecked={true} />
                    <div>
                      <Label htmlFor="fiscal-year" className="text-base font-normal cursor-pointer">
                        Custom Fiscal Year
                      </Label>
                      <p className="text-sm text-muted-foreground">Use a custom fiscal year for reporting</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Switch id="timezone" defaultChecked={true} />
                    <div>
                      <Label htmlFor="timezone" className="text-base font-normal cursor-pointer">
                        Automatic Timezone
                      </Label>
                      <p className="text-sm text-muted-foreground">Detect and use user's timezone</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => toast({
                  title: "Company settings saved",
                  description: "Your company information has been updated successfully.",
                })}>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
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
                {/* Team member list */}
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
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect your CRM with other tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Google Calendar", description: "Sync your meetings and events", icon: <svg className="h-8 w-8" viewBox="0 0 24 24"><path fill="#4285F4" d="M12 12v6h6a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6h6v6h-3v6h3z"/></svg> },
                  { name: "Slack", description: "Get notifications in your workspace", icon: <svg className="h-8 w-8" viewBox="0 0 24 24"><path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg> },
                  { name: "Gmail", description: "Track and log emails automatically", icon: <svg className="h-8 w-8" viewBox="0 0 24 24"><path fill="#D14836" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg> },
                  { name: "Zoom", description: "Schedule and join meetings directly", icon: <svg className="h-8 w-8" viewBox="0 0 24 24"><path fill="#2D8CFF" d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8.2-7.066a.562.562 0 0 0-.564-.566h-6.47c-.313 0-.566.253-.566.566v5.128c0 .314.253.568.566.568h6.47c.312 0 .564-.254.564-.568V4.934zm-9.096 8.69c-.121 0-.251-.051-.352-.169-.15-.182-.124-.415.058-.563l1.956-1.622a.379.379 0 0 0 .118-.286V7.145c0-.784.637-1.42 1.42-1.42h7.304c.784 0 1.419.636 1.419 1.42v6.38c0 .783-.635 1.418-1.419 1.418h-7.304c-.208 0-.405-.044-.582-.124l-2.176.842a.445.445 0 0 1-.442-.037z"/></svg> },
                  { name: "GitHub", description: "Connect to your GitHub repositories", icon: <svg className="h-8 w-8" viewBox="0 0 24 24"><path fill="#181717" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
                ].map((integration, i) => (
                  <div key={i} className="flex justify-between items-center p-4 border rounded-lg hover:border-primary/30 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-md flex items-center justify-center">
                        {integration.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                      </div>
                    </div>
                    <div>
                      {connectedApps[integration.name as keyof typeof connectedApps] !== undefined ? (
                        <div className="flex items-center">
                          {connectedApps[integration.name as keyof typeof connectedApps] ? (
                            <>
                              <Badge className="mr-2 bg-green-100 text-green-800 hover:bg-green-100 border border-green-200">Connected</Badge>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleAppConnection(integration.name)}
                              >
                                Disconnect
                              </Button>
                            </>
                          ) : (
                            <Button 
                              size="sm"
                              onClick={() => handleAppConnection(integration.name)}
                            >
                              Connect
                            </Button>
                          )}
                        </div>
                      ) : (
                        <Button size="sm">Connect</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>Manage API keys and access settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-muted/30 rounded-lg border flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Your API Key</h4>
                    <p className="text-sm text-muted-foreground mt-1">Use this key to access the API</p>
                    <div className="mt-2 px-3 py-1 bg-muted rounded border font-mono text-sm">
                      ••••••••••••••••••••••••••••••
                    </div>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">Regenerate</Button>
                    <Button size="sm">Reveal</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">API Rate Limits</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Requests per month</span>
                    <span className="text-sm font-mono">50,000 / 100,000</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded">
                    <div className="h-2 bg-primary rounded" style={{ width: "50%" }}></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Switch id="webhooks" defaultChecked={true} />
                    <Label htmlFor="webhooks">Enable Webhooks</Label>
                  </div>
                  <Button variant="outline" size="sm">Configure Webhooks</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing & Subscription</CardTitle>
              <CardDescription>Manage your subscription plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className={`bg-${currentPlan === "Free" ? "primary/5" : "green-50"} border ${currentPlan === "Free" ? "border-primary/10" : "border-green-200"} rounded-lg p-4`}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium">{currentPlan} Plan</h3>
                      {currentPlan !== "Free" && (
                        <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">Active</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">Your current plan</p>
                  </div>
                  {currentPlan === "Free" ? (
                    <Button>Upgrade</Button>
                  ) : (
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">Cancel Plan</Button>
                      <Button size="sm">Manage Plan</Button>
                    </div>
                  )}
                </div>

                <div className="mt-4 space-y-1">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <p className="text-sm">
                      {currentPlan === "Free" && "Up to 50 contacts"}
                      {currentPlan === "Starter" && "Up to 250 contacts"}
                      {currentPlan === "Professional" && "Unlimited contacts"}
                      {currentPlan === "Enterprise" && "Unlimited contacts + priority support"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <p className="text-sm">
                      {currentPlan === "Free" && "Basic pipeline management"}
                      {currentPlan === "Starter" && "Full pipeline tools"}
                      {currentPlan === "Professional" && "Advanced reporting"}
                      {currentPlan === "Enterprise" && "Custom fields & workflows"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <p className="text-sm">
                      {currentPlan === "Free" && "Task management"}
                      {currentPlan === "Starter" && "Email integration"}
                      {currentPlan === "Professional" && "API access"}
                      {currentPlan === "Enterprise" && "Dedicated support"}
                    </p>
                  </div>
                  
                  {currentPlan !== "Free" && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-sm font-medium">Next billing date: May 24, 2025</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Available Plans</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { 
                      name: "Starter", 
                      price: "$9", 
                      description: "For small startups",
                      features: ["Up to 250 contacts", "Full pipeline tools", "Email integration"],
                      highlight: currentPlan === "Starter"
                    },
                    { 
                      name: "Professional", 
                      price: "$29", 
                      description: "For growing teams",
                      features: ["Unlimited contacts", "Advanced reporting", "API access", "Team collaboration"],
                      recommended: true,
                      highlight: currentPlan === "Professional"
                    },
                    { 
                      name: "Enterprise", 
                      price: "$99", 
                      description: "For larger businesses",
                      features: ["Dedicated support", "Custom fields", "Advanced security", "Workflow automation"],
                      highlight: currentPlan === "Enterprise"
                    },
                  ].map((plan, i) => (
                    <Card 
                      key={i} 
                      className={`${
                        plan.highlight 
                          ? "border-green-300 ring-1 ring-green-300" 
                          : "hover:border-primary/50"
                      } transition-colors relative`}
                    >
                      {plan.highlight && (
                        <Badge className="absolute top-2 right-2 bg-green-100 text-green-800 border-green-200">
                          Current Plan
                        </Badge>
                      )}
                      {plan.recommended && !plan.highlight && (
                        <Badge className="absolute top-2 right-2">
                          Recommended
                        </Badge>
                      )}
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                        <div className="mt-2">
                          <span className="text-2xl font-bold">{plan.price}</span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm mb-4">
                          {plan.features.map((feature, j) => (
                            <li key={j} className="flex items-center">
                              <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        {plan.highlight ? (
                          <Button className="w-full" variant="outline">
                            Current Plan
                          </Button>
                        ) : (
                          <Button 
                            className="w-full" 
                            variant={plan.recommended ? "default" : "outline"}
                            onClick={() => handleUpgrade(plan.name)}
                          >
                            {plan.recommended ? "Recommended" : "Select Plan"}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              {currentPlan !== "Free" && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="font-medium">Billing History</h3>
                    <div className="space-y-2">
                      {[
                        { date: "Apr 24, 2025", amount: "$29.00", status: "paid" },
                        { date: "Mar 24, 2025", amount: "$29.00", status: "paid" },
                        { date: "Feb 24, 2025", amount: "$29.00", status: "paid" },
                      ].map((invoice, i) => (
                        <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{invoice.date}</p>
                            <p className="text-sm text-muted-foreground">
                              {currentPlan} Plan - Monthly
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge 
                              className={
                                invoice.status === "paid" 
                                  ? "bg-green-100 text-green-800 border-green-200" 
                                  : "bg-amber-100 text-amber-800 border-amber-200"
                              }
                            >
                              {invoice.status === "paid" ? "Paid" : "Pending"}
                            </Badge>
                            <span className="font-medium">{invoice.amount}</span>
                            <Button variant="ghost" size="sm">
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Payment Method</h3>
                    <div className="p-4 border rounded-lg flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="bg-muted rounded p-2">
                          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Update
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Delete profile photo confirmation dialog */}
      <Dialog open={showDeleteConfirmation} onOpenChange={setShowDeleteConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Profile Photo</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your profile photo? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteConfirmation(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                deleteProfilePhoto();
                setShowDeleteConfirmation(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Team member invite dialog */}
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
      
      {/* Edit team member dialog */}
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
                  handleRemoveTeamMember(selectedMember.id);
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
      
      {/* Confirm upgrade dialog */}
      <Dialog open={showConfirmUpgrade} onOpenChange={setShowConfirmUpgrade}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Subscription Upgrade</DialogTitle>
            <DialogDescription>
              You're about to upgrade to the {selectedUpgradePlan} Plan. This will take effect immediately.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Plan</span>
                <span className="font-medium">{selectedUpgradePlan}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Price</span>
                <span className="font-medium">
                  {selectedUpgradePlan === "Starter" && "$9/month"}
                  {selectedUpgradePlan === "Professional" && "$29/month"}
                  {selectedUpgradePlan === "Enterprise" && "$99/month"}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between mt-4">
                <span>Today's charge</span>
                <span className="font-bold">
                  {selectedUpgradePlan === "Starter" && "$9.00"}
                  {selectedUpgradePlan === "Professional" && "$29.00"}
                  {selectedUpgradePlan === "Enterprise" && "$99.00"}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmUpgrade(false)}>
              Cancel
            </Button>
            <Button onClick={confirmUpgrade}>
              Confirm Upgrade
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
    </div>
  );
};

export default Settings;

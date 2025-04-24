
import { useState, useRef, ChangeEvent } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Upload, Trash2, Lock, Bell, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const ProfileSettings = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "Startup Team",
    email: "team@startup.com",
    phone: "555-123-4567",
    role: "Administrator"
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [notificationSettings, setNotificationSettings] = useState({
    "email-notif": true,
    "task-reminders": true,
    "deal-updates": true,
    "mobile-push": false,
    "browser-notif": true,
    "weekly-summary": true
  });

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const saveProfileChanges = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const deleteProfilePhoto = () => {
    setProfileImage(null);
    toast({
      title: "Photo deleted",
      description: "Your profile photo has been removed.",
    });
  };

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>Update your personal information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Photo Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <Avatar className="h-20 w-20">
              {profileImage ? (
                <AvatarImage src={profileImage} alt="Profile" />
              ) : (
                <AvatarFallback className="text-xl">ST</AvatarFallback>
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
    </Card>
  );
};

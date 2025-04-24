
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Building2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const CompanySettings = () => {
  const handleSave = () => {
    toast({
      title: "Company settings saved",
      description: "Your company information has been updated successfully.",
    });
  };

  return (
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
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Building2, Users, Link, CreditCard } from "lucide-react";
import { ProfileSettings } from "./ProfileSettings";
import { CompanySettings } from "./CompanySettings";
import { TeamSettings } from "./TeamSettings";
import { IntegrationsSettings } from "./IntegrationsSettings";
import { BillingSettings } from "./BillingSettings";

export const SettingsTabs = () => {
  return (
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
        <ProfileSettings />
      </TabsContent>
      <TabsContent value="company">
        <CompanySettings />
      </TabsContent>
      <TabsContent value="team">
        <TeamSettings />
      </TabsContent>
      <TabsContent value="integrations">
        <IntegrationsSettings />
      </TabsContent>
      <TabsContent value="billing">
        <BillingSettings />
      </TabsContent>
    </Tabs>
  );
};


import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { SettingsTabs } from "@/components/settings/SettingsTabs";

const Settings = () => {
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

      <SettingsTabs />
    </div>
  );
};

export default Settings;


import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

export const IntegrationsSettings = () => {
  const [connectedApps, setConnectedApps] = useState({
    "Google Calendar": true,
    "Slack": true,
    "Gmail": false,
    "Zoom": false
  });

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

  return (
    <>
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
    </>
  );
};

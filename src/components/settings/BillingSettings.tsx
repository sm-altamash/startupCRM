
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useBillingManagement } from "@/hooks/use-billing-management";

export const BillingSettings = () => {
  const [showConfirmUpgrade, setShowConfirmUpgrade] = useState(false);
  const {
    currentPlan,
    selectedUpgradePlan,
    plans,
    billingHistory,
    handleUpgrade,
    confirmUpgrade,
  } = useBillingManagement();

  // Mark the current plan with highlight property
  const plansWithHighlight = plans.map(plan => ({
    ...plan,
    highlight: plan.name === currentPlan
  }));

  return (
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
            {plansWithHighlight.map((plan, i) => (
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
                      onClick={() => {
                        handleUpgrade(plan.name);
                        setShowConfirmUpgrade(true);
                      }}
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
                {billingHistory.map((invoice, i) => (
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
              <Button onClick={() => {
                confirmUpgrade();
                setShowConfirmUpgrade(false);
              }}>
                Confirm Upgrade
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

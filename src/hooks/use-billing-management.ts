
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

type BillingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
  highlight?: boolean; // Added the missing highlight property
};

export const useBillingManagement = () => {
  const [currentPlan, setCurrentPlan] = useState("Free");
  const [selectedUpgradePlan, setSelectedUpgradePlan] = useState("");

  const plans: BillingPlan[] = [
    { 
      name: "Starter", 
      price: "$9", 
      description: "For small startups",
      features: ["Up to 250 contacts", "Full pipeline tools", "Email integration"]
    },
    { 
      name: "Professional", 
      price: "$29", 
      description: "For growing teams",
      features: ["Unlimited contacts", "Advanced reporting", "API access", "Team collaboration"],
      recommended: true
    },
    { 
      name: "Enterprise", 
      price: "$99", 
      description: "For larger businesses",
      features: ["Dedicated support", "Custom fields", "Advanced security", "Workflow automation"]
    },
  ];

  const billingHistory = [
    { date: "Apr 24, 2025", amount: "$29.00", status: "paid" as const },
    { date: "Mar 24, 2025", amount: "$29.00", status: "paid" as const },
    { date: "Feb 24, 2025", amount: "$29.00", status: "paid" as const },
  ];

  const handleUpgrade = (planName: string) => {
    setSelectedUpgradePlan(planName);
    return true;
  };

  const confirmUpgrade = () => {
    setCurrentPlan(selectedUpgradePlan);
    setSelectedUpgradePlan("");
    
    toast({
      title: "Plan upgraded",
      description: `Your subscription has been upgraded to ${selectedUpgradePlan}. Thank you for your support!`,
    });
    return true;
  };

  return {
    currentPlan,
    selectedUpgradePlan,
    plans,
    billingHistory,
    setSelectedUpgradePlan,
    handleUpgrade,
    confirmUpgrade,
  };
};

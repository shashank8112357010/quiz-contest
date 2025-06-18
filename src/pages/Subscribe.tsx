import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "@/components/providers/AuthProvider";
import { useLanguageStore } from "@/lib/languages";
import { updateSubscriptionStatus } from "@/lib/phoneAuth";

// TODO: Replace with your Stripe publishable key
const STRIPE_PUBLISHABLE_KEY =
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_123";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const SUBSCRIPTION_PRICE_ID =
  import.meta.env.VITE_STRIPE_PRICE_ID || "price_123";

const Subscribe: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguageStore();

  const handleSubscribe = async () => {
    if (!user) {
      toast({ title: "Please log in first." });
      navigate("/login");
      return;
    }
    const stripe = await stripePromise;
    if (!stripe) {
      toast({ title: "Stripe failed to load." });
      return;
    }
    // Call your backend to create a Checkout Session
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          priceId: SUBSCRIPTION_PRICE_ID,
        }),
      });
      const data = await res.json();
      if (!data.sessionId) throw new Error("No session ID returned");
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch (err) {
      toast({ title: "Payment error", description: String(err) });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Card className="max-w-lg w-full bg-slate-800/80 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-2xl">
            Subscribe for 90-Day Season
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-white/80 text-lg">
            <ul className="list-disc pl-6 space-y-2">
              <li>Unlock 10 new questions daily for 90 days</li>
              <li>Compete for leaderboard prizes</li>
              <li>Auto-renewal (cancel anytime)</li>
              <li>Support the platform</li>
            </ul>
          </div>
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700"
            onClick={handleSubscribe}
          >
            Subscribe Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Subscribe;

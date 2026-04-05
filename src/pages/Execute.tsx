import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Bug, Check } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import BottomNav from "@/components/BottomNav";
import { Checkbox } from "@/components/ui/checkbox";

type Level = "beginner" | "intermediate" | "advanced";

const experienceToLevel = (exp: string): Level => {
  if (exp.toLowerCase().includes("beginner") || exp.toLowerCase().includes("new")) return "beginner";
  if (exp.toLowerCase().includes("advanced") || exp.toLowerCase().includes("pro")) return "advanced";
  return "intermediate";
};

const beginnerSteps = [
  {
    title: "Open your brokerage app",
    body: "Open the app where you buy and sell stocks — like Robinhood, Fidelity, Webull, or TD Ameritrade. If you don't have one yet, Robinhood or Webull are beginner-friendly options.",
    tip: "Don't have a brokerage account? You'll need one to place trades. It takes about 5 minutes to set up.",
  },
  {
    title: "Search for NVDA",
    body: "In your app's search bar, type 'NVDA' — that's NVIDIA's ticker symbol. Think of it like a shortcode for the company. Tap on NVIDIA Corporation when it appears.",
  },
  {
    title: "Tap 'Buy'",
    body: "Find the Buy button. You'll see options like 'Market order' or 'Limit order'. Choose 'Limit order' — this lets you set the exact price you want to pay instead of whatever the price is right now.",
    tip: "A 'limit order' means you pick your price. A 'market order' buys at whatever the current price is — sometimes that's higher than you expect.",
  },
  {
    title: "Set your price to $885.00",
    body: "Enter $885.00 as your limit price. This means you'll only buy if the stock drops to this price or lower. You won't overpay.",
  },
  {
    title: "Set how many shares",
    body: "Enter the number of shares you want to buy. If you're starting small, even 1 share is fine. That would cost about $885.",
    tip: "Not sure how many? A common rule is to never put more than 5% of your total investing money into one trade.",
  },
  {
    title: "Set your safety net (stop loss)",
    body: "This is optional but highly recommended. Set a 'stop loss' at $870.00. This means if the stock drops to $870, it automatically sells — limiting your loss to about $15 per share.",
    tip: "A stop loss is like a seatbelt. You hope you don't need it, but it protects you if things go wrong.",
  },
  {
    title: "Review and submit",
    body: "Double-check everything: NVDA, Buy, Limit at $885.00, your share count, and stop loss at $870. When it looks right, hit Submit or Confirm.",
  },
];

const intermediateSteps = [
  { title: "Open your brokerage app", instruction: "Launch your preferred trading platform" },
  { title: "Search NVDA", instruction: "Find NVIDIA Corporation in the search" },
  { title: "Select Buy → Limit order", instruction: "Choose limit order for precise entry" },
  { title: "Set limit price: $885.00", instruction: "Enter your target entry price" },
  { title: "Set quantity", instruction: "Position sizing: suggested 2-5% of portfolio" },
  { title: "Set stop loss: $870.00 (-1.7%)", instruction: "Protect downside with automatic exit" },
  { title: "Review and submit", instruction: "NVDA / Buy / Limit $885.00 / Stop $870.00 → Submit" },
];

const advancedRows = [
  { label: "Action", value: "Buy" },
  { label: "Ticker", value: "NVDA" },
  { label: "Order type", value: "Limit" },
  { label: "Entry", value: "$885.00" },
  { label: "Stop loss", value: "$870.00" },
  { label: "Target", value: "$920.00" },
  { label: "Risk", value: "$15/share (1.7%)" },
  { label: "Reward", value: "$35/share (4.0%)" },
  { label: "R:R", value: "1:2.3" },
];

const Execute = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const experience = useUserStore((s) => s.experience);
  const [debugLevel, setDebugLevel] = useState<Level | null>(null);
  const level = debugLevel ?? experienceToLevel(experience);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex min-h-screen justify-center bg-background pb-40">
      <div className="w-full max-w-[430px] px-5 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/strategy/${id}`)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-accent"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-foreground">Execution guide</h1>
          </div>
          <button
            onClick={() => {
              const order: Level[] = ["beginner", "intermediate", "advanced"];
              const idx = order.indexOf(level);
              setDebugLevel(order[(idx + 1) % 3]);
            }}
            className="flex h-7 items-center gap-1 rounded-md px-2 text-[10px] text-muted-foreground hover:bg-accent"
          >
            <Bug size={12} />
            {level}
          </button>
        </div>

        {/* Trade summary pill */}
        <div className="mb-5 flex justify-center">
          <span className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-foreground bg-card">
            NVDA · Buy · $885.00
          </span>
        </div>

        {/* BEGINNER */}
        {level === "beginner" && (
          <div className="flex flex-col gap-3">
            {beginnerSteps.map((step, i) => (
              <div key={i} className="rounded-xl p-4 bg-card">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[13px] font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-[15px] font-bold text-foreground mb-1">{step.title}</p>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{step.body}</p>
                    {step.tip && (
                      <div
                        className="mt-3 rounded-lg p-3"
                        style={{ backgroundColor: "hsla(var(--secondary), 0.1)" }}
                      >
                        <p className="text-xs" style={{ color: "hsl(var(--secondary))" }}>
                          {step.tip}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* INTERMEDIATE */}
        {level === "intermediate" && (
          <div className="rounded-xl bg-card overflow-hidden">
            {intermediateSteps.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-4 py-3.5"
                style={i < intermediateSteps.length - 1 ? { borderBottom: "1px solid hsl(var(--border))" } : {}}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[13px] font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="text-[14px] font-semibold text-foreground">{step.title}</p>
                  <p className="text-[12px] text-muted-foreground mt-0.5">{step.instruction}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ADVANCED */}
        {level === "advanced" && (
          <div className="rounded-xl bg-card overflow-hidden">
            <p className="px-4 pt-4 pb-2 text-sm font-bold text-foreground">Order summary</p>
            {advancedRows.map((row, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-2.5"
                style={i < advancedRows.length - 1 ? { borderBottom: "1px solid hsl(var(--border))" } : {}}
              >
                <span className="text-[13px] text-muted-foreground">{row.label}</span>
                <span className="text-[13px] font-medium text-foreground">{row.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Bottom actions */}
        <div
          className="fixed bottom-16 left-0 right-0 z-40 flex justify-center"
          style={{ backgroundColor: "hsl(var(--background))", borderTop: "1px solid hsl(var(--border))" }}
        >
          <div className="w-full max-w-[430px] px-5 py-3">
            <label className="flex items-center gap-2.5 mb-3 cursor-pointer">
              <Checkbox
                checked={agreed}
                onCheckedChange={(v) => setAgreed(v === true)}
                className="h-5 w-5 rounded border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-[13px] text-muted-foreground">I've read and understand this trade</span>
            </label>
            <button
              disabled={!agreed}
              onClick={() => navigate(`/approve/${id}`)}
              className="w-full rounded-lg bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              I'm ready to approve
            </button>
            <button
              onClick={() => navigate(`/strategy/${id}`)}
              className="mt-2 w-full text-center text-sm text-muted-foreground"
            >
              Go back to strategy
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Execute;

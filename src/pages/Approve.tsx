import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import BottomNav from "@/components/BottomNav";

const tradeRows = [
  { label: "Action", value: "Buy", color: "" },
  { label: "Order type", value: "Limit order", color: "" },
  { label: "Entry price", value: "$885.00", color: "" },
  { label: "Stop loss", value: "$870.00", color: "text-destructive" },
  { label: "Target", value: "$920.00", color: "text-[hsl(168,100%,42%)]" },
  { label: "Risk per share", value: "$15.00", color: "" },
  { label: "Potential gain per share", value: "$35.00", color: "" },
];

const Approve = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [approved, setApproved] = useState(false);
  const [showNotReady, setShowNotReady] = useState(false);

  const bothChecked = check1 && check2;

  if (approved) {
    return (
      <div className="flex min-h-screen justify-center bg-background pb-20">
        <div className="w-full max-w-[430px] px-5 pt-16 flex flex-col items-center">
          {/* Animated checkmark */}
          <div className="mb-6">
            <svg width="80" height="80" viewBox="0 0 80 80" className="animate-scale-in">
              <circle cx="40" cy="40" r="36" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" opacity="0.2" />
              <circle
                cx="40" cy="40" r="36" fill="none"
                stroke="hsl(var(--primary))" strokeWidth="3"
                strokeDasharray="226" strokeDashoffset="0"
                strokeLinecap="round"
                className="animate-[draw-circle_0.6s_ease-out]"
                style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
              />
              <path
                d="M24 42 L35 53 L56 30"
                fill="none" stroke="hsl(var(--primary))" strokeWidth="3.5"
                strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="50" strokeDashoffset="0"
                className="animate-[draw-check_0.4s_ease-out_0.4s_both]"
              />
            </svg>
          </div>

          <h1 className="text-[22px] font-bold text-foreground mb-2">You're all set!</h1>
          <p className="text-sm text-muted-foreground mb-6">Here's what to do next:</p>

          <div className="w-full rounded-xl bg-card p-4 mb-8">
            {["Open your brokerage app", "Place the order exactly as described", "Come back tomorrow — I'll have your next trade ready"].map((step, i) => (
              <div key={i} className="flex items-start gap-3 py-2.5">
                <span className="text-[13px] font-bold text-primary">{i + 1}.</span>
                <span className="text-[13px] text-foreground">{step}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/home")}
            className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground mb-3"
          >
            Back to home
          </button>
          <button
            onClick={() => navigate(`/strategy/${id}`)}
            className="w-full rounded-xl border border-border py-3.5 text-sm font-semibold text-foreground"
          >
            View trade details again
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen justify-center bg-background pb-40">
      <div className="w-full max-w-[430px] px-5 pt-6">
        {/* Header */}
        <div className="flex items-center mb-5">
          <button
            onClick={() => navigate(`/execute/${id}`)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-accent"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="flex-1 text-center text-[20px] font-bold text-foreground pr-9">Review your trade</h1>
        </div>

        {/* Trade summary card */}
        <div className="rounded-2xl bg-card p-5 mb-4">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-[20px] font-bold text-foreground">NVDA</span>
            <span className="text-[13px] text-muted-foreground">NVIDIA Corporation</span>
          </div>
          <div className="h-px bg-border mb-3" />

          {tradeRows.map((row, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <span className="text-sm text-muted-foreground">{row.label}</span>
              <span className={`text-sm font-medium ${row.color || "text-foreground"}`}>{row.value}</span>
            </div>
          ))}

          <div className="h-px bg-border my-3" />

          {/* Risk/reward mini-cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-background p-3 border-l-[3px] border-destructive">
              <p className="text-[11px] text-muted-foreground mb-1">If it goes wrong</p>
              <p className="text-[13px] font-medium text-destructive">You lose up to $15/share</p>
            </div>
            <div className="rounded-lg bg-background p-3 border-l-[3px] border-[hsl(168,100%,42%)]">
              <p className="text-[11px] text-muted-foreground mb-1">If it goes right</p>
              <p className="text-[13px] font-medium text-[hsl(168,100%,42%)]">You gain up to $35/share</p>
            </div>
          </div>
        </div>

        {/* AI Confidence */}
        <div className="flex items-center gap-3 mb-4 px-1">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="13" fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
            <circle
              cx="16" cy="16" r="13" fill="none"
              stroke="hsl(var(--primary))" strokeWidth="3"
              strokeDasharray={`${0.87 * 81.68} ${81.68}`}
              strokeLinecap="round"
              style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
            />
            <text x="16" y="17" textAnchor="middle" dominantBaseline="middle" fill="hsl(var(--foreground))" fontSize="8" fontWeight="700">87</text>
          </svg>
          <span className="text-[13px] text-muted-foreground">AI confidence: 87% — High</span>
        </div>

        {/* Important notice */}
        <div className="rounded-xl bg-card p-4 border-l-4 border-destructive mb-5">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Investy provides analysis and suggestions, not financial advice. All trades are your decision. Only invest what you can afford to lose.
          </p>
        </div>

        {/* Bottom actions */}
        <div
          className="fixed bottom-16 left-0 right-0 z-40 flex justify-center border-t border-border"
          style={{ backgroundColor: "hsl(var(--background))" }}
        >
          <div className="w-full max-w-[430px] px-5 py-4">
            {/* Checkboxes */}
            <label className="flex items-start gap-2.5 mb-3 cursor-pointer">
              <Checkbox
                checked={check1}
                onCheckedChange={(v) => setCheck1(v === true)}
                className="mt-0.5 h-5 w-5 rounded border-muted data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-[13px] text-foreground leading-snug">I understand this trade and the risks involved</span>
            </label>
            <label className="flex items-start gap-2.5 mb-4 cursor-pointer">
              <Checkbox
                checked={check2}
                onCheckedChange={(v) => setCheck2(v === true)}
                className="mt-0.5 h-5 w-5 rounded border-muted data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-[13px] text-foreground leading-snug">This is my own decision — Investy is a tool, not an advisor</span>
            </label>

            <button
              disabled={!bothChecked}
              onClick={() => setApproved(true)}
              className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-opacity disabled:opacity-40"
            >
              Approve — I'll place this trade
            </button>

            {/* Not ready yet */}
            <button
              onClick={() => setShowNotReady(!showNotReady)}
              className="mt-3 w-full text-center text-sm text-muted-foreground"
            >
              Not ready yet
            </button>

            {showNotReady && (
              <div className="mt-3 rounded-xl bg-card p-4 animate-fade-in">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-foreground">No worries! You can:</p>
                  <button onClick={() => setShowNotReady(false)} className="text-muted-foreground">
                    <X size={16} />
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => navigate(`/strategy/${id}`)} className="text-left text-[13px] text-primary">
                    Review the strategy again
                  </button>
                  <button onClick={() => navigate("/trade")} className="text-left text-[13px] text-primary">
                    See other trades
                  </button>
                  <button onClick={() => navigate("/home")} className="text-left text-[13px] text-primary">
                    Go home
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Approve;

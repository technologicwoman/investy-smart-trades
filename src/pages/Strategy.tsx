import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, AlertTriangle, TrendingUp, MessageCircle, Newspaper, Bug } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import BottomNav from "@/components/BottomNav";

type Level = "beginner" | "intermediate" | "advanced";

const content = {
  strategyPill: {
    beginner: "Riding the momentum",
    intermediate: "Momentum breakout",
    advanced: "Long momentum — breakout above R1",
  },
  why: {
    beginner:
      "NVIDIA's stock price just broke through a price ceiling it's been stuck under for weeks. When this happens, stocks often keep climbing. Think of it like water finally breaking through a dam — the pressure has been building, and now it's flowing. Social media buzz around AI chips is very high, and there's a big product announcement next week that could push the price even higher.",
    intermediate:
      "NVDA broke above its 50-day moving average with strong volume confirmation. Social sentiment is elevated (85th percentile on StockTwits), and the upcoming GTC keynote serves as a near-term catalyst. RSI is at 62 — bullish but not overbought.",
    advanced:
      "Long entry on confirmed breakout above 50-DMA ($882) with volume 2.1x average. RSI(14) 62.3, MACD crossover confirmed on daily. IV rank 34 — options relatively cheap for directional play. Key support at $870 (prior resistance turned support). Catalyst: GTC keynote March 18.",
  },
  risk: {
    beginner:
      "If the overall market drops sharply, even good stocks get pulled down. Also, if NVIDIA's announcement disappoints, the stock could fall back below where we'd buy it. That's why we set a 'stop loss' — a safety net that limits how much you can lose.",
    intermediate:
      "Broader market selloff could invalidate the breakout. Disappointing GTC keynote would likely gap the stock below support. Stop loss at $870 limits downside to ~1.7%.",
    advanced:
      "Systematic risk from macro (Fed commentary this week). Sector rotation out of semis possible if yields spike. Max loss at stop: -1.7% ($15/share). Consider tightening stop to $875 if entry fills above $888.",
  },
  confidence: {
    beginner: "High confidence — multiple positive signals are lining up",
    intermediate: "Strong technical + sentiment alignment with near-term catalyst",
    advanced: "Confluence: technical breakout + sentiment 85th pctl + catalyst within 5 sessions",
  },
  sentiment: {
    beginner: { social: "High", technical: "Buy signal", news: "Positive" },
    intermediate: { social: "High (85th)", technical: "Buy — RSI 62", news: "Catalyst soon" },
    advanced: { social: "85th pctl", technical: "MACD cross + RSI 62", news: "Catalyst Mar 18" },
  },
};

const experienceToLevel = (exp: string): Level => {
  if (exp.toLowerCase().includes("beginner") || exp.toLowerCase().includes("new")) return "beginner";
  if (exp.toLowerCase().includes("advanced") || exp.toLowerCase().includes("pro")) return "advanced";
  return "intermediate";
};

const Strategy = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const experience = useUserStore((s) => s.experience);
  const [debugLevel, setDebugLevel] = useState<Level | null>(null);
  const level = debugLevel ?? experienceToLevel(experience);

  const entry = 885;
  const target = 920;
  const stopLoss = 870;
  const riskAmt = entry - stopLoss; // 15
  const rewardAmt = target - entry; // 35
  const riskPct = Math.round((riskAmt / (riskAmt + rewardAmt)) * 100);
  const rewardPct = 100 - riskPct;
  const rrRatio = (rewardAmt / riskAmt).toFixed(1);
  const confidenceValue = 87;

  // SVG ring params
  const ringSize = 88;
  const strokeWidth = 6;
  const radius = (ringSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (confidenceValue / 100) * circumference;

  return (
    <div className="flex min-h-screen justify-center bg-background pb-40">
      <div className="w-full max-w-[430px] px-5 pt-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/trade")}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-accent"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-foreground">Strategy</h1>
          </div>
          {/* Debug toggle */}
          <div className="relative">
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
        </div>

        {/* Ticker info */}
        <div className="mb-1 flex items-center gap-2">
          <span
            className="rounded-full px-3 py-1 text-base font-bold text-foreground"
            style={{ backgroundColor: "hsl(var(--muted))" }}
          >
            NVDA
          </span>
          <span className="text-[13px] text-muted-foreground">NVIDIA Corporation</span>
        </div>
        <p className="text-[22px] font-bold text-foreground mb-0.5">$892.40</p>
        <p className="text-sm mb-4" style={{ color: "hsl(var(--positive))" }}>+2.4% today</p>

        {/* Strategy type pill */}
        <span
          className="mb-4 inline-block rounded-lg px-3 py-1 text-xs font-medium"
          style={{
            backgroundColor: "hsla(var(--secondary), 0.15)",
            color: "hsl(var(--secondary))",
          }}
        >
          {content.strategyPill[level]}
        </span>

        {/* The Trade card */}
        <div className="mt-3 rounded-xl p-4" style={{ backgroundColor: "hsl(var(--card))" }}>
          <div className="grid grid-cols-3 gap-2 text-center mb-4">
            <div>
              <p className="text-[11px] text-muted-foreground mb-1">Entry</p>
              <p className="text-base font-bold text-foreground">${entry}.00</p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground mb-1">Target</p>
              <p className="text-base font-bold" style={{ color: "hsl(var(--positive))" }}>${target}.00</p>
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground mb-1">Stop loss</p>
              <p className="text-base font-bold" style={{ color: "hsl(var(--negative))" }}>${stopLoss}.00</p>
            </div>
          </div>

          {/* Risk/Reward bar */}
          <div className="mb-2">
            <div className="flex h-2.5 w-full overflow-hidden rounded-full">
              <div
                className="h-full rounded-l-full"
                style={{ width: `${riskPct}%`, backgroundColor: "hsl(var(--negative))" }}
              />
              <div
                className="h-full rounded-r-full"
                style={{ width: `${rewardPct}%`, backgroundColor: "hsl(var(--positive))" }}
              />
            </div>
            <p className="mt-1.5 text-center text-xs text-muted-foreground">
              Risk/Reward 1:{rrRatio}
            </p>
          </div>
        </div>

        {/* Why this trade */}
        <div className="mt-5">
          <h2 className="text-sm font-bold text-foreground mb-2">Why this trade</h2>
          <p className="text-[13px] text-muted-foreground leading-relaxed">{content.why[level]}</p>
        </div>

        {/* What could go wrong */}
        <div className="mt-5">
          <div className="flex items-center gap-1.5 mb-2">
            <AlertTriangle size={14} style={{ color: "hsl(var(--negative))" }} />
            <h2 className="text-sm font-bold text-foreground">What could go wrong</h2>
          </div>
          <p className="text-[13px] text-muted-foreground leading-relaxed">{content.risk[level]}</p>
        </div>

        {/* Confidence meter */}
        <div className="mt-6 flex flex-col items-center">
          <p className="text-xs text-muted-foreground mb-3">AI confidence</p>
          <div className="relative flex items-center justify-center" style={{ width: ringSize, height: ringSize }}>
            <svg width={ringSize} height={ringSize} className="-rotate-90">
              <circle
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={radius}
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth={strokeWidth}
              />
              <circle
                cx={ringSize / 2}
                cy={ringSize / 2}
                r={radius}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />
            </svg>
            <span className="absolute text-xl font-bold text-foreground">{confidenceValue}%</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground text-center max-w-[280px]">
            {content.confidence[level]}
          </p>
        </div>

        {/* Sentiment breakdown */}
        <div className="mt-6 grid grid-cols-3 gap-2">
          {[
            { icon: MessageCircle, label: "Social", value: content.sentiment[level].social },
            { icon: TrendingUp, label: "Technical", value: content.sentiment[level].technical },
            { icon: Newspaper, label: "News", value: content.sentiment[level].news },
          ].map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-1.5 rounded-lg p-2.5"
              style={{ backgroundColor: "hsl(var(--card))" }}
            >
              <s.icon size={14} style={{ color: "hsl(var(--positive))" }} />
              <span className="text-[10px] text-muted-foreground">{s.label}</span>
              <span className="text-[11px] font-medium text-center" style={{ color: "hsl(var(--positive))" }}>
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div
          className="fixed bottom-16 left-0 right-0 z-40 flex justify-center"
          style={{ backgroundColor: "hsl(var(--background))", borderTop: "1px solid hsl(var(--border))" }}
        >
          <div className="w-full max-w-[430px] px-5 py-3">
            <button
              onClick={() => navigate(`/execute/${id}`)}
              className="w-full rounded-lg bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Show me how to do this
            </button>
            <div className="mt-2 flex items-center justify-center gap-6">
              {level !== "beginner" && (
                <button
                  onClick={() => {
                    const order: Level[] = ["beginner", "intermediate", "advanced"];
                    const idx = order.indexOf(level);
                    if (idx > 0) setDebugLevel(order[idx - 1]);
                  }}
                  className="text-sm font-medium"
                  style={{ color: "hsl(var(--secondary))" }}
                >
                  Explain simpler
                </button>
              )}
              <button
                onClick={() => navigate("/trade")}
                className="text-sm text-muted-foreground"
              >
                Not interested
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Strategy;

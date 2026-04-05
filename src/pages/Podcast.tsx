import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, TrendingUp, Globe, Sparkles, Play } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import BottomNav from "@/components/BottomNav";

const movers = [
  { symbol: "NVDA", change: "+3.2% pre-market", note: "GTC keynote today", up: true },
  { symbol: "TSLA", change: "-1.8% pre-market", note: "Delivery numbers miss", up: false },
  { symbol: "AAPL", change: "+0.5% pre-market", note: "New product rumor", up: true },
];

const investyTake: Record<string, string> = {
  beginner:
    "Today looks like a good day to watch and learn. If you're new, pay attention to how tech stocks react to the NVIDIA event — it'll teach you how catalysts move prices.",
  intermediate:
    "Momentum is your friend today. Look for breakouts in semiconductor names, especially post-NVDA keynote. Manage risk tight — Fed on Wednesday could unwind gains.",
  advanced:
    "Semis offer the cleanest setups today. NVDA above $882 is the flagship play. Consider hedging directional exposure ahead of Wednesday's FOMC commentary. IV expansion likely by EOD Tuesday.",
};

const waveHeights = [12, 20, 28, 16, 32, 24, 18, 30, 14, 26, 22, 34, 18, 28, 12, 24, 30, 16, 20, 26];

const Podcast = () => {
  const navigate = useNavigate();
  const { experience } = useUserStore();
  const level = (experience || "beginner") as "beginner" | "intermediate" | "advanced";

  return (
    <div className="flex min-h-screen justify-center bg-background pb-40">
      <div className="w-full max-w-[430px] px-5 pt-6">
        {/* Header */}
        <p className="text-lg font-bold" style={{ color: "#F0F0F5" }}>
          Market podcast
        </p>
        <p className="text-[13px] text-muted-foreground mt-0.5">
          Your daily market briefing
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Monday, April 7, 2026
        </p>

        {/* Audio player placeholder */}
        <div
          className="mt-5 flex flex-col items-center gap-3 rounded-xl p-5"
          style={{ backgroundColor: "#14141E", opacity: 0.4 }}
        >
          {/* Waveform */}
          <div className="flex items-end gap-[3px] h-9">
            {waveHeights.map((h, i) => (
              <div
                key={i}
                className="w-[3px] rounded-full"
                style={{ height: h, backgroundColor: "#7C5CFC" }}
              />
            ))}
          </div>
          {/* Play button */}
          <button
            className="flex h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: "#7C5CFC" }}
            disabled
          >
            <Play size={24} fill="white" color="white" />
          </button>
          <p className="text-[11px] text-muted-foreground">Audio coming soon</p>
          <p className="text-[11px] text-muted-foreground">~5 min read</p>
        </div>

        {/* Written briefing */}
        <p className="text-sm font-bold mt-6 mb-3" style={{ color: "#F0F0F5" }}>
          Today's briefing
        </p>

        <div className="flex flex-col gap-3">
          {/* Section 1 */}
          <div className="rounded-xl p-4" style={{ backgroundColor: "#14141E" }}>
            <div className="flex items-center gap-2 mb-2">
              <Clock size={14} color="#8B8B9E" />
              <p className="text-sm font-bold" style={{ color: "#F0F0F5" }}>
                What happened overnight
              </p>
            </div>
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              Asian markets closed mixed — the Nikkei gained 0.6% on strong tech earnings while the
              Hang Seng dipped 0.3%. European futures are pointing slightly higher. US futures
              suggest a flat open.
            </p>
          </div>

          {/* Section 2 */}
          <div className="rounded-xl p-4" style={{ backgroundColor: "#14141E" }}>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={14} color="#00F0A0" />
              <p className="text-sm font-bold" style={{ color: "#F0F0F5" }}>
                Movers to watch
              </p>
            </div>
            <div className="flex gap-2.5 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1">
              {movers.map((m) => (
                <div
                  key={m.symbol}
                  className="flex-shrink-0 rounded-lg px-3.5 py-2.5"
                  style={{
                    backgroundColor: "#0B0B12",
                    border: "1px solid #1E1E2A",
                    borderRadius: 10,
                    minWidth: 130,
                  }}
                >
                  <p className="text-xs font-bold" style={{ color: "#F0F0F5" }}>
                    {m.symbol}
                  </p>
                  <p
                    className="text-[11px] mt-0.5 font-medium"
                    style={{ color: m.up ? "#00D4AA" : "#FF4757" }}
                  >
                    {m.change}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{m.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3 */}
          <div className="rounded-xl p-4" style={{ backgroundColor: "#14141E" }}>
            <div className="flex items-center gap-2 mb-2">
              <Globe size={14} color="#7C5CFC" />
              <p className="text-sm font-bold" style={{ color: "#F0F0F5" }}>
                The big picture
              </p>
            </div>
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              The market is in a cautious-bullish mood. The S&P 500 is up 2.3% this month but
              trading near resistance levels. The Fed speaks Wednesday, which could shift sentiment.
              For day traders: focus on momentum plays in tech — that's where the volume and
              volatility are right now.
            </p>
          </div>

          {/* Section 4 — adaptive */}
          <div className="rounded-xl p-4" style={{ backgroundColor: "#14141E" }}>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} color="#00F0A0" />
              <p className="text-sm font-bold" style={{ color: "#F0F0F5" }}>
                Investy's take
              </p>
            </div>
            <p className="text-[13px] leading-relaxed text-muted-foreground">
              {investyTake[level]}
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <button
            onClick={() => navigate("/trade")}
            className="w-full py-3.5 rounded-xl text-sm font-semibold transition-transform active:scale-[0.98]"
            style={{ backgroundColor: "#00F0A0", color: "#0B0B12" }}
          >
            See today's trades
          </button>
          <p className="text-[12px] text-muted-foreground text-center">
            Based on this briefing, Investy picked 3 trades for you
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Podcast;

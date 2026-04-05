import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const featured = {
  ticker: "NVDA",
  company: "NVIDIA Corporation",
  price: "$892.40",
  change: "+2.4%",
  up: true,
  confidence: 87,
  summary:
    "Strong momentum above 50-day MA with high social sentiment and upcoming catalyst.",
  sentiment: [
    { label: "Social: High", color: "#00D4AA" },
    { label: "Technical: Buy", color: "#00F0A0" },
    { label: "News: Positive", color: "#7C5CFC" },
  ],
  id: 1,
};

const others = [
  {
    ticker: "AAPL",
    company: "Apple Inc.",
    price: "$198.11",
    change: "+1.1%",
    up: true,
    confidence: 74,
    summary: "Steady uptrend with strong support at $195 level.",
    id: 2,
  },
  {
    ticker: "TSLA",
    company: "Tesla, Inc.",
    price: "$248.52",
    change: "-0.8%",
    up: false,
    confidence: 68,
    summary: "Volatility play ahead of earnings with elevated options flow.",
    id: 3,
  },
];

const Trade = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen justify-center bg-background pb-24">
      <div className="w-full max-w-[430px] px-5 pt-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-1">
          <button
            onClick={() => navigate("/home")}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-accent"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold text-foreground">Trade of the day</h1>
        </div>
        <p className="text-[11px] text-muted-foreground mb-5 ml-12">
          Updated today at 9:30 AM ET
        </p>

        {/* Featured card */}
        <div
          className="relative overflow-hidden p-4 mb-3"
          style={{
            backgroundColor: "#14141E",
            borderRadius: "12px",
          }}
        >
          {/* Gradient left border */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1"
            style={{
              background: "linear-gradient(180deg, #00F0A0 0%, #7C5CFC 100%)",
            }}
          />

          {/* Featured badge */}
          <span
            className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium mb-3"
            style={{ backgroundColor: "rgba(0,240,160,0.15)", color: "#00F0A0" }}
          >
            Featured
          </span>

          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-xl font-bold text-foreground">{featured.ticker}</p>
              <p className="text-[13px] text-muted-foreground">{featured.company}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-foreground">{featured.price}</p>
              <p
                className="text-sm"
                style={{ color: featured.up ? "#00D4AA" : "#FF4757" }}
              >
                {featured.change}
              </p>
            </div>
          </div>

          {/* Confidence bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-muted-foreground">AI Confidence</span>
              <span className="text-[11px] font-bold text-foreground">
                {featured.confidence}%
              </span>
            </div>
            <div className="h-1.5 rounded-full" style={{ backgroundColor: "#1E1E2A" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${featured.confidence}%`,
                  backgroundColor: "#00F0A0",
                }}
              />
            </div>
          </div>

          {/* Summary */}
          <p className="text-[13px] text-muted-foreground mb-3">
            {featured.summary}
          </p>

          {/* Sentiment pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {featured.sentiment.map((s) => (
              <span
                key={s.label}
                className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] text-foreground"
                style={{ backgroundColor: "#1E1E2A" }}
              >
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                {s.label}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate(`/strategy/${featured.id}`)}
            className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            style={{ borderRadius: "8px" }}
          >
            See full strategy
          </button>
        </div>

        {/* Other picks */}
        {others.map((t) => (
          <div
            key={t.id}
            className="p-4 mb-3 border"
            style={{
              backgroundColor: "#14141E",
              borderColor: "#1E1E2A",
              borderRadius: "12px",
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-base font-bold text-foreground">{t.ticker}</p>
                <p className="text-[13px] text-muted-foreground">{t.company}</p>
              </div>
              <div className="text-right">
                <p className="text-[15px] font-bold text-foreground">{t.price}</p>
                <p
                  className="text-xs"
                  style={{ color: t.up ? "#00D4AA" : "#FF4757" }}
                >
                  {t.change}
                </p>
              </div>
            </div>

            {/* Confidence */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-muted-foreground">AI Confidence</span>
                <span className="text-[11px] font-bold text-foreground">
                  {t.confidence}%
                </span>
              </div>
              <div className="h-1.5 rounded-full" style={{ backgroundColor: "#1E1E2A" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${t.confidence}%`,
                    backgroundColor: "#00F0A0",
                  }}
                />
              </div>
            </div>

            <p className="text-[13px] text-muted-foreground mb-3">{t.summary}</p>

            <button
              onClick={() => navigate(`/strategy/${t.id}`)}
              className="text-sm font-medium transition-opacity hover:opacity-80"
              style={{ color: "#00F0A0" }}
            >
              See strategy →
            </button>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Trade;

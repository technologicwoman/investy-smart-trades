import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { ArrowRight, Search, Play } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const tickers = [
  { name: "S&P 500", price: "5,428.12", change: "+0.83%", up: true },
  { name: "NASDAQ", price: "17,102.55", change: "+1.12%", up: true },
  { name: "DOW", price: "39,872.30", change: "-0.21%", up: false },
];

const topMovers = [
  { symbol: "NVDA", change: "+4.2%", up: true },
  { symbol: "TSLA", change: "+2.8%", up: true },
  { symbol: "AAPL", change: "-1.1%", up: false },
  { symbol: "META", change: "+3.5%", up: true },
  { symbol: "AMZN", change: "+1.9%", up: true },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function formatDate() {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

const Home = () => {
  const navigate = useNavigate();
  const { firstName } = useUserStore();
  const name = firstName || "Investor";

  return (
    <div className="flex min-h-screen justify-center bg-background pb-24">
      <div className="w-full max-w-[430px] px-5 pt-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-xs text-muted-foreground">
              {getGreeting()}, {name}
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {formatDate()}
            </p>
          </div>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold"
            style={{ backgroundColor: "#14141E", color: "#00F0A0" }}
          >
            {name[0].toUpperCase()}
          </div>
        </div>

        {/* Market tickers */}
        <div className="flex gap-2.5 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-hide">
          {tickers.map((t) => (
            <div
              key={t.name}
              className="flex-shrink-0 rounded-lg px-3.5 py-2.5"
              style={{
                backgroundColor: "#14141E",
                borderRadius: "12px",
                minWidth: "120px",
              }}
            >
              <p className="text-[11px] text-muted-foreground">{t.name}</p>
              <p className="text-base font-bold text-foreground mt-0.5">
                {t.price}
              </p>
              <p
                className="text-xs mt-0.5"
                style={{ color: t.up ? "#00D4AA" : "#FF4757" }}
              >
                {t.change}
              </p>
            </div>
          ))}
        </div>

        {/* Market mood */}
        <div className="mb-5">
          <span
            className="inline-block rounded-full px-3 py-1 text-[11px] font-medium"
            style={{
              backgroundColor: "rgba(0,212,170,0.15)",
              color: "#00D4AA",
            }}
          >
            ● Bullish
          </span>
        </div>

        {/* Action cards */}
        <div className="flex flex-col gap-3 mb-6">
          {/* Trade of the day */}
          <button
            onClick={() => navigate("/trade")}
            className="flex items-center justify-between w-full p-4 text-left transition-transform active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #00F0A0 0%, #7C5CFC 100%)",
              borderRadius: "16px",
            }}
          >
            <div>
              <p className="text-base font-bold" style={{ color: "#0B0B12" }}>
                Trade of the day
              </p>
              <p className="text-[13px] mt-0.5" style={{ color: "rgba(0,0,0,0.6)" }}>
                3 picks ready for you
              </p>
            </div>
            <ArrowRight size={20} color="#0B0B12" />
          </button>

          {/* Research */}
          <button
            onClick={() => navigate("/research")}
            className="flex items-center justify-between w-full p-4 text-left border transition-transform active:scale-[0.98]"
            style={{
              backgroundColor: "#14141E",
              borderColor: "#1E1E2A",
              borderRadius: "12px",
            }}
          >
            <div>
              <p className="text-[15px] font-bold text-foreground">Research</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Search any ticker, sector, or trend
              </p>
            </div>
            <Search size={18} color="#8B8B9E" />
          </button>

          {/* Podcast */}
          <button
            onClick={() => navigate("/podcast")}
            className="flex items-center justify-between w-full p-4 text-left border transition-transform active:scale-[0.98]"
            style={{
              backgroundColor: "#14141E",
              borderColor: "#1E1E2A",
              borderRadius: "12px",
            }}
          >
            <div>
              <p className="text-[15px] font-bold text-foreground">
                Market podcast
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Today's 5-min briefing
              </p>
            </div>
            <Play size={18} color="#7C5CFC" />
          </button>
        </div>

        {/* Top movers */}
        <div className="mb-6">
          <p className="text-[13px] font-bold text-muted-foreground mb-3">
            Top movers
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
            {topMovers.map((m) => (
              <button
                key={m.symbol}
                onClick={() => navigate(`/research?ticker=${m.symbol}`)}
                className="flex-shrink-0 rounded-lg px-3 py-2 transition-transform active:scale-95"
                style={{ backgroundColor: "#14141E", borderRadius: "8px" }}
              >
                <p className="text-xs font-bold text-foreground">{m.symbol}</p>
                <p
                  className="text-[11px] mt-0.5"
                  style={{ color: m.up ? "#00D4AA" : "#FF4757" }}
                >
                  {m.change}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;

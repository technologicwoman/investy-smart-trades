import { useState } from "react";
import { Search } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const categories = [
  { name: "Tech", subtitle: "AI, semis, FAANG", accent: "#00F0A0" },
  { name: "Healthcare", subtitle: "Biotech, pharma", accent: "#7C5CFC" },
  { name: "Energy", subtitle: "Oil, renewables, EVs", accent: "#00D4AA" },
  { name: "Crypto", subtitle: "BTC, ETH, altcoins", accent: "#FF2D78" },
  { name: "Earnings this week", subtitle: "Companies reporting", accent: "#8B8B9E" },
  { name: "Sector rotation", subtitle: "Where money is flowing", accent: "#00E5FF" },
];

const recentSearches = ["NVDA", "TSLA", "AAPL", "BTC", "XOM"];

const Research = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  if (selected || query.trim()) {
    return (
      <div className="flex min-h-screen justify-center pb-24" style={{ backgroundColor: "#0B0B12" }}>
        <div className="w-full max-w-[430px] px-5 pt-14">
          <button
            onClick={() => { setSelected(null); setQuery(""); }}
            className="mb-6 text-sm font-medium"
            style={{ color: "#00F0A0" }}
          >
            ← Back to Research
          </button>
          <h2 className="mb-2 text-lg font-bold" style={{ color: "#F0F0F5" }}>
            {selected ? `Results for "${selected}"` : `Results for "${query}"`}
          </h2>
          <p className="text-sm" style={{ color: "#8B8B9E" }}>
            Detailed research results coming soon.
          </p>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen justify-center pb-24" style={{ backgroundColor: "#0B0B12" }}>
      <div className="w-full max-w-[430px] px-5 pt-14">
        <h1 className="mb-5 text-lg font-bold" style={{ color: "#F0F0F5", fontSize: 18 }}>
          Research
        </h1>

        {/* Search */}
        <div className="relative mb-6">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: "#8B8B9E" }}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => e.key === "Enter" && query.trim() && setSelected(query.trim())}
            placeholder="Search any ticker, sector, or topic..."
            className="w-full pl-11 pr-4 text-sm outline-none transition-colors"
            style={{
              backgroundColor: "#14141E",
              border: `1px solid ${focused ? "#00F0A0" : "#2A2A3A"}`,
              borderRadius: 12,
              height: 48,
              color: "#F0F0F5",
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
            }}
          />
        </div>

        {/* Trending */}
        <p className="mb-3 text-xs font-bold uppercase tracking-wide" style={{ color: "#8B8B9E", fontSize: 13 }}>
          Trending today
        </p>
        <div className="mb-6 grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelected(cat.name)}
              className="relative overflow-hidden text-left transition-transform active:scale-[0.97]"
              style={{
                backgroundColor: "#14141E",
                border: "1px solid #1E1E2A",
                borderRadius: 12,
                padding: 14,
              }}
            >
              <div
                className="absolute left-0 right-0 top-0"
                style={{ height: 4, backgroundColor: cat.accent }}
              />
              <p className="text-sm font-bold" style={{ color: "#F0F0F5", fontSize: 14 }}>
                {cat.name}
              </p>
              <p className="mt-0.5" style={{ color: "#8B8B9E", fontSize: 11 }}>
                {cat.subtitle}
              </p>
            </button>
          ))}
        </div>

        {/* Recent */}
        <p className="mb-3 text-xs font-bold uppercase tracking-wide" style={{ color: "#8B8B9E", fontSize: 13 }}>
          Recent
        </p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {recentSearches.map((t) => (
            <button
              key={t}
              onClick={() => setSelected(t)}
              className="shrink-0 text-xs font-bold transition-transform active:scale-95"
              style={{
                backgroundColor: "#14141E",
                border: "1px solid #1E1E2A",
                borderRadius: 8,
                padding: "8px 14px",
                color: "#F0F0F5",
                fontSize: 12,
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Research;

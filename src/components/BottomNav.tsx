import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, Headphones, UserCircle } from "lucide-react";

const tabs = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: Search, label: "Research", path: "/research" },
  { icon: Headphones, label: "Podcast", path: "/podcast" },
  { icon: UserCircle, label: "Profile", path: "/profile" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center"
      style={{ backgroundColor: "#0B0B12", borderTop: "1px solid #1E1E2A" }}
    >
      <div className="flex w-full max-w-[430px] items-center justify-around py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center gap-0.5 px-4 py-1"
            >
              <tab.icon
                size={22}
                fill={isActive ? "#00F0A0" : "none"}
                color={isActive ? "#00F0A0" : "#8B8B9E"}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span
                className="text-[10px]"
                style={{ color: isActive ? "#00F0A0" : "#8B8B9E" }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

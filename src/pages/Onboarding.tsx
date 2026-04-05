import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/userStore";
import { Check } from "lucide-react";

interface Option {
  title: string;
  subtitle: string;
}

const experienceOptions: Option[] = [
  { title: "Beginner", subtitle: "I'm just getting started" },
  { title: "Intermediate", subtitle: "I know the basics, learning more" },
  { title: "Advanced", subtitle: "I trade regularly and understand markets" },
];

const riskOptions: Option[] = [
  { title: "Conservative", subtitle: "I prefer safer, steadier returns" },
  { title: "Moderate", subtitle: "Balanced risk and reward" },
  { title: "Aggressive", subtitle: "High risk for high reward" },
];

const goalOptions: Option[] = [
  { title: "Quick gains", subtitle: "Catch daily market moves" },
  { title: "Steady growth", subtitle: "Build wealth over time" },
  { title: "Learn by doing", subtitle: "Understand markets better" },
];

const questions = [
  "How would you describe your trading experience?",
  "How do you feel about risk?",
  "What's your main goal right now?",
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { firstName, experience, risk, goal, setExperience, setRisk, setGoal } = useUserStore();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");
  const [animating, setAnimating] = useState(false);

  const allOptions = [experienceOptions, riskOptions, goalOptions];
  const setters = [setExperience, setRisk, setGoal];

  const goNext = useCallback(
    (value: string) => {
      if (animating) return;
      setSelected(value);
      setters[step](value);

      setTimeout(() => {
        setAnimating(true);
        setSlideDir("left");
        setTimeout(() => {
          setStep((s) => s + 1);
          setSelected(null);
          setAnimating(false);
        }, 300);
      }, 400);
    },
    [step, animating]
  );

  const totalSteps = 4;

  return (
    <div className="flex min-h-screen justify-center bg-background px-6 py-6 overflow-hidden">
      <div className="flex w-full max-w-[430px] flex-col">
        {/* Header: dots + skip */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className="h-2 w-2 rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: i === step ? "#00F0A0" : "#2A2A3A",
                }}
              />
            ))}
          </div>
          <button
            onClick={() => navigate("/home")}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Skip
          </button>
        </div>

        {/* Card content */}
        <div className="flex-1 flex flex-col justify-center">
          <div
            key={step}
            className={`transition-all duration-300 ${
              animating
                ? "opacity-0 translate-x-[-40px]"
                : "opacity-0 animate-slide-in-right"
            }`}
          >
            {step < 3 ? (
              <QuestionCard
                question={questions[step]}
                options={allOptions[step]}
                selected={selected}
                onSelect={goNext}
              />
            ) : (
              <ConfirmationCard
                name={firstName || "Investor"}
                experience={experience}
                risk={risk}
                goal={goal}
                onContinue={() => navigate("/home")}
              />
            )}
          </div>
        </div>
      </div>

      {/* Slide-in animation */}
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

function QuestionCard({
  question,
  options,
  selected,
  onSelect,
}: {
  question: string;
  options: Option[];
  selected: string | null;
  onSelect: (value: string) => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6 text-center">
        {question}
      </h2>
      <div className="flex flex-col gap-3">
        {options.map((opt) => {
          const isSelected = selected === opt.title;
          return (
            <button
              key={opt.title}
              onClick={() => onSelect(opt.title)}
              className="w-full text-left rounded-lg p-4 border transition-all duration-200"
              style={{
                backgroundColor: "#14141E",
                borderColor: isSelected ? "#00F0A0" : "#1E1E2A",
                borderRadius: "12px",
                boxShadow: isSelected
                  ? "0 0 20px rgba(0,240,160,0.15)"
                  : "none",
              }}
            >
              <span className="block text-[15px] font-bold text-foreground">
                {opt.title}
              </span>
              <span className="block text-xs text-muted-foreground mt-0.5">
                {opt.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ConfirmationCard({
  name,
  experience,
  risk,
  goal,
  onContinue,
}: {
  name: string;
  experience: string;
  risk: string;
  goal: string;
  onContinue: () => void;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Animated checkmark */}
      <div className="relative mb-6">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{
            background: "linear-gradient(135deg, #00F0A0, #7C5CFC)",
            animation: "pulse-glow 2s ease-in-out infinite",
          }}
        >
          <Check size={32} strokeWidth={3} color="#0B0B12" />
        </div>
        {/* Particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 4 + (i % 3) * 2,
              height: 4 + (i % 3) * 2,
              backgroundColor: i % 2 === 0 ? "#00F0A0" : "#7C5CFC",
              top: "50%",
              left: "50%",
              animation: `confetti-${i} 1s ease-out forwards`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      <h2 className="text-[22px] font-bold text-foreground mb-3">
        We're all set, {name}!
      </h2>
      <p className="text-sm text-muted-foreground mb-2">
        {experience} trader · {risk} risk · {goal}
      </p>
      <p className="text-sm text-muted-foreground mb-10">
        I'll tailor everything to match.
      </p>

      <button
        onClick={onContinue}
        className="w-full rounded-lg bg-primary py-3.5 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        style={{ borderRadius: "12px" }}
      >
        Take me to the markets
      </button>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0,240,160,0.3); }
          50% { box-shadow: 0 0 40px rgba(0,240,160,0.6), 0 0 60px rgba(124,92,252,0.3); }
        }
        ${Array.from({ length: 8 })
          .map((_, i) => {
            const angle = (i * 360) / 8;
            const dist = 40 + (i % 3) * 15;
            const x = Math.cos((angle * Math.PI) / 180) * dist;
            const y = Math.sin((angle * Math.PI) / 180) * dist;
            return `@keyframes confetti-${i} {
              0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
              60% { transform: translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1); opacity: 1; }
              100% { transform: translate(calc(-50% + ${x * 1.2}px), calc(-50% + ${y * 1.2}px)) scale(0); opacity: 0; }
            }`;
          })
          .join("\n")}
      `}</style>
    </div>
  );
}

export default Onboarding;

import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="flex w-full max-w-[430px] flex-col items-center text-center">
        {/* Avatar with gradient border */}
        <div
          className="animate-fade-up mb-8 flex h-12 w-12 items-center justify-center rounded-full"
          style={{
            background: "linear-gradient(135deg, #00F0A0, #7C5CFC)",
            padding: "2px",
          }}
        >
          <div className="flex h-full w-full items-center justify-center rounded-full bg-background text-lg font-bold text-foreground">
            I
          </div>
        </div>

        {/* Heading */}
        <h1
          className="animate-fade-up mb-3 text-2xl font-bold text-foreground"
          style={{ animationDelay: "0.15s" }}
        >
          Hi, I'm Investy
        </h1>

        {/* Subtext */}
        <p
          className="animate-fade-up mb-2 text-sm text-muted-foreground"
          style={{ animationDelay: "0.3s" }}
        >
          I help you find smart trades every day.
        </p>
        <p
          className="animate-fade-up mb-10 text-[13px] text-muted-foreground"
          style={{ animationDelay: "0.45s" }}
        >
          Let's get to know each other — it takes 30 seconds.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/signup")}
          className="animate-fade-up w-full rounded-lg bg-primary py-3.5 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          style={{ animationDelay: "0.6s", borderRadius: "12px" }}
        >
          Let's go
        </button>
      </div>
    </div>
  );
};

export default Welcome;

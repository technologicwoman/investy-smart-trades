import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useUserStore } from "@/store/userStore";

const Signup = () => {
  const navigate = useNavigate();
  const { setFirstName, setEmail } = useUserStore();
  const [name, setName] = useState("");
  const [email, setEmailLocal] = useState("");

  const isValid = name.trim().length > 0 && email.trim().length > 0;

  const handleContinue = () => {
    if (!isValid) return;
    setFirstName(name.trim());
    setEmail(email.trim());
    navigate("/onboarding");
  };

  const inputClass =
    "w-full h-12 rounded-lg px-4 text-sm text-foreground placeholder:text-muted-foreground bg-surface border border-border outline-none transition-colors focus:border-primary";

  return (
    <div className="flex min-h-screen justify-center bg-background px-6 py-4">
      <div className="flex w-full max-w-[430px] flex-col">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="mb-10 flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-accent"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Heading */}
        <h1
          className="animate-fade-up mb-8 text-center text-xl font-bold text-foreground"
        >
          Let's start with the basics
        </h1>

        {/* Inputs */}
        <div className="animate-fade-up flex flex-col gap-3" style={{ animationDelay: "0.1s" }}>
          <input
            type="text"
            placeholder="Your first name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmailLocal(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Continue button */}
        <button
          onClick={handleContinue}
          disabled={!isValid}
          className="animate-fade-up mt-6 w-full rounded-lg bg-primary py-3.5 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ animationDelay: "0.2s", borderRadius: "12px" }}
        >
          Continue
        </button>

        {/* Divider */}
        <div className="animate-fade-up mt-8 flex items-center gap-3" style={{ animationDelay: "0.3s" }}>
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">Or continue with</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Social buttons */}
        <div className="animate-fade-up mt-4 flex flex-col gap-3" style={{ animationDelay: "0.4s" }}>
          <button className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-border bg-transparent text-sm font-medium text-foreground transition-colors hover:bg-accent" style={{ borderRadius: "12px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 0 12c0 1.94.46 3.77 1.28 5.4l3.56-2.77.01-.54z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          <button className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-border bg-transparent text-sm font-medium text-foreground transition-colors hover:bg-accent" style={{ borderRadius: "12px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Continue with Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;

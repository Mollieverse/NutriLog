import { useState, useRef, useEffect } from "react";

// ── Food database ─────────────────────────────────────────────────────────────
const FOOD_DB = [
  { name: "Chicken Breast (100g)", cal: 165, p: 31, c: 0, f: 3.6 },
  { name: "Chicken Thigh (100g)", cal: 209, p: 26, c: 0, f: 11 },
  { name: "Salmon (100g)", cal: 208, p: 20, c: 0, f: 13 },
  { name: "Tuna (100g)", cal: 132, p: 28, c: 0, f: 1 },
  { name: "Egg (1 large)", cal: 72, p: 6, c: 0.4, f: 5 },
  { name: "Egg White (1 large)", cal: 17, p: 3.6, c: 0.2, f: 0.1 },
  { name: "Beef Steak (100g)", cal: 250, p: 26, c: 0, f: 17 },
  { name: "Shrimp (100g)", cal: 99, p: 24, c: 0, f: 0.3 },
  { name: "Tofu (100g)", cal: 76, p: 8, c: 2, f: 4 },
  { name: "Greek Yogurt (1 cup)", cal: 130, p: 17, c: 9, f: 4 },
  { name: "Milk (1 cup)", cal: 149, p: 8, c: 12, f: 8 },
  { name: "Cheddar Cheese (30g)", cal: 120, p: 7, c: 0.4, f: 10 },
  { name: "Cottage Cheese (1 cup)", cal: 206, p: 28, c: 8, f: 9 },
  { name: "Brown Rice (1 cup)", cal: 216, p: 5, c: 45, f: 1.8 },
  { name: "White Rice (1 cup)", cal: 206, p: 4.3, c: 45, f: 0.4 },
  { name: "Oatmeal (1 cup)", cal: 154, p: 6, c: 28, f: 3 },
  { name: "Whole Wheat Bread (1 slice)", cal: 69, p: 3.6, c: 12, f: 1 },
  { name: "White Bread (1 slice)", cal: 79, p: 2.7, c: 15, f: 1 },
  { name: "Pasta (1 cup)", cal: 220, p: 8, c: 43, f: 1.3 },
  { name: "Quinoa (1 cup)", cal: 222, p: 8, c: 39, f: 3.5 },
  { name: "Avocado (half)", cal: 120, p: 1.5, c: 6, f: 11 },
  { name: "Olive Oil (1 tbsp)", cal: 119, p: 0, c: 0, f: 14 },
  { name: "Almond Butter (2 tbsp)", cal: 196, p: 7, c: 6, f: 18 },
  { name: "Almonds (28g)", cal: 164, p: 6, c: 6, f: 14 },
  { name: "Walnuts (28g)", cal: 185, p: 4.3, c: 3.9, f: 18.5 },
  { name: "Banana (medium)", cal: 105, p: 1.3, c: 27, f: 0.4 },
  { name: "Apple (medium)", cal: 95, p: 0.5, c: 25, f: 0.3 },
  { name: "Orange (medium)", cal: 62, p: 1.2, c: 15, f: 0.2 },
  { name: "Strawberries (1 cup)", cal: 49, p: 1, c: 12, f: 0.5 },
  { name: "Blueberries (1 cup)", cal: 84, p: 1.1, c: 21, f: 0.5 },
  { name: "Mango (1 cup)", cal: 107, p: 0.8, c: 28, f: 0.4 },
  { name: "Broccoli (1 cup)", cal: 55, p: 3.7, c: 11, f: 0.6 },
  { name: "Spinach (1 cup)", cal: 7, p: 0.9, c: 1.1, f: 0.1 },
  { name: "Sweet Potato (medium)", cal: 103, p: 2.3, c: 24, f: 0.1 },
  { name: "Potato (medium)", cal: 161, p: 4.3, c: 37, f: 0.2 },
  { name: "Carrot (medium)", cal: 25, p: 0.6, c: 6, f: 0.1 },
  { name: "Cucumber (1 cup)", cal: 16, p: 0.7, c: 4, f: 0.1 },
  { name: "Tomato (medium)", cal: 22, p: 1.1, c: 4.8, f: 0.2 },
  { name: "Lentils (1 cup)", cal: 230, p: 18, c: 40, f: 0.8 },
  { name: "Black Beans (1 cup)", cal: 227, p: 15, c: 41, f: 0.9 },
  { name: "Chickpeas (1 cup)", cal: 269, p: 15, c: 45, f: 4.2 },
  { name: "Peanut Butter (2 tbsp)", cal: 188, p: 8, c: 6, f: 16 },
  { name: "Protein Shake (1 scoop)", cal: 120, p: 25, c: 3, f: 1.5 },
  { name: "Orange Juice (1 cup)", cal: 112, p: 1.7, c: 26, f: 0.5 },
  { name: "Coffee (black)", cal: 2, p: 0.3, c: 0, f: 0 },
  { name: "Latte (12oz)", cal: 190, p: 12, c: 19, f: 7 },
  { name: "Pizza (1 slice)", cal: 285, p: 12, c: 36, f: 10 },
  { name: "Burger (plain)", cal: 354, p: 20, c: 29, f: 17 },
  { name: "Caesar Salad", cal: 180, p: 7, c: 8, f: 14 },
  { name: "Sushi Roll (8 pcs)", cal: 330, p: 9, c: 64, f: 3 },
  { name: "Fried Rice (1 cup)", cal: 333, p: 10, c: 51, f: 10 },
];

const ALL_GOALS = [
  { id: "lose_weight",   label: "Lose Weight",        icon: "⚖️" },
  { id: "gain_muscle",   label: "Gain Muscle",         icon: "💪" },
  { id: "eat_healthier", label: "Eat Healthier",       icon: "🥗" },
  { id: "maintain",      label: "Maintain Weight",     icon: "⚡" },
  { id: "endurance",     label: "Build Endurance",     icon: "🏃" },
  { id: "stress_eating", label: "Stop Stress Eating",  icon: "🧘" },
];

const MACRO_PRESETS = {
  lose_weight:   { protein: 130, carbs: 180, fats: 55 },
  gain_muscle:   { protein: 180, carbs: 300, fats: 75 },
  eat_healthier: { protein: 150, carbs: 250, fats: 65 },
  maintain:      { protein: 140, carbs: 250, fats: 65 },
  endurance:     { protein: 160, carbs: 290, fats: 60 },
  stress_eating: { protein: 140, carbs: 220, fats: 60 },
};

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snack"];
const MEAL_ICONS = { Breakfast: "🌅", Lunch: "☀️", Dinner: "🌙", Snack: "🍎" };
const COACH_MSGS = [
  "Small consistent steps beat perfection every time! 💪",
  "Every meal logged is a win. Awareness is the first step! 🌟",
  "Don't forget to drink your water today! 💧",
  "Protein keeps you full and builds strength. 🥩",
  "You're building habits that will change your life! 🔥",
  "Progress, not perfection. Keep going! 📈",
];

// ── Simple in-memory user store (persists during session) ─────────────────────
const USER_STORE = {}; // email -> { name, passwordHash, goals, calorieGoal }

function hashPassword(pw) {
  // Simple deterministic hash for demo (not crypto-secure, but enforces correct password)
  let h = 0;
  for (let i = 0; i < pw.length; i++) { h = ((h << 5) - h) + pw.charCodeAt(i); h |= 0; }
  return String(h);
}

// ── Shared styles ─────────────────────────────────────────────────────────────
const inp = {
  width: "100%", padding: "12px 14px", borderRadius: 12,
  border: "1.5px solid #ddd5c8", background: "#faf8f5",
  fontFamily: "Lato, sans-serif", fontSize: 14, color: "#2d2a25",
  outline: "none", boxSizing: "border-box",
};
const card = {
  background: "rgba(255,255,255,0.88)", borderRadius: 20,
  padding: 20, marginBottom: 14, boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
};

function PrimaryBtn({ onClick, disabled, children, style = {} }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: "100%", padding: "13px", borderRadius: 13, border: "none",
      cursor: disabled ? "default" : "pointer",
      background: disabled ? "#e0d8d0" : "linear-gradient(135deg,#c85a2a,#e8845a)",
      color: disabled ? "#aaa" : "#fff",
      fontFamily: "Lato, sans-serif", fontSize: 15, fontWeight: 700,
      boxShadow: disabled ? "none" : "0 3px 12px rgba(232,132,90,0.35)",
      ...style,
    }}>{children}</button>
  );
}

// ── Mollie SVG Avatar ─────────────────────────────────────────────────────────
function Mollie({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="#e8845a"/>
      <ellipse cx="75" cy="32" rx="7" ry="14" fill="#3b1f0e" transform="rotate(20 75 32)"/>
      <ellipse cx="50" cy="28" rx="22" ry="13" fill="#3b1f0e"/>
      <ellipse cx="30" cy="40" rx="7" ry="13" fill="#3b1f0e"/>
      <ellipse cx="50" cy="44" rx="19" ry="21" fill="#f5c5a3"/>
      <ellipse cx="31" cy="45" rx="4" ry="5" fill="#f5c5a3"/>
      <ellipse cx="69" cy="45" rx="4" ry="5" fill="#f5c5a3"/>
      <ellipse cx="43" cy="42" rx="3" ry="3.5" fill="#3b1f0e"/>
      <ellipse cx="57" cy="42" rx="3" ry="3.5" fill="#3b1f0e"/>
      <circle cx="44.2" cy="41" r="1.2" fill="white"/>
      <circle cx="58.2" cy="41" r="1.2" fill="white"/>
      <ellipse cx="37" cy="49" rx="5" ry="3" fill="#f4a0a0" opacity="0.5"/>
      <ellipse cx="63" cy="49" rx="5" ry="3" fill="#f4a0a0" opacity="0.5"/>
      <path d="M43 53 Q50 60 57 53" stroke="#c97a5a" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <rect x="44" y="62" width="12" height="11" rx="4" fill="#f5c5a3"/>
      <ellipse cx="50" cy="86" rx="28" ry="20" fill="#e8845a"/>
      <path d="M43 66 L50 72 L57 66" fill="#fff" opacity="0.9"/>
      <text x="50" y="90" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">M</text>
    </svg>
  );
}

function MacroBar({ label, value, max, color }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ marginBottom: 13 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontFamily: "Lato", fontSize: 13, color: "#2d2a25", fontWeight: 700 }}>{label}</span>
        <span style={{ fontFamily: "Lato", fontSize: 12, color: "#9b9287" }}><strong style={{ color: "#2d2a25" }}>{value}g</strong> / {max}g</span>
      </div>
      <div style={{ height: 9, background: "#e8e0d5", borderRadius: 99, overflow: "hidden" }}>
        <div style={{ height: "100%", width: pct + "%", background: color, borderRadius: 99, transition: "width 0.6s ease" }}/>
      </div>
    </div>
  );
}

// ── PASSWORD STRENGTH ─────────────────────────────────────────────────────────
function PasswordStrength({ password }) {
  const checks = [
    { label: "At least 6 characters", ok: password.length >= 6 },
    { label: "Contains a number", ok: /\d/.test(password) },
    { label: "Contains uppercase", ok: /[A-Z]/.test(password) },
  ];
  const score = checks.filter(c => c.ok).length;
  const colors = ["#e05555", "#e8845a", "#6b9e7a"];
  const labels = ["Weak", "Fair", "Strong"];
  if (!password) return null;
  return (
    <div style={{ marginTop: 8, marginBottom: 4 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ flex: 1, height: 4, borderRadius: 99, background: i < score ? colors[score - 1] : "#e8e0d5", transition: "all 0.3s" }}/>
        ))}
      </div>
      <p style={{ fontFamily: "Lato", fontSize: 11, color: colors[score - 1] || "#9b9287" }}>
        {score > 0 ? labels[score - 1] : "Enter a password"} password
      </p>
      <div style={{ marginTop: 6 }}>
        {checks.map(c => (
          <p key={c.label} style={{ fontFamily: "Lato", fontSize: 11, color: c.ok ? "#6b9e7a" : "#9b9287", marginBottom: 2 }}>
            {c.ok ? "✓" : "○"} {c.label}
          </p>
        ))}
      </div>
    </div>
  );
}

// ── FORGOT PASSWORD ───────────────────────────────────────────────────────────
function ForgotPassword({ onBack }) {
  const [step, setStep] = useState("email"); // email | code | reset | done
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [error, setError] = useState("");
  const FAKE_CODE = "123456";

  function sendCode() {
    if (!email.includes("@")) { setError("Enter a valid email."); return; }
    if (!USER_STORE[email.toLowerCase()]) { setError("No account found with this email."); return; }
    setError(""); setStep("code");
  }

  function verifyCode() {
    if (code !== FAKE_CODE) { setError("Incorrect code. Try: 123456"); return; }
    setError(""); setStep("reset");
  }

  function resetPassword() {
    if (newPw.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (newPw !== confirmPw) { setError("Passwords don't match."); return; }
    USER_STORE[email.toLowerCase()].passwordHash = hashPassword(newPw);
    setError(""); setStep("done");
  }

  const bg = "linear-gradient(160deg,#1a2a3a,#3a6a7a)";
  const wrap = { background: "rgba(255,255,255,0.97)", borderRadius: 24, padding: "32px 24px", maxWidth: 380, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" };

  return (
    <div style={{ minHeight: "100vh", background: bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={wrap}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ fontSize: 44, marginBottom: 8 }}>{step === "done" ? "🎉" : "🔑"}</div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#2d2a25", marginBottom: 4 }}>
            {step === "email" && "Forgot Password?"}
            {step === "code" && "Check Your Email"}
            {step === "reset" && "Set New Password"}
            {step === "done" && "Password Reset!"}
          </h2>
          <p style={{ fontFamily: "Lato", fontSize: 13, color: "#9b9287" }}>
            {step === "email" && "We'll send a 6-digit code to your email."}
            {step === "code" && `We sent a code to ${email}. Enter it below.\n(Demo code: 123456)`}
            {step === "reset" && "Choose a strong new password."}
            {step === "done" && "You can now log in with your new password!"}
          </p>
        </div>

        {step === "email" && (
          <>
            <label style={{ fontFamily: "Lato", fontSize: 12, color: "#6b6560", display: "block", marginBottom: 5 }}>Your Email</label>
            <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} placeholder="you@example.com" style={{ ...inp, marginBottom: 14 }}/>
            {error && <p style={{ fontFamily: "Lato", fontSize: 13, color: "#c0503a", background: "#fff0ee", borderRadius: 8, padding: "9px 13px", marginBottom: 13 }}>⚠️ {error}</p>}
            <PrimaryBtn onClick={sendCode}>Send Reset Code</PrimaryBtn>
          </>
        )}

        {step === "code" && (
          <>
            <label style={{ fontFamily: "Lato", fontSize: 12, color: "#6b6560", display: "block", marginBottom: 5 }}>6-Digit Code</label>
            <input type="text" maxLength={6} value={code} onChange={e => { setCode(e.target.value.replace(/\D/g, "")); setError(""); }} placeholder="e.g. 123456" style={{ ...inp, marginBottom: 14, letterSpacing: 6, textAlign: "center", fontSize: 20 }}/>
            {error && <p style={{ fontFamily: "Lato", fontSize: 13, color: "#c0503a", background: "#fff0ee", borderRadius: 8, padding: "9px 13px", marginBottom: 13 }}>⚠️ {error}</p>}
            <PrimaryBtn onClick={verifyCode}>Verify Code</PrimaryBtn>
          </>
        )}

        {step === "reset" && (
          <>
            <label style={{ fontFamily: "Lato", fontSize: 12, color: "#6b6560", display: "block", marginBottom: 5 }}>New Password</label>
            <input type="password" value={newPw} onChange={e => { setNewPw(e.target.value); setError(""); }} placeholder="At least 6 characters" style={{ ...inp, marginBottom: 4 }}/>
            <PasswordStrength password={newPw}/>
            <label style={{ fontFamily: "Lato", fontSize: 12, color: "#6b6560", display: "block", marginBottom: 5, marginTop: 10 }}>Confirm Password</label>
            <input type="password" value={confirmPw} onChange={e => { setConfirmPw(e.target.value); setError(""); }} placeholder="Repeat your password" style={{ ...inp, marginBottom: 14 }}/>
            {confirmPw && newPw !== confirmPw && <p style={{ fontFamily: "Lato", fontSize: 11, color: "#c0503a", marginBottom: 8 }}>⚠️ Passwords don't match</p>}
            {error && <p style={{ fontFamily: "Lato", fontSize: 13, color: "#c0503a", background: "#fff0ee", borderRadius: 8, padding: "9px 13px", marginBottom: 13 }}>⚠️ {error}</p>}
            <PrimaryBtn onClick={resetPassword} disabled={newPw.length < 6 || newPw !== confirmPw}>Save New Password</PrimaryBtn>
          </>
        )}

        {step === "done" && <PrimaryBtn onClick={onBack}>← Back to Login</PrimaryBtn>}

        {step !== "done" && (
          <button onClick={onBack} style={{ width: "100%", marginTop: 10, padding: "11px", borderRadius: 12, border: "none", background: "transparent", cursor: "pointer", fontFamily: "Lato", fontSize: 13, color: "#9b9287" }}>← Back to Login</button>
        )}
      </div>
    </div>
  );
}

// ── SIGNUP / LOGIN ────────────────────────────────────────────────────────────
function AuthScreen({ onAuth, onForgot }) {
  const [mode, setMode] = useState("signup");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPw: "" });
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  const emailKey = form.email.toLowerCase().trim();

  function handleSignup() {
    if (!form.name.trim()) { setError("Please enter your name."); return; }
    if (!form.email.includes("@")) { setError("Please enter a valid email."); return; }
    if (USER_STORE[emailKey]) { setError("An account with this email already exists. Please log in."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (form.password !== form.confirmPw) { setError("Passwords don't match."); return; }
    // Save user to store
    USER_STORE[emailKey] = { name: form.name.trim(), passwordHash: hashPassword(form.password), goals: [], calorieGoal: 2000 };
    onAuth({ email: emailKey, name: form.name.trim(), goals: [], calorieGoal: 2000 });
  }

  function handleLogin() {
    if (!form.email.trim()) { setError("Please enter your email."); return; }
    if (!form.password) { setError("Please enter your password."); return; }
    const stored = USER_STORE[emailKey];
    if (!stored) { setError("No account found with this email. Please sign up first."); return; }
    if (stored.passwordHash !== hashPassword(form.password)) {
      setError("Incorrect password. Please try again or use 'Forgot password?'.");
      return;
    }
    onAuth({ email: emailKey, name: stored.name, goals: stored.goals, calorieGoal: stored.calorieGoal });
  }

  function submit() { setError(""); mode === "signup" ? handleSignup() : handleLogin(); }

  const F = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#1a2a3a,#2d4a5a,#3a6a7a)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Lato:wght@300;400;700&display=swap');*{box-sizing:border-box;margin:0;padding:0;}input:focus,select:focus{border-color:#e8845a!important;box-shadow:0 0 0 3px rgba(232,132,90,.15);outline:none;}`}</style>
      <div style={{ textAlign: "center", marginBottom: 22 }}>
        <div style={{ width: 80, height: 80, margin: "0 auto 10px", borderRadius: "50%", border: "3px solid rgba(255,255,255,0.35)", overflow: "hidden" }}><Mollie size={80}/></div>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#fff" }}>NutriLog</h1>
        <p style={{ fontFamily: "Lato", fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>Your AI nutrition coach, Coach Mollie 🌿</p>
      </div>

      <div style={{ background: "rgba(255,255,255,0.97)", borderRadius: 24, padding: "26px 22px", maxWidth: 420, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.35)" }}>
        <div style={{ display: "flex", background: "#f0ebe4", borderRadius: 12, padding: 4, marginBottom: 20 }}>
          {["signup","login"].map(m => (
            <button key={m} onClick={() => { setMode(m); setError(""); }} style={{ flex: 1, padding: "9px", borderRadius: 9, border: "none", cursor: "pointer", background: mode === m ? "#fff" : "transparent", fontFamily: "Lato", fontSize: 13, fontWeight: 700, color: mode === m ? "#2d2a25" : "#9b9287", boxShadow: mode === m ? "0 1px 6px rgba(0,0,0,0.1)" : "none", transition: "all 0.2s" }}>
              {m === "signup" ? "Create Account" : "Log In"}
            </button>
          ))}
        </div>

        {mode === "signup" && (
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontFamily: "Lato", fontSize: 12, color: "#6b6560", display: "block", marginBottom: 5 }}>Your Name</label>
            <input value={form.name} onChange={e => F("name", e.target.value)} placeholder="e.g. Sarah" style={inp}/>
          </div>
        )}

        <div style={{ marginBottom: 12 }}>
          <label style={{ fontFamily: "Lato", fontSize: 12, color: "#6b6560", display: "block", marginBottom: 5 }}>Email Address</label>
          <input type="email" value={form.email} onChange={e => F("email", e.target.value)} placeholder="you@example.com" style={inp}/>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ fontFamily: "Lato", fontSize: 12, color: "#6b6560", display: "block", marginBottom: 5 }}>Password</label>
          <div style={{ position: "relative" }}>
            <input type={showPw ? "text" : "password"} value={form.password} onChange={e => F("password", e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} placeholder={mode === "signup" ? "Create a strong password" : "Your password"} style={{ ...inp, paddingRight: 44 }}/>
            <button onClick={() => setShowPw(s => !s)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#9b9287" }}>{showPw ? "🙈" : "👁️"}</button>
          </div>
          {mode === "signup" && <PasswordStrength password={form.password}/>}
        </div>

        {mode === "signup" && (
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontFamily: "Lato", fontSize: 12, color: "#6b6560", display: "block", marginBottom: 5 }}>Confirm Password</label>
            <input type="password" value={form.confirmPw} onChange={e => F("confirmPw", e.target.value)} placeholder="Repeat your password" style={inp}/>
            {form.confirmPw && form.password !== form.confirmPw && <p style={{ fontFamily: "Lato", fontSize: 11, color: "#c0503a", marginTop: 5 }}>⚠️ Passwords don't match</p>}
            {form.confirmPw && form.password === form.confirmPw && form.password.length >= 6 && <p style={{ fontFamily: "Lato", fontSize: 11, color: "#6b9e7a", marginTop: 5 }}>✓ Passwords match</p>}
          </div>
        )}

        {mode === "login" && (
          <div style={{ textAlign: "right", marginBottom: 16 }}>
            <button onClick={onForgot} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Lato", fontSize: 12, color: "#e8845a", fontWeight: 700 }}>Forgot password?</button>
          </div>
        )}

        {error && (
          <div style={{ fontFamily: "Lato", fontSize: 13, color: "#c0503a", background: "#fff0ee", border: "1px solid #f4c0b0", borderRadius: 10, padding: "11px 14px", marginBottom: 14 }}>
            🔒 {error}
          </div>
        )}

        <PrimaryBtn onClick={submit}>{mode === "signup" ? "Create Account →" : "Log In →"}</PrimaryBtn>

        {mode === "login" && (
          <p style={{ fontFamily: "Lato", fontSize: 12, color: "#9b9287", textAlign: "center", marginTop: 12 }}>
            Don't have an account? <button onClick={() => setMode("signup")} style={{ background: "none", border: "none", cursor: "pointer", color: "#e8845a", fontWeight: 700, fontSize: 12 }}>Sign up free</button>
          </p>
        )}
      </div>
    </div>
  );
}

// ── GOAL + CALORIE SETUP ──────────────────────────────────────────────────────
function GoalSetup({ user, onDone }) {
  const [goals, setGoals] = useState(user.goals?.length ? user.goals : []);
  const [calorieMode, setCalorieMode] = useState("auto"); // auto | custom
  const [customCal, setCustomCal] = useState(String(user.calorieGoal || 2000));
  const [error, setError] = useState("");

  function toggleGoal(id) {
    setGoals(g => g.includes(id) ? g.filter(x => x !== id) : [...g, id]);
  }

  // Auto-calculate calories based on selected goals
  function autoCalories() {
    if (goals.length === 0) return 2000;
    const calMap = { lose_weight: 1600, gain_muscle: 2500, eat_healthier: 2000, maintain: 2000, endurance: 2200, stress_eating: 1800 };
    const vals = goals.map(g => calMap[g] || 2000);
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  }

  function avgMacros() {
    if (goals.length === 0) return MACRO_PRESETS.eat_healthier;
    const keys = ["protein", "carbs", "fats"];
    const result = {};
    keys.forEach(k => {
      const vals = goals.map(g => MACRO_PRESETS[g]?.[k] || MACRO_PRESETS.eat_healthier[k]);
      result[k] = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
    });
    return result;
  }

  const displayCal = calorieMode === "auto" ? autoCalories() : (parseInt(customCal) || 2000);
  const macros = avgMacros();

  function save() {
    if (goals.length === 0) { setError("Please select at least one goal."); return; }
    if (calorieMode === "custom" && (!customCal || parseInt(customCal) < 500 || parseInt(customCal) > 10000)) {
      setError("Please enter a calorie goal between 500 and 10,000."); return;
    }
    const finalCal = displayCal;
    USER_STORE[user.email] = { ...USER_STORE[user.email], goals, calorieGoal: finalCal };
    onDone({ ...user, goals, calorieGoal: finalCal, macros });
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#1a2a3a,#3a6a7a)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "24px 20px", overflowY: "auto" }}>
      <div style={{ background: "rgba(255,255,255,0.97)", borderRadius: 24, padding: "28px 22px", maxWidth: 440, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", marginTop: 10 }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ width: 70, height: 70, margin: "0 auto 10px", borderRadius: "50%", overflow: "hidden", border: "3px solid #e8845a" }}><Mollie size={70}/></div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#2d2a25", marginBottom: 4 }}>Set Your Goals, {user.name}!</h2>
          <p style={{ fontFamily: "Lato", fontSize: 13, color: "#9b9287" }}>Pick one or more goals — Mollie will personalise your plan</p>
        </div>

        {/* Multi-select goals */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontFamily: "Lato", fontSize: 12, color: "#6b6560", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Select Your Goals (pick multiple)</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
            {ALL_GOALS.map(g => {
              const selected = goals.includes(g.id);
              return (
                <button key={g.id} onClick={() => toggleGoal(g.id)} style={{
                  padding: "12px 8px", borderRadius: 13, border: `2px solid ${selected ? "#e8845a" : "#e0d5c8"}`,
                  background: selected ? "#fff5f0" : "#faf8f5",
                  cursor: "pointer", fontFamily: "Lato", fontWeight: 700,
                  color: selected ? "#c85a2a" : "#6b6560", transition: "all 0.15s",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                  position: "relative",
                }}>
                  {selected && <div style={{ position: "absolute", top: 6, right: 8, width: 18, height: 18, borderRadius: "50%", background: "#e8845a", color: "#fff", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</div>}
                  <span style={{ fontSize: 24 }}>{g.icon}</span>
                  <span style={{ fontSize: 12 }}>{g.label}</span>
                </button>
              );
            })}
          </div>
          {error && goals.length === 0 && <p style={{ fontFamily: "Lato", fontSize: 12, color: "#c0503a", marginTop: 8 }}>⚠️ {error}</p>}
        </div>

        {/* Calorie goal */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontFamily: "Lato", fontSize: 12, color: "#6b6560", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Daily Calorie Goal</p>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {[["auto","🤖 Auto (recommended)"],["custom","✏️ Set manually"]].map(([id, lbl]) => (
              <button key={id} onClick={() => setCalorieMode(id)} style={{ flex: 1, padding: "10px 6px", borderRadius: 11, border: `2px solid ${calorieMode === id ? "#e8845a" : "#e0d5c8"}`, background: calorieMode === id ? "#fff5f0" : "#faf8f5", cursor: "pointer", fontFamily: "Lato", fontSize: 12, fontWeight: 700, color: calorieMode === id ? "#c85a2a" : "#6b6560" }}>{lbl}</button>
            ))}
          </div>

          {calorieMode === "auto" ? (
            <div style={{ background: "#f5f1eb", borderRadius: 12, padding: "12px 16px", textAlign: "center" }}>
              <p style={{ fontFamily: "Lato", fontSize: 11, color: "#9b9287", marginBottom: 4 }}>Suggested based on your goals</p>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, color: "#e8845a" }}>{autoCalories()}</p>
              <p style={{ fontFamily: "Lato", fontSize: 12, color: "#9b9287" }}>kcal / day</p>
            </div>
          ) : (
            <div>
              <label style={{ fontFamily: "Lato", fontSize: 12, color: "#6b6560", display: "block", marginBottom: 5 }}>Enter your daily calorie target</label>
              <input type="number" value={customCal} onChange={e => setCustomCal(e.target.value)} placeholder="e.g. 1800" min="500" max="10000" style={{ ...inp, textAlign: "center", fontSize: 20, fontWeight: 700 }}/>
              <p style={{ fontFamily: "Lato", fontSize: 11, color: "#9b9287", marginTop: 5 }}>Tip: Most adults need 1,500–2,500 kcal/day. Consult a doctor for personalised advice.</p>
            </div>
          )}
        </div>

        {/* Preview macros */}
        {goals.length > 0 && (
          <div style={{ background: "#f5f1eb", borderRadius: 14, padding: "14px 16px", marginBottom: 20 }}>
            <p style={{ fontFamily: "Lato", fontSize: 11, color: "#9b9287", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Your personalised daily targets</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
              {[["🔥","Calories",displayCal+"kcal"],["🥩","Protein",macros.protein+"g"],["🌾","Carbs",macros.carbs+"g"],["🥑","Fats",macros.fats+"g"]].map(([e,l,v]) => (
                <div key={l} style={{ background: "#fff", borderRadius: 10, padding: "8px 4px", textAlign: "center" }}>
                  <p style={{ fontSize: 16 }}>{e}</p>
                  <p style={{ fontFamily: "Lato", fontSize: 10, color: "#9b9287" }}>{l}</p>
                  <p style={{ fontFamily: "Lato", fontSize: 12, fontWeight: 700, color: "#2d2a25" }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && goals.length > 0 && <p style={{ fontFamily: "Lato", fontSize: 13, color: "#c0503a", marginBottom: 12 }}>⚠️ {error}</p>}
        <PrimaryBtn onClick={save} disabled={goals.length === 0}>Save My Goals & Start →</PrimaryBtn>
      </div>
    </div>
  );
}

// ── COACH WELCOME ─────────────────────────────────────────────────────────────
function CoachWelcome({ user, onContinue }) {
  const msg = COACH_MSGS[Math.floor(Math.random() * COACH_MSGS.length)];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const goalLabels = (user.goals || []).map(id => ALL_GOALS.find(g => g.id === id)?.label).filter(Boolean);
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#1a2a3a,#3a6a7a)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "rgba(255,255,255,0.97)", borderRadius: 26, padding: "32px 24px", maxWidth: 400, width: "100%", textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ width: 100, height: 100, borderRadius: "50%", overflow: "hidden", border: "4px solid #e8845a", boxShadow: "0 4px 20px rgba(232,132,90,0.4)", margin: "0 auto 10px" }}><Mollie size={100}/></div>
        <p style={{ fontFamily: "Lato", fontSize: 11, textTransform: "uppercase", letterSpacing: 2, color: "#e8845a", fontWeight: 700, marginBottom: 4 }}>Coach Mollie</p>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: "#2d2a25", marginBottom: 8 }}>{greeting}, {user.name}! 👋</h2>
        {goalLabels.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", marginBottom: 16 }}>
            {goalLabels.map(l => <span key={l} style={{ fontFamily: "Lato", fontSize: 11, background: "#fff5f0", border: "1px solid #f4c4a8", borderRadius: 99, padding: "3px 10px", color: "#c85a2a", fontWeight: 700 }}>{l}</span>)}
          </div>
        )}
        <div style={{ background: "#fff5f0", border: "1.5px solid #f4c4a8", borderRadius: 16, padding: "14px 18px", marginBottom: 20 }}>
          <p style={{ fontFamily: "Lato", fontSize: 14, color: "#7a3a1a", lineHeight: 1.7, fontStyle: "italic" }}>"{msg}"</p>
        </div>
        <p style={{ fontFamily: "Lato", fontSize: 12, color: "#9b9287", marginBottom: 20 }}>📅 {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
        <PrimaryBtn onClick={onContinue}>Let's Start Tracking! 🥗</PrimaryBtn>
      </div>
    </div>
  );
}

// ── CHAT ──────────────────────────────────────────────────────────────────────
function ChatScreen({ user }) {
  const goalLabels = (user.goals || []).map(id => ALL_GOALS.find(g => g.id === id)?.label).join(", ") || "general health";
  const [messages, setMessages] = useState([
    { role: "assistant", text: `Hi ${user.name}! 👋 I'm Coach Mollie — your personal nutrition and wellness coach. I know your goals are: ${goalLabels}. Ask me anything about food, calories, diet, workouts, or healthy habits. I'm here for you! 💚` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 80); }, [messages, loading]);

  async function send() {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput("");
    setMessages(m => [...m, { role: "user", text: msg }]);
    setLoading(true);
    try {
      const sys = `You are Coach Mollie, a warm, encouraging, expert fitness and nutrition coach. The user's name is ${user.name}, their goals are: ${goalLabels}, and their daily calorie goal is ${user.calorieGoal} kcal. Help with nutrition, food, calories, macros, meal plans, weight loss/gain, exercise, healthy habits, emotional eating, reading food labels, different diets. Be warm, practical, use simple everyday language — not scientific jargon. Use emojis naturally. Keep responses to 2-4 short paragraphs. Never be judgmental. If medical conditions are mentioned, suggest seeing a doctor.`;
      const history = messages.slice(-12).map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 800, system: sys, messages: [...history, { role: "user", content: msg }] }),
      });
      const data = await res.json();
      setMessages(m => [...m, { role: "assistant", text: data.content?.[0]?.text || "Sorry, try again!" }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", text: "Oops, connection issue! Please try again 😊" }]);
    }
    setLoading(false);
  }

  const QUICK = ["What should I eat today?", "Explain calories simply", "What are macros?", "How much protein do I need?", "What's a healthy breakfast?", "How do I stop stress eating?"];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#f5f1eb" }}>
      <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-7px)}}`}</style>
      {/* Header */}
      <div style={{ padding: "13px 16px", background: "rgba(255,255,255,0.95)", borderBottom: "1px solid #e5ddd1", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <div style={{ width: 46, height: 46, borderRadius: "50%", overflow: "hidden", border: "2px solid #e8845a", flexShrink: 0 }}><Mollie size={46}/></div>
        <div>
          <p style={{ fontFamily: "Lato", fontSize: 15, fontWeight: 700, color: "#2d2a25" }}>Coach Mollie</p>
          <p style={{ fontFamily: "Lato", fontSize: 11, color: "#6b9e7a" }}>● Online — Ask me anything!</p>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 8px", minHeight: 0 }}>
        {messages.length <= 1 && (
          <div style={{ marginBottom: 14 }}>
            <p style={{ fontFamily: "Lato", fontSize: 11, color: "#9b9287", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, textAlign: "center" }}>💡 Try asking...</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center" }}>
              {QUICK.map(q => <button key={q} onClick={() => { setInput(q); inputRef.current?.focus(); }} style={{ padding: "7px 12px", borderRadius: 99, border: "1.5px solid #e0c4a8", background: "#fff9f5", cursor: "pointer", fontFamily: "Lato", fontSize: 12, color: "#7a5a3a" }}>{q}</button>)}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 13, alignItems: "flex-end", gap: 8 }}>
            {m.role === "assistant" && <div style={{ width: 34, height: 34, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}><Mollie size={34}/></div>}
            <div style={{ maxWidth: "78%", padding: "12px 15px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: m.role === "user" ? "linear-gradient(135deg,#2d4a5a,#3a6a7a)" : "#fff", color: m.role === "user" ? "#fff" : "#2d2a25", fontFamily: "Lato", fontSize: 14, lineHeight: 1.7, boxShadow: "0 2px 10px rgba(0,0,0,0.08)", whiteSpace: "pre-wrap" }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 8, marginBottom: 13, alignItems: "flex-end" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", overflow: "hidden" }}><Mollie size={34}/></div>
            <div style={{ padding: "13px 17px", borderRadius: "18px 18px 18px 4px", background: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "flex", gap: 5 }}>{[0,1,2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#e8845a", animation: `bounce 1.2s ${i*0.2}s infinite` }}/>)}</div>
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Input — always at bottom */}
      <div style={{ flexShrink: 0, padding: "10px 14px 14px", background: "#fff", borderTop: "1.5px solid #e5ddd1", display: "flex", gap: 10, alignItems: "center" }}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Message Coach Mollie..."
          style={{ flex: 1, padding: "12px 16px", borderRadius: 24, border: "1.5px solid #ddd5c8", background: "#faf8f5", fontFamily: "Lato, sans-serif", fontSize: 14, color: "#2d2a25", outline: "none" }}
        />
        <button onClick={send} disabled={!input.trim() || loading} style={{ width: 46, height: 46, borderRadius: "50%", border: "none", flexShrink: 0, cursor: input.trim() && !loading ? "pointer" : "default", background: input.trim() && !loading ? "linear-gradient(135deg,#c85a2a,#e8845a)" : "#e8e0d5", color: "#fff", fontSize: 19, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", boxShadow: input.trim() ? "0 3px 10px rgba(232,132,90,0.4)" : "none" }}>➤</button>
      </div>
    </div>
  );
}

// ── MEALS ─────────────────────────────────────────────────────────────────────
function MealsScreen({ meals, setMeals }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mealType, setMealType] = useState("Breakfast");
  const [custom, setCustom] = useState({ name: "", calories: "", protein: "", carbs: "", fats: "" });
  const [tab, setTab] = useState("search");

  useEffect(() => {
    if (search.length < 2) { setResults([]); return; }
    setResults(FOOD_DB.filter(f => f.name.toLowerCase().includes(search.toLowerCase())).slice(0, 8));
  }, [search]);

  function addFood(food) {
    setMeals(m => [...m, { id: Date.now(), name: food.name, mealType, calories: food.cal, protein: food.p, carbs: food.c, fats: food.f, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setSearch(""); setResults([]); setSelected(null);
  }

  function addCustom() {
    if (!custom.name.trim() || !custom.calories) return;
    setMeals(m => [...m, { id: Date.now(), name: custom.name, mealType, calories: +custom.calories, protein: +custom.protein || 0, carbs: +custom.carbs || 0, fats: +custom.fats || 0, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setCustom({ name: "", calories: "", protein: "", carbs: "", fats: "" });
  }

  const mealGroups = MEAL_TYPES.map(t => ({ type: t, items: meals.filter(m => m.mealType === t) })).filter(g => g.items.length > 0);

  return (
    <div style={{ paddingBottom: 20 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 14, overflowX: "auto", paddingBottom: 2 }}>
        {MEAL_TYPES.map(t => <button key={t} onClick={() => setMealType(t)} style={{ padding: "8px 15px", borderRadius: 99, border: "none", cursor: "pointer", background: mealType === t ? "#2d4a5a" : "#e8e0d5", color: mealType === t ? "#fff" : "#6b6560", fontFamily: "Lato", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>{MEAL_ICONS[t]} {t}</button>)}
      </div>
      <div style={{ display: "flex", background: "#e8e0d5", borderRadius: 12, padding: 4, marginBottom: 14 }}>
        {[["search","🔍 Search Foods"],["custom","✏️ Manual Entry"]].map(([id, lbl]) => <button key={id} onClick={() => setTab(id)} style={{ flex: 1, padding: "9px", borderRadius: 9, border: "none", cursor: "pointer", background: tab === id ? "#fff" : "transparent", fontFamily: "Lato", fontSize: 13, fontWeight: 700, color: tab === id ? "#2d2a25" : "#9b9287", transition: "all 0.2s", boxShadow: tab === id ? "0 1px 6px rgba(0,0,0,0.1)" : "none" }}>{lbl}</button>)}
      </div>

      {tab === "search" && (
        <div style={card}>
          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#2d2a25", marginBottom: 4 }}>Search Any Food</h3>
          <p style={{ fontFamily: "Lato", fontSize: 12, color: "#9b9287", marginBottom: 12 }}>Type to find nutrition info automatically</p>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="e.g. banana, rice, chicken, coffee..." style={{ ...inp, marginBottom: 10 }}/>
          {search.length === 0 && (
            <div>
              <p style={{ fontFamily: "Lato", fontSize: 12, color: "#9b9287", marginBottom: 8 }}>Popular:</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {["Banana","Chicken","Rice","Egg","Oatmeal","Salmon","Avocado","Pasta"].map(f => <button key={f} onClick={() => setSearch(f)} style={{ padding: "6px 12px", borderRadius: 99, border: "1px solid #e0d5c8", background: "#faf8f5", cursor: "pointer", fontFamily: "Lato", fontSize: 12, color: "#6b6560" }}>{f}</button>)}
              </div>
            </div>
          )}
          {results.length > 0 && (
            <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #e8e0d5" }}>
              {results.map((food, i) => (
                <div key={i}>
                  <button onClick={() => setSelected(selected?.name === food.name ? null : food)} style={{ width: "100%", padding: "12px 14px", border: "none", cursor: "pointer", textAlign: "left", background: selected?.name === food.name ? "#fff5f0" : i % 2 === 0 ? "#faf8f5" : "#fff", borderLeft: `3px solid ${selected?.name === food.name ? "#e8845a" : "transparent"}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ fontFamily: "Lato", fontSize: 13, fontWeight: 700, color: "#2d2a25" }}>{food.name}</p>
                      <p style={{ fontFamily: "Lato", fontSize: 11, color: "#9b9287" }}>P:{food.p}g · C:{food.c}g · F:{food.f}g</p>
                    </div>
                    <span style={{ fontFamily: "Lato", fontSize: 13, color: "#e8845a", fontWeight: 700, flexShrink: 0, marginLeft: 10 }}>{food.cal} kcal</span>
                  </button>
                  {selected?.name === food.name && (
                    <div style={{ background: "#fff5f0", padding: "12px 14px", borderTop: "1px solid #f4d4c0" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginBottom: 10 }}>
                        {[["🔥",food.cal,"kcal"],["🥩",food.p,"g protein"],["🌾",food.c,"g carbs"],["🥑",food.f,"g fat"]].map(([e,v,u]) => (
                          <div key={u} style={{ background: "#fff", borderRadius: 9, padding: "7px 4px", textAlign: "center" }}>
                            <p style={{ fontSize: 14 }}>{e}</p>
                            <p style={{ fontFamily: "Lato", fontSize: 12, fontWeight: 700, color: "#2d2a25" }}>{v}</p>
                            <p style={{ fontFamily: "Lato", fontSize: 9, color: "#9b9287" }}>{u}</p>
                          </div>
                        ))}
                      </div>
                      <PrimaryBtn onClick={() => addFood(food)} style={{ padding: "10px" }}>✅ Add to {mealType}</PrimaryBtn>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {search.length >= 2 && results.length === 0 && <p style={{ fontFamily: "Lato", fontSize: 13, color: "#9b9287", textAlign: "center", padding: "16px 0" }}>Not found — try "Manual Entry" tab!</p>}
        </div>
      )}

      {tab === "custom" && (
        <div style={card}>
          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#2d2a25", marginBottom: 4 }}>Enter Manually</h3>
          <p style={{ fontFamily: "Lato", fontSize: 12, color: "#9b9287", marginBottom: 14 }}>Check the packaging or label. Only name & calories required.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ gridColumn: "1/-1" }}>
              <label style={{ fontFamily: "Lato", fontSize: 12, color: "#6b6560", display: "block", marginBottom: 5 }}>Food Name ★</label>
              <input value={custom.name} onChange={e => setCustom(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Mum's jollof rice" style={inp}/>
            </div>
            {[["Calories (kcal) ★","calories","350"],["Protein (g)","protein","0"],["Carbs (g)","carbs","0"],["Fats (g)","fats","0"]].map(([lbl,key,ph]) => (
              <div key={key}>
                <label style={{ fontFamily: "Lato", fontSize: 12, color: "#6b6560", display: "block", marginBottom: 5 }}>{lbl}</label>
                <input type="number" min="0" value={custom[key]} onChange={e => setCustom(f => ({ ...f, [key]: e.target.value }))} placeholder={ph} style={inp}/>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14 }}>
            <PrimaryBtn onClick={addCustom} disabled={!custom.name || !custom.calories}>✅ Add to {mealType}</PrimaryBtn>
          </div>
        </div>
      )}

      {mealGroups.length > 0 && (
        <div style={{ marginTop: 4 }}>
          <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#2d2a25", marginBottom: 12 }}>Today's Meals</h3>
          {mealGroups.map(g => (
            <div key={g.type} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 16 }}>{MEAL_ICONS[g.type]}</span>
                <h4 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 15, color: "#2d2a25" }}>{g.type}</h4>
                <span style={{ fontFamily: "Lato", fontSize: 12, color: "#9b9287", marginLeft: "auto" }}>{g.items.reduce((s, i) => s + i.calories, 0)} kcal</span>
              </div>
              {g.items.map(item => (
                <div key={item.id} style={{ background: "rgba(255,255,255,0.85)", borderRadius: 12, padding: "11px 14px", marginBottom: 7, display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "Lato", fontSize: 13, fontWeight: 700, color: "#2d2a25" }}>{item.name}</p>
                    <p style={{ fontFamily: "Lato", fontSize: 11, color: "#9b9287", marginTop: 2 }}>🥩{item.protein}g · 🌾{item.carbs}g · 🥑{item.fats}g · {item.time}</p>
                  </div>
                  <span style={{ fontFamily: "Lato", fontSize: 13, color: "#e8845a", fontWeight: 700, flexShrink: 0 }}>{item.calories} kcal</span>
                  <button onClick={() => setMeals(m => m.filter(x => x.id !== item.id))} style={{ width: 26, height: 26, borderRadius: "50%", border: "none", background: "#f0e8df", cursor: "pointer", color: "#9b9287", fontSize: 14, flexShrink: 0 }}>×</button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── SUMMARY ───────────────────────────────────────────────────────────────────
function SummaryScreen({ user, meals, water, setWater }) {
  const macros = user.macros || { protein: 150, carbs: 250, fats: 65 };
  const calGoal = user.calorieGoal || 2000;
  const totals = meals.reduce((a, m) => ({ calories: a.calories + m.calories, protein: a.protein + m.protein, carbs: a.carbs + m.carbs, fats: a.fats + m.fats }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
  const calPct = Math.min(totals.calories / calGoal, 1);
  const r = 50, circ = 2 * Math.PI * r;
  const goalLabels = (user.goals || []).map(id => ALL_GOALS.find(g => g.id === id)?.label).filter(Boolean);

  return (
    <div>
      <div style={{ background: "linear-gradient(135deg,#2d4a5a,#3a6a7a)", borderRadius: 18, padding: "15px 18px", marginBottom: 14, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(255,255,255,0.4)", flexShrink: 0 }}><Mollie size={48}/></div>
        <div>
          <p style={{ fontFamily: "Lato", fontSize: 11, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: 1 }}>Coach Mollie</p>
          <p style={{ fontFamily: "Lato", fontSize: 13, color: "#fff", lineHeight: 1.5 }}>Welcome back, <strong>{user?.name}</strong>! You've got this 💪</p>
          {goalLabels.length > 0 && <p style={{ fontFamily: "Lato", fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 2 }}>Goals: {goalLabels.join(" · ")}</p>}
        </div>
      </div>

      <div style={card}>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#2d2a25", marginBottom: 4 }}>Daily Calories</h2>
        <p style={{ fontFamily: "Lato", fontSize: 11, color: "#9b9287", marginBottom: 14 }}>Your goal: {calGoal} kcal/day</p>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <svg width={116} height={116} style={{ transform: "rotate(-90deg)" }}>
              <circle cx={58} cy={58} r={r} fill="none" stroke="#e8e0d5" strokeWidth={11}/>
              <circle cx={58} cy={58} r={r} fill="none" stroke={totals.calories >= calGoal ? "#6b9e7a" : "#e8845a"} strokeWidth={11} strokeDasharray={`${calPct*circ} ${circ}`} strokeLinecap="round" style={{ transition: "stroke-dasharray 0.8s ease" }}/>
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#2d2a25" }}>{totals.calories}</span>
              <span style={{ fontFamily: "Lato", fontSize: 9, color: "#9b9287", textTransform: "uppercase" }}>eaten</span>
            </div>
          </div>
          <div>
            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#2d2a25", marginBottom: 8 }}>
              {Math.max(calGoal - totals.calories, 0) > 0 ? <><span style={{ color: "#e8845a" }}>{Math.max(calGoal - totals.calories, 0)}</span> kcal left</> : "🎉 Goal hit!"}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontFamily: "Lato", fontSize: 12, color: "#6b6560" }}>🍽 Eaten: <strong>{totals.calories}</strong></span>
              <span style={{ fontFamily: "Lato", fontSize: 12, color: "#6b6560" }}>🎯 Goal: <strong>{calGoal}</strong></span>
            </div>
          </div>
        </div>
      </div>

      <div style={card}>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#2d2a25", marginBottom: 14 }}>Macronutrients</h2>
        <MacroBar label="🥩 Protein" value={totals.protein} max={macros.protein} color="#6b9e7a"/>
        <MacroBar label="🌾 Carbs" value={totals.carbs} max={macros.carbs} color="#e8845a"/>
        <MacroBar label="🥑 Fats" value={totals.fats} max={macros.fats} color="#7a9bbf"/>
      </div>

      <div style={card}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#2d2a25" }}>Water 💧</h2>
            <p style={{ fontFamily: "Lato", fontSize: 11, color: "#9b9287" }}>Tap each droplet as you drink a glass</p>
          </div>
          <span style={{ fontFamily: "Lato", fontSize: 14, fontWeight: 700, color: "#7a9bbf" }}>{water}/8</span>
        </div>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
          {Array.from({ length: 8 }).map((_, i) => <button key={i} onClick={() => setWater(i < water ? i : i + 1)} style={{ width: 44, height: 44, borderRadius: 12, border: "none", cursor: "pointer", background: i < water ? "#c5ddf0" : "#e8e0d5", fontSize: 20, transition: "all 0.2s", transform: i < water ? "scale(1.1)" : "scale(1)" }}>💧</button>)}
        </div>
        {water === 8 && <p style={{ fontFamily: "Lato", fontSize: 13, color: "#6b9e7a", marginTop: 10, fontWeight: 700 }}>✅ Hydration goal complete!</p>}
      </div>

      {meals.length === 0 && (
        <div style={{ background: "#fff8f3", border: "1.5px dashed #e0c4a8", borderRadius: 16, padding: "20px", textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 17, color: "#2d2a25", marginBottom: 6 }}>Nothing logged yet today</p>
          <p style={{ fontFamily: "Lato", fontSize: 13, color: "#9b9287" }}>Go to the <strong>Meals</strong> tab to start logging 🍽️</p>
        </div>
      )}
    </div>
  );
}

// ── LEARN ─────────────────────────────────────────────────────────────────────
function LearnScreen() {
  const [open, setOpen] = useState(null);
  const topics = [
    { icon: "🔥", title: "What are Calories?", body: `Calories are units of energy. Everything you eat contains calories — they fuel your body like petrol fuels a car.\n\n🍎 Apple = ~95 cal | 🍗 Chicken (100g) = ~165 cal | 🍕 Pizza slice = ~285 cal\n\nYour body burns calories 24/7, even while sleeping. Eat more than you burn → weight gain. Eat less → weight loss. The average adult needs about 2,000 kcal/day — but it varies by age, size and activity.` },
    { icon: "💪", title: "What are Macros?", body: `"Macros" = macronutrients — the 3 main building blocks of food:\n\n🥩 PROTEIN (4 kcal/g) — Builds muscle, keeps you full. Found in: meat, fish, eggs, dairy, beans.\n\n🌾 CARBOHYDRATES (4 kcal/g) — Main energy source. Found in: bread, rice, pasta, fruits, vegetables.\n\n🥑 FATS (9 kcal/g) — Supports brain & hormones. Found in: oils, nuts, avocado, fatty fish.\n\nA balanced meal has all three!` },
    { icon: "⚖️", title: "How to Lose Weight", body: `Weight loss = eating fewer calories than you burn.\n\n✅ What works:\n• More protein — keeps you full longer\n• Load up on veggies (low cal, high volume)\n• Reduce sugary drinks and processed food\n• Drink water before meals\n• Aim to lose 0.5–1kg per week safely\n\n❌ Avoid: crash diets, skipping meals entirely, cutting entire food groups.` },
    { icon: "💪", title: "How to Build Muscle", body: `Muscle requires protein + strength training.\n\n💡 Rules:\n• Eat 1.6–2.2g protein per kg of body weight daily\n• Slight calorie surplus (+200–300 kcal)\n• Lift weights 3–5x per week\n• Sleep 7–9 hours (that's when muscle grows!)\n\n🍖 Best foods: chicken, beef, fish, eggs, Greek yogurt, lentils, protein shakes` },
    { icon: "🏷️", title: "Reading Nutrition Labels", body: `Labels can be confusing — here's how:\n\n1️⃣ Check SERVING SIZE first — all values are per serving!\n2️⃣ CALORIES — energy per serving\n3️⃣ TOTAL FAT — watch "Saturated Fat" (limit it)\n4️⃣ CARBS — check "Added Sugars" (keep low)\n5️⃣ PROTEIN — aim for more\n6️⃣ % Daily Value: 5% = low, 20%+ = high` },
    { icon: "💧", title: "Hydration & Water", body: `Most people are dehydrated without knowing!\n\n💧 Target: 8 glasses (2 litres) per day. More if you exercise.\n\n🧠 Why it matters:\n• Improves focus and energy\n• Thirst is often mistaken for hunger!\n• Supports digestion and metabolism\n\n✅ Tips: Start mornings with water, carry a bottle, eat water-rich foods (cucumber, watermelon, oranges).` },
    { icon: "😴", title: "Sleep & Weight", body: `Poor sleep is a hidden cause of weight gain.\n\nSleeping under 7 hours:\n• Increases hunger hormones by 24%\n• Makes you crave sugar & junk\n• Slows metabolism and recovery\n\n✅ Tips: Same bedtime every night, no screens 1hr before bed, aim for 7–9 hours.` },
    { icon: "🧘", title: "Emotional Eating", body: `Eating to cope with feelings — very common!\n\n🔍 Signs:\n• Eating when stressed, bored or anxious\n• Craving specific comfort foods\n• Guilt after eating\n\n💡 What helps:\n• Pause: "Am I actually hungry?"\n• Wait 10 minutes before eating\n• Walk, journal, or call a friend\n• Talk to Coach Mollie anytime 💚` },
  ];

  return (
    <div style={{ paddingBottom: 10 }}>
      <div style={card}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", overflow: "hidden" }}><Mollie size={44}/></div>
          <div>
            <p style={{ fontFamily: "Lato", fontSize: 14, fontWeight: 700, color: "#2d2a25" }}>Coach Mollie's Knowledge Hub</p>
            <p style={{ fontFamily: "Lato", fontSize: 12, color: "#9b9287" }}>Tap any topic to learn more 📚</p>
          </div>
        </div>
      </div>
      {topics.map((t, i) => (
        <div key={i} style={{ background: "rgba(255,255,255,0.88)", border: "1.5px solid #e8e0d5", borderRadius: 16, marginBottom: 9, overflow: "hidden" }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", padding: "15px 16px", border: "none", cursor: "pointer", background: "transparent", display: "flex", alignItems: "center", gap: 12, textAlign: "left" }}>
            <span style={{ fontSize: 24, flexShrink: 0 }}>{t.icon}</span>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: "#2d2a25", flex: 1 }}>{t.title}</span>
            <span style={{ color: "#9b9287", transition: "transform 0.2s", transform: open === i ? "rotate(180deg)" : "none", display: "inline-block" }}>▾</span>
          </button>
          {open === i && <div style={{ padding: "0 16px 16px", fontFamily: "Lato", fontSize: 13, color: "#3a3530", lineHeight: 1.8, whiteSpace: "pre-wrap" }}>{t.body}</div>}
        </div>
      ))}
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function NutriLog() {
  const [screen, setScreen] = useState("auth");
  const [user, setUser] = useState(null);
  const [meals, setMeals] = useState([]);
  const [water, setWater] = useState(0);
  const [view, setView] = useState("summary");

  if (screen === "forgot") return <ForgotPassword onBack={() => setScreen("auth")}/>;
  if (screen === "auth") return <AuthScreen onAuth={u => { setUser(u); setScreen("goalsetup"); }} onForgot={() => setScreen("forgot")}/>;
  if (screen === "goalsetup") return <GoalSetup user={user} onDone={u => { setUser(u); setScreen("coach"); }}/>;
  if (screen === "coach") return <CoachWelcome user={user} onContinue={() => setScreen("app")}/>;

  const TABS = [
    { id: "summary", icon: "📊", label: "Today" },
    { id: "meals",   icon: "🍽️", label: "Meals" },
    { id: "chat",    icon: "💬", label: "Coach" },
    { id: "learn",   icon: "📚", label: "Learn" },
  ];
  const NAV_H = 62;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Lato:wght@300;400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#f5f1eb;}
        input:focus,select:focus{border-color:#e8845a!important;box-shadow:0 0 0 3px rgba(232,132,90,.15);outline:none;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-thumb{background:#d4c9bb;border-radius:99px;}
      `}</style>
      <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "linear-gradient(160deg,#f5f1eb,#ede6db)" }}>

        {/* Top bar — hidden in chat */}
        {view !== "chat" && (
          <div style={{ padding: "15px 18px 11px", background: "rgba(255,255,255,0.75)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e5ddd1", flexShrink: 0 }}>
            <div style={{ maxWidth: 520, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#2d2a25" }}>🥗 NutriLog</h1>
                <p style={{ fontFamily: "Lato", fontSize: 11, color: "#9b9287" }}>{new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</p>
              </div>
              <button onClick={() => setScreen("goalsetup")} style={{ display: "flex", alignItems: "center", gap: 7, background: "#fff5f0", border: "1.5px solid #f4c4a8", borderRadius: 50, padding: "5px 12px 5px 5px", cursor: "pointer" }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", overflow: "hidden" }}><Mollie size={30}/></div>
                <span style={{ fontFamily: "Lato", fontSize: 12, fontWeight: 700, color: "#c85a2a" }}>Goals</span>
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div style={{ flex: 1, minHeight: 0, overflowY: view === "chat" ? "hidden" : "auto", display: view === "chat" ? "flex" : "block", flexDirection: "column", paddingBottom: view === "chat" ? 0 : NAV_H + 8 }}>
          <div style={{ maxWidth: 520, margin: "0 auto", padding: view === "chat" ? 0 : "16px 16px 0", flex: view === "chat" ? 1 : undefined, display: view === "chat" ? "flex" : "block", flexDirection: "column", minHeight: 0, width: "100%" }}>
            {view === "summary" && <SummaryScreen user={user} meals={meals} water={water} setWater={setWater}/>}
            {view === "meals"   && <MealsScreen meals={meals} setMeals={setMeals}/>}
            {view === "chat"    && <ChatScreen user={user}/>}
            {view === "learn"   && <LearnScreen/>}
          </div>
        </div>

        {/* Bottom nav */}
        <div style={{ flexShrink: 0, height: NAV_H, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)", borderTop: "1px solid #e5ddd1", display: "flex", zIndex: 20 }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setView(tab.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, background: "none", border: "none", cursor: "pointer" }}>
              <span style={{ fontSize: 21 }}>{tab.icon}</span>
              <span style={{ fontFamily: "Lato", fontSize: 10, fontWeight: 700, letterSpacing: 0.5, color: view === tab.id ? "#2d2a25" : "#b0a898", textTransform: "uppercase" }}>{tab.label}</span>
              {view === tab.id && <div style={{ width: 18, height: 3, background: "#e8845a", borderRadius: 99 }}/>}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

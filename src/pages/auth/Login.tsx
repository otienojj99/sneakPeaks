// src/pages/auth/Auth.tsx
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiUser,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const sneakerSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80",
    title: "Discover Exclusive Drops",
    subtitle:
      "Stay ahead of the game with the latest and most coveted sneaker releases.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    title: "Manage Your Inventory",
    subtitle:
      "Track stock, orders, and analytics all from one powerful dashboard.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=800&q=80",
    title: "Scale Your Business",
    subtitle:
      "Powerful tools designed to help your sneaker business reach new heights.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&q=80",
    title: "Real-Time Analytics",
    subtitle:
      "Get insights into your sales, customers, and trending products instantly.",
  },
];

const Auth = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Form mode
  const [isLogin, setIsLogin] = useState(true);

  // Login fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register fields
  const [fullName, setFullName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const goToNextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % sneakerSlides.length);
      setIsTransitioning(false);
    }, 300);
  };

  const goToPrevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(
        (prev) => (prev - 1 + sneakerSlides.length) % sneakerSlides.length,
      );
      setIsTransitioning(false);
    }, 300);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Invalid credentials. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !regEmail || !regPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (regPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (regPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setIsSubmitting(true);
    try {
      // Replace with your register API call
      // await register(fullName, regEmail, regPassword);
      toast.success("Account created! Please sign in.");
      setIsLogin(true);
      setEmail(regEmail);
      setRegEmail("");
      setRegPassword("");
      setConfirmPassword("");
      setFullName("");
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Registration failed. Try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setShowPassword(false);
    setShowRegPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex border-4 ">
      {/* ==================== LEFT: SLIDER BANNER ==================== */}
      <div className="hidden lg:flex lg:w-[55%] xl:w-[58%] relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className={`absolute inset-0 transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <img
              src={sneakerSlides[currentSlide].image}
              alt="Sneaker"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-slate-900/20 to-slate-900/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-slate-900/20" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14 w-full">
          {/* Top: Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
              <span className="text-white font-bold text-lg">SP</span>
            </div>
            <div>
              <h2 className="text-white font-bold text-xl tracking-tight">
                SneakPeaks
              </h2>
              <p className="text-white/50 text-xs">Dashboard</p>
            </div>
          </div>

          {/* Center: Slide Text */}
          <div className="max-w-lg">
            <div
              className={`transition-all duration-500 ${
                isTransitioning
                  ? "opacity-0 translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/80 text-xs font-medium">
                  {String(currentSlide + 1).padStart(2, "0")} /{" "}
                  {String(sneakerSlides.length).padStart(2, "0")}
                </span>
              </div>
              <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
                {sneakerSlides[currentSlide].title}
              </h1>
              <p className="text-white/60 text-lg leading-relaxed max-w-md">
                {sneakerSlides[currentSlide].subtitle}
              </p>
            </div>
          </div>

          {/* Bottom: Navigation */}
          <div className="flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {sneakerSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsTransitioning(true);
                    setTimeout(() => {
                      setCurrentSlide(index);
                      setIsTransitioning(false);
                    }, 300);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "w-8 bg-white"
                      : "w-1.5 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrevSlide}
                className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all"
              >
                <FiChevronLeft size={18} />
              </button>
              <button
                onClick={goToNextSlide}
                className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all"
              >
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== RIGHT: AUTH FORM ==================== */}
      <div className="w-full lg:w-[45%] xl:w-[42%] flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-[420px]">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mx-auto border border-white/20">
              <span className="text-white font-bold text-lg">SP</span>
            </div>
            <h2 className="text-white font-bold text-xl mt-3">SneakPeaks</h2>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[28px] font-bold text-white tracking-tight">
              {isLogin ? "Welcome back" : "Create an account"}
            </h1>
            <p className="text-slate-400 mt-2 text-[15px]">
              {isLogin
                ? "Enter your credentials to access your dashboard"
                : "Fill in your details to get started with SneakPeaks"}
            </p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex bg-slate-800/50 rounded-xl p-1 mb-8 border border-slate-700/50">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                isLogin
                  ? "bg-white text-slate-900 shadow-lg"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                !isLogin
                  ? "bg-white text-slate-900 shadow-lg"
                  : "text-slate-400 hover:text-slate-300"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* ===== LOGIN FORM ===== */}
          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <FiMail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    size={18}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 transition-all"
                    placeholder="admin@sneakpeaks.com"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FiLock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    size={18}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-11 pr-12 py-3.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 transition-all"
                    placeholder="••••••••"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="w-[18px] h-[18px] rounded-md border-2 border-slate-600 peer-checked:border-emerald-500 peer-checked:bg-emerald-500 transition-all flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <FiArrowRight
                      className="group-hover:translate-x-0.5 transition-transform"
                      size={16}
                    />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700/50" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-slate-900 px-4 text-xs text-slate-500 uppercase tracking-wider">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl py-3 text-sm text-slate-300 hover:bg-slate-700/50 hover:border-slate-600/50 transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl py-3 text-sm text-slate-300 hover:bg-slate-700/50 hover:border-slate-600/50 transition-all"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </button>
              </div>
            </form>
          ) : (
            /* ===== REGISTER FORM ===== */
            <form onSubmit={handleRegister} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full name
                </label>
                <div className="relative">
                  <FiUser
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    size={18}
                  />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 transition-all"
                    placeholder="John Doe"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email address
                </label>
                <div className="relative">
                  <FiMail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    size={18}
                  />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 transition-all"
                    placeholder="john@sneakpeaks.com"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FiLock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    size={18}
                  />
                  <input
                    type={showRegPassword ? "text" : "password"}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl pl-11 pr-12 py-3.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 transition-all"
                    placeholder="Min. 6 characters"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showRegPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
                {/* Password strength indicator */}
                {regPassword && (
                  <div className="mt-2.5 flex items-center gap-1.5">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          regPassword.length >= level * 3
                            ? regPassword.length >= 12
                              ? "bg-emerald-400"
                              : regPassword.length >= 8
                                ? "bg-yellow-400"
                                : "bg-red-400"
                            : "bg-slate-700"
                        }`}
                      />
                    ))}
                    <span
                      className={`text-xs ml-1.5 font-medium ${
                        regPassword.length >= 12
                          ? "text-emerald-400"
                          : regPassword.length >= 8
                            ? "text-yellow-400"
                            : "text-red-400"
                      }`}
                    >
                      {regPassword.length >= 12
                        ? "Strong"
                        : regPassword.length >= 8
                          ? "Medium"
                          : "Weak"}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Confirm password
                </label>
                <div className="relative">
                  <FiLock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    size={18}
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full bg-slate-800/50 border rounded-xl pl-11 pr-12 py-3.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                      confirmPassword && confirmPassword !== regPassword
                        ? "border-red-500/50 focus:ring-red-500/40 focus:border-red-500/40"
                        : confirmPassword && confirmPassword === regPassword
                          ? "border-emerald-500/50 focus:ring-emerald-500/40 focus:border-emerald-500/40"
                          : "border-slate-700/50 focus:ring-emerald-500/40 focus:border-emerald-500/40"
                    }`}
                    placeholder="Re-enter your password"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>
                {confirmPassword && confirmPassword !== regPassword && (
                  <p className="text-red-400 text-xs mt-1.5">
                    Passwords do not match
                  </p>
                )}
              </div>

              {/* Terms */}
              <label className="flex items-start gap-2.5 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input type="checkbox" className="peer sr-only" required />
                  <div className="w-[18px] h-[18px] rounded-md border-2 border-slate-600 peer-checked:border-emerald-500 peer-checked:bg-emerald-500 transition-all flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <FiArrowRight
                      className="group-hover:translate-x-0.5 transition-transform"
                      size={16}
                    />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Bottom toggle text */}
          <p className="text-center text-slate-500 text-sm mt-8">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleMode}
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/services/appwrite";

export function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string}>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      email: "",
      password: ""
    };;

    // Basic validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Successful login - in a real app, this would call an API
      console.log("Login successful:", formData);
      const session = await loginUser({
        email: formData.email,
        password: formData.password,
      });
      if (session.$id) {
        onLoginSuccess();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const onNavigateToSignup = () => {
    navigate("/signup");
  };

  const onLoginSuccess = () => {
    navigate("/");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8 shadow-lg"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="font-['Poppins'] font-semibold mb-2"
            style={{
              color: "var(--text-primary)",
              fontSize: "2rem",
            }}
          >
            Welcome Back
          </h1>
          <p
            className="font-['Lato']"
            style={{ color: "var(--text-secondary)" }}
          >
            Log in to access your RecipeReveal account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block font-['Poppins'] font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg font-['Lato'] outline-none transition-all"
              style={{
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-primary)",
                border: `2px solid ${
                  errors.email ? "#ef4444" : "var(--border)"
                }`,
              }}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p
                className="mt-1 font-['Lato'] text-sm"
                style={{ color: "#ef4444" }}
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block font-['Poppins'] font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg font-['Lato'] outline-none transition-all pr-12"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  border: `2px solid ${
                    errors.password ? "#ef4444" : "var(--border)"
                  }`,
                }}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                style={{ color: "var(--text-secondary)" }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p
                className="mt-1 font-['Lato'] text-sm"
                style={{ color: "#ef4444" }}
              >
                {errors.password}
              </p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              className="font-['Lato'] text-sm transition-opacity hover:opacity-80"
              style={{ color: "var(--brand-primary)" }}
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-['Poppins'] font-semibold transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "var(--brand-primary)",
              color: "var(--bg-primary)",
            }}
          >
            Log In
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p
            className="font-['Lato']"
            style={{ color: "var(--text-secondary)" }}
          >
            Don't have an account?{" "}
            <button
              onClick={onNavigateToSignup}
              className="font-['Poppins'] font-medium transition-opacity hover:opacity-80"
              style={{ color: "var(--brand-primary)" }}
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

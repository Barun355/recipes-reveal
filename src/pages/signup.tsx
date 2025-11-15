import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createUser } from "@/services/appwrite";

interface FormDataInterface {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormDataInterface>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Basic validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 6) {
      newErrors.username = "Username must be at least 6 characters";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Successful signup - in a real app, this would call an API
      console.log("Signup successful:", formData);
      const user = await createUser({
        email: formData.email,
        password: formData.password,
        name: formData.username,
      });
      if (user.$id) {
        onSignupSuccess();
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

  const onNavigateToLogin = () => {
    navigate("/login");
  };

  const onSignupSuccess = () => {
    navigate("/login");
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
            Create Account
          </h1>
          <p
            className="font-['Lato']"
            style={{ color: "var(--text-secondary)" }}
          >
            Join RecipeReveal and start your culinary journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block font-['Poppins'] font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg font-['Lato'] outline-none transition-all"
              style={{
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-primary)",
                border: `2px solid ${
                  errors.email ? "#ef4444" : "var(--border)"
                }`,
              }}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p
                className="mt-1 font-['Lato'] text-sm"
                style={{ color: "#ef4444" }}
              >
                {errors.username}
              </p>
            )}
          </div>
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
                placeholder="Create a password"
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

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block font-['Poppins'] font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg font-['Lato'] outline-none transition-all pr-12"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  border: `2px solid ${
                    errors.confirmPassword ? "#ef4444" : "var(--border)"
                  }`,
                }}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                style={{ color: "var(--text-secondary)" }}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p
                className="mt-1 font-['Lato'] text-sm"
                style={{ color: "#ef4444" }}
              >
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              className="mt-1"
              style={{ accentColor: "var(--brand-primary)" }}
              required
            />
            <label
              htmlFor="terms"
              className="font-['Lato'] text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              I agree to the{" "}
              <button
                type="button"
                className="transition-opacity hover:opacity-80"
                style={{ color: "var(--brand-primary)" }}
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                type="button"
                className="transition-opacity hover:opacity-80"
                style={{ color: "var(--brand-primary)" }}
              >
                Privacy Policy
              </button>
            </label>
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
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p
            className="font-['Lato']"
            style={{ color: "var(--text-secondary)" }}
          >
            Already have an account?{" "}
            <button
              onClick={onNavigateToLogin}
              className="font-['Poppins'] font-medium transition-opacity hover:opacity-80"
              style={{ color: "var(--brand-primary)" }}
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

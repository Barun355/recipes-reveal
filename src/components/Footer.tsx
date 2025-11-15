import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <footer
      className="py-12 px-4 mt-16"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <Logo />
          <div>
            <h4
              className="font-['Poppins'] font-medium mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Home", "All Recipes", "About Us", "Contact"].map((link) => (
                <li key={link}>
                  <button
                    className="font-['Lato'] text-sm transition-colors cursor-pointer"
                    style={{ color: "var(--text-secondary)" }}
                    onClick={() =>
                      link === "All Recipes"
                        ? handleNavigate("meals")
                        : link === "Home"
                        ? handleNavigate("")
                        : undefined
                    }
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className="font-['Poppins'] font-medium mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Categories
            </h4>
            <ul className="space-y-2">
              {["Vegan", "Non-Veg", "High Protein", "Quick Meals"].map(
                (category) => (
                  <li key={category}>
                    <span
                      className="font-['Lato'] text-sm cursor-pointer"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {category}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4
              className="font-['Poppins'] font-medium mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Connect
            </h4>
            <ul className="space-y-2">
              {["Instagram", "Facebook", "Twitter", "YouTube"].map((social) => (
                <li key={social}>
                  <span
                    className="font-['Lato'] text-sm cursor-pointer"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {social}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8" style={{ borderTop: "1px solid var(--border)" }}>
          <p
            className="font-['Lato'] text-sm text-center"
            style={{ color: "var(--text-secondary)" }}
          >
            © 2025 RecipeReveal. All rights reserved. Made with ❤️ for food
            lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

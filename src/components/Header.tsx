import { Moon, Sun } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import useTheme from "@/store/useTheme";
import Logo from "./Logo";

export default function Header({}) {
  const navigate = useNavigate();
  const { toggleDarkMode, darkMode } = useTheme();

  const currentUrl = useLocation().pathname.split("/");
  const currentPage = currentUrl[currentUrl.length - 1] || "home";
  // const [logIn, setLogin] = useState(false);

  const navItems = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "All Recipes",
      path: "/recipes",
    }
  ];

  // const loggedInNavItems = [
  //   {
  //     label: "Dashboard",
  //     path: "/dashboard"
  //   }
  // ];

  // function handleLogout() {
  //   logoutUser({});
  //   navigate("/");
  //   setLogin(false);
  // }

  // useEffect(() => {
  //   if (localStorage.getItem("sessionId")) {
  //     setLogin(true);
  //   } else {
  //     setLogin(false);
  //   }
  // }, []);

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "var(--bg-primary)",
        borderColor: "var(--border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Logo />
          </div>

          <div className="flex justify-center items-center gap-12">
            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className="font-['Lato'] font-medium transition-colors"
                  style={{
                    color:
                      currentPage === item.path.replace("/", "") ||
                      (item.path === "/" && currentPage === "home")
                        ? "var(--brand-primary)"
                        : "var(--text-primary)",
                  }}
                >
                  {item.label}
                </NavLink>
              ))}
              {/* {logIn && loggedInNavItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className="font-['Lato'] font-medium transition-colors"
                  style={{
                    color:
                      currentPage === item.path.replace("/", "") ||
                      (item.path === "/" && currentPage === "home")
                        ? "var(--brand-primary)"
                        : "var(--text-primary)",
                  }}
                >
                  {item.label}
                </NavLink>
              ))} */}
            </div>

            {/* {!logIn ? (
              <Button
                onClick={() => navigate("/login")}
                className="hidden md:flex items-center gap-2 px-4 py-2 font-['Poppins'] font-medium transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "var(--brand-primary)",
                  color: "var(--bg-primary)",
                }}
              >
                <LogIn className="text-slate-50 dark:text-orange-950 w-4 h-4" />
                Login
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 px-4 py-2 font-['Poppins'] font-medium transition-opacity hover:opacity-90"
              >
                Logout{" "}
                <LogOut className="text-slate-50  w-4 h-4" />
              </Button>
            )} */}

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-text-primary" />
              ) : (
                <Moon className="w-5 h-5 text-text-primary" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

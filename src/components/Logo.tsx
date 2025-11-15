import { cn, isMobile } from "@/lib/utils";

const Logo = () => {
  return (
    <div className={cn(
      "flex justify-center items-center rounded-md min-h-8 min-w-8 overflow-hidden",
      `${isMobile()? "h-12 w-12": "h-16 w-48"}`,
    )}>
      {!isMobile() ? (
        <img
          src="/logo-full.png"
          alt="RecipeReveal Logo Full"
          className="h-full w-full"
        />
      ) : (
        <img
          src="/logo.png"
          alt="RecipeReveal Logo"
          className="h-full w-full"
        />
      )}
    </div>
  );
};

export default Logo;

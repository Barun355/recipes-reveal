import { ArrowRight, Clock, Star, TrendingUp } from "lucide-react";
import { Button } from "../../components/ui/button";
import { RecipeCard } from "../../components/RecipeCard";
import ImageWithFallback from "../../components/figma/ImageWithFallback";
import { useNavigate } from "react-router-dom";
import useRecipes from "../../store/useRecipes";
import type { Recipes } from "@/types";

const Landing = () => {
  const navigate = useNavigate();
  const { recipes, getFeaturedRecipes, getHighProteinRecipeByTime } = useRecipes()

  const onRecipeClick = (recipe: Recipes) => {
    navigate(`/recipes/${recipe.id}`);
  };

  const onViewAllClick = () => {
    navigate("/recipes");
  };

  const heroRecipe = getHighProteinRecipeByTime();
  const featuredRecipes = getFeaturedRecipes();

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 21) return "Good Evening";
    return "Good Night";
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div
                className="inline-block px-4 py-2 rounded-full mb-4 text-sm font-['Lato'] font-semibold"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--brand-primary)",
                }}
              >
                {getTimeGreeting()} - High Protein Special
              </div>

              <h1
                className="font-['Poppins'] font-semibold mb-4"
                style={{
                  color: "var(--text-primary)",
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  lineHeight: "1.2",
                }}
              >
                {heroRecipe?.name}
              </h1>

              <p
                className="font-['Lato'] mb-6"
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "1.125rem",
                  lineHeight: "1.6",
                }}
              >
                {heroRecipe?.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--brand-primary)" }}
                  >
                    <Star
                      className="w-5 h-5"
                      style={{ color: "var(--bg-primary)" }}
                    />
                  </div>
                  <div>
                    <p
                      className="font-['Lato'] font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {heroRecipe?.rating}/5
                    </p>
                    <p
                      className="text-sm font-['Lato']"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {heroRecipe?.reviews} Reviews
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--brand-primary)" }}
                  >
                    <Clock
                      className="w-5 h-5"
                      style={{ color: "var(--bg-primary)" }}
                    />
                  </div>
                  <div>
                    <p
                      className="font-['Lato'] font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {heroRecipe?.prepTime} + {heroRecipe?.cookTime}
                    </p>
                    <p
                      className="text-sm font-['Lato']"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Total Time
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-success)" }}
                  >
                    <TrendingUp
                      className="w-5 h-5"
                      style={{ color: "var(--bg-primary)" }}
                    />
                  </div>
                  <div>
                    <p
                      className="font-['Lato'] font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {heroRecipe?.protein}g Protein
                    </p>
                    <p
                      className="text-sm font-['Lato']"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Per Serving
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => onRecipeClick(heroRecipe)}
                  className="group transition-transform duration-500 ease-[cubic-bezier(0.95,0.05,0.795,0.035)]"
                >
                  View Recipe
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200 ease-[cubic-bezier(0.95,0.05,0.795,0.035)]" />
                </Button>

                <Button onClick={onViewAllClick} variant="outline">
                  All Recipes
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div
                className="absolute inset-0 rounded-3xl blur-3xl opacity-30"
                style={{ backgroundColor: "var(--brand-primary)" }}
              />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={heroRecipe?.previewImage}
                  alt={heroRecipe?.name}
                  className="w-full aspect-square object-cover"
                />

                {/* Floating Info Card */}
                <div
                  className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl backdrop-blur-lg"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(255, 127, 0, 0.2)",
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p
                        className="font-['Lato'] text-sm"
                        style={{ color: "#666" }}
                      >
                        Calories
                      </p>
                      <p
                        className="font-['Poppins'] font-semibold"
                        style={{ color: "#333", fontSize: "1.25rem" }}
                      >
                        {heroRecipe?.calories}
                      </p>
                    </div>
                    <div>
                      <p
                        className="font-['Lato'] text-sm"
                        style={{ color: "#666" }}
                      >
                        Cuisine
                      </p>
                      <p
                        className="font-['Poppins'] font-semibold"
                        style={{ color: "#333", fontSize: "1.25rem" }}
                      >
                        {heroRecipe?.categories[0].label}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2
                className="font-['Poppins'] font-semibold mb-2"
                style={{
                  color: "var(--text-primary)",
                  fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                }}
              >
                Featured Recipes
              </h2>
              <p
                className="font-['Lato']"
                style={{ color: "var(--text-secondary)" }}
              >
                Our top 6 handpicked recipes for you
              </p>
            </div>

            <Button
              onClick={onViewAllClick}
              variant="ghost"
              className="hidden md:flex items-center gap-2 font-['Lato'] font-semibold"
              style={{ color: "var(--brand-primary)" }}
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={() => onRecipeClick(recipe)}
                featured
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Gallery Section */}
      <section
        className="py-16 px-4"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-['Poppins'] font-semibold mb-4"
              style={{
                color: "var(--text-primary)",
                fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              }}
            >
              Recipe Gallery
            </h2>
            <p
              className="font-['Lato']"
              style={{
                color: "var(--text-secondary)",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Explore our diverse collection of authentic Indian recipes
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recipes.length > 0 &&
              recipes
                .slice(0, 8)
                .map((item) => ({
                  query: { src: item.previewImage, alt: item.description },
                }))
                .map((query, idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-105"
                    onClick={onViewAllClick}
                  >
                    <ImageWithFallback
                      src={query.query.src}
                      alt={query.query.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
          </div>

          <div className="text-center mt-8">
            <Button
              onClick={onViewAllClick}
              className="rounded-full px-8 py-6 font-['Lato'] font-semibold"
              style={{
                backgroundColor: "var(--brand-primary)",
                color: "var(--bg-primary)",
              }}
            >
              Explore All Recipes
            </Button>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="font-['Poppins'] font-semibold mb-4"
              style={{
                color: "var(--text-primary)",
                fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
              }}
            >
              From Our Kitchen
            </h2>
            <p
              className="font-['Lato']"
              style={{ color: "var(--text-secondary)" }}
            >
              Tips, tricks, and stories from the culinary world
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "10 Essential Indian Spices",
                image:
                  "https://images.unsplash.com/photo-1596040033229-a0b4dc7f6ebd?w=800",
                excerpt:
                  "Discover the fundamental spices that form the backbone of Indian cuisine...",
              },
              {
                title: "Meal Prep for the Week",
                image:
                  "https://images.unsplash.com/photo-1665088127661-83aeff6104c4?w=800",
                excerpt:
                  "Learn how to efficiently prepare Indian meals for busy weekdays...",
              },
              {
                title: "Healthy Eating with Indian Food",
                image:
                  "https://images.unsplash.com/photo-1670164747721-d3500ef757a6?w=800",
                excerpt:
                  "Explore how traditional Indian cuisine can be part of a balanced diet...",
              },
            ].map((blog, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden cursor-pointer group"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="aspect-16/10 overflow-hidden">
                  <ImageWithFallback
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="font-['Poppins'] font-medium mb-2"
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "1.125rem",
                    }}
                  >
                    {blog.title}
                  </h3>
                  <p
                    className="font-['Lato'] mb-4"
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.875rem",
                    }}
                  >
                    {blog.excerpt}
                  </p>
                  <button
                    className="font-['Lato'] font-semibold flex items-center gap-2"
                    style={{ color: "var(--brand-primary)" }}
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;

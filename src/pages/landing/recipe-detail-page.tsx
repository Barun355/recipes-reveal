import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock,
  Flame,
  Star,
  Bookmark,
  Heart,
  Share2,
  ChefHat,
  Lightbulb,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import ImageWithFallback from "../../components/figma/ImageWithFallback";
import type { Recipes } from "@/types";
import { getRecipeById } from "@/services/appwrite";
import { scrollToTop } from "@/lib/utils";
import Feedback from "@/components/Feedback";

export function RecipeDetailPage() {
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [recipe, setRecipe] = useState<Recipes>();

  const { id } = useParams();
  const navigate = useNavigate();

  const relatedRecipes: Recipes[] = [];

  const totalPrice = recipe?.ingredients?.reduce(
    (sum, ing) => sum + ing.estimatedPrice,
    0
  );

  useEffect(() => {
    (async () => {
      if (!id) {
        navigate("/");
        return;
      }
      const recipeById = await getRecipeById(id);
      if (!recipeById) {
        navigate("/recipes");
      }
      console.log(recipeById);
      setRecipe(recipeById);
    })();
    scrollToTop();
  }, [id]);

  console.log("recipeDetail: ", recipe);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Header Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <ImageWithFallback
          src={recipe?.image}
          alt={recipe?.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

        {/* Back Button */}
        <Button
          onClick={() => window.history.back()}
          variant="ghost"
          className="absolute top-6 left-6 backdrop-blur-md"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "white",
          }}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-3">
          <Button
            onClick={() => setIsSaved(!isSaved)}
            variant="ghost"
            size="icon"
            className="rounded-full backdrop-blur-md bg-yellow-300/20"
            style={{
              color: isSaved ? "var(--brand-primary)" : "white",
            }}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? "fill-yellow-200" : ""}`} />
          </Button>
          <Button
            onClick={() => setIsLiked(!isLiked)}
            variant="ghost"
            size="icon"
            className="rounded-full backdrop-blur-md"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: isLiked ? "#EF4444" : "white",
            }}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full backdrop-blur-md"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
            }}
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Recipe Title and Meta */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <h1
              className="font-['Poppins'] font-semibold text-white mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              {recipe?.name}
            </h1>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-5 h-5" />
                <span className="font-['Lato']">Prep: {recipe?.prepTime}</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <ChefHat className="w-5 h-5" />
                <span className="font-['Lato']">Cook: {recipe?.cookTime}</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Flame className="w-5 h-5" />
                <span className="font-['Lato']">
                  {recipe?.calories} Calories
                </span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Star
                  className="w-5 h-5 fill-current"
                  style={{ color: "#FFB74D" }}
                />
                <span className="font-['Lato']">
                  {recipe?.rating} ({recipe?.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-[1fr_400px] gap-12">
          {/* Main Content */}
          <div className="space-y-12">
            {/* Description */}
            <section>
              <h2
                className="font-['Poppins'] font-semibold mb-4"
                style={{
                  color: "var(--text-primary)",
                  fontSize: "1.75rem",
                }}
              >
                About This Recipe
              </h2>
              <p
                className="font-['Lato']"
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "1.125rem",
                  lineHeight: "1.8",
                }}
              >
                {recipe?.description}
              </p>
            </section>

            {/* Ingredients */}
            <section>
              <h2
                className="font-['Poppins'] font-semibold mb-4"
                style={{
                  color: "var(--text-primary)",
                  fontSize: "1.75rem",
                }}
              >
                Ingredients
              </h2>
              <div
                className="rounded-xl p-6"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="space-y-4">
                  {recipe?.ingredients?.map((ingredient, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between gap-4 pb-4"
                      style={{
                        borderBottom:
                          idx < recipe?.ingredients?.length - 1
                            ? "1px solid var(--border)"
                            : "none",
                      }}
                    >
                      <div className="flex-1">
                        <p
                          className="font-['Lato'] font-semibold mb-1"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {idx + 1}. {ingredient.name}
                        </p>
                        <p
                          className="font-['Lato'] text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Quantity: {ingredient.quantity} | Price Range:{" "}
                          {ingredient.priceRange}
                        </p>
                      </div>
                      <p
                        className="font-['Poppins'] font-semibold"
                        style={{ color: "var(--brand-primary)" }}
                      >
                        ≈ ₹{ingredient.estimatedPrice}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-6 pt-6 flex justify-between items-center"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <p
                    className="font-['Poppins'] font-semibold"
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "1.125rem",
                    }}
                  >
                    Estimated Total Cost
                  </p>
                  <p
                    className="font-['Poppins'] font-semibold"
                    style={{
                      color: "var(--brand-primary)",
                      fontSize: "1.5rem",
                    }}
                  >
                    ₹{totalPrice}
                  </p>
                </div>
              </div>
            </section>

            {/* Pre Cooking Process */}
            <section>
              <h2
                className="font-['Poppins'] font-semibold mb-4"
                style={{
                  color: "var(--text-primary)",
                  fontSize: "1.75rem",
                }}
              >
                Pre-Cooking Process
              </h2>
              <div
                className="rounded-xl p-6"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <ol className="space-y-3">
                  {recipe?.preCookingProcess?.map((step, idx) => (
                    <li key={idx} className="flex gap-4">
                      <span
                        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-semibold"
                        style={{
                          backgroundColor: "var(--brand-primary)",
                          color: "var(--bg-primary)",
                        }}
                      >
                        {idx + 1}
                      </span>
                      <p
                        className="font-['Lato'] pt-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* Cooking Process */}
            <section>
              <h2
                className="font-['Poppins'] font-semibold mb-4"
                style={{
                  color: "var(--text-primary)",
                  fontSize: "1.75rem",
                }}
              >
                Cooking Process
              </h2>
              <div className="rounded-xl p-6 border border-border bg-card">
                <div className="space-y-6">
                  {recipe?.cookingProcess &&
                    Object.entries(recipe?.cookingProcess).map(
                      ([subProcess, steps], subIdx) => (
                        <div key={subIdx}>
                          <h3
                            className="font-['Poppins'] font-semibold mb-3"
                            style={{
                              color: "var(--text-primary)",
                              fontSize: "1.25rem",
                            }}
                          >
                            {subProcess}
                          </h3>
                          <ol className="space-y-4">
                            {steps.map((step: string, stepIdx: number) => (
                              <li key={stepIdx} className="flex gap-4">
                                <span
                                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-semibold"
                                  style={{
                                    backgroundColor: "var(--brand-primary)",
                                    color: "var(--bg-primary)",
                                  }}
                                >
                                  {stepIdx + 1}
                                </span>
                                <p
                                  className="font-['Lato'] pt-1"
                                  style={{ color: "var(--text-primary)" }}
                                >
                                  {step}
                                </p>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )
                    )}
                </div>
              </div>
            </section>

            {/* Post Cooking Process */}
            <section>
              <h2
                className="font-['Poppins'] font-semibold mb-4"
                style={{
                  color: "var(--text-primary)",
                  fontSize: "1.75rem",
                }}
              >
                Post-Cooking Process
              </h2>
              <div
                className="rounded-xl p-6"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <ol className="space-y-3">
                  {recipe?.postCookingProcess &&
                    recipe.postCookingProcess.map((step, idx) => (
                      <li key={idx} className="flex gap-4">
                        <span
                          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-semibold"
                          style={{
                            backgroundColor: "var(--brand-primary)",
                            color: "var(--bg-primary)",
                          }}
                        >
                          {idx + 1}
                        </span>
                        <p
                          className="font-['Lato'] pt-1"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {step}
                        </p>
                      </li>
                    ))}
                </ol>
              </div>
            </section>
            {/* Serving Suggestion */}
            <section>
              <h2
                className="font-['Poppins'] font-semibold mb-4"
                style={{
                  color: "var(--text-primary)",
                  fontSize: "1.75rem",
                }}
              >
                Serving Suggestions
              </h2>
              <div
                className="rounded-xl p-6"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <ol className="space-y-3">
                  {recipe?.servingSuggestions?.map((step, idx) => (
                    <li key={idx} className="flex gap-4">
                      <span
                        className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-['Poppins'] font-semibold"
                        style={{
                          backgroundColor: "var(--brand-primary)",
                          color: "var(--bg-primary)",
                        }}
                      >
                        {idx + 1}
                      </span>
                      <p
                        className="font-['Lato'] pt-1"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {/* Tips & Tricks */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb
                  className="w-6 h-6"
                  style={{ color: "var(--brand-primary)" }}
                />
                <h2
                  className="font-['Poppins'] font-semibold"
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "1.75rem",
                  }}
                >
                  Tips & Tricks
                </h2>
              </div>
              <div
                className="rounded-xl p-6"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: `1px solid var(--brand-primary)`,
                }}
              >
                <ul className="space-y-3">
                  {recipe?.tipsAndTricks &&
                    recipe.tipsAndTricks.map((tip, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span style={{ color: "var(--brand-primary)" }}>•</span>
                        <p
                          className="font-['Lato']"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {tip}
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
            </section>

            {/* Feedback Section */}
            <Feedback />
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Nutrition Classification */}
            <div
              className="rounded-xl p-6"
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <h3
                className="font-['Poppins'] font-semibold mb-4"
                style={{
                  color: "var(--text-primary)",
                  fontSize: "1.25rem",
                }}
              >
                Nutrition Classification
              </h3>

              <div className="space-y-3">
                {recipe?.nutritionClassification &&
                  Object.entries(recipe.nutritionClassification).map(
                    ([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between items-center mb-1">
                          <span
                            className="font-['Lato'] capitalize"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {key}
                          </span>
                          <span
                            className="font-['Lato'] font-semibold"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {value}
                          </span>
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>

            {/* Related Recipes */}
            {relatedRecipes?.length > 0 && (
              <div>
                <h3
                  className="font-['Poppins'] font-semibold mb-4"
                  style={{
                    color: "var(--text-primary)",
                    fontSize: "1.25rem",
                  }}
                >
                  People Also View
                </h3>

                <div className="space-y-4">
                  {relatedRecipes &&
                    relatedRecipes.map((relatedRecipe) => (
                      <div
                        key={relatedRecipe.id}
                        onClick={() => navigate(`/recipes/${relatedRecipe.id}`)}
                        className="cursor-pointer rounded-xl overflow-hidden transition-all hover:shadow-lg"
                        style={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <div className="aspect-square overflow-hidden">
                          <ImageWithFallback
                            src={relatedRecipe?.previewImage}
                            alt={relatedRecipe?.name}
                            className="w-full h-full object-cover transition-transform hover:scale-110"
                          />
                        </div>
                        <div className="p-4">
                          <p
                            className="font-['Poppins'] font-medium mb-1"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {relatedRecipe.name}
                          </p>
                          <div className="flex items-center gap-2">
                            <Star
                              className="w-3 h-3 fill-current"
                              style={{ color: "#FFB74D" }}
                            />
                            <span
                              className="text-sm font-['Lato']"
                              style={{ color: "var(--text-secondary)" }}
                            >
                              {relatedRecipe.rating} • {relatedRecipe.categories[0].label}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

import { MessageSquare, Star } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { Button } from "./ui/button";

interface FeedbackPropInterface {
  userId?: string;
  recipeId?: string;
}

const Feedback = ({ userId, recipeId }: FeedbackPropInterface) => {

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  function onSubmit() {
    if (userId && userId){
        console.log("Feedback: ", {userId, recipeId, rating, feedback})
    }
  }

  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <MessageSquare
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
          Feedback
        </h2>
      </div>
      <div
        className="rounded-xl p-6"
        style={{
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
        }}
      >
        <p
          className="font-['Lato'] mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          How would you rate it?
        </p>

        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${rating >= star ? "fill-current" : ""}`}
                style={{
                  color: rating >= star ? "#FFB74D" : "var(--text-secondary)",
                }}
              />
            </button>
          ))}
        </div>

        <Textarea
          placeholder="Did you like this recipe?"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="mb-4 font-['Lato']"
          rows={4}
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border)",
            color: "var(--text-primary)",
          }}
        />

        <Button className="rounded-full px-6 font-['Lato'] font-semibold" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </section>
  );
};

export default Feedback;

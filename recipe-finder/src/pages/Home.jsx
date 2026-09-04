import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard.jsx";
import { getRandomMeals, searchMeals } from "../api.js";
import "./Home.css";

export default function Home() {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [heading, setHeading] = useState("Today's picks");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    getRandomMeals(6)
      .then((result) => {
        if (cancelled) return;
        setMeals(result);
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setStatus("loading");
    setHeading(`Results for "${q}"`);
    try {
      const result = await searchMeals(q);
      setMeals(result);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  };

  const handleSurprise = async () => {
    setStatus("loading");
    setHeading("Today's picks");
    setQuery("");
    try {
      const result = await getRandomMeals(6);
      setMeals(result);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <p className="hero-eyebrow">What's in the pantry?</p>
        <h1>Find something worth cooking tonight.</h1>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a dish — pasta, chicken curry, tacos…"
            aria-label="Search recipes"
          />
          <button type="submit">Search</button>
        </form>
        <button className="surprise-btn" type="button" onClick={handleSurprise}>
          Surprise me instead
        </button>
      </section>

      <section className="results">
        <h2>{heading}</h2>

        {status === "loading" && <p className="status-msg">Looking through the cookbook…</p>}

        {status === "error" && (
          <p className="status-msg error">
            Couldn't reach the recipe database. Check your connection and try again.
          </p>
        )}

        {status === "ready" && meals.length === 0 && (
          <p className="status-msg">No recipes matched that search. Try another ingredient or dish.</p>
        )}

        {status === "ready" && meals.length > 0 && (
          <div className="recipe-grid">
            {meals.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

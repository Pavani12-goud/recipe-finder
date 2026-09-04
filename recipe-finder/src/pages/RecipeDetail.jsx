import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { extractIngredients, getMealById } from "../api.js";
import "./RecipeDetail.css";

export default function RecipeDetail() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    getMealById(id)
      .then((result) => {
        if (cancelled) return;
        setMeal(result);
        setStatus(result ? "ready" : "not-found");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (status === "loading") {
    return <p className="status-msg">Fetching the recipe…</p>;
  }

  if (status === "error") {
    return <p className="status-msg error">Couldn't load this recipe. Try again shortly.</p>;
  }

  if (status === "not-found" || !meal) {
    return (
      <div>
        <p className="status-msg">That recipe doesn't exist.</p>
        <Link className="back-link" to="/">
          ← Back to search
        </Link>
      </div>
    );
  }

  const ingredients = extractIngredients(meal);

  return (
    <article className="recipe-detail">
      <Link className="back-link" to="/">
        ← Back to search
      </Link>

      <div className="detail-hero">
        <img src={`${meal.strMealThumb}/large`} alt={meal.strMeal} />
        <div>
          <p className="detail-tag">
            {meal.strArea ? `${meal.strArea} · ` : ""}
            {meal.strCategory}
          </p>
          <h1>{meal.strMeal}</h1>
        </div>
      </div>

      <div className="detail-body">
        <section className="ingredients">
          <h2>Ingredients</h2>
          <ul>
            {ingredients.map((item, i) => (
              <li key={i}>
                <span className="measure">{item.measure}</span> {item.name}
              </li>
            ))}
          </ul>
        </section>

        <section className="instructions">
          <h2>Method</h2>
          {meal.strInstructions
            .split(/\r?\n+/)
            .filter((line) => line.trim())
            .map((line, i) => (
              <p key={i}>{line.trim()}</p>
            ))}
        </section>
      </div>
    </article>
  );
}

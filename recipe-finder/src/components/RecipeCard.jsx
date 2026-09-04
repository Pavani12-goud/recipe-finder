import { Link } from "react-router-dom";
import "./RecipeCard.css";

export default function RecipeCard({ meal }) {
  return (
    <Link to={`/recipe/${meal.idMeal}`} className="recipe-card">
      <div className="recipe-card-image">
        <img src={`${meal.strMealThumb}/medium`} alt={meal.strMeal} loading="lazy" />
      </div>
      <div className="recipe-card-body">
        <p className="recipe-card-tag">
          {meal.strArea ? `${meal.strArea} · ` : ""}
          {meal.strCategory || "Recipe"}
        </p>
        <h3>{meal.strMeal}</h3>
      </div>
    </Link>
  );
}

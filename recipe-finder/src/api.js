const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function searchMeals(query) {
  const res = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Search request failed");
  const data = await res.json();
  return data.meals || [];
}

export async function getRandomMeals(count = 6) {
  const requests = Array.from({ length: count }, () =>
    fetch(`${BASE_URL}/random.php`).then((res) => {
      if (!res.ok) throw new Error("Random request failed");
      return res.json();
    })
  );
  const results = await Promise.all(requests);
  const seen = new Set();
  const meals = [];
  results.forEach((r) => {
    const meal = r.meals && r.meals[0];
    if (meal && !seen.has(meal.idMeal)) {
      seen.add(meal.idMeal);
      meals.push(meal);
    }
  });
  return meals;
}

export async function getMealById(id) {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error("Lookup request failed");
  const data = await res.json();
  return (data.meals && data.meals[0]) || null;
}

export function extractIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i += 1) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }
  return ingredients;
}

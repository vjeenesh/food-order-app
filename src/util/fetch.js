export function fetchMeals() {
  return new Promise((resolve) => {
    const res = fetch("http://localhost:3000/meals");
    resolve(res);
  });
}

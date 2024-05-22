import MealItem from "./MealItem";
import useHTTP from "../hooks/useHTTP";
import Error from "./Error";

const requestConfig = {};

export default function Meals() {
  const { isLoading, data, error } = useHTTP(
    "http://localhost:3000/meals",
    requestConfig,
    []
  );

  if (isLoading) {
    return (
      <div id="meals">
        <h3 className="center">Loading meals for you...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <Error
        title="Failed to fetch meals"
        message={error.message || "Something went wrong."}
      />
    );
  }

  return (
    <ul id="meals">
      {data
        ? data.map((mealItem) => {
            return <MealItem key={mealItem.id} mealItem={mealItem} />;
          })
        : "No Meals Found."}
    </ul>
  );
}

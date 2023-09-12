import { useState, useEffect, useCallback } from "react";
import Card from "../UI/Card/Card";
import MealItem from "./MealItem/MealItem";
import styles from "./AvailableMeals.module.css";
import useHttp from "../../hooks/useHttp";

const MEALS_URL =
  "https://project01-2a44c-default-rtdb.europe-west1.firebasedatabase.app/meals.json";

const AvailableMeals = () => {
  const { sendRequest, isLoading, error } = useHttp();
  const [meals, setMeals] = useState([]);

  const getMeals = useCallback((dataMeals) => {
    const mealsValues = Object.keys(dataMeals).map((key) => ({
      ...dataMeals[key],
      id: key,
    }));
    setMeals(mealsValues);
  }, []);

  useEffect(() => {
    sendRequest({ url: MEALS_URL }, getMeals);
  }, []);

  if (isLoading) {
    return (
      <section>
        <div className={styles.loading}>
          <p>Loading....</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.meals}>
      <Card>
        <ul>
          {meals.length === 0
            ? null
            : meals.map((meal) => <MealItem meal={meal} key={meal.id} />)}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

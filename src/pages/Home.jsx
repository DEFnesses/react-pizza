import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import pizzas from "../assets/pizzas.json";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });

  React.useEffect(() => {
    setIsLoading(true);
    const filteredPizzas = categoryId
      ? pizzas.filter((obj) => Number(obj.category) === Number(categoryId))
      : pizzas;

    const sortedPizzas = [...filteredPizzas].sort((a, b) => {
      switch (sortType.sortProperty) {
        case 'rating':
          return Number(b.rating) - Number(a.rating); // по убыванию
        case 'price':
          return Number(b.price) - Number(a.price); // по цене
        case 'title':
            return a.title.localeCompare(b.title, 'ru', { sensitivity: 'base' }); // по алфавиту
        default:
          return 0;
      }
    });

    setItems(sortedPizzas);
    setIsLoading(false);
    
    console.log('sortProperty:', sortType.sortProperty);

    window.scrollTo(0, 0);
  }, [categoryId,sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => setCategoryId(i)}
        />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      <div></div>

      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;

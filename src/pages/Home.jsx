import React from "react";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort, { sortList } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import pizzas from "../assets/pizzas.json";
import Pagination from "../components/Pagination";
import { AppContext } from "../App";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  const { searchValue } = React.useContext(AppContext);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const filteredBySearch = items.filter((obj) =>
    obj.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredBySearch.length / itemsPerPage);

  const things = filteredBySearch
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
    }
  }, []);

  React.useEffect(() => {
    setIsLoading(true);

    const filteredPizzas = categoryId
      ? pizzas.filter((obj) => Number(obj.category) === Number(categoryId))
      : pizzas;

    const sortedPizzas = [...filteredPizzas].sort((a, b) => {
      switch (sort.sortProperty) {
        case "rating":
          return Number(b.rating) - Number(a.rating);
        case "price":
          return Number(b.price) - Number(a.price);
        case "title":
          return a.title.localeCompare(b.title, "ru", { sensitivity: "base" }); // по алфавиту
        default:
          return 0;
      }
    });

    setItems(sortedPizzas);
    setIsLoading(false);

    dispatch(setCurrentPage(1));

    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, dispatch]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      dispatch,
    });

    navigate(`?${queryString}`);
  }, [categoryId, sort.sortProperty, searchValue, dispatch]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      <div></div>

      <div className="content__items">{isLoading ? skeletons : things}</div>
      <Pagination
        currentPage={currentPage}
        pageCount={totalPages}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default Home;

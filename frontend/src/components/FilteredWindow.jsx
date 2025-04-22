import React, { useEffect, useState, useContext } from "react";
import { getCategories } from "../api/сategories";
import { getSubCategories } from "../api/subcategories";
import { getStatuses } from "../api/statuses";
import { getTransactionTypes } from "../api/transactionsType";
import styles from "../styles/filteredWindow.module.scss";
import { FilteredValuesContext } from "../../context/FilteredValuesContext";

const FilteredWindow = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [transactionTypes, setTransactionTypes] = useState([]);
  const {choosenFilters, setChosenFilters} = useContext(FilteredValuesContext);

  const toggleWindow = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    getCategories().then(setCategories);
    getSubCategories().then(setSubCategories);
    getStatuses().then(setStatuses);
    getTransactionTypes().then(setTransactionTypes);
  }, []);

  function handleClickFilter(filterType, itemName) {
    const newFilters = [...choosenFilters];
    const existingFilter = newFilters.find((filter) => filter[filterType]);

    if (existingFilter) {
      if (existingFilter[filterType].includes(itemName)) {
        // Если фильтр уже выбран, удаляем его
        existingFilter[filterType] = existingFilter[filterType].filter(
          (name) => name !== itemName
        );
      } else {
        // Если фильтра нет, добавляем его
        existingFilter[filterType] = [...existingFilter[filterType], itemName];
      }
    } else {
      // Если фильтра для этого типа нет, создаем новый
      newFilters.push({ [filterType]: [itemName] });
    }

    setChosenFilters(newFilters); // Обновляем состояние
    console.log(`choosenFilters: `)
    console.log(newFilters)
  }


//   function handleClickFilterSubCategory(filterType, item) {
//     const newFilters = [...choosenFilters];
//     const existingFilterSubCat = newFilters.find((filter) => filter[filterType]);

//     if (existingFilter) {
//       if (existingFilter[filterType].includes(item.name)) {
//         // Если фильтр уже выбран, удаляем его
//         existingFilter[filterType] = existingFilter[filterType].filter(
//           (name) => name !== item.name
//         );
//         existingFilter["categories"] = existingFilter["categories"].filter(
//             (name) => name !== item.category
//           );
//       } else {
//         // Если фильтра нет, добавляем его
//         existingFilter[filterType] = [...existingFilter[filterType], item.name];
//       }
//     } else {
//       // Если фильтра для этого типа нет, создаем новый
//     // тут можно написать, что если добавили все саб категории из категории, то выделяем категорию
//       newFilters.push({ [filterType]: [item.name] });
//     }

//     setChosenFilters(newFilters); // Обновляем состояние
//     console.log(choosenFilters)
//   }

  // Функция для проверки, выбран ли элемент
  const isSelected = (filterType, itemName) => {
    const filter = choosenFilters.find((filter) => filter[filterType]);
    console.log(`!!!!!isSelected ${itemName} ${filter} ${filter && filter[filterType].includes(itemName)}`)
    return filter && filter[filterType].includes(itemName);
  };

  return (
    <div>
      <button onClick={toggleWindow}>Открыть окно</button>

      {isVisible && (
        <div className={styles.overlayStyles}>
          <div className={styles.windowStyles}>
            <div className={styles.container}>
              <p>Фильтровать по: </p>

              <p>Категории</p>
              <div className={styles.filterValues}>
                {categories.map((item) => (
                  <div
                    key={item.name}
                    className={`${styles.filterValue} ${isSelected("categories", item.name) ? styles.filterValueChecked : styles.filterValue}`}
                    onClick={() => handleClickFilter("categories", item.name)}
                  >
                    <p className={styles.filterValueText}>{item.name}</p>
                  </div>
                ))}
              </div>

              <p>Подкатегории</p>
              <div className={styles.filterValues}>
                {subCategories.map((item) => (
                  <div
                    key={item.name}
                    className={`${styles.filterValue} ${isSelected("subcategories", item.name) ? styles.filterValueChecked : ""}`}
                    onClick={() => handleClickFilter("subcategories", item.name)}
                  >
                    <p className={styles.filterValueText}>{item.name}</p>
                  </div>
                ))}
              </div>

              <p>Статусы</p>
              <div className={styles.filterValues}>
                {statuses.map((item) => (
                  <div
                    key={item.name}
                    className={`${styles.filterValue} ${isSelected("statuses", item.name) ? styles.filterValueChecked : ""}`}
                    onClick={() => handleClickFilter("statuses", item.name)}
                  >
                    <p className={styles.filterValueText}>{item.name}</p>
                  </div>
                ))}
              </div>

              <p>Типы операции</p>
              <div className={styles.filterValues}>
                {transactionTypes.map((item) => (
                  <div
                    key={item.name}
                    className={`${styles.filterValue} ${isSelected("transactionTypes", item.name) ? styles.filterValueChecked : ""}`}
                    onClick={() => handleClickFilter("transactionTypes", item.name)}
                  >
                    <p className={styles.filterValueText}>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={toggleWindow}>Закрыть окно</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilteredWindow;

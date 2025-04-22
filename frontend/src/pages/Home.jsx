// import React from 'react';

// export default function Home() {
//   return (
//     <div>
//       <h1>Добро пожаловать в приложение для управления финансами!</h1>
//     </div>
//   );
// }

import React, { useState } from 'react';
import TransactionsTable from '../components/TransactionsTable';
import FilteredWindow from '../components/FilteredWindow';

const TableWithFilter = () => {
  // Пример данных
  const data = [
    { id: 1, name: 'John', age: 28, city: 'New York' },
    { id: 2, name: 'Jane', age: 32, city: 'Los Angeles' },
    { id: 3, name: 'Peter', age: 22, city: 'Chicago' },
    { id: 4, name: 'Mary', age: 24, city: 'Miami' },
  ];

  // Состояния для фильтров
  const [filters, setFilters] = useState({ name: '', age: '', city: '' });

  // Функция фильтрации данных
  const filteredData = data.filter(item => {
    return (
      (filters.name === '' || item.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.age === '' || item.age === parseInt(filters.age)) &&
      (filters.city === '' || item.city.toLowerCase().includes(filters.city.toLowerCase()))
    );
  });

  // Функция для обновления состояния фильтров
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div>
      {/* Фильтры */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Фильтр по имени"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Фильтр по возрасту"
          value={filters.age}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="city"
          placeholder="Фильтр по городу"
          value={filters.city}
          onChange={handleFilterChange}
        />
      </div>
      <FilteredWindow></FilteredWindow>
      <TransactionsTable></TransactionsTable>

      {/* Таблица */}
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Город</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithFilter;

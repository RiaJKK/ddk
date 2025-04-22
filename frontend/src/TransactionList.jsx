import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);  // Состояние для хранения списка транзакций
  const [loading, setLoading] = useState(true);  // Состояние загрузки
  const [error, setError] = useState(null);  // Состояние для ошибки

  // Функция для получения транзакций с API
  const getTransactions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/transactions/');
      setTransactions(response.data);  // Записываем данные в состояние
      setLoading(false);  // Убираем состояние загрузки
    } catch (error) {
      setError('Ошибка при загрузке данных');  // Устанавливаем ошибку
      setLoading(false);  // Убираем состояние загрузки
    }
  };

  // Используем useEffect для получения данных при монтировании компонента
  useEffect(() => {
    getTransactions();
  }, []);  // Пустой массив означает, что вызов будет только при монтировании компонента

  if (loading) {
    return <div>Загрузка...</div>;  // Пока данные загружаются, показываем "Загрузка..."
  }

  if (error) {
    return <div>{error}</div>;  // Если произошла ошибка, отображаем сообщение об ошибке
  }

  return (
    <div>
      <h2>Список транзакций</h2>
      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Статус</th>
            <th>Тип</th>
            <th>Категория</th>
            <th>Сумма</th>
            <th>Комментарий</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.created}</td>
              <td>{transaction.status}</td>
              <td>{transaction.type}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount} ₽</td>
              <td>{transaction.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsList;
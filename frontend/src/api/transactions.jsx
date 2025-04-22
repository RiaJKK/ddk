import axios from 'axios';
import {transactoinsApi } from '../consts';

const getTransactions = async () => {
    const response = await axios.get(transactoinsApi);
    console.log(response.data);  // Для отладки
    return response.data;       // Убедись, что это массив
  };

export {getTransactions}
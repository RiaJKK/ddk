import axios from 'axios';
import { transactiontypesApi } from '../consts';

const getTransactionTypes = async () => {
    const response = await axios.get(transactiontypesApi);
    console.log(response.data);  // Для отладки
    return response.data;       // Убедись, что это массив
  };

export {getTransactionTypes}
import axios from 'axios';
import { statusesApi } from '../consts';

const getStatuses = async () => {
    const response = await axios.get(statusesApi);
    console.log(response.data);  // Для отладки
    return response.data;       // Убедись, что это массив
  };

export {getStatuses}
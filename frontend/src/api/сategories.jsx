import axios from 'axios';
import { categoriesApi } from '../consts';

const getCategories = async () => {
    const response = await axios.get(categoriesApi);
    console.log(response.data);  // Для отладки
    return response.data;       // Убедись, что это массив
  };

export {getCategories}
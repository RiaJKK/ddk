import axios from 'axios';
import { subcategoriesApi } from '../consts';

const getSubCategories = async () => {
    const response = await axios.get(subcategoriesApi);
    console.log(response.data);  // Для отладки
    return response.data;       // Убедись, что это массив
  };

export {getSubCategories}
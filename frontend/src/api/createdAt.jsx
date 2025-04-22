import axios from 'axios';
import { link_server } from '../consts';

const getCreatedAt = async () => {
    const response = await axios.get(link_server);
    console.log(response.data);  // Для отладки
    return response.data;       // Убедись, что это массив
  };

export {getCreatedAt}
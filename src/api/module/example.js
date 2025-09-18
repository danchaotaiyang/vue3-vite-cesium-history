import { $http } from '@/assets/js/axios.js';

export const example = (data) => $http.post('', data);

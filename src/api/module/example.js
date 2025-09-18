import { $http } from '@/asset/js/axios.js';

export const example = (data) => $http.post('', data);

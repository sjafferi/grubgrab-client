import { get } from './api';
import { API_HOST } from 'consts';

export function fetchRestaurants(payload?: any) {
  return get(`${API_HOST}/restaurants/all`);
}
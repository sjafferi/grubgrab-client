import { postData } from './api';
import { API_HOST } from 'consts';

export function login(payload: any) {
  return postData(`${API_HOST}/users/login`, payload);
}

export function signup(payload: any) {
  return postData(`${API_HOST}/users/signup`, payload);
}
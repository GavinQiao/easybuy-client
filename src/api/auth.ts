// src/api/auth.ts
import axios from 'axios';

const BASE = 'http://localhost:3000/auth';

export const register = (username: string, password: string) =>
  axios.post(`${BASE}/register`, { username, password });

export const login = (username: string, password: string) =>
  axios.post(`${BASE}/login`, { username, password });

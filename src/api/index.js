/** 
 * Functions to talk to the backend; they return promises so that
 * redux-saga can wait on them
 */
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export function fetchMemoList() {
  return client.get('/memo');
}

export function fetchMemo(id) {
  return client.get(`/memo/${id}`);
}
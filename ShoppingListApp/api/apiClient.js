import axios from 'axios';

// Konfiguracja klienta API
const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // Adres URL Twojego backendu
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

import apiClient from './apiClient';

// Funkcja do pobierania listy produktów
export const getProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    return response.data;
  } catch (error) {
    console.error('Błąd podczas pobierania produktów:', error);
    throw error;
  }
};

// Funkcja do dodawania nowego produktu
export const addProduct = async (product) => {
  try {
    const response = await apiClient.post('/products', product);
    return response.data;
  } catch (error) {
    console.error('Błąd podczas dodawania produktu:', error);
    throw error;
  }
};

// Funkcja do aktualizacji produktu
export const updateProduct = async (productId, updatedProduct) => {
  try {
    const response = await apiClient.put(`/products/${productId}`, updatedProduct);
    return response.data;
  } catch (error) {
    console.error('Błąd podczas aktualizacji produktu:', error);
    throw error;
  }
};

// Funkcja do usuwania produktu
export const deleteProduct = async (productId) => {
  try {
    await apiClient.delete(`/products/${productId}`);
  } catch (error) {
    console.error('Błąd podczas usuwania produktu:', error);
    throw error;
  }
};

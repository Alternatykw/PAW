import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  Platform,
} from 'react-native';

import { getProducts, addProduct, updateProduct, deleteProduct } from './api/productsApi';

const App = () => {
  const [products, setProducts] = useState([]); 
  const [newProduct, setNewProduct] = useState(''); 
  const [quantity, setQuantity] = useState(''); 
  const [price, setPrice] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [isModalVisible, setModalVisible] = useState(false); 
  const [currentProduct, setCurrentProduct] = useState(null); 
  const [updatedQuantity, setUpdatedQuantity] = useState(''); 
  const [updatedPrice, setUpdatedPrice] = useState(''); 
  const [updatedDescription, setUpdatedDescription] = useState(''); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (!newProduct || !quantity || !price || !description) {
      if (Platform.OS === 'web') {
        window.alert('Wypełnij wszystkie pola!');
      } else {
        Alert.alert('Error', 'Wypełnij wszystkie pola!');
      }
      return;
    }

    try {
      const product = {
        name: newProduct,
        quantity: parseInt(quantity, 10),
        price: parseFloat(price),
        description: description,
      };
      const addedProduct = await addProduct(product);
      setProducts((prev) => [...prev, addedProduct]);
      setNewProduct('');
      setQuantity('');
      setPrice('');
      setDescription('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateProduct = async (id, updatedData) => {
    try {
      const updatedProduct = await updateProduct(id, updatedData);
      setProducts((prev) =>
        prev.map((product) => (product.id === id ? updatedProduct : product))
      );
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleEditProduct = (item) => {
    setCurrentProduct(item);
    setUpdatedQuantity(item.quantity.toString());
    setUpdatedPrice(item.price.toString());
    setUpdatedDescription(item.description);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <View style={styles.productRow}>
        <View style={styles.productDetail}>
          <Text style={styles.productLabel}>Nazwa:</Text>
          <Text style={styles.productText}>{item.name}</Text>
        </View>
        <View style={styles.productDetail}>
          <Text style={styles.productLabel}>Opis:</Text>
          <Text style={styles.productText}>{item.description}</Text>
        </View>
        <View style={styles.productDetail}>
          <Text style={styles.productLabel}>Ilość:</Text>
          <Text style={styles.productText}>{item.quantity}</Text>
        </View>
        <View style={styles.productDetail}>
          <Text style={styles.productLabel}>Cena za szt:</Text>
          <Text style={styles.productText}>{item.price} zł</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleEditProduct(item)}
        >
          <Text style={styles.buttonText}>Edytuj</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteProduct(item.id)}
        >
          <Text style={styles.buttonText}>Usuń</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista Zakupów</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No products in the list</Text>}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nazwa produktu"
          value={newProduct}
          onChangeText={setNewProduct}
        />
        <TextInput
          style={styles.input}
          placeholder="Opis"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Ilość"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Cena za szt."
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
          <Text style={styles.buttonText}>Dodaj</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edytuj produkt: {currentProduct?.name}</Text>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Opis:</Text>
              <TextInput
                style={styles.modalInput}
                value={updatedDescription}
                onChangeText={setUpdatedDescription}
              />
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Ilość:</Text>
              <TextInput
                style={styles.modalInput}
                value={updatedQuantity}
                onChangeText={setUpdatedQuantity}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Cena:</Text>
              <TextInput
                style={styles.modalInput}
                value={updatedPrice}
                onChangeText={setUpdatedPrice}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.addButton]}
                onPress={() => {
                  const updatedData = {
                    quantity: parseInt(updatedQuantity, 10),
                    price: parseFloat(updatedPrice),
                    description: updatedDescription,
                  };
                  handleUpdateProduct(currentProduct.id, updatedData);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.buttonText}>Zapisz</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Anuluj</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  productItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  productRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10,
  },
  productLabel: {
    width: 90, 
    fontSize: 16,
    fontWeight: 'bold',
  },
  productText: {
    fontSize: 16,
    marginRight: 10, 
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  actionButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    width: 350,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalRow: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  modalLabel: {
    fontSize: 18,
    width: 80,
    marginRight: 15,
    fontWeight: 'bold',
  },
  modalInput: {
    flex: 1,
    height: 45,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default App;

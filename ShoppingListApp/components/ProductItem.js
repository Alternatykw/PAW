import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const ProductItem = ({ product, onRemove, onEdit }) => {
  return (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.quantity}>Ilość/Waga: {product.quantity}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(product.id)} style={styles.editButton}>
          <Text style={styles.buttonText}>Edytuj</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onRemove(product.id)} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Usuń</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 14,
    color: "#666",
  },
  actions: {
    flexDirection: "row",
  },
  editButton: {
    marginRight: 10,
    backgroundColor: "#4CAF50",
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default ProductItem;

'use strict';


/**
 * Add a new product to the list
 *
 * body Product 
 * no response value expected for this operation
 **/
exports.addProduct = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete a product by ID
 *
 * productId String 
 * no response value expected for this operation
 **/
exports.deleteProduct = function(productId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get all products
 *
 * returns List
 **/
exports.getAllProducts = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "quantity" : 6,
  "price" : 0.8008282,
  "name" : "name",
  "description" : "description",
  "id" : "id"
}, {
  "quantity" : 6,
  "price" : 0.8008282,
  "name" : "name",
  "description" : "description",
  "id" : "id"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get a single product by ID
 *
 * productId String 
 * returns Product
 **/
exports.getProductById = function(productId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "quantity" : 6,
  "price" : 0.8008282,
  "name" : "name",
  "description" : "description",
  "id" : "id"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update a product by ID
 *
 * body Product 
 * productId String 
 * no response value expected for this operation
 **/
exports.updateProduct = function(body,productId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


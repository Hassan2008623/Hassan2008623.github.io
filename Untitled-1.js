// Define an object to hold the product data
var products = {
	1: {
		name: 'Product 1',
		description: 'Description of Product 1',
		image: 'product1.jpg',
		price: 10.99
	},
	2: {
		name: 'Product 2',
		description: 'Description of Product 2',
		image: 'product2.jpg',
		price: 19.99
	},
	3: {
		name: 'Product 3',
		description: 'Description of Product 3',
		image: 'product3.jpg',
		price: 7.99
	}
};

// Define an array to hold the cart items
var cartItems = [];

// Get all the "Add to Cart" buttons
var addToCartButtons = document.querySelectorAll('.add-to-cart');

// Loop through the buttons and add a click event listener to each one
for (var i = 0; i < addToCartButtons.length; i++) {
	addToCartButtons[i].addEventListener('click', function(event) {
		// Get the product ID from the data-product-id attribute
		var productId = event.target.getAttribute('data-product-id');
		
		// Add the product to the cart
		addToCart(productId);
	});
}

// Function to add a product to the cart
function addToCart(productId) {
	// Check if the product is already in the cart
	var cartItem = getCartItem(productId);
	
	if (cartItem) {
		// If the product is already in the cart, increase the quantity
		cartItem.quantity++;
	} else {
		// If the product is not in the cart, add it
		cartItem = {
			product: products[productId],
			quantity: 1
		};
		cartItems.push(cartItem);
	}
	
	// Update the cart display
	updateCartDisplay();
}

// Function to get a cart item by product ID
function getCartItem(productId) {
	for (var i = 0; i < cartItems.length; i++) {
		if (cartItems[i].product.id == productId) {
			return cartItems[i];
		}
	}
	return null;
}

// Function to update the cart display
function updateCartDisplay() {
	// Get the cart element and the cart item list element
	var cart = document.querySelector('.cart');
	var cartItemList = cart.querySelector('ul');
	
	// Clear the cart item list
	cartItemList.innerHTML = '';
	
	// Loop through the cart items and add them to the cart item list
	for (var i = 0; i < cartItems.length; i++) {
		var cartItem = cartItems[i];
		
		// Create a list item element for the cart item
		var cartItemElement = document.createElement('li');
		
		// Create a span element for the product name and add it to the list item
		var productNameElement = document.createElement('span');
		productNameElement.textContent = cartItem.product.name;
		cartItemElement.appendChild(productNameElement);
		
		// Create a span element for the product quantity and add it to the list item
		var productQuantityElement = document.createElement('span');
		productQuantityElement.textContent = cartItem.quantity;
		cartItemElement.appendChild(productQuantityElement);
		
		// Create a span element for the product price and add it to the list item
		var productPriceElement = document.createElement('span');
		productPriceElement.textContent = '$' + (cartItem.product.price * cartItem.quantity).toFixed(2);
		cartItemElement.appendChild(productPriceElement);
		
		// Add the list item to the cart item list
		cartItemList.appendChild(cartItemElement);
	}
	
	// Create a span element for the cart total and add it to the cart
	var cartTotalElement = document.createElement('span');
	cartTotalElement.textContent = 'Total: $' + getCartTotal().toFixed(2);
	cart.appendChild(cartTotalElement);
}

// Function to get the total price of the items in the cart
function getCartTotal() {
	var total = 0;
	for (var i = 0; i < cartItems.length; i++) {
		var cartItem = cartItems[i];
		total += cartItem.product.price * cartItem.quantity;
	}
	return total;
}

// Get the remove from cart button and add a click event listener to it
var removeFromCartButton = document.querySelector('.remove-from-cart');
removeFromCartButton.addEventListener('click', function(event) {
	// Remove all items from the cart
	cartItems = [];
	
	// Update the cart display
	updateCartDisplay();
});

// Get the checkout button and add a click event listener
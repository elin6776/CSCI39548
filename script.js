let cart = []; // This will hold the user's cart
let products = []; // To store the product data
let currentIndex = 0; // To track the current index for loading products
const productsPerPage = 6; // Maximum products to display per load
let loadMoreClicks = 0; // Track the number of times the Load More button is clicked

// Function to fetch products and display them based on a filter
async function fetchProducts(category = 'All') {
    try {
        const response = await fetch('products.json'); // Fetch from the JSON file
        products = await response.json(); // Store the fetched products in the global variable
        currentIndex = 0; // Reset index for new category
        displayProducts(category); // Display products based on the selected category
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function getStars(rating) {
    let stars = '';
    // Full stars
    for (let i = 0; i < Math.floor(rating); i++) {
      stars += '<i class="fas fa-star"></i>';
    }
    // Half star (if rating is not a whole number)
    if (rating % 1 !== 0) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    }
    // Empty stars
    for (let i = Math.floor(rating) + (rating % 1 !== 0 ? 1 : 0); i < 5; i++) {
      stars += '<i class="far fa-star"></i>';
    }
    return stars;
  }  

// Function to display products based on the selected category
function displayProducts(category) {
    const productList = document.getElementById('product-list');
    const loadMoreButton = document.getElementById('load-more');

    // Filter the products based on the selected category
    const filteredProducts = category === 'All' ? products : products.filter(product => product.category === category);
    
    // Calculate the products to display based on current index and clicks
    const productsToDisplay = filteredProducts.slice(0, (loadMoreClicks + 1) * productsPerPage);

    // Clear the product list
    productList.innerHTML = '';

    // Display the products
    productsToDisplay.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        // Create the button with appropriate attributes
        const button = document.createElement('button');
        button.textContent = product.availability_status === 'In Stock' ? 'Add to Cart' : 'Out of Stock';
        button.disabled = product.availability_status === 'Out of Stock';

        // Add class 'out' if the product is out of stock
        if (product.availability_status === 'Out of Stock') {
            button.classList.add('out');
        }

        // Add event listener for the button
        button.addEventListener('click', () => {
            if (product.availability_status === 'In Stock') {
                alert(`${product.name} has been added to your cart!`);
                addToCart(product.id); // Pass the product ID to the addToCart function
            }
        });

        productDiv.innerHTML = `
            <img src="https://via.placeholder.com/300" alt="${product.name}" />
            <h2>${product.name}</h2>
            <p>${product.rating ? getStars(product.rating) : 'N/A'}</p>
            <p>$${product.price}</p>
        `;

        // Append the button to the product div
        productDiv.appendChild(button);
        productList.appendChild(productDiv);
    });

    // Show or hide the Load More button
    loadMoreButton.style.display = (loadMoreClicks + 1) * productsPerPage >= filteredProducts.length ? 'none' : 'block'; // Show if more products are available
}

// Load More button event listener
document.getElementById('load-more').addEventListener('click', () => {
    loadMoreClicks++; // Increment the number of clicks
    const selectedCategory = document.querySelector('.filter-list li.active')?.textContent || 'All';
    displayProducts(selectedCategory); // Load more products based on the selected category
});

// Function to handle filter click events
function setupFilters() {
    const filterLinks = document.querySelectorAll('.filter-list li');

    filterLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Remove 'active' class from all filter links
            filterLinks.forEach(link => link.classList.remove('active'));
            // Add 'active' class to the clicked filter link
            event.target.parentElement.classList.add('active');

            const selectedCategory = event.target.textContent;
            loadMoreClicks = 0; // Reset the load more clicks for a new category
            displayProducts(selectedCategory); // Update the product grid based on the selected category
        });
    });
}


// Function to add product ID to the cart and save to localStorage
function addToCart(productId) {
    if (!cart.includes(productId)) { // Avoid adding duplicates
        cart.push(productId); // Add the product ID to the cart array
        saveCartToLocalStorage(); // Save the cart to localStorage
        updateCartUI(); // Update the cart display
    }
}

// Function to update the cart display
function updateCartUI() {
    const cartCountElement = document.getElementById('cart-count'); // Element for cart count
    cartCountElement.textContent = cart.length; // Update the number of items in the cart
    displayCart(); // Call the function to display cart items
}

// Function to display cart items in the HTML
function displayCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Clear the current cart display

    cart.forEach(productId => {
        // Find the product by its ID in the products array
        const product = products.find(p => p.id === productId);
        if (product) {
            // Create a new list item for each product
            const cartItem = document.createElement('li');
            cartItem.textContent = `${product.name} - $${product.price}`;
            cartList.appendChild(cartItem); // Append the item to the cart list
        }
    });
}

// Function to save the cart to localStorage
function saveCartToLocalStorage() {
    // Assuming the user is logged in and we have their email (e.g., `loggedInUserEmail`)
    const loggedInUserEmail = "user@example.com"; // Replace with the actual logged-in user's email
    localStorage.setItem(`cart_${loggedInUserEmail}`, JSON.stringify(cart)); // Save cart with a unique key per user
}

// Function to load the cart from localStorage
function loadCartFromLocalStorage() {
    const loggedInUserEmail = "user@example.com"; // Replace with the actual logged-in user's email
    const savedCart = localStorage.getItem(`cart_${loggedInUserEmail}`);
    cart = savedCart ? JSON.parse(savedCart) : [];
    updateCartUI(); // Update the cart display after loading
}

// Call the fetch function to load products and set up filters
fetchProducts();
setupFilters();

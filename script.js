async function fetchProducts() {
    try {
        const response = await fetch('products.json'); // Fetch from the JSON file
        const products = await response.json();
        const productList = document.getElementById('product-list');

        if (products.length > 0) {
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');

                // Create the button with appropriate attributes
                const button = document.createElement('button');
                button.textContent = product.availability_status === 'In Stock' ? 'Add to Cart' : 'Out of Stock';
                button.disabled = product.availability_status === 'Out of Stock';

                // Add event listener for the button
                button.addEventListener('click', () => {
                    if (product.availability_status === 'In Stock') {
                        // Logic to add to cart (you can customize this later)
                        alert(`${product.name} has been added to your cart!`);
                    }
                });

                productDiv.innerHTML = `
                    <h2>${product.name}</h2>
                    <img src="${product.image_path}" alt="${product.name}" />
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <p>Status: ${product.availability_status}</p>
                    <p>Rating: ${product.rating ? product.rating : 'N/A'}</p>
                `;
                
                // Append the button to the product div
                productDiv.appendChild(button);
                productList.appendChild(productDiv);
            });
        } else {
            productList.innerHTML = '<p>No products available.</p>';
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Call the fetch function to load products
fetchProducts();


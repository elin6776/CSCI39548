async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        const productList = document.getElementById('product-list');

        if (products.length > 0) {
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');

                productDiv.innerHTML = `
                    <h2>${product.name}</h2>
                    <img src="${product.image_path}" alt="${product.name}" />
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <p>Status: ${product.availability_status}</p>
                    <p>Rating: ${product.rating ? product.rating : 'N/A'}</p>
                `;
                productList.appendChild(productDiv);
            });
        } 
        else {
            productList.innerHTML = '<p>No products available.</p>';
        }
    } 
    catch (error) {
        console.error('Error fetching products:', error);
    }
}

fetchProducts();
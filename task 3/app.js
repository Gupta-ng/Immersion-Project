document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products-container');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const errorMessage = document.getElementById('error-message');
    const sortSelect = document.getElementById('sort-select');
    const backHomeBtn = document.getElementById('back-home');
    const brandFilter = document.getElementById('brand-filter');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const applyFilterBtn = document.getElementById('apply-filter');

    let currentProducts = [];
    let allBrands = new Set();

    fetchProducts();

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        errorMessage.textContent = '';
        if (!query) {
            errorMessage.textContent = 'Search field cannot be empty!';
            return;
        }
        fetchProducts(query);
        backHomeBtn.style.display = 'inline-block';
    });

    backHomeBtn.addEventListener('click', function() {
        searchInput.value = '';
        fetchProducts();
        backHomeBtn.style.display = 'none';
    });

    sortSelect.addEventListener('change', function() {
        sortAndDisplayProducts();
    });

    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', function() {
            sortAndDisplayProducts();
        });
    }
    if (brandFilter) {
        brandFilter.addEventListener('change', function() {
            sortAndDisplayProducts();
        });
    }

    function fetchProducts(query = '') {
        let url = 'https://dummyjson.com/products';
        if (query) {
            url = `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`;
        }
        fetch(url)
            .then(res => res.json())
            .then(data => {
                currentProducts = data.products || data;
                allBrands = new Set(currentProducts.map(p => p.brand).filter(Boolean));
                populateBrandFilter();
                sortAndDisplayProducts();
            })
            .catch(() => {
                productsContainer.innerHTML = '<p>Failed to fetch products.</p>';
            });
    }

    function populateBrandFilter() {
        if (!brandFilter) return;
        const prevValue = brandFilter.value;
        brandFilter.innerHTML = '<option value="">All</option>';
        allBrands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            brandFilter.appendChild(option);
        });
        brandFilter.value = prevValue;
    }

    function applyFilters(products) {
        let filtered = [...products];
        const selectedBrand = brandFilter ? brandFilter.value : '';
        const minPrice = minPriceInput ? parseFloat(minPriceInput.value) : NaN;
        const maxPrice = maxPriceInput ? parseFloat(maxPriceInput.value) : NaN;

        if (selectedBrand) {
            filtered = filtered.filter(p => p.brand === selectedBrand);
        }
        if (!isNaN(minPrice)) {
            filtered = filtered.filter(p => p.price >= minPrice);
        }
        if (!isNaN(maxPrice)) {
            filtered = filtered.filter(p => p.price <= maxPrice);
        }
        return filtered;
    }

    function sortAndDisplayProducts() {
        let sortedProducts = [...currentProducts];
        if (sortSelect.value === 'asc') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortSelect.value === 'desc') {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        sortedProducts = applyFilters(sortedProducts);
        displayProducts(sortedProducts);
    }

    function displayProducts(products) {
        if (!products.length) {
            productsContainer.innerHTML = '<p>No products found.</p>';
            return;
        }
        productsContainer.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.thumbnail || product.image || ''}" alt="${product.title || product.name}" />
                <div class="product-title">${product.title || ''}</div>
                <div class="product-name">${product.brand || product.name || ''}</div>
                <div class="product-price">$${product.price || ''}</div>
            </div>
        `).join('');
    }
});
// =====================================================
// FOOD ORDERING SYSTEM
// HTML + CSS + JAVASCRIPT
// =====================================================


// =====================================================
// FOOD DATA
// =====================================================

const foodData = [

    {
        id: 1,
        name: "Farmhouse Pizza",
        category: "Pizza",
        restaurant: "Pizza Palace",
        price: 299,
        rating: 4.5,
        image:
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002"
    },

    {
        id: 2,
        name: "Cheese Burger",
        category: "Burger",
        restaurant: "Burger House",
        price: 179,
        rating: 4.3,
        image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
    },

    {
        id: 3,
        name: "Chicken Biryani",
        category: "Biryani",
        restaurant: "Biryani Point",
        price: 249,
        rating: 4.7,
        image:
            "https://images.unsplash.com/photo-1563379091339-03246963d96c"
    },

    {
        id: 4,
        name: "Veg Biryani",
        category: "Biryani",
        restaurant: "Royal Biryani",
        price: 199,
        rating: 4.4,
        image:
            "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833"
    },

    {
        id: 5,
        name: "Hakka Noodles",
        category: "Chinese",
        restaurant: "China Town",
        price: 169,
        rating: 4.2,
        image:
            "https://images.unsplash.com/photo-1585032226651-759b368d7246"
    },

    {
        id: 6,
        name: "Manchurian",
        category: "Chinese",
        restaurant: "China Town",
        price: 189,
        rating: 4.3,
        image:
            "https://images.unsplash.com/photo-1625398407796-82650a8c135f"
    },

    {
        id: 7,
        name: "Cold Coffee",
        category: "Drinks",
        restaurant: "Cafe Coffee",
        price: 129,
        rating: 4.5,
        image:
            "https://images.unsplash.com/photo-1461023058943-07fcbe16d735"
    },

    {
        id: 8,
        name: "Veggie Pizza",
        category: "Pizza",
        restaurant: "Pizza Corner",
        price: 249,
        rating: 4.4,
        image:
            "https://images.unsplash.com/photo-1579751626657-72bc17010498"
    }

];


// =====================================================
// CART
// =====================================================

let cart =
    JSON.parse(
        localStorage.getItem("foodCart")
    ) || [];


// =====================================================
// ORDER HISTORY
// =====================================================

let orderHistory =
    JSON.parse(
        localStorage.getItem("orderHistory")
    ) || [];


// =====================================================
// CURRENT FILTER
// =====================================================

let currentCategory = "All";

let currentSearch = "";


// =====================================================
// DISPLAY FOOD
// =====================================================

function displayFood() {

    const container =
        document.getElementById(
            "foodContainer"
        );

    const noFood =
        document.getElementById(
            "noFood"
        );


    container.innerHTML = "";


    // Filter food

    let filteredFood =
        foodData.filter(food => {

            const categoryMatch =
                currentCategory === "All" ||
                food.category === currentCategory;


            const searchMatch =
                food.name
                    .toLowerCase()
                    .includes(
                        currentSearch.toLowerCase()
                    ) ||

                food.restaurant
                    .toLowerCase()
                    .includes(
                        currentSearch.toLowerCase()
                    );


            return categoryMatch &&
                   searchMatch;

        });


    // No food found

    if (filteredFood.length === 0) {

        noFood.style.display = "block";

        return;

    }


    noFood.style.display = "none";


    // Create food cards

    filteredFood.forEach(food => {

        const card =
            document.createElement("div");


        card.className =
            "food-card";


        card.innerHTML = `

            <img
                src="${food.image}"
                alt="${food.name}"
                class="food-image"
            >


            <div class="food-info">


                <span class="rating">
                    ⭐ ${food.rating}
                </span>


                <h3>
                    ${food.name}
                </h3>


                <p class="restaurant-name">
                    ${food.restaurant}
                </p>


                <div class="food-bottom">


                    <span class="price">
                        ₹${food.price}
                    </span>


                    <button
                        class="add-btn"
                        onclick="addToCart(${food.id})"
                    >
                        + Add
                    </button>


                </div>


            </div>

        `;


        container.appendChild(card);

    });

}


// =====================================================
// ADD TO CART
// =====================================================

function addToCart(foodId) {

    const food =
        foodData.find(
            item => item.id === foodId
        );


    if (!food) {
        return;
    }


    // Check existing item

    const existingItem =
        cart.find(
            item => item.id === foodId
        );


    if (existingItem) {

        existingItem.quantity++;

    }

    else {

        cart.push({

            id: food.id,

            name: food.name,

            price: food.price,

            restaurant: food.restaurant,

            quantity: 1

        });

    }


    saveCart();

    displayCart();

    updateCartCount();


    alert(
        food.name +
        " added to cart!"
    );

}


// =====================================================
// DISPLAY CART
// =====================================================

function displayCart() {

    const cartItems =
        document.getElementById(
            "cartItems"
        );


    cartItems.innerHTML = "";


    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <h3>
                    Your cart is empty 🛒
                </h3>

                <p>
                    Add some delicious food!
                </p>

            </div>

        `;


        updateSummary();

        return;

    }


    // Display items

    cart.forEach(item => {

        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `


            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${item.restaurant}
                </p>

                <p>
                    ₹${item.price} each
                </p>

            </div>


            <div class="quantity-controls">


                <button
                    onclick="decreaseQuantity(${item.id})"
                >
                    −
                </button>


                <span class="quantity">
                    ${item.quantity}
                </span>


                <button
                    onclick="increaseQuantity(${item.id})"
                >
                    +
                </button>


            </div>


            <strong>
                ₹${item.price * item.quantity}
            </strong>


            <button
                class="remove-btn"
                onclick="removeItem(${item.id})"
            >
                Remove
            </button>

        `;


        cartItems.appendChild(
            cartItem
        );

    });


    updateSummary();

}


// =====================================================
// INCREASE QUANTITY
// =====================================================

function increaseQuantity(foodId) {

    const item =
        cart.find(
            item => item.id === foodId
        );


    if (item) {

        item.quantity++;

    }


    saveCart();

    displayCart();

    updateCartCount();

}


// =====================================================
// DECREASE QUANTITY
// =====================================================

function decreaseQuantity(foodId) {

    const item =
        cart.find(
            item => item.id === foodId
        );


    if (!item) {
        return;
    }


    if (item.quantity > 1) {

        item.quantity--;

    }

    else {

        cart =
            cart.filter(
                item => item.id !== foodId
            );

    }


    saveCart();

    displayCart();

    updateCartCount();

}


// =====================================================
// REMOVE ITEM
// =====================================================

function removeItem(foodId) {

    cart =
        cart.filter(
            item => item.id !== foodId
        );


    saveCart();

    displayCart();

    updateCartCount();

}


// =====================================================
// UPDATE SUMMARY
// =====================================================

function updateSummary() {

    let subtotal = 0;


    cart.forEach(item => {

        subtotal +=
            item.price *
            item.quantity;

    });


    let deliveryFee = 0;


    if (
        subtotal > 0 &&
        subtotal < 500
    ) {

        deliveryFee = 40;

    }


    let discount = 0;


    if (subtotal >= 500) {

        discount = 50;

    }


    const total =
        subtotal +
        deliveryFee -
        discount;


    document.getElementById(
        "subtotal"
    ).innerText =
        "₹" + subtotal;


    document.getElementById(
        "deliveryFee"
    ).innerText =
        "₹" + deliveryFee;


    document.getElementById(
        "discount"
    ).innerText =
        "₹" + discount;


    document.getElementById(
        "total"
    ).innerText =
        "₹" + total;

}


// =====================================================
// CART COUNT
// =====================================================

function updateCartCount() {

    let count = 0;


    cart.forEach(item => {

        count += item.quantity;

    });


    document.getElementById(
        "cartCount"
    ).innerText =
        count;

}


// =====================================================
// SAVE CART
// =====================================================

function saveCart() {

    localStorage.setItem(
        "foodCart",
        JSON.stringify(cart)
    );

}


// =====================================================
// CATEGORY FILTER
// =====================================================

function filterCategory(
    category,
    button
) {

    currentCategory =
        category;


    document
        .querySelectorAll(
            ".category"
        )
        .forEach(btn => {

            btn.classList.remove(
                "active"
            );

        });


    button.classList.add(
        "active"
    );


    displayFood();

}


// =====================================================
// SEARCH
// =====================================================

document
    .getElementById(
        "searchInput"
    )
    .addEventListener(
        "input",
        function () {

            currentSearch =
                this.value;

            displayFood();

        }
    );


// =====================================================
// HERO SEARCH
// =====================================================

function searchFromHero() {

    const value =
        document.getElementById(
            "heroSearch"
        ).value;


    currentSearch =
        value;


    document.getElementById(
        "searchInput"
    ).value =
        value;


    displayFood();


    document
        .getElementById(
            "foodContainer"
        )
        .scrollIntoView({
            behavior: "smooth"
        });

}


// =====================================================
// HERO ENTER
// =====================================================

document
    .getElementById(
        "heroSearch"
    )
    .addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                searchFromHero();

            }

        }
    );


// =====================================================
// SORT FOOD
// =====================================================

function sortFood() {

    const value =
        document.getElementById(
            "sortSelect"
        ).value;


    if (value === "low") {

        foodData.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    else if (value === "high") {

        foodData.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    else if (value === "rating") {

        foodData.sort(
            (a, b) =>
                b.rating - a.rating
        );

    }


    displayFood();

}


// =====================================================
// SCROLL TO CART
// =====================================================

function scrollToCart() {

    document
        .getElementById(
            "cartSection"
        )
        .scrollIntoView({
            behavior: "smooth"
        });

}


// =====================================================
// PLACE ORDER
// =====================================================

function placeOrder() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty!\n\nAdd some food first."
        );

        return;

    }


    // Calculate subtotal

    let subtotal = 0;


    cart.forEach(item => {

        subtotal +=
            item.price *
            item.quantity;

    });


    // Delivery

    let deliveryFee =
        subtotal < 500
            ? 40
            : 0;


    // Discount

    let discount =
        subtotal >= 500
            ? 50
            : 0;


    // Total

    let total =
        subtotal +
        deliveryFee -
        discount;


    // Generate Order ID

    const orderId =
        "FD" +
        Math.floor(
            100000 +
            Math.random() *
            900000
        );


    // Create order

    const order = {

        orderId: orderId,

        items:
            cart.map(item => ({

                name: item.name,

                price: item.price,

                quantity: item.quantity

            })),

        subtotal: subtotal,

        deliveryFee: deliveryFee,

        discount: discount,

        total: total,

        status: "Order Placed",

        date:
            new Date()
                .toLocaleString()

    };


    // Save order

    orderHistory.push(
        order
    );


    localStorage.setItem(
        "orderHistory",
        JSON.stringify(
            orderHistory
        )
    );


    // Show modal

    document.getElementById(
        "orderId"
    ).innerText =
        "Order ID: #" +
        orderId;


    document.getElementById(
        "orderModal"
    ).style.display =
        "flex";


    // Clear cart

    cart = [];


    saveCart();

    displayCart();

    updateCartCount();

    displayOrderHistory();

}


// =====================================================
// DISPLAY ORDER HISTORY
// =====================================================

function displayOrderHistory() {

    const container =
        document.getElementById(
            "orderHistoryContainer"
        );


    container.innerHTML = "";


    // No orders

    if (
        orderHistory.length === 0
    ) {

        container.innerHTML = `

            <div class="no-orders">

                <h3>
                    No orders yet 📦
                </h3>

                <p>
                    Your previous orders
                    will appear here.
                </p>

            </div>

        `;

        return;

    }


    // Latest order first

    const reversedOrders =
        [...orderHistory]
            .reverse();


    reversedOrders.forEach(
        order => {


            const orderCard =
                document.createElement(
                    "div"
                );


            orderCard.className =
                "order-card";


            let itemsHTML = "";


            order.items.forEach(
                item => {

                    itemsHTML += `

                        <div class="order-item">

                            <span>
                                ${item.name}
                                × ${item.quantity}
                            </span>

                            <span>
                                ₹${item.price *
                                  item.quantity}
                            </span>

                        </div>

                    `;

                }
            );


            orderCard.innerHTML = `

                <div class="order-header">

                    <div>

                        <div class="order-id">
                            #${order.orderId}
                        </div>

                        <div class="order-date">
                            ${order.date}
                        </div>

                    </div>

                    <strong>
                        ₹${order.total}
                    </strong>

                </div>


                <div class="order-items">

                    ${itemsHTML}

                </div>


                <div class="order-total">

                    <span>
                        Total
                    </span>

                    <span>
                        ₹${order.total}
                    </span>

                </div>


                <span class="order-status">

                    ✓ ${order.status}

                </span>

            `;


            container.appendChild(
                orderCard
            );

        }
    );


    // Clear history button

    const clearButton =
        document.createElement(
            "button"
        );


    clearButton.className =
        "clear-history-btn";


    clearButton.innerText =
        "Clear Order History";


    clearButton.onclick =
        clearOrderHistory;


    container.appendChild(
        clearButton
    );

}


// =====================================================
// SHOW ORDER HISTORY
// =====================================================

function showOrderHistory() {

    document
        .getElementById(
            "orderHistory"
        )
        .scrollIntoView({
            behavior: "smooth"
        });

}


// =====================================================
// CLEAR ORDER HISTORY
// =====================================================

function clearOrderHistory() {

    if (
        orderHistory.length === 0
    ) {

        alert(
            "No order history found."
        );

        return;

    }


    const confirmDelete =
        confirm(
            "Are you sure you want to clear all order history?"
        );


    if (confirmDelete) {

        orderHistory = [];


        localStorage.removeItem(
            "orderHistory"
        );


        displayOrderHistory();

    }

}


// =====================================================
// CLOSE ORDER MODAL
// =====================================================

function closeModal() {

    document.getElementById(
        "orderModal"
    ).style.display =
        "none";

}


// =====================================================
// INITIAL LOAD
// =====================================================

displayFood();

displayCart();

updateCartCount();

displayOrderHistory();
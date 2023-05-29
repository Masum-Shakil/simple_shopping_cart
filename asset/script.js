let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'pizza 1',
        image: '1.PNG',
        price: 100
    },
    {
        id: 2,
        name: 'pizza 2',
        image: '2.PNG',
        price: 200
    },
    {
        id: 3,
        name: 'pizza 3',
        image: '3.PNG',
        price: 300
    },
    {
        id: 4,
        name: 'pizza 4',
        image: '4.PNG',
        price: 400
    },
    {
        id: 5,
        name: 'pizza 5',
        image: '5.PNG',
        price: 500
    },
    {
        id: 6,
        name: 'pizza 6',
        image: '6.PNG',
        price: 600
    },
];

let listCards = [];

function initApp() {
    
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="asset/image/${value.image}"/>
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})">Add to Cart</button>
        `;
        console.log('key:' + key);
        list.appendChild(newDiv);
    })
}

initApp();

function addToCart(key) {
    
    if(listCards[key] == null){
        listCards[key] = products[key];
        listCards[key].quantity = 1;
    }
    
    reloadCart();
}

function reloadCart() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {
        totalPrice += value.price;
        count += value.quantity;

        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
            <div><img src="asset/image/${value.image}"/></div>
            <div>${value.name}</div>
            <div>${value.price.toLocaleString()}</div>
            <div>
                <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                <div class="count">${value.quantity}</div>
                <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
            </div>
            `;
            listCard.appendChild(newDiv);
        }
    })

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }

    reloadCart();
}
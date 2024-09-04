function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart');
    cartList.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price} บาท`; // ใช้เครื่องหมาย `` (backticks) เพื่อใส่ค่าตัวแปร
        cartList.appendChild(li);
        totalPrice += item.price;
    });

    document.getElementById('total-price').textContent = `รวมราคา: ${totalPrice} บาท`;
}

function clearCart() {
    localStorage.removeItem('cart');
    displayCart();
}

window.onload = displayCart;

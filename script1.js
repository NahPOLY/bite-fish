// ฟังก์ชันเพื่อแสดงรายการสินค้าในตะกร้า
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart');
    cartList.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart';
        div.innerHTML = `
            <td>${item.name} ${item.quantity} ตัว รวม: ${item.price * item.quantity} บาท</td>
        `;
        cartList.appendChild(div);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = `รวมราคา: ${totalPrice} บาท`;
}

// ฟังก์ชันเพื่อเคลียร์ตะกร้า
function clearCart() {
    localStorage.removeItem('cart');
    displayCart();
}

// ฟังก์ชันเพื่อเพิ่มสินค้าลงในตะกร้า
function addToCart(productName) {
    // สร้างตะกร้าสินค้าหากยังไม่มี
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // หาสินค้าในตะกร้า
    const existingProduct = cart.find(item => item.name === productName);
    
    if (existingProduct) {
        // หากสินค้าซ้ำ ให้เพิ่มจำนวน
        existingProduct.quantity += 1;
    } else {
        // หากสินค้าที่ยังไม่อยู่ในตะกร้า ให้เพิ่มเข้าไป
        cart.push({ name: productName, price: getPrice(productName), quantity: 1 });
    }
    
    // บันทึกตะกร้าสินค้าใน localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // แจ้งเตือนผู้ใช้
    alert(`${productName} ถูกเพิ่มลงในตะกร้าแล้วนะฮ้าฟ ฟู่ว`);

    
    // ปรับปรุงยอดรวมของตะกร้า
    updateCartSummary();
    
    // อัปเดตรายการสินค้าที่แสดงในตะกร้า
    displayCart();
}

// ฟังก์ชันเพื่อแสดงข้อความเตือน
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.className = 'toast hide';
        setTimeout(() => toast.remove(), 500); // รอให้ fade out ก่อนลบ
    }, 3000); // แสดงข้อความเตือนเป็นเวลา 3 วินาที
}

// ฟังก์ชันเพื่อคำนวณราคาของสินค้าตามชื่อ
function getPrice(productName) {
    const prices = {
        'ปลากัดฮาล์ฟมูน': 100,
        'ปลากัดหูช้างฮาล์ฟมูน': 200,
        'ปลากัดจีน': 40,
        'ปลากัดป่า': 300,
        'ปลากัดคราวน์เทล': 800
    };
    
    return prices[productName] || 0;
}

// ฟังก์ชันเพื่อคำนวณยอดรวมของตะกร้า
function calculateTotal() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// ฟังก์ชันเพื่ออัปเดตข้อมูลตะกร้า
function updateCartSummary() {
    let total = calculateTotal();
    document.getElementById('total-price').innerText = `รวมราคา: ${total} บาท`;
}

// เมื่อเริ่มโหลดหน้าให้เรียกฟังก์ชันเพื่ออัปเดตข้อมูลตะกร้า
window.onload = () => {
    updateCartSummary();
    displayCart();
};

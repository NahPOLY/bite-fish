function addToCart(productName) {
    // สร้างตะกร้าสินค้าหากยังไม่มี
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // หาสินค้าในตะกร้า
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        // หากสินค้าซ้ำ ให้เพิ่มจำนวน
        existingProduct.quantity = (existingProduct.quantity || 0) + 1;
    } else {
        // หากสินค้าที่ยังไม่อยู่ในตะกร้า ให้เพิ่มเข้าไป
        cart.push({ name: productName, price: getPrice(productName), quantity: 1 });
    }

    // บันทึกตะกร้าสินค้าใน localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // แสดงข้อความหรือปรับปรุง UI ตามที่ต้องการ
    alert(`${productName} ถูกเพิ่มลงในตะกร้า`);
}

function getPrice(productName) {
    // ค่าราคาเริ่มต้น
    const prices = {
        'ปลากัดฮาล์ฟมูน': 100,
        'ปลากัดหูช้างฮาล์ฟมูน': 200,
        'ปลากัดจีน': 40,
        'ปลากัดป่า': 300,
        'ปลากัดคราวน์เทล': 800
    };

    return prices[productName] || 0;
}

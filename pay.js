function generateQRCode() {
    // ดึงข้อมูลจาก localStorage หรือที่คุณต้องการแสดงใน QR Code
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPrice = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    const paymentData = `Total Price: ${totalPrice} บาท`;

    // สร้าง QR Code
    const qrcodeContainer = document.getElementById('qrcode-container');
    qrcodeContainer.innerHTML = ''; // ล้าง QR code เก่าก่อน
    QRCode.toCanvas(qrcodeContainer, paymentData, (error) => {
        if (error) console.error(error);
        console.log('QR Code generated successfully!');
    });
}

// เรียกใช้ฟังก์ชันเมื่อโหลดหน้า
window.onload = generateQRCode;

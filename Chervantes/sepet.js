// 🛒 1. Sepeti Yükleme Fonksiyonu
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartList = document.getElementById("cart-items");

    if (cartList) { // Eğer "cart-items" elementi varsa yani sepetteysek
        cartList.innerHTML = ""; // Önce tabloyu temizle

        cart.forEach((item, index) => {
            cartList.innerHTML += `
                <tr>
                    <td><img src="${item.image}" width="50"></td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Sil</button>
                    </td>
                </tr>
            `;
        });
    }

    updateCartIcon(cart.length);
}

// 🛒 2. Sepete Ürün Ekleme Fonksiyonu
function addToCart(event) {
    let card = event.target.closest(".card");
    let name = card.querySelector(".card-title").innerText;
    let price = card.querySelector(".card-text").innerText;
    let image = card.querySelector("img").src;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartIcon(cart.length);
}

// 🛒 3. Sepetten Ürün Silme Fonksiyonu
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// 🛒 4. Sepete Ekle Butonlarını Bağlama (Eğer ürün ekleme butonları varsa)
document.addEventListener("DOMContentLoaded", function () {
    let addToCartButtons = document.querySelectorAll(".add-to-cart");
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener("click", addToCart);
        });
    }

    loadCart();
});

// 🛒 5. Sepet İkonundaki Ürün Sayısını Güncelleme
function updateCartIcon(count) {
    let cartCount = document.getElementById("cart-count");
    if (cartCount) {
        if (count > 0) {
            cartCount.innerText = count;
            cartCount.style.display = "block";
        } else {
            cartCount.style.display = "none";
        }
    }
}

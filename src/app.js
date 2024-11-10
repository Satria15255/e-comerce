document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Tiramisu", desk: "Kue lembut dengan lapisan krim mascarpone, biskuit ladyfinger, dan espresso, ditaburi bubuk kakao.", img: "6.jpg", price: 40000 },
      { id: 2, name: "Caprese Salad", desk: "Irisan tomat segar, mozzarella,basil, dan balsamic vinegar.", img: "7.jpg", price: 45000 },
      { id: 3, name: "Fettuccine Alfredo", desk: "Pasta fettuccine lembut dengan saus krim, keju parmesan, dan mentega.", img: "8.jpg", price: 43000 },
      { id: 4, name: "Espresso", desk: "Kopi hitam pekat khas Italia", img: "9.jpg", price: 46000 },
      { id: 5, name: "Pollo alla Parmigiana", desk: "Dada ayam dilapisi tepung roti, digoreng hingga garing dan disajikan dengan saus tomat serta keju mozzarella yang meleleh", img: "10.jpg", price: 49000 },
      {
        id: 6,
        name: "Croissant",
        desk: "Croissant khas Prancis yang renyah di luar dan lembut berlapis-lapis di dalam. Dibuat dengan mentega berkualitas untuk cita rasa kaya yang sempurna dinikmati kapan saja, baik polos atau dipadukan dengan selai dan isian favorit",
        img: "11.jpg",
        price: 35000,
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek barang sama
      const cartItem = this.items.find((item) => item.id === newItem.id);
      // jika masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sama
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
            // jika barang sudah ada, tambah quantity dan totalnya
          } else {
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item remove
      const cartItem = this.items.find((item) => item.id === id);

      // jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri 11
        this.items = this.items.map((item) => {
          //
          if (item.id !== id) {
            return item;
            // jika bukan barang yang di klik
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// konversi rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.getElementById("imageCarousel");
    const carouselInner = document.querySelector(".carousel-inner");

    let currentIndex = 0;

    function showImage(index) {
        const itemWidth = carouselInner.clientWidth;
        const newPosition = -index * itemWidth;
        carouselInner.style.transform = `translateX(${newPosition}px)`;
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % carouselInner.children.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + carouselInner.children.length) % carouselInner.children.length;
        showImage(currentIndex);
    }

    setInterval(nextImage, 3000); // Auto-advance every 3 seconds (adjust as needed)
});


document.addEventListener('DOMContentLoaded', function () {
    // Shopping Cart API
    var shoppingCart = (function () {
      // ... (the rest of the shoppingCart API code you provided)
    })();
  
    // Event listener for adding items to the cart
    document.querySelectorAll('.card').forEach(function (card) {
      card.addEventListener('click', function () {
        var title = this.querySelector('.title').textContent;
        var price = this.querySelector('.price').textContent;
        var imageUrl = this.querySelector('.image img').src;
  
        shoppingCart.addItemToCart(title, parseFloat(price.replace('₹', '').replace(',', '')), 1);
        displayCart();
      });
    });
  
    // Function to display the cart
    function displayCart() {
      var cartArray = shoppingCart.listCart();
      var output = "";
  
      for (var i in cartArray) {
        output += "<tr>"
          + "<td>" + cartArray[i].name + "</td>"
          + "<td>(" + cartArray[i].price + ")</td>"
          + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
          + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
          + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
          + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
          + " = "
          + "<td>" + cartArray[i].total + "</td>"
          + "</tr>";
      }
  
      // Update the cart display elements
      var cartContainer = document.getElementById('cart-container');
      var totalCartElement = document.querySelector('.total-cart');
      var totalCountElement = document.querySelector('.total-count');
  
      if (cartContainer) {
        cartContainer.innerHTML = output;
      }
  
      if (totalCartElement) {
        totalCartElement.textContent = shoppingCart.totalCart().toFixed(2);
      }
  
      if (totalCountElement) {
        totalCountElement.textContent = shoppingCart.totalCount();
      }
    }
  
    // Event listener for deleting items from the cart
    document.querySelector('.show-cart').addEventListener("click", function (event) {
      if (event.target.classList.contains('delete-item')) {
        var name = event.target.dataset.name;
        shoppingCart.removeItemFromCartAll(name);
        displayCart();
      }
    });
  
    // Event listeners for adjusting item count in the cart
    document.querySelector('.show-cart').addEventListener("click", function (event) {
      if (event.target.classList.contains('minus-item')) {
        var name = event.target.dataset.name;
        shoppingCart.removeItemFromCart(name);
        displayCart();
      }
  
      if (event.target.classList.contains('plus-item')) {
        var name = event.target.dataset.name;
        shoppingCart.addItemToCart(name);
        displayCart();
      }
    });
  
    // Event listener for changing item count in the cart
    document.querySelector('.show-cart').addEventListener("change", function (event) {
      if (event.target.classList.contains('item-count')) {
        var name = event.target.dataset.name;
        var count = Number(event.target.value);
        shoppingCart.setCountForItem(name, count);
        displayCart();
      }
    });
  
    // Initial display of the cart
    displayCart();
  });
  
  
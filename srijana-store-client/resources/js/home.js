window.onload = function () {
  const storedValue = sessionStorage.getItem("User-Data");
  if (!storedValue) {
    window.location.href = "/";
  } else {
    document.getElementById("userName").textContent =
      storedValue.match(/^[^\d]*/)[0];

    populateTable();
    populateShoppingList();

    document.getElementById("place-order").onclick = function (event) {
      event.preventDefault();
      placeOrder();
    };

    document.getElementById("logout-btn").onclick = function (event) {
      event.preventDefault();
      sessionStorage.clear();
      window.location.href = "/";
    };
  }
};

async function placeOrder() {
  await fetch("http://localhost:5001/users/place-order", {
    method: "POST",
    headers: {
      "User-Data": sessionStorage.getItem("User-Data"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Successfull placing order");
      window.location.reload();
    });
}

function clearTable(tableId) {
  const tableBody = document.querySelector(tableId);
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
}

function populateShoppingList() {
  // Call clearTable to remove existing rows
  clearTable("#shopping-cart-table tbody");
  document.getElementById("total-price").textContent = "";

  fetch("http://localhost:5001/users/shopping-list", {
    method: "GET",
    headers: {
      "User-Data": sessionStorage.getItem("User-Data"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.shoppingCartList.length != 0) {
        document.getElementById("shopping-cart-table").style.display = "block";
        document.getElementById("empty-cart").style.display = "none";
        const tableBody = document.querySelector("#shopping-cart-table tbody");

        data.shoppingCartList.forEach((item) => {
          const row = tableBody.insertRow();
          const nameCell = row.insertCell(0);
          const priceCell = row.insertCell(1);
          const totalCell = row.insertCell(2);
          const quantityCell = row.insertCell(3);

          nameCell.textContent = item.name;
          priceCell.textContent = item.price;
          totalCell.textContent = item.total;

          // Create a button with an ID from the list
          const container = document.createElement("div");

          // Create and populate the left button
          const leftButton = document.createElement("button");
          leftButton.textContent = "-";
          leftButton.id = item.id;

          // Create and populate the input field
          const inputElement = document.createElement("input");
          inputElement.type = "text";
          inputElement.value = item.quantity;
          inputElement.id = "quantity" + item.id;

          // Create and populate the right button
          const rightButton = document.createElement("button");
          rightButton.textContent = "+";
          rightButton.id = item.id;

          // Append the elements to the container div
          container.appendChild(leftButton);
          container.appendChild(inputElement);
          container.appendChild(rightButton);

          rightButton.addEventListener("click", () => {
            // Handle button click here, using the button.id

            increaseQuantity(item.id);
          });

          leftButton.addEventListener("click", () => {
            // Handle button click here, using the button.id

            decreaseQuantity(item.id);
          });

          quantityCell.appendChild(container);
          document.getElementById("total-price").textContent = data.total;
        });
      } else {
        document.getElementById("empty-cart").style.display = "block";
        document.getElementById("shopping-cart-table").style.display = "none";
      }
    });
}

function increaseQuantity(shoppingCartId) {
  fetch("http://localhost:5001/users/add-quantity/" + shoppingCartId, {
    method: "POST",
    headers: {
      "User-Data": sessionStorage.getItem("User-Data"),
    },
  })
    .then((res) => res.json)
    .then((data) => {
      populateShoppingList();
    });
}

function decreaseQuantity(shoppingCartId) {
  fetch("http://localhost:5001/users/decrease-quantity/" + shoppingCartId, {
    method: "POST",
    headers: {
      "User-Data": sessionStorage.getItem("User-Data"),
    },
  })
    .then((res) => res.json)
    .then((data) => {
      populateShoppingList();
    });
}

// Function to populate the table
function populateTable() {
  fetch("http://localhost:5001/products/", {
    method: "GET",
    headers: {
      "User-Data": sessionStorage.getItem("User-Data"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const tableBody = document.querySelector("#product-table tbody");
      data.forEach((item) => {
        const row = tableBody.insertRow();
        const nameCell = row.insertCell(0);
        const priceCell = row.insertCell(1);
        const imageCell = row.insertCell(2);
        const stockCell = row.insertCell(3);
        const actionCell = row.insertCell(4);

        nameCell.textContent = item.name;
        priceCell.textContent = item.price;
        
        stockCell.textContent = item.stock;

        //
        const imgElement = document.createElement("img");

        // Set attributes for the image
        imgElement.src = item.image; // Set the image source
        imgElement.alt = item.name;
        imgElement.className = "product-img";

        imageCell.appendChild(imgElement);

        // Create a button with an ID from the list
        const addToCartBtn = document.createElement("button");
        addToCartBtn.textContent = "Add to Cart";
        addToCartBtn.id = item.id;

        addToCartBtn.addEventListener("click", () => {
          // Handle button click here, using the button.id

          addToCart(addToCartBtn.id);
        });

        actionCell.appendChild(addToCartBtn);
      });
    });
}

function addToCart(productId) {
  fetch("http://localhost:5001/users/add-to-cart/" + productId, {
    method: "POST",
    headers: {
      "User-Data": sessionStorage.getItem("User-Data"),
    },
  })
    .then((res) => {
      if (res.status === 500 || res.status === 404) {
        throw new Error("Internal ");
      }
      res.json();
    })
    .then((data) => {})
    .catch((error) => {
      alert(error.message);
    });
  populateShoppingList();
}

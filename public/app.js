// open cart modal
const cart = document.querySelector("#cart");
const cartModalOverlay = document.querySelector(".cart-modal-overlay");
const popup_del_charge = document.querySelector(".popup-del-charge");

var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();

var seconds = add_zero(date.getSeconds());
var minutes = add_zero(date.getMinutes());
var hours = add_zero(date.getHours());

var current_time = `${hours}:${minutes}:${seconds}`;

function add_zero(num) {
  return num < 10 ? `0${num}` : num;
}

var Delivery_charge = 0;
var overAll_charge_del_t_fee = 0;
var overAll_charge_del = 0;
var overAll_charge_collection_t_fee = 0;
var overAll_charge_collection = 0;

var Online_Status = "";

var Customer_name = "Name 1";
var Customer_address = "";
var Customer_eircode = "";
var Customer_phone = "";
var Customer_comments = "";
var Customer_noc = "Name on card";
var Customer_cno = "70000000000000000000";
var Customer_cex = "Exp 09/22";
var Customer_sec = "227";
var Delivery = 3.5;
var Collection = "";
var Del_or_Col = "";
var pay_online = "";
var pay_cash = "";
var pay_option = "";

var order_at = `${day}/${month}/${year}`;

var order_no = date.getMilliseconds();
var increase_order_no = 0;
var item_names = null; // For cart only

var quantity_input = 0;
var quantity = 0;
var product_names = 0;
var actual_item_price = 0;
var product_price_all = 0;
var sum_single_price = 0;
var total_quantity = 0;
var totalout = 0;
var totalcost = 0;

var Service_charge = 0.5;

// Variables for FBDB

var donner_kebab = "";
var donner_plate = "";
var sandwich = "";
var burger = "";
var chips = "Chips";

var one_4_pounder = "1/4 Pounder with Double Cheese";
var one_4_pounder_meal_quantity = "";
var one_4_pounder_meal_price = 0;
var one_4_pounder_added_price = 0;

var cheese_burger_meal = "cheese_burger_meal";
var cheese_burger_meal_price = "";
var cheese_burger_meal_quantity = "";

var doner_kebab_meal = "Doner Kebab Meal";
var doner_kebab_meal_price = "";
var doner_kebab_meal_quantity = "";

var chicken_kebab_meal = "chicken_kebab_meal";
var chicken_kebab_meal_price = "";
var chicken_kebab_meal_quantity = "";

var double_doner_kebab_meal = "double_doner_kebab_meal";
var double_doner_kebab_meal_price = "";
var double_doner_kebab_meal_quantity = "";

var double_chicken_kebab_meal = "Double Chicken Kebab Meal";
var double_chicken_kebab_meal_price = "";
var double_chicken_kebab_meal_quantity = "";

var price = 0;
var meal_added = 0;
var show_meal_price = "";
var meal_added_text = "";
var final_total = 0;

////////////////////////////// TOGGLE Switch FUN///////////////////////////

function openForm() {
  document.getElementById("address_form").style.display = "block";
}

function closeForm() {
  document.getElementById("address_form").style.display = "none";
}

function open_payfrom() {
  document.getElementById("address_form2").style.display = "block";
}

function close_payform() {
  document.getElementById("address_form2").style.display = "none";
}
function open_dialog() {
  document.getElementById("dialog").style.display = "block";
}

////////// GET ADDR VAL

var line1 = document.getElementById("address");
var line2 = document.getElementById("address2");
var eircode = document.getElementById("eircode");
var phone = document.getElementById("phone");
var comments = document.getElementById("comments");

function Address() {
  console.log(line1.value);
  console.log(line2.value);
  Customer_address = line1.value + " " + line2.value;

  console.log(eircode.value);
  Customer_eircode = eircode.value;
  console.log(phone.value);
  Customer_phone = phone.value;
  console.log(comments.value);
  Customer_comments = comments.value;
  alert("Details Confirmed");
}

///////////////////////////////////////////////////////////////////////////////
//////////////// DEL OR COL  ////////////////
var switchDelivery = document.getElementById("switchDelivery");
var switchCollection = document.getElementById("switchCollection");
var selection_none = document.getElementById("selection_none");

var display_form = document.querySelector("#display_form");

Delivery = switchDelivery.value;
Collection = switchCollection.value;

var switch_online_pay = document.querySelector("#switchPayonline");
var switch_cash = document.querySelector("#switchCash");

pay_online = switch_online_pay.value;
pay_cash = switch_cash.value;

switch_online_pay.addEventListener("change", (event) => {
  console.log(pay_online);
});

switch_cash.addEventListener("change", (event) => {
  console.log(pay_cash);
});

cart.addEventListener("click", () => {
  if (cartModalOverlay.style.transform === "translateX(-200%)") {
    cartModalOverlay.style.transform = "translateX(0)";
    document.querySelector(".purchase-btn").style.display = "block";
  } else {
    cartModalOverlay.style.transform = "translateX(-200%)";
  }
});
// end of open cart modal

// close cart modal
const closeBtn = document.querySelector("#close-btn");

closeBtn.addEventListener("click", () => {
  cartModalOverlay.style.transform = "translateX(-200%)";
});

cartModalOverlay.addEventListener("click", (e) => {
  if (e.target.classList.contains("cart-modal-overlay")) {
    cartModalOverlay.style.transform = "translateX(-200%)";
  }
});

// end of close cart modal

// add products to cart
const addToCart = document.getElementsByClassName("add-to-cart");
const productRow = document.getElementsByClassName("product-row");

for (var i = 0; i < addToCart.length; i++) {
  button = addToCart[i];
  button.addEventListener("click", addToCartClicked);
}

function addToCartClicked(event) {
  button = event.target;
  var cartItem = button.parentElement;
  price = cartItem.getElementsByClassName("product-price")[0].innerText;

  item_names = cartItem.getElementsByClassName("product-name")[0].innerText;
  var imageSrc = cartItem.getElementsByClassName("product-image")[0].src;

  console.log("PRODUCT NAME " + item_names);
  addItemToCart(price, imageSrc);
  updateCartPrice();
}

function addItemToCart(price, imageSrc) {
  var productRow = document.createElement("div");
  productRow.classList.add("product-row");
  var productRows = document.getElementsByClassName("product-rows")[0];

  var cartImage = document.getElementsByClassName("cart-image");

  // for (var i = 0; i < cartImage.length; i++){
  //   if (cartImage[i].src == imageSrc){
  //     alert ('This item has already been added to the cart')
  //     return;
  //   }
  // }

  var cartRowItems = `
  <div class="product-row">
        <img class="cart-image" src="${imageSrc}" alt="">
        <span class ="product_name">${item_names}</span>
        <span class="cart-price">${price}</span> <span class="€-incart">€</span> 
        
         <input class="product-quantity" type="number" value="1" >
        <button class="remove-btn">Remove</button>
        </div>`;

  productRow.innerHTML = cartRowItems;

  productRows.append(productRow);
  productRow
    .getElementsByClassName("remove-btn")[0]
    .addEventListener("click", removeItem);

  productRow
    .getElementsByClassName("product-quantity")[0]
    .addEventListener("change", changeQuantity);
  meal_added_text = document.getElementsByClassName("meal-added-text")[0];
  // MEAL ADDED

  updateCartPrice();
}

// DRINK SELECTION 1
var meal_opt1 = "";
var meal_opt2 = "";
var drink_opt3 = "";
var drink_opt4 = "";
var drink_opt5 = "";
var drink_opt6 = "";
var drink_opt7 = "";
var drink_opt8 = "";

var meal_btn1 = document.getElementById("meal-btn1");
var meal_btn2 = document.getElementById("meal-btn2");
var meal_btn3 = document.getElementById("meal-btn3");
var meal_btn4 = document.getElementById("meal-btn4");
var drink_btn5 = document.getElementById("drinks-btn5");

///////////// REGULAR BURGER MEAL //////////////

function burger_radio1() {
  document.getElementsByClassName("meal-text1")[0].innerHTML;
  var radio1 = document.querySelector('input[name="radio1"]:checked').value;
  var regular_price = 5;
  var regular_text = "Regular ";
  var meal_price = 3;
  var meal_text = "Meal € +";

  if (radio1 == "Regular") {
    var x = (document.getElementById("product-price1").innerHTML =
      regular_price);
    document.getElementsByClassName("meal-text1")[0].innerHTML = regular_text;
    var col = document.getElementById("text1");
    col.style.color = "blue";
  } else if (radio1 == "Meal") {
    // Change price FOR MEAL

    document.getElementsByClassName("meal-text1")[0].innerHTML =
      meal_text + meal_price;
    var value = parseFloat(regular_price, 10) + meal_price;
    var col = document.getElementById("text1");
    col.style.color = "green";
    document.getElementById("product-price1").innerHTML = value;
  } else {
    console.log("No option selected..");
  }
}
///////////// CHEESE REGULAR MEAL //////////////
function burger_radio2() {
  document.getElementsByClassName("meal-text2")[0].innerHTML;
  var radio1 = document.querySelector('input[name="radio2"]:checked').value;
  var regular_price = 3;
  var regular_text = "Regular ";
  var meal_price = 3;
  var meal_text = "Meal € +";

  if (radio1 == "Regular") {
    document.getElementById("product-price2").innerHTML = regular_price;
    document.getElementsByClassName("meal-text2")[0].innerHTML = regular_text;
    var col = document.getElementById("text2");
    col.style.color = "blue";
  } else if (radio1 == "Meal") {
    // Change price FOR MEAL

    document.getElementsByClassName("meal-text2")[0].innerHTML =
      meal_text + meal_price;
    var value = parseFloat(regular_price, 10) + meal_price;
    document.getElementById("product-price2").innerHTML = value;
    var col = document.getElementById("text2");
    col.style.color = "green";
  } else {
    console.log("No option selected..");
  }
}
//////////// DOUBLE CHEESE REGULAR MEAL //////////////
function burger_radio3() {
  document.getElementsByClassName("meal-text3")[0].innerHTML;
  var radio3 = document.querySelector('input[name="radio3"]:checked').value;
  var regular_price = 4;
  var regular_text = "Regular ";
  var meal_price = 3;
  var meal_text = "Meal € +";

  if (radio3 == "Regular") {
    document.getElementById("product-price3").innerHTML = regular_price;
    document.getElementsByClassName("meal-text3")[0].innerHTML = regular_text;
    var col = document.getElementById("text3");
    col.style.color = "blue";
  } else if (radio3 == "Meal") {
    // Change price FOR MEAL

    document.getElementsByClassName("meal-text3")[0].innerHTML =
      meal_text + meal_price;
    var value = parseFloat(regular_price, 10) + meal_price;
    document.getElementById("product-price3").innerHTML = value;
    var col = document.getElementById("text3");
    col.style.color = "green";
  } else {
    console.log("No option selected..");
  }
}
//////////////// RADIO 4  ///////////////////////

function burger_radio4() {
  document.getElementsByClassName("meal-text4")[0].innerHTML;
  var radio4 = document.querySelector('input[name="radio4"]:checked').value;
  var regular_price = 4;
  var regular_text = "Regular ";
  var meal_price = 3;
  var meal_text = "Meal € +";

  if (radio4 == "Regular") {
    document.getElementById("product-price4").innerHTML = regular_price;
    document.getElementsByClassName("meal-text4")[0].innerHTML = regular_text;
    var col = document.getElementById("text4");
    col.style.color = "blue";
  } else if (radio4 == "Meal") {
    // Change price FOR MEAL

    document.getElementsByClassName("meal-text4")[0].innerHTML =
      meal_text + meal_price;
    var value = parseFloat(regular_price, 10) + meal_price;
    document.getElementById("product-price4").innerHTML = value;
    var col = document.getElementById("text4");
    col.style.color = "green";
  } else {
    console.log("No option selected..");
  }
}
//////////////// RADIO 5  ///////////////////////

function burger_radio5() {
  document.getElementsByClassName("meal-text5")[0].innerHTML;
  var radio4 = document.querySelector('input[name="radio5"]:checked').value;
  var regular_price = 5;
  var regular_text = "Regular ";
  var meal_price = 3;
  var meal_text = "Meal € +";

  if (radio4 == "Regular") {
    document.getElementById("product-price5").innerHTML = regular_price;
    document.getElementsByClassName("meal-text5")[0].innerHTML = regular_text;
    var col = document.getElementById("text5");
    col.style.color = "blue";
  } else if (radio4 == "Meal") {
    // Change price FOR MEAL

    document.getElementsByClassName("meal-text5")[0].innerHTML =
      meal_text + meal_price;
    var value = parseFloat(regular_price, 10) + meal_price;
    document.getElementById("product-price5").innerHTML = value;
    var col = document.getElementById("text5");
    col.style.color = "green";
  } else {
    console.log("No option selected..");
  }
}

var pizza_opt1 = document.getElementById("pizza-opt1");
var sauce_opt1 = document.getElementById("sauce-opt1");
function getValue1(pizza_opt1) {
  alert(pizza_opt1.value);
}
function getValue2(sauce_opt1) {
  alert(sauce_opt1.value);
}

//////////////// RADIO 6 PIZZA OPTIONS ///////////////////////

function burger_radio6() {
  document.getElementsByClassName("meal-text6")[0].innerHTML;
  var radio6 = document.querySelector('input[name="radio6"]:checked').value;
  var select_btn = document.getElementsByClassName("select-btn")[0];
  var size_10_price = 5;
  var size_10_text = "size 10 ";
  var size_12_price = 6;
  var size_12_text = "size 12 ";
  var size_16_price = 10;
  var size_16_text = "size 16";
  var base_opt1 = "";
  var sauce_opt1 = "";

  if (radio6 == "10") {
    // COSTOMIZE BTN
    var customize_btn = document.getElementsByClassName("customize-btn")[0];
    customize_btn.style.display = "block";
    customize_btn.addEventListener("click", () => {
      // MINI DIALOG AND OVERLAY
      var overlay1 = document.getElementsByClassName("overlay")[0];
      var window1_popup = document.getElementsByClassName("window1-popup")[0];
      window1_popup.style.display = "block";
      overlay1.style.display = "block";
    });

    document.getElementById("product-price6").innerHTML = size_10_price;
    regular_text = document.getElementsByClassName("meal-text6")[0].innerHTML =
      size_10_text;
  } else if (radio6 == "12") {
    // Change price FOR MEAL
    var customize_btn = document.getElementsByClassName("customize-btn")[0];
    customize_btn.style.display = "block";
    customize_btn.addEventListener("click", () => {
      // MINI DIALOG AND OVERLAY
      var overlay1 = document.getElementsByClassName("overlay")[0];
      var window1_popup = document.getElementsByClassName("window1-popup")[0];
      window1_popup.style.display = "block";
      overlay1.style.display = "block";
    });

    document.getElementsByClassName("meal-text6")[0].innerHTML = size_12_text;
    var value = parseFloat(0, 10) + size_12_price;
    document.getElementById("product-price6").innerHTML = value;
  } else if (radio6 == "16") {
    // Change price FOR MEAL
    var customize_btn = document.getElementsByClassName("customize-btn")[0];
    customize_btn.style.display = "block";
    customize_btn.addEventListener("click", () => {
      // MINI DIALOG AND OVERLAY
      var overlay1 = document.getElementsByClassName("overlay")[0];
      var window1_popup = document.getElementsByClassName("window1-popup")[0];
      window1_popup.style.display = "block";
      overlay1.style.display = "block";
    });

    document.getElementsByClassName("meal-text6")[0].innerHTML = size_16_text;
    var value = parseFloat(0, 10) + size_16_price;
    document.getElementById("product-price6").innerHTML = value;
  } else {
    console.log("No option selected..");
  }
}

// end of add products to cart

// Remove products from cart
const removeBtn = document.getElementsByClassName("remove-btn");
for (var i = 0; i < removeBtn.length; i++) {
  button = removeBtn[i];
  button.addEventListener("click", removeItem);
}

function removeItem(event) {
  btnClicked = event.target;
  btnClicked.parentElement.parentElement.remove();
  meal_added = 0;
  one_4_pounder_meal_price = 0;
  updateCartPrice();
}

// update quantity input
var quantityInput = document.getElementsByClassName("product-quantity")[0];

for (var i = 0; i < quantityInput; i++) {
  quantity_input = input = quantityInput[i];

  console.log("qty in " + quantity_input);

  input.addEventListener("change", changeQuantity);
}

function changeQuantity(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartPrice();
}
// end of update quantity input

// update total price
function updateCartPrice() {
  var total = 0;

  for (var i = 0; i < productRow.length; i += 2) {
    cartRow = productRow[i];
    var productnames =
      cartRow.getElementsByClassName("product_name")[0].innerHTML; // Solved
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];

    var quantityElement = cartRow.getElementsByClassName("product-quantity")[0];

    var price = parseFloat(priceElement.innerText.replace("$", ""));
    quantity = quantityElement.value;

    total = total + price * quantity;

    overAll_charge_del = total; // ADD DELIVERY CASH
    overAll_charge_del_t_fee = total;
    overAll_charge_collection_t_fee = total;
    overAll_charge_collection = total + one_4_pounder_added_price;

    product_names = productnames;
    actual_item_price = price;
    sum_single_price = price * quantity; // Solved
    total_quantity = quantity;
    totalout = total;

    document.getElementById("subtotal").setAttribute("value", totalout); // On Payment Form
    document
      .getElementById("delivery-charge")
      .setAttribute("value", Delivery_charge);

    // FOR FIREBASE VALUES ONLY

    if (product_names == one_4_pounder) {
      sum_single_price + one_4_pounder_added_price;
      one_4_pounder_meal_quantity = quantity;
      console.log(
        "FOR FIREBASE VAL " +
          one_4_pounder_meal +
          " PRICE " +
          one_4_pounder_meal_price +
          "QTY " +
          one_4_pounder_meal_quantity
      );
    } else if (product_names == cheese_burger_meal) {
      cheese_burger_meal_price = sum_single_price;
      cheese_burger_meal_quantity = quantity;
      console.log(
        "FOR FIREBASE VAL " +
          cheese_burger_meal +
          " PRICE " +
          cheese_burger_meal_price +
          " QTY " +
          cheese_burger_meal_quantity
      );
    } else if (product_names == doner_kebab_meal) {
      doner_kebab_meal_price = sum_single_price;
      doner_kebab_meal_quantity = quantity;
      console.log(
        "FOR FIREBASE VAL " +
          doner_kebab_meal +
          " PRICE " +
          doner_kebab_meal_price +
          " QTY " +
          doner_kebab_meal_quantity
      );
    } else if (product_names == chicken_kebab_meal) {
      chicken_kebab_meal_price = sum_single_price;
      chicken_kebab_meal_quantity = quantity;
      console.log(
        "FOR FIREBASE VAL " +
          chicken_kebab_meal +
          " PRICE " +
          chicken_kebab_meal_price +
          " QTY " +
          chicken_kebab_meal_quantity
      );
    } else if (product_names == double_doner_kebab_meal) {
      double_doner_kebab_meal_price = sum_single_price;
      double_doner_kebab_meal_quantity = quantity;
      console.log(
        "FOR FIREBASE VAL " +
          double_doner_kebab_meal +
          " PRICE " +
          double_doner_kebab_meal_price +
          " QTY " +
          double_doner_kebab_meal_quantity
      );
    } else if (product_names == double_chicken_kebab_meal) {
      double_chicken_kebab_meal_price = sum_single_price;
      double_chicken_kebab_meal_quantity = quantity;
    } else {
      var one_4_pounder_meal = "";
      var one_4_pounder_meal_quantity = "";
      var one_4_pounder_meal_price = "";

      var cheese_burger_meal = "";
      var cheese_burger_meal_price = "";
      var cheese_burger_meal_quantity = "";

      var doner_kebab_meal = "";
      var doner_kebab_meal_price = "";
      var doner_kebab_meal_quantity = "";

      var chicken_kebab_meal = "";
      var chicken_kebab_meal_price = "";
      var chicken_kebab_meal_quantity = "";

      var double_doner_kebab_meal = "";
      var double_doner_kebab_meal_price = "";
      var double_doner_kebab_meal_quantity = "";

      var double_chicken_kebab_meal = "";
      var double_chicken_kebab_meal_price = "";
      var double_chicken_kebab_meal_quantity = "";
    }

    console.log(
      product_names +
        " Qty " +
        total_quantity +
        " Price " +
        actual_item_price +
        " Price per item " +
        sum_single_price
    );
  }

  totalcost = document.getElementsByClassName("total-price")[0].innerText =
    total;

  totalcost + one_4_pounder_meal_price;

  console.log("Total Cost " + totalcost);

  document.getElementsByClassName("cart-quantity")[0].textContent = i /= 2;
}
// end of update total price
// Calculate selected items in mobile view only.
const calculateBtn = document.querySelector(".calculate-btn");

calculateBtn.addEventListener("click", calculateBtnClicked);

function calculateBtnClicked() {
  console.log("Total ", totalcost);
}

// purchase items
const purchaseBtn = document.querySelector(".purchase-btn");

const closeCartModal = document.querySelector(".cart-modal");

purchaseBtn.addEventListener("click", purchaseBtnClicked);

function purchaseBtnClicked() {
  if (totalcost == 0 && quantity == 0) {
    alert("No item is selected");
  }

  console.log("Total ", totalcost);

  // JUST DELIVERY AND TOTAL AND ONLINE TRNSACTION
  if (switchDelivery.checked == true && switch_online_pay.checked == true) {
    var final_price = 0;
    Del_or_Col = Delivery;
    Delivery_charge = 3;

    final_price = overAll_charge_del_t_fee + Delivery_charge;

    document.getElementById("del-charge-Popup").style.display = "none";
    document.getElementById("address_form2").style.display = "block";
    document.getElementById("delivery-charge").style.display = "block";
    document
      .getElementById("delivery-charge")
      .setAttribute("value", Delivery_charge);
    document.getElementById("t_fee").setAttribute("value", Service_charge);
    document.getElementById("total-cost").setAttribute("value", final_price);
    console.log("DELIVERY SERVICE CHARGE " + overAll_charge_del_t_fee);
  } else if (switchDelivery.checked == true && switch_cash.checked == true) {
    if (line1.value != "") {
      Delivery_charge = 3;
      final_price = overAll_charge_del + Delivery_charge;
      document.getElementById("dialog-header").innerHTML = "Order Preview";
      document.getElementById("del-charge-Popup").style.display = "block";

      document.getElementById("dialog-delivery").innerHTML =
        "€ " + Delivery_charge;
      // document.getElementById("dialog-service").innerHTML =  "€ " + Service_charge;
      document.getElementById("dialog-subtotal").innerHTML = "€ " + final_price;

      document.getElementById("dialog-footer").innerHTML =
        "If you want to make any changes please refresh and choose items again";

      modal.style.display = "block";

      document.getElementById("delivery-charge").style.display = "none";
      document
        .getElementById("subtotal")
        .setAttribute("value", overAll_charge_del);
      console.log(Del_or_Col + "DELIVERY CASH " + overAll_charge_del);
    } else {
      alert("No address is provided");
    }
  }
  // COLLECTION TOTAL AND ONLINE TRANSACTION
  else if (
    switchCollection.checked == true &&
    switch_online_pay.checked == true
  ) {
    document.getElementById("del-charge-Popup").style.display = "none";
    Del_or_Col = Collection;
    document.getElementById("address_form2").style.display = "block";
    document.getElementById("delivery-charge").style.display = "none";
    document.getElementById("t_fee").setAttribute("value", Service_charge);
    document
      .getElementById("subtotal")
      .setAttribute("value", overAll_charge_collection);
    document
      .getElementById("total_cost")
      .setAttribute("value", overAll_charge_collection_t_fee);

    console.log("COLLECTION SERVICE CHARGE " + overAll_charge_collection_t_fee);
  }

  // COLLECTION CASH
  else if (switchCollection.checked == true && switch_cash.checked == true) {
    document.getElementById("del-charge-Popup").style.display = "block";

    document.getElementById("dialog-header").innerHTML = "Order Preview";

    document.getElementById("dialog-footer").innerHTML =
      "If you want to make any changes please refresh and choose items again";

    modal.style.display = "block";

    document.getElementById("dialog-subtotal").innerHTML =
      "€ " + overAll_charge_collection;
    document
      .getElementById("subtotal")
      .setAttribute("value", overAll_charge_collection);
    console.log(Del_or_Col + "DELIVERY CASH " + overAll_charge_collection);
  } else if (
    switchDelivery.checked == false &&
    switchCollection.checked == false
  ) {
    alert("Please choose one of the option Delivery or Collection");
  } else if (
    switch_online_pay.checked == false &&
    switch_cash.checked == false
  ) {
    alert("Please choose payment option");
  }

  if (switchCollection.checked == true && switch_cash.checked == true) {
    document.getElementById("del-charge-Popup").style.display = "none";
  }

  function holder1() {
    var firebaseConfig = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      measurementId: "",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    // SINGLE sendind DATA

    firebase.database().ref("holder").child("details").set({
      Online_Status: Online_Status,
      Customer_Name: Customer_name,
      Customer_Phone: Customer_phone,
      Customer_Address: Customer_address,
      Customer_Eircode: Customer_eircode,
      Customer_Comments: Customer_comments,
      Delivery: Delivery,
      Collection: Collection,
      Delivery_OR_Collection: Del_or_Col,
      Customer_NOC: Customer_noc,
      Customer_CNO: Customer_cno,
      Customer_CEX: Customer_cex,
      Customer_SEC: Customer_sec,

      Order_Number: order_no,
      Order_at: order_at,
      Order_Time: current_time,

      Item1: donner_kebab,
      Item1_Price: donnerKebab_price,
      Item1_QTY: donnerKebab_quantity,

      Item2: donner_plate,
      Item2_Price: donnerKebab_plate_price,
      Item2_QTY: donnerKebab_plate_quantity,

      Item3: sandwich,
      Item3_Price: sandwich_price,
      Item3_QTY: sandwich_quantity,

      Item4: burger,
      Item4_Price: burger_price,
      Item4_QTY: burger_quantity,

      Item5: chips,
      Item5_Price: chips_price,
      Item5_QTY: chips_quantity,

      Service_Charge: Service_charge,

      Total: totalout,
    });
    updateCartPrice();
  }
}

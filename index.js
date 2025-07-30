function login() {
  const validUsers = ["admin", "user"];
  const validPassword = "1234";

  const username = prompt("Enter your username (admin or user):");
  const password = prompt("Enter your password:");

  if (validUsers.includes(username) && password === validPassword) {
    return true;
  } else {
    alert("❌ Invalid username or password.");
    return false;
  }
}

function takeOrder() {
  const name = prompt("What's your name?");
  const age = Number(prompt("How old are you?"));
  const coffeeType = prompt("What type of coffee? (espresso / latte / cappuccino)").toLowerCase();
  const quantity = Number(prompt("How many cups?"));

  const prices = { espresso: 2.5, latte: 3.5, cappuccino: 4.0 };

  if (!prices[coffeeType]) {
    alert("❌ Invalid coffee type.");
    return null;
  }

  const pricePerCup = prices[coffeeType];
  const originalTotal = quantity * pricePerCup;

  let discount = 0;
  if (age < 18 || age > 60) {
    discount = originalTotal * 0.1;
  }

  const finalTotal = originalTotal - discount;

  return {
    name,
    coffeeType,
    quantity,
    originalTotal,
    discount,
    finalTotal
  };
}

function splitBill(finalTotal) {
  const people = Number(prompt("How many people are splitting the bill? (1, 2, or 3)"));
  const tipPercent = Number(prompt("What tip percentage? (0, 5, 10, or 15)"));

  if (![1, 2, 3].includes(people) || ![0, 5, 10, 15].includes(tipPercent)) {
    alert("❌ Invalid input.");
    return null;
  }

  const tip = finalTotal * (tipPercent / 100);
  const totalWithTip = finalTotal + tip;
  const perPerson = totalWithTip / people;

  return {
    tip,
    totalWithTip,
    perPerson,
    people,
    tipPercent
  };
}

function startApp() {
  const isLoggedIn = login();
  if (!isLoggedIn) return;

  const order = takeOrder();
  if (!order) return;

  const bill = splitBill(order.finalTotal);
  if (!bill) return;

  alert(
    "Hello " + order.name + "!\n" +
    "You ordered " + order.quantity + " " + order.coffeeType + "(s).\n" +
    "Original total: $" + order.originalTotal.toFixed(2) + "\n" +
    "Discount: $" + order.discount.toFixed(2) + "\n" +
    "Tip (" + bill.tipPercent + "%): $" + bill.tip.toFixed(2) + "\n" +
    "Total with tip: $" + bill.totalWithTip.toFixed(2) + "\n" +
    "Each person pays (" + bill.people + " people): $" + bill.perPerson.toFixed(2)
  );
}

startApp();
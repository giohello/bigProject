const select = document.getElementById("people");
const img1 = document.getElementById("personImg");
const h21 = document.getElementById("personName");
const inp = document.getElementById("custom");
const money = document.getElementById("money");
const logoutBtn = document.getElementById("logoutBtn");
const buySound = document.getElementById("buySound");
const sellSound = document.getElementById("sellSound");
const idleMusic = document.getElementById("idleMusic");
const toggleBtn = document.getElementById("toggleIdleMusic");

let currentMoney = 0;
let idleMusicOn = false,
  hasInteracted = false;
let billionaires = [];
let userMoney = 0;

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.reload();
});

function getLoggedInUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("You must be logged in to do this!");
    return null;
  }
  return user;
}

async function loadBillionaires() {
  try {
    const res = await fetch("http://localhost:3000/api/billionaires");
    billionaires = await res.json();
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "--select here--";
    select.appendChild(placeholder);

    const userOpt = document.createElement("option");
    userOpt.value = "user";
    userOpt.textContent = "Your Account";
    select.appendChild(userOpt);

    billionaires.forEach((b, idx) => {
      const opt = document.createElement("option");
      opt.value = `billionaire-${idx}`;
      opt.textContent = `${b.display.toLocaleString()}`;
      opt.dataset.img = b.img_url;
      opt.dataset.netWorth = b.netWorth;
      select.appendChild(opt);
    });
  } catch (e) {
    console.error("Failed to load billionaires:", e);
  }
}

function getUser() {
  const u = JSON.parse(localStorage.getItem("user"));
  if (!u) alert("You must be logged in to select this.");
  return u;
}

let previousSelect = "";

select.addEventListener("change", () => {
  const val = select.value;
  let img, name, amount;

  if (previousSelect === "user") {
    userMoney = currentMoney;
    const user = getLoggedInUser();
    if (user) {
      user.money = userMoney;
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  if (val === "user") {
    const u = getUser();
    img = u?.img_url || "./img/Default_pfp.svg.png";
    name = u?.username || "Your Account";
    amount = userMoney;
    inp.style.display = "block";
    inp.value = userMoney;
    currentMoney = userMoney;
  } else if (val.startsWith("billionaire-")) {
    inp.style.display = "none";
    const idx = parseInt(val.split("-")[1]);
    const b = billionaires[idx];
    img = b.img_url;
    name = `${b.display.toLocaleString()}`;
    amount = b.netWorth;
    currentMoney = b.netWorth;
  } else {
    img = "./img/Default_pfp.svg.png";
    name = "select your richy";
    amount = 0;
    inp.style.display = "none";
  }

  img1.src = img;
  h21.textContent = name;
  money.textContent = `$${currentMoney.toLocaleString()}`;

  previousSelect = val;
});

inp.addEventListener("input", () => {
  if (select.value === "user") {
    const val = Number(inp.value);
    if (!isNaN(val) && val >= 0) {
      currentMoney = val;
      userMoney = val;
      money.textContent = `$${val.toLocaleString()}`;
      const u = getUser();
      if (u) {
        u.money = val;
        localStorage.setItem("user", JSON.stringify(u));
        updateUserMoney();
      }
    }
  }
});

function updateOwnedAmounts(user) {
  const ownedElements = document.querySelectorAll(".ownedAmount");

  ownedElements.forEach((el) => {
    const itemId = el.dataset.id;
    const amount = user?.inventory?.[itemId] || 0;
    el.textContent = amount;
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  await loadBillionaires();
  const u = JSON.parse(localStorage.getItem("user"));
  if (u) {
    userMoney = u.money || 0;
    select.value = "user";
    select.dispatchEvent(new Event("change"));
  } else {
    select.value = "";
    select.dispatchEvent(new Event("change"));
  }
});

function buy(itemId) {
  const price = Number(
    document.getElementById(`price${itemId}`).textContent.replaceAll(",", "")
  );
  const quantityInput = document.querySelectorAll(".customNum")[itemId - 1];
  const quantity = Number(quantityInput?.value) || 1;
  const total = price * quantity;
  const user = getLoggedInUser();

  if (!user) return;

  if (currentMoney < total) {
    alert("Not enough money!");
    return;
  }

  currentMoney -= total;
  money.innerHTML = `$${currentMoney.toLocaleString()}`;

  if (!user.inventory) user.inventory = {};
  user.inventory[itemId] = (user.inventory[itemId] || 0) + quantity;

  user.money = currentMoney;
  localStorage.setItem("user", JSON.stringify(user));
  updateUserMoney();
  updateOwnedAmounts(user);
  buySound.currentTime = 0;
  buySound.play();
}

function sell(itemId) {
  const price = Number(
    document.getElementById(`price${itemId}`).textContent.replaceAll(",", "")
  );
  const quantityInput = document.querySelectorAll(".customNum")[itemId - 1];
  const quantity = Number(quantityInput?.value) || 1;
  const total = price * quantity;
  const user = getLoggedInUser();

  if (!user) return;

  const userInventory = user.inventory?.[itemId] || 0;

  if (userInventory < quantity) {
    alert("You don't have enough to sell!");
    return;
  }

  currentMoney += total;
  money.innerHTML = `$${currentMoney.toLocaleString()}`;

  user.inventory[itemId] -= quantity;
  if (user.inventory[itemId] <= 0) {
    delete user.inventory[itemId];
  }

  user.money = currentMoney;
  localStorage.setItem("user", JSON.stringify(user));
  updateUserMoney();
  updateOwnedAmounts(user);
  sellSound.currentTime = 0;
  sellSound.play();
}

function updateUserMoney() {
  const user = getLoggedInUser();
  const token = localStorage.getItem("token");

  if (!user) return;

  user.money = currentMoney;

  if (!user.inventory) user.inventory = {};
  localStorage.setItem("user", JSON.stringify(user));

  if (!token) return;

  fetch("http://localhost:3000/api/auth/money", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: user.email,
      money: currentMoney,
      inventory: user.inventory,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.ok) console.warn("Money not saved on server");
    })
    .catch((err) => console.error("Failed to save money:", err));
}

toggleBtn.addEventListener("click", () => {
  if (!hasInteracted) {
    hasInteracted = true;
    if (idleMusicOn) {
      idleMusic.volume = 0.4;
      idleMusic.play().catch((err) => console.warn("Audio play blocked:", err));
    }
  }

  idleMusicOn = !idleMusicOn;

  if (idleMusicOn) {
    idleMusic.play();
    toggleBtn.textContent = "Music: ON";
  } else {
    idleMusic.pause();
    toggleBtn.textContent = "Music: OFF";
  }
});

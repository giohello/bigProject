let select = document.getElementById('people');
let img1 = document.getElementById('personImg');
let h21 = document.getElementById('personName');
let inp = document.getElementById('custom');
let money = document.getElementById('money');
let num1 = 195000000000
let num2 = 194000000000
let num3 = 180000000000
let num4 = 177000000000
let num5 = 141000000000
let num6 = 133000000000
let num7 = 128000000000
let num8 = 121000000000
let num9 = 116000000000
let num10 = 114000000000
const buySound = document.getElementById('buySound');
const sellSound = document.getElementById('sellSound');
const idleMusic = document.getElementById('idleMusic');
const toggleBtn = document.getElementById('toggleIdleMusic');

let currentMoney = 0;
let idleMusicOn = false;
let hasInteracted = false;

select.addEventListener('change', () => {
    let answer = select.value;

    if (answer === 'user') {
    const user = JSON.parse(localStorage.getItem('user'));
    const rawImgUrl = user?.img_url;
    const proxyUrl = rawImgUrl
        ? `https://images.weserv.nl/?url=${encodeURIComponent(rawImgUrl)}&output=webp`
        : './img/Default_pfp.svg.png';

    img1.setAttribute('src', proxyUrl);

    img1.onerror = () => {
        img1.setAttribute('src', './img/Default_pfp.svg.png');
    };

    h21.innerHTML = user?.username || 'User';
    inp.style.display = "block";
    updateMoney();
    } else if (answer !== '') {
        img1.setAttribute('src', './img/Default_pfp.svg.png')
        let amountMatch = answer.match(/\d+/g);
        if (amountMatch) {
            let amount = Number(amountMatch.join(''));
            money.innerHTML = `$${amount.toLocaleString()}`;
        }
        h21.innerHTML = answer.split('$')[0];
        inp.style.display = "none";
    }

    if (answer === 'Elon Musk') {
        img1.setAttribute('src', "./img/richy pfp/elon-musk-gettyimages-2147789844-web-675b2c17301ea.png");
        currentMoney = num1;
        money.innerHTML = `$${currentMoney.toLocaleString()}`;
    }
    
    if (answer === 'Jeff Bezos') {
        img1.setAttribute('src', './img/richy pfp/2974.webp')
        currentMoney = num2;
        money.innerHTML = `$${currentMoney.toLocaleString()}`;
    }

    if (answer === 'Bernard Arnault') {
        img1.setAttribute('src','./img/richy pfp/IMG3534BA_large.png')
        currentMoney = num3;
        money.innerHTML = `$${currentMoney.toLocaleString()}`;
    }

    if (answer === 'Mark Zuckerberg') {
        img1.setAttribute('src', './img/richy pfp/1721292950344.jpg')
        currentMoney = num4;
        money.innerHTML = `$${currentMoney.toLocaleString()}`;
    }

    if (answer === 'Larry Ellison') {
        img1.setAttribute('src', './img/richy pfp/GettyImages-1183284106-e1737651356102.webp')
        currentMoney = num5;
        money.innerHTML = `$${currentMoney.toLocaleString()}`;
    }

    if (answer === 'Warren Buffett') {
        img1.setAttribute('src', './img/richy pfp/warren-buffett-1719825048.jpg')
        currentMoney = num6;
        money.innerHTML = `$${currentMoney.toLocaleString()}`;
    }

    if (answer === 'Bill Gates') {
        img1.setAttribute('src', './img/richy pfp/0x0.webp')
        currentMoney = num7;
        money.innerHTML = `$${currentMoney.toLocaleString()}`;
    }

    if (answer === 'Steve Ballmer') {
        img1.setAttribute('src', './img/richy pfp/ballmer-msft.jpg')
        currentMoney = num8;
        money.innerHTML = `$${currentMoney.toLocaleString()}`;
    }

    if (answer === 'Mukesh Ambani') {
        img1.setAttribute('src', './img/richy pfp/qC7Y5hfYRDNBfHqOpJQFLicYUd4cfJf-ySqS2Yj8Sg0.jpg')
        currentMoney = num9;
        money.innerHTML = `$${currentMoney.toLocaleString()}`;
    }

    if (answer === 'Larry Page') {
        img1.setAttribute('src', './img/richy pfp/failures-of-larry-page.jpg')
        currentMoney = num10;
        money.innerHTML = `$${currentMoney.toLocaleString()}`;
    }
});

inp.addEventListener('input', () => {
  if (select.value === 'user') updateMoney();
});

function updateMoney() {
    let customValue = Number(inp.value);
    if (!isNaN(customValue) && customValue > 0) {
        currentMoney = customValue;
        money.innerHTML = `$${currentMoney.toLocaleString()}`;

        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            user.money = currentMoney;
            localStorage.setItem('user', JSON.stringify(user));
        }

        updateUserMoney();
    } else {
        currentMoney = 0;
        money.innerHTML = "$0";
    }
}

function updateOwnedAmounts() {
    const user = JSON.parse(localStorage.getItem('user'));
    const ownedElements = document.querySelectorAll('.ownedAmount');

    ownedElements.forEach(el => {
        const itemId = el.dataset.id;
        const amount = user?.inventory?.[itemId] || 0;
        el.textContent = amount;
    });
}

window.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const nameEl = document.getElementById('personName');
  const imgEl = document.getElementById('personImg');
  const moneyEl = document.getElementById('money');
  const select = document.getElementById('people');
  const inp = document.getElementById('custom');
  const userOption = document.getElementById('userOption');

    if (user) {
    if (nameEl) nameEl.textContent = user.username;

    if (imgEl) {
      const rawImgUrl = user.img_url;
      const proxyUrl = rawImgUrl
          ? `https://images.weserv.nl/?url=${encodeURIComponent(rawImgUrl)}&output=webp`
          : './img/Default_pfp.svg.png';

      imgEl.src = proxyUrl;
      imgEl.onerror = () => {
        imgEl.src = './img/Default_pfp.svg.png';
      };
    }
    if (userOption) userOption.textContent = user.username;

    select.value = 'user';
    select.dispatchEvent(new Event('change'));

    if (moneyEl && typeof user.money === 'number') {
      moneyEl.innerHTML = `$${user.money.toLocaleString()}`;
      window.currentMoney = user.money;
      inp.value = user.money;
    }
  }
  updateOwnedAmounts();
});


function buy(itemId) {
    const price = Number(document.getElementById(`price${itemId}`).textContent.replaceAll(',', ''));
    const quantityInput = document.querySelectorAll('.customNum')[itemId - 1];
    const quantity = Number(quantityInput?.value) || 1;
    const total = price * quantity;

    if (currentMoney < total) {
        alert("Not enough money!");
        return;
    }

    currentMoney -= total;
    money.innerHTML = `$${currentMoney.toLocaleString()}`;

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user.inventory) user.inventory = {};
    user.inventory[itemId] = (user.inventory[itemId] || 0) + quantity;

    user.money = currentMoney;
    localStorage.setItem('user', JSON.stringify(user));
    updateUserMoney();
    updateOwnedAmounts();
    buySound.currentTime = 0;
    buySound.play();
}

function sell(itemId) {
    const price = Number(document.getElementById(`price${itemId}`).textContent.replaceAll(',', ''));
    const quantityInput = document.querySelectorAll('.customNum')[itemId - 1];
    const quantity = Number(quantityInput?.value) || 1;
    const total = price * quantity;

    const user = JSON.parse(localStorage.getItem('user'));
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
    localStorage.setItem('user', JSON.stringify(user));
    updateUserMoney();
    updateOwnedAmounts();
    sellSound.currentTime = 0;
    sellSound.play();
}

function updateUserMoney() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    user.money = currentMoney;

    if (!user.inventory) user.inventory = {};

    localStorage.setItem('user', JSON.stringify(user));

    fetch('/api/auth/money', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: user.email,
            money: currentMoney,
            inventory: user.inventory
        })
    }).then(res => res.json())
      .then(data => {
          if (!data.ok) console.warn('Money not saved on server');
      }).catch(err => console.error('Failed to save money:', err));
}


toggleBtn.addEventListener('click', () => {
    if (!hasInteracted) {
        hasInteracted = true;
        if (idleMusicOn) {
            idleMusic.volume = 0.4;
            idleMusic.play().catch(err => console.warn("Audio play blocked:", err));
        }
    }

    idleMusicOn = !idleMusicOn;

    if (idleMusicOn) {
        idleMusic.play();
        toggleBtn.textContent = 'Music: ON';
    } else {
        idleMusic.pause();
        toggleBtn.textContent = 'Music: OFF';
    }
});
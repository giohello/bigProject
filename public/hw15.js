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


select.addEventListener('change', () => {
    let answer = select.value;

    if (answer === 'custom') {
        img1.setAttribute('src', './img/Default_pfp.svg.png')
        h21.innerHTML = 'Custom';
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
        img1.setAttribute('src', "./img/richy pfp/elon-musk-gettyimages-2147789844-web-675b2c17301ea.jpg");
        money.innerHTML = '$' + Number(num1).toLocaleString()
    }
    
    if (answer === 'Jeff Bezos') {
        img1.setAttribute('src', './img/richy pfp/2974.webp')
        money.innerHTML = '$' + Number(num2).toLocaleString()
    }

    if (answer === 'Bernard Arnault') {
        img1.setAttribute('src','./img/richy pfp/IMG3534BA_large.png')
        money.innerHTML = '$' + Number(num3).toLocaleString()
    }

    if (answer === 'Mark Zuckerberg') {
        img1.setAttribute('src', './img/richy pfp/1721292950344.jpg')
        money.innerHTML = '$' + Number(num4).toLocaleString()
    }

    if (answer === 'Larry Ellison') {
        img1.setAttribute('src', './img/richy pfp/GettyImages-1183284106-e1737651356102.webp')
        money.innerHTML = '$' + Number(num5).toLocaleString()
    }

    if (answer === 'Warren Buffett') {
        img1.setAttribute('src', './img/richy pfp/warren-buffett-1719825048.jpg')
        money.innerHTML = '$' + Number(num6).toLocaleString()
    }

    if (answer === 'Bill Gates') {
        img1.setAttribute('src', './img/richy pfp/0x0.webp')
        money.innerHTML = '$' + Number(num7).toLocaleString()
    }

    if (answer === 'Steve Ballmer') {
        img1.setAttribute('src', './img/richy pfp/ballmer-msft.jpg')
        money.innerHTML = '$' + Number(num8).toLocaleString()
    }

    if (answer === 'Mukesh Ambani') {
        img1.setAttribute('src', './img/richy pfp/qC7Y5hfYRDNBfHqOpJQFLicYUd4cfJf-ySqS2Yj8Sg0.jpg')
        money.innerHTML = '$' + Number(num9).toLocaleString()
    }

    if (answer === 'Larry Page') {
        img1.setAttribute('src', './img/richy pfp/failures-of-larry-page.jpg')
        money.innerHTML = '$' + Number(num10).toLocaleString()
    }
});

inp.addEventListener('input', updateMoney);

function updateMoney() {
    let customValue = Number(inp.value);
    if (!isNaN(customValue) && customValue > 0) {
        money.innerHTML = `$${customValue.toLocaleString()}`;
    } else {
        money.innerHTML = "$0";
    }
}
async function register() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const img_url = document.getElementById("img_url").value;
  const msg = document.getElementById("authMsg");

  try {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, img_url }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      msg.style.color = "green";
      msg.textContent = "Registration successful! Redirecting...";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } else {
      msg.style.color = "red";
      msg.textContent = data.message || "Registration failed.";
    }
  } catch (err) {
    console.log(err);
    msg.textContent = "An error occurred during registration.";
  }
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("authMsg");

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      msg.style.color = "green";
      msg.textContent = "Login successful! Redirecting...";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } else {
      msg.style.color = "red";
      msg.textContent = data.message || "Login failed.";
    }
  } catch (err) {
    console.log(err);
    document.getElementById("authMsg").textContent = "An error occurred.";
  }
}

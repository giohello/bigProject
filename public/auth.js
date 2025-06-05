console.log("auth.js loaded");

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    const msg = document.getElementById('authMsg');

    if (response.ok) {
      msg.style.color = 'green';
      msg.textContent = 'Login successful! Redirecting...';
      // Redirect after short delay
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    } else {
      msg.style.color = 'red';
      msg.textContent = data.message || 'Login failed.';
    }
  } catch (err) {
    console.log(err);
    document.getElementById('authMsg').textContent = 'An error occurred.';
  }
}


async function signUp() {

  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  try {
    const response = await fetch(`http://localhost:3001/users/${username})`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username.value, email: email.value, password: password.value }),
    });

    if (response.ok) {
      const responseData = await response.json();
      console(responseData)
    } else {
      console.error('Error en la solicitud al servidor');
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
};



form.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        username: username.value,
        password: password.value
    })
  });

  let data = await res.json()

  if (data.token) {
    window.localStorage.setItem("token", data.token)
  }

  location.replace('/admin.html')

  username.value = null;
  password.value = null;
});

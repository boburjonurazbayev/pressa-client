let client = io(API, { transports: ["websocket", "polling"] });

form.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  let formData = new FormData()

  formData.append("event_date", date.value + ' ' + time.value);
  formData.append("event_category", category.value);
  formData.append("event_link", link.value);
  formData.append("event_type", findElement('input[name="event_type"]:checked').value,);
  formData.append("company", company.value);
  formData.append("organiser_fullname", fullname.value);
  formData.append("organiser_profession", profession.value);
  formData.append("organiser_tel1", contact1.value);
  formData.append("organiser_tel2", contact2.value);
  formData.append("post_title", title.value);
  formData.append("post_desc", description.value);
  formData.append("post_text", text.value);
  formData.append("post_image", img.files[0]);

  let res = await fetch(`${API}/events`, {
    method: "POST",
    body: formData
  })

  let data = await res.json()

  client.emit("new post", true)
});

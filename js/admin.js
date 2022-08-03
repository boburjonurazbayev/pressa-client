const elPostsTemplate = findElement("#post_template").content;
const elPostList = findElement(".post_list");
const elBtnActive = findElement("#active");
const elBtnCancel = findElement("#cancel");

let client = io(API, { transports: ["websocket", "polling"] });

let token = window.localStorage.getItem("token");

if (!token) location.replace("/index.html");

async function getPosts() {
  const res = await fetch(`${API}/events`, {
    headers: {
      token: token,
    },
  });

  let data = await res.json();

  return data;
}

async function renderPosts() {
  let posts = await getPosts();
  elPostList.innerHTML = null;

  if (posts.message != "succes") return;

  let unactivePosts = posts.data.filter((post) => post.status == "unactive");

  unactivePosts.forEach((e) => {
    let postsTemplate = elPostsTemplate.cloneNode(true);

    postsTemplate.querySelector(".post_item").dataset.id = e.event_id;
    postsTemplate.querySelector(".event_link").href = e.event_link;
    postsTemplate.querySelector(".event_type").textContent = e.event_type;
    postsTemplate.querySelector(".organiser_fullname").textContent =
      e.organiser_fullname;
    postsTemplate.querySelector(".organiser_profession").textContent =
      e.organiser_profession;
    postsTemplate.querySelector(".organiser_tel1").textContent =
      e.organiser_tel1;
    postsTemplate.querySelector(".organiser_tel2").textContent =
      e.organiser_tel2;
    postsTemplate.querySelector(".post_desc").textContent = e.post_desc;
    postsTemplate.querySelector(".post_image").src = API + "/" + e.post_image;
    postsTemplate.querySelector(".post_text").href = e.post_text;
    postsTemplate.querySelector(".post_title").href = e.post_title;
    postsTemplate.querySelector(".active").dataset.id = e.event_id;
    postsTemplate.querySelector(".cancel").dataset.id = e.event_id;
    postsTemplate.querySelector(".number").textContent = e.event_id;

    elPostList.appendChild(postsTemplate);
  });
}

renderPosts();

elPostList.addEventListener("click", async (evt) => {
  let formData1 = new FormData();

  if (evt.target.className == "active") {
    formData1.append("status", "active");
    formData1.append("event_id", String(evt.target.dataset.id));
    let res = await fetch(`${API}/events`, {
      method: "PUT",
      headers: {
        token: token,
      },
      body: formData1,
    });

    let data = await res.json();

    if (data.message == "succes") {
      renderPosts();
      client.emit("activate post", data.data);
    }
  }

  let formData2 = new FormData();

  if (evt.target.className == "cancel") {
    formData2.append("status", "cancelled");
    formData2.append("event_id", String(evt.target.dataset.id));
    let res = await fetch(`${API}/events`, {
      method: "PUT",
      headers: {
        token: window.localStorage.getItem("token"),
      },
      body: formData2,
    });

    let data = await res.json();

    if (data.message == "succes") {
      renderPosts();
      client.emit("cancel post", data.data);
    }
  }
});

const elPostsTemplate = findElement("#post_template").content;
const elPostList = findElement(".post_list");

let client = io(API, {transports: ["websocket", "polling"]})


client.on("render post", (data) => {

  let postTemplate = elPostsTemplate.cloneNode(true);

    postTemplate.querySelector(".event_link").href = data.event_link;
    postTemplate.querySelector(".event_type").textContent = data.event_type;
    postTemplate.querySelector(".organiser_fullname").textContent =
      data.organiser_fullname;
    postTemplate.querySelector(".organiser_profession").textContent =
      data.organiser_profession;
    postTemplate.querySelector(".organiser_tel1").textContent =
      data.organiser_tel1;
    postTemplate.querySelector(".organiser_tel2").textContent =
      data.organiser_tel2;
    postTemplate.querySelector(".post_desc").textContent = data.post_desc;
    postTemplate.querySelector(".post_image").src = API + "/" + data.post_image;
    postTemplate.querySelector(".post_text").href = data.post_text;
    postTemplate.querySelector(".post_title").href = data.post_title;
    postTemplate.querySelector(".number").textContent = data.event_id;

    elPostList.appendChild(postTemplate)

})

async function getPosts() {
  const res = await fetch(`${API}/events`);
  let data = await res.json();

  return data;
}

async function renderPosts() {
  let posts = await getPosts();
  elPostList.innerHTML = null;

  if (posts.message != "succes") return;

  posts.data.forEach((e) => {
    let postsTemplate = elPostsTemplate.cloneNode(true);

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
    postsTemplate.querySelector(".number").textContent = e.event_id;

    elPostList.appendChild(postsTemplate);
  });
}

renderPosts();

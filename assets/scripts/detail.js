const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const dataUrl = `https://api.tvmaze.com/shows/${id}`;

fetch(dataUrl)
  .then(res => res.json())
  .then(data => {
    let container = document.querySelector(".container");
    container.innerHTML = `
      <h1>${data.name}</h1>

      <img src="${data.image?.original}" width="400px" height="500px">

      <p><strong>Rating:</strong> ${data.rating?.average || "No rating"}</p>

      <p><strong>Language:</strong> ${data.language}</p>

      <p><strong>Genres:</strong> ${data.genres.join(", ")}</p>

      <p><strong>Status:</strong> ${data.status}</p>

      <p><strong>Premiered:</strong> ${data.premiered}</p>

    `;
  });

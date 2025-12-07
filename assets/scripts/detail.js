const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get("id")
const data = `https://api.tvmaze.com/shows/${id}`;
fetch(data).then(res=>res.json()).then(data=>{
    console.log(data)
    let container = document.querySelector(".container")
    container.innerHTML = `
        <h1>${data.name}</h1>
        <img src="${data.image?.original}" width="400px" height="500px">
        <p>Rating: ${data.rating.average}</p>
        <p>${data.summary}</p>
      `;
})
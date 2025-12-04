const data = "https://api.tvmaze.com/shows";
let mainBody = document.querySelector('.swiper-wrapper')
fetch(data).then(res=>res.json()).then(data=>{
    data.forEach(item => {
            mainBody.innerHTML += `    <div class="swiper-slide"><div class="card p-3 shadow">${item.name}</div></div>`
        
    });

})
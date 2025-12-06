const data = "https://api.tvmaze.com/shows";
let mainBody = document.querySelector('.swiper-wrapper')
const swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        0: { slidesPerView: 1 },
        576: { slidesPerView: 2 },
        992: { slidesPerView: 3 }
    }
});
fetch(data).then(res=>res.json()).then(data=>{
    data.forEach(item => {
            mainBody.innerHTML += `    <div class="swiper-slide"><div class="card p-3 shadow data-id="${item.id}">
            <img src = ${item.image?.original} width ="300px" height = "400px">
            <h5>${item.name}</h5>
            <div class="rating-div"><h4>  ${item.rating.average}</h4> <img src='.././image.png' width = "25px" height ="25px"></div>
            
            </div></div>`
        
    });

})
const searchInput = document.querySelector('.search-input')
searchInput.addEventListener("keyup",function(){
    const inputValue = searchInput.value.toLowerCase()
    const swiperSlide = document.querySelectorAll(".swiper-slide")
    swiperSlide.forEach(item=>{
        let name = item.querySelector("h5")
        name = name.innerText.toLowerCase().trim()
        if(name.includes(inputValue)){
            item.style.display = "block"
        }
        else{
            item.style.display = "none"

        }
    })
    swiper.update();  
})
const ratingDiv = document.querySelectorAll(".rating-div")
ratingDiv.forEach(item=>{

})
let mainBody = document.querySelector('.swiper-wrapper');
const searchInput = document.querySelector('.search-input');
let page = 1;
let limit = 4;
let films = [];

const swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: false,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: { 0: { slidesPerView: 1 }, 576: { slidesPerView: 2 }, 992: { slidesPerView: 3 } }
});

function addCardClickEvents() {
    const cards = document.querySelectorAll(".simple-card");
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const id = card.getAttribute("data-id");
            window.open(`detail.html?id=${id}`, "_blank");
        });
    });
}

function fetchData() {
    fetch(`https://api.tvmaze.com/shows?&select=key1,key2,key3`)
        .then(res => res.json())
        .then(data => {
            data.slice(220).forEach(item => {
                mainBody.innerHTML += `
                <div class="swiper-slide">
                    <div class="card p-3 shadow" data-id="${item.id}">
                        <img src="${item.image?.original}" width="310px" height="400px">
                        <h5>${item.name}</h5>
                        <div class="rating-div">
                            <h4>${item.rating.average ? item.rating.average : null}</h4>
                            <img src='.././image.png' width="25px" height="25px">
                        </div>
                    </div>
                </div>`;
            });

            const cards = document.querySelectorAll(".card");
            cards.forEach(card => {
                card.addEventListener("click", () => {
                    const id = card.getAttribute("data-id");
                    window.open(`detail.html?id=${id}`, "_blank");
                });
            });
        });
}

fetchData();

fetch(`https://api.tvmaze.com/shows?&select=key1,key2,key3`)
    .then(res => res.json())
    .then(data => {
        films = data;
        printData(data, page, limit);
    });

const cardsCont = document.querySelector(".cards-containerMain");

function printData(data, page, limit) {
    for (let i = (page - 1) * limit; i < limit * page; i++) {
        const item = data[i];
        cardsCont.innerHTML += `
        <div class="simple-card" data-id="${item.id}">
            <img class="card-image" src="${item.image?.medium}" width="200" height="300">
            <div class="card-content">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">Language: ${item.language}</p>
                <p class="card-text">Rating: ${item.rating?.average || "N/A"}</p>
            </div>
        </div>`;
    }

    addCardClickEvents();
}

const loadMore = document.querySelector('.load-more');
loadMore.addEventListener('click', function (e) {
    e.preventDefault();
    page++;
    printData(films, page, limit);
});

searchInput.addEventListener("input", function (e) {
    let searchValue = e.target.value.toLowerCase();
    let newFilmList;

    cardsCont.innerHTML = '';

    if (searchValue.length > 3) {
        newFilmList = films.filter(film => film.name.toLowerCase().includes(searchValue));
        for (let i = 0; i < newFilmList.length; i++) {
            const item = newFilmList[i];
            cardsCont.innerHTML += `
            <div class="simple-card" data-id="${item.id}">
                <img class="card-image" src="${item.image.original}" width="200" height="300">
                <div class="card-content">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.premiered}</p>
                </div>
            </div>`;
        }

        addCardClickEvents();
    } else {
        page = 1;
        printData(films, page, limit);
    }
});

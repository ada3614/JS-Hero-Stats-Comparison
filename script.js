const header = document.querySelector(".header");
const searchName = document.querySelector(".search-input");
const searchedHeroesContainer = document.querySelector(".search-container");

// hero details
const detailSectionContainer = document.querySelector(".section-hero-details");
const detailHeroName = document.querySelector(".hero-detail-name");
const detailHeroFullName = document.querySelector(".hero-detail-fullName");
// hero details POWERSTATS
const detailHeroStatsCombat = document.querySelector(
  ".powerstats-value .combat",
);
const detailHeroStatsDurability = document.querySelector(
  ".powerstats-value .durability",
);
const detailHeroStatsIntelligence = document.querySelector(
  ".powerstats-value .intelligence",
);
const detailHeroStatsPower = document.querySelector(".powerstats-value .power");
const detailHeroStatsSpeed = document.querySelector(".powerstats-value .speed");
const detailHeroStatsStrength = document.querySelector(
  ".powerstats-value .strength",
);

const getHeroList = () => {
  searchedHeroesContainer.innerHTML = "";
  fetch("https://akabab.github.io/superhero-api/api/all.json")
    .then((response) => response.json())
    .then((data) => {
      const heroName = searchName.value.toLowerCase();
      const heroes = data.filter((hero) =>
        hero.name.toLowerCase().includes(heroName),
      );
      console.log(heroes);
      heroes.forEach((hero) => {
        updateSearchedHeroes(hero);
      });
      // console.log(data);
    });
  // searchName.value = "";
};

function updateSearchedHeroes(heroData) {
  const {
    id: id,
    name: name,
    biography: { fullName },
    images: { sm },
  } = heroData;

  const searchedHeroHtml = `
   <div 
   data-id="${id}"
   class="search-item">
          <img
          class="hero-search-img"
            src=${sm}
            alt="hero-img"
          />
          <h2 class="hero-name">${name}</h2>
          <h3 class="hero-full-name">${fullName}</h2>
        </div>
  `;
  searchedHeroesContainer.insertAdjacentHTML("beforeend", searchedHeroHtml);
  searchName.value = "";
  console.log(heroData);
}

// get cliced hero data

async function getClickedHeroData(gameID) {
  const gameId = gameID;
  const response = await fetch(
    "https://akabab.github.io/superhero-api/api/id/" + gameID + ".json",
  );
  const data = await response.json();
  console.log(data);
  renderHeroData(data);
}

function renderHeroData(heroData) {
  const {
    name: name,
    biography: { fullName },
    images: { md },
    powerstats: { combat },
    powerstats: { durability },
    powerstats: { intelligence },
    powerstats: { power },
    powerstats: { speed },
    powerstats: { strength },
  } = heroData;

  const heroDetailHtml = `
        <div class="hero-detail-container">
          <img
            src=${md}
            alt=""
            class="hero-detail-img"
          />
          <div class="hero-detail-main-info">
            <div class="hero-detail-name-wrapper">
              <h2 class="hero-detail-name">${name}</h2>
              <!-- <h3 class="brake-line">/</h3> -->
              <h3 class="hero-detail-fullName">${fullName}</h3>
            </div>
            <div class="hero-detail-powerstats">
              <div class="combat powerstats-wrapper">
                <h3 class="powerstats-title combat">combat</h3>
                <h3 class="powerstats-value combat">${combat}</h3>
              </div>
              <div class="durability powerstats-wrapper">
                <h3 class="powerstats-title durability">durability</h3>
                <h3 class="powerstats-value durability">${durability}</h3>
              </div>
              <div class="intelligence powerstats-wrapper">
                <h3 class="powerstats-title intelligence">intelligence</h3>
                <h3 class="powerstats-value intelligence">${intelligence}</h3>
              </div>
              <div class="power powerstats-wrapper">
                <h3 class="powerstats-title power">power</h3>
                <h3 class="powerstats-value power">${power}</h3>
              </div>
              <div class="speed powerstats-wrapper">
                <h3 class="powerstats-title speed">speed</h3>
                <h3 class="powerstats-value speed">${speed}</h3>
              </div>
              <div class="strength powerstats-wrapper">
                <h3 class="powerstats-title strength">strength</h3>
                <h3 class="powerstats-value strength">${strength}</h3>
              </div>
            </div>
          </div>
        </div>
  `;
  detailSectionContainer.insertAdjacentHTML("beforeend", heroDetailHtml);
  detailSectionContainer.style.display = "flex";
}

// EVENT LISTENERS

searchName.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    getHeroList();
  }
});

searchedHeroesContainer.addEventListener("click", (event) => {
  const searchItem = event.target.closest(".search-item");
  const searchItemId = searchItem.dataset.id;
  getClickedHeroData(searchItemId);
});

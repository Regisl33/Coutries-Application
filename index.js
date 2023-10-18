//Variables
const display = document.querySelector(".countries-container");
let data = [];

//Functions
async function fecthData() {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((res) => (data = res));

  data.sort((a, b) => b.population - a.population);
}
function displayData() {
  display.innerHTML = data
    .filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(inputSearch.value.toLowerCase())
    )
    .splice(0, inputRange.value)
    .map(
      (country) =>
        `
    <div class="card">
      <img src=${country.flags.png} alt="${country.name.common}'s flag">
      <h2>${country.name.common}</h2>
      <p>${country.capital}</p>
      <span> Population : ${country.population}</span>
    </div>
  `
    )
    .join(" ");
}
//Application
fecthData().then(() => displayData());

inputSearch.addEventListener("input", (e) => {
  displayData();
});
inputRange.addEventListener("input", (e) => {
  rangeValue.textContent = inputRange.value;
  displayData();
});

minToMax.addEventListener("click", () => {
  data.sort((a, b) => a.population - b.population);
  displayData();
});
maxToMin.addEventListener("click", () => {
  data.sort((a, b) => b.population - a.population);
  displayData();
});
alpha.addEventListener("click", () => {
  data.sort(function (a, b) {
    if (a.name.common < b.name.common) {
      return -1;
    }
    if (a.name.common > b.name.common) {
      return 1;
    }
    return 0;
  });
  displayData();
});

const dreamDestination = [];
const userTripPlanDiv = document.getElementById("user_TripPlan_div");

//Function to get item in local dtorage
function readTripPlan() {
  const dreamDestination = localStorage.getItem("dreamDestination");
  if (dreamDestination !== null) {
    return JSON.parse(dreamDestination);
  }
  return [];
}

//function to add the trip plan
function addTripPlan(tripPlan) {
  const dreamDestination = readTripPlan();
  dreamDestination.push(tripPlan);
  showTripPlanList();
  localStorage.setItem("dreamDestination", JSON.stringify(dreamDestination));
}

//LFunction to display the trip plan
function showTripPlan(tripPlan, index) {
  const tripPlanSection = document.createElement("section");
  const removeButton = document.createElement("button");
  tripPlanSection.innerHTML = `
  <div id="destinationDiv">
  <section id="desSection">
  <h1 id="city">Visit ${tripPlan.city} city</h1>
  <h2 id="country">located in ${tripPlan.country}</h2>
  <h3 id="year">on ${tripPlan.year}</h3>
  </section>
  </div>`;
  removeButton.innerHTML = `<p id="removebutton" >Remove ${tripPlan.country} from the list</p>`;
  userTripPlanDiv.appendChild(tripPlanSection);
  tripPlanSection.appendChild(removeButton);

  removeButton.addEventListener("click", () => {
    const dreamDestination = readTripPlan();
    dreamDestination.splice(index, 1);
    localStorage.setItem("dreamDestination", JSON.stringify(dreamDestination));
    showTripPlanList();
  });
}
//function to display the trip plan in list
function showTripPlanList(Destination) {
  userTripPlanDiv.innerHTML = "";
  const dreamDestination = readTripPlan();
  const filteredCountries = dreamDestination.filter(
    (singleCountry) => singleCountry !== Destination
  );
  console.log(filteredCountries);
  dreamDestination.forEach(showTripPlan);
}

//Input from the user
const TripPlanForm = document.getElementById("form");
const countryInput = document.getElementById("country-input");
const cityInput = document.getElementById("city-input");
const yearInput = document.getElementById("year-of-visit-input");

//On submit button trip plan will be added to the list
function onSubmit(event) {
  event.preventDefault();

  const country = countryInput.value;
  const city = cityInput.value;
  const year = yearInput.value;

  addTripPlan({
    country: country,
    city: city,
    year: year
  });

  TripPlanForm.reset();
  showTripPlanList();

  console.log(dreamDestination);
}
TripPlanForm.addEventListener("submit", onSubmit);
showTripPlanList();

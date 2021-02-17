
//array of destinations
const destinations = [
  {
    Des_name: "Basel",
    Visited_date: "13th june 2020",
    Description:
      "Basel is located in northern Switzerland, the historic city of Basel straddles the Rhine River and borders both Germany and France. The Rhine River curves through Basel, dividing the city into two parts. "
  },
  {
    Des_name: "Laufenburg",
    Visited_date: "3rd nov 2019",
    Description:
      "Laufenburg is a small city in Baden-Württemberg, Germany, part of the Waldshut district. Laufenburg is separated from a Swiss city with the same name on the river Rhine. It was great to see a town not just divided between two cities/states but between the two countries."
  },
  {
    Des_name: "Switzerland",
    Visited_date: "5th feb 2020",
    Description:
      "The Rhine Falls / Rheinfall is a waterfall located in Schaffhausen Switzerland and the most powerful waterfall in Europe. The falls are located on the High Rhine on the border between the cantons of Schaffhausen (SH) and Zürich (Zurich), between the municipalities of Neuhausen, am Rheinfall (SH) and Laufen-Uhwiesen/Sachsen (ZH), next to the town of Schaffhausen in northern Switzerland."
  },
  {
    Des_name: "Bad Säckingen",
    Visited_date: "11th april 2020",
    Description:
      "Bad Säckingen is a rural town in the administrative district of Waldshut in the state of Baden-Württemberg in Germany. Bad Säckingen is located in the very southwest of Germany next to the Swiss border on the river Rhine. The city lies on the southern edge of the Black Forest area. The Bad Säckingen wooden bridge connects the German city ​​of Bad Säckingen with the municipality of Stein in Switzerland."
  },
  {
    Des_name: "Titisee",
    Visited_date: "23th may 2020",
    Description:
      "The Titisee is a lake in the southern Black Forest in Baden-Württemberg. It covers an area of 1.3 km2 (320 acres) and is an average of 20 m (66 ft) deep. It owes its formation to the Feldberg glacier, the moraines of which were formed in the Pleistocene epoch and nowadays form the shores of the lake. The lake's outflow, at 840 m (2,760 ft) above sea level, is the River Gutach, which merges with the Haslach stream below Kappel to form the Wutach). The waters of the Titisee thus drain eventually into the Upper Rhine between Tiengen and Waldshut. On the north shore lies the spa town of the same name, today a part of the municipality of Titisee-Neustadt."
  }
];
console.log(destinations);
localStorage.setItem("destinations", JSON.stringify(destinations));
const destinationsFromLocalStorage = JSON.parse(
  localStorage.getItem("destinations")
);
console.log(destinationsFromLocalStorage);

const destination_list = document.getElementById("destination-list");
const destination_blog = document.getElementById("destination-blog");
//Display Blog Function
function DisplayBlog(destination) {
  let destination_list_name = document.createElement("li");

  destination_list_name.addEventListener("click", async (onClick) => {
    //display blogcontent
    destination_blog.innerHTML = blogContent(destination);
    const coordinates = await showdestinationtemp(destination.Des_name);
    //display map
    initMap(coordinates);
    return;
  });

  destination_list_name.innerHTML = `${destination.Des_name} <button id="blogbutton" type="submit">Blog</botton>`;
  destination_list.appendChild(destination_list_name);
}
//displayblog for each of the destination
destinations.forEach((destination) => {
  DisplayBlog(destination);
});
//Blogcontent function
function blogContent(destination) {
  let content = `
  <div id="destinationDiv">
  <section id="desSection">
  <h1 id="desName">${destination.Des_name}</h1>
  <h3 id="desDate">${destination.Visited_date}</h3>
  <p id="desDescription">${destination.Description}</p>
  <p id="temp-par"></p>
  <div id="map"></div>
  </section>
  </div>`;
  return content;
}
//To show the destination temperature function
//Api Id for Google Map: AIzaSyDkFqIwL_l-Z8ROcOkCZXBuOzN0JJM1sRk
function showdestinationtemp(destination) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=18ebb74c4c845cd84cc98885effee0ae&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const temppar = document.getElementById("temp-par");
      if (data.cod !== 200) {
        temppar.innerHTML = "No weather information.";
      } else {
        temppar.innerHTML = `The temperature in ${destination} is ${data.main.temp}
and feel like ${data.main.feels_like}`;
      }
      if (data.cod === 200) {
        let coordinates = { lat: data.coord.lat, lon: data.coord.lon };
        return coordinates;
      } else {
        return "no map";
      }
    });
}
//show map function
function initMap(coordinates) {
  //Map options
  var options = {
    zoom: 8,
    center: {
      lat: coordinates.lat,
      lng: coordinates.lon
    }
  };

  //New map
  var map = new google.maps.Map(document.getElementById("map"), options);
  //Marker for the destination
  var marker = new google.maps.Marker({
    position: {
      lat: coordinates.lat,
      lng: coordinates.lon
    },
    map: map
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const temperatureFields = document.querySelector(".temp");
  const locationFields = document.querySelector(".temp_location p");
  const dataandTimeFields = document.querySelector(".temp_location span");
  const conditionFields = document.querySelector(".condition p");
  const searchField = document.querySelector(".search_area");
  const form = document.querySelector("form");

  form.addEventListener("submit", searchForLocation);

  const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=41e7bfe5b62340eca16130834241707&q=${targetLocation}&aqi=no`;
    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log(data);

      let locationName = data.location.name;
      let time = data.location.localtime;
      let temp = data.current.temp_c;
      let condition = data.current.condition.text;
      console.log(time, temp, condition);

      updateDetails(temp, locationName, time, condition);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  function updateDetails(temp, locationName, time, condition) {
    let splitDate = time.split(" ")[0];
    let splitTime = time.split(" ")[1];

    let currentDay = getDayName(new Date(splitDate).getDay());
    temperatureFields.innerText = `${temp}°C`;
    locationFields.innerText = locationName;
    dataandTimeFields.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionFields.innerText = condition;
  }

  function searchForLocation(e) {
    e.preventDefault();
    const target = searchField.value.trim();
    if (target) {
      fetchResults(target);
    } else {
      alert("Please enter a location");
    }
  }

  function getDayName(number) {
    switch (number) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "";
    }
  }
});

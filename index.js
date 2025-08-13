
const apiKey = "bf67340a791548960b98451e4cc49818";
const weatherDataDiv = document.querySelector(".weather-data");

async function fetchWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Ficksburg,ZA&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      weatherContainer.innerHTML = `<p>Error: ${data.message}</p>`;
      return;
    }

    weatherDataDiv.innerHTML = `
    <h3>${data.name}</h3>
    <p>${data.weather[0].description}</p>
    <p>🌡 Temp: ${data.main.temp}°C</p>
    <p>💨 Wind: ${data.wind.speed} m/s</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
  `;
  } catch (error) {
    weatherDataDiv.innerHTML = `<p>Failed to load weather data.</p>`;
    console.error(error);
  }
}

fetchWeather();

const eventsData = {
  labels: [
    "Ficksburg Marathon",
    "Heritage Day Celebration",
    "Setsoto Soul Sessions",
    "Cherry Festival",
    "Cherry Jazz Festival",
  ],
  datasets: [
    {
      label: "2023",
      data: [500, 800, 600, 2000, 1500],
      backgroundColor: "rgba(145, 126, 18, 0.7)",
    },
    {
      label: "2024",
      data: [650, 900, 700, 2200, 1600],
      backgroundColor: "rgba(5, 71, 19, 0.6)",
    },
    {
      label: "2025",
      data: [700, 950, 750, 2500, 1700],
      backgroundColor: "rgba(201, 61, 6, 0.6)",
    },
  ],
};

function convertToPercentages(dataArray) {
  const maxAttendance = Math.max(...dataArray);
  return dataArray.map(value => ((value / maxAttendance) * 100).toFixed(1));
}

const eventsDataPercent = {
  labels: eventsData.labels,
  datasets: eventsData.datasets.map(dataset => ({
    label: dataset.label + " (%)",
    data: convertToPercentages(dataset.data),
    backgroundColor: dataset.backgroundColor,
  })),
};

const ctx = document.getElementById("events-chart").getContext("2d");
new Chart(ctx, {
  type: "bar",
  data: eventsDataPercent,
  options: {
    responsive: true,
    plugins: {
      legend: { 
        position: "top",
        labels:{
            font: { size: 14, family: "Arial, sans-serif" },
          color: "#333",
        },
    },
      title: {
        display: true,
        text: "Event Attendance Percentages (2023-2025)",
        font: { size: 18, weight: "bold" },
        color: "#222",
      },
    },
    tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        cornerRadius: 6,
        callbacks: {
          label: (context) => `${context.raw}% attendance`,
        },
      },
    },
    scales:{
    x: {
        grid: { display: false },
        ticks: { color: "#555", font: { size: 12 } },
      },
      y: {
        grid: { color: "rgba(0,0,0,0.05)" },
        ticks: { color: "#555", font: { size: 12 }, stepSize: 20 },
        title: {
          display: true,
          text: "Attendance (%)",
          color: "#333",
          font: { size: 14 },
        },
      },
    },
    animation: {
        duration: 1200,
        easing: "easeOutQuart",
      },
  });
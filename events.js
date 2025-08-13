const eventsListContainer = document.getElementById('event-list');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const sortBySelect = document.getElementById('sort-by');
const yearFilter = document.getElementById('year-filter');
const filterButtons = document.querySelectorAll(".filter-btn");
const contentDiv = document.getElementById('event-content');
const addEventForm = document.getElementById('add-event-form');

let selectedCategory = "all";

const allEvents = [
  { title: 'Ficksburg Charity Fun Run', date: '15 March 2023', time: '6:00 AM', location: 'Ficksburg Old Age Home', category: 'Fun Run Event', year: 2023 },
  { title: 'Ficksburg Got Talent Show', date: '15 September 2023', time: '11:00 AM', location: 'Town Hall', category: 'Ficksburg Got Talent Show', year: 2023 },
  { title: 'Ficksburg Cherry Festival', date: '20 November 2023', time: '10:00 AM', location: 'Ficksburg Showground', category: 'FunFair Event', year: 2023 },
  { title: 'Ficksburg Cherry Jazz Festival', date: '29 November 2023', time: '8:00 PM', location: 'Ficksburg Showground', category: 'Jazz Music Festival', year: 2023 },
  { title: 'Ficksburg Charity Fun Run', date: '15 March 2024', time: '6:00 AM', location: 'Ficksburg Primary School', category: 'Fun Run Event', year: 2024 },
  { title: 'Ficksburg Got Talent Show', date: '15 September 2024', time: '10:00 AM', location: 'Town Hall', category: 'Ficksburg Got Talent Show', year: 2024 },
  { title: 'Ficksburg Cherry Festival', date: '20 November 2024', time: '09:00 AM', location: 'Ficksburg Showground', category: 'FunFair Event', year: 2024 },
  { title: 'Ficksburg Cherry Jazz Festival', date: '29 November 2024', time: '8:00 PM', location: 'Ficksburg Showground', category: 'Jazz Music Festival', year: 2024 },
  { title: 'Little Angels Pre-School Outreach', date: '30 August 2025', time: '2:00 PM', location: 'Katlehong, Zone 8', category: 'Fundraising Event', year: 2025 },
  { title: 'Ficksburg Marathon', date: '25 October 2025', time: '6:00 AM', location: 'Ficksburg High School', category: 'Fun Run Event', year: 2025 },
  { title: 'Ficksburg Heritage Day Celebration', date: '27 September 2025', time: '10:00 AM', location: 'Meqheleng Stadium', category: 'Cultural Event Celebration', year: 2025 },
  { title: 'Setsoto Radio Festival', date: '16 November 2025', time: '1:00 PM', location: 'Caravan Park', category: 'Sunday Soul Music Festival', year: 2025 },
  { title: 'Ficksburg Cherry Festival', date: '22 November 2025', time: '8:00 AM', location: 'Ionia Cherry Farm', category: 'FunFair Event', year: 2025 },
  { title: 'Ficksburg Cherry Festival', date: '12 November 2025', time: '8:00 PM', location: 'Ficksburg Showgrounds', category: 'Jazz Music Festival', year: 2025 },
];

const eventDetails = {
  "Fundraising Event": {
    text: `Fundraising events in Ficksburg bring the community together to support local causes. These occasions include charity drives, auctions, and outreach programs aimed at making a positive impact.`,
    img: "images/community outreach-8042458.jpg"
  },
  "Fun Run Event": {
    text: `The Fun Run events are exciting races encouraging fitness and community participation. Runners of all ages join to enjoy the outdoors and promote healthy lifestyles.`,
    img: "images/fun run.PNG"
  },
  "Cultural Event Celebration": {
    text: `Cultural celebrations in Ficksburg highlight the rich heritage of the region, featuring traditional music, dance, crafts, and food that bring the community together.`,
    img: "images/Heritage-10956272-16175759.jpg"
  },
  "Sunday Soul Music Festival": {
    text: `The Sunday Soul Music Festival offers soulful live music performances in a relaxed atmosphere. Fans gather to enjoy R&B, gospel, and classic soul sounds.`,
    img: "images/sundaysoul.PNG"
  },
  "FunFair Event": {
    text: `FunFair events bring joy and excitement to all ages with rides, games, delicious food stalls, and family-friendly entertainment.`,
    img: "images/Funfair-33293300.jpg"
  },
  "Jazz Music Festival": {
    text: `The Jazz Music Festival showcases talented local and international jazz artists. It’s an elegant event filled with smooth rhythms and soulful melodies.`,
    img: "images/cherry jazz festival.PNG"
  },
  "Ficksburg Got Talent Show": {
    text: `Ficksburg Got Talent is an exciting platform for singers, dancers, magicians, and performers to showcase their skills and entertain the community.`,
    img: "images/pexels-talentshow-9002000.jpg"
  },
  "all": {
    text: `Welcome to Ficksburg Events! Select an event category above to learn more about the exciting happenings in our community, complete with images and details.`,
    img: "images/ficksburg-entrance.PNG"
  }
};

function renderEvents(events) {
  eventsListContainer.innerHTML = '';

  if (events.length === 0) {
    eventsListContainer.innerHTML = '<p>No events found.</p>';
    contentDiv.innerHTML = '';
    return;
  }

  events.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    eventCard.innerHTML = `
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Time:</strong> ${event.time}</p>
      <p><strong>Category:</strong> ${event.category}</p>
      <p><strong>Location:</strong> ${event.location || 'To be announced'}</p>
    `;
    eventCard.addEventListener("click", () => showModal(event));
    eventsListContainer.appendChild(eventCard);
  });
}

function applyFilters() {
  const keyword = searchInput.value.trim().toLowerCase();
  const selectedYear = yearFilter.value;

  const filtered = allEvents.filter(event => {
    const matchSearch =
      event.title.toLowerCase().includes(keyword) ||
      event.category.toLowerCase().includes(keyword);
    const matchCategory =
      selectedCategory === "all" || event.category === selectedCategory;
    const matchYear = selectedYear ? event.year == selectedYear : true;

    return matchSearch && matchCategory && matchYear;
  });

  renderEvents(filtered);
  showEventDetails(selectedCategory);
}

function showEventDetails(category) {
  const details = eventDetails[category] || eventDetails["all"];
  contentDiv.innerHTML = `
    <h3>${category === "all" ? "All Events" : category}</h3>
    <p>${details.text}</p>
    <img src="${details.img}" alt="${category}" style="max-width:100%; border-radius:8px; margin-top:10px;" />
  `;
}

function showModal(event) {
  alert(`Event: ${event.title}\nDate: ${event.date}\nTime: ${event.time}\nCategory: ${event.category}\nLocation: ${event.location || 'TBA'}`);
}

function toggleOtherCategoryInput() {
  const categorySelect = document.getElementById("event-category");
  const otherInput = document.getElementById("other-category-input");
  if (categorySelect.value === "Other") {
    otherInput.style.display = "block";
    otherInput.required = true;
  } else {
    otherInput.style.display = "none";
    otherInput.required = false;
    otherInput.value = "";
  }
}

addEventForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("event-title").value.trim();
  const date = document.getElementById("event-date").value;
  const time = document.getElementById("event-time").value;
  const location = document.getElementById("event-location").value.trim();
  const categorySelect = document.getElementById("event-category");
  const otherCategoryInput = document.getElementById("other-category-input");

  let category = categorySelect.value;
  if (category === "Other") {
    category = otherCategoryInput.value.trim();
    if (!category) {
      alert("Please enter a custom category.");
      return;
    }
  }

  if (!title || !date || !time || !location || !category) {
    alert("Please fill in all fields.");
    return;
  }

  const year = new Date(date).getFullYear();

  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Date(date).toLocaleDateString('en-GB', options);

  const newEvent = {
    title,
    date: formattedDate,
    time,
    location,
    category,
    year,
  };

  allEvents.push(newEvent);

  addEventForm.reset();
  toggleOtherCategoryInput();

  applyFilters();

  alert("New event added successfully!");
});

searchBtn.addEventListener("click", applyFilters);
searchInput.addEventListener("keypress", e => {
  if (e.key === "Enter") applyFilters();
});
yearFilter.addEventListener("change", applyFilters);

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    selectedCategory = button.dataset.category;
    applyFilters();
  });
});

renderEvents(allEvents);
showEventDetails("all");
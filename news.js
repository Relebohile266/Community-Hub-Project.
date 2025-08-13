document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".news-tabs .tab");
    const contents = {
      daily: document.getElementById("daily-news"),
      weekly: document.getElementById("weekly-news"),
      monthly: document.getElementById("monthly-news"),
    };
  
    const newsFormModal = document.getElementById("newsFormModal");
    const newsForm = document.getElementById("newsForm");
    const imageInput = document.getElementById("newsImage");
    const imagePreview = document.getElementById("imagePreview");
    const closeModalBtn = document.getElementById("closeModal");
  
    window.showNews = function(type) {
      tabs.forEach(tab => {
        tab.classList.toggle("active", tab.textContent.toLowerCase().includes(type));
      });
  
      for (const key in contents) {
        contents[key].style.display = key === type ? "block" : "none";
      }
    };
  
    window.openNewsForm = function() {
      newsFormModal.style.display = "block";
    };
  
    function closeModal() {
      newsFormModal.style.display = "none";
      newsForm.reset();
      imagePreview.innerHTML = "";
    }
  
    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", closeModal);
    }
  
    newsFormModal.addEventListener("click", e => {
      if (e.target === newsFormModal) {
        closeModal();
      }
    });
  
    imageInput.addEventListener("change", () => {
      imagePreview.innerHTML = "";
      const file = imageInput.files[0];
      if (file) {
        const img = document.createElement("img");
        img.style.maxWidth = "200px";
        img.style.maxHeight = "150px";
        img.style.borderRadius = "5px";
        img.alt = "News Image Preview";
        img.src = URL.createObjectURL(file);
        imagePreview.appendChild(img);
      }
    });
  
    newsForm.addEventListener("submit", e => {
      e.preventDefault();
  
      const title = document.getElementById("newsTitle").value.trim();
      const type = document.getElementById("newsType").value;
      const content = document.getElementById("newsContent").value.trim();
  
      if (!title || !type || !content) {
        alert("⚠ Please fill in all required fields.");
        return;
      }
      const card = document.createElement("div");
      card.className = "card";
  
      const h3 = document.createElement("h3");
      h3.textContent = title;
  
      const p = document.createElement("p");
      p.textContent = content;
  
      card.appendChild(h3);
  
      if (imageInput.files.length > 0) {
        const img = document.createElement("img");
        img.style.maxWidth = "100%";
        img.style.borderRadius = "5px";
        img.alt = title + " image";
        img.src = URL.createObjectURL(imageInput.files[0]);
        card.appendChild(img);
      }
  
      card.appendChild(p);
  
      const span = document.createElement("span");
      const now = new Date();
      span.textContent = `Posted: ${now.toLocaleString()}`;
      card.appendChild(span);
  
      const section = contents[type];
      if (section) {
        const grid = section.querySelector(".grid");
        if (grid) {
          grid.prepend(card);
        }
      }
  
      alert("✅ News submitted successfully!");
  
      closeModal();
    });
  });
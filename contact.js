document.querySelectorAll(".social-media a").forEach(icon => {
    icon.addEventListener("mouseenter", () => {
      icon.style.transform = "rotate(10deg) scale(1.2)";
    });
    icon.addEventListener("mouseleave", () => {
      icon.style.transform = "rotate(0) scale(1)";
    });
  });
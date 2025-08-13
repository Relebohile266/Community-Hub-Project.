document.addEventListener("DOMContentLoaded", () => {
    function togglePasswordVisibility(id, icon) {
      const input = document.getElementById(id);
      if (input.type === "password") {
        input.type = "text";
        icon.textContent = "👁";
      } else {
        input.type = "password";
        icon.textContent = "👁";
      }
    }
  
    document.querySelectorAll(".toggle-password").forEach(icon => {
      icon.style.cursor = "pointer";
      icon.addEventListener("click", () => {
        const targetId = icon.getAttribute("data-target");
        togglePasswordVisibility(targetId, icon);
      });
    });
  
    const form = document.getElementById("signup-form");
    form.addEventListener("submit", e => {
      e.preventDefault();
      console.log("Submit triggered");
  
      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirm-password").value.trim();
  
      console.log({ username, email, password, confirmPassword });
      
      if (!username || !email || !password || !confirmPassword) {
        alert("⚠ Please fill in all fields.");
        return;
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("⚠ Please enter a valid email address.");
        return;
      }
  
      if (password !== confirmPassword) {
        alert("⚠ Passwords do not match.");
        return;
      }
  
      alert("✅ Signup successful! You can now log in.");
      form.reset();
    });
  });
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".toggle-password").forEach(icon => {
        icon.addEventListener("click", () => {
            const targetId = icon.getAttribute("data-target");
            const input = document.getElementById(targetId);

            if (input.type === "password") {
                input.type = "text";
                icon.textContent = "👁";
            } else {
                input.type = "password";
                icon.textContent = "👁"; 
            }
        });
    });

    document.getElementById("forgot-link").addEventListener("click", e => {
        e.preventDefault();
        document.getElementById("signin-form").style.display = "none";
        document.getElementById("reset-form").style.display = "block";
    });

   
    document.getElementById("back-to-login").addEventListener("click", e => {
        e.preventDefault();
        document.getElementById("reset-form").style.display = "none";
        document.getElementById("signin-form").style.display = "block";
    });

   
    document.getElementById("signin-form").addEventListener("submit", e => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            alert("⚠ Please fill in all fields.");
            return;
        }

        alert("✅ Login successful!");
    });

  
    document.getElementById("reset-form").addEventListener("submit", e => {
        e.preventDefault();

        const email = document.getElementById("reset-email").value.trim();
        const newPassword = document.getElementById("new-password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();

        if (!email || !newPassword || !confirmPassword) {
            alert("⚠ Please fill in all fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("⚠ Passwords do not match.");
            return;
        }

        alert("✅ Password reset successful. Please log in.");
        document.getElementById("reset-form").style.display = "none";
        document.getElementById("signin-form").style.display = "block";
    });
});
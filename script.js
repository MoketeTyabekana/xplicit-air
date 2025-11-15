// Set current year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Email button click handler
document.getElementById("emailBtn").addEventListener("click", () => {
  window.location.href = "mailto:info@xplicitair.co.za?subject=Service Inquiry from Website";
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});


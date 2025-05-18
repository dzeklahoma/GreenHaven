// Header scroll effect
const header = document.getElementById("header");
const mobileToggle = document.querySelector(".mobile-toggle");
const servicesDropdownMobile = document.querySelector(".services-dropdown");

// Scroll effect for header
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Mobile menu toggle
mobileToggle.addEventListener("click", () => {
  document.body.classList.toggle("nav-active");

  const spans = mobileToggle.querySelectorAll("span");
  if (document.body.classList.contains("nav-active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
  } else {
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

// Mobile dropdown toggle
if (window.innerWidth <= 768) {
  servicesDropdownMobile.addEventListener("click", (e) => {
    if (
      e.target.closest(".services-dropdown") &&
      !e.target.closest(".dropdown-menu")
    ) {
      servicesDropdownMobile.classList.toggle("active");
      e.preventDefault();
    }
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href") !== "#") {
      e.preventDefault();

      // Close mobile menu if open
      if (document.body.classList.contains("nav-active")) {
        document.body.classList.remove("nav-active");
        mobileToggle.querySelectorAll("span").forEach((span) => {
          span.style.transform = "none";
        });
        mobileToggle.querySelectorAll("span")[1].style.opacity = "1";
      }

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
          top: targetPosition - headerHeight,
          behavior: "smooth",
        });
      }
    }
  });
});

// Gallery Functionality
const galleryTrack = document.querySelector(".gallery-track");
const slides = Array.from(document.querySelectorAll(".gallery-slide"));
const prevArrow = document.querySelector(".prev-arrow");
const nextArrow = document.querySelector(".next-arrow");
let currentIndex = 2; // Start with the center slide active

// Initialize gallery
function initGallery() {
  updateGallery();

  // Event listeners for arrows
  prevArrow.addEventListener("click", () => {
    navigateGallery("prev");
  });

  nextArrow.addEventListener("click", () => {
    navigateGallery("next");
  });

  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      navigateGallery("prev");
    } else if (e.key === "ArrowRight") {
      navigateGallery("next");
    }
  });

  // Add swipe functionality for touch devices
  let touchStartX = 0;
  let touchEndX = 0;

  galleryTrack.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  galleryTrack.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      navigateGallery("next");
    } else if (touchEndX > touchStartX + 50) {
      navigateGallery("prev");
    }
  }
}

// Navigate gallery
function navigateGallery(direction) {
  if (direction === "prev") {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
  } else {
    currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
  }

  updateGallery();
}

// Update gallery state
function updateGallery() {
  slides.forEach((slide, index) => {
    // Remove all classes
    slide.classList.remove("active");

    // Calculate distance from current
    const distance = Math.abs(index - currentIndex);

    if (distance === 0) {
      slide.classList.add("active");
    }
  });

  // Update track position
  const slideWidth = slides[0].offsetWidth;
  const offset =
    -currentIndex * slideWidth + (galleryTrack.offsetWidth - slideWidth) / 2;
  galleryTrack.style.transform = `translateX(${offset}px)`;
}

// Form validation
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Basic form validation
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (!name || !email || !message) {
      alert("Please fill out all required fields.");
      return;
    }

    // In a real implementation, you would send this data to a server
    // Since this is frontend only, we'll just show a success message

    contactForm.innerHTML = `
      <div class="success-message">
        <h3>Thank you for your message!</h3>
        <p>We have received your inquiry and will get back to you shortly.</p>
      </div>
    `;
  });
}

// Animate elements on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(
    ".service-card, .about-image, .about-text, .testimonial, .contact-info, .contact-form-container"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(element);
  });
}

// Initialize functions when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initGallery();
  animateOnScroll();

  // Adjust gallery on window resize
  window.addEventListener("resize", () => {
    updateGallery();
  });
});

// Handle window resize for mobile menu
window.addEventListener("resize", () => {
  if (
    window.innerWidth > 768 &&
    document.body.classList.contains("nav-active")
  ) {
    document.body.classList.remove("nav-active");
    mobileToggle.querySelectorAll("span").forEach((span) => {
      span.style.transform = "none";
    });
    mobileToggle.querySelectorAll("span")[1].style.opacity = "1";
  }
});

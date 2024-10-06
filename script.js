// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis for smooth scrolling
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Select elements
const pinnedSection = document.querySelector(".pinned");
const stickyHeader = document.querySelector(".sticky-header");
const cards = document.querySelectorAll(".card");
const progressBarContainer = document.querySelector(".progress-bar");
const progressBar = document.querySelector(".progress");
const indicesContainer = document.querySelector(".indices");
const indices = document.querySelectorAll(".index");
const cardCount = cards.length;
const pinnedHeight = window.innerHeight * (cardCount + 1);

// Rotation arrays
const startRotations = [0, 5, 0, -5];
const endRotations = [-10, -5, 10, 5];

// Progress bar colors
const progressColors = ["#FFD1DC", "#AEC6CF", "#77DD77", "#C5BBDE"];

// Array of GIF file paths (update with your actual paths)
const gifFiles = [
  "./assets/card-1.gif",
  "./assets/card-2.gif",
  "./assets/card-3.gif",
  "./assets/card-4.gif",
];

// Initialize variables
let isProgressBarVisible = false;
let currentActiveIndex = -1;

// Add GIF backgrounds and set initial rotations
cards.forEach((card, index) => {
  // Set initial rotation
  gsap.set(card, { rotation: startRotations[index] });

  // Create img element for the GIF
  const img = document.createElement("img");
  img.src = gifFiles[index];
  img.alt = `Card ${index + 1}`;
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "cover";
  img.style.position = "absolute";
  img.style.top = 0;
  img.style.left = 0;
  img.style.zIndex = 0;

  // Append img to card
  card.appendChild(img);
});

// Function to animate index opacity
function animateIndexOpacity(newIndex) {
  if (newIndex !== currentActiveIndex) {
    indices.forEach((indexElem, i) => {
      gsap.to(indexElem, {
        opacity: i === newIndex ? 1 : 0.25,
        duration: 0.5,
        ease: "power2.out",
      });
    });
    currentActiveIndex = newIndex;
  }
}

// Function to show progress bar and indices
function showProgressAndIndices() {
  gsap.to([progressBarContainer, indicesContainer], {
    opacity: 1,
    duration: 0.5,
    ease: "power2.out",
  });
  isProgressBarVisible = true;
}

// Function to hide progress bar and indices
function hideProgressAndIndices() {
  gsap.to([progressBarContainer, indicesContainer], {
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
  });
  isProgressBarVisible = false;
  animateIndexOpacity(-1);
}

// Create ScrollTrigger
ScrollTrigger.create({
  trigger: pinnedSection,
  start: "top top",
  end: `+=${pinnedHeight}`,
  pin: true,
  pinSpacing: true,
  onLeave: () => {
    hideProgressAndIndices();
  },
  onEnterBack: () => {
    showProgressAndIndices();
  },
  onUpdate: (self) => {
    const progress = self.progress * (cardCount + 1);
    const currentCard = Math.floor(progress);

    // Fade out sticky header
    if (progress <= 1) {
      gsap.to(stickyHeader, {
        opacity: 1 - progress,
        duration: 0.1,
        ease: "none",
      });
    } else {
      gsap.set(stickyHeader, { opacity: 0 });
    }

    // Show/hide progress bar and indices
    if (progress > 1 && !isProgressBarVisible) {
      showProgressAndIndices();
    } else if (progress <= 1 && isProgressBarVisible) {
      hideProgressAndIndices();
    }

    // Update progress bar height and color
    let progressHeight = 0;
    let colorIndex = -1;
    if (progress > 1) {
      progressHeight = ((progress - 1) / cardCount) * 100;
      colorIndex = Math.min(Math.floor(progress - 1), cardCount - 1);
    }

    gsap.to(progressBar, {
      height: `${progressHeight}%`,
      backgroundColor: progressColors[colorIndex],
      duration: 0.3,
      ease: "power1.out",
    });

    // Update opacity
    if (isProgressBarVisible) {
      animateIndexOpacity(colorIndex);
    }

    // Animate cards
    cards.forEach((card, index) => {
      if (index < currentCard) {
        gsap.set(card, {
          top: "50%",
          rotation: endRotations[index],
        });
      } else if (index === currentCard) {
        const cardProgress = progress - currentCard;
        const newTop = gsap.utils.interpolate(150, 50, cardProgress);
        const newRotation = gsap.utils.interpolate(
          startRotations[index],
          endRotations[index],
          cardProgress
        );
        gsap.set(card, {
          top: `${newTop}%`,
          rotation: newRotation,
        });
      } else {
        gsap.set(card, {
          top: "150%",
          rotation: startRotations[index],
        });
      }
    });
  },
});

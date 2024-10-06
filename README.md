# DAY_006 | Smooth Scroll Animation

This project is part of the daily code challenge series, **DAY_006**, and it features a smooth scroll animation using **HTML**, **CSS**, **JavaScript**, **GSAP**, **ScrollTrigger**, **ionicons**, and **Lenis**. 

## Inspiration

Inspiration ▸ [Awwwards Element from Absolut NFT Website:](https://absolut-nft.com/#born-to-mix3d)

---

## Inspiration

![Absolut NFT Website](./assets/DAY_006_2.gif)

## Demo

![Smooth Scroll Animation Demo](./assets/DAY_006_1.gif)

---

## Project Structure

```bash
DAY_006/
│
├── assets/
│   ├── card-1.gif
│   ├── card-2.gif
│   ├── card-3.gif
│   ├── card-4.gif
│	├── hero.gif
│   └── favicon.ico
├── helveticaneue.woff2
├── index.html
├── styles.css
└── script.js
```

---

## Features

- **Smooth Scrolling**: Implemented using **Lenis**, the page provides a seamless scrolling experience that feels natural and responsive.

- **Scroll-Triggered Animations**: Utilizing **GSAP** and **ScrollTrigger**, the cards animate into view as the user scrolls, with rotations and position changes that create a dynamic effect.

- **Animated Cards with GIFs**: Each card contains a GIF that animates in sync with the scrolling, providing a rich visual experience.

- **Progress Indicator**: A vertical progress bar indicates the user's scroll position, changing colors to match the active card.

- **Interactive Indices**: Indices on the side highlight the current topic or words that inspire me, with smooth opacity transitions.

- **Responsive Design**: The layout adjusts for various screen sizes, ensuring the animation looks great on both desktop and mobile devices.

---

## How to Run

1. **Clone the repository**:

   ```bash
   git clone https://github.com/thounny/DAY_006.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd DAY_006
   ```

3. **Open the `index.html` file** in your web browser:

   - You can double-click the file in your file explorer, or
   - Serve it using a local development server (e.g., Live Server in VSCode).

---

## How the JavaScript Works

### GSAP and ScrollTrigger Animations

The project heavily relies on **GSAP** and its **ScrollTrigger** plugin to create animations that are tied to the scroll position.

#### Initialization

```javascript
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
```

- **Lenis** is initialized to enable smooth scrolling.
- **ScrollTrigger** is updated on scroll events to keep animations in sync.

#### Selecting Elements

```javascript
const cards = document.querySelectorAll(".card");
const progressBar = document.querySelector(".progress");
const indices = document.querySelectorAll(".index");
```

- Elements are selected to be manipulated during scrolling.

#### Defining Animations

- **Card Animations**: Cards animate their position and rotation based on scroll progress.

  ```javascript
  cards.forEach((card, index) => {
    // Set initial rotation
    gsap.set(card, { rotation: startRotations[index] });
    
    // Create img element for the GIF
    const img = document.createElement("img");
    img.src = gifFiles[index];
    // ... (set image styles)
    card.appendChild(img);
  });
  ```

- **Progress Bar Update**: The height and color of the progress bar change based on the current scroll position.

  ```javascript
  gsap.to(progressBar, {
    height: `${progressHeight}%`,
    backgroundColor: progressColors[colorIndex],
    // ... (animation settings)
  });
  ```

- **Indices Opacity**: The opacity of the indices changes to highlight the current phase.

  ```javascript
  function animateIndexOpacity(newIndex) {
    indices.forEach((indexElem, i) => {
      gsap.to(indexElem, {
        opacity: i === newIndex ? 1 : 0.25,
        // ... (animation settings)
      });
    });
  }
  ```

#### ScrollTrigger Configuration

```javascript
ScrollTrigger.create({
  trigger: pinnedSection,
  start: "top top",
  end: `+=${pinnedHeight}`,
  pin: true,
  pinSpacing: true,
  onUpdate: (self) => {
    const progress = self.progress * (cardCount + 1);
    // ... (update animations based on progress)
  },
});
```

- **Trigger Settings**: Defines the start and end points of the scroll-triggered animations.
- **Pinning**: Keeps the section pinned during the scroll to create a parallax effect.
- **Updating Animations**: On each scroll update, animations are recalculated based on the new progress value.

---

## How the CSS Works

### Layout and Styling

- **Pastel Color Palette**: The project uses a pastel color scheme for a soft and modern look.

  ```css
  /* Pastel Colors */
  --pastel-pink: #FFD1DC;
  --pastel-blue: #AEC6CF;
  --pastel-green: #77DD77;
  --pastel-purple: #CFCFC4;
  ```

- **Responsive Design**: Media queries adjust the layout for smaller screen sizes.

  ```css
  @media (max-width: 900px) {
    .card {
      width: 75%;
      height: 40%;
    }
    /* ... (other responsive styles) */
  }
  ```

### Animations and Transitions

- **Cards**: Positioned absolutely to allow for smooth translations and rotations.

  ```css
  .card {
    position: absolute;
    top: 150%;
    /* ... (other styles) */
    transition: transform 0.3s ease-out;
  }
  ```

- **Progress Bar and Indices**: Styled to match the overall theme and provide visual feedback during scrolling.

  ```css
  .progress-bar {
    /* ... (styles) */
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  ```

---

## Technologies Used

- **HTML5**: Markup language used for structuring the content.
- **CSS3**: Stylesheets used for visual presentation.
- **JavaScript (ES6)**: Programming language used for interactivity.
- **GSAP**: Library for creating high-performance animations.
- **ScrollTrigger**: GSAP plugin for scroll-based animations.
- **Lenis**: Smooth scrolling library for a natural scroll feel.
- **Ionicons**: Icon library used for the indices.

---
## Author

![Logo](https://web.archive.org/web/20091027053343im_/http://geocities.com/animecap/index_dwn.gif)

**Thounny Keo**  
Frontend Development Student | Year Up United


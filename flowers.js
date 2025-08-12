const LEFT_CONTAINER = document.getElementById("falling-flowers-left");
const RIGHT_CONTAINER = document.getElementById("falling-flowers-right");

function createPetal(container, side) {
  const petal = document.createElement("div");
  petal.classList.add("petal");

  // Random horizontal position within container (0 to 30px width)
  petal.style.left = Math.random() * 30 + "px";

  // Random animation duration between 6 and 12 seconds
  const duration = 6 + Math.random() * 6;
  petal.style.animationDuration = duration + "s";

  // Random delay so petals don’t fall in sync
  petal.style.animationDelay = Math.random() * -duration + "s";

  // Slight horizontal drift left or right depending on side
  petal.style.setProperty("--drift", side === "left" ? "5px" : "-5px");

  container.appendChild(petal);

  // Remove petal after animation finishes (optional to keep DOM clean)
  setTimeout(() => {
    petal.remove();
    createPetal(container, side);
  }, duration * 1000);
}

// Generate initial batch of petals per side
for (let i = 0; i < 20; i++) {
  createPetal(LEFT_CONTAINER, "left");
  createPetal(RIGHT_CONTAINER, "right");
}

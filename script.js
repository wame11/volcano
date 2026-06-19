const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".count");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.target);
      const decimals = Number.isInteger(target) ? 0 : 1;
      const duration = 1000;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = (target * eased).toFixed(decimals);

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          counter.textContent = target.toFixed(decimals).replace(".0", "");
        }
      }

      requestAnimationFrame(tick);
      counterObserver.unobserve(counter);
    });
  },
  { threshold: 0.45 }
);

counters.forEach((counter) => counterObserver.observe(counter));

document.querySelectorAll(".image-panel, .eruption-card").forEach((panel) => {
  panel.addEventListener("pointermove", (event) => {
    const rect = panel.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    panel.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg)`;
  });

  panel.addEventListener("pointerleave", () => {
    panel.style.transform = "";
  });
});

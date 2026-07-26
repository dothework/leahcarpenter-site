// Signal wave: a continuous oscillation that gently traces across the hero rail.
// Reads as: "signal, not noise" — steady, low-amplitude, one accent color.

(function () {
  const wave = document.getElementById("signal-wave");
  const dot = document.getElementById("signal-dot");
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
  if (!wave || !dot) return;

  const W = 600;
  const H = 60;
  const midY = H / 2;

  // Respect reduced motion
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    // Draw a static soft sine
    let d = `M 0 ${midY}`;
    for (let x = 0; x <= W; x += 4) {
      const y = midY + Math.sin(x * 0.03) * 6;
      d += ` L ${x} ${y.toFixed(2)}`;
    }
    wave.setAttribute("d", d);
    dot.setAttribute("cx", "300");
    dot.setAttribute("cy", midY);
    return;
  }

  let t = 0;
  function frame() {
    t += 0.012;
    let d = `M 0 ${midY}`;
    for (let x = 0; x <= W; x += 3) {
      // Two overlapping frequencies for organic feel, low amplitude
      const y =
        midY +
        Math.sin(x * 0.022 + t) * 6 +
        Math.sin(x * 0.008 - t * 0.6) * 3;
      d += ` L ${x} ${y.toFixed(2)}`;
    }
    wave.setAttribute("d", d);

    // Traveling dot follows the wave near the right edge
    const dx = (Math.sin(t * 0.9) * 0.5 + 0.5) * W;
    const dy =
      midY +
      Math.sin(dx * 0.022 + t) * 6 +
      Math.sin(dx * 0.008 - t * 0.6) * 3;
    dot.setAttribute("cx", dx.toFixed(1));
    dot.setAttribute("cy", dy.toFixed(2));

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

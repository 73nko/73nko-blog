const canvas = document.getElementById('aurora-canvas') as HTMLCanvasElement | null;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canvas && !prefersReducedMotion) {
  const ctx = canvas.getContext('2d')!;
  let w = 0;
  let h = 0;
  let rafId = 0;
  let skyGradient: CanvasGradient;

  interface Ribbon {
    color: [number, number, number];
    yBase: number;
    amp: number;
    speed: number;
    width: number;
    phase: number;
  }

  // Violet Hour: orchid, periwinkle, ice, rose-mist
  const ribbons: Ribbon[] = [
    { color: [179, 157, 255], yBase: 0.26, amp: 46, speed: 0.0001, width: 90, phase: 0 },
    { color: [141, 167, 255], yBase: 0.46, amp: 60, speed: 0.00014, width: 110, phase: 2 },
    { color: [168, 201, 255], yBase: 0.6, amp: 38, speed: 0.00008, width: 70, phase: 4 },
    { color: [226, 188, 255], yBase: 0.8, amp: 52, speed: 0.00012, width: 95, phase: 1 },
  ];

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas!.width = w * dpr;
    canvas!.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    skyGradient = ctx.createLinearGradient(0, 0, 0, h);
    skyGradient.addColorStop(0, 'rgba(74,61,149,0.20)');
    skyGradient.addColorStop(0.6, 'rgba(26,23,69,0.10)');
    skyGradient.addColorStop(1, 'rgba(6,6,26,0)');
  }

  function ribbonY(rb: Ribbon, x: number, t: number): number {
    return (
      h * rb.yBase +
      Math.sin(x * 0.006 + t * rb.speed * 9 + rb.phase) * rb.amp +
      Math.sin(x * 0.0023 - t * rb.speed * 5 + rb.phase * 2) * rb.amp * 0.7
    );
  }

  function draw(t: number) {
    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';
    for (const rb of ribbons) {
      const [r, g, b] = rb.color;
      // soft ribbon body: 5 stacked translucent strokes
      for (let layer = 0; layer < 5; layer++) {
        ctx.beginPath();
        for (let x = -20; x <= w + 20; x += 12) {
          const y = ribbonY(rb, x, t) + (layer - 2) * rb.width * 0.16;
          x === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${r},${g},${b},0.03)`;
        ctx.lineWidth = rb.width * (1 - layer * 0.14);
        ctx.stroke();
      }
      // bright spine
      ctx.beginPath();
      for (let x = -20; x <= w + 20; x += 12) {
        const y = ribbonY(rb, x, t);
        x === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(${r},${g},${b},0.10)`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.globalCompositeOperation = 'source-over';

    rafId = requestAnimationFrame(draw);
  }

  resize();
  rafId = requestAnimationFrame(draw);
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    } else if (!rafId) {
      rafId = requestAnimationFrame(draw);
    }
  });
}

import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  size: number; opacity: number;
  color: string;
}

const COLORS = ['#e8b84b', '#1a1a1a', '#c9a43a', '#888', '#e8b84b'];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -999, y: -999 });
  const scrollY = useRef(0);
  const particles = useRef<Particle[]>([]);
  const rafId = useRef<number>(0);
  const lastSpawn = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    /* ── resize ──────────────────────────────── */
    function resize() {
      if (!canvas) return;
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* ── spawn particle ──────────────────────── */
    function spawnAt(x: number, y: number, burst = false) {
      const count = burst ? 6 : 2;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = randomBetween(burst ? 1.5 : 0.4, burst ? 4 : 1.8);
        particles.current.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (burst ? 1 : 0.3),
          life: 0,
          maxLife: randomBetween(60, 130),
          size: randomBetween(burst ? 3 : 1.5, burst ? 8 : 4),
          opacity: randomBetween(0.4, 0.9),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    }

    /* ── ambient background particles ────────── */
    function spawnAmbient() {
      if (!canvas) return;
      const x = Math.random() * canvas.width;
      const y = canvas.height + 10;
      const angle = -Math.PI / 2 + randomBetween(-0.6, 0.6);
      const speed = randomBetween(0.3, 1.0);
      particles.current.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: randomBetween(120, 240),
        size: randomBetween(1, 3.5),
        opacity: randomBetween(0.1, 0.35),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    /* ── draw loop ────────────────────────────── */
    let frame = 0;
    function draw(ts: number) {
      if (!canvas || !ctx) return;
      rafId.current = requestAnimationFrame(draw);
      frame++;

      /* clear with slight trail effect */
      ctx.fillStyle = 'rgba(255,255,255,0.18)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      /* spawn ambient every 8 frames */
      if (frame % 8 === 0) spawnAmbient();

      /* cursor-trail particles */
      const now = ts;
      if (now - lastSpawn.current > 40 && mouse.current.x > 0) {
        spawnAt(mouse.current.x, mouse.current.y);
        lastSpawn.current = now;
      }

      /* update + draw */
      particles.current = particles.current.filter((p) => {
        p.life++;
        if (p.life >= p.maxLife) return false;

        /* gravity + scroll drift */
        p.vy -= 0.012;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        /* scroll parallax push */
        const scrollDelta = scrollY.current;
        p.y -= scrollDelta * 0.003;

        const t = p.life / p.maxLife;
        const alpha = p.opacity * (1 - Math.pow(t, 1.8));

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - t * 0.5), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return true;
      });

      /* limit pool */
      if (particles.current.length > 400) {
        particles.current = particles.current.slice(-400);
      }
    }

    rafId.current = requestAnimationFrame(draw);

    /* ── event listeners ─────────────────────── */
    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onMouseLeave() { mouse.current = { x: -999, y: -999 }; }
    function onClick(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      spawnAt(e.clientX - rect.left, e.clientY - rect.top, true);
    }
    function onScroll() { scrollY.current = window.scrollY; }

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('click', onClick);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('click', onClick);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      aria-hidden="true"
    />
  );
}

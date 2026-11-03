'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number; vx: number; vy: number;
  radius: number; opacity: number; colorStr: string;
}

interface Blob {
  x: number; y: number; vx: number; vy: number;
  radius: number; color: string; opacity: number;
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect reduced-motion: render static background only
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animId: number;
    let mouseX = width / 2;
    let mouseY = height / 2;

    // Device pixel ratio for crisp rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    ctx.scale(dpr, dpr);

    const isMobile = width < 768;
    const PARTICLE_COUNT = isMobile ? 20 : 80;

    const particleColors = ['59,130,246', '139,92,246', '6,182,212'];
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      colorStr: particleColors[Math.floor(Math.random() * particleColors.length)],
    }));

    const blobDefs = [
      { color: '59,130,246', bx: 0.2, by: 0.3 },
      { color: '139,92,246', bx: 0.75, by: 0.6 },
      { color: '6,182,212', bx: 0.5, by: 0.15 },
      { color: '139,92,246', bx: 0.85, by: 0.2 },
    ];
    const blobs: Blob[] = blobDefs.map((b) => ({
      x: b.bx * width, y: b.by * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: 220 + Math.random() * 80,
      color: b.color,
      opacity: 0.06 + Math.random() * 0.04,
    }));

    function drawGrid() {
      if (!ctx) return;
      const size = 60;
      ctx.strokeStyle = 'rgba(59,130,246,0.04)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < width; x += size) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += size) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }
    }

    function drawStatic() {
      if (!ctx) return;
      const grad = ctx.createRadialGradient(width * 0.5, height * 0.3, 0, width * 0.5, height * 0.3, height);
      grad.addColorStop(0, '#0a0a1a');
      grad.addColorStop(0.5, '#06060f');
      grad.addColorStop(1, '#000000');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      drawGrid();
      // Static blobs (no movement)
      blobs.forEach(b => {
        const radGrad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        radGrad.addColorStop(0, 'rgba(' + b.color + ',' + b.opacity + ')');
        radGrad.addColorStop(1, 'rgba(' + b.color + ',0)');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const grad = ctx.createRadialGradient(width * 0.5, height * 0.3, 0, width * 0.5, height * 0.3, height);
      grad.addColorStop(0, '#0a0a1a');
      grad.addColorStop(0.5, '#06060f');
      grad.addColorStop(1, '#000000');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      drawGrid();

      const mx = (mouseX - width / 2) / width;
      const my = (mouseY - height / 2) / height;

      blobs.forEach(b => {
        b.x += b.vx + mx * 0.3;
        b.y += b.vy + my * 0.3;
        if (b.x < -b.radius) b.x = width + b.radius;
        if (b.x > width + b.radius) b.x = -b.radius;
        if (b.y < -b.radius) b.y = height + b.radius;
        if (b.y > height + b.radius) b.y = -b.radius;

        const radGrad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        radGrad.addColorStop(0, 'rgba(' + b.color + ',' + b.opacity + ')');
        radGrad.addColorStop(1, 'rgba(' + b.color + ',0)');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + p.colorStr + ',' + p.opacity + ')';
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    if (prefersReduced) {
      drawStatic();
    } else {
      draw();
    }

    const onMouse = prefersReduced ? null : (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      ctx.scale(dpr, dpr);
      if (prefersReduced) drawStatic();
    };

    if (onMouse) window.addEventListener('mousemove', onMouse);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      if (onMouse) window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}

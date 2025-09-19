import React, { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  size: number;
  opacity: number;
  color: string;
}

interface MousePosition {
  x: number;
  y: number;
}

export default function MinimalistBackground(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize nodes
    const nodeCount = Math.min(50, Math.floor((width * height) / 20000));
    const colors = [
      "#ff6b9d",
      "#4ecdc4",
      "#a8e6cf",
      "#ffd93d",
      "#ff8fab",
      "#c7a8ff",
    ];
    nodesRef.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.01,
      vy: (Math.random() - 0.5) * 0.01,
      baseVx: (Math.random() - 0.5) * 0.005, // Very slow but continuous movement
      baseVy: (Math.random() - 0.5) * 0.005,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.fillStyle = "rgba(15, 15, 35, 0.08)";
      ctx.fillRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      nodes.forEach((node, i) => {
        // Apply damping but maintain stronger base movement to prevent stopping
        node.vx = node.vx * 0.98 + node.baseVx;
        node.vy = node.vy * 0.98 + node.baseVy;

        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Boundary detection with smooth bounce and velocity preservation
        if (node.x < 0 || node.x > width) {
          node.vx *= -0.7;
          node.baseVx *= -1; // Reverse base direction too
        }
        if (node.y < 0 || node.y > height) {
          node.vy *= -0.7;
          node.baseVy *= -1; // Reverse base direction too
        }

        // Keep within bounds
        node.x = Math.max(5, Math.min(width - 5, node.x));
        node.y = Math.max(5, Math.min(height - 5, node.y));

        // Mouse interaction - adds temporary velocity boost
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150 && dist > 0) {
          const force = ((150 - dist) / 150) * 0.02;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }

        // Draw node with color
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);

        // Parse hex color and create rgba
        const hex = node.color.replace("#", "");
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${node.opacity})`;
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw colorful connections
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = ((100 - distance) / 100) * 0.15;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);

            // Create gradient for connection
            const gradient = ctx.createLinearGradient(
              node.x,
              node.y,
              other.x,
              other.y,
            );
            const nodeColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;

            const otherHex = other.color.replace("#", "");
            const otherR = parseInt(otherHex.substr(0, 2), 16);
            const otherG = parseInt(otherHex.substr(2, 2), 16);
            const otherB = parseInt(otherHex.substr(4, 2), 16);
            const otherColor = `rgba(${otherR}, ${otherG}, ${otherB}, ${opacity})`;

            gradient.addColorStop(0, nodeColor);
            gradient.addColorStop(1, otherColor);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
  );
}

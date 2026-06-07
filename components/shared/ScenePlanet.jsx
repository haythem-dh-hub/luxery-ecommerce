"use client";

import { useEffect, useRef } from "react";

export default function ScenePlanet() {
  const planetRef = useRef(null);
  const frameRef = useRef(0);
  const currentRef = useRef({ x: 0, y: 0, rotate: 0 });
  const targetRef = useRef({ x: 0, y: 0, rotate: 0 });

  useEffect(() => {
    const updatePlanet = () => {
      const current = currentRef.current;
      const target = targetRef.current;

      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;
      current.rotate += (target.rotate - current.rotate) * 0.14;

      if (planetRef.current) {
        planetRef.current.style.setProperty("--planet-shift-x", `${current.x}px`);
        planetRef.current.style.setProperty("--planet-shift-y", `${current.y}px`);
        planetRef.current.style.setProperty("--planet-rotate", `${current.rotate}deg`);
      }

      frameRef.current = window.requestAnimationFrame(updatePlanet);
    };

    const handlePointerMove = (event) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const offsetX = (event.clientX - centerX) / centerX;
      const offsetY = (event.clientY - centerY) / centerY;

      targetRef.current = {
        x: offsetX * 28,
        y: offsetY * 18,
        rotate: offsetX * 8,
      };
    };

    const handlePointerLeave = () => {
      targetRef.current = { x: 0, y: 0, rotate: 0 };
    };

    frameRef.current = window.requestAnimationFrame(updatePlanet);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div ref={planetRef} className="scene-planet" aria-hidden="true">
      <div className="scene-planet__ring" />
      <div className="scene-planet__core" />
      <div className="scene-planet__glow" />
    </div>
  );
}

import React, { useState, useCallback } from 'react';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';

export const useParticles = () => {
  const [showParticles, setShowParticles] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particleContainer = showParticles ? (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        particles: {
          number: { value: 80 },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: {
            value: 0.5,
            random: true,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 0.3,
              sync: false
            }
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            outModes: "out",
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: "repulse"
            },
            resize: true
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4
            }
          }
        },
        detectRetina: true
      }}
    />
  ) : null;

  return {
    showParticles: () => setShowParticles(true),
    particleContainer
  };
};
import { useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "../styles/hero.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Hero() {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(".hero__content", {
        y: -120,
        opacity: 0,
        scale: 0.95,

        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom 40%",
          scrub: true,
        },
      });
    },
    {
      scope: heroRef,
    }
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      className="hero"
    >
      <div className="hero__content">
        <p className="hero__eyebrow">
          PERFORMANCE REDEFINED
        </p>

        <h1>
          Discover
          <span> the machine.</span>
        </h1>

        <p className="hero__description">
          Engineered for performance.
          Designed to move differently.
        </p>

        <button>
          Explore vehicle
        </button>
      </div>

      <div className="hero__scroll">
        <span>Scroll</span>
        <div />
      </div>
    </section>
  );
}

export default Hero;
import { useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "../styles/navbar.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Navbar() {
  const navbarRef = useRef(null);

  useGSAP(() => {
    const navbar = navbarRef.current;

    if (!navbar) return;

    const trigger = ScrollTrigger.create({
      start: 80,

      onUpdate: (self) => {
        navbar.classList.toggle(
          "navbar--scrolled",
          self.scroll() > 80
        );
      },
    });

    return () => {
      trigger.kill();
    };
  });

  return (
    <header
      ref={navbarRef}
      className="navbar"
    >
      <a
        href="#hero"
        className="navbar__logo"
      >
        MOTION
      </a>

      <nav className="navbar__links">
        <a href="#hero">Home</a>

        <a href="#performance">
          Performance
        </a>

        <a href="#models">
          Models
        </a>
      </nav>

      <a
        href="#models"
        className="navbar__button"
      >
        Explore
      </a>
    </header>
  );
}

export default Navbar;
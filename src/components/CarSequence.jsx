import { useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "../styles/car-sequence.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Get all 300 JPG frames from src/assets/frames
const frameModules = import.meta.glob(
  "../assets/frames/*.jpg",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

// Sort them correctly:
// 001, 002, 003 ... 299, 300
const frameUrls = Object.entries(frameModules)
  .sort(([pathA], [pathB]) =>
    pathA.localeCompare(pathB, undefined, {
      numeric: true,
    })
  )
  .map(([, url]) => url);

const FRAME_COUNT = frameUrls.length;

function CarSequence() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useGSAP(
    () => {
      const canvas = canvasRef.current;

      if (!canvas) return;

      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      const images = [];

      const playhead = {
        frame: 0,
      };

const SEQUENCE_DURATION = 10;

const frameToTime = (frame) => {
  return (
    (frame / (FRAME_COUNT - 1)) *
    SEQUENCE_DURATION
  );
};

      let currentFrame = 0;

      // -----------------------------
      // Load all 300 frames
      // -----------------------------

      frameUrls.forEach((src) => {
        const image = new Image();

        image.src = src;
        image.decoding = "async";

        images.push(image);
      });

      // -----------------------------
      // Draw one image on canvas
      // -----------------------------

      const drawImage = (image) => {
        if (
          !image ||
          !image.complete ||
          image.naturalWidth === 0
        ) {
          return;
        }

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const imageWidth = image.naturalWidth;
        const imageHeight = image.naturalHeight;

        /*
          "cover" behavior.

          Image fills the entire screen while
          keeping its original aspect ratio.
        */
        const scale = Math.max(
          canvasWidth / imageWidth,
          canvasHeight / imageHeight
        );

        const drawWidth = imageWidth * scale;
        const drawHeight = imageHeight * scale;

        const x = (canvasWidth - drawWidth) / 2;
        const y = (canvasHeight - drawHeight) / 2;

        ctx.clearRect(
          0,
          0,
          canvasWidth,
          canvasHeight
        );

        ctx.drawImage(
          image,
          x,
          y,
          drawWidth,
          drawHeight
        );
      };

      // -----------------------------
      // Render requested frame
      // -----------------------------

      const renderFrame = (frame) => {
        const index = gsap.utils.clamp(
          0,
          FRAME_COUNT - 1,
          Math.round(frame)
        );

        const image = images[index];

        /*
          If that frame hasn't finished
          downloading yet, don't draw it.
        */
        if (
          !image ||
          !image.complete ||
          image.naturalWidth === 0
        ) {
          return;
        }

        currentFrame = index;

        drawImage(image);
      };

      // -----------------------------
      // Make canvas sharp/responsive
      // -----------------------------

      const resizeCanvas = () => {
        const rect =
          canvas.getBoundingClientRect();

        const pixelRatio = Math.min(
          window.devicePixelRatio || 1,
          2
        );

        canvas.width =
          rect.width * pixelRatio;

        canvas.height =
          rect.height * pixelRatio;

        renderFrame(currentFrame);
      };

      // -----------------------------
      // Show frame 001 immediately
      // -----------------------------

      const firstImage = images[0];

      const showFirstFrame = () => {
        resizeCanvas();
        renderFrame(0);
      };

      if (
        firstImage.complete &&
        firstImage.naturalWidth > 0
      ) {
        showFirstFrame();
      } else {
        firstImage.addEventListener(
          "load",
          showFirstFrame,
          {
            once: true,
          }
        );
      }

      // -----------------------------
      // THE VROOM PART 🏎️
      // -----------------------------

const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "+=5000",
    scrub: 0.5,
    pin: true,
    anticipatePin: 1,
  },
});

timeline.to(
  playhead,
  {
    frame: FRAME_COUNT - 1,

    duration: SEQUENCE_DURATION,

    ease: "none",

    onUpdate: () => {
      renderFrame(playhead.frame);
    },
  },
  0
);  

timeline.to(
  ".car-story--intro",
  {
    autoAlpha: 0,
    y: -60,
    duration: 1,
  },
  1
);

timeline.fromTo(
  ".car-story--power",
  {
    autoAlpha: 0,
    y: 60,
  },
  {
    autoAlpha: 1,
    y: 0,

    duration: 0.8,
  },

  frameToTime(80)
);

timeline.to(
  ".car-story--power",
  {
    autoAlpha: 0,
    y: -60,

    duration: 0.8,
  },

  frameToTime(125)
);

timeline.to(
  ".car-story--power",
  {
    autoAlpha: 0,
    y: -60,
    duration: 1,
  },
  4
);

timeline.fromTo(
  ".car-story--speed",
  {
    autoAlpha: 0,
    y: 60,
  },
  {
    autoAlpha: 1,
    y: 0,

    duration: 0.8,
  },

  frameToTime(150)
);

timeline.to(
  ".car-story--speed",
  {
    autoAlpha: 0,
    y: -60,

    duration: 0.8,
  },

  frameToTime(195)
);

timeline.to(
  ".car-story--speed",
  {
    autoAlpha: 0,
    y: -60,
    duration: 1,
  },
  6.5
);

timeline.fromTo(
  ".car-story--final",
  {
    autoAlpha: 0,
    scale: 0.92,
  },
  {
    autoAlpha: 1,
    scale: 1,

    duration: 1,
  },

  frameToTime(235)
);



      // -----------------------------
      // Browser resizing
      // -----------------------------

      window.addEventListener(
        "resize",
        resizeCanvas
      );

      return () => {
        window.removeEventListener(
          "resize",
          resizeCanvas
        );

        firstImage.removeEventListener(
          "load",
          showFirstFrame
        );
      };
    },
    {
      scope: sectionRef,
    }
  );

return (
  <section
    ref={sectionRef}
    className="car-sequence"
  >
    <canvas
      ref={canvasRef}
      className="car-sequence__canvas"
    />

    <div className="car-sequence__shade" />

    <div className="car-story car-story--intro">
      <p>ENGINEERED TO MOVE</p>

      <h2>
        Feel every
        <span> detail.</span>
      </h2>
    </div>

    <div className="car-story car-story--power">
      <p>RAW PERFORMANCE</p>

      <strong>707</strong>

      <span>HORSEPOWER</span>
    </div>

    <div className="car-story car-story--speed">
      <p>ZERO TO SIXTY</p>

      <strong>3.4</strong>

      <span>SECONDS</span>
    </div>

    <div className="car-story car-story--final">
      <p>PERFORMANCE WITHOUT COMPROMISE</p>

      <h2>
        BUILT
        <span> TO MOVE.</span>
      </h2>
    </div>

    <div className="car-sequence__scroll-hint">
      Scroll to explore
    </div>
  </section>
);
}

export default CarSequence;
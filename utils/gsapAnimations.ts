import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Stagger text animation - animates each character with a delay
export const charStagger = (element: HTMLElement | string, options = {}) => {
  const defaultOptions = {
    duration: 0.5,
    ease: "power2.out",
    stagger: 0.05,
  };
  
  const text = typeof element === "string" ? gsap.getProperty(element, "textContent") : (element as HTMLElement).textContent;
  
  return gsap.to(element, {
    ...defaultOptions,
    ...options,
  });
};

// Stagger animation for array of elements
export const staggerElements = (
  elements: HTMLElement[] | string,
  options = {}
) => {
  const defaultOptions = {
    duration: 0.6,
    y: 20,
    opacity: 0,
    ease: "back.out",
    stagger: 0.1,
  };

  return gsap.to(elements, {
    ...defaultOptions,
    ...options,
    y: 0,
    opacity: 1,
  });
};

// Parallax on scroll
export const parallaxOnScroll = (
  element: HTMLElement | string,
  depth = 0.5
) => {
  return gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: "top center",
      end: "bottom center",
      scrub: 0.5,
      markers: false,
    },
    y: () => gsap.getProperty(window, "scrollY") * depth,
    ease: "none",
  });
};

// Number counter animation (for stats)
export const countTo = (
  element: HTMLElement | string,
  targetValue: number,
  options = {}
) => {
  const defaultOptions = {
    duration: 2,
    ease: "power2.out",
  };

  const obj = { value: 0 };

  return gsap.to(obj, {
    ...defaultOptions,
    ...options,
    value: targetValue,
    onUpdate: function () {
      if (typeof element === "string") {
        const el = document.querySelector(element);
        if (el) el.textContent = Math.floor(obj.value).toString();
      } else {
        element.textContent = Math.floor(obj.value).toString();
      }
    },
  });
};

// Bounce entrance animation
export const bounceIn = (element: HTMLElement | string, options = {}) => {
  const defaultOptions = {
    duration: 0.6,
    scale: 0,
    opacity: 0,
    ease: "back.out",
  };

  gsap.set(element, { scale: 0, opacity: 0 });

  return gsap.to(element, {
    ...defaultOptions,
    ...options,
    scale: 1,
    opacity: 1,
  });
};

// Flip animation (rotation effect)
export const flipCard = (element: HTMLElement | string, options = {}) => {
  const defaultOptions = {
    duration: 0.6,
    rotationY: 360,
    ease: "power2.out",
  };

  return gsap.to(element, {
    ...defaultOptions,
    ...options,
  });
};

// Slide in from side animation
export const slideIn = (
  element: HTMLElement | string,
  direction: "left" | "right" | "up" | "down" = "left",
  options = {}
) => {
  const directions = {
    left: { x: -100 },
    right: { x: 100 },
    up: { y: 100 },
    down: { y: -100 },
  };

  const defaultOptions = {
    duration: 0.5,
    opacity: 0,
    ease: "power2.out",
    ...directions[direction],
  };

  gsap.set(element, defaultOptions);

  return gsap.to(element, {
    ...defaultOptions,
    ...options,
    x: 0,
    y: 0,
    opacity: 1,
  });
};

// Scroll reveal animation
export const scrollReveal = (
  element: HTMLElement | string,
  options = {}
) => {
  const defaultOptions = {
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      end: "top 20%",
      scrub: 1,
      markers: false,
    },
    duration: 0.8,
    opacity: 0,
    y: 50,
    ease: "power2.out",
  };

  gsap.set(element, { opacity: 0, y: 50 });

  return gsap.to(element, {
    ...defaultOptions,
    ...options,
    opacity: 1,
    y: 0,
  });
};

// Pulse animation
export const pulse = (element: HTMLElement | string, options = {}) => {
  const defaultOptions = {
    duration: 1,
    scale: 1.05,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  };

  return gsap.to(element, {
    ...defaultOptions,
    ...options,
  });
};

// Shake animation
export const shake = (element: HTMLElement | string, intensity = 5) => {
  return gsap.to(element, {
    x: () => gsap.utils.random(-intensity, intensity),
    duration: 0.05,
    repeat: 10,
    ease: "sine.inOut",
  });
};

// Timeline for complex sequences
export const createTimeline = () => {
  return gsap.timeline();
};

// Hover scale animation (typically applied via onMouseEnter/onMouseLeave)
export const hoverScale = (
  element: HTMLElement | string,
  scale = 1.05,
  duration = 0.3
) => {
  return {
    enter: () => gsap.to(element, { scale, duration, ease: "power2.out" }),
    leave: () => gsap.to(element, { scale: 1, duration, ease: "power2.out" }),
  };
};

// Gradient animation (for hero sections)
export const animateGradient = (element: HTMLElement | string) => {
  return gsap.to(element, {
    backgroundPosition: "200% center",
    duration: 3,
    ease: "linear",
    repeat: -1,
  });
};

// Text color animation
export const animateTextColor = (
  element: HTMLElement | string,
  colors: string[],
  options = {}
) => {
  const defaultOptions = {
    duration: 0.3,
    ease: "power1.inOut",
  };

  return gsap.to(element, {
    ...defaultOptions,
    ...options,
    color: colors,
    colorDuration: 0.3,
  });
};

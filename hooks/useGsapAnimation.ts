import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseGsapAnimationOptions {
  trigger?: string | HTMLElement;
  onComplete?: () => void;
  autoKill?: boolean;
}

/**
 * Custom hook for managing GSAP animations with proper cleanup
 * @param animationCallback - Function that returns a GSAP animation/timeline
 * @param options - Configuration options for the animation
 */
export const useGsapAnimation = (
  animationCallback: () => gsap.core.Tween | gsap.core.Timeline | void,
  options: UseGsapAnimationOptions = {}
) => {
  const animationRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);

  useEffect(() => {
    // Execute the animation callback
    const animation = animationCallback();
    
    if (animation) {
      animationRef.current = animation;

      if (options.onComplete) {
        animation.eventCallback("onComplete", options.onComplete);
      }
    }

    // Cleanup function
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
      // Kill all scroll triggers associated with this component
      ScrollTrigger.getAll().forEach(trigger => {
        if (options.trigger && trigger.trigger === options.trigger) {
          trigger.kill();
        }
      });
    };
  }, []);

  return animationRef;
};

/**
 * Hook for element-based animations with ref
 * @param animation - Animation function to apply to the element
 */
export const useElementAnimation = (
  animation: (element: HTMLElement) => gsap.core.Tween | gsap.core.Timeline | void
) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      const anim = animation(ref.current);
      return () => {
        if (anim) {
          anim.kill();
        }
      };
    }
  }, [animation]);

  return ref;
};

/**
 * Hook for scroll trigger based animations
 * @param triggerElement - Element that triggers the animation
 * @param callback - Animation callback function
 */
export const useScrollAnimation = (
  triggerElement: HTMLElement | string | null,
  callback: () => gsap.core.Timeline | gsap.core.Tween | void
) => {
  useEffect(() => {
    if (!triggerElement) return;

    const animation = callback();

    return () => {
      if (animation) {
        animation.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => {
        trigger.kill();
      });
    };
  }, [triggerElement, callback]);
};

/**
 * Hook for stagger animations on multiple elements
 * @param selector - CSS selector for elements to animate
 * @param animationProps - GSAP animation properties
 */
export const useStaggerAnimation = (
  selector: string,
  animationProps: gsap.TweenVars = {}
) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll(selector);
    
    const defaultProps = {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out",
    };

    const tween = gsap.to(elements, {
      ...defaultProps,
      ...animationProps,
      opacity: 1,
      y: 0,
    });

    return () => {
      tween.kill();
    };
  }, [selector, animationProps]);

  return ref;
};

/**
 * Hook for parallax scroll effects
 * @param triggerElement - Element to watch for parallax
 * @param depth - Parallax depth (0.5 = moderate, 1 = extreme)
 */
export const useParallax = (
  triggerElement: HTMLElement | null,
  depth: number = 0.5
) => {
  useEffect(() => {
    if (!triggerElement) return;

    const animation = gsap.to(triggerElement, {
      scrollTrigger: {
        trigger: triggerElement,
        start: "top center",
        end: "bottom center",
        scrub: 0.5,
        markers: false,
      },
      y: () => window.scrollY * depth * -1,
      ease: "none",
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        trigger.kill();
      });
    };
  }, [triggerElement, depth]);
};

/**
 * Hook for hover animations
 * @param ref - Ref to the element to animate
 * @param enterProps - Animation properties on hover
 * @param exitProps - Animation properties on hover exit
 */
export const useHoverAnimation = (
  ref: React.RefObject<HTMLElement>,
  enterProps: gsap.TweenVars = {},
  exitProps: gsap.TweenVars = {}
) => {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const defaultEnter = { scale: 1.05, duration: 0.3, ease: "power2.out" };
    const defaultExit = { scale: 1, duration: 0.3, ease: "power2.out" };

    const handleMouseEnter = () => {
      gsap.to(element, { ...defaultEnter, ...enterProps });
    };

    const handleMouseLeave = () => {
      gsap.to(element, { ...defaultExit, ...exitProps });
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      if (gsap.isTweening(element)) {
        gsap.killTweensOf(element);
      }
    };
  }, [ref, enterProps, exitProps]);
};

/**
 * Hook for counter animations (animated numbers)
 * @param ref - Ref to the element containing the number
 * @param endValue - Target number to count to
 * @param options - GSAP animation options
 */
export const useCounterAnimation = (
  ref: React.RefObject<HTMLElement>,
  endValue: number,
  options: gsap.TweenVars = {}
) => {
  useEffect(() => {
    if (!ref.current) return;

    const defaultOptions = {
      duration: 2,
      ease: "power2.out",
    };

    const obj = { value: 0 };

    const tween = gsap.to(obj, {
      ...defaultOptions,
      ...options,
      value: endValue,
      onUpdate: function () {
        ref.current!.textContent = Math.floor(obj.value).toString();
      },
    });

    return () => {
      tween.kill();
    };
  }, [ref, endValue, options]);
};

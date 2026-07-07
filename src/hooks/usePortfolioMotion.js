import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

function hasReducedMotionPreference() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function usePortfolioMotion(isEnabled) {
  useEffect(() => {
    if (!isEnabled || typeof window === "undefined") return undefined;

    if (hasReducedMotionPreference()) {
      gsap.set(
        [
          ".siteHeader",
          ".siteBackground",
          ".heroTitle .titleLine",
          ".heroTitle .titleMask",
          ".heroCopy",
          ".heroActions",
          ".heroFact",
          ".motion-title",
          ".motion-card",
          ".motion-row",
          ".motion-image",
          ".motion-image img",
        ],
        { clearProps: "all" },
      );
      return undefined;
    }

    const context = gsap.context(() => {
      const slowReveal = "expo.out";
      const sculptedEase = "power4.inOut";

      gsap.set(".siteBackground", {
        autoAlpha: 0.72,
        scale: 1.025,
        transformOrigin: "50% 50%",
      });
      gsap.set(".siteHeader", { autoAlpha: 0, y: -18 });
      gsap.set(".heroTitle .titleMask", { clipPath: "inset(0 0 100% 0)" });
      gsap.set(".heroTitle .titleLine", {
        yPercent: 118,
        scaleY: 0.58,
        skewY: 4,
        transformOrigin: "left bottom",
      });
      gsap.set([".heroCopy", ".heroActions"], { autoAlpha: 0, y: 36 });
      gsap.set(".heroFact", {
        autoAlpha: 0,
        y: 54,
        scaleY: 0.88,
        clipPath: "inset(0 0 100% 0)",
        transformOrigin: "center bottom",
      });

      const opening = gsap.timeline({ defaults: { ease: slowReveal } });

      opening
        .to(".siteBackground", {
          autoAlpha: 1,
          scale: 1,
          duration: 1.8,
          ease: "power3.out",
        })
        .to(
          ".siteHeader",
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.05,
          },
          0.18,
        )
        .to(
          ".heroTitle .titleMask",
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.45,
            stagger: 0.16,
            ease: sculptedEase,
          },
          0.48,
        )
        .to(
          ".heroTitle .titleLine",
          {
            yPercent: 0,
            scaleY: 1,
            skewY: 0,
            duration: 1.5,
            stagger: 0.16,
            ease: "expo.out",
          },
          0.5,
        )
        .to(
          ".heroCopy",
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.05,
          },
          1.35,
        )
        .to(
          ".heroActions",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.95,
          },
          1.55,
        )
        .to(
          ".heroFact",
          {
            autoAlpha: 1,
            y: 0,
            scaleY: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.05,
            stagger: 0.12,
          },
          1.75,
        );

      gsap.utils.toArray(".motion-section").forEach((section) => {
        const title = section.querySelector(".motion-title");
        const cards = section.querySelectorAll(".motion-card");
        const rows = section.querySelectorAll(".motion-row");
        const images = section.querySelectorAll(".motion-image");

        if (title) {
          gsap.set(title, {
            autoAlpha: 0,
            y: 120,
            scale: 1.14,
            clipPath: "inset(0 0 100% 0)",
            transformOrigin: "left bottom",
          });

          gsap.to(title, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.45,
            ease: "expo.out",
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              once: true,
            },
          });
        }

        if (cards.length) {
          gsap.set(cards, {
            autoAlpha: 0,
            y: 76,
            scale: 0.965,
            clipPath: "inset(12% 0 16% 0)",
            transformOrigin: "center bottom",
          });

          gsap.to(cards, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0 0% 0)",
            duration: 1.05,
            ease: "expo.out",
            stagger: { each: 0.12, from: "start" },
            scrollTrigger: {
              trigger: section,
              start: "top 68%",
              once: true,
            },
          });
        }

        if (rows.length) {
          gsap.set(rows, { autoAlpha: 0, x: -42, clipPath: "inset(0 100% 0 0)" });
          gsap.to(rows, {
            autoAlpha: 1,
            x: 0,
            clipPath: "inset(0 0% 0 0)",
            duration: 1,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: section,
              start: "top 62%",
              once: true,
            },
          });
        }

        images.forEach((image) => {
          const img = image.querySelector("img");

          gsap.set(image, { clipPath: "inset(0 0 100% 0)" });
          if (img) {
            gsap.set(img, { scale: 1.12, yPercent: 6 });
          }

          gsap.to(image, {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.35,
            ease: sculptedEase,
            scrollTrigger: {
              trigger: image,
              start: "top 82%",
              once: true,
            },
          });

          if (img) {
            gsap.to(img, {
              scale: 1,
              yPercent: 0,
              duration: 1.6,
              ease: slowReveal,
              scrollTrigger: {
                trigger: image,
                start: "top 82%",
                once: true,
              },
            });

            gsap.to(img, {
              yPercent: -7,
              ease: "none",
              scrollTrigger: {
                trigger: image,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
              },
            });
          }
        });
      });

      ScrollTrigger.refresh();
    });

    return () => {
      context.revert();
    };
  }, [isEnabled]);
}

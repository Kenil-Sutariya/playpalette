import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LionFigurine, ElephantFigurine, TrainFigurine } from "@/components/Figurines";

const AUTO_ADVANCE_MS = 5000;
const RESUME_AFTER_MS = 8000;

// Slides for the demo carousel. To use a real product photo, add the image
// to /public and set `photo` to its filename (see the dinosaur slide).
interface Slide {
  name: string;
  caption: string;
  photo?: string;
  figure?: ReactNode;
}

const slides: Slide[] = [
  {
    name: "Dinosaur POP Toy",
    caption: "Hand-painted dino from our best-selling kit",
    photo: "/dinosaur-kit.png",
  },
  {
    name: "Lion POP Toy",
    caption: "The king of the jungle, painted in bold oranges",
    figure: <LionFigurine className="w-full h-full" />,
  },
  {
    name: "Elephant POP Toy",
    caption: "A gentle giant in bright blues and pinks",
    figure: <ElephantFigurine className="w-full h-full" />,
  },
  {
    name: "Train POP Toy",
    caption: "All aboard — classic engine in playful colours",
    figure: <TrainFigurine className="w-full h-full" />,
  },
];

export default function ProductShowcase() {
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const pausedUntil = useRef(0);

  const count = slides.length;

  // Fractional slide pitch (offsetLeft rounds to integers, and the error
  // accumulated across slides breaks the loop-reset threshold).
  const slideStep = () => {
    const track = trackRef.current;
    if (!track || track.children.length < 2) return 0;
    return (
      track.children[1].getBoundingClientRect().left -
      track.children[0].getBoundingClientRect().left
    );
  };

  const scrollToIndex = (index: number, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({
      left: Math.max(0, index) * slideStep(),
      behavior: reduced || !smooth ? "auto" : "smooth",
    });
  };

  const pauseAutoScroll = () => {
    pausedUntil.current = Date.now() + RESUME_AFTER_MS;
  };

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track || Date.now() < pausedUntil.current) return;
      // Advancing past the last real slide lands on the clone; the scroll
      // handler then resets to the identical first slide invisibly.
      scrollToIndex(currentRef.current + 1);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  const handleScroll = () => {
    const track = trackRef.current;
    const step = slideStep();
    if (!track || step === 0) return;
    // Landed on the clone of slide one — jump back instantly (identical
    // content, so the reset is invisible) to keep the loop seamless.
    if (track.scrollLeft >= step * count - 3) {
      track.scrollTo({ left: 0, behavior: "auto" });
      currentRef.current = 0;
      setCurrent(0);
      return;
    }
    const index = Math.round(track.scrollLeft / step) % count;
    if (index !== currentRef.current) {
      currentRef.current = index;
      setCurrent(index);
    }
  };

  const goTo = (index: number) => {
    pauseAutoScroll();
    scrollToIndex(index);
  };

  const slideCard = (slide: Slide, key: string, hidden = false) => (
    <div
      key={key}
      aria-hidden={hidden || undefined}
      className="w-[85%] sm:w-[60%] lg:w-[38%] shrink-0 snap-start select-none"
    >
      <div className="bg-gradient-to-b from-white to-stone-100 rounded-[2rem] border border-card-border shadow-sm overflow-hidden h-full">
        <div className="aspect-square flex items-center justify-center p-6">
          {slide.photo ? (
            <img
              src={slide.photo}
              alt={slide.name}
              loading="lazy"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          ) : (
            slide.figure
          )}
        </div>
        <div className="px-6 pb-6 text-center">
          <h3 className="font-bold font-heading text-xl text-foreground">{slide.name}</h3>
          <p className="text-sm text-muted-foreground font-body mt-1">{slide.caption}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section id="creations" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-5">
            See What Kids Can <span className="gradient-text">Create</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-body">
            Fun POP toys ready to paint, play, and gift.
          </p>
        </motion.div>

        <div className="relative">
          <button
            onClick={() => goTo(currentRef.current - 1)}
            disabled={current === 0}
            aria-label="Previous toy"
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-card-border shadow-md items-center justify-center text-foreground hover:text-primary hover:shadow-lg transition disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden />
          </button>
          <button
            onClick={() => goTo(currentRef.current + 1)}
            aria-label="Next toy"
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white border border-card-border shadow-md items-center justify-center text-foreground hover:text-primary hover:shadow-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronRight className="w-5 h-5" aria-hidden />
          </button>

          <div
            ref={trackRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Painted POP toy examples"
            tabIndex={0}
            onScroll={handleScroll}
            onPointerDown={pauseAutoScroll}
            onTouchStart={pauseAutoScroll}
            onWheel={pauseAutoScroll}
            onKeyDown={(e) => {
              if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
              e.preventDefault();
              goTo(currentRef.current + (e.key === "ArrowRight" ? 1 : -1));
            }}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-pl-4 sm:scroll-pl-14 pb-2 sm:px-14 -mx-4 px-4 justify-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-3xl [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {slides.map((slide) => slideCard(slide, slide.name))}
            {/* clone of the first slide enables the seamless infinite loop;
                the spacer gives its snap position room to align exactly with
                slide one at scroll 0 */}
            {slideCard(slides[0], "clone-first", true)}
            <div aria-hidden className="shrink-0 w-[20%] sm:w-[45%] lg:w-[66%]" />
          </div>

          <div className="flex justify-center gap-1.5 mt-6" aria-label="Choose toy">
            {slides.map((slide, index) => (
              <button
                key={slide.name}
                onClick={() => goTo(index)}
                aria-label={`Go to ${slide.name}`}
                aria-current={index === current}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  index === current ? "w-5 bg-foreground" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

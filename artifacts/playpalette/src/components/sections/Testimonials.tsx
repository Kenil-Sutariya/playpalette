import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Star,
  Smile,
  ShoppingBag,
  Award,
  ShieldCheck,
  BadgeCheck,
  Truck,
  Heart,
  Leaf,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";
import { reviews, type Review } from "@/lib/reviews";

const INITIAL_VISIBLE = 12;
const AUTO_ADVANCE_MS = 4500;
const RESUME_AFTER_MS = 8000;

// Statistics cards — edit values/labels here.
const stats = [
  { icon: Smile, value: "2,500+", label: "Happy Parents", tint: "bg-secondary/15 text-secondary" },
  { icon: ShoppingBag, value: "5,000+", label: "Orders Delivered", tint: "bg-accent/15 text-accent" },
  { icon: Award, value: "98%", label: "Customer Satisfaction", tint: "bg-purple-100 text-purple-500" },
  { icon: ShieldCheck, value: "100%", label: "Secure & Safe", tint: "bg-sky-100 text-sky-500" },
];

const badges = [
  { icon: BadgeCheck, label: "Verified Purchase", tint: "text-accent" },
  { icon: Truck, label: "Fast Delivery", tint: "text-secondary" },
  { icon: Heart, label: "Child Approved", tint: "text-rose-500" },
  { icon: Leaf, label: "Safe Materials", tint: "text-emerald-500" },
  // Hidden on very small screens to keep the 2-per-row layout clean.
  { icon: Sparkles, label: "Premium Quality", tint: "text-purple-500", hideOnMobile: true },
];

function Stars({ rating, className = "w-4 h-4" }: { rating: number; className?: string }) {
  return (
    <div
      className="flex items-center gap-1 text-secondary"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          aria-hidden
          className={`${className} ${i <= rating ? "fill-current" : "opacity-30"}`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-3xl border border-card-border shadow-sm p-6 md:p-7 transition-all duration-300 md:hover:-translate-y-1.5 md:hover:shadow-md h-full">
      <Stars rating={review.rating} />
      <p className="text-foreground font-body italic leading-relaxed mt-4 mb-5">
        "{review.review}"
      </p>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="font-bold font-heading text-foreground">{review.name}</p>
          <p className="text-sm text-muted-foreground">{review.city}</p>
        </div>
        {review.verified && (
          <span
            className="w-8 h-8 shrink-0 rounded-full bg-green-100 text-green-600 flex items-center justify-center"
            title="Verified purchase"
          >
            <Check className="w-4 h-4" aria-hidden />
            <span className="sr-only">Verified purchase</span>
          </span>
        )}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const reduced = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef(0);
  const pausedUntil = useRef(0);
  const drag = useRef({ active: false, startX: 0, startLeft: 0 });

  const visibleReviews = reviews.slice(0, visibleCount);
  const fadeUp = reduced
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 } }
    : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 } };

  const slideStep = () => {
    const track = trackRef.current;
    if (!track || track.children.length === 0) return 0;
    return track.children.length > 1
      ? (track.children[1] as HTMLElement).offsetLeft - (track.children[0] as HTMLElement).offsetLeft
      : (track.children[0] as HTMLElement).clientWidth;
  };

  const scrollToIndex = (index: number, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;
    const count = track.children.length;
    const target = Math.max(0, Math.min(index, count - 1));
    track.scrollTo({
      left: target * slideStep(),
      behavior: reduced || !smooth ? "auto" : "smooth",
    });
  };

  const pauseAutoScroll = () => {
    pausedUntil.current = Date.now() + RESUME_AFTER_MS;
  };

  // Auto-advance the mobile carousel; paused while the user interacts and
  // disabled entirely for prefers-reduced-motion.
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track || track.offsetParent === null) return; // carousel not shown (desktop)
      if (Date.now() < pausedUntil.current) return;
      const count = track.children.length;
      if (count < 2) return;
      scrollToIndex((currentRef.current + 1) % count);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, visibleCount]);

  const handleScroll = () => {
    const track = trackRef.current;
    const step = slideStep();
    if (!track || step === 0) return;
    const index = Math.round(track.scrollLeft / step);
    if (index !== currentRef.current) {
      currentRef.current = index;
      setCurrent(index);
    }
  };

  // Mouse drag-to-scroll (touch swiping works natively).
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pauseAutoScroll();
    if (e.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;
    drag.current = { active: true, startX: e.clientX, startLeft: track.scrollLeft };
    track.style.scrollSnapType = "none";
    track.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active || !trackRef.current) return;
    trackRef.current.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };

  const endDrag = () => {
    if (!drag.current.active || !trackRef.current) return;
    drag.current.active = false;
    trackRef.current.style.scrollSnapType = "";
    const step = slideStep();
    if (step > 0) scrollToIndex(Math.round(trackRef.current.scrollLeft / step));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    pauseAutoScroll();
    scrollToIndex(currentRef.current + (e.key === "ArrowRight" ? 1 : -1));
  };

  const readMoreButton = visibleCount < reviews.length && (
    <div className="text-center mt-10">
      <button
        onClick={() => setVisibleCount(reviews.length)}
        className="inline-flex items-center gap-2 bg-white border-2 border-secondary text-foreground font-heading font-bold px-8 py-3.5 rounded-full shadow-sm transition-all duration-300 hover:bg-secondary/10 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
      >
        Read More Reviews <ArrowRight className="w-4 h-4" aria-hidden />
      </button>
    </div>
  );

  return (
    <section className="py-24 bg-card overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          {...fadeUp}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="flex justify-center mb-3">
            <Stars rating={5} className="w-7 h-7" />
          </div>
          <p className="text-lg font-semibold text-muted-foreground mb-4">4.9/5 Average Rating</p>
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-5 leading-tight">
            Loved by <span className="text-secondary">Parents</span> Everywhere
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-body">
            Join thousands of happy parents who trust PlayPalette for safe, educational and
            engaging toys.
          </p>
        </motion.div>

        {/* Statistics cards */}
        <motion.div
          {...fadeUp}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-8"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-3xl border border-card-border shadow-sm p-4 md:p-6 flex items-center gap-3 md:gap-4"
            >
              <span className={`w-11 h-11 md:w-14 md:h-14 shrink-0 rounded-2xl flex items-center justify-center ${stat.tint}`}>
                <stat.icon className="w-6 h-6 md:w-7 md:h-7" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-xl md:text-2xl font-extrabold font-heading text-foreground">{stat.value}</p>
                <p className="text-xs md:text-sm text-muted-foreground font-body">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          {...fadeUp}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-3 max-w-2xl sm:max-w-none mx-auto mb-14"
        >
          {badges.map((badge) => (
            <span
              key={badge.label}
              className={`${
                badge.hideOnMobile ? "hidden sm:inline-flex" : "inline-flex"
              } items-center justify-center gap-2 bg-white border border-card-border shadow-sm rounded-full px-4 py-2.5 text-sm font-semibold text-foreground`}
            >
              <badge.icon className={`w-4 h-4 ${badge.tint}`} aria-hidden />
              {badge.label}
            </span>
          ))}
        </motion.div>

        {/* Reviews — desktop/tablet masonry grid */}
        <div className="hidden md:block">
          <div className="columns-2 lg:columns-3 xl:columns-4 gap-6">
            {visibleReviews.map((review, index) => (
              <motion.div
                key={review.name + review.city}
                {...fadeUp}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
                className="break-inside-avoid mb-6"
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </div>
          {readMoreButton}
        </div>

        {/* Reviews — mobile swipeable carousel */}
        <div className="md:hidden">
          <div
            ref={trackRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Customer reviews"
            tabIndex={0}
            onScroll={handleScroll}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onTouchStart={pauseAutoScroll}
            onWheel={pauseAutoScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 cursor-grab active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-3xl [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {visibleReviews.map((review, index) => (
              <div
                key={review.name + review.city}
                className="w-[85%] shrink-0 snap-center select-none"
                aria-label={`Review ${index + 1} of ${visibleReviews.length}`}
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center flex-wrap gap-1.5 mt-6" aria-label="Choose review">
            {visibleReviews.map((review, index) => (
              <button
                key={review.name + review.city}
                onClick={() => {
                  pauseAutoScroll();
                  scrollToIndex(index);
                }}
                aria-label={`Go to review ${index + 1}`}
                aria-current={index === current}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                  index === current ? "w-4 bg-foreground" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>

          {readMoreButton}
        </div>
      </div>
    </section>
  );
}

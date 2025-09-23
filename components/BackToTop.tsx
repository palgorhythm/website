import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function BackToTop(): React.JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [musicPlayerHeight, setMusicPlayerHeight] = useState<number>(0);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const screenHeight = window.innerHeight;

      // Determine scroll direction with more sensitivity for programmatic scrolls
      if (Math.abs(currentScrollY - lastScrollY) > 2) {
        // More sensitive to catch programmatic scrolls
        if (currentScrollY > lastScrollY) {
          setScrollDirection("down");
        } else if (currentScrollY < lastScrollY) {
          setScrollDirection("up");
        }
      }

      setLastScrollY(currentScrollY);

      // Show button if:
      // 1. Scrolled more than 4 screen heights (NN/g guideline)
      // 2. User has scrolled up OR button is already visible (prevents flickering)
      // 3. Not at the very top (more than 200px from top)
      // 4. Allow showing immediately after programmatic navigation
      const isProgrammaticScroll = Math.abs(currentScrollY - lastScrollY) > 50;
      const shouldShow =
        currentScrollY > screenHeight * 4 &&
        (scrollDirection === "up" || isVisible || isProgrammaticScroll) &&
        currentScrollY > 200;

      // Clear any existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      if (shouldShow) {
        setIsVisible(true);
      } else if (scrollDirection === "down" || currentScrollY <= 200) {
        // Hide immediately if at top, or after delay if scrolling down
        if (currentScrollY <= 200) {
          setIsVisible(false);
        } else {
          scrollTimeout = setTimeout(() => {
            setIsVisible(false);
          }, 1000); // 1 second delay before hiding when scrolling down
        }
      }
    };

    // Check for music player height
    const checkMusicPlayer = () => {
      const musicPlayer = document.querySelector(
        '[class*="fixed"][class*="bottom-6"][class*="right-6"]',
      );
      if (musicPlayer) {
        const rect = musicPlayer.getBoundingClientRect();
        setMusicPlayerHeight(rect.height + 24); // Height + some margin
      } else {
        setMusicPlayerHeight(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkMusicPlayer, { passive: true });

    // Initial check
    checkMusicPlayer();

    // Periodic check for dynamic music player
    const interval = setInterval(checkMusicPlayer, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMusicPlayer);
      clearInterval(interval);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [lastScrollY, scrollDirection, isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
      }}
      transition={{ duration: 0.3 }}
      className="fixed right-4 sm:right-6 z-[9999]"
      style={{
        pointerEvents: isVisible ? "auto" : "none",
        bottom: `${Math.max(24, musicPlayerHeight + 8)}px`,
      }}
    >
      <motion.button
        onClick={scrollToTop}
        className="glass rounded-lg text-text-secondary hover:text-accent-primary transition-colors duration-300 hover-lift preserve-styles"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Back to top"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          boxShadow:
            "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)",
          padding: "14px 20px",
          minHeight: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          fontSize: "14px",
          fontWeight: "600",
          fontFamily: "Comfortaa, system-ui, -apple-system, sans-serif",
          letterSpacing: "0.025em",
          textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
          whiteSpace: "nowrap" as const,
          lineHeight: "1",
          cursor: "pointer",
        }}
      >
        <ChevronUp className="w-5 h-5 drop-shadow-sm stroke-2" />
        <span className="font-semibold" style={{ lineHeight: "1" }}>
          <span className="hidden sm:inline">Back to Top</span>
          <span className="sm:hidden">Top</span>
        </span>
      </motion.button>
    </motion.div>
  );
}

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  scrollY: number;
}
export default function ModernNavigation({
  scrollY,
}: NavigationProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setIsOpen(false);

    if (href.startsWith("#")) {
      // Small delay to let menu close animation start
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  const navItems = [
    { label: "Music", href: "#music" },
    { label: "Shows", href: "#gigs" },
    { label: "Expertise", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          ></motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  handleNavClick(item.href, e);
                }}
                className="text-text-secondary hover:text-text-primary transition-colors duration-300 relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}

            <motion.a
              href="https://batterydrums.bandcamp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-4 py-2 rounded-lg font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              BATTERY
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center justify-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`text-text-secondary hover:text-text-primary transition-colors duration-200 flex items-center justify-center ${
                isOpen ? "glass rounded-lg" : ""
              }`}
              style={{
                outline: "none",
                padding: "8px",
              }}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0,
            originX: 1,
            scaleX: isOpen ? 1 : 0.8,
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="md:hidden overflow-hidden glass rounded-xl"
          style={{
            marginTop: "8px",
            transformOrigin: "top right",
          }}
        >
          <div className="pt-6 pb-4 px-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  handleNavClick(item.href, e);
                }}
                className="block text-text-secondary hover:text-text-primary transition-colors duration-200 py-2 cursor-pointer"
                style={{ textDecoration: "none" }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://batterydrums.bandcamp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-fit px-4 py-2 bg-accent-primary text-white rounded-lg font-medium mt-4"
              style={{ textDecoration: "none" }}
              onClick={() => setIsOpen(false)}
            >
              BATTERY
            </a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

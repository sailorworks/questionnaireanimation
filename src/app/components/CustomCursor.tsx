// components/CustomCursor.tsx
"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { motion, Variants } from "framer-motion";

// 1. Create a context to manage the cursor variant
interface CursorContextType {
  setCursorVariant: (variant: "default" | "hover") => void;
}
const CursorContext = createContext<CursorContextType | null>(null);

// Custom hook to use the context
export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
};

// 2. Create the Provider component
export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover">(
    "default"
  );

  return (
    <CursorContext.Provider value={{ setCursorVariant }}>
      {/* 👇 HIDES THE DEFAULT SYSTEM CURSOR */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {children}
      <CustomCursor variant={cursorVariant} />
    </CursorContext.Provider>
  );
};

// 3. The CustomCursor component itself
const CustomCursor = ({ variant }: { variant: "default" | "hover" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  // Define a consistent size for the cursor
  const cursorSize = 24;

  const cursorVariants: Variants = {
    // Both 'default' and 'hover' variants will share the same style
    default: {
      x: mousePosition.x - cursorSize / 2,
      y: mousePosition.y - cursorSize / 2,
      width: cursorSize,
      height: cursorSize,
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      filter: "drop-shadow(0 0 5px rgba(0, 0, 0, 0.2))",
      boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.75)",
    },
    hover: {
      x: mousePosition.x - cursorSize / 2,
      y: mousePosition.y - cursorSize / 2,
      width: cursorSize,
      height: cursorSize,
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      filter: "drop-shadow(0 0 5px rgba(0, 0, 0, 0.2))",
      boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.75)",
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full z-50 pointer-events-none"
      variants={cursorVariants}
      animate={variant}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  );
};

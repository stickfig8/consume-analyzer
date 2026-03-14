import { motion } from "motion/react";
import type React from "react";
type Props = {
  delay: number;
  children: React.ReactNode;
};
export default function CommonMotionDiv({ delay, children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

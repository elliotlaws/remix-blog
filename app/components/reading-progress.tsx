import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export const ReadingProgress = ({ progress }: { progress: number }) => {
  const [visibility, setVisibility] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  const progressBarWrapperVariants = {
    hide: {
      opacity: shouldReduceMotion ? 1 : 0,
    },
    show: (visibility: boolean) => ({
      opacity: shouldReduceMotion ? 1 : visibility ? 0.7 : 0,
    }),
  };

  useEffect(
    () => setVisibility(progress > 0.07 && progress < 0.95),
    [progress]
  );

  return (
    <motion.div
      initial="hide"
      variants={progressBarWrapperVariants}
      animate="show"
      transition={{ type: "spring" }}
      custom={visibility}
      className="w-[4px] bg-gray-700 h-[calc(88vh - 40px)]"
    >
      <motion.div
        style={{
          transformOrigin: "top",
          scaleY: progress,
        }}
        className="w-[4px] h-full bg-cyan-500"
        data-testid="progress-bar"
        data-testprogress={progress}
      />
    </motion.div>
  );
};

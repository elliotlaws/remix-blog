import { motion } from "framer-motion";

export const ReadingProgress = ({ progress }: { progress: number }) => {
  return (
    <div className="w-[4px] bg-gray-300 dark:bg-gray-700 h-[calc(88vh - 40px)]">
      <motion.div
        style={{
          transformOrigin: "top",
          scaleY: progress,
        }}
        className="w-[4px] h-full bg-cyan-600 dark:bg-cyan-500"
        data-testid="progress-bar"
        data-testprogress={progress}
      />
    </div>
  );
};

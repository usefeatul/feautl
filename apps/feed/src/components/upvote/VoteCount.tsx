import { motion, AnimatePresence } from "framer-motion";

interface VoteCountProps {
  upvotes: number;
}

export function VoteCount({ upvotes }: VoteCountProps) {
  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.span
        key={upvotes}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2 }}
        className="tabular-nums font-medium"
      >
        {upvotes}
      </motion.span>
    </AnimatePresence>
  );
}

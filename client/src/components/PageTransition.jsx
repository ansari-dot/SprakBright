import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const pageVariants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: 20,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3,
};

const PageTransition = ({ children }) => {
  const { pathname } = useLocation();

  // Scroll to top when path changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{
        minHeight: 'calc(100vh - 200px)',
        width: '100%',
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;

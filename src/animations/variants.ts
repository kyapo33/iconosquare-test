import { Variants } from 'framer-motion';

export const pageBackgroundVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const backgroundGradientVariants: Variants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: { 
    opacity: 0.8, 
    scale: 1,
    transition: { 
      duration: 1.2,
      ease: "easeOut" 
    }
  }
};

export const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.05
    }
  }
};

export const titleVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.2,
      duration: 0.4
    }
  }
};

export const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.4,
      duration: 0.3,
      type: "spring",
      stiffness: 500
    }
  }
};

export const chartVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.6,
      duration: 0.8
    }
  }
};

export const tableContainerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      duration: 0.5,
      when: "beforeChildren"
    }
  }
};

export const rowVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1 + custom * 0.03,
      duration: 0.3,
      ease: "easeOut"
    }
  }),
  hover: { 
    backgroundColor: "rgba(99, 102, 241, 0.08)",
    transition: { duration: 0.2 }
  }
};

export const timeControlsContainerVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300 }
  }
};


export const buttonHoverEffect = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 400 }
};

export const buttonTapEffect = {
  scale: 0.95
};

export const inputVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 300
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    transition: {
      duration: 0.15
    }
  }
};

export const valueVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.2
    }
  },
  hover: { 
    scale: 1.03,
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { 
    scale: 0.97,
    backgroundColor: "rgba(99, 102, 241, 0.15)",
    transition: {
      duration: 0.1
    }
  }
}; 
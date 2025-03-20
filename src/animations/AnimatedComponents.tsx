import React, { FC, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { containerVariants, itemVariants } from './variants';

interface AnimatedContainerProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedContainer: FC<AnimatedContainerProps> = ({ children, className = '', delay, ...props }) => {
  const customVariants =
    delay !== undefined
      ? {
          hidden: containerVariants.hidden,
          visible: {
            ...containerVariants.visible,
            transition: {
              duration: 0.6,
              ease: 'easeOut',
              when: 'beforeChildren',
              staggerChildren: 0.05,
              delay
            }
          }
        }
      : containerVariants;

  return (
    <motion.div className={className} variants={customVariants} initial='hidden' animate='visible' {...props}>
      {children}
    </motion.div>
  );
};

interface AnimatedItemProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
}

export const AnimatedItem: FC<AnimatedItemProps> = ({ children, className = '', ...props }) => {
  return (
    <motion.div className={className} variants={itemVariants} {...props}>
      {children}
    </motion.div>
  );
};

interface AnimatedButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const AnimatedButton: FC<AnimatedButtonProps> = ({
  children,
  className = '',
  disabled = false,
  onClick,
  ...props
}) => {
  return (
    <motion.button
      className={className}
      whileHover={!disabled ? { scale: 1.05 } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};

interface AnimatedTextProps extends HTMLMotionProps<'span'> {
  children: ReactNode;
  className?: string;
}

export const AnimatedText: FC<AnimatedTextProps> = ({ children, className = '', ...props }) => {
  return (
    <motion.span className={className} initial={{ opacity: 0 }} animate={{ opacity: 1 }} {...props}>
      {children}
    </motion.span>
  );
};

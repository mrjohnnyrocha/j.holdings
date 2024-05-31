import React, { useEffect, useState, RefObject } from 'react';
import styles from './PreLoader.module.css';

interface PreLoaderProps {
  targetRef: RefObject<HTMLDivElement>;
}

const PreLoader: React.FC<PreLoaderProps> = ({ targetRef }) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [targetPosition, setTargetPosition] = useState({ top: 0, left: 0, scale: 1 });

  useEffect(() => {
    if (targetRef.current) {
      const { top, left } = targetRef.current.getBoundingClientRect();
      const logoSize = 128;
      setTargetPosition({
        top: top + window.scrollY - logoSize / 2,
        left: left + window.scrollX - logoSize / 2,
        scale: 0.1,
      });
    }

    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [targetRef]);

  return (
    <div
      className={styles.preLoader}
      style={
        !isAnimating
          ? { top: `${targetPosition.top}px`, left: `${targetPosition.left}px`, transform: `scale(${targetPosition.scale})` }
          : {}
      }
    >
      <img
        src="/assets/j_logo.png"
        alt="Logo"
        className={`${styles.logo} ${!isAnimating ? styles.move : ''}`}
      />
    </div>
  );
};

export default PreLoader;

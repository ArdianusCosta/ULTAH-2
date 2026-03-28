'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode, useEffect, useState } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth > 1024);
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  if (!isDesktop) return <>{children}</>;

  return (
    <ReactLenis root options={{ 
      lerp: 0.1, 
      duration: 1.5, 
      smoothWheel: true 
    }}>
      {children}
    </ReactLenis>
  );
}

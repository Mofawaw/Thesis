import { useEffect, useRef, useState } from 'react';
import { ThColorKeys } from '../../../tailwind.config.ts'

export default function ThButton({ children = <></>, width, height, thColor, ...props }: { children?: React.ReactNode, width?: number, height: number, thColor: ThColorKeys, [key: string]: any }) {
  const [contentWidth, setContentWidth] = useState(0);
  const contentRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!width && contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth);
    }
  }, [children, width]);

  const buttonStyle = width ? { width: `${width}px`, height: `${height}px` } : { height: `${height}px` };
  const buttonShadowStyle = width ? { width: `${width - 10}px`, height: `${height - 10}px` } : { width: `${contentWidth - 10}px`, height: `${height - 10}px` }

  return (
    <button
      ref={contentRef}
      style={buttonStyle}
      className={`relative inline-block p-0 border-0 bg-transparent mb-[6px]`}
      {...props}
    >
      <span
        className={`
          block bg-${thColor}-20 rounded-th w-full h-full relative z-20 flex justify-center items-center transition duration-300 ease-in-out 
          hover:scale-105 hover:-translate-y-1 
          active:scale-95 active:translate-y-1 active:duration-100`
        }>
        {children}
      </span>
      <span
        style={buttonShadowStyle}
        className={`block bg-${thColor}-30 rounded-th absolute bottom-[-6px] left-[5px] z-10`}>
      </span>
    </button>
  )
}

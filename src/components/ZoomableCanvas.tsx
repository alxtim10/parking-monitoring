'use client';

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ReactNode } from 'react';

interface ZoomableCanvasProps {
  children: ReactNode;
}

export default function ZoomableCanvas({ children }: ZoomableCanvasProps) {
  return (
    <TransformWrapper
      minScale={0.5}
      maxScale={2}
      initialScale={1}
      wheel={{ step: 0.1 }}
      doubleClick={{ disabled: true }}
      pinch={{ disabled: false }}
      panning={{ disabled: false }}
    >
      <TransformComponent>
        {children}
      </TransformComponent>
    </TransformWrapper>
  );
}

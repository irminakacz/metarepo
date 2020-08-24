import { AnimationColor } from '@revert/animation'
import { PrimitiveBorder } from '@revert/border'
import type { TPrimitiveBorder } from '@revert/border'
import React from 'react'
import type { FC } from 'react'

export type TBorder = TPrimitiveBorder & {
  animationTime?: number,
}

export const Border: FC<TBorder> = ({ color, animationTime = 200, ...props }) => (
  <AnimationColor toColor={color} time={animationTime}>
    {(color) => (
      <PrimitiveBorder
        color={color}
        {...props}
      />
    )}
  </AnimationColor>
)

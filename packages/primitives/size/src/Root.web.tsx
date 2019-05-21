import React, { useRef, useLayoutEffect } from 'react'
import {
  component,
  startWithType,
  mapDefaultProps,
} from 'refun'
import { normalizeStyle } from 'stili'
import { isFunction } from 'tsfn'
import { TSize } from './types'

const style = normalizeStyle({
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 0,
  flexShrink: 0,
  alignSelf: 'flex-start',
})

export const Size = component(
  startWithType<TSize>(),
  mapDefaultProps({
    valuesToWatch: [],
  }),
  (props) => {
    const ref = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
      if (ref.current !== null) {
        const rect = ref.current.getBoundingClientRect()
        const width = Math.round(rect.width * 1000) / 1000
        const height = Math.round(rect.height * 1000) / 1000
        const hasWidthChanged = props.width !== width
        const hasHeightChanged = props.height !== height

        if (hasWidthChanged && isFunction(props.onWidthChange)) {
          props.onWidthChange(width)
        }

        if (hasHeightChanged && isFunction(props.onHeightChange)) {
          props.onHeightChange(height)
        }

        if ((hasWidthChanged || hasHeightChanged) && isFunction(props.onChange)) {
          props.onChange({ width, height })
        }
      }
    }, props.valuesToWatch)

    return {
      ...props,
      ref,
    }
  }
)('Size', ({ ref, children }) => (
  <div style={style} ref={ref}>{children}</div>
))

import { PrimitiveBlock, Block } from '@revert/block'
import { LayoutContext } from '@revert/layout'
import { PrimitiveTransform } from '@revert/transform'
import React from 'react'
import {
  mapWithProps,
  startWithType,
  mapDebouncedHandlerTimeout,
  pureComponent,
  mapState,
  mapHandlers,
  mapWithPropsMemo,
  mapContext,
} from 'refun'
import { isDefined } from 'tsfn'
import { BLACK, WHITE } from '../../colors'
import { mapStoreState, setTransform } from '../../store'
import { mapMetaStoreState } from '../../store-meta'
import { SYMBOL_DEMO_AREA } from '../../symbols'
import type { TTransform } from '../../types'
import { PrimitiveBackground } from '../background'
import { CanvasGrid } from '../canvas-grid'
import { PluginContext } from '../plugin-provider'
import { ThemeContext } from '../theme-context'
import { PureComponent } from './pure-component'

const COMPONENT_MIN_WIDTH = 200
const round10 = (num: number) => Math.round(num / 10) * 10

export type TDemoArea = {}

export const DemoArea = pureComponent(
  startWithType<TDemoArea>(),
  mapContext(ThemeContext),
  mapContext(LayoutContext),
  mapContext(PluginContext),
  mapStoreState(({ width, height, hasGrid, shouldStretch, isCanvasDarkMode, transformX, transformY, transformZ }) => ({
    canvasWidth: width,
    canvasHeight: height,
    shouldStretch,
    hasGrid,
    isCanvasDarkMode,
    transform: {
      x: transformX,
      y: transformY,
      z: transformZ,
    },
  }), ['width', 'height', 'hasGrid', 'shouldStretch', 'isCanvasDarkMode', 'transformX', 'transformY', 'transformZ']),
  mapMetaStoreState(({ Component, componentProps, componentConfig, componentPropsChildrenMap }) => ({
    Component,
    componentProps,
    componentPropsChildrenMap,
    componentConfig,
  }), ['Component', 'componentProps', 'componentPropsChildrenMap', 'componentConfig']),
  mapHandlers({
    dispatchTransform: () => (transform: TTransform) => setTransform(transform),
  }),
  mapDebouncedHandlerTimeout('dispatchTransform', 150),
  mapWithProps(({ canvasWidth, canvasHeight, _width, _height }) => ({
    canvasLeft: Math.max((_width - canvasWidth) / 2, 0),
    canvasTop: Math.max((_height - canvasHeight) / 2, 0),
  })),
  mapState('componentHeight', 'setComponentHeight', () => 0, []),
  mapWithPropsMemo(({ componentHeight, canvasWidth, canvasHeight, shouldStretch }) => {
    const componentWidth = shouldStretch ? canvasWidth : COMPONENT_MIN_WIDTH

    if (componentHeight === 0) {
      return {
        componentLeft: 0,
        componentTop: 0,
        componentWidth: COMPONENT_MIN_WIDTH,
      }
    }

    return {
      componentLeft: shouldStretch ? 0 : round10((canvasWidth - componentWidth) / 2),
      componentTop: round10((canvasHeight - componentHeight) / 2),
      componentWidth,
    }
  }, ['componentHeight', 'shouldStretch', 'canvasWidth', 'canvasHeight'])
)(({
  canvasWidth,
  canvasHeight,
  canvasLeft,
  canvasTop,
  Component,
  componentProps,
  hasGrid,
  transform,
  componentWidth,
  componentLeft,
  componentTop,
  componentHeight,
  setComponentHeight,
  Provider,
  theme,
  isCanvasDarkMode,
}) => (
  <Block shouldHideOverflow>
    <PrimitiveBackground color={theme.demoAreaBackgroundColor}/>
    <PrimitiveTransform
      shouldUse3d
      x={canvasLeft + transform.x}
      y={canvasTop + transform.y}
      scale={transform.z}
    >
      <PrimitiveBlock
        shouldFlow
        width={canvasWidth}
        height={canvasHeight}
      >
        <PrimitiveBackground color={isCanvasDarkMode ? BLACK : WHITE}/>

        {Component !== null && (
          <LayoutContext.Provider
            value={{
              _x: componentLeft,
              _y: componentHeight,
              _left: componentLeft,
              _top: componentTop,
              _width: componentWidth,
              _height: componentHeight,
              _maxWidth: componentWidth,
              _parentLeft: componentLeft,
              _parentTop: componentTop,
              _parentWidth: componentWidth,
              _parentHeight: componentHeight,
              _onHeightChange: setComponentHeight,
            }}
          >
            {isDefined(Provider)
              ? (
                <Provider Component={Component} props={componentProps}/>
              )
              : (
                <PureComponent Component={Component} props={componentProps}/>
              )}
          </LayoutContext.Provider>
        )}

        {hasGrid && (
          <CanvasGrid
            width={canvasWidth}
            height={canvasHeight}
            shouldDegrade={false}
            isCanvasDarkMode={isCanvasDarkMode}
          />
        )}
      </PrimitiveBlock>
    </PrimitiveTransform>
  </Block>
))

DemoArea.displayName = 'DemoArea'
DemoArea.componentSymbol = SYMBOL_DEMO_AREA

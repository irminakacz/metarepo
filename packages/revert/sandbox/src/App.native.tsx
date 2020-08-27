import { Root } from '@revert/root'
import React from 'react'
import { component, startWithType, onChange } from 'refun'
import { PluginProvider } from './components/plugin-provider'
import { Sandbox } from './components/sandbox'
import { ThemeProvider } from './components/theme-provider'
import { setComponentsList } from './store-meta'
import type { TApp } from './types'
import './store'
import './store-sync'

export const App = component(
  startWithType<TApp>(),
  onChange(({ components }) => {
    setComponentsList(components)
  }, ['components'])
)(({ theme, icons, popoverPlugin, ComponentWrapperPlugin }) => (
  <Root>
    <ThemeProvider theme={theme} icons={icons}>
      <PluginProvider popoverPlugin={popoverPlugin} ComponentWrapperPlugin={ComponentWrapperPlugin}>
        <Sandbox/>
      </PluginProvider>
    </ThemeProvider>
  </Root>
))

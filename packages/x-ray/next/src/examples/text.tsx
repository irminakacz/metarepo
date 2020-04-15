import React from 'react'
import { Text } from 'react-native'
import { map, range } from 'iterama'
import { TExample } from '../types'

export const examples = map<number, TExample>((i) => ({
  id: String(i),
  element: <Text>{i}</Text>,
  options: {
    hasOwnWidth: true,
  },
  meta: [i],
}))(range(10))

export const name = 'Text'

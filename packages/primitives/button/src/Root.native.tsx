import React, { FC } from 'react'
import { TouchableWithoutFeedback, View } from 'react-native'
import { TStyle } from '@lada/prefix'
import { TButtonProps } from './types'

const hitSlop = {
  bottom: 5,
  left: 5,
  right: 5,
  top: 5,
}

const defaultStyle: TStyle = {
  flexDirection: 'row',
  flexGrow: 1,
  flexShrink: 1,
  alignSelf: 'stretch',
}

export const Button: FC<TButtonProps> = ({
  id,
  accessibilityLabel,
  isDisabled,
  onPress,
  onPressIn,
  onPressOut,
  children,
}) => (
  <TouchableWithoutFeedback
    testID={id}
    accessibilityLabel={accessibilityLabel}
    disabled={isDisabled}
    hitSlop={hitSlop}
    onPress={onPress}
    onPressIn={onPressIn}
    onPressOut={onPressOut}
  >
    <View style={defaultStyle}>
      {children}
    </View>
  </TouchableWithoutFeedback>
)

Button.displayName = 'Button'

export type TDimensions = {
  width: number,
  height: number,
}

export type TSize = {
  valuesToWatch?: any[],
  width?: number,
  onWidthChange?: (width: number) => void,
  height?: number,
  onHeightChange?: (height: number) => void,
  onChange?: (dimensions: TDimensions) => void,
}

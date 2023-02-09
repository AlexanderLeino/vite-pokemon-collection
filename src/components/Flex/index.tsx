import React, {ReactNode}from 'react'

interface props {
  children: ReactNode,
  flexDirection?: string,
  borderRadius?: string,
  justifyContent?: string, 
  backgroundColor?:string,
  alignItems?: string,
  boxShadow?: string,
  width?: string,
  paddingY?: string,
  paddingX?: string,
  marginRight?: string,
  margin?: string,
  marginLeft?: string,
  marginTop?: string,
  marginBottom?: string,
  flexWrap?: string,
  grow?: string,
  borderWidth?: string,
  borderColor?: string,
  horizontalChild?: string,
  padding?: string
}

const Flex = ({children, flexDirection = 'row', borderRadius, justifyContent, backgroundColor, alignItems, boxShadow, width='w-fit', paddingY='py-0', paddingX='px-0', margin='m-0', marginRight='mr-0', borderWidth= '',  marginLeft='ml-0', marginTop='mt-0', marginBottom, flexWrap='flex-wrap', grow='grow', borderColor, horizontalChild}:props) => {

  return (
    <div className={`flex ${flexDirection} ${borderRadius} ${justifyContent} ${backgroundColor} ${alignItems} ${boxShadow} ${width} ${paddingY} ${paddingX} ${margin} ${marginRight} ${marginLeft} ${marginTop} ${marginBottom} ${flexWrap} ${grow} ${borderWidth} ${borderColor} ${horizontalChild}`}>{children}</div>
  )
}

export default Flex

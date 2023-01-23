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
}

const Flex = ({children, flexDirection = 'row', borderRadius, justifyContent, backgroundColor, alignItems = 'center', boxShadow, width = 'w-fit', paddingY='py-0', paddingX='px-0', margin='m-0', marginRight='mr-0',  marginLeft='ml-0', marginTop='mt-0', marginBottom, flexWrap='flex-wrap', grow='grow'}:props) => {
  return (
    <div className={`flex ${flexDirection} ${borderRadius} ${justifyContent} ${backgroundColor} ${alignItems} ${boxShadow} ${width} ${paddingY} ${paddingX} ${margin} ${marginRight} ${marginLeft} ${marginTop} ${marginBottom} ${flexWrap} ${grow}`}>{children}</div>
  )
}

export default Flex

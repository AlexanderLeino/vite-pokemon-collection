import React from 'react'

interface CardSet {
  name: string,
  year: number,
  totalNumberOfCardsInSet: number,
}

interface Props {
  cardSets: CardSet[]
}


export const Select = ({cardSets}: Props) => {
  return (
    <select>
       {cardSets?.map((cardSet) => {
       return <option>{cardSet?.name}</option>
       })}
    </select>
  )
}

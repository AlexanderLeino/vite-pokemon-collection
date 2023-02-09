import { FindCard } from "../components/Form/FindCard"
import { Badges } from "../components/Badges"
import { Card } from "../components/Card"
import Flex from "../components/Flex"

const CardFinder = () => {
  let card = {
    name: "Umbreon", 
    prefix: 'M',
    suffix: 'VMax',
    cardType: "Pokemon",
    artist: "Artist Name Here",
    cardSet: "Evolving Skies", 
    year: '2022',
    cardNumber: 215, 
    price: 475.17,
    quantity: 2,
    picture: "https://commondatastorage.googleapis.com/images.pricecharting.com/51be4d69dd4d183041e131460ce0073a5b8b4b574749d41b253f7eb8541ab748/240.jpg",
    tags: ['Vmax', "Psychic", "Evolving Skies", "Umbreon"],
    rating: 0
  }
  return (
    <>
      <FindCard />
      <Flex horizontalChild="space-x-4">
        <Card prefix={card?.prefix} suffix={card?.suffix} name={card.name} cardType={card.cardType} artist={card.artist} cardNumber={card.cardNumber} rating={card.rating} quantity={card.quantity} picture={card.picture} price={card.price} tags={card.tags}/>
        <Card name={card.name} cardType={card.cardType} artist={card.artist} cardNumber={card.cardNumber} rating={card.rating} quantity={card.quantity} picture={card.picture} price={card.price} tags={card.tags}/>
      </Flex>
    </>
  )
}

export default CardFinder

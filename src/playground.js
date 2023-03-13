let pokemonArray = [ 
    {
        "name" : "Umbreon",
        "suffix" : "VMAX",
        "cardType" : "Pokemon",
        "artist" : "daf",
        "elementType" : "Colorless",
        "price" : 543.36,
        "picture" : "https://commondatastorage.googleapis.com/images.pricecharting.com/51be4d69dd4d183041e131460ce0073a5b8b4b574749d41b253f7eb8541ab748/240.jpg",
        "quantity" : 0,
        "cardNumber" : "215",
        "tags" : [ 
            "Vmax", 
            "Colorless", 
            "Evolving Skies", 
            "Umbreon", 
            "2021"
        ],
       
        "__v" : 0
    }, 
    {
        "name" : "Pikachu",
        "suffix" : "VMAX",
        "cardType" : "Pokemon",
        "artist" : "Souichirou Gunjima",
        "elementType" : "Lighting",
        "price" : 41.95,
        "picture" : "https://commondatastorage.googleapis.com/images.pricecharting.com/a93aba451118d59719219dc381ce7fe9c273ff8992f344ea0b1294811d6ec14e/240.jpg",
        "quantity" : 0,
        "cardNumber" : "TG17",
        "tags" : [ 
            "VMAX", 
            "Lighting", 
            "Lost Origin", 
            "Pikachu", 
            "2022"
        ],
      
        "__v" : 0
    }
]

const includesArray = [""]

const filterFunction = (pokemon) => {
    let results = pokemon.tags.some(tag => {
        let founded = includesArray.find(element => element === tag)
    
        if(founded) {
            return true
        } else {
            return false
        }
    })

    return results
}
const whatsHere = ["1800"]


let pokemon = pokemonArray.filter(pokemon => {
    if(filterFunction(pokemon)) {
        return true
    } else {
        return false
    }
})
console.log("POKEY", pokemon)

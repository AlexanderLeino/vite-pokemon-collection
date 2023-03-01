const pokemonArray = [{prefix: 'Galarian', name: 'Zpados', suffix: 'V' }, {prefix: 'Origin foRme', name: 'Dialga', suffix: 'V'}, {prefix: 'Ice Rider ', name: 'Calyrex', suffix: 'VMAX'}]

const transformArray = (pokemon) => {
    if(pokemon.prefix){
        let arrayedPrefix = pokemon.prefix.split(' ')
        let prefixArray = []

        arrayedPrefix.forEach((word) => {
            let firstLetter = word[0].toUpperCase()
            let restOfWord = word.slice(1).toLowerCase()

            let newWord = `${firstLetter}${restOfWord}`
            prefixArray.push(newWord)
        })
        let joinedArray = prefixArray.join(' ')
        console.log("NEW PREFIX", joinedArray)
    }
}

const pokemon1 = {prefix: 'Galarian', name: 'Zpados', suffix: 'V' }

const pokemon2 = {prefix: 'Origin FoRme', name: 'Dialga', suffix: 'V'}

const pokemon3 = {prefix: 'Ice Rider', name: 'Calyrex', suffix: 'VMAX'}

const pokemon4 = {prefix: '', name: 'Blastoise', suffix: 'VMAX'}

transformArray(pokemon1)
transformArray(pokemon2)
transformArray(pokemon3)
transformArray(pokemon4)

let name = 'Moltres & Zapdos & Articuno'

const makeTags = (name) => {
    let tagArray = ["GX", "Water"]
    let names = name.split("&")
    console.log(names)
    tagArray = [...tagArray, names].flat()
    console.log(tagArray)
}

makeTags(name)
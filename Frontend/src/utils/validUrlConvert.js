function validUrlConvert(name){
    const url = name?.replaceAll(" ", "-")?.replaceAll(",", "-")?.replaceAll("and", "-")
    return url
}

export default validUrlConvert
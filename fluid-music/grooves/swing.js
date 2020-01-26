const heavy = {
    name: "Heavy Swing",
    oLibrary: {'a': 0, 'b': 0.05},
    vLibrary: {'a':64, 'b': 80}, 
    rhythm     : "1+2+",
    time       : "abab",
    velocity   : "abab", 
}

const med = {
    name: "Medium Swing",
    oLibrary: {'a': 0, 'b': 0.03}, 
    vLibrary: {'a':64, 'b': 80}, 
    rhythm     : "1+2+",
    time       : "abab",
    velocity   : "abab",
}

const light = {
    name: "Light Swing",
    oLibrary: {'a': 0, 'b': 0.01}, 
    vLibrary: {'a':64, 'b': 80}, 
    rhythm     : "1+2+",
    time       : "abab",
    velocity   : "abab", 
}

module.exports = {
    heavy,
    med,
    light
}
const heavy = {
    name: "Heavy Swing",
    oLibrary: {'a': 0, 'b': 0.05},
    vLibrary: {'a':64, 'b': 80}, 
    rhythm     : "1+",
    time       : "ab",
    velocity   : "ab", 
}

const med = {
    name: "Medium Swing",
    oLibrary: {'a': 0, 'b': 0.03}, 
    vLibrary: {'a':64, 'b': 80}, 
    rhythm     : "1+",
    time       : "ab",
    velocity   : "ab",
}

const light = {
    name: "Light Swing",
    oLibrary: {'a': 0, 'b': 0.01}, 
    vLibrary: {'a':64, 'b': 80}, 
    rhythm     : "1+",
    time       : "ab",
    velocity   : "ab", 
}

module.exports = {
    heavy,
    med,
    light
}
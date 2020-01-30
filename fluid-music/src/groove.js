const grooves = require("../grooves/grooveLibrary");
const tab = require("./tab")

const getGroove = function(groovelib, grooveName){

    for(const val of Object.values(groovelib)){
        if (val === grooveName)
            return groovelib
        else if (typeof val === "object"){
            let g = getGroove(val, grooveName)
            if (g !== null)
                return g
        }
    }
    return null;
};

/**
 * Applies a specified groove onto an array of note objects
 * @param {Object[]} notes - An array of note objects
 * @param {string | Object} grooveItem - Either the name of the groove present 
 *        within the groove library, or a new groove object.
 * @param {Object} multipliers - An object of the form {v: number, o: number, l: number}
 *        the keys are: velocity, offset and level respectively. 
 *        Level affects the overall effect the groove has on the note objects.
 * @param {number} randomness - A number representing the amount of randomness added to the offset
 * @returns {Object[]}  - The modified note array
 */
const applyGroove = function(notes, grooveItem, multipliers, randomness=0) {
    if (typeof grooveItem === "string"){
        selG = getGroove(grooves, grooveItem);
        if (selG === null) throw new Error ("Groove Not Found");
    }   
    else if (typeof grooveItem === "object")
        selG = grooveItem;
    else
        throw new Error("grooveItem must either be a string or valid groove object");

    if (typeof randomness !== "number")
        throw Error("randomness must be a number.");
    if (typeof multipliers === "object"){
        multipliers.v = multipliers.v ? multipliers.v : 1;
        multipliers.o = multipliers.o ? multipliers.o : 1;
        multipliers.l = multipliers.l ? multipliers.l : 1;
    }
    else
        multipliers = {v: 1, o: 1, l: 1};
        
    if (!selG.oLibrary || !selG.vLibrary || !selG.time || !selG.velocity || !selG.rhythm) 
        throw new Error("Invalid Groove Object");
    
    const sortedNotes = JSON.parse(JSON.stringify(notes)).sort((a, b) => (a.s > b.s) ? 1 : -1);
    const rhythmDeltas = tab.parseRhythm(selG.rhythm).deltas;

    var rhythmIter = 0;
    var elapsed = 0;
    for (var i = 0; i < sortedNotes.length; i++){
        if (sortedNotes[i].s > elapsed){
            rhythmIter = (rhythmIter+1)%rhythmDeltas.length;
            elapsed += rhythmDeltas[rhythmIter];
        }
        if (elapsed === sortedNotes[i].s){
            if (selG.oLibrary.hasOwnProperty(selG.time[rhythmIter])){
                sortedNotes[i].s += selG.oLibrary[selG.time[rhythmIter]] * multipliers.o * multipliers.l;
                let randTime = Math.random() * ((0.05)-0.25) * randomness;
                sortedNotes[i].s += randTime;
            }
            if (selG.vLibrary.hasOwnProperty(selG.velocity[rhythmIter])){
                sortedNotes[i].v = selG.vLibrary[selG.velocity[rhythmIter]];
                sortedNotes[i].v *= multipliers.v;
                sortedNotes[i].v *= multipliers.l;
            }
        }
    }

    return sortedNotes;
};

module.exports = {applyGroove};

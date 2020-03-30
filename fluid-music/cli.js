#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const fluid = require('./src/index.js');
const argv = process.argv.slice(2);

let docs = 'usage: fluid [flags] command arg\n\n';
function addDocstring(name, string) {
  docs += `${name}\n    ${string}\n`;
};

/** Put all args that are meant to have values here (as opposed to "flags" which
 * will not have a value.
 *
 * If an value does not begin with a `-` character, it is a command, and
 * should be executed. All args and commands  in the object below MUST be
 * specified with a value. It is possible to have commands that have no value
 * but they should appear in the `commands` object. Not in the parsedArgs
 * object.
 *
 * Terms:
 * value - anything in argv
 * argument - any argument to a value. Both commands and flags
 * commands - anything that does not begin with `-`, and is not an argument
 * flags - a value, beginning with a `-`, that has no argument
 */
const parsedArgs = {
  "-p": 9999,
  "to": NaN, // typeof NaN === 'number'
  "create": null,
  "open": null,
  "saveas": null,
  "render": null,
};


// For each argument, if it has value in parsedArgs, augment the `parsedArgs`
// object with the appropriate argument extracted from process.argv.
//
// Commands with arguments will be placed in parsedArgs, and the command itself
// (ex. `play` or `to`) will be pushed onto the 'toHandle' array.
//
// Everything else not found in the keys of `parsedArgs` will also be added to
// the toHandle array.
const toHandle = [];
for (let i = 0; i < argv.length; i++) {
  let value = argv[i];
  if (parsedArgs.hasOwnProperty(value)) {
    if (i + 1 >= argv.length) throw new Error('missing value for: ' + value);

    if (typeof parsedArgs[value] === 'number')
      parsedArgs[value] = Number.parseFloat(argv[i+1]);
    else
      parsedArgs[value] = argv[i+1];

    i++; // skip over the argument;
    if (!value.startsWith('-')) toHandle.push(value); // consider commands toHandle
  } else {
    toHandle.push(value);
  }
}

const client = new fluid.Client(parsedArgs["-p"]);
const commands = {};

addDocstring('play', 'Playback the active edit');
commands.play = function(){
  console.log('play!');
  client.send(fluid.transport.play());
};

addDocstring('stop', 'Stop playback of the active edit');
commands.stop = function(){
  console.log('stop!');
  client.send(fluid.transport.stop());
};

addDocstring('to <quarterNotes>', 'Move the transport to a time in quarter notes');
commands.to = function(){
  if (typeof parsedArgs.to !== 'number' || isNaN(parsedArgs.to))
    console.error('ERROR: "to" command must have a numeric argument');
  else
    client.send(fluid.transport.to(parsedArgs.to));
};

addDocstring('create <filename>', 'Create a tracktionedit file, overwriting if needed');
commands.create = function(){
  /** Create and activate a new tracktionedit */
  const filename = parseFilename(parsedArgs.create);
  const exists = fs.existsSync(filename);
  console.log(`create${exists ? '' : ' (overwrite)'}:`, filename);
  client.send(fluid.global.activate(filename, true));
};

addDocstring('open <filename>', 'Open a tracktionedit file, creating if needed');
commands.open = function(){
  const filename = parseFilename(parsedArgs.open);
  const exists = fs.existsSync(filename);
  console.log(`open${exists? '' : ' (create)'}:`, filename);
  client.send(fluid.global.activate(filename, false));
};

addDocstring('save', 'Save the active tracktionedit file');
commands.save = function(){
  client.send(fluid.global.save(null,'d'));
  console.log('save: ***filename unchanged***');
  return;
};

addDocstring('saveas <filename>', 'Save the active tracktionedit, overwriting if needed');
commands.saveas = function(){
  const filename = parseFilename(parsedArgs.saveas);
  const exists = fs.existsSync(filename);
  console.log(`save: ${exists? '(overwrite)' : '(create)'}:`, filename);
  client.send(fluid.global.save(filename, 'd'));
};

addDocstring('render <filename.wav>', 'Render the active edit in entirity');
commands.render = function(){
  const filename = parseFilename(parsedArgs.render, '.wav');
  const exists = fs.existsSync(filename);
  client.send(fluid.global.save(filename));
  console.log(`render${exists? ' (overwrite)': ''}:`, filename);
};

addDocstring('help', 'print this help information');
commands.help = function() { console.log(docs); };
commands['-h'] = commands.help;

// Execute commands, and log unhandled
toHandle.forEach(value => {
  if (commands.hasOwnProperty(value)) commands[value]();
  else console.error('toHandle argument:', value);
});

if (!argv.length) commands.help();

function parseFilename(filename, ext='.tracktionedit') {
  if (path.extname(filename).toLowerCase() !== ext)
    filename += ext;

  if (!path.isAbsolute(filename))
    filename = path.join(process.cwd(), filename);

  return path.normalize(filename);
};

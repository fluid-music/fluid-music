#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const fluid = require('..');
const cybr = fluid.cybr;
const utilPlugin = require('./util-plugin');


const argv = process.argv.slice(2);

let docs = 'usage: fluid [flags] command arg\n\n';
function addDocstring(name, string) {
  docs += `${name.padEnd(22, ' ')}- ${string}\n`;
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
  "tempo": NaN,
  "create": null,
  "open": null,
  "saveas": null,
  "render": null,
  "audiofile": null,
  "vst2": null,
  "vst2plugin": null,
  "vst2params": null,
};

// For each value, if it has an entry in `parsedArgs`, augment the `parsedArgs`
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
    if (i + 1 >= argv.length) {
      console.error(`ERROR: "${value}" requires an argument`);
      process.exit(1);
    }

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

const client = new cybr.Client(parsedArgs["-p"]);
const commands = {};

addDocstring('play', 'Playback the active edit');
commands.play = function(){
  console.log('play!');
  client.send(cybr.transport.play());
};

addDocstring('stop', 'Stop playback of the active edit');
commands.stop = function(){
  console.log('stop!');
  client.send(cybr.transport.stop());
};

addDocstring('to <wholeNotes>', 'Move the transport to a time in whole notes');
commands.to = function(){
  if (typeof parsedArgs.to !== 'number' || isNaN(parsedArgs.to))
    console.error('ERROR: "to" command must have a numeric argument');
  else
    client.send(cybr.transport.to(parsedArgs.to));
};

addDocstring('create <filename>', 'Create a tracktionedit file, overwriting if needed');
commands.create = function(){
  /** Create and activate a new tracktionedit */
  const filename = parseFilename(parsedArgs.create);
  const exists = fs.existsSync(filename);
  console.log(`create${exists ? '' : ' (overwrite)'}:`, filename);
  client.send(cybr.global.activate(filename, true));
};

addDocstring('open <filename>', 'Open a tracktionedit file, creating if needed');
commands.open = function(){
  const filename = parseFilename(parsedArgs.open);
  const exists = fs.existsSync(filename);
  console.log(`open${exists? '' : ' (create)'}:`, filename);
  client.send(cybr.global.activate(filename, false));
};

addDocstring('save', 'Save the active tracktionedit file');
commands.save = function(){
  client.send(cybr.global.save(null,'d'));
  console.log('save: ***filename unchanged***');
  return;
};

addDocstring('saveas <filename>', 'Save the active tracktionedit, overwriting if needed');
commands.saveas = function(){
  const filename = parseFilename(parsedArgs.saveas);
  const exists = fs.existsSync(filename);
  console.log(`save: ${exists? '(overwrite)' : '(create)'}:`, filename);
  client.send(cybr.global.save(filename, 'd'));
};

addDocstring('render <filename.wav>', 'Render the active edit in entirety');
commands.render = function(){
  const filename = parseFilename(parsedArgs.render, '.wav');
  const exists = fs.existsSync(filename);
  client.send(cybr.global.save(filename));
  console.log(`render${exists? ' (overwrite)': ''}:`, filename);
};

addDocstring('tempo <bpm>', 'Set the initial tempo');
commands.tempo = function() {
  const bpm = parsedArgs.tempo;
  if (typeof bpm !== 'number' || isNaN(bpm)) {
    console.error('ERROR: Invalid tempo value:', bpm);
    process.exit(1);
  }
  client.send(cybr.tempo.set(bpm));
}

addDocstring('audiofile <file.wav>', 'print a report about an audio file');
commands.audiofile = async function() {
  let filename = parsedArgs.audiofile;
  const filenameRelativeToWorkingDir = path.join(process.cwd(), filename);
  if (!path.isAbsolute(filename) && fs.existsSync(filenameRelativeToWorkingDir)) {
    filename = filenameRelativeToWorkingDir;
  }

  const msg = [
    cybr.global.activate('temp.tracktionedit'),
    cybr.audiofile.report(filename),
  ];
  console.log('send:', msg);

  const results = await client.send(msg);
  const result  = results.elements.filter(m=> m.address === '/audiofile/report/reply')[0];

  if (!result || !result.args || result.args.length < 2 || result.args[1].type !== 'string' || result.args[0].value) {
    console.error('Unhelpful results:', results.elements[1]);
    throw new Error('Server send unhelpful results');
  }

  console.log(JSON.parse(result.args[1].value));
}

addDocstring('vst2plugin <plugName>', 'print the raw vst2 plugin report');
commands.vst2plugin = async () => {
  const report = await utilPlugin.getParamsReport(parsedArgs.vst2plugin, 'vst2', client);
  console.log(report.plugin);
}

addDocstring('vst2params <plugName>', 'print the raw vst2 parameter report');
commands.vst2params = async () => {
  const report = await utilPlugin.getParamsReport(parsedArgs.vst2params, 'vst2', client);
  console.log(report.params);
}

addDocstring('vst2 <plugName>', 'print a commonjs module that exports { plugin: {}, params: [] }');
commands.vst2 = async () => {
  const moduleString = await utilPlugin.buildPluginModule(parsedArgs.vst2, 'vst2', client);
  console.log(moduleString);
};

addDocstring('help', 'print this help information');
commands.help = function() { console.log(docs); };
commands['-h'] = commands.help;



/*
NOTE: Add new commands go BEFORE this comment
*/

// Execute commands, and log unhandled.
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

const semverSatisfies = require('semver/functions/satisfies')

/**
 * @param {string} [filename] '.tracktionedit' or '.wav' filename. If no
 *        filename is provided, an empty string will be used, which implies
 *        'save' as opposed to 'save as'.
 * @param {string} [samplePathMode] - How should file references to samples be
 *        saved? 'a' = absolute, 'r' = relative, 'd' = save samples that are in
 *        a child folder of the edit as relative, and everything else as
 *        absolute. The server defaults to 'd'ecide if not specified
 */
export function save(filename? : string, samplePathMode? : string) {
  if (samplePathMode && typeof samplePathMode !== 'string')
    throw new Error('global.save samplePathMode argument must be a string');

  const args = [ { type: 'string', value: filename || ''} ];

  if (samplePathMode) args.push({ type: 'string', value: samplePathMode });

  return { address: '/file/save', args };
}

/**
 * Request that the server change its working directory.
 * @param {String} path - target working directory
 */
export function cd(path) {
  if (typeof path !== 'string')
    throw new Error('cd (change directory) requires a string pathname');

  return {
    address: '/cd',
    args: { type: 'string', value: path },
  };
}

/**
 * Select an session file, loading it if it exists.
 * @param {String} filename - the edit filename to activate
 * @param {boolean} [forceEmptyEdit=false] - If true, activate an empty edit,
 *        overwriting any existing edit if one exists.
 */
export function activate(filename, forceEmptyEdit) {
  if (typeof filename !== 'string')
    throw new Error('activate requires a string pathname');

  if (!filename.toLowerCase().endsWith('.tracktionedit'))
    console.warn('WARNING: trying to activate a file with an unexpected file extension');

  return {
    address: '/file/activate',
    args: [
      { type: 'string', value: filename },
      { type: 'integer', value: forceEmptyEdit ? 1 : 0 },
    ],
  };
}

/**
 * Get semantic version number of the cybr server.
 * @param semverPatternOrHandler if this is a string, treat it as a semver
 *    pattern, and print a warning if the value returned by the server does not
 *    satisfy this argument. This can also be a handler function, which accepts
 *    an error integer as the first argument and a semver string as the second.
 *    If no argument is provided, print a message stating the cybr version.
 */
export function version(semverPatternOrHandler? : string | ((error: number, cybrVersion : string) => any)) {
  const msg : any =  { address: '/version' }

  if (!semverPatternOrHandler) {
    msg.handleResponse = (error, cybrVersionString) => {
      if (error) console.warn('Failed to detect the cybr server version. Consider updating cybr.')
      else console.warn(`Connected to cybr ${cybrVersionString}`)
    }
  } else if (typeof semverPatternOrHandler === 'string') {
    msg.handleResponse = (error, cybrVersionString) => {
      if (error) {
        console.warn('WARNING: fluid-music connected to an obsolete cybr instance. Consider updating cybr.')
      }
      if (!semverSatisfies(cybrVersionString.value, semverPatternOrHandler)) {
        console.warn(`WARNING: fluid-music connected to cybr ${cybrVersionString.value} which does not satisfy ${semverPatternOrHandler}. Consider updating cybr.`)
      }
    }
  } else if (typeof semverPatternOrHandler === 'function') {
    msg.handleResponse = (error, stringOscObject) => {
      semverPatternOrHandler(error, stringOscObject.value)
    }
  }

  return msg
}

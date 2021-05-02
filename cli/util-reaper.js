const os = require('os')
const fs = require('fs')
const path = require('path')
const ini = require('ini')


/**
 * Try to identify the Reaper Resource path
 */
function detectReaperResourcePath() {
  const platform = os.platform()
  const homedir = os.homedir()
  const checkDirs = []

  if (platform === 'darwin') {
    checkDirs.push(path.join(homedir, 'Library', 'Application Support', 'REAPER'))
  } else if (platform === 'win32') {

  } else {
    // assume linux
  }

  for (const dir of checkDirs) {
    if (checkIfPathIsDirSync(dir)) return dir
  }
  return undefined
}

function checkIfPathIsDirSync(path) {
  if (!fs.existsSync(path)) return false
  return fs.lstatSync(path).isDirectory()
}

function installLuaReloadScript(resourceDir) {
  const scriptsDir = path.join(resourceDir, 'Scripts')
  const luaReloadScriptText = `-- Reload the active project from disk

local project, filename = reaper.EnumProjects(-1);
local zoomLevel = reaper.GetHZoomLevel();
local cursorPosition = reaper.GetCursorPosition();
local hScrollStart, hScrollEnd = reaper.GetSet_ArrangeView2(project, false, 0, 0);

reaper.Main_openProject('noprompt:' .. filename);
project, filename = reaper.EnumProjects(-1);
reaper.SetEditCurPos(cursorPosition, false, false);
reaper.adjustZoom(zoomLevel, 1, true, -1);
-- Charles: I don't kow why, but the GetSet function below sometimes fails with
-- an error when hScrollStart is non-zero. For now, I'm just going to skip it.
-- reaper.GetSet_ArrangeView2(project, true, hScrollStart, hScrollEnd);
`

  console.log(`Copying reload.lua script to:       ${scriptsDir}`);
  if (!checkIfPathIsDirSync(scriptsDir)) throw new Error(`Cannot save reload script. Not a directory: "${scriptsDir}"`);
  fs.writeFileSync(path.join(scriptsDir, 'reload.lua'), luaReloadScriptText);

  const iniFilename = path.join(resourceDir, 'reaper-kb.ini');
  const iniFileRawText = fs.readFileSync(iniFilename, 'utf-8');
  const iniFile = ini.parse(iniFileRawText);

  let alreadyInstalled = false;
  for (const [key, value] of Object.entries(iniFile)) {
    if (key.endsWith(' reload.lua')) {
      alreadyInstalled = true;
      break;
    }
  }

  if (alreadyInstalled) {
    console.log(`Reload script already installed in: ${iniFilename}`)
  } else {
    console.log(`Installing reload script to:        ${iniFilename}`);
    const newIniFileRawText = 'SCR 4 0 RS28b8414773d3307e62c10c33b12f109807000000 "Custom: reload.lua" reload.lua\r\n' + iniFileRawText;
    // Consider adding this line to bind to Command+R on Mac:
    // KEY 9 82 _RS28b8414773d3307e62c10c33b12f109807000000 0
    fs.writeFileSync(iniFilename, newIniFileRawText)
  }
}

module.exports = {
  detectReaperResourcePath,
  installLuaReloadScript,
}

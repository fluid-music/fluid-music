const os = require('os')
const fs = require('fs')
const path = require('path')

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

function installLuaReloadScript(scriptsDir) {
  const luaReloadScriptText = `-- Reload the active project from disk

local project, filename = reaper.EnumProjects(-1);
local zoomLevel = reaper.GetHZoomLevel();
local cursorPosition = reaper.GetCursorPosition();
local hScrollStart, hScrollEnd = reaper.GetSet_ArrangeView2(project, false, 0, 0);

reaper.Main_openProject('noprompt:' .. filename);
project, filename = reaper.EnumProjects(-1);
reaper.SetEditCurPos(cursorPosition, false, false);
reaper.adjustZoom(zoomLevel, 1, true, -1);
reaper.GetSet_ArrangeView2(project, true, hScrollStart, hScrollEnd);
`

  if (!checkIfPathIsDirSync(scriptsDir)) throw new Error(`Cannot save reload script. Not a directory: "${scriptsDir}"`)
  fs.writeFileSync(path.join(scriptsDir, 'reload.lua'), luaReloadScriptText)
}

module.exports = {
  detectReaperResourcePath,
  installLuaReloadScript,
}

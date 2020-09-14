const cybr = require('../').cybr;
const tools = require('../code-generators/tools');

/**
 * Get a plugin report object that looks like:
 * ```javascript
 * {
 *   params: [ ... ],
 *   plugin: { ... },
 * }
 * ```
 * @param {string} pluginName Case insensitive plugin name to send to cybr
 * @param {string} pluginType ex VST2, VST3
 * @param {cybr.Client} client
 */
async function getParamsReport(pluginName, pluginType, client = new cybr.Client) {

  const msg = [
    cybr.global.activate("deleteme.tracktionedit", true),
    cybr.audiotrack.select('hi'),
    cybr.plugin.select(pluginName, pluginType),
    cybr.plugin.getParamReport(29),
    cybr.plugin.getReport(),
  ];

  const report = { plugin: null, params: null }
  const data   = await client.send(msg);

  for (const oscMsg of data.elements) {
    console.warn('Received:', oscMsg.address);

    let type = null;
    if (oscMsg.address === '/plugin/params/report/reply') type = 'params';
    if (oscMsg.address === '/plugin/report/reply') type = 'plugin';
    if (type) {
      try {
        const errCode = oscMsg.args[0].value;
        const details = oscMsg.args[1].value;
        const jsonStr = oscMsg.args[2].value;
        report[type] = JSON.parse(jsonStr);
        console.warn(oscMsg.address, details);
      } catch (e) {
        console.error('server send an invalid report', e);
      }
    }
  }

  return report;
}

async function buildPluginModule(pluginName, pluginType, client) {
  const report = await getParamsReport(pluginName, pluginType, client);

  let type = report.plugin.externalPluginFormat;
  if (type.toUpperCase() === 'VST') type = 'VST2';

  let params = '';

  for (let param of report.params) {
    params += JSON.stringify(param) + ',\n';
  }

  const moduleString =
`module.exports = {
  pluginName: "${report.plugin.name}",
  pluginType: "${type}",
  plugin: ${JSON.stringify(report.plugin, null, 2)},
  params: [

${params}

  ],
};\n`;
  return moduleString;
}

module.exports = {
  getParamsReport,
  buildPluginModule,
};

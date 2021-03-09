export function  report(filename) {
  if (typeof filename !== 'string')
    throw new Error('fluid.audiofile.report requires a filename string argument');
  const msg = {
    address: '/audiofile/report',
    args: [
      {
        type: 'string',
        value: filename,
      }
    ]
  }

  return msg;
}

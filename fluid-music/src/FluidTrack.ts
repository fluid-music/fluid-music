import { Track, Clip, ScoreConfig, xLibrary } from './ts-types';
import { FluidPlugin, Automation } from './plugin';

export interface TrackConfig extends ScoreConfig {
  name?: string;
  gain? : number;
  pan? : number;
  width? : number;
  plugins?: FluidPlugin[];
}


export class FluidTrack implements Track {
  constructor(config: TrackConfig) {
    if (typeof config.name === 'string') this.name = config.name;
    else throw new Error('Cannot create track without a name');

    if (typeof config.gain === 'number') this.gain = config.gain;
    if (typeof config.pan === 'number') this.pan = config.pan;
    if (typeof config.width === 'number') this.width = config.width;
    if (config.plugins) {
      for (let plugin of config.plugins)
        if (!(plugin instanceof FluidPlugin))
          throw new Error(`plugin was not an instance of FluidPlugin: ${JSON.stringify(plugin)}`);
      this.plugins = (config.plugins as FluidPlugin[]);
    }

    this.scoreConfig = {...config};
  }
  scoreConfig : ScoreConfig = {};

  // Track
  name: string;
  gain = 0;
  pan = 0;
  width = 0;
  plugins : FluidPlugin[] = [];
  clips : Clip[] = [];
  automation : Automation = {};
  duration? : number;
  startTime? : number;
}

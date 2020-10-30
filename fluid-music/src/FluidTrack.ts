import { Clip, ScoreConfig, TrackReceive, Tap } from './fluid-interfaces';
import { FluidPlugin, Automation } from './plugin';

export interface UnresolvedSend {
  to : string
  gainDb? : number
  pan? : number
  tap? : Tap
}

export class FluidReceive implements TrackReceive {
  constructor (options : {
    from : FluidTrack
    gainDb? : number
    tap? : Tap
  }) {
    this.from = options.from
    if (typeof options.gainDb === 'number') this.gainDb = options.gainDb
  }

  from : FluidTrack
  gainDb : number = 0
  tap : Tap = Tap.postFader
}

export interface TrackConfig extends ScoreConfig {
  name: string
  gain? : number
  pan? : number
  width? : number
  plugins? : FluidPlugin[]
  sends? : UnresolvedSend[]
  children?: TrackConfig[]
}

export class FluidTrack {
  constructor(config: TrackConfig) {
    if (typeof config.name === 'string') this.name = config.name;
    else throw new Error('Cannot create track without a name');

    if (typeof config.gain === 'number') this.gain = config.gain;
    if (typeof config.pan === 'number') this.pan = config.pan;
    if (typeof config.width === 'number') this.width = config.width;
    if (config.sends?.length) this.unresolvedSends = config.sends.map(send => send)

    if (config.plugins) {
      for (let plugin of config.plugins)
        if (!(plugin instanceof FluidPlugin))
          throw new Error(`plugin was not an instance of FluidPlugin: ${JSON.stringify(plugin)}`);
      this.plugins = (config.plugins as FluidPlugin[])
    }

    this.scoreConfig = {...config}

    // As the last step, construct any child tracks
    if (config.children?.length) {
      this.children = config.children.map(childConfig => new FluidTrack(childConfig))
    }
  }
  scoreConfig : ScoreConfig = {}

  // Track
  name: string;
  gain = 0
  pan = 0
  width = 0
  plugins : FluidPlugin[] = []
  clips : Clip[] = []
  receives : TrackReceive[] = []
  automation : Automation = {}
  duration? : number
  startTime? : number
  unresolvedSends : UnresolvedSend[] = []
  children: FluidTrack[] = []
}

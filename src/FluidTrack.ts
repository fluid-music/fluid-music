import { Clip, ScoreConfig, TrackReceive, Tap, UnresolvedSend } from './fluid-interfaces';
import { FluidAudioFile } from './FluidAudioFile'
import { FluidMidiClip } from './FluidMidiClip';
import { FluidPlugin } from './FluidPlugin';
import { Automation, AutomationLane } from './FluidAutomation'

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
  automation : Automation = {
    gainDb: new AutomationLane()
  }
}

export interface TrackConfig extends ScoreConfig {
  name: string
  gainDb? : number
  pan? : number
  width? : number
  plugins? : FluidPlugin[]
  sends? : UnresolvedSend[]
  children?: TrackConfig[]
}

export class FluidTrack {
  scoreConfig : ScoreConfig = {}

  // Track
  name: string;
  gainDb = 0
  pan = 0
  width = 1
  clips : Clip[] = []
  audioFiles : FluidAudioFile[] = []
  midiClips : FluidMidiClip[] = []
  plugins : FluidPlugin[] = []
  receives : FluidReceive[] = []
  automation : Automation = {
    gainDb: new AutomationLane(),
    width: new AutomationLane(),
    pan: new AutomationLane(),
  }
  duration? : number
  startTime? : number
  unresolvedSends : UnresolvedSend[] = []
  children: FluidTrack[] = []

  constructor(config: TrackConfig) {
    if (typeof config.name === 'string') this.name = config.name;
    else throw new Error('Cannot create track without a name');

    if (typeof config.gainDb === 'number') this.gainDb = config.gainDb;
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
}

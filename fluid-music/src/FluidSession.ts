import { FluidTrack, TrackConfig } from './FluidTrack';
import { ScoreConfig } from './ts-types';

export interface TracksConfig {
  [trackName: string] : TrackConfig | FluidTrack;
}

export interface SessionConfig extends ScoreConfig {
  bpm?: number;
}

export class FluidSession {
  constructor(config: SessionConfig, tracks: TracksConfig = {}) {
    if (typeof config.bpm === 'number') this.bpm = config.bpm;
    this.scoreConfig = config;

    for (const [name, track] of Object.entries(tracks)) {
      if (!track.name) track.name = name;
      const newTrack = (track instanceof FluidTrack)
        ? track
        : new FluidTrack(track);
  
      this.tracks.push(newTrack);
    }
  }

  scoreConfig : ScoreConfig = {};
  bpm : number = 120;
  tracks : FluidTrack[] = [];
  regions : any[] = [];
  startTime? : number;
  duration? : number;

  getOrCreateTrackByName(name: string) : FluidTrack {
    for (const track of this.tracks)
      if (track.name === name)
        return track;
    
    const newTrack = new FluidTrack({ name });
    this.tracks.push(newTrack);
    return newTrack;
  }
}

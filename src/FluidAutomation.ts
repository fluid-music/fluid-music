/**
 * A collection of AutomationLane objects, each identified by a paramKey string.
 */
export interface Automation {
  [key: string] : AutomationLane;
}

/**
 * AutomationPoint object exist in an automation lane, Note that this is different
 * from an AutomationEvent, which can be found in NoteLibraries and Clips.
 */
export interface AutomationPoint {
  startTimeSeconds : number;
  curve: number;
  value?: number;
}

export class AutomationLane {
  points : AutomationPoint[] = []

  getLastPointAt(timeSeconds : number) : AutomationPoint|null {
    let candidate : AutomationPoint|null = null

    for (const point of this.points) {
      if (candidate) {
        if (point.startTimeSeconds >= candidate.startTimeSeconds && point.startTimeSeconds <= timeSeconds) {
          candidate = point
        }
      } else if (point.startTimeSeconds <= timeSeconds) {
        candidate = point
      }
    }

    return candidate
  }
}

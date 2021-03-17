/**
 * AutomationPoint object exist in an automation lane, Note that this is different
 * from an AutomationEvent, which can be found in NoteLibraries and Clips.
 */
export interface AutomationPoint {
  startTimeSeconds : number;
  curve: number;
  value?: number;
}

export interface AutomationLane {
  points : AutomationPoint[];
}

export interface Automation {
  [key: string] : AutomationLane;
}
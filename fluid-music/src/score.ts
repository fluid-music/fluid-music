const tab     = require('./tab');
const mappers = require('./event-mappers');

const reservedKeys = tab.reservedKeys;

import { ClipEventContext } from './ts-types';
import { FluidSession } from './FluidSession'

/**
 * @param {Session} session
 * @param {eventMapper[]} [ubiquitousMappers] fluid supplies a default
 *    collection of mappers that are needed for proper parsing. To override
 *    the default mappers, specify null or an empty array.
 */
function applyEventMappers(session : FluidSession, ubiquitousMappers=mappers.default) {

  for (const track of session.tracks) {
    if (tab.reservedKeys.hasOwnProperty(track.name)) {
      continue;
    }

    if (!track.clips || !track.clips.length) {
      console.warn(`applyEventMappers: skipping ${track.name}, because it has no .clips`);
      continue;
    }

    track.clips.forEach((clip, clipIndex) => {
      const context : ClipEventContext = {
        track,
        clip,
        clipIndex,
        data: {},
        messages: [], // messages is needed in tracksToFluidMessage, but I'm not sure that it is needed in applyEventMappers
      };

      ubiquitousMappers = ubiquitousMappers || []; // null overrides default
      let customMappers : any[] = [];
      if (clip.hasOwnProperty('eventMappers')) {
        customMappers = clip.eventMappers as any[];
        delete clip.eventMappers;
      }
      const eventMappers = customMappers.concat(ubiquitousMappers);
      // The code below shows what data are available inside eventMapper
      // callbacks. The contents of context.clip.events can look different to
      // each round of callbacks. Note the order of the loops: In the first
      // round, the first callback will be called on each event, potentially
      // removing that event from clip.events. Then, the second callback in the
      // eventMappers array will be called on each event. During the second
      // round of callbacks, clip.events may have a different length than during
      // the first round. This will happen if, for example, the callbacks in the
      // first round returned falsy values (removing events from clip.events in
      // subsequent rounds) or arrays (adding events to clip.events). Note that
      // changes to the contents of context.clip.events only take effect between
      // rounds. The exception would be if a callback explicitly modifies
      // context.clip.events -- however this would be a very poor design choice.
      // Callbacks should never need to do this and it could cause subtle bugs.
      //
      // A callback that needs access to the original list of events can access
      // it via the clip.unmappedEvents array. Note that even though events in
      // the unmappedEvents array will not be added or removed by eventMappers,
      // they will still be mutated by event mappers, so the event.n members
      // will likely not look the same as the objects in the .nLibrary objects.
      clip.unmappedEvents = clip.events;
      clip.events = clip.events.flat();
      for (const eventMapper of eventMappers) {
        clip.events = clip.events.flatMap((event, i) => {
          context.eventIndex = i;
          return eventMapper(event, context);
        }).filter(event => !!event);
      }; // iterate over eventMappers
    });  // iterate over clips
  }      // iterate over tracks
}

module.exports = {
  applyEventMappers,
}

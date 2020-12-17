## Comparison with other tools

The Fluid Engine aims to bridge the gap between DAWs and existing procedural audio languages by integrating computational code-based techniques directly into a conventional audio workstation. The following design choices show a balance between timeline-centric, GUI-based DAWs, and other systems for imperative computational sound design.

**The Fluid Engine can:**
- Describe sound design documents in a format that is human readable and machine readable, allowing:
  - an ecosystem of recipe sharing, akin to a package manager AND
  - integration with procedural and ML workflows
- Integrate with a conventional DAW GUI, which is necessary for:
  - precision timeline based editing
  - carefully inspecting the output of computational content and recipes
  - creating content that is competitive with music created professionally using the conventional DAW based workflow
- Host and configure VST2 plugins (if you have access to the VST2 sdk), which is important for:
  - Inspecting and modifying output material in a DAW
- Render results in realtime, which is necessary for:
  - playing the engine like an instrument
  - exploring recipe parameter space as a sound designer
  - mixing/matching/tweaking input recipes as a musician/composer
  - running in an dynamic audio streaming server
- Render offline. Necessary for:
  - offline personalized content systems
  - deploying in machine learning projects such as a GANs and reinforcement learning systems
  - efficient machine listening based recipes
- Run headless, which is necessary for:
  - deploying to a web server

**Traditional DAWs**
- Useful if you want:
  - precise timeline-based editing. No other tool works as well for common timeline based sound design like precise parameter automation, audio editing, and mixing, arranging
  - great for both realtime editing and offline audio rendering
  - professional plugin ecosystem
- Not helpful if you need to:
  - insert any kind of computation or procedural content into the the production pipeline
  - deploy dynamic content to a web server or mobile devices

**Graphical programming languages like Max and PureData**
- Useful when you want to:
  - prototype realtime interactive systems
- Not useful if you need:
  - precise timeline-based editing
  - design systems that are too complex to manage in a graphical programming environment

**Code based languages like SuperCollider and ChucK, and CSound**
- Useful when you want to:
  - design complex interactive audio graphs
  - deploy on a server or in mobile app
  - do experimental sound design
- Not useful if you need:
  - precise timeline-based editing/composing on a timeline (while Csound is built on the concept of a text based "score," it is very clumsy to work with when compared with a DAW)
  - support for pro quality plugins
  - precise audio editing support
  - DAW integration

**Music21 (symbolic music notation library)**
- Useful for computational score analysis
- Not useful for
  - computational composition
  - daw integration

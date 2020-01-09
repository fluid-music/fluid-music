# Fluid Engine

The fluid engine is a Swiss Army Knife CLI for working parsing/playing/editing/rendering `.tracktionedit` files using the [tracktion engine](https://github.com/Tracktion/tracktion_engine/).

This project does not use the `main` entrypoint, but subclasses [`juce::JUCEApplicationBase`](https://docs.juce.com/master/classJUCEApplicationBase.html#details).

The Fluid Engine obsoletes these older repos
- [tracktionedit-player](https://github.com/CharlesHolbrow/tracktionedit-player) 
  - uses JUCE GUI to run a full application
  - loads a `.tracktionedit` and renders a file
  - includes a directory with some test `.tracktionedit` files 
  - passes custom `CliUiBehaviour` to the main `Component` in a initializer list: `MainComponent::MainComponent() : engine("Ok engine", std::make_unique<CliUiBehaviour>(), nullptr) {...}`
- [test-tracktion-engine](https://github.com/CharlesHolbrow/test-tracktion-engine)
  - Runs the whole program from the main function
  - `CliUiBehaviour` Subclasses `juce::UiBehaviour`, and is pased to the tracktion_engine like this:
    - `te::Engine engine("Sweet!", std::make_unique<CliUiBehaviour>(), nullptr);`

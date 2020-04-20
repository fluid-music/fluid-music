# test-juce

This is a hacky test I wrote to experiment with the `tracktion_engine` module for`juce`.

This project does not use the MAIN function, but subclasses [`juce::JUCEApplicationBase`](https://docs.juce.com/master/classJUCEApplicationBase.html#details)

Test projects include (this list may be out of date):

- [cybr](https://github.com/CharlesHolbrow/test-juce)
  - `CLIApp` subclasses `juce::JUCEApplicationBase` to init an app and run the event loop
  - This was my original experiment (test-juce) but it's also the repo I'm pushing forward
- [tracktionedit-player](https://github.com/CharlesHolbrow/tracktionedit-player) 
  - uses JUCE GUI to run a full application
  - loads a `.tracktionedit` and renders a file
  - includes a directory with some test `.tracktionedit` files 
  - passes custom `CliUiBehaviour` to the main `Component` in a initializer list: `MainComponent::MainComponent() : engine("Ok engine", std::make_unique<CliUiBehaviour>(), nullptr) {...}`
- [test-tracktion-engine](https://github.com/CharlesHolbrow/test-tracktion-engine)
  - Runs the whole program from the main function
  - `CliUiBehaviour` Subclasses `juce::UiBehaviour`, and is pased to the tracktion_engine like this:
    - `te::Engine engine("Sweet!", std::make_unique<CliUiBehaviour>(), nullptr);`

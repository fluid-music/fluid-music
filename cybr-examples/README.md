# Fluid Music Client Examples

This directory contains `cybr` examples. Each example tests some feature of the cybr server. 

Unlike the examples in the `demos` directory (at the root level), these examples typically will not create a `FluidSession` object. Instead, they will manually create a `fluid.Client` and then use `fluid.cybr` construct some state on the server (this is how `FluidSession.saveTracktionFile` works under the hood).

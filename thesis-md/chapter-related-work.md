# Related work

Particle-based approaches to fluid dynamics have made an extensive evolution during the last decades. Researchers had moved from rendering particles as spheres to fluid mesh extraction using for example an algorithm called marching cubes ([Müller et al.](cite:Muller), [Williams](cite:Williams), [Yu and Turk](cite:Yu)). But with GPUs becoming more and more powerful, screen-space techniques for rendering particle-based fluids - like the one discussed in this thesis - have emerged and gained popularity ([Wu et al.](cite:Wu), [van der Laan](cite:VanDerLaan)). The core difference to traditional methods is that the surface extraction happens for every pixel of the screen. Thus, only the visible parts of the fluid are actually computed and the rendered image is of high quality due to the fine details that can be extracted at the pixel-level.

There are countless papers introducing new techniques for rendering different parts of a fluid. [Ihmsen et al.](cite:Ihmsen) for example propose a method for rendering foam and bubbles at wave crests.

Particle-based fluid simulation has even made its way into deep learning with [Ummenhofer et al.](cite:Ummenhofer) among others developing a neural network that can predict new particle positions from the previous simulation step.

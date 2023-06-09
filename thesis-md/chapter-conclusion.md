# Conclusion

Wu et al. built on top of existing algorithms for screen-space surface extraction and rendering. They proposed new techniques to accelerate those algorithms and to improve the quality of the result.
These consist of

- adaptive step lengths, reducing the number of iterations for each ray,
- adaptive resolution, reducing the number of rays generated,
- and adaptively blending normals, enhancing the lighting quality.

They gave little information on their implementation details. Hence, a lot of gaps had to be filled to construct a program capable of rendering fluid surfaces. To see a result on the screen, acceleration structures have to be built using hash grids and maximum density approximation. Depth buffers are filled from which the ray marcher can determine per-pixel information about the surface's position and orientation. Finally, the fluid can be brought to the screen by calculating lighting, transparency, and reflection.

There is no limit when it comes to the visualization of fluids and we are excited to see researchers develop new and improved ways to create beautiful images of them.

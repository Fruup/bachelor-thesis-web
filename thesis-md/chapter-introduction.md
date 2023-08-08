# Introduction

The primary source of this thesis is the paper [_A Real-Time Adaptive Ray Marching Method for Particle-Based Fluid Surface Reconstruction_](cite:Wu), written by Tong Wu, Zhiqiang Zhou, Anlan Wang, Yuning Gong and Yanci Zhang. In addition to reformulating its contents, we introduce details about our implementation to further build an understanding of the authors' work and to supply anchor points for anyone attempting to develop an implementation for their own.

[Williams](cite:Williams) states that computational fluid dynamics consists of three phases: simulation, extraction of a renderable representation, and rendering itself. This work focuses on the latter two. The authors of our primary source build on top of existing advancements in the field and propose algorithms and data structures that aim to make those methods capable of running in real-time.

Whenever we write "the authors" or "Wu et al." we are referring to ideas coming from our primary source. We distinguish between our and others' thoughts by mentioning their origin. Unfortunately, we did not have the time to implement every aspect of the authors' algorithm. Details on the parts we implemented can be found in the **Implementation** subsections of each chapter.

## Structure

We will start by establishing some notation and explain the reasoning behind our choices regarding implementation details like programming language and libraries. Then we will introduce the theoretical backbone behind particle fluid simulation in [**Smoothed Particle Hydrodynamics**](#smoothed-particle-hydrodynamics). Since there are many parts to the described algorithm that have to be addressed, we will give a broad overview in the section [**Pipeline overview**](#pipeline-overview) before going into more depth explaining all steps necessary for displaying a fluid on screen. Finally, we will present our results by showing screenshots of our application together with some measurements that qualify the different techniques applied.

## Technology

We decided to use C++ together with _Vulkan_ as our graphics API. _Vulkan_ is a state-of-the-art graphics API allowing for very low-level access to GPU processes and resources. Although this is not strictly necessary for the application discussed here, learning about _Vulkan_ is as interesting as it is useful for moving deeper into graphics programming, which is why we chose to use it. _Vulkan_ opens the door to vast improvements in computation time by letting the user decide which computations should run in parallel, what memory is accessible where, and much more. By leveraging more of _Vulkan_'s features, the computation time needed by our implementation could reduce by orders of magnitude. These possibilities are discussed further in the chapter [**Future work**](#future-work).

Other libraries that were used are listed here, some of which are described in more detail later:

- [_Dear ImGui_](cite:ImGui) for the graphical user interface
- _GLFW_ for window management
- [_Partio_](cite:Partio) for importing particle data
- [_Eigen_](cite:Eigen) and _glm_ for math
- [_CompactNSearch_](cite:CompactNSearch) for neighborhood search
- [_SPlisHSPlasH_](cite:SplishSplash) for dataset generation

The code for our implementation can be found on [GitHub](https://github.com/Fruup/bachelor-thesis).

## Terminology

This is a collection of mathematical notation and symbols we use throughout this thesis.

**Notation**:

- Vectors and matrices are written in bold font. The names of vectors are in lower case and those of matrices are in upper case:
  - $\textbf{r} = (x, y, z)^T \in \mathbb{R}^3$
  - $\textbf{C} \in \mathbb{R}^{n \times m}$
- $| \textbf{r} | := \sqrt{ \sum_{i=1}^n r_i^2 }$ is the $L^2$-norm of the vector $\textbf{r} = ( r_1, \dots, r_n )^T$.
- $|| \textbf{r} || := \frac{1}{|\textbf{r}|} \textbf{r}$ is the unit vector pointing in the same direction as $\textbf{r}$.
- $\tilde{\textbf{r}} \in \mathbb{R}^4$ is a four-dimensional homogenous vector corresponding to a three-dimensional position vector $\textbf{r}$. In computer graphics, homogenous coordinates are used to calculate the projection of three-dimensional objects to the two-dimensional screen.
- $[\textbf{r}]_i$ is the $i$-th entry of the vector $\textbf{r}$. This is to distinguish between element indices and other types of indices the vector inside the brackets could have.
- $[\textbf{C}]_{ij}$ is the entry in the $i$-th row and the $j$-th column of the matrix $\textbf{C}$.
- $\overline{\textbf{C}}$ is the adjugate of the matrix $\textbf{C}$
- $\textbf{r}^2 := \textbf{r}^T \textbf{r} = |\textbf{r}|^2$
- $\text{diag}(a_1, a_2, a_3) := \begin{pmatrix} a_1&0&0\\0&a_2&0\\0&0&a_3 \end{pmatrix}$

**Symbols**:

- $h$: the particles' radius
- $R_{N}$: neighborhood radius
- $\textbf{G}_i$: characteristic neighborhood matrix of the particle $i$
- $\sigma$: the density threshold at which the fluid's surface is assumed

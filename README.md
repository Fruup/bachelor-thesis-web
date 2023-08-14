# README

This is a web version of my bachelor thesis _"Implementation of a method of surface reconstruction and visualization of particle-based fluids"_. It is based on the work of [Wu et al.](https://doi.org/10.2312/sr.20221157) in which they showed their implementation of a ray-marching algorithm capable of rendering an implicit fluid surface from a set of particle positions (in real-time).

The code of my own implementation can be found in [this repository](https://github.com/Fruup/bachelor-thesis).

---

I originally wrote the document in LaTeX, but being drawn to the simplicity of MarkDown, I attempted to create my own static site generator with some nice features:

- Nicely formatted figures with captions,
- keeping track of where you left off when clicking links and the ability to restore scroll positions,
- link previews on hover (like Wikipedia),

...and the option to easily add new features in the form of Svelte components.

## Technologies

- Svelte, SvelteKit and Vite
- MarkDown

I learned a lot about the technologies I used during the development of this website:

- Vite should have a way to import modules as strings rather than only allowing file imports. I had to generate a temporary file that can be imported dynamically. Be careful with parallelism! I generated a random file name to resolve collisions. Also, I had to differentiate between production and development builds and change the import paths accordingly.

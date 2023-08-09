const buildDir = 'build'
const distDir = 'dist'
const distBranch = 'dist'

try {
  await $`git worktree remove ${distDir} --force`
} catch {}

await $`git worktree add ${distDir} ${distBranch} --no-checkout`

await $`cp -r ${buildDir}/* ${distDir}`

cd(distDir)

const now = new Date().toLocaleString()

await $`git add .`
await $`git commit -m "deploy (${now})"`
await $`git push`

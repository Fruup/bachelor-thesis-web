/**
 * Updates the packages in the package.json
 * to the latest available version.
 */

import latestVersion from 'latest-version'
import pkg from '../package.json' assert { type: 'json' }
import { copyFile, writeFile } from 'fs/promises'
import { format } from 'prettier'

const update = async (packages) =>
  Promise.all(
    Object.keys(packages).map(async (packageName) => {
      const newVersion = await latestVersion(packageName)
      packages[packageName] = '^' + newVersion
    }),
  )

// Update
if (pkg.devDependencies) await update(pkg.devDependencies)
if (pkg.dependencies) await update(pkg.dependencies)

// Save backup
await copyFile('package.json', '.backup-package.json')

// Save result
await writeFile('package.json', format(JSON.stringify(pkg), { parser: 'json' }))

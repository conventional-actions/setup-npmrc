import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import * as core from '@actions/core'
import * as github from '@actions/github'

export function configAuthentication(
  registryUrl: string,
  scope: string,
  token: string,
  alwaysAuth: string
): void {
  const npmrc: string = path.resolve(
    process.env['RUNNER_TEMP'] || process.cwd(),
    '.npmrc'
  )
  if (registryUrl && !registryUrl.endsWith('/')) {
    registryUrl += '/'
  }

  writeRegistryToFile(registryUrl, scope, token, npmrc, alwaysAuth)
}

function writeRegistryToFile(
  registryUrl: string,
  scope: string,
  token: string,
  fileLocation: string,
  alwaysAuth: string
): void {
  if (!registryUrl) {
    registryUrl = 'https://npm.pkg.github.com/'
  }
  if (!scope && registryUrl.includes('npm.pkg.github.com')) {
    scope = github.context.repo.owner
  }
  if (scope && !scope.startsWith('@')) {
    scope = `@${scope}`
  }
  if (scope) {
    scope = scope.toLowerCase()
  }

  const settings = new Map<string, string>()

  core.debug(`Setting auth in ${fileLocation}`)
  if (fs.existsSync(fileLocation)) {
    for (const line of fs.readFileSync(fileLocation, 'utf8').split(os.EOL)) {
      const [key, value] = line.split('=')
      if (key.includes('authToken')) {
        core.setSecret(value)
      }
      settings.set(key, value)
    }
  }

  if (token) {
    // Remove http: or https: from front of registry.
    settings.set(`${registryUrl.replace(/(^\w+:|^)/, '')}:_authToken`, token)
    core.setSecret(token)
  }

  settings.set(scope ? `${scope}:registry` : 'registry', registryUrl)
  settings.set('always-auth', alwaysAuth)

  let newContents = ''
  for (const [key, value] of settings) {
    newContents += `${key}=${value}${os.EOL}`
  }

  fs.writeFileSync(fileLocation, newContents)
  core.debug(newContents)
  core.exportVariable('NPM_CONFIG_USERCONFIG', fileLocation)
}

import * as core from '@actions/core'
import * as auth from './authutil'

async function run(): Promise<void> {
  try {
    const alwaysAuth: string = core.getInput('always-auth')
    const registryUrl: string = core.getInput('registry-url')
    const scope: string = core.getInput('scope')
    const token: string = core.getInput('token')
    auth.configAuthentication(registryUrl, scope, token, alwaysAuth)
    return
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()

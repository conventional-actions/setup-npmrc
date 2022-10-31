// shows how the runner will run a javascript action with env / stdout protocol
import {configAuthentication} from '../src/authutil'
import * as fs from 'fs'

test('test runs', () => {
  configAuthentication(
    'https://registry.npmjs.com/',
    'ketch-sdk',
    'ketchsdktoken',
    'true'
  )
  configAuthentication('', 'ketch-com', 'ketchcomtoken', 'true')
  const contents = fs.readFileSync('.npmrc')
  console.log(contents.toString('utf-8'))
})

// @refresh reload
import { mount, StartClient } from '@solidjs/start/client'

export default () => {
  const root = document.getElementById('app')

  if (root) {
    mount(() => <StartClient />, root)
  }
}

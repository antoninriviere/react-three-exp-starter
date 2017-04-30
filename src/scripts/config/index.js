import GlitchPass from '@superguigui/wagner/src/passes/glitch/GlitchPass'

export default {
  debug: {
    stats: true,
    orbitControls: true
  },
  postProcessing: {
    active: true,
    passes: [
      {
        name: 'glitchPass',
        active: true,
        constructor: () => {
          return new GlitchPass({})
        }
      }
    ]
  }
}
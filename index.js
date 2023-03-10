const AppChannel            = require('node-mermaid/store/app-channel')()
    , AppTransportChannel   = require('node-mermaid/store/app-transport-channel')()
    , parser                = require('node-mermaid/parser')

AppChannel.on('connect', () => {
  AppTransportChannel.on('connect', () => {
    AppChannel.on('reload', () => {
      AppTransportChannel.writeData({
        type: 'reload'
      })
    })

    AppTransportChannel.on('readData', ({ platform, value }) =>
      AppChannel.sendMessage(platform, value)
    )
  })
})

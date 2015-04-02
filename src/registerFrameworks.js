
frameworks = {}

if (process.env.VELOCITY !== '0') {
  if (process.env.JASMINE_CLIENT_INTEGRATION !== '0') {
    frameworks.clientIntegration = new ClientIntegrationTestFramework()
  }

  if (process.env.JASMINE_CLIENT_UNIT !== '0') {
    frameworks.clientUnit = new ClientUnitTestFramework()
  }

  if (process.env.JASMINE_SERVER_INTEGRATION !== '0') {
    frameworks.serverIntegration = new ServerIntegrationTestFramework()
  }

  if (process.env.JASMINE_SERVER_UNIT !== '0') {
    frameworks.serverUnit = new ServerUnitTestFramework()
  }

  if (!process.env.IS_MIRROR) {
    if (process.env.JASMINE_CLIENT_INTEGRATION !== '0') {
      frameworks.clientIntegration.registerWithVelocity()
    }

    if (process.env.JASMINE_CLIENT_UNIT !== '0') {
      frameworks.clientUnit.registerWithVelocity()
    }

    if (process.env.JASMINE_SERVER_INTEGRATION !== '0') {
      frameworks.serverIntegration.registerWithVelocity()
    }

    if (process.env.JASMINE_SERVER_UNIT !== '0') {
      frameworks.serverUnit.registerWithVelocity()
    }

    Velocity.startup(function () {
      if (process.env.JASMINE_CLIENT_INTEGRATION !== '0') {
        frameworks.clientIntegration.startMirror()
      }
      if (process.env.JASMINE_CLIENT_UNIT !== '0') {
        frameworks.clientUnit.start()
      }
      if (process.env.JASMINE_SERVER_INTEGRATION !== '0') {
        frameworks.serverIntegration.startMirror()
      }
      if (process.env.JASMINE_SERVER_UNIT !== '0') {
        frameworks.serverUnit.start()
      }
    })
  } else {
    Meteor.startup(function () {
      if (process.env.JASMINE_SERVER_INTEGRATION !== '0' &&
          process.env.FRAMEWORK === frameworks.serverIntegration.name
      ) {
        frameworks.serverIntegration.start()
      }
    })
  }
}

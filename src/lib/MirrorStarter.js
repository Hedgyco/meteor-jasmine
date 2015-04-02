MirrorStarter = function (testingFrameworkName) {
  this.name = testingFrameworkName
}

_.extend(MirrorStarter.prototype, {

  lazyStartMirror: function (mirrorOptions) {
    var requestMirror = this.startMirror.bind(this, mirrorOptions)
    var testsCursor = VelocityTestFiles.find(
      {targetFramework: this.name}
    )

    if (testsCursor.count() > 0) {
      requestMirror()
    } else {
      // Needed for `meteor --test`
      log.debug('No tests for ' + this.name + ' found. Reporting completed.')
      Meteor.call('velocity/reports/completed', {framework: this.name})
      var testsObserver = testsCursor.observe({
        added: function () {
          testsObserver.stop()
          requestMirror()
        }
      })
    }
  },

  startMirror: function (mirrorOptions) {
    var options = {
      framework: this.name
    }
    _.extend(options, mirrorOptions)

    if (!options.port) {
      options.port = freeport()
    }

    log.debug('Starting mirror for ' + this.name)

    // HACK: need to make sure after the proxy package adds the test files
    Meteor.setTimeout(function() {
      Meteor.call(
        'velocity/mirrors/request',
        options,
        function (error) {
          if (error) {
            log.error(error)
          }
        }
      )
    }, 100)
  }

})

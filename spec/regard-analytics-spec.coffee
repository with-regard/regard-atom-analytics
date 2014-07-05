{WorkspaceView} = require 'atom'
RegardAnalytics = require '../lib/regard-analytics'

# Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
#
# To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
# or `fdescribe`). Remove the `f` to unfocus the block.

describe "RegardAnalytics", ->
  activationPromise = null

  beforeEach ->
    atom.workspaceView = new WorkspaceView
    activationPromise = atom.packages.activatePackage('regard-analytics')

  describe "when the regard-analytics:toggle event is triggered", ->
    it "attaches and then detaches the view", ->
      expect(atom.workspaceView.find('.regard-analytics')).not.toExist()

      # This is an activation event, triggering it will cause the package to be
      # activated.
      atom.workspaceView.trigger 'regard-analytics:toggle'

      waitsForPromise ->
        activationPromise

      runs ->
        expect(atom.workspaceView.find('.regard-analytics')).toExist()
        atom.workspaceView.trigger 'regard-analytics:toggle'
        expect(atom.workspaceView.find('.regard-analytics')).not.toExist()

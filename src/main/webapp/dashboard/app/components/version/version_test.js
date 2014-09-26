'use strict';

describe('dashboardApp.version module', function() {
  beforeEach(module('dashboardApp.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});

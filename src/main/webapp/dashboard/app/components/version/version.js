'use strict';

angular.module('dashboardApp.version', [
  'dashboardApp.version.interpolate-filter',
  'dashboardApp.version.version-directive'
])

.value('version', '0.1');

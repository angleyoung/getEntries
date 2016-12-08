'use strict';
window.getEntries = window.getEntries || {
    /**
    * Outputs extended measurements using Navigation API
    * @param  Object name Options 获得某个静态资源的统计时间
    * @return Object      measurements
    */
    getEntries: function(name) {
        var performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;

        if (performance === undefined || performance.getEntries === undefined) {
          return false;
        }

        var getAllEntries = performance.getEntries;
        var getEntriesByName = performance.getEntriesByName;
        var api = [];

        if (name && performance.getEntriesByName) {
            var data = performance.getEntriesByName(name) && performance.getEntriesByName(name)[0];
            // resource name 
            api.name = data.name;
            // resource transferSize 
            api.transferSize = data.transferSize;
            // resource entryType 
            api.entryType = data.entryType;
            // resource initiatorType 
            api.initiatorType = data.initiatorType;
            // resource duration 
            api.duration = data.duration;
            // Time spent during redirection
            api.redirectTime = data.redirectEnd -data.redirectStart;
            // DNS query time
            api.lookupDomainTime = data.domainLookupEnd -data.domainLookupStart;
            // TCP connection time
            api.connectTime = data.connectEnd - data.connectStart;
            // Time spent during the request
            api.requestTime = data.responseEnd - data.requestStart;
        }
        if(!name && performance.getEntries){
            var data = performance.getEntries();
            for(var key in data){
                api[key] = {};
                // resource name 
                api[key].name = data[key].name;
                // resource transferSize 
                api[key].transferSize = data[key].transferSize;
                // resource entryType 
                api[key].entryType = data[key].entryType;
                // resource initiatorType 
                api[key].initiatorType = data[key].initiatorType;
                // resource duration 
                api[key].duration = data[key].duration;
                // Time spent during redirection
                api[key].redirectTime = data[key].redirectEnd -data[key].redirectStart;
                // DNS query time
                api[key].lookupDomainTime = data[key].domainLookupEnd -data[key].domainLookupStart;
                // TCP connection time
                api[key].connectTime = data[key].connectEnd - data[key].connectStart;
                // Time spent during the request
                api[key].requestTime = data[key].responseEnd - data[key].requestStart;
            }
        }
        return api;
    },
    /**
    * Uses console.table() to print a complete table of timing information
    */
    printTable: function(name) {
      var table = {};
      var data  = this.getEntries(name) || {};
      console.table(data);
    }
};


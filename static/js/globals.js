//var BASE_URL = 'http://127.0.0.1:5000'
/* aircraft list from the database*/
var AIRCRAFTLIST;
/* selected aircrafts by the multiple-input */
var SELECTEDAIRCRAFTS = [];
/* keeps track of which Insights graph is currently plotted*/
var SELECTEDGRAPH = 0;
/* keeps track of which Comparisons graph is currently plotted*/
var SELECTEDCOMPARISONGRAPH =0;
/*forced cache of plotting data and HTML modules*/
var graphCache = {};
var fileCache = {};
clearCache();
/*method for cache flushing: needed when change the graph or the aircraft selected*/
function clearCache() {
    graphCache = {};
    fileCache = {};
    var timeoutPeriodInMins = 10;
    setTimeout(clearCache, 1000 * 60 * timeoutPeriodInMins);
}
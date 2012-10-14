// ---- Prepare test -----
var i, j, m, obj,
    targets,
    events,
    handlers;

function initTest(intTargets, intEvents, intHandlers) {
    targets  = [],
    events   = [],
    handlers = [];

    // Generate objects
    for(i=0; i<intTargets; i++) {
        obj = {
            targetName : 'object'+i
        }
        // Add mixin
        mix(obj, Observable_Mixin);
        targets.push(obj);
    }
    // Generate events
    for(i=0; i<intEvents; i++) {
        events.push('event'+i);
    }
    // Generate handlers
    for(i=0; i<intHandlers; i++) {
        handlers.push(function(event){});
    }
}

function runTest(strTestId) {
    // Bind events
    var start = new Date();
    for(i in targets) {
        for(j in events) {
            for(m in handlers) {
                targets[i].bind(events[j], handlers[m]);
            }
        }
    }
    // Run events
    for(i in targets) {
        for(j in events) {
            targets[i].fire(events[j]);
        }
    }
    // Unbind events
    for(i in targets) {
        for(j in events) {
            targets[i].unbind(events[j]);
        }
    }
    // This is the most fast unbind
//    for(i in targets) {
//        targets[i].unbind();
//    }
    var end = new Date();
    var result = end.getTime() - start.getTime();
    document.getElementById(strTestId).innerHTML = (result + ' ms');
}

window.onload = function() {
    document.getElementById('test_1').onclick = function(){
        initTest(10, 10, 10);
        runTest('test_1_result');
    };
    document.getElementById('test_2').onclick = function(){
        initTest(100, 10, 10);
        runTest('test_2_result');
    };
    document.getElementById('test_3').onclick = function(){
        initTest(10, 100, 10);
        runTest('test_3_result');
    };
    document.getElementById('test_4').onclick = function(){
        initTest(10, 10, 100);
        runTest('test_4_result');
    };
}
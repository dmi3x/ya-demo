var config = {
    listeners : {
        'init' : function() {
            console.log('I an inited');
        },
        'load' : function() {
            console.log('I am loaded');
        }
    }
}

var Panel = function() {

    mix(this, Observable_Mixin);

    if(config && typeof config.listeners != 'undefined' ) {
        for(var i in config.listeners) {
            this.bind(i, config.listeners[i]);
        }
    }

    this.fire('init');
    // ..... ajax .......
    var me = this;
    setTimeout(function(){
        me.fire('load');
    }, 1000)
}

var panel = new Panel();
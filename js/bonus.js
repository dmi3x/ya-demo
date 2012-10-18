var config = {
    listeners : {
        'beforeload' : function() {
            console.log('Loading...');
        },
        'load' : function() {
            console.log('I am loaded!');
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

    this.fire('beforeload');
    // ..... ajax .......
    var me = this;
    setTimeout(function(){
        me.fire('load');
    }, 1000)
}

var panel = new Panel();
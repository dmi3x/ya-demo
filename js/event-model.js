/**
 * Add mixin keys to target
 * @param  {Object} target
 * @param  {Object} mixin
 * @return {Object} Target with mixin
 */
function mix(target, mixin) {
    for(var prop in mixin) {
        target[prop] = mixin[prop];
    }
    return target;
}

/**
 * Observable Mixin
 */
var Observable_Mixin = {

    /**
     *  @type {Boolian}
     */
    isObservable : true,
    
    /**
     * Bind event to target object
     * @param  {String}   eventName
     * @param  {Function} handler
     * @param  {Object}   scope     (optional)
     * @return {Object}   this
     */
    bind : function(eventName, handler, scope) {
        var event = {
            eventName : eventName,
            handler   : handler,
            scope     : scope || this,
            target    : this
        };
        if( ! this.events) {
            this.events = {};
        }
        if(typeof this.events[eventName] == 'undefined') {
            this.events[eventName] = [];
        }
        this.events[eventName].push(event);
        return this;
    },

    /**
     * Unbind some event or all events from object
     * @param  {String}   eventName (optional) If not define, then unbind all events
     * @param  {Function} handler   (optional) Binded handler
     * @param  {Object}   scope     (optional) Binded scope
     * @return {Object}   this
     */
    unbind : function(eventName, handler, scope) {
        if( ! eventName) {
            this.events = {};
            return this;
        }
        if(typeof this.events[eventName] == 'undefined') {
            return this;
        }
        var list = this.events[eventName];
        if(handler || scope) {
            for(var i in list) {
                var event = list[i];
                if((!handler || handler === event.handler) && (!scope || scope === event.scope)) {
                    list.splice(i, 1);
                }
            }
        }
        else {
            delete this.events[eventName];
        }
        return this;
    },
    
    /**
     * Run event
     * @param  {String} eventName
     * @return {Boolian}
     */
    fire : function(eventName) {
        if( ! this.events || typeof this.events[eventName] == 'undefined') {
            return true;
        }
        var events = this.events[eventName];
        var result = true;
        for(var i in events) {
            var event = events[i];
            if(event.handler.call(event.scope, event) === false) {
                result = false;
            }
        }
        return result;
    }
}
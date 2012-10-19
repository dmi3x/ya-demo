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
 *
 * 1. Mix target object
 *      var target = {}
 *      mix(target, Observable_Mixin);
 *      
 * 2. Bind event
 *      target.bind('init', fnHandler1);
 *      target.bind('init', fnHandler1);
 *      target.bind('init', fnHandler2, objScope);
 *      target.bind('load', fnHandler3, objScope);
 *
 * 3. Fire event
 *      target.fire('init'); // run fnHandler1 with target scope twice, run fhHandler2 with objScope
 *
 * 4. Unbind event
 *      target.unbind('init', fnHandler2, objScope); // unbind specific handler with specific scope
 *      target.unbind('init', fnHandler1);           // unbind both fnHandler1 events on target
 *      target.unbind('load');  // unbind all handlers for load event on target
 *      target.unbind('fake');  // no defined event donot throw exceptions
 *      target.unbind();        // unbind all events on target
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
        if( ! this.events[eventName]) {
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
        if( ! this.events[eventName]) {
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
        if( ! this.events || ! this.events[eventName]) {
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

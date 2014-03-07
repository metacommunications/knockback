/*
  knockback-triggering.js 0.18.5
  (c) 2011-2013 Kevin Malakoff - http://kmalakoff.github.com/knockback/
  License: MIT (http://www.opensource.org/licenses/mit-license.php)
  Dependencies: Knockout.js, Backbone.js, and Underscore.js.
*/
(function() {
  return (function(factory) {
    if (typeof exports == 'object') {
      module.exports = module.exports = factory.call(this, require);
    } else if (typeof define == 'function' && define.amd) {
      define(['require', 'underscore', 'backbone', 'knockout', 'knockback'], factory);
    } else {
      this.kb = factory.call(this, (typeof require !== 'undefined') ? require : undefined);
    }
  })(function(require) {// Generated by CoffeeScript 1.7.1
var kb, ko, _, _publishMethods, _unwrapObservable;

kb = this.kb || require('knockback');

_ = kb._;

ko = kb.ko;

_unwrapObservable = ko.utils.unwrapObservable;


/*
  knockback-triggered-observable.js 0.18.5
  (c) 2011-2013 Kevin Malakoff.
  Knockback.Observable is freely distributable under the MIT license.
  See the following for full license details:
    https://github.com/kmalakoff/knockback/blob/master/LICENSE
 */

_publishMethods = kb._publishMethods;

kb.TriggeredObservable = (function() {
  function TriggeredObservable(emitter, event_selector) {
    var observable;
    this.event_selector = event_selector;
    emitter || _throwMissing(this, 'emitter');
    this.event_selector || _throwMissing(this, 'event_selector');
    this.vo = ko.observable();
    observable = kb.utils.wrappedObservable(this, ko.dependentObservable((function(_this) {
      return function() {
        return _this.vo();
      };
    })(this)));
    _publishMethods(observable, this, ['destroy']);
    kb.utils.wrappedEventWatcher(this, new kb.EventWatcher(emitter, this, {
      emitter: _.bind(this.emitter, this),
      update: _.bind(this.update, this),
      event_selector: this.event_selector
    }));
    return observable;
  }

  TriggeredObservable.prototype.destroy = function() {
    return kb.utils.wrappedDestroy(this);
  };

  TriggeredObservable.prototype.emitter = function(new_emitter) {
    if ((arguments.length === 0) || (this.ee === new_emitter)) {
      return this.ee;
    }
    if ((this.ee = new_emitter)) {
      return this.update();
    }
  };

  TriggeredObservable.prototype.update = function() {
    if (!this.ee) {
      return;
    }
    if (this.vo() !== this.ee) {
      return this.vo(this.ee);
    } else {
      return this.vo.valueHasMutated();
    }
  };

  return TriggeredObservable;

})();

kb.triggeredObservable = function(emitter, event_selector) {
  return new kb.TriggeredObservable(emitter, event_selector);
};
; return kb;});
}).call(this);

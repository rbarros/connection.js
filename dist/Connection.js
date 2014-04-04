/*! Connection - v1.0.0 - 2014-04-04
* https://github.com/rbarros/connection.js
* Copyright (c) 2014 Ramon Barros; Licensed MIT */
(function(root) {
  'use strict';

  var Connection = function(el, type, fn) {
    this.text = navigator.onLine ? 'online' : 'offline';
    this.code = navigator.onLine;
    if (!el && !type && !fn) {
      return this;
    } else {
      return this.addEvent(el, type, fn);
    }
  };

  root['Connection'] = new Connection();

  Connection.prototype.addEvent = function(el, type, fn) {
    var i = 0;
    if (root.document.addEventListener) {
      if (el && el.nodeName || el === root) {
        el.addEventListener(type, fn, false);
      } else if (el && el.length) {
        for (i; i < el.length; i++) {
          root['Connection'].addEvent(el[i], type, fn);
        }
      }
    } else {
      if (el && el.nodeName || el === root) {
        el.document.body.attachEvent('on' + type, function () { return fn.call(el, root.event, root['Connection']); });
      } else if (el && el.length) {
        for (i; i < el.length; i++) {
          root['Connection'].addEvent(el[i], type, fn);
        }
      }
    }
  };

  Connection.prototype.check = function(event, instance) {
    var self = instance || root['Connection'];
    if (navigator) {
      self.text = navigator.onLine ? 'online' : 'offline';
      self.code = navigator.onLine;
    } else {
      if (event.type === 'online') {
        self.text = 'online';
        self.code = true;
      } else if (event.type === 'offline') {
        self.text = 'offline';
        self.code = false;
      } else {
        self.text = undefined;
        self.code = undefined;
      }
    }
  };

  Connection.prototype.run = function(fn) {
    var self = this;
    self.addEvent(root, 'online', fn || self.check);
    self.addEvent(root, 'offline', fn || self.check);
    root.setInterval(root['Connection'].status, 1000);
  };

  Connection.prototype.status = function() {
    root.console.log(root['Connection'].text);
    root.console.log(root['Connection'].code);
  };

})(this);

/*! Connection - v1.0.0 - 2014-04-04
* https://github.com/rbarros/connection.js
* Copyright (c) 2014 Ramon Barros; Licensed MIT */
(function(root) {
  'use strict';

  var Connection = function(el, type, fn) {
    this.hosts = [
      '208.67.222.222', // OpenDNS
      '208.67.220.220' // OpenDNS
    ];
    this.text = navigator.onLine ? 'online' : 'offline';
    this.code = navigator.onLine;
    this.pingStatus = null;
    this.callback = null;
    this.msg = {
      success: {
        style: 'alert-success',
        text: 'Ok ! Sua conexão voltou!'
      },
      error: {
        style: 'alert-error',
        text: 'Atenção: Sua conexão caiu ! Verifique antes de continuar !'
      },
      ping: {
        style: 'alert-info',
        text: 'Você esta conectado a internet.'
      },
      pingError: {
        style: 'alert-info',
        text: 'Você não tem acesso ao internet.'
      },
      timeout: {
        style: 'alert-error',
        text: 'Timeout'
      }
    }
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

  Connection.prototype.ping = function(host, callback) {
    var _that = this;
    if (!this.inUse) {
        this.pingStatus = 'unchecked';
        this.inUse = true;
        //this.callback = callback;
        this.host = host;
        this.img = new Image();
        this.img.onload = function () {
            _that.inUse = false;
            //_that.callback('responded');
            callback('responded');
        };
        this.img.onerror = function (e) {
            if (_that.inUse) {
                _that.inUse = false;
                //_that.callback('responded', e);
                callback('error', e);
            }

        };
        this.start = new Date().getTime();
        this.img.src = "http://" + host;
        this.timer = setTimeout(function () {
            if (_that.inUse) {
                _that.inUse = false;
                //_that.callback('timeout');
                callback('timeout');
            }
        }, 1500);
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
    if (self.callback) {
      self.callback(self.code, self.text);
    } else {
      self.showMessage(self.code, self.text);
    }
  };

  Connection.prototype.showMessage = function(code, text) {
    var status, msg, body = root.document.body, div = root.document.getElementsByClassName('connection');
    if (code) {
      status = this.msg.success.style;
      msg = this.msg.success.text;
    } else {
      status = this.msg.error.style;
      msg = this.msg.error.text;
    }

    if (div.length === 0) {
      div = root.document.createElement('div');
      div.className = 'connection alert ' + status;
      div.style.width = '50%';
      div.style.left = '25%';
      div.style.textAlign = 'center';
      div.style.position = 'absolute';
      div.style.display = 'none';
      div.innerHTML = '<a class="close" data-dismiss="' + status + '">×</a><p>' + msg + '</p>';
      body.insertBefore(div, body.firstChild);
    } else {
      div = div[0];
      div.className = 'connection alert ' + status;
      div.innerHTML = '<a class="close" data-dismiss="' + status + '">×</a><p>' + msg + '</p>';
    }
    div.style.display = 'block';
    this.sleep(2000);
    div.style.display = 'none';
  };

  Connection.prototype.sleep = function(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  };

  Connection.prototype.run = function(fn, interval, fnInterval) {
    var self = this, setinterval = interval || false;
    self.callback = fn;
    self.addEvent(root, 'online', self.check);
    self.addEvent(root, 'offline', self.check);
    self.check();
    if (setinterval) {
      root.setInterval(fnInterval || root['Connection'].status, 1000);
    }
    self.addEvent(document.getElementsByTagName('button'), 'click', function(event) {
        if (!root['Connection'].code) {
            event.preventDefault();
            root['Connection'].run(self.callback);
        }
    });
    self.addEvent(document.getElementsByTagName('a'), 'click', function(event) {
        if (!root['Connection'].code) {
            event.preventDefault();
            root['Connection'].run(self.callback);
        }
    });
  };

  Connection.prototype.status = function() {
    root.console.log(root['Connection'].text);
    root.console.log(root['Connection'].code);
  };

})(this);
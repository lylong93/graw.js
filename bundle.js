
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   *  parse html to object
   */
  var htmlParse = function htmlParse(root) {
    console.log(root);
    return '123';
  };

  /**
   * main gws class
   */

  var Gws = /*#__PURE__*/function () {
    function Gws(config) {
      _classCallCheck(this, Gws);

      this.config = config;
      this.init();
    }

    _createClass(Gws, [{
      key: "init",
      value: function init() {
        var el = this.config.el;
        var root = document.getElementById(el);
        var three = htmlParse(root);
      }
    }]);

    return Gws;
  }();

  window.Gws = Gws;

}());

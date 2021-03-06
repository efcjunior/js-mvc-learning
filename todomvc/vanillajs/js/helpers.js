(function (window) {
    'use strict';

    window.qs = function (selector, scope) {
        return (scope || document).querySelector(selector);
    };

    window.$on = function (target, type, callback, useCapture) {
        target.addEventListener(type, callback, !!useCapture);
    };

}(window));
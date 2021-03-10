(function($) {
    (function(factory) {
        if (typeof define === 'function' && define.amd) {
            define(['jquery'], factory)
        } else if (typeof exports === 'object') {
            module.exports = factory(require('jquery'))
        } else {
            factory(jQuery)
        }
    }(function($) {
        var pluses = /\+/g;

        function encode(s) {
            return config.raw ? s : encodeURIComponent(s)
        }

        function decode(s) {
            return config.raw ? s : decodeURIComponent(s)
        }

        function stringifyCookieValue(value) {
            return encode(config.json ? JSON.stringify(value) : String(value))
        }

        function parseCookieValue(s) {
            if (s.indexOf('"') === 0) {
                s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\')
            }
            try {
                s = decodeURIComponent(s.replace(pluses, ' '));
                return config.json ? JSON.parse(s) : s
            } catch (e) {}
        }

        function read(s, converter) {
            var value = config.raw ? s : parseCookieValue(s);
            return $.isFunction(converter) ? converter(value) : value
        }
        var config = $.cookie = function(key, value, options) {
            if (arguments.length > 1 && !$.isFunction(value)) {
                options = $.extend({}, config.defaults, options);
                if (typeof options.expires === 'number') {
                    var days = options.expires,
                        t = options.expires = new Date();
                    t.setMilliseconds(t.getMilliseconds() + days * 864e+5)
                }
                return (document.cookie = [encode(key), '=', stringifyCookieValue(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''))
            }
            var result = key ? undefined : {},
                cookies = document.cookie ? document.cookie.split('; ') : [],
                i = 0,
                l = cookies.length;
            for (; i < l; i++) {
                var parts = cookies[i].split('='),
                    name = decode(parts.shift()),
                    cookie = parts.join('=');
                if (key === name) {
                    result = read(cookie, value);
                    break
                }
                if (!key && (cookie = read(cookie)) !== undefined) {
                    result[name] = cookie
                }
            }
            return result
        };
        config.defaults = {};
        $.removeCookie = function(key, options) {
            $.cookie(key, '', $.extend({}, options, {
                expires: -1
            }));
            return !$.cookie(key)
        }
    }));
    var btn = document.querySelector(".dark-theme-icon");
    var currentTheme = $.cookie("xf_phonandroid_theme");
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && currentTheme === undefined) {
        $.cookie('xf_phonandroid_theme', "dark", {
            path: '/'
        });
        currentTheme = "dark"
    }
    if (currentTheme === "dark") {
        if ($('html').hasClass('light-theme')) {
            document.html.classList.toggle("dark-theme")
        } else {
            $('html').addClass('dark-theme')
        }
    } else if (currentTheme === "light") {
        if ($('html').hasClass('dark-theme')) {
            document.html.classList.toggle("light-theme")
        } else {
            $('html').addClass('light-theme')
        }
    }
    $(document).ready(function($) {
        btn.addEventListener("click", function() {
            if ($('html').hasClass('light-theme')) {
                $('html').removeClass('light-theme').addClass('dark-theme');
                $('html').css('background', '#2b2b2b');
                var theme = "dark"
            } else if ($('html').hasClass('dark-theme')) {
                $('html').removeClass('dark-theme').addClass('light-theme');
                $('html').css('background', '#fff');
                var theme = "light"
            } else {
                $('html').addClass('dark-theme');
                $('html').css('background', '#2b2b2b');
                var theme = "dark"
            }
            $.cookie('xf_phonandroid_theme', theme, {
                path: '/'
            })
        })
    })
})(jQuery)
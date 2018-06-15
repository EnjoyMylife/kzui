export default{
    setCookie(name, value, options) {
        if (arguments.length > 1 && name != null) {
            if (options == null) {
                options = {};
            }
            if (value == null) {
                options.expires = -1;
            }
            if (typeof options.expires == "number") {
                var time = options.expires;
                var expires = options.expires = new Date();
                expires.setTime(expires.getTime() + time * 1000);
            }
            if (options.path == null) {
                options.path = "/";
            }
            if (options.domain == null) {
                options.domain = location.hostname;
            }
            var newValue = encodeURIComponent(String(value)).replace("(", "%28").replace(")", "%29");
            document.cookie = encodeURIComponent(String(name)) + "=" + newValue + (options.expires != null ? "; expires=" + options.expires.toUTCString() : "") + ("; path=/") + ("; domain=" + options.domain) + (options.secure != null ? "; secure" : "");
        }
    },
    getCookie(name) {
        if (name != null) {
            var value = new RegExp("(?:^|; )" + encodeURIComponent(String(name)) + "=([^;]*)").exec(document.cookie);
            return value ? decodeURIComponent(value[1]) : null;
        }
        return null;
    },
    removeCookie(name,opt) {
        this.setCookie(name, null, { expires: -1 ,domain:opt.domain});
    }
}
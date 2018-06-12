

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function noop() {};

export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
};

function extend(to, _from) {
  for (let key in _from) {
    to[key] = _from[key];
  }
  return to;
};

export function toObject(arr) {
  var res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
};

export const getValueByPath = function(object, prop) {
  prop = prop || '';
  const paths = prop.split('.');
  let current = object;
  let result = null;
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i];
    if (!current) break;

    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};

export function getPropByPath(obj, path, strict) {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  let keyArr = path.split('.');
  let i = 0;
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    let key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
};

export const generateId = function() {
  return Math.floor(Math.random() * 10000);
};

export const valueEquals = (a, b) => {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};


export default {
    //本地数据处理类
    getItem(k) {//获取localStorage或cookie里面的数据 优先获取localStorage
        if (window && window.localStorage && window.localStorage[k]) {
            return window.localStorage[k];
        } else if (this.getCookies(k)) {
            return this.getCookies(k);
        }
        return null;
    },
    setItem(k, v, opt) {//设置本地数据默认使用localStorage当不支持时转为cookie存储
        if (window && window.localStorage) {
            localStorage.setItem(k, v);
        } else {
            this.setCookie(k, v, opt?opt:{});
        }
    },
    removeItem(k) {
        if (window && window.localStorage && window.localStorage[k]) {
            localStorage.removeItem(k);
        } else if (this.getCookies(k)) {
            this.removeCookie(k);
        }
    },
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
    getCookies(name) {
        if (name != null) {
            var value = new RegExp("(?:^|; )" + encodeURIComponent(String(name)) + "=([^;]*)").exec(document.cookie);
            return value ? decodeURIComponent(value[1]) : null;
        }
        return null;
    },
    removeCookie(namek) {
        this.setCookie(name, null, { expires: -1 });
    }
}

// 深拷贝
const copyObj = (obj) => {
    const newObj = {};
    for (let key in obj) {
        if (typeof obj[key] !== 'object') {
            newObj[key] = obj[key];
        } else {
            newObj[key] = copyObj(obj[key]);
        }
    }
    return newObj;
}

const extend =(to, _from) => {
    for (let key in _from) {
        to[key] = _from[key];
    }
    return to;
};

export default{
    copyObj,extend
}
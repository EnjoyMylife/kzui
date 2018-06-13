

export const validateTel = (rule, value, callback) => {
    if (value && !/^1\d{10}$/.test(value)) {
      callback&&callback(new Error("请输入正确的手机号码"));
    } else {
      callback&&callback();
    }
  };

  export const validateID = (rule, value, callback) => {
    if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
      callback&&callback(new Error("请输入正确的身份证号码"));
    } else {
      callback&&callback();
    }
  };
  export const  validateBankNo = (rule, value, callback) => {
    if (!/^([1-9]{1})(\d{14}|\d{18})$/.test(value)) {
      callback&&callback(new Error("请输入正确银行卡号"));
    } else {
      callback&&callback();
    }
  };

  export const  validateNumber = (rule, value, callback) => {
    if (value<0) {
      callback&&callback(new Error("输入的数字不能是负数"));
    } else {
      callback&&callback();
    }
  };

  export const  validateFloat = (rule, value, callback) => {
    if (value!= parseFloat(parseFloat(value).toFixed(2))) {
      callback&&callback(new Error("小数点最多保存后两位"));
    } else {
      callback&&callback();
    }
  };
  
  export const  validateInteger = (rule, value, callback) => {
    if (value%1 !== 0) {
      callback(new Error("输入的数字必须是整数"));
    } else {
      callback();
    }
  };

  export const  validateChar = (rule, value, callback) => {
    let reg = new RegExp("[`~!@%#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    if (reg.test(value)) {
      callback(new Error("输入的内容不能包含特殊字符"));
    } else {
      callback();
    }
  };
  
  export const  validateEn = (rule, value, callback) => {
    let reg = new RegExp("^[A-Za-z0-9]+$");
    if (!reg.test(value)) {
      callback(new Error("输入的内容只能是英文字母和数字"));
    } else {
      callback();
    }
  };


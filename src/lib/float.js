var floatTool = function() {
        
    function isInteger(obj) {
        return Math.floor(obj) === obj
    }
    
    function toInteger(floatNum) {
        var ret = {times: 1, num: 0}
        if (isInteger(floatNum)) {
            ret.num = floatNum;
            return ret;
        }
        var strfi  = floatNum + '';var dotPos = strfi.indexOf('.');var len = strfi.substr(dotPos+1).length;
        var times  = Math.pow(10, len);var intNum = parseInt(floatNum * times + 0.5, 10);
        ret.times  = times;ret.num = intNum;
        return ret;
    }

    function operation(a, b, op) {
        var o1 = toInteger(a);var o2 = toInteger(b);var n1 = o1.num;
        var n2 = o2.num;var t1 = o1.times;var t2 = o2.times;
        var max = t1 > t2 ? t1 : t2;var result = null;
        switch (op) {
            case 'add':
                if (t1 === t2) {  result = n1 + n2; } 
                else if (t1 > t2) { result = n1 + n2 * (t1 / t2); } 
                else { result = n1 * (t2 / t1) + n2; }
                return result / max;
            case 'sub':
                if (t1 === t2) { result = n1 - n2; } 
                else if (t1 > t2) { result = n1 - n2 * (t1 / t2); } 
                else { result = n1 * (t2 / t1) - n2; }
                return result / max
            case 'mul':
                result = (n1 * n2) / (t1 * t2);
                return result
            case 'divide':
                return result = function() { 
                    var r1 = n1 / n2;var r2 = t2 / t1;
                    return operation(r1, r2, 'mul')
                }()
        }
    }

    function add(a, b) { return operation(a, b, 'add') }
    function sub(a, b) { return operation(a, b, 'sub') }
    function mul(a, b) { return operation(a, b, 'mul') }
    function divide(a, b) { return operation(a, b, 'divide') }
    return {
        add: add, sub: sub,
        mul: mul, divide: divide
    }
}();

Number.prototype.toFixed = function(len){ 
	
	var changenum =(parseInt(this * Math.pow( 10, len ) + 0.5)/ Math.pow( 10, len )).toString(); 
	var index 	  = changenum.indexOf("."); 
	
	if(index < 0 && len > 0){ 
		changenum = changenum+"."; 
		for(var i = 0;i < len; i++){ 
			changenum = changenum+"0"; 
		} 
	}else { 
		index = changenum.length - index; 
		for(var i = 0; i <(len - index) + 1;i++){ 
			changenum = changenum+"0"; 
		} 
	} 
	
	return changenum; 
}
Number.prototype.mul = function (arg){ return floatTool.mul(arg, this);  } 	//乘
Number.prototype.add = function (arg){ return floatTool.add(arg,this); }	// 加
Number.prototype.minus = function (arg){ return floatTool.sub(this,arg);  } // 减
Number.prototype.divide = function (arg){ return floatTool.divide(this,arg);  } // 除
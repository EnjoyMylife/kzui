String.prototype.trim=function(){
　　return this.replace(/(^\s*)|(\s*$)/g, "");
}

//只去除字符串左边空白
    String.prototype.ltrim=function(){
　　return this.replace(/(^\s*)/g,"");
}

//只去除字符串右边空白
String.prototype.rtrim=function(){
　　return this.replace(/(\s*$)/g,"");

}
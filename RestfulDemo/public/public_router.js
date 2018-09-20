var isAndroid = false;
var isIOS = false;
var Atp = Em.Application.create();
/* 设备识别 */
function recogniseDevice() {
       var ua = navigator.userAgent;  
    if(!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
        isIOS = true;
    }
    else if(ua.indexOf('Android') > -1 || ua.indexOf('android') > -1){
        isAndroid = true;
    }
    else {
        isPC = true;
    }
}
function DateAdd(number, date) {
    date.setDate(date.getDate() + number);
    return date.toLocaleDateString();
}
/* 字符串转换为json格式的数�?*/
var strToJson = function (str){
    var json = (new Function("return " + str))();
    return json;
}

var utilGetTimeString = function (timeVal) {
    var timeString = "";
    var tmpVal;
    var ishasday = false;
    var timetmp = parseInt(timeVal,10)
    tmpVal = parseInt((timetmp / (60*60*24)),10);
    if(tmpVal>0){
        ishasday = true;
        timeString += parseInt(tmpVal,10) + Em.I18n.t("public.day");
    }
    timetmp %= 60*60*24;
    tmpVal = parseInt((timetmp / (60*60)),10);
    if(ishasday || tmpVal > 0){
        timeString += parseInt(tmpVal,10) + Em.I18n.t("public.hour");
    }
    timetmp %= 60*60;
    tmpVal = parseInt((timetmp / 60),10);
    if(tmpVal > 0){
        timeString += parseInt(tmpVal,10) + Em.I18n.t("public.minute");
    }
    return timeString;
}

var GETflow = function (value){
    var intbits = parseInt(parseInt(value)/8);
    if(intbits<1024){
        return intbits + "B";
    }else if(intbits < (1024 * 1024)){
        return (intbits/1024).toFixed(2) + "KB";
    }else if(intbits < (1024 * 1024 *1024)){
        return (intbits/(1024*1024)).toFixed(2) + "MB";
    }else if(intbits < (1024 * 1024 *1024 * 1024)){
        return (intbits/(1024*1024*1024)).toFixed(2) + "GB";
    }else if(intbits < (1024 * 1024 *1024 * 1024 * 1024)){
        return (intbits/(1024*1024*1024*1024)).toFixed(2) + "TB";
    }    
    return 0;
}

var GETBand = function (value){
    var val_temp = parseInt(value,10);
    if(val_temp < 1024){
        return val_temp + "bps";
    }else if(val_temp < (1024*1024)){
        return parseFloat(val_temp/(1024)).toFixed(2) + "Kbps";
    }else if(val_temp < (1024*1024*1024)){
        return parseFloat(val_temp/(1024*1024)).toFixed(2) + "Mbps";
    }else if(val_temp < (1024*1024*1024*1024)){
        return parseFloat(val_temp/(1024*1024*1024)).toFixed(2) + "Gbps";
    }else if(val_temp < (1024*1024*1024*1024*1024)){
        return parseFloat(val_temp/(1024*1024*1024*1024)).toFixed(2) + "Tbps";
    }
    return 0;
}
function utilGetJson(obj) {
    var v, ret = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            v = obj[key];
            if (v === 'toString') {
                continue;
            }
            if (Em.typeOf(v) === 'function') {
                continue;
            }
            if (Em.typeOf(v) === 'undefined') {
              continue;
            }
            if (Em.typeOf(v) === 'object') {
              continue;
            }
            if (Em.typeOf(v) === 'instance'){
              continue;
            }
            ret.push(key);
        }
    }
    return obj.getProperties.apply(obj, ret);
}

function  _utf8_encode(string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
            utftext += String.fromCharCode(c);
        }
        else if((c > 127) && (c < 2048)) {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
        }
        else {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
        }
    }
    return utftext;
}
function base64_encode (input) {
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = _utf8_encode(input);
    while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
    }
    return output;
}

Atp.service = Em.Mixin.create({
    modelClass: Em.Object,
    beforeLoad:function(){

    },
    getPostStr:function(postdata){
        return $.toJSON(postdata);
    },
    createSubmitData: function() {
      return utilGetJson(this.content);
    },
    encdata:function(){

    },
    geterrorProc:function(errorstr){

    },
    getsuccessProc:function(jsonstr){

    },
    postSuccessProc:function(){

    },
    portErrorProc:function(){

    },
    getConfigData:function(){

    },
    getFinishCallback:function(){

    },
    afterLoad:function(){

    },
    enc: function(encstring) {
        var rsakey = Atp.GetEncController.getPubkey();
        var rsan = rsakey[0];
        var rsae = rsakey[1];
        var rsa = new RSAKey();
        rsa.setPublic(rsan, rsae);
        var arr = base64_encode(encstring);
        var num = arr.length / 245;
        var restotal = '';
        for (i = 0; i < num; i++)
        {
            var encdata = arr.substr(i * 245, 245);
            var res = rsa.encrypt(encdata);
            if(res.length != rsan.length)
            {
                i--;
                continue;
            }
            restotal += res;
        }
        return restotal;
    },
    post: function(mydata, action, callback, errproc) {
        if(isIOS){
            SetAjaxData(this.get("apiurl"), action, this.postSuccessProc, this.portErrorProc);
        }else{
            javascript:ajaxAction.setAjaxData(this.get("apiurl"), action, this.postSuccessProc, this.portErrorProc);
        }
    }
});

/* single service */
Atp.SingleService =  Em.Object.extend(Atp.service, {
    init: function () {
        var self = this;
        this._super();
        Ember.changeProperties(function(){
            self.set('content', self.get("modelClass").create());
        });
    },
    getsuccessProc:function(strdata){
        var data = strToJson(strdata);
        if(this.beforeLoad){
            this.beforeLoad();
        }
        this.content.setProperties(data);
        if (this.afterLoad){
            this.afterLoad();
        }
    },
    geterrorProc:function(strdata){
        Em.Logger.log("error",strdata);
    }
});

/* multi service */
Atp.MultiService =  Em.ArrayController.extend(Atp.service, {
    content: [],
    activeItem: null,
    init: function () {
        var self = this;
        this._super();
        Ember.changeProperties(function(){
            self.set('content', []);
            self.set('activeItem', null);
        });
    },
    getsuccessProc:function(strdata){
        var data = strToJson(strdata);
        var datalist = [];
        var datalen = data.length;
        var num = 0;
        if(this.beforeLoad){
            this.beforeLoad();
        }
        for(var i=0; i< datalen; i++){
            var item = data[i];
            var newItem = this.get("modelClass").create(item);
            newItem.isActiveItem = false;
            datalist[num] = newItem;
            num = num + 1;
        }
        this.set('content', []);
        this.set("content", datalist);
        if (this.afterLoad){
            this.afterLoad();
        } 
    },
    geterrorProc:function(strdata){
        Em.Logger.log("error",strdata);
    }
});

Atp.GetEncController = Atp.SingleService.create ({
    apiurl:'/api/system/encpubkey',
    getConfigData:function(){
        recogniseDevice();
        if(isIOS){
            getAjaxData(this.get("apiurl"), "Atp.GetEncController.getsuccessProc", "Atp.GetEncController.geterrorProc");
        }else{
            javascript:ajaxAction.getAjaxData(this.get("apiurl"), "Atp.GetEncController.getsuccessProc", "Atp.GetEncController.geterrorProc");
        }
    },
    getPubkey:function() {
        return [this.content.get("EncpubkeyN"),this.content.get("EncpubkeyE")];
    }
});
function sack(file){this.xmlhttp=null,this.resetData=function(){this.method="POST",this.queryStringSeparator="?",this.argumentSeparator="&",this.URLString="",this.encodeURIString=!0,this.execute=!1,this.element=null,this.elementObj=null,this.requestFile=file,this.vars=new Object,this.responseStatus=new Array(2)},this.resetFunctions=function(){this.onLoading=function(){},this.onLoaded=function(){},this.onInteractive=function(){},this.onCompletion=function(){},this.onError=function(){},this.onFail=function(){}},this.reset=function(){this.resetFunctions(),this.resetData()},this.createAJAX=function(){try{this.xmlhttp=new ActiveXObject("Msxml2.XMLHTTP")}catch(t){try{this.xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")}catch(t){this.xmlhttp=null}}this.xmlhttp||("undefined"!=typeof XMLHttpRequest?this.xmlhttp=new XMLHttpRequest:this.failed=!0)},this.setVar=function(t,e){this.vars[t]=Array(e,!1)},this.encVar=function(t,e,n){if(1==n)return Array(encodeURIComponent(t),encodeURIComponent(e));this.vars[encodeURIComponent(t)]=Array(encodeURIComponent(e),!0)},this.processURLString=function(t,e){for(encoded=encodeURIComponent(this.argumentSeparator),regexp=new RegExp(this.argumentSeparator+"|"+encoded),varArray=t.split(regexp),i=0;i<varArray.length;i++)urlVars=varArray[i].split("="),1==e?this.encVar(urlVars[0],urlVars[1]):this.setVar(urlVars[0],urlVars[1])},this.createURLString=function(t){for(key in this.encodeURIString&&this.URLString.length&&this.processURLString(this.URLString,!0),t&&(this.URLString.length?this.URLString+=this.argumentSeparator+t:this.URLString=t),this.setVar("rndval",(new Date).getTime()),urlstringtemp=new Array,this.vars)0==this.vars[key][1]&&1==this.encodeURIString&&(encoded=this.encVar(key,this.vars[key][0],!0),delete this.vars[key],this.vars[encoded[0]]=Array(encoded[1],!0),key=encoded[0]),urlstringtemp[urlstringtemp.length]=key+"="+this.vars[key][0];this.URLString+=t?this.argumentSeparator+urlstringtemp.join(this.argumentSeparator):urlstringtemp.join(this.argumentSeparator)},this.runResponse=function(){eval(this.response)},this.runAJAX=function(t){if(this.failed)this.onFail();else if(this.createURLString(t),this.element&&(this.elementObj=document.getElementById(this.element)),this.xmlhttp){var e=this;if("GET"==this.method)totalurlstring=this.requestFile+this.queryStringSeparator+this.URLString,this.xmlhttp.open(this.method,totalurlstring,!0);else{this.xmlhttp.open(this.method,this.requestFile,!0);try{this.xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded")}catch(t){}}this.xmlhttp.onreadystatechange=function(){switch(e.xmlhttp.readyState){case 1:e.onLoading();break;case 2:e.onLoaded();break;case 3:e.onInteractive();break;case 4:e.response=e.xmlhttp.responseText,e.responseXML=e.xmlhttp.responseXML,e.responseStatus[0]=e.xmlhttp.status,e.responseStatus[1]=e.xmlhttp.statusText,e.execute&&e.runResponse(),e.elementObj&&(elemNodeName=e.elementObj.nodeName,elemNodeName.toLowerCase(),"input"==elemNodeName||"select"==elemNodeName||"option"==elemNodeName||"textarea"==elemNodeName?e.elementObj.value=e.response:e.elementObj.innerHTML=e.response),"200"==e.responseStatus[0]?e.onCompletion():e.onError(),e.URLString="";break}},this.xmlhttp.send(this.URLString)}},this.reset(),this.createAJAX()}
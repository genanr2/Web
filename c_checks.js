// Function for check fields on emty value
var keyEsc=0;
function fnSChk(w,sObjName,sCompVal,mess,bool,iCase){
	var el, vl;
	if(!bool) return false;
	if(w.df==null || w.df[sObjName]==null){
		el=w.document.all[sObjName];
		if(el==null){
			w.alert('Error:\nInvalid object ('+sObjName+').\nfunction "fnSChk"');
			return false;
		}
	}
	else{
		el=w.df[sObjName];
	}
	switch(iCase){
		case 1 : vl=el.value=Trim(el.value); break;
		case 2 : vl=el.value=NormalizeMoney(el.value); break;
		default : vl=el.value;
	}
	if(vl==sCompVal){
		w.alert(mess);
		try{var vE=el.attributes.getNamedItem('visualEl'); if(vE!=null && vE.value!='') w.document.all[vE.value].focus(); else el.focus();}catch(e){}
		return false;
	}
	if(iCase==2) return fnChkSummLen(el);
	return bool;
}

function SubCheckEmpty(w,sOName,CmpVal,msg,bl){return fnSChk(w,sOName,CmpVal,msg,bl,0);}
function SubCheckEmptyTrim(w,sOName,CmpVal,msg,bl){return fnSChk(w,sOName,CmpVal,msg,bl,1);}
function SubCheckEmptyMoney(w,sOName,CmpVal,msg,bl){return fnSChk(w,sOName,CmpVal,msg,bl,2);}

function fnChekDateDif(d1,d2,s){
	if (d1=='' || d2=='') {return true;}
	if (s==null) s=top.LRSChecks12;
	var re=/^(\d\d).(\d\d).(\d{4})$/;
	if (d1.replace(re,"$3$2$1") <= d2.replace(re,"$3$2$1")) return(true);
	alert(s);
	return (false);
}


function NormalizeMoney(Value,bNullNotEqEmpty,DAD,NOENDZEROS){
	// Приводит к формату ######0.## (количество цифр после запятой задается параметром DAD - number of Digits After Dot)
	// Если второй аргумент не равен true, то если сумма 0.00 - функция вернет пустую строку.
	if (DAD==null || DAD=='') DAD=2;
	var s;
	s=('0'+Value).replace(/\s/g,'').replace(/[^\.\d]/g,'.').replace(/[\.]+/g,'.');
	_pow=Math.pow(10,DAD);
	v=Math.round(parseFloat(s)*_pow+0.0000001);
	if(NOENDZEROS) s=v/_pow;
	else {
		v2=v%_pow;
		s=parseInt((v-v2)/_pow,10)+'.'+Zeros(v2,DAD);
	}
	if(bNullNotEqEmpty)return s;
	return (parseFloat(s)==0) ? '' : s;
}	// NormalizeMoney

function fnChekSumm(w,bNullNotEqEmpty,DAD){
	// Если второй аргумент не равен true, то если сумма 0.00 - функция вернет пустую строку.
	Obj=w.event.srcElement;
	Obj.value=NormalizeMoney(Obj.value,bNullNotEqEmpty,DAD);
}

function fnChkSummLen(obj,bNeedNormalize,bNullNotEqEmpty){
	if(bNeedNormalize) obj.value=NormalizeMoney(obj.value,bNullNotEqEmpty);
	if(obj.value.indexOf('.') <= 12) return (true);
	alert(LRSChecks13);
	obj.value='';
	obj.focus();
	return (false);
}

function fnChkNumberLen(w,o,b){
	if(!b) return false;
	var s='',
	 len=getEM(w.da.fData,'@DNL',0),
	 ch=w.da.fData.selectSingleNode('//@DNC').nodeValue,
	 dlen=o.value.length-len;
	if(dlen>0){
		for(i=0; i<dlen; i++) s+=ch;
		if(o.value.indexOf(s)==0){
			o.value=o.value.substr(dlen,len);
			return true;
		}
		else{
			alert(LRSChecks14+len);
			o.focus();
			return false;
		}
	}
	else{
		var n=Trim(o.value),j=len-n.length,i;
		for(i=0; i<j; i++) s+=ch;
		o.value=s+n;
		return b;
	}
}

function ShowWaitImage(oBtn,sAddTitle){
	var el=oBtn.nextSibling;
	if(el==null || el.id!='WAITIMG'){
		el=oBtn.document.createElement('SPAN');
		with(el){
			id="WAITIMG";
			title=oBtn.title+' ';
			if(sAddTitle) title+=sAddTitle;
			onselectstart=new Function('return false;');
			ondragstart=new Function('return false;');
			onmouseover=new Function('Top.status=this.title;');
			onmouseout=new Function('Top.status="";');
			style.display="none";
		}
		el.innerHTML='<IMG BORDER="0" SRC="../img/ico/sandglass_ani.gif">';
		oBtn.insertAdjacentElement('afterEnd',el);
	}
	oBtn.style.display='none';
	el.style.display='inline';
}
function HideWaitImage(oBtn){
	oBtn.style.display='inline';
	oBtn.nextSibling.style.display='none';
}

function CheckDATA(oBtn,ACT,FOR,sSRC,sADDPrm){
	HideToolBar(window);
	ShowWaitImage(oBtn,LRS3);

	var wdf=oBtn.document.parentWindow.df;
	var oSRC=wdf[sSRC];
	if(oSRC==null){
		alert('Can`t get element "'+sSRC+'"\nfunction CheckDATA.');
		return;
	}
	oSRC.disabled=true;

	var XMLHTTP=null;
	function onRSC(){
		if (XMLHTTP.readyState==4) {
			XMLHTTP.onreadystatechange=new Function("");
			if (oSRC==null) return;
			try{
				oSRC.disabled=false;
				oSRC.focus();
				fnResumeCheckDATA(XMLHTTP,wdf,oSRC,oBtn);
			}catch(e){}
		}
	}
	XMLHTTP=new ActiveXObject(XMLHTTP_ID);
	XMLHTTP.Open("POST",XMLScriptPath,false);
	XMLHTTP.onreadystatechange=onRSC;
	XMLHTTP.setRequestHeader("Rts-Request",'T=RT_2_CHECK.CheckDATA&SID='+Top.SID+'&ACT='+ACT+'&FOR='+FOR+'&D='+oSRC.value+((sADDPrm==null)?'':sADDPrm ));
	XMLHTTP.Send(GetSimpleXML_1251('X'));
	ShowToolBar(window);
}

function fnResumeCheckDATA(XMLHTTP,wdf,oSRC,oBtn){
	var oXML=XMLHTTP.responseXML;
	var ErrMsg=GetSTErrorFromXML(oXML,true);
	HideWaitImage(oBtn);

	if(ErrMsg != ''){alert(ErrMsg); return;}
	var oCD=oXML.selectSingleNode("//CD");
	if(oCD==null){alert(s1+LRS1); return;}

	var dfe=wdf.elements;
	var oCDA=oCD.attributes, oCNs=oCD.childNodes, oCN, NN,
	j=oCDA.length, oA, xS=oBtn.document.parentWindow.fData;

	function fnSetVal(NN,NV){
		try{dfe[NN].value=NV;}
		catch(e){
			var oE=xS.getElementsByTagName(NN)(0);
			if (oE != null) oE.text=NV;
			else alert(LRS24+'Not found form or XML element \''+ NN +'\').');
		}
	}

	for(var i=0; i < j; i++){
		oA=oCDA.item(i);
		fnSetVal(oA.nodeName,oA.nodeValue);
	}
	j=oCNs.length;
	for(i=0; i < j; i++){
		oCN=oCNs.item(i);
		NN=oCN.nodeName;
		if(NN != '#text') fnSetVal(NN,oCN.text);
	}
}	// fnResumeCheckDATA

// ***************************************************************************
// *************** Функции-обработчики маскированного ввода ******************
// ***************************************************************************
function attachHandlersToFields(oCont,w){
	if(!oCont) oCont = w.document;
	var bX = (oCont.parsed != null), oCol, iL, i,j;
	if(bX){
		oCol = oCont.selectNodes(".//*[nodeName() $ieq$ 'INPUT' or nodeName() $ieq$ 'TEXTAREA']");
		iL = oCol.length;
		for(j=0; j<iL; j++) AttachHandlers2Element(oCol.item(j),w,bX);
	}else{
		var aR = new Array('INPUT','TEXTAREA');
		if(oCont == null) oCont = w.document;
		for(i=0; i<2; i++){
			oCol = oCont.all.tags(aR[i]);
			iL = oCol.length;
			for(j=0; j<iL; j++) AttachHandlers2Element(oCol.item(j),w);
		}
	}
	setInputView(oCont,w,bX);
} //
function AttachHandlers2Element(el,w,bX){
	var sT = el.getAttribute("DTYPE");
	//sNh=el.getAttribute("NOHNDL");
	//if((sT == null) && sNh) return;
	if(sT == null) return;
	//if (sT == null){fAddHndlr(el,'ondrop,onpaste','event.returnValue=false;',bX); return;}
	fAddHndlr(el,'onfocus','Top.doFocus(this);',bX);
	fAddHndlr(el,'onblur','Top.doBlur(this);',bX);
	fAddHndlr(el,'onkeypress','Top.alfanumKeyActs(this);',bX);
	fAddHndlr(el,'onkeydown','Top.spKeyActs(this);',bX);
	fAddHndlr(el,'ondrop','Top.doIns(this);',bX);
	fAddHndlr(el,'onpaste','Top.doIns(this);',bX);
	fAddHndlr(el,'onchange','Top.doChange(this);',bX);
	if(el.getAttribute('CLF')!=null) fAddHndlr(el,'onchange','try{ChangeFields();}catch(e){};',bX);

	if (sT=="Account" || sT=="Date") fAddHndlr(el,'onkeyup','Top.doCheckAccount(this);',bX);
	if (sT.substr(0,3)!="Reg" || sT.substr(0,4)=="RegXMoney") {
		fAddHndlr(el,'ondragstart',"Top.doStartDrag(this);",bX);
	}
	else fAddHndlr(el,'onmousedown',"Top.verifyValue(this);Top.doFocus(this);",bX);

	fnAt(el,"MSGID","Msg");	fnAt(el,"SEPYEAR",20); fnAt(el,"NORM",0);
	fnAt(el,"SHOWKEYCODE",0); fnAt(el,"SHCH",0); fnAt(el,"ZEROISNULL",0);
	fnAt(el,"DAD",2);
	initMask(el,bX);
	OKPShowMess('',w);
}	//
function fnAt(el,sA,v){if (el.getAttribute(sA)==null) el.setAttribute(sA,v);}

function initMask(el,bXML){
	el.setAttribute('initVal', el.value);
	el.setAttribute('innerVal',"");
	el.setAttribute('isSpKey',false);
	el.setAttribute('errorCode',0);
	function SetA(defVal,shortPattern,longPattern){
		el.setAttribute('defVal',defVal);
		el.setAttribute('shortPattern',shortPattern);
		if(longPattern==null) el.setAttribute('longPattern','^'+shortPattern+'$');
		else el.setAttribute('longPattern',longPattern);
	} // SetA
	switch(el.getAttribute('DTYPE')){
case "Date": SetA("__.__.____","([0-9]{2}[.][0-9]{2}[.][0-9]{4})","^([0-9_]{2}[.][0-9_]{2}[.][0-9_]{4})$"); break;
case "Account": SetA("_____.___._.___________","([0-9]{5}[.][A-Z0-9]{1}[0-9]{2}[.][0-9]{1}[.][0-9]{11})","^([0-9_]{5}[.][A-Z0-9_]{1}[0-9_]{2}[.][0-9_]{1}[.][0-9_]{11})$"); break;
case "RegXMoney": SetA("","([0-9]{1,12}|[0-9]{1,12}[.][0-9]*)");
	if(el.getAttribute("MAXL")==null) el.setAttribute("MAXL",15);
	var tAlign=(el.getAttribute("RATE")==null)?"right":"left";// Разница между полями с курсами и суммой
	if (bXML) {el.setAttribute("style","text-align:"+tAlign);}// для формы
	else {el.style.textAlign=tAlign;}// для скроллера
	break;
case "RegXInt": SetA("","[-]?[0-9]{1,10}","^[-]?[0-9]{0,10}$"); break;
case "RegXFloat": SetA("","^[-]?([0-9]+|[0-9]+[.][0-9]+)$","^[-]?[0-9]*[.]?[0-9]*$"); break;
case "RegEmail": SetA("","^([0-9a-zA-Z]+[0-9a-zA-Z\\.\\_\\-]*[@]{1}[0-9a-zA-Z]{1}[0-9a-zA-Z\\.\\_\\-]*)$","^([0-9a-zA-Z]*[0-9a-zA-Z\\.\\_\\-]*[@]?[0-9a-zA-Z]?[0-9a-zA-Z\\.\\_\\-]*)$"); break;
case "RegNum": SetA("","([0-9]*)"); break;
case "RegNumF": SetA("","([0-9.]*)"); break;
case "RegX_PSN3": SetA("","[a-zA-Z0-9]{1,2}\\d{0,2}"); break; // для номеров ПС "00000000\.0000\.AA00\.0\.0"
case "RegLat": SetA("","([ a-zA-Z]*)"); break;
case "RegLatUpper": SetA("","([A-Z]*)"); break;
case "RegCurr": SetA("","([A-Z0-9]*)"); break;
case "RegSWIFTUpper": SetA("","([A-Z0-9/\\-\\?:\\(\\)\\.\\,'\\+\\{\\}\\ ]*)"); break;
case "RegSWIFT": SetA("","([a-zA-Z0-9/\\-\\?:\\(\\)\\.\\,'\\+\\ ]*)"); break;
case "RegSmbl": SetA("","([^\\r\\n]*)"); break;
case "RegFreeSmbl": SetA("",".*","^([^\\x01]*)$"); break;
case "RegFreeGRND": SetA("","([^\\]\\[&']*)"); break;
case "RegGrndDocN": SetA("","([0-9a-zA-Zа-яА-Я\\-\\.\\,\\/\\\\\|#\\ ]*)"); break;
case "RegPayRu": SetA("","([\\x20-\\x7EЂЃ‚ѓ„…†‡€‰Љ‹ЊЌЋЏђ‘’“”•–—™љ›њќћџ ЎўЈ¤Ґ¦§Ё©Є«¬­®Їабвгдежзийклмноп]*)"); break;
case "RegNoSmbl": SetA("","([0-9a-zA-Zа-яА-Я\\_\\-\\.\\,\\/\\ ]*)"); break;
case "RegNoXSS": SetA("","([^<#]*)"); break;
case "RegVisibleSmbl": SetA("","[^\\x00-\\x1F]"); break;
default : SetA("","(.)*");
	} // Switch
}

//

var iTimerID;

//common functions
function Zeros(i,n){
	i=""+i;
	while (i.length<n) i="0"+i;
	if (n==0) i='00';
	return i;
}

function getLastMonthDay(M,Y){
	M=(M+1)%12;
	var nowDate=new Date(Y,M-1,1);
	var comDate=new Date(0);
	var newDate=new Date(nowDate-comDate-1000*60*60*20);
	return newDate.getDate();
}

function fillFullYear(el,curVal){
	firstEnd=6;
	midLength=4;
	newVal=curVal.substr(firstEnd,midLength).replace(/_/ig,"");
//	fillStr="2001";
	var cd=new Date();
	fillStr=""+cd.getFullYear();
	if (parseInt(Zeros(newVal,1),10) >= el.SEPYEAR) fillStr="1900";
	newVal=fillStr.substr(0,fillStr.length-newVal.length)+newVal;
	newVal=curVal.substring(0,firstEnd)+newVal+curVal.substring(firstEnd+midLength,el.defVal.length);
	return newVal;
}

function strToDate(s){
if(s.length!=10) return null;
var d=s.split('.');
dt=new Date(d[2],d[1]-1,d[0]);
return dt;
}
//end common functions

//onFocus functions
function doFocus(obj){
	if(obj.readOnly){
		obj.blur();
		return;
	}
	var el=obj, s=el.value;
	if(obj.DTYPE=="Account" && s!='' && obj.defVal!=s) obj.value=s.replace(/(\D*)(\d{5})(\d{3})(\d{1})(\d{11})(\D*)/,"$2.$3.$4.$5");
	if(el.errorCode>0){doError(el); return;}
	var tr=el.createTextRange();
	if(el.value=="") tr.text=el.defVal;
	if(el.defVal.length!=0) {
		tr.move("character",-el.defVal.length);
		tr.select();
	}
	if(el.DTYPE=="Date" && el.value!=el.defVal){
		var sDt=fillFullYear(el,s);
		el.value=sDt;
	}
}
//end onFocus functions

function doIns(obj){
	var w=obj.document.parentWindow, MaxLng=parseInt(obj.getAttribute("MAXLENGTH"),10);
	try{if(isNaN(MaxLng)) MaxLng=parseInt(obj.attributes['maxLength'].value,10);}catch(e){}//ie10;CompatibleIE=5
	var e=w.event, sIns,cb;
	e.returnValue=false;

	if(e.type=='paste'){
		cb=w.clipboardData;
	}
	else if(e.type=='drop'){
		cb=e.dataTransfer;
	}
	sIns=cb.getData("Text");
	
	if(obj.DTYPE.toUpperCase().indexOf("UPPER")!=-1){
		sIns=sIns.toUpperCase();
		cb.setData("Text",sIns);
	}

	if (obj.tagName=="TEXTAREA" && sIns.length+obj.value.length > MaxLng) {
		 w.alert(top.LRSokp3+MaxLng+top.LRSokp4);
		 obj.value=obj.value+sIns.substr(0, MaxLng - obj.value.length);
		 return;
	}
//	if(w.inputErrorCode==0 || w.inputErrorCode==4) 
	testAndInsert(obj,sIns,e.type);
}

function doStartDrag(obj){
	var e=obj.document.parentWindow.event;
	e.dataTransfer.effectAllowed='copy';
	Top.verifyValue(obj);
}

function doChange(obj){
	if(obj.SHCH!=0 && obj.initVal!="") obj.runtimeStyle.color=(obj.initVal==obj.value)? "#000000": "#990000";
	try{if(obj.form.name=='FilterForm') Top.checkFilter(obj.document.parentWindow);
	}catch(e){}
}

function OKPShowMess(msg,w){
	if(typeof(w.document.all.PopupMessID)=='object') w.document.all.PopupMessID.innerText=msg;
	top.status=msg;
}

function showError(el,firstPos,selL,sMsg){
	var w=el.document.parentWindow;
	with(w){
		w.clearTimeout(w.iTimerID);
		Top.OKPShowMess(sMsg,w);
		w.iTimerID=w.setTimeout("Top.OKPShowMess('',window)",5000);
		var tr=el.createTextRange();
		tr.move("character",firstPos);
		tr.moveEnd("character",selL);
		try{tr.select();}catch(e){}
	}
}

function doError(el){
	var L=el.value.length;
	switch (el.errorCode){
		case 0: break;
		case 1: showError(el,0,L,Top.LRSCheX1); break;
		case 2: showError(el,L,L,Top.LRSCheX2); break;
		case 3: showError(el,L,L,Top.LRSCheX3); break;
		case 4: showError(el,L,L,Top.LRSCheX4); break;
		case 5: showError(el,L,L,Top.LRSCheX5); break;
		case 11: showError(el,0,L,Top.LRSCheX11.replace('%s',el.MINVAL)); break;
		case 12: showError(el,0,L,Top.LRSCheX12.replace('%s',el.MAXVAL)); break;
		case 101: showError(el,0,2,Top.LRSCheX101); break;
		case 102: showError(el,3,2,Top.LRSCheX102); break;
		case 103: showError(el,6,4,Top.LRSCheX103); break;
	}
}

function changeValuePart(el,newVal,firstPos,selL){
	curVal=el.value;
	el.value=curVal.substring(0,firstPos)+newVal+curVal.substring(firstPos+selL,el.defVal.length);
}

function verifyValue(obj){
	if(obj.readOnly) return;
	var el=obj, sw;
	el.errorCode=0;
	el.document.parentWindow.inputErrorCode=el.errorCode;
	var s=el.value;
	if (s==el.defVal){
		el.value="";
		s="";
		el.innerVal="";
		return;
	}
	if (s=="") return;

	if (el.DTYPE=="Date"){
		s=fillFullYear(el,s);
		el.value=s;
	}

	sw="g";
	var re=new RegExp(el.shortPattern,sw);
	if (re.test(s)){
		if (el.DTYPE=="Date"){
			var D=parseInt(s.substr(0,2),10);
			var M=parseInt(s.substr(3,2),10);
			var Y=parseInt(s.substr(6),10);
			defD=31;
			defM=12;
			defY=2001;

			if ((Y<1800) || (Y>9999)){
				if (el.NORM!=0){
					changeValuePart(el,defY,6,4);
					Y=defY;
				}
				else{
					try {el.errorCode=103; el.focus();} catch(e){showError(el,6,4,'');}
					el.document.parentWindow.inputErrorCode=el.errorCode;
					return;
				}
			}
			if ((M<1) || (M>12)){
				if (el.NORM!=0){
					changeValuePart(el,defM,3,2);
					M=defM;
				}
				else{
					try {el.errorCode=102; el.focus();} catch(e){showError(el,3,2,'');}
					el.document.parentWindow.inputErrorCode=el.errorCode;

					return;
				}
			}
			var LD=getLastMonthDay(M,Y);
			defD=LD;
			if((D<1) || (D>LD)){
				if(el.NORM!=0) changeValuePart(el,defD,0,2);
				else{
					try {el.errorCode=101; el.focus();} catch(e){showError(el,0,2,'');}
					el.document.parentWindow.inputErrorCode=el.errorCode;
					return;
				}
			}
		}
		else if (el.DTYPE=="Account"){
			el.innerVal=s;
//			el.value=s.replace(/[.]/ig,"");
		}
		else if (el.DTYPE=="RegXMoney"){
			el.value=NormalizeMoney(el.value,el.ZEROISNULL,el.DAD,el.NOENDZEROS=='1');
		}
		else if(el.DTYPE=="RegXInt"){
			if(parseInt(el.value,10)>2147483647 || parseInt(el.value,10) < -2147483648){
				try{el.errorCode=4; el.focus();} catch(e){showError(el,el.value.length,el.value.length,'');}
				el.document.parentWindow.inputErrorCode=el.errorCode;
				return;
			}
		}
		else if(el.DTYPE=="RegXFloat"){
			if(parseFloat(el.value,10)>100000000000000 || parseFloat(el.value,10) < -100000000000000){
				try{el.errorCode=5; el.focus();} catch(e){showError(el,el.value.length,el.value.length,'');}
				el.document.parentWindow.inputErrorCode=el.errorCode;
				return;
			}
			el.value=parseFloat(el.value,10);
		}
		if(el.DTYPE=="RegXMoney" || el.DTYPE=="RegXInt" || el.DTYPE=="RegXFloat"){
			if(el.MINVAL!="" && parseFloat(el.value)<parseFloat(el.MINVAL)){
				try {el.errorCode=11; el.focus();} catch(e){showError(el,0,0,'');}
				el.document.parentWindow.inputErrorCode=el.errorCode;
				return;
			}
			if(el.MAXVAL!="" && parseFloat(el.value)>parseFloat(el.MAXVAL)){
				try {el.errorCode=12; el.focus();} catch(e){showError(el,0,0,'');}
				el.document.parentWindow.inputErrorCode=el.errorCode;
				return;
			}
		}
	}
	else{
		try {el.errorCode=1; el.focus();} catch(e){showError(el,0,0,'');}
		el.document.parentWindow.inputErrorCode=el.errorCode;
		return;
	}
	OKPShowMess("",el.document.parentWindow);
	el.document.parentWindow.inputErrorCode=el.errorCode;

	if (el.DTYPE=="Account"){
		try {
		var sTname=el.name.slice(0,-1);
		df.elements[sTname].value=el.value.replace(/[_.]/ig,"");
		}catch(e){}
	}
}

function doBlur(obj){
	Top.verifyValue(obj);
	try{if(obj.form.name=='FilterForm') Top.checkFilter(obj.document.parentWindow);
	}catch(e){}
}
//end onBlur functions

//onKeyX functions
function patternInput(el){
	var curVal=el.value, isBackspace=isDel=isSeparator=false, sw;
	var kc=el.document.parentWindow.event.keyCode;
	//determine and replace a pressing key
	if (el.isSpKey){
		if ((kc!=8)&&(kc!=46)) return;
		else if (kc==8) isBackspace=true;
		else if (kc==46) isDel=true;
	}
	else{
		if (el.DTYPE!="Account" && (kc<44 || kc>57)) {el.errorCode=2; doError(el); return;}
		else if (kc>=44&&kc<=47) isSeparator=true;
		if (isSeparator) kc=46;
	}

	//create new value
	var newVal="", insertStr="";
	var tr=el.document.selection.createRange();
	var trPrimSelL=tr.text.length;
	var curPos=-(tr.moveStart("character",-el.defVal.length));
	if (isBackspace || isDel){ //delete data
		if(trPrimSelL==el.value.length)
			newVal=el.defVal;
		else if(trPrimSelL==0){
			shift=0;
			if (isBackspace){
				shift=-1;
				if (el.DTYPE=="Date"){
					if (curPos==3 || curPos==6) curPos--;
				}
				else if (el.DTYPE=="Account"){
					if (curPos==6 || curPos==10 || curPos==12) curPos--;
				}
			}
			newVal=curVal.substring(0,curPos+shift);
			newVal=newVal+el.defVal.substring(curPos+shift,curPos+shift+1);
			newVal=newVal+curVal.substring(curPos+shift+1,el.defVal.length);
		}
		else{
			newVal=curVal.substring(0,curPos);
			newVal=newVal+el.defVal.substr(curPos,trPrimSelL);
			newVal=newVal+curVal.substring(curPos+trPrimSelL,el.defVal.length);
		}
	}
	else if (isSeparator){ //fill in part of date if separator has pressed
		if(el.DTYPE=="Date"){
			var cd=new Date();
			if(curPos<=5){
				midLength=2;
				if(curPos<=2) firstEnd=0;
				else if(curPos<=5) firstEnd=3;
				newVal=curVal.substr(firstEnd,midLength).replace(/_/ig,"");
				if (parseInt(Zeros(newVal,1),10)==0) newVal="";
				if(newVal==""){
					if(curPos<=2) fillStr=""+cd.getDate();
					else fillStr=""+(cd.getMonth()+1);
				}
				else fillStr="01";
				newVal=fillStr.substr(0,fillStr.length-newVal.length)+newVal;
				newVal=curVal.substring(0,firstEnd)+newVal+curVal.substring(firstEnd+midLength,el.defVal.length);
			}
			else if (curPos<=10) newVal=fillFullYear(el,curVal);
			curPos=firstEnd+midLength;
		}
	}
	else{ //insert keyCode of pressed button
		newVal=curVal.substring(0,curPos);
		newVal=newVal+String.fromCharCode(kc);
		if (trPrimSelL==0) newVal=newVal+curVal.substring(curPos+1,el.defVal.length);
		else{
			newVal=newVal+el.defVal.substr(curPos+1,trPrimSelL-1);
			newVal=newVal+curVal.substring(curPos+trPrimSelL,el.defVal.length);
		}
		if(el.DTYPE=="Date"||el.DTYPE=="Account"){
			if(newVal.length==1)newVal=newVal+el.defVal.substring(1,el.defVal.length);
		}
	}

	//compare new value as per pattern
	sw="g";
	var re=new RegExp(el.longPattern,sw);
	if (!re.test(newVal)) {
		el.errorCode=2; doError(el); return;
	}

	//replace value by new
	tr.move("character",-el.defVal.length);
	tr.moveEnd("character",el.defVal.length);
	tr.text=newVal;

	//move cursor to the next position
	tr.move("character",-el.defVal.length);
	if (isBackspace){
		if (trPrimSelL==0) curPos--;
	}
	else if (!isDel) curPos++;
	if (el.DTYPE=="Date"){
		if (curPos==2 || curPos==5) curPos++;
	}
	else if (el.DTYPE=="Account"){
		if (curPos==5 || curPos==9 || curPos==11) curPos++;
	}
	tr.move("character",curPos);
	tr.select();
}

function testAndInsert(el,insertStr,copytype){
	var	rt=true, sw, re;
	if ((el.DTYPE.substr(0,3) != "Reg") || (el.DTYPE.substr(0,4)=="RegX")){
		//create new value
		var curVal=el.value, newVal="", tr;
		if (el.document.parentWindow.event.type=="drop") tr=el.createTextRange();
		else{
			var tr2=el.document.selection.createRange();
			var trPrimSelL=tr2.text.length;
			//move out from selection to current element
			bm=tr2.getBookmark();
			tr=el.createTextRange();
			tr.moveToBookmark(bm);
		}
		tr.moveEnd("character",curVal.length);
		var curPos=curVal.length-tr.text.length;
		//var curPos=-(tr.moveStart("character",-curVal.length));//not work with TEXTAREA
		if ((el.DTYPE=="Account" || el.DTYPE=="Date")&&insertStr != '') {
			sw="g";
			re=new RegExp(el.longPattern,sw);
			var reg=new RegExp("[.]","ig");
			if (el.DTYPE=="Account") newVal=insertStr.replace(/(\d{5})(\d{3})(\d{1})(\d{11})/,"$1.$2.$3.$4");
			if (el.DTYPE=="Date") newVal=insertStr.replace(/(\d{2})(\d{2})(\d{4})/,"$1.$2.$3");
			if (!re.test(newVal)) el.value=curVal;
			else el.value='';
			if(copytype=='paste' || copytype=='drop'){
				if(!reg.test(insertStr)){
					if (!re.test(newVal)) {el.errorCode=1; if(copytype=='paste') el.blur(); doError(el); return;}
					if (copytype=='paste' || (copytype=='drop' && el.DTYPE=="Date")){
						rt=false;
						el.value=newVal;
					}
				}
				else if(re.test(insertStr)) newVal=insertStr;
				else {el.errorCode=1; if(copytype=='paste') el.blur(); doError(el); return;}
			}
		}
		else newVal=curVal.substring(0,curPos)+insertStr+curVal.substring(curPos+trPrimSelL,curVal.length);

		//compare new value as per pattern
		sw="g";
		re=new RegExp(el.longPattern,sw);
		if (!re.test(newVal)) {el.errorCode=2; doError(el); return;}
		if (el.getAttribute("MAXL") != null){
			if (el.DTYPE=="RegXMoney"){
				if (parseInt(newVal,10).toString().length+parseInt(el.DAD,10)+1 > el.MAXL) return;
			}
			else if (newVal.length > el.MAXL) return;
		}
	}
	else{
		//compare insert value as per pattern
		re= new RegExp(el.longPattern,"g");
		if (!re.test(insertStr)) {el.errorCode=2; doError(el); return;}
	}
	if (el.DTYPE=="Account"){
		try {
			var sTname=el.name.slice(0,-1);
			df.elements[sTname].value=newVal.replace(/[_.]/ig,"");
		}catch(e){}
		if (el.getAttribute("CHECK") != null) {
			 var sAtrText=el.getAttribute("CHECK");
			 el.value=df.elements[sTname].value;
			 eval('Top.CheckDATA('+sAtrText+');');
		}
	}
	el.document.parentWindow.event.returnValue=rt;
}

function maskInput(el){
	//determine and replace a pressing key
	var kc=el.document.parentWindow.event.keyCode;
	if(el.DTYPE=="RegXMoney"){
		if(!el.isSpKey){
			if (kc < 44 || kc > 57 || kc==45 || kc==47) {el.errorCode=2; doError(el); return;}
			else if (kc==44 || kc==46) {kc=46; el.document.parentWindow.event.keyCode=46;}
		}
	}
	var Lng=el.value.length, MaxLng=parseInt(el.MAXLENGTH,10);
	try{if(isNaN(MaxLng)) MaxLng=parseInt(el.attributes['maxLength'].value,10);}catch(e){}//ie10;CompatibleIE=5
	if((el.DTYPE=="RegSmbl" || el.DTYPE=="RegFreeSmbl" || el.DTYPE=='RegSWIFTUpper') && !isNaN(MaxLng) && MaxLng>0){
		if((Lng+1)>MaxLng){
			//alert(top.LRSokp3+MaxLng+top.LRSokp4);
			return;
		}
	}
	testAndInsert(el,String.fromCharCode(kc),'');
}

function scrollInt(el,i){
	var curVal=el.value;
	var tr=el.document.selection.createRange();
	var valL=el.value.length;
	var curPos=-(tr.moveStart("character",-valL));
	if (curPos<=2){
		firstEnd=startVal=0;
		midLength=2;
		maxVal=31;
	}
	else if (curPos<=5){
		firstEnd=3;
		midLength=2;
		maxVal=12;
		startVal=0;
	}
	else{
		firstEnd=6;
		midLength=4;
		maxVal=3000;
		startVal=2000;
	}
	var newVal=curVal.substr(firstEnd,midLength).replace(/_/ig,"");
	if (i<=0) startVal++;
	newVal=((newVal.length==0) ? startVal : parseInt(newVal,10));
	newVal=(newVal+maxVal-1+i) % maxVal+1;
	newVal=Zeros(newVal,midLength);
	newVal=curVal.substring(0,firstEnd)+newVal+curVal.substring(firstEnd+midLength,el.defVal.length);

	tr.move("character",-valL);
	tr.moveEnd("character",valL);
	tr.text=newVal;
	tr.move("character",-valL);
	tr.move("character",curPos);
	tr.select();
}
//end onKeyX functions

//onKeyPress functions
function alfanumKeyActs(obj){
	var el=obj;
	var w=el.document.parentWindow, e=w.event;
	Top.OKPShowMess('',w);
	if (el.SHOWKEYCODE!=0) w.Top.status=w.Top.status+" KP="+e.keyCode;
	e.returnValue=false;
	el.isSpKey=false;
	if (el.DTYPE=="RegSWIFTUpper") e.keyCode=String.fromCharCode(e.keyCode).toUpperCase().charCodeAt(0);
	if (el.DTYPE.substr(0,3)=="Reg") maskInput(el);
	else patternInput(el);
}
//end onKeyPress functions

//onKeyDown functions
function spKeyActs(obj){
	var el=obj;
	var w=el.document.parentWindow, e=w.event;
	if (el.SHOWKEYCODE!=0) w.Top.status=w.Top.status+" KD="+e.keyCode;
	el.isSpKey=true;
	if (el.DTYPE.substr(0,3) != "Reg"){
		switch (e.keyCode){
			case 46://Del
				e.returnValue=false;
				patternInput(el);
				break;
			case 8://Backspace
				e.returnValue=false;
				patternInput(el);
				break;
			case 38://up arrow
				e.returnValue=false;
				if (el.DTYPE != "Account") scrollInt(el,1);
				break;
			case 40://down arrow
				e.returnValue=false;
				if (el.DTYPE != "Account") scrollInt(el,-1);
				break;
			case 33://PageUp
				e.returnValue=false;
				if (el.DTYPE != "Account") scrollInt(el,5);
				break;
			case 34://PageDown
				e.returnValue=false;
				if (el.DTYPE != "Account") scrollInt(el,-5);
				break;
			case 88://ctrl+X
				if (e.ctrlKey){
					e.returnValue=false;
					el.value=el.defVal;
				}
				break;
			case 78://ctrl+N
				if (e.ctrlKey)
					if (el.DTYPE=="Date"){
						e.returnValue=false;
						d=new Date();
						el.value=""+Zeros(d.getDate(),2)+"."+Zeros(d.getMonth()+1,2)+"."+Zeros(d.getFullYear(),4);
					}
				break;
		}
	}
	if (el.DTYPE=="Account"){
		try {
			var sTname=el.name.slice(0,-1);
			df.elements[sTname].value=el.value.replace(/[_.]/ig,"");
		}catch(e){}
	}
}
//end onKeyDown functions

function doCheckAccount(obj){
	var el=obj;
	var w=el.document.parentWindow, e=w.event;
	if(el.DTYPE=="Account"){
		var sTname=el.name.slice(0,-1),sTnameNew;
		if(w.IsScroller) sTnameNew=w.document.forms('FilterForm').elements[sTname];
		else sTnameNew=w.df.elements[sTname];
		sTnameNew.value=el.value.replace(/[_.]/ig,"");
//		if (sTnameNew.value.length==20) el.blur();
		if(el.getAttribute("CHECK") != null){
			var sAtrText=el.getAttribute("CHECK"), nKey=e.keyCode;
			if(sTnameNew.value.length==20 && nKey!=33 && nKey!=34 && nKey!=35 && nKey!=36 && nKey!=38 && nKey!=40 && nKey!=37 && nKey!=39) {Top.verifyValue(el); eval('Top.CheckDATA('+sAtrText+');');}
		}
	}
	if(el.DTYPE=="Date" || el.DTYPE=="Account"){
		var re=new RegExp(el.shortPattern,"g");
		if(!re.test(el.value)&&el.getAttribute("CHECK")==null) el.document.parentWindow.inputErrorCode=105;
		else el.document.parentWindow.inputErrorCode=0;
	}
} //end onKeyUp functions
// ***************************************************************************

function cancelEsc(w) {	// Функция отрубает второе нажати клавиши ESCape (Межевой)
	if (keyEsc==27&&w.event.keyCode==27) {
		w.event.returnValue=false;
		w.event.cancelBubble=true;
	}
	else keyEsc=w.event.keyCode;
}

add_M('c_checks');

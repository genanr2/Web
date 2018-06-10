// MISC
function FOO(){}
function Paste(obj){
  obj.createTextRange().execCommand("Paste");
  obj.focus();
}
function Copy(obj){
  obj.createTextRange().execCommand("Copy");
  obj.focus();
}
function Clear(obj){
  obj.createTextRange().execCommand("Delete");
  obj.focus();
}
function getCaller(fn){
 if(fn==null)return '';
 var rg=/function (\w+)/;
 rg.exec(fn.toString());
 return (' <- ' + RegExp.$1 + getCaller(fn.caller));
}
function fnRnd(){var now=new Date(); return 'B'+(Date.parse(now.toGMTString())+now.getMilliseconds()).toString(32);}
function Trim(STR){return STR.replace(/(^\s*)|(\s*$)/g, "");}
function TrimRight(STR){return STR.replace(/(\s*$)/g, "");}
function TrimLeft(STR){return STR.replace(/(^\s*)/g, "");}
function XMLToStr(s){return s.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,"\"").replace(/&apos;/g,"'");}

function toMoney(STR){return(Math.round(parseFloat(STR)*100)/100);}

function GetDate(D){return (D.getYear()+'.'+D.getMonth()+'.'+D.getDate());}
function GetTime(D){return (D.getHours()+':'+D.getMinutes()+':'+D.getSeconds());}
function Code16(s){
 s=s.replace(/%/g,"%25").replace(/ /g,"%20").replace(/!/g,"%21").replace(/"/g,"%22").replace(/#/g,"%23").replace(/\$/g,"%24");
 s=s.replace(/&/g,"%26").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/,/g,"%2C").replace(/\//g,"%2F");
 s=s.replace(/:/g,"%3A").replace(/;/g,"%3B").replace(/</g,"%3C").replace(/=/g,"%3D").replace(/>/g,"%3E").replace(/\?/g,"%3F");
 s=s.replace(/\[/g,"%5B").replace(/\\/g,"%5C").replace(/\]/g,"%5D").replace(/\^/g,"%5E").replace(/`/g,"%60");
 return s;
}



function fnUnselectNode(){if(nv!=null && typeof(nv.clearSelection)=="function")nv.clearSelection()}

// Functions for run time monitoring
var bShowTime=false;
function ClearTimeStamp(){
  // Reset Time monitoring variables
  var sd=new Date();
  SSTimer=Date.parse(sd) + sd.getMilliseconds();
  TimeStamps=(bShowTime?'time\t':'') + 'dur. ms\tLable\n____________________\n';
  SSTimerMs=0;
}
function SetTimeStamp(msg){
  // Set time stamp with milliseconds passed between this and previouse timestamp
  var sd=new Date();
  var sx=Date.parse(sd) + sd.getMilliseconds();
  var sms=sx - SSTimer;
  TimeStamps += (bShowTime? (GetTime(sd) + '   ' + sd.getMilliseconds() + '\t'):'') + sms + '\t' + msg + '\n';
  SSTimer=sx;
  SSTimerMs += sms;
}
function STS(){
  // Display time stamps result
  alert('Total: ' +SSTimerMs+' ms\n'+TimeStamps);
}

function WrapQuot(s){ // name=val -> mane="val"
  var reg=/( \w+=)([^ >'"]+)([ |>])/g;
  return s.replace(reg,'$1"$2"$3').replace(reg,'$1"$2"$3');
}

//DE_BUG FUNCTION
function alertToken(wToken,RToken){alert('Tokens are not equal:\nw.token: \t\t"' + wToken + '"\n HTTP Token: \t"'+ RToken+'"')}

function URLDebugInfo(URL,w,Target){
 if(!Top.bShowReqInfo){return false;}
 if(Target==null)Target='_self';
 // Если Target != null но и не true - ссылка Continue - отсутствует
 with(w){
  var id="URLDebug", wd=w.document, oDS=wd.all[id];
  if(oDS==null){
    oDS=wd.body.insertAdjacentElement("AfterBegin",wd.createElement("DIV"));
    oDS.id=id;
    if(Target)oDS.onclick=new Function('window.Top.open(this.URL,"'+Target+'","")');
    with(oDS.style){
      backgroundColor ='#FFFFFF';
      cursor=Target?'hand':'default';
      color='gray';
      border='1px solid silver';
      padding='3 3 3 3 px';
    }
  }
  oDS.title='Length='+ URL.length;
  oDS.setAttribute('URL',URL);
  oDS.innerHTML=URL.replace(/(\?|\&)(\w+)=([^\&$]+)/g,'$1<span style="color:black; font-weight: bold;">$2</span>=<span style="color:blue">$3</span>') + (Target?('<BR><B>Target="'+Target+'" <SPAN STYLE="COLOR: blue;">Click to continue...</SPAN></B>'):'');
 }
 return true;
}  // URLDebugInfo


function Drow_sHTML(w,sHTML){
  var wd=w.document, wda=wd.all;
  var ReqinfoDIV=wda.REQINFO;
  if(ReqinfoDIV==null){
    var ReperEl=wda.WaitMes, sWhere2='afterEnd';
    if(ReperEl==null){
      ReperEl=wd.body;
      sWhere2='afterBegin';
    }
    ReqinfoDIV=ReperEl.insertAdjacentElement(sWhere2,wd.createElement('DIV'));
    ReqinfoDIV.id="REQINFO";
  }
  ReqinfoDIV.insertAdjacentHTML('afterBegin',sHTML);
}

function Drow_XRequest(w,XMLHTTP,oXML,ACTID){
  var sHTML='<DIV><BUTTON onclick="this.parentElement.removeNode(true);" title="Clear this info-block">X</BUTTON>&nbsp;&nbsp;<BUTTON onclick="window.XMLHTTP.Send(window.oXML); this.disabled=true;">Continue...</BUTTON>' +
  '&nbsp;&nbsp;Request&nbsp;&nbsp;<B>' + ACTID + '</B>:<BR><TEXTAREA WRAP=Off COLS=50 ROWS=8 Style="width: 100%;">' +
  ((w.SendXMLSwitch=='ForceSave')?('Force-Save : 1\nToken-D : ' + w.TokenD + '\n'):'') +
  'Rts-Request : ' + w.RtsRequest + '\nToken : ' + w.token + '\n\n' +
  (oXML.xml).replace(/></g,">\n<").replace(/</g,"&lt;").replace(/>/g,"&gt;") +
  '</TEXTAREA></DIV>';
  Drow_sHTML(w,sHTML)
  w.XMLHTTP=XMLHTTP;
  w.oXML=oXML;
}

function Drow_XResponse(w,XMLHTTP,ACTID){
  var sHTML='<DIV><BUTTON onclick="this.parentElement.removeNode(true);" title="Clear this info-block">X</BUTTON>' +
  '&nbsp;&nbsp;Response Text on "<B>' + ACTID + '</B>":<BR><TEXTAREA WRAP=Off COLS=50 ROWS=8 Style="width: 100%; background-color: #EEEEEE;">' +
  XMLHTTP.getAllResponseHeaders() + '' +
  (XMLHTTP.responseText).replace(/</g,"&lt;").replace(/>/g,"&gt;") +
  '</TEXTAREA></DIV>';
  Drow_sHTML(w,sHTML)
}

// ERROR ALERT FUNCTIONS
// MLWIN aliases
function placeMsg(StringToPlace,ownerWindow,MsgWinIdent){
  if(ownerWindow.self != ownerWindow){alert(LRS16); return;}
  MLWIN('PLACEHTML',ownerWindow,StringToPlace,null,MsgWinIdent);
}
function addMsg(StringToAdd,ownerWindow){
  if(ownerWindow.self != ownerWindow){alert(LRS16); return;}
  MLWIN('ADDHTML',ownerWindow,StringToAdd)
}
function clearMsg(ownerWindow){
  if(ownerWindow.self != ownerWindow){alert(LRS16); return;}
  MLWIN('CLEAR',ownerWindow)
}

function addlog(Msg){
  var ForAppending=8, bCreate=true, TristateUseDefault=-2;
  var fso=new ActiveXObject("Scripting.FileSystemObject");
  var D=new Date(), DT=GetDate(D);
  var f=fso.OpenTextFile("C:\\JScript_"+DT+".log",ForAppending,bCreate,TristateUseDefault);
  f.WriteLine('['+GetTime(D)+'] '+Msg);
  f.Close();
  fso=null;
}

function isAlertNoAX(Msg){
	if(!Top.bAX){
		alert(Top.LRnoAX10+Msg);
		return true;
	}
	else if(!Top.bPKI){
		alert(Top.LRnoAX9+Msg);
		return true;
	}
	return false;
}

function MLWIN(ACTID,w,Msg,bBTNState,MsgWinIdent){
	try{
		//addlog('\r\n\r\n----------------------------------------------------\r\nw.WID: ' + w.WID + ' ACTID: ' + ACTID + ' Msg: ' + Msg + ' bState: ' + bBTNState);
		// w - всегда ссылка на окно _MAINW
		if(null==w) return;
		var mwd=w.document; if(null==mwd) return;
		if(MsgWinIdent==null) MsgWinIdent="MESSAGELOG";
		var ML=mwd.all.item(MsgWinIdent), bJastCreated=bIC=false;

		if(w.top.tb!=null){
			var IC=w.top.tb.document.all.item(MsgWinIdent), bIC=true;
		}

		if(null==ML){
			//addlog('ML==null');
			// Создать на странице новый элемент, если нужно.
			var ML_HTMLTOSHOW='', ML_HIDDEN=false;
			switch(ACTID){
				case "CLEAR":return;
				case "ADDHTML":
				case "PLACEHTML":
					if(''==Trim(Msg)) return;
					ML_HTMLTOSHOW=Msg;
					if(bIC) IC.changeState(true,true);
					break;
				case "DISPLAY":
					ML_HIDDEN=!bBTNState;
					break;
			}
			ML=mwd.body.appendChild(mwd.createElement("DIV"));
			ML.id=MsgWinIdent;
			if(MsgWinIdent!='' && MsgWinIdent!='MESSAGELOG') ML.UID=MsgWinIdent;
			ML.HTMLTOSHOW=ML_HTMLTOSHOW; ML.HIDDEN=ML_HIDDEN;

			ML.WIDTH=450;
			ML.HEIGHT=200;
			ML.CLOSEWIDTH=175;

			ML.LIGHT=0; ML.PRE=0;
			ML.ICON=0; ML.ICONMASK='000'; ML.RESIZE=0;
			ML.DRAG=0; ML.HIDEONCLICK=0; ML.HIDEWHILEDRAG=0;
			ML.SCROLLEDINTOVIEW=1; ML.PLACEDINTOVIEW=1; ML.STICKMAXIMIZED=true; ML.STICKMINIMIZED=true;
			ML.BGCOLOR="inherit";
			ML.CAPTION=LRSMLCaption;
			ML.BTNCAP=LRSMLBtnCap;
			if(bIC){ML.onDisplayChange="var IC=top.tb."+MsgWinIdent+"; IC.changeState(!event.HIDDEN,true); IC.runtimeStyle.visibility='visible';";}
			bJastCreated=true;
		}
		if(null==ML){
			//addlog('ML==null | return');
			return;
		}
		// на данный момент элемент MESSAGELOG должен присутствовать в Объектной модели страницы
		//addlog('ML not null');

		if('complete' != ML.readyState || !ML.READY){
			// если эл. MESSAGELOG еще не готов, зададим ему className, если нужно
			//addlog('!ML.READY');
			switch(ACTID){
				case "CLEAR":
					ML.HTMLTOSHOW='';
					ML.HIDDEN=1;
					return;
				case "ADDHTML":
					if(bJastCreated) break;
					if(null==ML.HTMLTOSHOW) ML.HTMLTOSHOW=Msg;
					else ML.HTMLTOSHOW += Msg;
					ML.HIDDEN=0;
					break;
				case "PLACEHTML":
					if(bJastCreated) break;
					ML.HTMLTOSHOW=Msg;
					ML.HIDDEN=0;
					break;
				case "DISPLAY":
					if(bJastCreated) break;
					ML.HIDDEN=!bBTNState;
					break;
			}
			ML.addBehavior(VerPath + 'htc/win.htc');
			if(bIC) IC.runtimeStyle.visibility='visible';
			//addlog('ML.addBehavior');
		}

		if('complete' != ML.readyState || !ML.READY){
			//addlog('ML !READY | return');
			return;
		}
		//addlog('ML.READY : ' + ML.READY + '  ML.readyState : ' +ML.readyState);

		//addlog('IC.runtimeStyle.visibility=visible');
		if(bIC) IC.runtimeStyle.visibility='visible';

		//addlog('MAIN Switch');
		switch(ACTID){
			case "CLEAR":
				ML.placeHTML('');
				ML.changeState(0);
				if (!ML.HIDDEN) ML.changeDisplay(false,null);
				if(bIC) IC.runtimeStyle.visibility='hidden';
				return;
			case "ADDHTML":
				ML.addHTML(Msg);
				if (ML.STATE==0) ML.changeState(1);
				if (ML.HIDDEN) ML.changeDisplay(true,null);
				return;
			case "PLACEHTML":
				if(ML.STATE==0) ML.changeState(1);
				if(ML.HIDDEN) ML.changeDisplay(true,null);
				ML.placeHTML(Msg);
				return;
			case "DISPLAY":
				ML.changeDisplay(bBTNState,true);
				return;
			default : alert('Unknown parametr ACTID in function MLWIN');
		}
	}
	catch(e){}
}

function HIDE_MLWIN_and_IC(w){
	if(null==w) return;
	var mwd=w.document;
	if(null!=mwd){
		var ML=mwd.all["MESSAGELOG"];
		if(null!=ML) ML.changeDisplay(false,null);
		ML=mwd.all["NOTIFIER"];
		if(null!=ML) ML.changeDisplay(false,null);
	}
	var wtb=w.top.tb;
	if(null==wtb) return;
	if(null!=wtb.document.all.item('MESSAGELOG')) wtb.document.all.item('MESSAGELOG').runtimeStyle.visibility='hidden';
	if(wtb.document.all.item('NOTIFIER').runtimeStyle.visibility=='visible') wtb.document.all('NOTIFIER').changeState(false);
}

function emptyWin(w){w.location.replace("../scheme/null1.htm");}

// Функции обработки сообщений об ошибках
//











// ==================== MISC PRINT Functions

function accountToDIV(oTrgt,sAcc){
  sAcc=((sAcc + '                    ').substr(0,20)).replace(/ /g,'\u00A0');
  var s='<TABLE cellpadding="0" cellspacing="0" border="0" BORDERCOLOR="black"><TR ID="r01">';
  function puter(i,j,bNoSpace){
    for(var a=i; a <= j; a++) s += '<TD class="ITCB">' + sAcc.charAt(a) + '</TD>';
    if(bNoSpace) return;
    s += '<TD class="ITC">&#160;</TD>';
	}
  puter(0,4); puter(5,7); puter(8,8); puter(9,12); puter(13,19,true);
  oTrgt.innerHTML=s + '</TR></TABLE>';
}

function insToBox(dai,iInd,tName1,tName2,Str,j){
  var oIt;
  for (var i=0; i < iInd; i++){
    oIt=dai(tName1+(i+tName2).toString());
    if(j != null) oIt=oIt(j);
    Str += ' ';
    oIt.innerText=Str.charAt(i);
  }
}

function replaceSep(oSrc, a1, sSep){
	oSrc.innerText=a1.replace(/\./,sSep);
}

function getEM(oXML,tagN,index){
  return oXML.getElementsByTagName(tagN)(index).text
}

function wordInTo(oTrgt,oSrc,a1,sCC,sSep,DAD){
	var a2=a1.replace(/\xA0/g,' '),s='', sChar='';
	var dAmount=0, dAmount1=0, dAmount2=0, dTmpAmt=0;
	var sAmount1='', sAmount2='', sTrillion='триллион';
	if (''==sCC || isNaN(parseFloat(a2))) return;
	if (DAD=='0') {b=false} else b=true;
	a2=NormalizeMoney(a2,true,DAD);
	oSrc.innerText=a1.replace(/\./,sSep);
	if(!bAX)return;
	
	dAmount = parseFloat(a2);
	dTmpAmt = parseFloat('1000000000000.00');
	if(dAmount < dTmpAmt){
		s=nv.MyTools.SumToText(dAmount,'RUSSIAN',parseInt(sCC^'000',10),2,true);
	}
	else{
		dAmount1 = parseInt(dAmount/dTmpAmt,10);
		dAmount2 = dAmount1 * dTmpAmt;
		dAmount2 = dAmount - dAmount2;
		
		sAmount1 = dAmount1.toString();
		sAmount2 = dAmount2.toString();
		sChar = sAmount1.charAt(sAmount1.length-1);
		if(('056789'.indexOf(sChar)+1)!=0) sTrillion = sTrillion+'ов';
		else if (('234'.indexOf(sChar)+1)!=0) sTrillion = sTrillion+'а';
		
		s = nv.MyTools.SumToText(dAmount1,'RUSSIAN',parseInt(-1,10),0,true) + sTrillion + ' ';
		if(dAmount2 > 0) s = s + nv.MyTools.SumToText2(dAmount2,parseInt(sCC^'000',10),0,true,true,false,'#S #V').toLowerCase();
		else s = s + nv.MyTools.SumToText2(dAmount2,parseInt(sCC^'000',10),0,true,true,false,'#V').toLowerCase();
	}
	oTrgt.innerText=s.charAt(0).toUpperCase()+s.slice(1,s.length)
	oTrgt.innerText=oTrgt.innerText.replace(/\./,'');
}

function wordInTo2(oSrc,sAmnt,sSep){
  oSrc.innerText=(NormalizeMoney(sAmnt,true)).replace(/\./,sSep);
}


//----------------- Показать / Скрыть детали ---------------------
function fnChngIss(src,n,pr){
	if((src.document.parentWindow.inputErrorCode!=0)&&(src.document.parentWindow.inputErrorCode!=null)) return false;
	if(src.className!="IssAct"){
		closeCalendar(src.document.parentWindow,1)
		var srcBl = src,srcIs,srcIss;
		while("DIV"!=srcBl.tagName){srcBl=srcBl.parentElement;}
		srcIs=srcBl.all.IS;
		while("TABLE"!=srcBl.tagName){srcBl=srcBl.parentElement;}
		srcIss=eval('srcBl.all.ISS'+pr);
		var ln=srcIs.length;
		for(i=0;i<ln;i++){
			srcIs(i).className=(i!=n)?"Iss":"IssAct";
			srcIss(i).style.display=(i!=n)?"none":"block";
		}
		srcBl.all.ISE.className=(ln-1!=n)?"IssEnd":"IssActEnd";
	}
}

function fnShowTABs(da,bIsView){
	if(bIsView) var is="_v",sh="H",h0="1";
	else var is="",sh="",h0="";

	if(DsnType!=0){
		da['ISG'+is].style.display="block";
		for(var i=0;i<da['ISS'+is].length;i++){
			if(i>0){
				da['ISS'+is](i).all['SH'+sh].style.display="block";
				da['ISS'+is](i).style.display="none";
			}
			da['ISS'+is](i).all['sH0'+h0].style.display="none";
		}
		return true;
	}else{
		da['ISG'+is].style.display="none";
		for(var i=0;i<da['ISS'+is].length;i++) da['ISS'+is](i).style.display="block";
		return false;
	}
}

function fnSHHF1(src,pr){
	var win=src.document.parentWindow;
	var tsp=win.document.body.scrollTop;
	var srcSH=src, str;
	while ("TR"!=srcSH.tagName){srcSH=srcSH.parentElement;}
	srcSH=eval('srcSH.all.SH'+pr);
	if (srcSH.style.display=='block'){
		closeCalendar(src.document.parentWindow,1)
		win.document.body.doScroll('scrollbarPageUp');
		srcSH.style.display="none";str=LRSShowDet;
	}else{
		srcSH.style.display="block";str=LRSHideDet;
	}
	win.document.body.scrollTop=tsp;
	try{insertXMLTag(win.da.fData,src.getAttribute("DATAFLD"),str);}catch(e){if(pr!='')src.innerHTML=str;}
}

function fnPreInitSHH(fData,iCount){
	if(iCount == 0) return;
	for (var i=1; i<=iCount; i++) top.insertXMLTag(fData,"D_"+i,'');
}

function fnInitSHH(wda,spanName,divName){
	var wfD=wda.fData;
	if(wfD.selectSingleNode("//D_1")==null) return;

	var bIsView=(spanName=="SHF1")?true:false;
	if(fnShowTABs(wda,bIsView)) return;

	var coll=wda.tags("SPAN")[spanName];
	if (coll!=null){
		if (typeof(coll.length)=='undefined') top.insertXMLTag(wfD,"D_1",LRSShowDet);
		else{
			var coll2=wda.tags("DIV")[divName];
			for (var i=1; i<coll.length+1; i++){
				if (coll2[i-1].style.display=='block') top.insertXMLTag(wfD,"D_"+i,LRSHideDet);
				else top.insertXMLTag(wfD,"D_"+i, LRSShowDet);
			}
		}
	}
}

function fnSHHinView(da){
	var fD=da.fData;
	if(fD.selectSingleNode("//D_1")==null) return;

	if(fnShowTABs(da,true)) return;

	var coll=da.tags("DIV").SHH;
	if (typeof(coll.length)=='undefined'){
		if (o=fD.getElementsByTagName("D_1")(0)) coll.style.display=(o.text!= LRSShowDet) ? 'block' : 'none';
	}
	else
		for (var i=1; i<coll.length+1; i++){
			if (o=fD.getElementsByTagName("D_"+i)(0))
				coll[i-1].style.display=(o.text!= LRSShowDet) ? 'block' : 'none';
			else{
				s=(coll[i-1].style.display=='block')?LRSHideDet:LRSShowDet;
				top.insertXMLTag(fD,"D_"+i, s);
			}
		}
}

function HideBlock(wda,iBlock,blockID,isView){
	var v=(isView==1)?'_v':'';
	if(DsnType==1){
		with(wda["ISG"+v].all){
			ISE.style.width=IS[iBlock].offsetWidth+ISE.offsetWidth;
			IS[iBlock].style.display='none';
		}
	}
	wda[blockID].style.display='none';
}


//---------- Show / Hide filter in scroller ---------
function SHTag(w,switcher,targetName,setDef){
	var da=w.document.all,
		oTarget=da.item(targetName);
	var oN=da.ScData.selectSingleNode("DOCS/@FILTERIDENT"),fi='';
	if(oN) fi=oN.text;
	var b=(targetName=='FilterBody' && da.FNameBlock!=null && (fi=='ALL' || fi=='VISAALL' || fi=='ALL-B2BIN'));
	if(oTarget==null || switcher==null) return;
	if(setDef==1 && SHFltr=='0' || oTarget.style.display=='none'){
		oTarget.style.display='block';
		if(b) da.FNameBlock.style.visibility='visible';
		switcher.src = '../img/ico/fltrmin.gif';
		switcher.setAttribute("alt",LRSHideFltr);
	}
	else {
		oTarget.style.display='none';
		if(b) da.FNameBlock.style.visibility='hidden';
		switcher.src = '../img/ico/fltrmax.gif';
		switcher.setAttribute("alt",LRSShowFltr);
	}
}

//----------------- Функция для восстановления съехавших селектов при скроллировании формы (Межевой) ---------------------
function DoScrollForm()
{	var tsp=mw.document.body.scrollTop;
	mw.document.body.scroll='yes';
	mw.document.body.doScroll('scrollbarPageUp');
	mw.document.body.scrollTop=tsp;
}

//--- Функция разбора даты -- (Гольцман)
function PrintLongDate(d,msk)
{
	if (d==''||msk.length!=3) return '';
	var month=Array('января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'), dd='', mm='', yy='';
	if (msk.substring(0,1)=='1') dd=d.substring(0,2);
	try {if (msk.substring(1,2)=='1') mm=month[parseInt(d.substring(3,5),10)-1];} catch(e){};
	if (msk.substring(2,3)=='1') yy=d.substring(6);
	return dd+' '+mm+' '+yy;
}

function SplitAcc(a){if (a!='') a=a.replace(/(\d{5})(\d{3})(\d{1})(\d{11})/,"$1.$2.$3.$4"); return a;}

function extMoney(sA,sep,killZeros){
	if(sep==null) sep=' ';
	i=sA.indexOf('.');
	if(i<0) i=sA.length;
	sR=sA.substr(i);
	sA=sA.substr(0,i);
	var r='';
	for(i=0; i<sA.length; i++){
		if(i>0 && i%3==0) r=sep+r;
		r=sA.charAt(sA.length-1-i)+r;
	}
	r=(r=='')?' ':r+sR;

	if(killZeros){
		var arr=r.split('.');
		var decPart=arr[1];
		if (decPart==null || decPart=='') return r;
		while (decPart.charAt(decPart.length-1)=='0' && decPart.length>2)
			decPart=decPart.substring(0,decPart.length-1);
		
		if (decPart.length>0) r=arr[0]+'.'+decPart;
		else r=arr[0];
	}
	
	return r;
}

function addDelim2Acc(sAcc){
	return(sAcc.replace(/(\d{5})(\d{3})(\d{1})(\d{11})/,"$1.$2.$3.$4"));
}

function addSpaces(obj,n){
	var s='';
	for (i=0;i<n;i++){s=s+'_'}
	obj.innerHTML=s;
}

function fillStrByChar(str,n,ch,bAfter){
	if(bAfter==true)
		while(str.length<n) str+=ch;
	else
		while(str.length<n) str=ch+str;
	return str;
}

function showMD(w,sURL,width,height){
	var sURL=sURL+Top.LanguageID.toLowerCase()+'.htm';
	return w.showModalDialog(sURL,w,"dialogWidth: "+width+"px; dialogHeight: "+height+"px; center: yes; edge: raised; help: no; resizable: no; scroll: no; status: no; unadorned: yes;");
}

function setInputView(oContainer,w,bX){
	var i,iL,oCa,oCol,sType,suff,sCN,el,elr,sw='this.document.parentWindow',s1='(this,'+sw+');';
	if(!bX)oCa=(oContainer)?oContainer.all:w.document.all;
	else oCa=oContainer;
	oCol=bX?oCa.selectNodes(".//*[(nodeName() $ieq$ 'input')]"):oCa.tags('INPUT');iL=oCol.length;
	for(i=0;i<iL;i++){
		el=oCol[i];
		sType=(bX?el.getAttribute('TYPE'):el.type);
		if(!sType)sType='TEXT';
		sType=sType.toUpperCase();
		sCN=(bX?el.getAttribute('CLASS'):el.className);
		if(!sCN) continue;
		sCN=sCN.toUpperCase();
		if(sType=='TEXT'||(sType=='PASSWORD')){
			if (sCN=='ELM-INP'){
				fAddHndlr(el,'onfocus','Top.fnActInp(this,true,this.document.parentWindow);',bX);
				fAddHndlr(el,'onblur','Top.fnActInp(this,false,this.document.parentWindow);',bX);
			}
		}
	}
	oCol=bX?oCa.selectNodes(".//*[(nodeName() $ieq$ 'select')]"):oCa.tags('SELECT');iL=oCol.length;
	for(i=0;i<iL;i++){
		el=oCol[i];
		sCN=(bX?el.getAttribute('CLASS'):el.className);
		if(!sCN) continue;
		sCN=sCN.toUpperCase();
		if (sCN=='ELM-INP'){
			fAddHndlr(el,'onfocus','Top.fnActSel(this,true,this.document.parentWindow);',bX);
			fAddHndlr(el,'onblur','Top.fnActSel(this,false,this.document.parentWindow);',bX);
		}
	}
	oCol=bX?oCa.selectNodes(".//*[(nodeName() $ieq$ 'textarea')]"):oCa.tags('TEXTAREA');iL=oCol.length;
	for (i=0;i<iL;i++){
		el=oCol[i];
		sCN=(bX?el.getAttribute('CLASS'):el.className);
		if(!sCN)continue;
		sCN=sCN.toUpperCase();
		if (sCN=='ELM-TXT'){
			fAddHndlr(el,'onfocus','Top.fnActTxtar(this,true,this.document.parentWindow);',bX);
			fAddHndlr(el,'onblur','Top.fnActTxtar(this,false,this.document.parentWindow);',bX);
		}
		//fAddHndlr(el,'onchange,onkeydown,onkeyup','Top.fTxtarHeight(this);',bX);
	}
	/*oCol=bX?oCa.selectNodes(".//*[(nodeName() $ieq$ 'img')]"):oCa.tags('IMG');iL=oCol.length;
	for(var i=0;i<iL;i++){
		el=oCol[i];
		if(el.getAttribute('UTYPE')=="btn"){
			//fAddHndlr(el,'onclick','Top.executeAction(this)',bX);
			fAddHndlr(el,'onmousedown','Top.fnBtnImg(this,"-d");',bX);
			fAddHndlr(el,'onmouseup,onmouseout','Top.fnBtnImg(this,"");',bX);
			defaultShowHide(el,bX);
		}
	}
	oCol=bX?oCa.selectNodes(".//*[(nodeName() $ieq$ 'span')]"):oCa.tags('SPAN');iL=oCol.length;
	for(var i=0;i<iL;i++){
		el=oCol[i];
		if(el.getAttribute('CLASS')=="elm-btn-up"){
			fAddHndlr(el,'onmousedown','Top.fnBtn(this,true);',bX);
			fAddHndlr(el,'onmouseup,onmouseout','Top.fnBtn(this,false);',bX);
		}
	}*/
}// setInputView

function fnActInp(o,sf,w){
	if(IsNotTextInput(o))return;
	try{o.className=(sf)?'elm-inp-a':'elm-inp';
	getInputHeader(o.id,w).className=(sf)?'elm-t-a':'elm-t';}catch(e){}
}

function fnActTxtar(o,sf,w){
	if(IsNotTextArea(o))return;
	//alert(sf);
	try{o.className=(sf)?'elm-txt-a':'elm-txt';
	getInputHeader(o.id,w).className=(sf)?'elm-t-a':'elm-t';}catch(e){}
}

function fnActSel(o,sf,w){
	getInputHeader(o.id,w).className=(sf)?'elm-t-a':'elm-t';
}

function IsNotTextArea(o){return (!o || o.readOnly || o.tagName != 'TEXTAREA');}
function IsNotTextInput(o){return (!o || o.readOnly || o.tagName != 'INPUT'|| ( o.type != 'text' && o.type != 'password'));}
function getInputHeader(s,w){return w.document.all.item('t-'+s);}

function fAddHndlr(el,sEvtList,sHandler,bXML){
/* Привязывает обработчик [sHandler] к событиям элемента [el],
 перечисленным через запятую в [sEvtList].
 Если	 bXML = true, то происходит установка атрибута, с именем обработчика.
 Новые обработчики устанавливаются после существующих.
 Повторная привязка уже существующего обработчика исключается.
*/
	var ar = sEvtList.split(',');
	for(var i = 0; i < ar.length; i++){
		var sA=ar[i], s='', x, sA, oA;
		if(bXML){
			oA = el.selectSingleNode("@*[(nodeName() $ieq$ '" + sA + "')]");
			if(oA){x = oA.text; sA = oA.nodeName;}
		}
		else x = el.getAttribute(sA);
		if (x!=null) {
			s = Trim(x.toString());
			if(s != ''){
				if(s.indexOf(sHandler) > -1) continue;
				if(!bXML) s = Trim(s.substring(s.indexOf('{')+1,s.length-2));
				if(s != '') {s+= ((';' == s.charAt(s.length-1))?' ':'; ')};
			}
		}
		s += sHandler;
		if (bXML) el.setAttribute(sA,s);
		else eval('el.' + sA + ' = new Function("' + s.replace(/\\/g,"\\u005C").replace(/"/g,"\\u0022").replace(/[\r|\n]/g,"\\n") + '");');
	}
}

function putEl(w,o){
	if (!o.all.IcO){
		var i=w.document.createElement('<SPAN ID="IcO" ICO="'+o.ICO+'" EVAL="'+o.EVAL+'" TITLE="'+o.title+'" CLASS="TBICO" onreadystatechange="if(this.readyState==\'complete\')this.INIT()">')
		o.appendChild(i)
	}else{if(!o.ACTIVEE){try{o.all.IcO.INIT()}catch(e){}}}
}

function checkIco(w,o){
	if(o.readyState=='complete'){
		var o=w.document.all.TBICO,i;
		if(o)if(o.length){for(i=0;i<o.length;i++){putEl(w,o.item(i))}}
		else putEl(w,o)
	}
}

function putEl2(w,o){
	if (!o.all.IcO){
		var i=w.document.createElement('<SPAN ID="IcO" ICO="'+o.ICO+'" EVAL="'+o.EVAL+'" TITLE="'+o.title+'" CLASS="TBICO2" onreadystatechange="if(this.readyState==\'complete\')this.INIT2()">')
		o.appendChild(i);

	}else{if(!o.ACTIVEE){try{o.all.IcO.INIT()}catch(e){}}}
}

function checkIco2(w,o){
	var o=w.document.all.TBICO2,i;
	if(o)if(o.length){for(i=0;i<o.length;i++){putEl2(w,o.item(i))}}
	else putEl2(w,o)
}


function Hilite(w,obj){
	if(obj==null) obj=w.event.srcElement;
	if(obj.prevColor==null) obj.prevColor=obj.currentStyle.color;
	var oS=w.document.styleSheets['COLORCSS']
	if(!oS) oS=Top.mw.document.styleSheets['COLORCSS'];
	obj.runtimeStyle.color=oS.rules[0].style.color;
}
function Restore(w,obj){
	if(obj==null) obj=w.event.srcElement;
	if(obj.prevColor!=null) obj.runtimeStyle.color=obj.prevColor;
}

function setTbDCcfg(w,oX){
	w.onDCEval=getEM(oX,'@onDCEval',0)
	w.tbPanID=getEM(oX,'@tbPanID',0)
	w.tbMAP=getEM(oX,'@tbMAP',0)
}

function bSet(b,o){
	if(b){
		var s=o.getAttribute('onclick')
		if(s!=''){
			o.setAttribute('_onclick',s);
			o.setAttribute('onclick','');
		}
	}else{
		var s=o.getAttribute('_onclick')
		if(s!=''&&s!=null)o.setAttribute('onclick',s);
	}
	o.style.filter=(b)?'alpha(opacity:40)':'';
}

function getDateSplit(sdt){
	if(sdt=='')sdt='  .  .    ';
	var ars=new Array();
	var ardt=sdt.split('.');
	if(ardt[0].length==1) ardt[0]='0'+ardt[0];
	if(ardt[1].length==1) ardt[1]='0'+ardt[1];
	ars[0]=ardt[0].charAt(0);
	ars[1]=ardt[0].charAt(1);
	ars[2]=ardt[1].charAt(0);
	ars[3]=ardt[1].charAt(1);
	ars[4]=ardt[2].charAt(0);
	ars[5]=ardt[2].charAt(1);
	ars[6]=ardt[2].charAt(2);
	ars[7]=ardt[2].charAt(3);
	return ars;
}

function CheckIs3016uStartByDocDate(startDate,docDate,bDef){
	var r=false;

	var sdocDate=docDate;
	if((sdocDate=='') || (sdocDate=='__.__.____')){
		r=bDef;
		return(r);
	}  
	sdocDate=sdocDate.replace(/(\d+).(\d+).(\d+)/, '$2-$1-$3');
	
	if(Date.parse(startDate)<=Date.parse(sdocDate))
		r=true;
		
	return (r);
}

// Progress functions
var oProgressInt="",AsOp=null;
function runAsOperation(Id,Name,ReviewTask,MustReview){
	AsOp= new AsOperation(Id,Name,ReviewTask,MustReview);
	showProgressWin(Top.LRAOb1+AsOp.Name+Top.LRAOb2);
	startProgressIntv();
}

function AsOperation(Id,Name,ReviewTask, MustReview){
	this.Id=Id;
	this.Name=Name;
	this.Prog=this.State=0;
	this.Report='';
	this.ReviewTask=ReviewTask;
	this.MustReview=MustReview;
	this.ExParam1='';
	this.Error='';
}

function showProgressWin(message){
	var clockImg='img/ico/clock_ani.gif';
	if(AsOp.State=='2' || AsOp.State=='4'){
		AsOp.Prog='100';
		clockImg='img/ico/clock.gif';
	}
	var percent=AsOp.Prog;
	Top.tb.NOTIFIER.all(0).src=Top.VerPath+clockImg;
	var res='<DIV CLASS="ErrMsgLine">'+
		'<DIV CLASS="ErrMsgLMargin" STYLE="vertical-align: top; margin-left: 5px;">'+
		'<IMG ID="PImg" SRC="'+Top.VerPath+'img/ico/clock_ani.gif" style="vertical-align: top;" ALIG1N="middle" CLASS="ErrBulletIMG" BORDER=0 VSPACE=0 HSPACE=0 ondblclick="top.refreshProgressIntv()">'+
		'<SPAN ID="PMsg" CLASS="ErrMsg" STYLE="height: 40px; width: 380px;">' + message + '</SPAN>'+
		'</DIV>'+
		'<SPAN STYLE="border: 1px solid; height: 20px; width: 293px; margin: 10 0 0 20px; overflow: hidden;"><NOBR>'+
		'<SPAN ID="PLine" STYLE="margin: 1px; height: 16px; width: '+percent+'%;"></SPAN><SPAN ID="PText" STYLE="vertical-align:bottom;width:100%;padding-bottom:2px;position: relative; left: '+(50-percent)+'%;">'+percent+'%</SPAN>'+
		'</NOBR></SPAN>'+
		'<BUTTON ID="PCancelB" onclick="top.refreshProgressIntv(1)" STYLE="vertical-align:top;width: 112px; margin: 10 0 1 2px;">'+Top.LRAObtn3+'</BUTTON>'+
		'<BUTTON ID="PReportB" onclick="top.reviewAsOperation(\''+AsOp.ReviewTask+'\');" STYLE="vertical-align:top;width: 70px; margin: 10 0 1 2px; display: none;">'+Top.LRAObtn1+'</BUTTON>'+
		'<BUTTON ID="POkB" onclick="top.closeAsOperation();" STYLE="vertical-align:top;width: 40px; margin: 10 0 1 2px; display: none;">'+Top.LRAObtn2+'</BUTTON>'+
		'</DIV>';
	placeMsg(res,mw,'NOTIFIER');
}
function updateProgressWin(percent,state){
	if(percent==null) percent=AsOp.Prog;
	if(state==null) state=AsOp.State;
	if(state==2 || state==4){
		percent=100;
		Top.tb.NOTIFIER.all(0).src=Top.VerPath+'img/ico/clock.gif';
	}
	//перерисовка окна прогресса
	if(Top.mw.frames['ML_IFrameNOTIFIER']!=null){
		with(Top.mw.frames['ML_IFrameNOTIFIER'].document.all){
			if(state>1){
				PMsg.innerText=Top.LRAOe1+AsOp.Name;
				switch(state){
					case '3': PMsg.innerText+=Top.LRAOe3; break;
					case '4': PMsg.innerText+=Top.LRAOe4; break;
					default : PMsg.innerHTML+=Top.LRAOe2+'<BR><SPAN CLASS="RedA">'+Top.LRAOw1+' '+Top.LRAOw3+'</SPAN>';
				}
				if(state==2 || state==4){
					PImg.src=Top.VerPath+'img/ico/clock.gif';
					ML_BtnNOTIFIER.disabled=true;
					PCancelB.style.display='none';
					if(state==4){
						POkB.style.width=112;
						POkB.style.display='inline';
					}
					else{
						PReportB.style.display='inline';
						if(AsOp.MustReview)
							PReportB.style.width=112;
						else{
							PReportB.style.width=70;
							POkB.style.display='inline';
						}
					}
				}
			}
			PLine.style.width=percent+'%';
			with(PText){
				style.left=(50-percent)+'%';
				innerText=percent+'%';
				style.color=(percent<56)?'black':'white';
			}
		}
	}
}
function reshowProgressWin(){
	if(AsOp!=null){
		showProgressWin(Top.LRAOb1+AsOp.Name+Top.LRAOb2+'<BR><SPAN CLASS="RedA">'+Top.LRAOw1+' '+Top.LRAOw2+'</SPAN>');
		window.setTimeout("updateProgressWin()", 300);
	}
}
function shutProgressWin(){
	AsOp=null;
	try{
		Top.mw.da["NOTIFIER"].changeDisplay(false,null);
		Top.mw.frames['ML_IFrameNOTIFIER'].ML_BtnNOTIFIER.disabled=false
		Top.tb.document.all.item('NOTIFIER').runtimeStyle.visibility='hidden';
	}catch(e){}
}
function reviewAsOperation(Task){
	if(FDataChanged(Top.mw)) return;
	if(AsOp.Error!=''){
		shutProgressWin();
		placeMsg(Top.GetErrMessage('0|6=0:'+LRAOw4),Top.mw);
		return false;
	}
	switch(Task){
		case 'IMPORT':
			Top.mw.location.replace(Top.scriptPath+'?t=RT_2Import.import&sid='+Top.SID+'&AO='+AsOp.Id+'&ImpDocScheme='+Top.sImpDocScheme+'&Review=1&tms='+Top.fnRnd());
			break;
		case 'EXPORT':
			Top.mw.location.replace(Top.scriptPath+'?t=RT_2Import.expstm&sid='+Top.SID+'&AO='+AsOp.Id+'&Review=1&tms='+Top.fnRnd());
			break;
		case 'EXCELSTM':
			Top.mw.location.replace(Top.scriptPath+'?t=RT_2Import.expstm&sid='+Top.SID+'&AO='+AsOp.Id+'&Review=1&RTF=2&tms='+Top.fnRnd());
			break;	
		case 'RTFSTM':
			Top.mw.location.replace(Top.scriptPath+'?t=RT_2Import.expstm&sid='+Top.SID+'&AO='+AsOp.Id+'&Review=1&RTF=1&tms='+Top.fnRnd());
			break;
		case 'RTFDOC':
			var s=LRAOfile1+'<BR>'+
			      LRAOfile2a+
			      '<NOBR>"<A ID="FLink" HREF="../sd/bsi.dll?t=RT_1common.getRp&SID='+Top.SID+'&FN=DocInRTF&tms='+Top.fnRnd()+'" onClick="event.returnValue=false;" onContextMenu="event.returnValue=true; event.cancelBubble=true;">'+
			      LRAOfile2b+'</A>"</NOBR>'+
			      LRAOfile2c;
			placeMsg(Top.GetErrMessage('0|6=0:'+s),Top.mw);
			break;
	}
	shutProgressWin();
	return true;
}
function closeAsOperation(){
	shutProgressWin();
}
function checkAsOperation(Task){
	if(AsOp==null){
		switch(Task){
			case 'IMPORT':
				Top.nv.DEF('RT_2IMPORT.Impform');
				return;
			case 'EXPORT':
				Top.mw.exp();
				return;
			case 'RTF':
				Top.fnRTFDoc(Top.mw);
				return;
		}
		return false;
	}
	else {
		reshowProgressWin();
		return true;
	}
}

function startProgressIntv(){
	Top.canUpdate=true;
	if(oProgressInt=="") oProgressInt=window.setInterval("refreshProgressIntv()",iProgressInt);
	else refreshProgressIntv();
}
function stopProgressIntv(){
	if(oProgressInt!=""){
		window.clearInterval(oProgressInt);
		oProgressInt="";
		Top.tb.NOTIFIER.all(0).src=Top.VerPath+'img/ico/clock.gif';
	}
}
function refreshProgressIntv(trm){
	function completeRefreshIntv(){
		if(oPIX.readyState==4){
			Top.canUpdate=true;
			oPIX.onreadystatechange=new Function("");
			var oXML=oPIX.responseXML;
			var ErrMsg=Top.GetSTErrorFromXML(oXML,false);
			if(ErrMsg!=''){Top.placeMsg(ErrMsg,Top.mw); return false;}
			var oRoot=oXML.documentElement;
			if(oRoot.nodeName=='R'){
				AsOp.Prog=oRoot.selectSingleNode('@P').text;
				AsOp.State=oRoot.selectSingleNode('@S').text;
				trm=oRoot.selectSingleNode('@T').text;
				if(trm=='1' && AsOp.State!='2') AsOp.State='3';
				if(trm=='2') AsOp.State='4';
				AsOp.Error=oRoot.selectSingleNode('@E').text;
				updateProgressWin();
				if(AsOp.State==2 || AsOp.State==4){
					stopProgressIntv();
					AsOp.Report=oRoot.text;
					try{AsOp.ExParam1=oRoot.selectSingleNode('@X1').text;}catch(e){}
				}
			}
			else stopProgressIntv();
		}
	}
	if(Top.canUpdate){
		var oPIX=new ActiveXObject("Microsoft.XMLHTTP");
		oPIX.onreadystatechange=completeRefreshIntv;
		oPIX.open("POST",Top.XMLScriptPath,true);
		oPIX.setRequestHeader("Rts-Request", 'T=RT_1common.updateProgress&SID='+Top.SID+'&AsOpId='+AsOp.Id+'&tms='+Top.fnRnd()+((trm==null)?'':'&trm=1'));
		var oXML=Top.GetSimpleXML_1251('R');
		var oRoot=oXML.documentElement;
		oPIX.send(oXML);
		Top.canUpdate=false;
	}
}

add_M('c_misc');

window.Top=window.top;
var tb=mw=nv=mh=null, IsScroller, timr;
var scriptPath=('/' + top.location.pathname).replace(/^[\/]{2,}/,"/");
var RE=/(\/|\\)(s|sc|sd|sx)(\/|\\)(.*)/;
var AttachPath=scriptPath.replace(RE,"$1sd$1$4");
var VerPath=scriptPath.replace(RE,"$1");
var XMLScriptPath=scriptPath.replace(RE,"$1sx$1$4");
var XSLPath=VerPath + "xsl/";
var IsPopupMess=bStopSign=false;
var TimeStamps='', SSTimer, SSTimerMs;
var sST_TPL='20', sST_NEW='0', sST_SIG='7', sST_TOPROC='10', sST_ARCH='1901', sST_ACCPT='401', sST_NOTACCPT='371', sST_VISA='801', sST_INPROC='402', sST_DELIV='50', sST_CDOCACC='27441', sST_CDOCREJ='27451';
var sACCEPTOR='<IFRAME STYLE="display: none;" NAME="ACCEPTOR" ID="ACCEPTOR" WIDTH="100%" HEIGHT="150" SRC="../scheme/null1.htm"></IFRAME>';
function SetAliases(xw,FAr){
	var xtf=(xw.standalone)?xw.Top.frames:xw.top.frames;
	for (var i=0; i < FAr.length; i++) {
		var Fri=FAr[i];
				 if (Fri.indexOf('_TOOLBAR') > -1){xw.tb=xtf(Fri); xw.tb.IsFrameHidden=false}
		else if (Fri.indexOf('_MAINW') > -1)	{xw.mw=xtf(Fri); xw.mw.IsFrameHidden=false;}
		else if (Fri.indexOf('_NVGT') > -1)	 {xw.nv=xtf(Fri); xw.nv.IsFrameHidden=false;}
		else if (Fri.indexOf('_HLP') > -1)		{xw.mh=xtf(Fri); xw.mh.IsFrameHidden=true;}
	}
}	// SetAliases


function AsignFrameAliases(w){
	var wtop=(w.standalone)?w.Top:w.top, iF=0, arF=new Array;
	function drillFrames(wx,arF){//alert('wx.name=' + wx.name + '\narF=' + arF + '\niF=' + iF);
		arF[iF]=wx.name; iF++; for(var i=0; i < wx.frames.length; i++){drillFrames(wx.frames[i],arF);}
	}
	if (wtop.frames.length > 1){// Here Is Structure!
		drillFrames(wtop,arF);
		SetAliases(w,arF);
		w.IsFrm=w.self != wtop; // Here Is Frame OR Head of Structure!
		top.lw=wtop.mw;
	}
	else {//Here is No Structure!
		w.tb=w.mw=w.nv=w.mh=new Object();
		w.IsSinglWindow=true;
	}
}

function InitObjectsAliases(w){
	var wtop=(w.standalone)?w.Top:w.top;
	wtop.df=w.df=w.document.forms("MForm");
	wtop.da=w.da=w.document.all;
}

function OnCntxtMnu(){
	try{
		var et=this.activeElement.tagName;
		return (("INPUT"==et)||("TEXTAREA"==et)||(Top.IsDEBUG=='1'));
	}catch(e){}
}
function fnCommOnbeforeunload(){
	var da=this.top.mw.document.all;
	try{da.DivGlobalID.style.display="none"}catch(e){};
	try{da.ERRORTD.style.display="none"}catch(e){};
	try{da.WaitMes.innerText=this.Top.LRS3;}catch(e){};
	try{Top.HideAllBars(this)}catch(e){};
	try{Top.HIDE_MLWIN_and_IC(this)}catch(e){};
}

function addFormCSS(w){
	var d=w.document, oS=d.createStyleSheet(), oP=d.createStyleSheet(),
	s1="#FORSCREEN", s2="#xslPrintTarget", s3="display:block;", s4="display:none;";
	s1="#FORSCREEN", s2="#xslPrintTarget", s3="display:block;", s4="display:none;", s5="#WaitMes";
	oS.media="screen";
	oS.addRule(s1,s3);
	oS.addRule(s2,s4 + " border: 5mm solid #DADADA; background-color: gray;");
	oP.media="print";
	oP.addRule(s1,s4);
	oP.addRule(s5,s4);
	oP.addRule(s2,s3 + " background-color: white;");
}

function getSheme(w){
	var sS;
	try{sS=w.da.SCHEMENAME.value}catch(e){}
	if(!sS &&w.IsForm && w.fData)sS=w.fData.selectSingleNode('/BXD/DROW/@SCHEMENAME').nodeValue;
	return(!sS)? 0:sS;
}

function pointToS(w){
	if(!(sS=Top.getSheme(w)))return;
	var oA=Top.oSchSt.selectSingleNode('/DSP/SCH2ST[@SCH="'+sS+'"]/@ST');
	if(!oA)return;
	return sStGr=oA.text;
}

function getStatus(w,action,id){
	if(!(/^([NAR])(AME|LLOW|OUTE)$/i).test(action))return;
	var sA=RegExp.$1;
	oA=Top.oStData.selectSingleNode('/DSP/SCH[@N="'+pointToS(w)+'"]/S[@I="'+id+'"]/@'+sA);
	return ((oA)?oA.text:null);
}


function getRoute(w){
	var oA=Top.oSchSt.selectSingleNode('/DSP/SCH2ST[@SCH="'+getSheme(w)+'"]/@R');
	return ((oA)?oA.text:null);
}

function LoadLResXML(w,oDataSrc,DSNode){
	var Err,oD,oN,sN=getXO(w.XMLStoreID);
	oX=(w.IsScroller)?w.xLRs:w.xLRf
	if((sN==null)||(Top.IsDEBUG=='1')){
		var XHR=new ActiveXObject(Top.XMLHTTP_ID);
		var URL='../'+w.XMLStoreID;
		XHR.open("GET",URL,false);
		XHR.send('');

		oX.async = false;
		oX.validateOnParse = false;
		oX.resolveExternals=false;
		oX.preserveWhiteSpace = true;
		oX.loadXML(XHR.responseXML.xml);

		Err=GetSTErrorFromXML(oX,false);
		if(Err!=""){Top.placeMsg(Err,w); return false;}
		setXO(w.XMLStoreID,oX.xml);
	}
	else oX.loadXML(sN);

//	oN=w.xLR.selectSingleNode(LRNode);
	oN=oX.documentElement;
	if(oN && (oD=oDataSrc.selectSingleNode(DSNode))){
		oD.appendChild(oN.cloneNode(true));
	}
	return true;
}

function fnCommOnload(w){
	AsignFrameAliases(w);
	if(((top.nv.done!=1)||(top.tb.done!=1)) && !w.standalone){setTimeout('fnCommOnload(top.lw)',100);return;}
	with(w){
		document.body.style.display='none';
		w.ogInterval=null;
		w.ogTimeout=null;
		w.HlpString=null;
		w.sWaitMesage=null;

		if (self != top){
			document.onselectstart=new Function("var et=event.srcElement.tagName; return (\"INPUT\"==et||\"TEXTAREA\"==et);");
			document.oncontextmenu=Top.OnCntxtMnu;
			if (!w.top.IsDictionary) attachEvent("onbeforeunload", Top.fnCommOnbeforeunload);
			else onbeforeunload=Top.fnCommOnbeforeunload;
		}
		if(!w.standalone && !Top.sToolBar)Top.GetToolbar();
		try{nv.setInfoCellValues(unescape(scnt))} catch(e){};

		Top.HideAllBars(w);
		if(Top.bAX && !w.standalone) Top.nv.MySigner.ShowErrorDialog=1;
		if (w.IsScroller){
			w.MWdone=false
			// Init for Scroller
			DoXSLTransSc(w);
			InitObjectsAliases(w);
			w.ShowFHid=false;
			w.WID='SCROLLER';
			w.HlpString=Top.LRSscr1;
			w.document.body.onclick=new Function("Top.RemoveTRSelection(window,'SCROLLER');");
			try {
				var o=w.da.ScData.XMLDocument.selectSingleNode("DOCS");
				var scnt=nv.MyTools.XMLhexDecode(o.getAttribute("scnt"));
				nv.setInfoCellValues(unescape(scnt))
			}catch(e){};

			try{w.InitScroller()} catch(e){};
			Top.attachHandlersToFields(null,w);
			setTbDCcfg(w,w.da.ScData)
			try{
				if(w.da.FNAME.value!='') setSvdFilterVals(w);
			}catch(e){};
			setDefFilterVals(w);
			SHTag(w,w.da.SHFltrIco,'FilterBody',1);
			SHTag(w,w.da.SHNewsIco,'News',0);
			var fi=w.da.ScData.selectSingleNode("DOCS/@FILTERIDENT").text;
			Top.modScFilter(w,(fi=='ALL' || fi=='VISAALL' || fi=='ALL-B2BIN'));
			if(Top.AddMes!=null){
				addMsg(Top.AddMes,w);
				Top.AddMes=null;
			}
		}else if(w.IsForm){
			w.MWdone=false
			// Init for form
			w.HlpString=Top.LRSscr1;
			w.IsEditForm=true;
			w.WID='FORM';
			Top.attachHandlersToFields(xForm.XMLDocument.selectSingleNode('//(TABLE|DIV)[@ID="EDITFORM"]'),w);
			DoXSLTransForm(w);
			InitObjectsAliases(w);
			Top.addFormCSS(w);
			if(w.FormHasAttachment){
				df.encoding='multipart/form-data';
				df.target='ACCEPTOR';
				document.body.insertAdjacentHTML('beforeEnd',sACCEPTOR)
			}
			if(w.da.fData.selectSingleNode('//STATUS')!=null && w.da.fData.selectSingleNode('//STATUS').text==20){
				w.da.SubTitle.style.display=w.da.TplNameForm.style.display='block';
				w.da.TplNameLbl.style.display='inline';
				w.da.FormHeader.style.display=w.da.SaveTplBtn.style.display=w.da.CnclTplBtn.style.display='none';
				w.da.SubTitle.innerText=w.da.FormHeader.innerText;
			}
			document.body.onkeydown=new Function("Top.cancelEsc(w);");
			HidePageBar(w);
		}else{
			Top.addFormCSS(w);
			InitObjectsAliases(w);
			try{Top.SetToolsPannel(w);}catch(e){}
		}
/*
		w.HIDDENFORM=false; try{if(w.IsForm && !w.IsDictionary  && (w.da.fData.selectSingleNode('//DROW/@SCHEMETYPEEXT')!=null && w.da.fData.selectSingleNode('//DROW/@SCHEMETYPEEXT').text=='HIDDEN')){
				w.HIDDENFORM=true;
			}
		}catch(e){}
*/
		if(w.HIDDENFORM) detachEvent("onbeforeunload", Top.fnCommOnbeforeunload);
		try{document.all.DivGlobalID.style.display="block"} catch(e){};
		document.body.style.display='block';
	}
	if(window.IsDEBUG=='1') DoOnloadDebug(w);
}
function completeCommOnload(w){
	if(w.da.NOS!=null){
		vNOS=w.da.NOS.value;
		if(vNOS!=null && vNOS!='') Top.nv.MySigner.NumberOfSignatures=vNOS;
		vFTmp=w.da.FTMP.value;
		if(vFTmp=='0'){
			var oSP=new ActiveXObject(Top.XMLDOM_ID)
			oSP.loadXML(Top.SignConf.xml)
			while(oN=oSP.selectSingleNode('/Signs/Sign[@FT="1"]')){oSP.documentElement.removeChild(oN)}
			Top.nv.MySigner.XMLCryptoParamsData=oSP.xml;
		}else Top.nv.MySigner.XMLCryptoParamsData=Top.SignConf.xml
	}
}

// ##############	Get Params From Form


function GetFPrmVal(el,bXHEnc){
	if(el.disabled && (el.type!='checkbox' && el.type!='radio')) return '';
	el.NoSend=false;
	var VL;
	switch(el.tagName){
	case "INPUT" :
		switch(el.type){
			case "file":;case "text":;case "textarea":;case "hidden":;case "password":VL=el.value;break;
			case "submit":;case "reset":;case "image": (window.event!=null && event.srcElement==el) ? VL=el.value : el.NoSend=true; break;
			case "radio": el.checked ? VL=el.value : el.NoSend=true; break;
			case "checkbox": (el.checked || el.value!='')? VL=el.value: el.NoSend=true; break;
			default: el.NoSend=false;
		}; break;
		case "SELECT":;case "TEXTAREA":;case "OBJECT":VL=el.value;break;
		case "BUTTON": (window.event!=null && event.srcElement==el) ? VL=el.innerText : el.NoSend=true; break;
		default : el.NoSend=true;
	}
	if ((el.NoSend)||(typeof(VL)=='undefined')) return '';
	if(bXHEnc) VL=Top.XMLhexEncode(VL);
	return (el.getAttribute('esc'))?VL.replace(/%/g,escape('%')):VL;
} // GetFPrmVal

function GetFParams(form,bRemLstAmp,bXHEnc,bSetEmptVal){
	var qs='',pt,el,eln;
	for (var i=0; i < form.length; i++ ){
		el=form.elements[i];
		eln=el.name.toUpperCase();
		if(eln=='')continue;
		pt=GetFPrmVal(el,bXHEnc);
		if(el.NoSend||(!bSetEmptVal&&pt=='')) continue;
		qs+=eln+"="+pt+"&";
	}
	return (bRemLstAmp)?qs.replace(/(\&$)/,""):qs;
}

function fnAddPrm(oXML,oRoot,PrmName,PrmValue,bAddEmptyPrm){
	if(PrmName=='' || !bAddEmptyPrm && PrmValue=='') return;
	var elx=oXML.createElement(PrmName);
	elx.text=PrmValue;
	oRoot.appendChild(elx);
}

function fnFilterPrm(w,fflt,pflt){ if(!w.FltParams) return true; return (w.FltParams.indexOf('|'+fflt+'$'+pflt+'|') != -1); }

function GetFParams_TSID(form){return ('SID=' + ((form.SID!=null)?(form.SID.value):Top.SID) +'&'+ ((form.T!=null)?('T=' + form.T.value):''));}

function GetFParamsXML(w,XMLHTTP,Args){
	var oXDoc=GetSimpleXML_1251('FORM');
	var oRoot=oXDoc.documentElement;
	if(w.FltParams) w.FltParams= '|' + w.FltParams + '|';
	var pt, el,eln, elx, form, j=3;
	var s=GetFParams_TSID(Args[j]);
	Args[1].RtsRequest=s;
	if(s!='' && w.SpecRtsRequest!=null && w.SpecRtsRequest!='')s+=w.SpecRtsRequest;
	var bAddEmptyPrm=Args[1].AddEmptyPrm, sPrmVal='';
	if(s != '') XMLHTTP.setRequestHeader("Rts-Request",s);
	while((Args[j] != null)||(j > 6)){
		form=Args[j];
		for (var i=0; i < form.length; i++ ){
			el=form.elements[i];
			if(fnFilterPrm(w,form.name,el.name)){
				sPrmVal=GetFPrmVal(el,true);
				if(el.NoSend) continue;
				fnAddPrm(oXDoc,oRoot,el.name.toUpperCase(),sPrmVal,bAddEmptyPrm);
			}
		}
		j++;
	}
	w.FltParams = '';
	return oXDoc;
}

function SendXML(ResumeFunctionName,w,ACTID,Par1,Par2,async){ // Par1 - MForm or XML; Par2 - Form2 or Rts-Request string
	var XMLHTTP=null, oXML, bWisOwner=w.bFunctionOwner, ARGS=arguments;
	if(async==null) async=true;
	function doHttpReadyStateChange(){
		if (XMLHTTP.readyState==4) {
			XMLHTTP.onreadystatechange=new Function("");
			if(w==null)return;
			if(Top.bShowReqInfo)Drow_XResponse(w,XMLHTTP,ACTID);
			if(ResumeFunctionName!='') eval(((bWisOwner)?'w.':'') + ResumeFunctionName + '(w,"' + ACTID + '",XMLHTTP,ARGS)');
		}
	}
	XMLHTTP=new ActiveXObject(XMLHTTP_ID);
	XMLHTTP.Open("POST",XMLScriptPath,async);
	XMLHTTP.onreadystatechange=doHttpReadyStateChange;

	switch(w.SendXMLSwitch){
		case "ForceSave" :
			oXML=GetSimpleXML_1251('FORM');
			XMLHTTP.setRequestHeader("Force-Save","1");
			XMLHTTP.setRequestHeader("Token-D",w.TokenD);
			w.RtsRequest=GetFParams_TSID(Par1);
			XMLHTTP.setRequestHeader("Rts-Request",w.RtsRequest);
			break;
		case "SetSigns":case "PrivateXML":
			oXML=Par1;
			XMLHTTP.setRequestHeader("Rts-Request",Par2);
			if(w.TokenD!=undefined&&w.TokenD!=''){XMLHTTP.setRequestHeader("Token-D",w.TokenD);w.TokenD='';}
			if(w.TokenD==undefined){w.TokenD='';}
			break;
		case "JustRequest":
			XMLHTTP.setRequestHeader("Rts-Request",w.RtsRequest);
			oXML=GetSimpleXML_1251('FORM');
			break;
		case "CompoundSave":
			oXML=GetFParamsXML(w,XMLHTTP,arguments);
			break;
		default: oXML=GetFParamsXML(w,XMLHTTP,arguments);
	}

	if(w.token)XMLHTTP.setRequestHeader("Token",w.token);
	if(w.da && w.TokenD!='')if(w.IsForm&&!w.IsDictionary&&w.da.STEP.value=='2')	XMLHTTP.setRequestHeader("Token-D",w.TokenD);

	if(Top.bShowReqInfo)Drow_XRequest(w,XMLHTTP,oXML,ACTID); //DEBUG
	else XMLHTTP.Send(oXML);
}

//########################## Function of Form Sending	################################

function Dict(w,SCHEMENAME,OptionalParams,FromPoint,wModal){
	InitObjectsAliases(w);
	if(wModal && wModal.inputErrorCode!=null && wModal.inputErrorCode!=0 || !wModal && w.inputErrorCode!=null && w.inputErrorCode!=0) return;
	with(w){
		var xmlTag, Key, URL, s1='OpenNewSession';
		URL=Top.scriptPath+'?SID='+Top.SID+'&t='+Top.MainBllName + '.dictFRAMESET&' + (OptionalParams==null?'':OptionalParams) +
		'SCHEMENAME=' + SCHEMENAME + ((df.SCHEMENAME!=null)?'&FROMSCHEME='+df.SCHEMENAME.value:'') + ((FromPoint==null||FromPoint=='')?'':('&FromPoint='+FromPoint)) + '&tms='+fnRnd();
		var wParent=(wModal)?wModal:w;
		var retVal=wParent.showModalDialog(URL,w,"dialogWidth:700px; dialogHeight:650px; help: no; status: no; resizable: yes;");

		if(typeof(retVal)=='string'&&retVal==s1){
			var wt=w.top;
			if(wt.IsDictionary){
				wt.returnValue=s1;
				wt.close();
			}
			else {try{Top.location=Top.scriptPath+Top.OpenNewSessQ;}catch(e){}}
			return;
		}

		for(Key in retVal){
			//alert('function Dict: w.name' + w.name + '\nKey : ' + Key + '\nretVal[Key]:'+retVal[Key]);
			try{df.elements[Key].value=retVal[Key];}
			catch(e){
				var dff=w.document.forms("FilterForm");
				if(dff!=null) try{dff.elements[Key].value=retVal[Key];}catch(e){}
				else{
					xmlTag=da.fData.getElementsByTagName(Key)(0);
					if (xmlTag != null) xmlTag.text=retVal[Key];
				}
			}
		}
	}// end with
} // Dict


function FDataChanged(w){
	try{
		if(w.document.body==null) return false;
		w.document.body.focus(); // чтобы обновить XML в islands
		return ((w!=null) && Top.IsSessionOpen && w.IsForm && w.bDefDataIsSet && (w.sDefData!=w.fData.text) && !w.dntConfirm && !confirm(Top.LRS12));
	}catch(e){return false;}
}

function FDataChangedWC(){
	try{
		if(mw.document.body==null) return false;
		mw.document.body.focus();
		return (IsSessionOpen&&mw.IsForm&&mw.bDefDataIsSet&&(mw.sDefData != mw.fData.text));
	}catch(e){return false;}
}

function ClrOnUnLoad(){
	window.onunload=null;
	window.onbeforeunload=null;
}

function MFonload(){
	// До первой попытки закрыть рабочее окно в то время, когда редактируется форма, будет действовать обработчик,
	// закрывающий сессию через SRC скрипта (предпочтительный способ) Потом - через XMLHTTP (менее предпочтительный способ)
	window.fn_on_unld=new Function('var O=new ActiveXObject("Microsoft.XMLHTTP");O.open("GET","'+clssURL+'",true);O.send("");O=null;');
	ClrOnUnLoad()
	window.onbeforeunload=new Function('if (FDataChangedWC()){if(!mw.dntConfirm){ window.onunload=window.fn_on_unld; clssURL=""; event.returnValue=LRS13;}} else{window.fn_on_unld()}');
	//window.ToolBarPixelRows=frames(0).document.body.clientHeight;
	if(window.sA['c_debug']==1) window.IsDEBUG=IsDEBUG != '0';
}


////???? Удалить впоследствии эти две функции
function fnHlp(w){w.alert(w.HlpString);}

// Do transform for VIEW and show result (this function calling from VIEW window)

function testDV(oV){
	if(oV==null) return false;
	//alert('oV.xml\n\n'+oV.xml);
	Err=CheckXML4ParseError(oV,false);
	if(Err!=''){window.sDefViewXSLErr=Err; return false;}
	if(oV.selectSingleNode('//TD[@ID="xslViewTarget"]')==null){window.sDefViewXSLErr=LRS4v1;	return false;}
	return true;
}	// testDV

function getDefView(){
	var oV=getXO('DefViewXSL');
	if(testDV(oV)) return oV;
	var XHP=new ActiveXObject(XMLHTTP_ID), oX, Err;
	var URL=XSLPath + 'default_view.xsl' + ((getXOb('DefViewXSL'))?'?'+fnRnd():'');
	XHP.Open("GET",URL,false);
	window.status=LRS4w;
	XHP.Send('');
	window.status='';
	if (XHP.readyState==4){
		oX=XHP.responseXML;
		setXOb('DefViewXSL',true);
		if(!testDV(oX))return null;
		setXO('DefViewXSL',oX);
		return oX;
	}
}	// getDefView

function getLoadedXML(sXml){
	var X=new ActiveXObject(XMLDOM_ID);
	X.validateOnParse=false;
	X.preserveWhiteSpace=true;
	X.loadXML(sXml);
	return X;
}	// getLoadedXML

function fnShowView(w){
	// запускается на onload из окна просмотра док-та (отдельного или модального)
	var Err, wd=w.document, wb=wd.body;
	Err=CheckXML4ParseError(w.xView,false) + GetSTErrorFromXML(w.fData,false);
	if(Err!=''){wb.innerHTML=Err; return;} // Это все происходит в модальном окне, поэтому выводим CСОО прямо в документ
	var oX=getDefView();
	if(oX==null){placeMsg(sDefViewXSLErr,w); return;}
	w.XMLStoreID=(w.fData.selectSingleNode("//DROW/@V_XF")!=null)?w.fData.selectSingleNode("//DROW/@V_XF").text:w.fData.selectSingleNode("//DROW/@P_XF").text;
	w.XMLStoreID='scheme/'+w.XMLStoreID+'_'+Top.LanguageID.toLowerCase()+'.xml';
	if(!LoadLResXML(w,w.fData,"//DROW")) return false;
	fnPreInitSHH(w.fData,w.xView.selectNodes("//SPAN[@ID $eq$ 'SHF1']").length);
	var oV=getLoadedXML(w.xView.xml), oD=getLoadedXML(oX.xml), oFD=getLoadedXML(w.fData.xml);
	var oView=oV.selectSingleNode('//(TABLE|DIV)[@ID="VIEWBLOCK"]');
	var oIns=oD.selectSingleNode('//TD[@ID="xslViewTarget"]');
	oIns.appendChild(oView);
	var s=oFD.transformNode(oD);
	wb.innerHTML=s;
	wd.all.VIEWBLOCK.style.display="block";
	if(w.fData.selectSingleNode('//STATUS')!=null && w.fData.selectSingleNode('//STATUS').text==20 && typeof(wd.all.VSubTitle)=='object') {wd.all.VSubTitle.innerText=w.fData.selectSingleNode('//NFB').text; w.fData.selectSingleNode('//NFB').text='';}
	if(window.IsDEBUG=='1') DoOnloadDebug(w);
	return;
}

function ResizeToVIEW(obj){
	var wd=obj.document,w=wd.parentWindow;
	if(!(wv=w.jsOwner))wv=w;
	if((obj.readyState!='complete')||(w.top.frames.length>0))return
	fnInitSHH(w.document.all,"SHF1","SHH");
	if(!w.jsOwner)return
	var wda=wd.all,oV=wda.FORSCREEN,Wo,Ho,Ws=window.screen.width,Hs=window.screen.height-27;
	Wo=oV.scrollWidth+50;
	Ho=oV.scrollHeight+60;
	Ww=(Wo<Ws)? Wo : Ws;
	Hw=(Ho<Hs)? Ho : Hs;
	if(w.dialogWidth!=null){
		w.dialogWidth=Ww+'px';
		w.dialogHeight=Hw+'px';
	}
	else{
		w.resizeTo(Ww,Hw);
		w.moveTo((Ws-Ww)/2,(Hs-Hw)/2);
	}
	wda.PrintView.style.visibility="visible";
}

function checkReadyJS(w){
	if(w.SCHMJS.readyState=="complete"||w.SCHMJS.readyState=="loaded"){
		w.clearInterval(w.oInterval);
		if(typeof(w.processPrintForm)=='function' || typeof(w.processPrintForm)=='object') w.processPrintForm(w,w.fData);
		else if(typeof(w.jsOwner.stmprocessPrintForm)=='function' || typeof(w.jsOwner.stmprocessPrintForm)=='object') w.jsOwner.stmprocessPrintForm(w,w.fData);
		else w.jsOwner.processPrintForm(w,w.fData);
		CompletePrint(w);
		return;
	}
	else{
		w.clearInterval(w.oInterval);
		w.oInterval=w.setInterval('Top.checkReadyJS(w);',100);
	}
}

function CompletePrint(w){
	if(!bAX)placeMsg(GetErrMessage('0|5=0:'+LRnoAX10+'[BR]'+LRnoAX17),w)
	var wda=w.document.all;
	if (typeof(wda.MESSAGELOG)=='object') {//на время печати убираем(или обнуляем) окно с сообщениями, если есть
		var msgl=wda.MESSAGELOG.style,s=msgl.display;
		if (s=='none') wda.MESSAGELOG.outerHTML=''
		else msgl.display="none";
		w.print();
		if(s=='block'){msgl.display="block";}
	}
	else w.print();
	w.focus();
	if(window.bVIEWPRN){
		var xP=w.document.all.xslPrintTarget;
		if(xP!=null) xP.style.display="block";
	}
}

function fnPrintFromView(w,s){
	var Err, wda=w.document.all, xPT=wda.xslPrintTarget, xPrint=w.xPrint, fData=wda.fData;
	if(xPT.innerHTML==''){
		xPrint.async=false;
		xPrint.load(s);
		if(xPrint.readyState=="complete"){
			Err=CheckXML4ParseError(xPrint,false);
			if(Err!=''){
				// Это все происходит в модальном окне, поэтому выводим CСОО прямо в документ
				wda.ERRORTD.innerHTML=Err;
				return;
			}
			xPT.innerHTML=fData.transformNode(xPrint.XMLDocument);

			var cSB=fData.selectNodes('//SIGNSBLOCK');
			try{
				if(cSB.length==1) wda.SIGNSBLOCK.innerHTML=cSB[0].transformNode(wda.xsSignBlock.XMLDocument);
			}catch(e){}
		}
	}
	if(fData.selectSingleNode('//BXD/DROW/KVITBLOCK')!=null && xPT.innerHTML!=''){
		if(typeof(xPT.all.PrnKvit)!='object'){
			xPrint.async=false;
			xPrint.load('../scheme/kvit/kvit_print_russian.xsl');
			if(xPrint.readyState=="complete"){
				Err=CheckXML4ParseError(xPrint,false);
				if(Err!=''){
					wda.ERRORTD.innerHTML=Err;
					return;
				}
				xPT.innerHTML=xPT.innerHTML+fData.transformNode(xPrint.XMLDocument);
			}
		}
	}
	try{
		var sName=fData.selectSingleNode('//BXD/DROW/@SCHEMENAME').text.toLowerCase();
		if (typeof(w.SCHMJS)!='object'){
			var oS=w.document.createElement('SCRIPT'), oH=w.document.getElementsByTagName('HEAD')(0);
			oS.id='SCHMJS';
			if(sName=="crypto")
				oS.src='../scheme/'+sName+'/'+sName+'_reply.js';
			else
				oS.src='../scheme/'+sName+'/'+sName+'.js';
			oH.appendChild(oS);
			w.oInterval=w.setInterval('Top.checkReadyJS(w);',100);
		}
		else{
			if(typeof(w.processPrintForm)=='function' || typeof(w.processPrintForm)=='object') w.processPrintForm(w,fData);
			else if(typeof(w.jsOwner.stmprocessPrintForm)=='function' || typeof(w.jsOwner.stmprocessPrintForm)=='object') w.jsOwner.stmprocessPrintForm(w,fData);
			else w.jsOwner.processPrintForm(w,fData);
			CompletePrint(w);
		}
	}catch(e){}
}

function WrapS(sHtml){return ('<DIV ID="INFOMESS">' + sHtml + '</DIV>')}


// Initialization
var sCLSS='try{CLSS.src=clssURL}catch(e){};';
window.onbeforeunload=new Function(sCLSS); // Этот handler привязывается в самом начале до привязки основного handlera
// Finalization
if(window.bWasLoaded==null)window.bWasLoaded=true;
else AsignFrameAliases(window);

function setFilterStatus(w,b){
	try{
		if(b){
			var fi=w.da.ScData.selectSingleNode("DOCS/@FILTERIDENT").text;
			var sCompare=w.FilterForm.FNAME.value+fi+
				w.xLRs.selectSingleNode('//C/FILTERAPPLY/@V').text+w.xLRs.selectSingleNode('//C/FILTERREMOVE/@V').text;
			if((fi=='ALL' || fi=='VISAALL' || fi=='ALL-B2BIN') && w.defFilterVals.join('')==sCompare)
				w.FilterStatusBar.innerText=w.xLRs.selectSingleNode('//C/FILTER_STATUSINFO1/@V').text;
			else
				w.FilterStatusBar.innerText=w.xLRs.selectSingleNode('//C/FILTER_STATUSINFO2/@V').text;
			Top.Restore(w,w.FilterStatusBar);
		}
		else{
			w.FilterStatusBar.innerText=w.xLRs.selectSingleNode('//C/FILTER_STATUSINFO3/@V').text;
			Top.Hilite(w,w.FilterStatusBar);
		}
	}catch(e){}
}

function setDefFilterVals(w){
	w.isDefVals=true;
	w.defFilterVals=new Array();
	try{
		for(i=0; i<w.FilterForm.length; i++)
			w.defFilterVals[i]=w.FilterForm.elements[i].value;
		//setFilterStatus(w,w.isDefVals);
	}catch(e){};
}
function setSvdFilterVals(w){
	w.FilterForm.isSvdVals=true;
	w.svdFilterVals=new Array();
	try{
		for(i=0; i<w.FilterForm.length; i++)
			w.svdFilterVals[i]=w.FilterForm.elements[i].value;
	}catch(e){};
}

function chkSvdFilter(w){
	AsignFrameAliases(w);
	w=w.mw;
	if(w.FilterForm.isSvdVals==null) return false;
	w.FilterForm.isSvdVals=true;
	var ff=w.document.all.FilterForm;
	try{
		for(i=0; (w.FilterForm.isSvdVals) && i<ff.elements.length; i++)
			if(ff.elements[i].name!='isSvdVals' && w.svdFilterVals[i]!=ff.elements[i].value)	w.FilterForm.isSvdVals=false;
	}catch(e){w.FilterForm.isSvdVals=false};
	return (w.FilterForm.isSvdVals);
}
function checkFilter(w){
	chkSvdFilter(w);
	AsignFrameAliases(w);
	w=w.mw;
	w.isDefVals=true;
	var ff=w.document.all.FilterForm;
	try{
		for(i=0; w.isDefVals && i<ff.elements.length; i++)
			if(ff.elements[i].name!='FNAME' && ff.elements[i].name!='isSvdVals' && w.defFilterVals[i]!=ff.elements[i].value)	w.isDefVals=false;
	}catch(e){w.isDefVals=false};

	setFilterStatus(w,w.isDefVals);
	return (w.isDefVals);
}

function checkResponse(w,XMLHTTP){
	var oX=XMLHTTP.responseXML;
	var RCode=parseInt(XMLHTTP.getResponseHeader("RCode"),10); if(isNaN(RCode))RCode=0;
	if(RCode < 0){
		var ErrMsg=XMLHTTP.responseText; 
		if(!ErrMsg.match(/^</)) Top.placeMsg(UndefinedError(ErrMsg),w);
		else{
			ErrMsg=Top.GetSTErrorFromXML(oX,false);
			if(ErrMsg!='') Top.placeMsg(ErrMsg,w);
			else Top.placeMsg(UndefinedError(XMLHTTP.responseText),w);
		}
		return null;
	}
	var ErrMsg=GetSTErrorFromXML(oX,false);
	if(ErrMsg!=''){
		Top.placeMsg(ErrMsg,w);
		return null;
	}
	else return oX;
}

function GNP(sX,q){
	var oX=new ActiveXObject(XMLDOM_ID),oN=oN2=null;
	oX.loadXML(sX);
	oN=oX.selectNodes('/Signs/Sign');
	oN3=oN.item(q-1).cloneNode(true);
	oN2=oX.documentElement;
	for(var i=0;i<oN.length;i++)oN2.removeChild(oN.item(i));
	oN2.appendChild(oN3);
	return oX.xml;
}
function CheckDoc(mw){
	if(mw==null) mw=Top.mw;
	var dlh=document.location.hostname;
	if(Top.isAlertNoAX('\n'+Top.LRnoAX13)) return false;
	Top.InitObjectsAliases(mw);
	var XMLHTTP=null,sSch=mw.df.SCHEMENAME.value,S=mw.da.SCROLLER,sOut='',jOut='';
	mw.jOut='';
	if(sSch=='PAYDOCRUVISA'){
		sSt=da.SCROLLER.rows(da.SCROLLER.lstr).all.ST.innerText;
		switch(sSt){
			case '371':case '373':case '375':case '400':case '401':case '402':case '501':case '6001':case '601':case '701':break;
			default:
				placeMsg(GetErrMessage('0|1=0:'+LRSSig30,false),mw);
				return false;
		}
	}
	XMLHTTP=new ActiveXObject(XMLHTTP_ID);
	XMLHTTP.Open("POST",XMLScriptPath,false);
	var s1=ClearSelectionButFirstIDR(S);
	if(s1==''){fnHlp(mw); return false;}
	XMLHTTP.setRequestHeader("Rts-Request",'t=rt_2ic.GetSignAndDataFromRec&FILTERIDENT='+mw.df.FILTERIDENT.value+'&IDR='+s1+'&SID='+Top.SID+'&SCHEMENAME='+sSch+((mw.df.DocTypeId!=null)?'&DocTypeId='+mw.df.DocTypeId.value:''));
	XMLHTTP.Send(GetSimpleXML_1251('X'));
	if (XMLHTTP.readyState==4){
		var MCr=nv.MyCrypto, MIm=nv.MyImport, MCrLastError='';
		var dlh=(top.bSSL==1)?'':dlh, cUID, bVerify, bBCerLoaded=false;
		var bEngineCompatible,curLibID,sigLibID;
		var oX=checkResponse(mw,XMLHTTP);
		if(oX!=null){
			if(ReloadSignConf(mw)){
				var iS=oX.selectNodes('/R/S').length,s,d='',cU,sDN,mCer;
				var c=Top.SignConf.selectNodes('/Signs/Sign');
				for(i=1;i<=iS;i++){
					bVerify=false;
					bEngineCompatible=false;
					I=oX.selectNodes('/R/S').item(i-1).attributes.getNamedItem('I').nodeValue;
					s=oX.selectSingleNode('/R/S[@I='+I+']/P[@I=1]').text;
					d=oX.selectSingleNode('/R/S[@I='+I+']/P[@I=2]').text;
					var bVerifyOK = false, sOutErr='';
					curLibID='';
					for(var j=1;j<=c.length;j++){
						MCr.XMLCryptoParamsData=GNP(Top.SignConf.xml,j);
						curLibID=Top.SignConf.selectNodes('/Signs/Sign').item(j-1).selectSingleNode('@Engine').text;

						if(oX.selectSingleNode('/R/Certs/FromDoc')!=null){
							var crt=oX.selectNodes('/R/Certs/FromDoc/Certs/Cert');
							for(var k=0;k<crt.length;k++){
								sDN=crt[k].selectSingleNode('@Name').text;
								mCer=crt[k].selectSingleNode('@CData').text;
								sigLibID=crt[k].selectSingleNode('@LibID').text;
								if(mw.bB2B && !bVerify && MCr.CheckEngineCompatibles(curLibID,sigLibID)==1) bEngineCompatible=true;
								if(mCer!='')if(!MCr.ImportCryptoObject('',11,0,mCer));// alert('Message from component Crypto for ImportCryptoObject:\n'+MCr.LastError);
							}
						}
						if(!mw.bB2B || bEngineCompatible){
							if(MCr.VerifyMimeData(dlh, d, s)){
								bVerify=true; MCrLastError=''; break;
							}
							else{
								MCrLastError=MCr.LastError;
							}
						}
					}

					if(!bVerify){ 
						for(j=1;j<=c.length;j++){
							MCr.XMLCryptoParamsData=GNP(Top.SignConf.xml,j);
							cUID=MCr.GetCurrentUserUID(dlh);

							var xCerts=oX.selectSingleNode('/R/Certs');
							if(xCerts!=null){
								var xPKeys=xCerts.selectNodes('PKey/UID[@Engine="'+ c.item(j-1).selectSingleNode('@Engine').text +'"]');
								for(var x=0; x<xPKeys.length; x++){
									s1=xPKeys.item(x);
									if(s1!=null && s1.selectSingleNode('@U').text!=cUID){
										if(MCr.IncludePublicKeyTransfer(dlh,s1.text)){
											if(MCr.VerifyMimeData(dlh, d, s)){
												bVerify=true; 
												MCrLastError=''; 
												break;
											}
											else{MCrLastError=MCr.LastError;}
										}
									}
								}
								if(bVerify)
									break;
							}

							if(!bVerify && !mw.bB2B){
								s1=oX.selectSingleNode('/R/Certs/BankPKey[@Engine="'+ c.item(j-1).selectSingleNode('@Engine').text +'"]');
								if(s1!=null){
								  var sDBcert=s1.selectSingleNode('@DBcert').text;
									if(sDBcert==0){
										alert(LRSSig50);
										MIm.FileName='bank.cer';
										if(MIm.SelectFile(false,2)){
											MIm.Data=Top.nv.MyTools.UnMime(s1.text);
											if(MIm.Save()){
												if(!MCr.IncludePublicKey(dlh,MIm.FileName))
													alert('Message from component Crypto (for BankKey):\n'+MCr.LastError);
											}
											else alert('Message from component Import (for BankKey):\n'+MIm.ErrorMessage);
										}
										if(MCr.VerifyMimeData(dlh, d, s)) {bVerify=true; MCrLastError='';}
										else{MCrLastError=MCr.LastError;}
									}
								}
							}
						}
					}	

					if(bVerify||top.bDemo){
						cU=MCr.CurrentUID;
						if(top.bDemo){
							if(oX.selectNodes('/R/U').item(i-1)==null) break;
							cU=oX.selectNodes('/R/U').item(i-1).attributes.getNamedItem('U').nodeValue;
						}
						var r=0;
						if(oX.selectSingleNode('/R/U[@U="'+cU+'"]')){
							sDN=oX.selectSingleNode('/R/U[@U="'+cU+'"]/@D').nodeValue;
							r=oX.selectSingleNode('/R/U[@U="'+cU+'"]/@R').nodeValue;
						}
						sOut+='<BR/>\n0|7=0:'+LRSSig15+I+'<BR/>';
						sOut+='<BR/>'+LRSSig17+'<B>'+sDN+'</B>';
						sOut+='<BR/>'+LRSSig23+'<B>'+cU+'</B>';
						sOut+='<BR/>'+LRSSig18+'<BR/>';
						if(!mw.bB2B){
							sOut+=LRSSig20;
							if(r!='0'){
								sT=LRSSig24+'<B>';rst=LRSSig22.split('|');
								if((I==1)&&(r.indexOf('2')>=0))sT+=rst[0];
								else if((I==1)&&(r.indexOf('3'))>=0)sT+=rst[1];
								else if((I==2)&&(r.indexOf('4'))>=0)sT+=rst[2];
								else if((I==3)&&(r.indexOf('5'))>=0)sT+=rst[3];
								else sT=LRSSig27+'<B>'+rst[I];
								sOut+=sT+'</B>'+LRSSig21+'<BR/>';
							}else sOut+='<B>'+LRSSig25+'</B><BR/>';
						}
						bVerifyOK = true;
					}else{
						if(mw.bB2B && !bEngineCompatible){
							cU=MCr.CurrentUID;
							sOut+='<BR/>\n0|7=0:'+LRSSig15+I+'<BR/>';
							sOut+='<BR/>'+LRSSig17+'<B>'+sDN+'</B>';
							sOut+='<BR/>'+LRSSig23+'<B>'+cU+'</B>';
							sOut+='<BR/>'+LRSSig31+'<BR/>';
						}
						else{
							if(oN=Top.SignConf.selectSingleNode('//Signs/ERROR')){
								placeMsg(GetErrMessage('0|2='+oN.text,false),mw);
								return false;
							}
							if(j>c.length) j=c.length;
							var sText=Top.SignConf.selectSingleNode('/Signs/Sign[index()='+(j-1)+']/@DisplayName').text
							sOutErr+='<BR/>'+LRSSig19+sText;
							jOut+='\n'+LRSSig19+sText;
							sText=((MCr.LastError!='')?MCr.LastError:MCrLastError);
							sOutErr+='<BR/>'+LRSSig16+sText+'<BR/>';
							jOut+='\n'+LRSSig16+sText+'\n';
						}
					}
					if(!bVerifyOK) sOut+=sOutErr;
				}

				//ACCEPTION
				var oAcc=oX.selectSingleNode('/R/Acception'),s,d='';
				if(oAcc!=null){
					bVerify=false;
					bEngineCompatible=false;
					s=oAcc.selectSingleNode('S[@I=1]/P[@I=1]').text;
					d=oAcc.selectSingleNode('S[@I=1]/P[@I=2]').text;
					sDN=oAcc.selectSingleNode('Certs/Cert/@Name').text;
					cU=oAcc.selectSingleNode('Certs/Cert/@UID').text;
					mCer=oAcc.selectSingleNode('Certs/Cert/@CData').text;
					curLibID='',sigLibID=oAcc.selectSingleNode('Certs/Cert/@LibID').text;
				
					for(j=1;j<=c.length;j++){
						MCr.XMLCryptoParamsData=GNP(Top.SignConf.xml,j);
						curLibID=Top.SignConf.selectNodes('/Signs/Sign').item(j-1).selectSingleNode('@Engine').text;
						if(mw.bB2B && !bVerify && MCr.CheckEngineCompatibles(curLibID,sigLibID)==1) bEngineCompatible=true;
						if(mCer!='')if(!MCr.ImportCryptoObject('',11,0,mCer));// continue;
						if(MCr.VerifyMimeData(dlh, d, s)){bVerify=true; break;}
					}
				
					sOut+='<BR/>\n0|7=0:'+LRSSig40+'<BR/>';
					jOut+='\n'+LRSSig40+'\n--------------------------------------------------';
					sOut+='<BR/>'+LRSSig17+'<B>'+sDN+'</B>';
					jOut+='\n'+LRSSig17+''+sDN+'';
					sOut+='<BR/>'+LRSSig23+'<B>'+cU+'</B>';
					jOut+='\n'+LRSSig23+''+cU+'';
					if(mw.bB2B && !bEngineCompatible){
						sOut+='<BR/>'+LRSSig31+'<BR/>';
						jOut+='\n'+LRSSig31+'';
					}
					else if(bVerify){
						sOut+='<BR/>'+LRSSig18+'<BR/>';
						jOut+='\n'+LRSSig18+'';
					}
					else{
						sOut+='<BR/>'+LRSSig16+MCr.LastError+'<BR/>';
						jOut+='\n'+LRSSig16+MCr.LastError+'';
					}
					bVerifyOK=bVerify;
				}

				if(sSch=='STM') sOut=LRSSig14stm+sOut;
				else sOut=LRSSig14+sOut;
				placeMsg(GetErrMessage('0|0=0:'+sOut,false),mw);
				mw.jOut = jOut;
				
				return bVerifyOK;
			}
		}
	}
}

function getDocXML(w,SN,IDR,kvit){
	var dlh=(top.bSSL==1)?'':document.location.hostname;
	if(Top.isAlertNoAX('\n'+Top.LRnoAX13)) return;
	Top.InitObjectsAliases(mw);
	var XMLHTTP=null,sOut='';
	if(IDR==null || IDR=='') IDR=ClearSelectionButFirstIDR(w.da.SCROLLER);
	if(IDR==''){fnHlp(mw); return;}
	if(SN==null || SN=='') SN=w.df.SCHEMENAME.value;

	XMLHTTP=new ActiveXObject(XMLHTTP_ID);
	XMLHTTP.Open("POST",XMLScriptPath,false);
	XMLHTTP.setRequestHeader("Rts-Request",'t=rt_2ic.getDocXML&FILTERIDENT='+mw.df.FILTERIDENT.value+'&IDR='+IDR+'&SID='+Top.SID+'&SCHEMENAME='+SN+((mw.df.DocTypeId!=null)?'&DocTypeId='+mw.df.DocTypeId.value:'')+((kvit!=null)?kvit:'') + '&tms='+fnRnd());
	XMLHTTP.Send(GetSimpleXML_1251('X'));
	if(XMLHTTP.readyState==4){
		var oX=checkResponse(w,XMLHTTP);
		if(oX!=null){
			if(kvit!=null && kvit!=''){
				var oChXML=new ActiveXObject(XMLDOM_ID);
				oChXML.loadXML(oX.selectSingleNode('R/KVITBLOCK').xml);
				if(w.fData.selectSingleNode('//DROW/KVITBLOCK')!=null)
					w.fData.selectSingleNode('//DROW').replaceChild(oChXML.selectSingleNode('KVITBLOCK'),w.fData.selectSingleNode('//DROW/KVITBLOCK'));
				else if(w.fData.selectSingleNode('//DROW')!=null)
					w.fData.selectSingleNode('//DROW').appendChild(oChXML.selectSingleNode('KVITBLOCK'));
				Top.showMD(w,'../scheme/kvit/kvitsave_form_',600,180);
			}
			else{
				var MIm=(w.MyImport==null)?Top.nv.MyImport:w.MyImport;
				MIm.FileName=oX.selectSingleNode('R/@DN').text+'\\'+oX.selectSingleNode('R/@FN').text;
				if(MIm.SelectFile(false,2)){
					MIm.Data=oX.selectSingleNode('R').text;
					MIm.Save();
				}
			}
		}
	}
}

function setInputDisabled(w, obj, disabled, clean){
	if(obj.tagName=='SELECT'){
		if(clean){
			obj.value='';
			try{w.fD.selectSingleNode('//'+obj.dataFld).text='';}catch(e){}
		}
		var oSpan=w.document.all.item(obj.name+'span');
		if(disabled){
			if(oSpan==null){
				oSpan=w.document.createElement("SPAN");
				obj.parentElement.insertBefore(oSpan,obj);
				with(oSpan){
					id=obj.name+'span';
					className='InpDsbD0';
					if(obj.style.width=='') style.width=obj.offsetWidth;
					else style.width=obj.style.width;
				}
			}
		}
		if(oSpan!=null){
			oSpan.style.display=(!disabled)?'none':'inline';
			if(obj.selectedIndex>=0) oSpan.innerText=obj[obj.selectedIndex].innerText;
		}
		obj.style.display=(disabled)?'none':'inline';
	}
	else if(obj.tagName=='BUTTON' || obj.type=='checkbox' || obj.type=='radio'){
		obj.disabled=disabled;
		obj.style.cursor=disabled?'default':'hand';
	}
	else if(obj.tagName=='IMG'){
		var s;
		if(disabled){
			s=obj.getAttribute('onclick')
			if(s!=''){
				obj.setAttribute('_onclick',s);
				obj.setAttribute('onclick','');
			}
		}else{
			s=obj.getAttribute('_onclick')
			if(s!='' && s!=null) obj.setAttribute('onclick',s);
		}
		obj.style.filter=(disabled)?'alpha(opacity:40)':'';
		obj.style.cursor=disabled?'default':'hand';
	}
	else{
		obj.readOnly=disabled;
		obj.className=(disabled)?'InpDsbD0':'elm-inp';
		if(disabled){
			obj.tabIndexDef=obj.tabIndex;
			obj.tabIndex='-1';
		}
		else
			obj.tabIndex=(typeof(obj.tabIndexDef)=='number')?obj.tabIndexDef:0;
		if(clean) obj.value='';
	}
}

function ShHPair(coll,h,s){
	coll[h].style.display='none';
	coll[s].style.display='inline';
}

function insPageBr(coll){
	for(j=1;j<coll.length;j++){
//		coll(j).insertAdjacentText('afterBegin',' ');
		var oNewItem = document.createElement("DIV");
		oNewItem.style.height='0';
		oNewItem.style.lineHeight='0';
		oNewItem.innerText=' ';
		coll(j).insertAdjacentElement('afterBegin',oNewItem);
		coll(j).style.pageBreakBefore='always';
	}
}

function dotStrToDate(dotStr){
	var inStr=dotStr.replace(/(\d+).(\d+).(\d+)/, '$2-$1-$3');
	return Date.parse(inStr);
}

function getCookie(sName){
	// cookies are separated by semicolons
	var aCookie = document.cookie.split("; ");
	for (var i=0; i < aCookie.length; i++){
		// a name/value pair (a crumb) is separated by an equal sign
		var aCrumb = aCookie[i].split("=");
		if (sName == aCrumb[0])
			return unescape(aCrumb[1]);
	}
	// a cookie with the requested name does not exist
	return null;
}

function getRadioValue(coll){
	if(coll.length==null){
		if(coll.checked) return(coll.value);
	}
	else {
		for(i=0;i<coll.length;i++)
			if(coll[i].checked) return(coll[i].value);
	}
	return null;
}

var timeRefreshInt=5;
function newtime(blt,secs){blt.setSeconds(blt.getSeconds()+secs);}
function showtime(dBLT,obj){
	if(obj!=null){
		if(dBLT.getFullYear()!='1899' && dBLT.getFullYear()!='1900'){
			var date=''+dBLT.getDate(); if(dBLT.getDate()<10) date='0'+date;
			var mon=''+(dBLT.getMonth()+1); if(dBLT.getMonth()<9) mon='0'+mon;
			var mins=''+dBLT.getMinutes(); if(dBLT.getMinutes()<10) mins='0'+mins;
			var secs=''+dBLT.getSeconds(); if(dBLT.getSeconds()<10) secs='0'+secs;
			obj.innerText=date+'.'+mon+'.'+dBLT.getFullYear()+' '+dBLT.getHours()+':'+mins;//+':'+secs;
		}
	}
}
function refreshtime(dBLT,obj){
	newtime(dBLT,timeRefreshInt);
	showtime(dBLT,obj);
}
add_M('c_common');
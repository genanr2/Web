function p_enbl(i){mda.nex.disabled=(i)?true:false;}
function p_e(s,p){
	if(p)return
	sH=GetErrMessage(s)
	sJ=GetErrMessage(s,1)
	top.DoInfo((sJ=='')?s:sJ,(sH=='')?null:sH);
}
function p_c(o){
	if(o.checked){
		var oX=top.GetSimpleXML_1251('Signs')
		w.wU=o.getAttribute('UID');
		oX2=new ActiveXObject(top.XMLDOM_ID);
		oX2.loadXML(top.SC.selectSingleNode('/Signs/Sign[@UID="'+w.wU+'"]').xml)
		oX.documentElement.appendChild(oX2.documentElement.cloneNode(true))
		top.MyCrypto.object.XMLCryptoParamsData=oX.xml;
	}
}
function p_k(){p_e(Top.p_L7,1);timr = setTimeout("top.close()",500);}
function p_s(){
	var oMS=top.MyCrypto.object,i=0;top.swm();oMS.ClearCash();oMS.FreeCryptoEngine();
	var s=getStrForSign();
	if(s=='falseData') return;
	
	FSg=oMS.Sign('',s);top.hwm();
	if(((!FSg)||(parseInt(oMS.LastErrorCode)>0))&&(!top.bDemo)){
		var s,m=oMS.LastError;
		if(m!='') s=Top.p_L1.replace("[BR]","\n")+m+').';
		else s=Top.p_L7
		p_e(s)
	}else{
		sU=(top.bDemo)?Top.XMLhexDecode(w.wU):oMS.CurrentUID;
		i=sU.indexOf('\x00');
		sU=(i>0)?sU.slice(0,i):sU;
		if(sU==Top.XMLhexDecode(w.wU)){
			var oXH,oN2,oN;
			oN=Top.GetSimpleXML_1251('R');
			oN2=oN.createNode(1,'S','');
			oN2.text=oMS.SignData;
			oN.documentElement.appendChild(oN2);
			oN2=oN.createNode(1,'U','');
//			oN2.text=sU;
			oN2.text=Top.XMLhexEncode(sU);
			oN.documentElement.appendChild(oN2);
			w.bSnd=true;
			p_enbl(1);
			SendXMLSwitch='PrivateXML';
			top.swm();
			SendXML('top.p_enbl(1);resumerXH',window,'Auth',oN,"t="+top.LoaderBll+".Load&SID="+top.SID+"&Step=5&L="+top.LanguageID);
		}
		else p_e(Top.p_L5);
	}
	oMS.ClearCash();
	oMS.FreeCryptoEngine();
}
function p_RST(oRX){
	if(oE=oRX.selectSingleNode('/R/PARAMS')){AddTopParams(oE)}
	if(top.bAuthX){
		top.mw_cont=oRX;
		var oE=oRX.selectSingleNode('/R/R[@id="SKI"]');
		if(oE) Top.xC('SKI','R',oE);
		n(7);
	}
	else{
		top.mw_cont=oRX;
		top.n(8);
	}
}

function hideSt(b){
	function shr(s){with(mda('r'+s)){cells(0).style.visibility=cells(1).style.visibility=(b)?'visible':'hidden';}}
	shr('1');shr('2');shr('3');
	mda.r4.all.ly.innerText=(b)?Top.st[12]:Top.st[23];
}
function p_X(o){
	w.wP=o.getAttribute('Prf');
	w.Top.wP=w.wP;
	var bP=top.SC.selectSingleNode('/Signs/Sign[@ProfileID="'+w.wP+'"]');
	var bPP=bP.selectSingleNode('Params/Param');
	mda.gen.style.visibility=mda.genT.style.visibility=(bP.selectSingleNode('Params/Request/@D')||bPP||o.generated=='1')?'hidden':'visible';
	mda.prn.style.visibility=mda.prnT.style.visibility=(/*bP.selectSingleNode('Params/Request[@D="601"]')&&*/(oSC=bP.selectSingleNode('SelfCert')))?'visible':'hidden';
	var b=(bP.selectSingleNode('Params/Request[@E="1"]')||bPP);
	mda.idx_.style.display=(b)?'inline':'none';
	mda.btnOk_.style.display=(b)?'none':'inline';
}
function p_P(dw){
	var CUID=top.SC.selectSingleNode('/Signs/Sign[@ProfileID='+w.wP+']/@UID').text;
	if(oN=top.SC.selectSingleNode('/Signs/Sign[@ProfileID='+w.wP+']/SelfCert')){
		var URL=Top.scriptPath+'?T=RT_1Loader.Load&nvgt=1&SID='+Top.SID+'&step=41&ACT=ACT&CryptoUID='+((CUID!='')?CUID:'PID:'+w.wP)+(w.noBack?'&NB=1':'')+'&TMS='+Top.fnRnd();
		r=window.showModalDialog(URL,dw,"dialogWidth=750px; dialogHeight=600px; center=1; help=0; border=thin; status=0; maximize=0; minimize=0;");
	}else alert(LRSGen3);
}
function p_SP(w,s,oXH,p){
	var oX=oXH.responseXML;
	w.sSR=false;
	if(oXH.getResponseHeader("RCode")==7){
		switch(s){
			case 'GKP':
				w.sSK=oX.documentElement.attributes.getNamedItem('K').nodeValue
				w.sSR=oX.documentElement.attributes.getNamedItem('V').nodeValue
				w.bNR=oX.documentElement.attributes.getNamedItem('M').nodeValue=='0'
				break;
			case 'CHS':
				w.sSR=(oX.documentElement.nodeName=='R');
				break;
		}
	}
	w.sSErH=GetSTErrorFromXML(oX,false);
	w.sSErJ=GetSTErrorFromXML(oX,true);
}

function lpad(n) {
	var pd = n.toString(16);
	while (pd.length < 8) {pd='0'+pd;}
	return pd.toUpperCase();
}

function mN(oN,sN,sV){var oN2=oN.createNode(1,sN,'');oN2.text=sV;oN.documentElement.appendChild(oN2)}
function p_G(dw,b){
	var oPX=top.SC.selectSingleNode('/Signs/Sign[@ProfileID='+w.wP+']'),iL=oPX.selectSingleNode('@Engine').nodeValue;
	if(oPX.selectSingleNode('Params/Request/@D')){
		alert(LRSGen2);
		return;
	}

	if(!b){
		var URL=Top.scriptPath+'?t=rt_1Loader.Load&SID='+Top.SID+'&step=41&ACT=NEW&tms='+Top.fnRnd();
		r=window.showModalDialog(URL,dw,"dialogWidth=650px; dialogHeight=500px; center=1; help=0; border=thin; status=0; maximize=0; minimize=0;");
		if(r=='1'){alert(LRSGen1); p_R();}
		else if(r=='5'){alert(LRSGen5);}
		else{
			if((!w.sSR)&&(w.sSErJ)&&(w.sSErH))DoInfo(w.sSErJ,w.sSErH)
		}
	}
}
function p_R(){
		for(i=0;i<mda.mX.rows.length;i++){
			oC=mda.mX.rows.item(i);
			if(oC.getAttribute('Prf')==w.wP){
				oC.cells.item(1).innerText=LRSGenSt2;
				oC.cells.item(0).all.IN.setAttribute('generated','1');
				p_X(oC.cells.item(0).all.IN);
			}
		}
}
function p_l(b){
	if(b){
		top.ReloadSignConf(w,null,null);
		sEh=GetSTErrorFromXML(top.SignConf,false);
		sEj=GetSTErrorFromXML(top.SignConf,true);
		if((sEh+sEj)!=''){DoInfo(sEj,sEh);return}
		else{
			top.SC.loadXML(top.SignConf.xml)
			l=mda.Scr.documentElement.childNodes.length;
			for(i=0;i<l;i++){mda.Scr.documentElement.removeChild(mda.Scr.documentElement.firstChild)}
			mda.mS.cells(0).innerHTML=w.tX;
			mda.mS1.innerHTML=w.tX1;
			hideSt(1)
		}
	}
	var oN=top.SC.selectSingleNode('/Signs/ERROR'),i;
	if(!oN){
		oN=top.SC.selectNodes('/Signs/Sign')
		var bHideSt=false;
		for(i=0;i<oN.length;i++){
			mda.Scr.documentElement.appendChild(oN.item(i).cloneNode(true));
			if(!oN.item(i).selectSingleNode('Params/Param')) bHideSt=true;
		}
		if(!bHideSt||b){
			mda.mX.style.display='none'
			mda.mS.style.display='none'
			mda.mT.style.display='block'
			oN=top.SC.selectNodes('/Signs/Sign');
			mda.mS.style.display='block'
			mda.mB.style.display='block'
			mda.mBX.style.display='none'
			oS=mda.mT.rows(0).cells(0)
			if(oN.length==1)oS.all.prf.disabled=true
			for (i=oN.length-1;i>-1;--i){
				oT=mda.mT.insertRow(0);
				oC=oT.appendChild(oS.cloneNode(true))
				oC.all.t.innerText=Top.XMLhexDecode(oN.item(i).attributes.getNamedItem('DisplayName').nodeValue);
				oC.all.prf.setAttribute('UID',oN.item(i).attributes.getNamedItem('UID').nodeValue);
				oC.all.prf.setAttribute('id',oC.all.prf.getAttribute('id')+i);
				oC.all.l.setAttribute('htmlFor',oC.all('prf'+i).getAttribute('id'));
				oT.style.display='block';
			}
			mda.mT.rows(0).all.IN.checked=true;
			p_c(mda.mT.rows(0).all.IN);
			p_enbl();
			mda.nex.focus();
		}else{
			hideSt()
			w.tX=mda.mS.cells(0).innerHTML;
			mda.mS.cells(0).innerHTML=LRSGen0;
			w.tX1=mda.mS1.innerHTML;
			mda.mS1.innerHTML=mda.mS1g.innerHTML;mda.mS1g.innerHTML='';
			mda.mS.style.display='block'
			mda.mT.style.display='none'
			mda.mX.style.display='block'
			oN=mda.Scr.documentElement.childNodes;
			oS0=mda.mX.rows(0).cells(0)
			oS1=mda.mX.rows(0).cells(1)
			for(i=oN.length-1;i>-1;--i){
				oT=mda.mX.insertRow(0);
				oC=oT.appendChild(oS0.cloneNode(true))
				oC.all.t.innerText=Top.XMLhexDecode(oN.item(i).attributes.getNamedItem('DisplayName').nodeValue);
				iP=oN.item(i).attributes.getNamedItem('ProfileID').nodeValue
				oC.all.prf.setAttribute('Prf',iP);
				oT.setAttribute('Prf',iP);
				oC.all.prf.setAttribute('id',oC.all.prf.getAttribute('id')+i);
				oC.all.l.setAttribute('htmlFor',oC.all('prf'+i).getAttribute('id'));
				oC=oT.appendChild(oS1.cloneNode(true))
				mda.mX.rows(0).all.IN.checked=true;
				var oN2=oN.item(i).selectSingleNode('Params/Request/@S'),oN3=oN.item(i).selectSingleNode('Params/Param');
				oC.innerText=(oN3)?LRSGenSt3:((oN2)?'[ '+LRSGenSt0+': '+oN2.nodeValue+' ]':LRSGenSt1);
				oT.style.display='block';
			}
			mda.mB.style.display='none'
			mda.mBX.style.display='block'
			mda.prn.disabled=false
			mda.gen.disabled=false
			p_X(mda.mX.rows(0).all.IN)
		}
	}
	else {
		top.bPKI=0;
		sE=oN.text.replace(/^\n/,'')
		s=GetErrMessage(sE,0);
		if(s=='')s=Top.GetErrMessage('1|1=1111:'+sE,0)
		var sH='<DIV STYLE="height: 187px; overflow: auto; text-align: justify;">'+LRnoAX3+LRnoAX1;
		sH+='<BR/>&nbsp;<BR/>'+LRSGen4+s+'</DIV><BUTTON CLASS="stdBtn" STYLE="margin: 10 0 0 336px;" onclick="top.location.href=\'s/bsi.dll?t=RT_1loader.load\';">Ok</BUTTON>';
		mda.b3.innerHTML=sH;
		mda.b2.style.display='none';
		mda.b3.style.display='block';
	}
}
function GetEdit(w){
	var URL=top.scriptPath+'?T=RT_2ParamCry.GetFormForEditCrypto&XML=1&SID=' + top.SID;
	var retVal=window.showModalDialog(URL,w,"dialogWidth=750px; dialogHeight=530px; center=1; help=0; border=thin; status=0; maximize=0; minimize=0;");
	if(typeof(retVal)=='string'&&retVal=='OpenNewSession')w.top.Top.location=top.scriptPath+w.top.Top.OpenNewSessQ;
	else {
		if(top.Tls)return
		for(iC=0;iC<mda.IN.length;iC++){
			if (mda.IN(iC).checked){
				top.MyCrypto.ClearCash();
				top.MyCrypto.FreeCryptoEngine();
				p_c(mda.IN(iC));
			}
		}
	}
}

function fnSertReg(){
	top.DoInfo('');
	top.swm();
	var oCr=mda.MyCrypto,N=mda.SC.selectSingleNode('/Signs/ERROR');
	if(N){
		DoInfo(GetErrMessage(N.text,1),GetErrMessage(N.text));
	}else{
		oCr.XMLCryptoParamsData=mda.SC.xml;
		if(!oCr.InstallCertsInMyStore('','1.3.6.1.5.5.7.3.2') && oCr.LastError!=''){top.hwm();DoInfo(oCr.LastError,GetErrMessage('0|1=0:'+oCr.LastError));}
		else{
			var iRes = oCr.FunctionResult;
			top.hwm();
			if(iRes>0) DoInfo(t_LR2,GetErrMessage('0|6=0:'+t_LR2));
			if(iRes==0) DoInfo(t_LR3,GetErrMessage('0|6=0:'+t_LR3));
			if(iRes==-1) DoInfo(t_LR4+iRes,GetErrMessage('0|1=0:'+t_LR4+iRes));
			if(iRes<-1) DoInfo(t_LR5+iRes,GetErrMessage('0|1=0:'+t_LR5+iRes));
			if (iRes>=0){
				mda.BTN1.disabled=false;
			}
		}
	}
	top.hwm();
}

function getStrForSign(){
	var XHR=new ActiveXObject(Top.XMLHTTP_ID);
	var URL=top.XMLScriptPath+'?t=rt_1Loader.GetStrForSign&SID='+top.SID+'&RTSID='+top.sRTSID+'&uid='+w.wU+'&tms='+Top.fnRnd()
	XHR.open("GET",URL,false);
	XHR.send('');
	if(XHR.readyState==4){
		var oX=new ActiveXObject(Top.XMLDOM_ID);
		oX.async=false;
		oX.validateOnParse=false;
		oX.resolveExternals=false;
		oX.loadXML(XHR.responseXML.xml);

		var eH=top.GetSTErrorFromXML(oX,0);
		var eJ=top.GetSTErrorFromXML(oX,1);
		if(eH!=''||eJ!=''){
			DoInfo(eJ,eH);
			bHideInfo=false;
			top.hwm();
			return 'falseData';
		}
		return (oX.selectSingleNode('/R/S').text);	
	}
}

add_M('pkiauth');
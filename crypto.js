var O=null,isTLS=false,isNV=false, MCr, fD;
window.Crypto=true;
var arKDNames=['DISK','eToken','RuToken','iKey','PKCS11:\\RTPKCS11ECP','PKCS11:\\ETPKCS11G'];

function loadXSLForm(gt){
	var s="../scheme/crypto/crypto"+gt+"_form.xsl";
	cForm.async=false;
	cForm.load(s);
	if(cForm.readyState=="complete"){
		Err=Top.CheckXML4ParseError(cForm,false)+Top.GetSTErrorFromXML(fData,false);
		if(Err!=''){Top.HideToolBar(w); da.EDITFORM.style.display='none'; Top.placeMsg(Err,window);}
		else xslViewcFrom.innerHTML=fData.transformNode(cForm.XMLDocument);
	}
}

function getStatus(GT){
	switch (GT) {
		case '-2':	return PLRASt1; break;
		case '-1':	return PLRASt2; break;
		case '0':
		case '1':	return PLRASt3; break;
		case '01':
		case '101':	return PLRASt4; break;
		case '02':
		case '102':	return PLRASt5; break;
		case '00':
		case '10':	return PLRASt6; break;
		case '11':	return PLRASt7; break;
		case '12':	return PLRASt8; break;
		case '13':	return PLRASt9; break;
		case '201':	return PLRASt10; break;
		default: return '';
	}
}
function drawStatus(GT,GTN){
			var GTi=GT.innerText, warn='';
			if(GTi=='01' || GTi=='101' || GTi=='02' || GTi=='102' || GTi=='11' || GTi=='13') warn='<IMG SRC="../img/ico/err5.gif" ALIGN="left">&#160;';
			else if(GTi=='201') warn='<IMG SRC="../img/ico/err3.gif" ALIGN="left">&#160;';
			GTN.innerHTML=warn+getStatus(GTi);
}
function InitForm(){
	fD=da.fData;
	w.dntConfirm=true;
	w.noBack=false;
	w.dlh=(top.bSSL==1)?'':document.location.hostname;
	isTLS=fD.getElementsByTagName('TLS')(0).text=='1';
	isNV=fD.selectSingleNode('/BXD/DROW/NVGT').text=='1';
	var DGT=fD.selectSingleNode('/BXD/DROW/GT').text;
	da.AbScEmptyIdWrn.style.display='none';
	if(isNV){
		da.AbScHlp.style.display='block';
		da.AbScWrn.style.display=da.AbScBtn.style.display='none';
		if(fD.selectSingleNode('/BXD/DROW/ABONENTS').text=='')	Top.HideToolBar(w);
	}else{
		da.AbScHlp.style.display=da.AbScCh.style.display='none';
		da.AbScBtn.focus();
		w.tbMAP='00000111110';
		Top.SetToolBar(w);
		var Abts=fD.selectSingleNode('/BXD/DROW/ABONENTS');
		if(Abts.text=='') passReg();
		else {
			if(Abts.attributes.getNamedItem('TP').value==Abts.attributes.getNamedItem('CP').value){
				da.AbScWrn.style.display='none';
				if(Top.bAuth) da.AbScBtn.style.display='none';
				da.AbScEmptyIdWrn.style.display='';
			}
			//if(Abts.attributes.getNamedItem('TP').value==1 && Abts.attributes.getNamedItem('CP').value==1) w.noBack=true;
		}
	}
/*
	if(!isNV && (DGT=='01' || DGT=='02' || DGT=='03')){
		da.AbSc.style.display = 'none';
		loadXSLForm(DGT);
		return;
	}
*/
	if((Top.ExtSR=='1')||((Top.ExtSR=='0')&&(top.nv.MySigner.XMLCryptoParamsData==''))){
		if(Top.ReloadSignConf(w,null,1,'1')){
			top.nv.MySigner.XMLCryptoParamsData=Top.SignConf.xml;
			top.nv.MySigner.NumberOfSignatures=1;
		}
	}
	if (DGT=='11'){
		da.AbSc.style.display = 'none';
		if (!w.showRegenForm(fD.selectSingleNode('/BXD/DROW'))) return false;
	}
	else{
		if(!da.GT.length){
			drawStatus(da.GT,da.GTN);
		}
		else for(i=0; i<da.GT.length; i++){
			drawStatus(da.GT[i],da.GTN[i]);
		}
	}
	if(w.standalone){selRow(w.Top.wP); w.scrollerID=1; Top.ACTS2(w,'WORKUP','ABONENTS'); da.AbScBtn.style.display='none';}
}

function AfterSaveForm(){
	if(w.standalone){
		w.returnValue='1';
		w.close();
	}
	else Top.nv.DEF('RT_2CRYPTO.ACT',null,null,null,(df.RequestType.value=='20'?('&PI='+df.ProfileID.value):'&CryptoUID='+df.CryptoUID.value)+'&newKey=1'+(w.noBack?'&NB=1':''));
}

function InitScroller(){
	df.REFRESH_FILTERID_LIST_FOR_DELETE.disabled=false;
	df.REFRESH_FILTERID_LIST_FOR_DELETE.value='NEWCRYPTO';
}

function showRegenForm(oXROW){
	da.AbScWrn.style.display=da.AbScEmptyIdWrn.style.display='none';
	if(oXROW.selectSingleNode('RT')!=null)df.RequestType.value=oXROW.selectSingleNode('RT').text;
	if(oXROW.selectSingleNode('CLN')!=null)df.CryptoEngineType.value=oXROW.selectSingleNode('CLN').text;
	if(oXROW.selectSingleNode('PI')!=null)df.ProfileID.value=oXROW.selectSingleNode('PI').text;
	df.CryptoUID.value=oXROW.selectSingleNode('CUID').text;
	df.CryptoLibID.value=oXROW.selectSingleNode('CLI').text;
	df.Params_NameSign.value=oXROW.selectSingleNode('NS').text;
	var GT=oXROW.selectSingleNode('GT').text, CLb="",sFH="";

	if(GT!='201' && GT!='13'){
		w.nouid=0;
		if(df.RequestType.value!='20')df.RequestType.value='0';
		MCr=da.MyCrypto;
		MCr.ClearCash();
		MCr.FreeCryptoEngine();
		var XHR=new ActiveXObject(Top.XMLHTTP_ID);
		var URL=Top.XMLScriptPath+'?t=rt_1SignConf.GetSignCFG&B=1&SID='+Top.SID+'&Regen=1&CryptoUID='+Top.XMLhexEncode(df.CryptoUID.value)+'&tms='+Top.fnRnd();
		XHR.open("GET",URL,false);
		XHR.send('');
		if(XHR.readyState==4){
				var ox=new ActiveXObject(Top.XMLDOM_ID);
				ox.async=false;
				ox.validateOnParse=false;
				ox.resolveExternals=false;
				ox.loadXML(XHR.responseXML.xml);
				var e=Top.GetSTErrorFromXML(ox,0)
				if (e!=''){Top.placeMsg(e,window); return false;}
				w.SignP=Top.SignP=ox.xml;
				MCr.XMLCryptoParamsData=Top.SignP;
		}
	}
	else{
		w.nouid=1;
		df.RequestType.value='20';
		switch(df.CryptoLibID.value){
			case '17':
				CLb="_ccom32x";
				sFH=fD.selectSingleNode('//C201_1').text;
				break;
			case '8':
				CLb="_mscapi20";
				sFH=fD.selectSingleNode('//C201_2').text;
				break;
			case '9':
				CLb="_mprov2x";
				sFH=fD.selectSingleNode('//C201_3').text;
				break;
			case '19':
				CLb="_lirssl";
				sFH=fD.selectSingleNode('//C201_4').text;
				break;
			case '25':
				CLb="_ard";
				sFH=fD.selectSingleNode('//C201_5').text;
				break;
		}
	}

	if(GT=='01' || GT=='02') GT='0';
	else if(GT=='101' || GT=='102') GT='1';
	df.GenType.value=GT;
	if(GT=='00') da.xslViewcFrom.innerText=PLRS2;
	else if(GT=='12'){ alert(PLRS17); return false;}
	else if(GT=='13'){
		if(w.standalone){confRefuse(oXROW)}
		else{alert(PLRS18+oXROW.selectSingleNode('NFB').text+PLRS18r);}
		return false;}
	else if(GT!='') loadXSLForm(GT+CLb);
	if(da.NS1!=null) da.NS1.innerText=df.Params_NameSign.value;
	if(da.NS2!=null) da.NS2.innerText=df.Params_NameSign.value;
	da.AbSc.style.display = 'none';
	da.AbScHlp.style.display='none';
	if(GT=='0') w.tbMAP='1100000000';
	else if(GT=='1') w.tbMAP=(isNV)?'1011100000':'1000100000';
	else if(GT=='201') w.tbMAP='1010000000';
	else w.tbMAP='0000000000';
	Top.SetToolBar(w);

	if(GT=='11'){
		var DBCert=0;
		if(MCr.ExportCryptoObject('',13,'',0))
			if(Top.nv.MyTools.UnMime(MCr.CurrentData).charCodeAt(0)==1)
				DBCert=1;		
		if(DBCert!=1){
			df.TSIG.value=oXROW.selectSingleNode('TSIG').text;
			Top.canGetCNT=false;
			alert(PLRS5+'"'+df.Params_NameSign.value+'"');
			var bVD=(df.CryptoLibID.value==25)?true:MCr.VerifyData(w.dlh,'1',df.TSIG.value);
			if(bVD){
				da.fs1.style.display='block';
				if(!isNV) da.clTxt.style.display=da.clBtn.style.display='inline';
			}else
				da.fs3.style.display='block';
		}else
			da.fs1.style.display='block';
		df.BankPublicKeyProperties.value=oXROW.selectSingleNode('BPK').text;
		df.ReqPublicKeyTransfer.value=oXROW.selectSingleNode('PK').text;
		df.NewCryptoUID.value=oXROW.selectSingleNode('NID').text;
	}
	else if(GT=='201'){
		da.fHdr.innerText=sFH;
		initForm201(oXROW);
		Top.attachHandlersToFields(null,w);
	}
	else{
		df.ReqPublicKeyTransfer.value='';
		df.NewCryptoUID.value='';
		df.TSIG.value='';
	}
}

function fnKeyGenStart(){
	if(Top.bAuthXNotPassed){
		alert(Top.LRnoSK0);
		Top.nv.CREATE('CRYPTO','NEW');
		return false;
	}
	var	MCr=document.MyCrypto;
	MCr.ClearCash();
	MCr.XMLCryptoParamsData=Top.SignP;
	if (!MCr.RemoteGenerateStart(w.dlh)){
		alert(PLRS1+MCr.LastError+').');
		return false;
	}
	else{
		df.ReqPublicKeyTransfer.value=MCr.aPublicKeyTransfer;
		df.CryptoEngineType.value=MCr.CryptoEngineType;
		df.T.value="RT_2Crypto.keyGen";
		df.submit();
		return true;
	}
}

function cancelCertGen(){
	MCr.FreeCryptoEngine();
	df.SIGNS.value='';
	w.WaitMes.innerText="";
	da.EDITFORM.style.display="block";
}

function fnCertGenStart(action){
	Top.clearMsg(w);
	if(Top.bAuthXNotPassed){
		alert(Top.LRnoSK0);
		Top.nv.CREATE('CRYPTO','NEW');
		return false;
	}
	var	MCr=document.MyCrypto, b=false;
	MCr.ClearCash();
	MCr.XMLCryptoParamsData=Top.SignP;
	da.EDITFORM.style.display="none";
	w.WaitMes.innerText=Top.LRS3;
	MCr.Step=0;
	MCr.aPublicKeyTransfer="";

	if(w.nouid==0){
		do{
			if (!MCr.RemoteGenerateStartEx(w.dlh,'')){
				alert(PLRS1+'RemoteGenerateStartEx: '+MCr.LastErrorCode+': '+MCr.LastError+').');
				cancelCertGen();
				return false;
			}
			else{
				switch (MCr.Step){
					case 1:
						df.ReqPublicKeyTransfer.value=MCr.aPublicKeyTransfer;
						df.CryptoEngineType.value=MCr.CryptoEngineType;
						df.T.value="RT_2Crypto.certGen";
						b=true;
						break;
					case 2: if (!confirm(PLRS5+'"'+df.Params_NameSign.value+'"')) {cancelCertGen(); return false;} break;
					case 3: if (!confirm(PLRS6)) {cancelCertGen(); return false;} break;
					case 4: if (!confirm(PLRS7)) {cancelCertGen(); return false;} break;
					case 5:
						var LR=PLRS8;
						LR+=(MCr.CryptoEngineType=='M-Pro v2.x')?'3.0.0.3':'2.0.0.27';
						LR+=PLRS8a;
						if (!confirm(LR)) {cancelCertGen(); return false;}
						break;
				}
			}
		}
		while (MCr.Step!=1)
		MCr.FreeCryptoEngine();
		if(!MCr.GetPublicKeyPropertiesByTransfer(w.dlh)){
			w.WaitMes.innerText="";
			alert(PLRS1+'GetPublicKeyPropertiesByTransfer: '+MCr.LastErrorCode+': '+MCr.LastError+').');
			return false;
		}
		else{
			df.PublicKeyProperties.value=MCr.CertificateProperties;
		}
	}

//	if(top.nv.MySigner.NumberOfSignatures>0)alert(PLRS9);
	if(action=='SAVEDOCL'){
		w.SpecT='RT_1Loader.Load'; w.SpecRtsRequest='&step=41&ACT=SAVE';
		Top.ACTF(w,'SAVEDOC',0);
	}
	else if(action=='SAVEDOC') Top.ACTF(w,'SAVEDOC',0);
	else {
		b=Top.SignFORM(w,action);
		if(!b) cancelCertGen();
		else df.submit();
	}
	return b;
}

function fnCertGenFinish(){
	w.WaitMes.innerText=Top.LRS3;
	da.fs1.style.display="none";
	da.spMsg.innerText="";
	df.T.value="RT_2Crypto.getCert";
	var wForms=w.document.forms;
	if(df.RequestType.value=='20') sendConf('');
	else{
		var MCr=document.MyCrypto, UID=MCr.GetCurrentUserUID(w.dlh);
		MCr.XMLCryptoParamsData=Top.SignP;
		MCr.Step=0;
		MCr.aPublicKeyTransfer=df.ReqPublicKeyTransfer.value;
		do{
			if(!MCr.RemoteGenerateFinishEx(w.dlh)){
				w.WaitMes.innerText="";
				var s=PLRS3+PLRS3_1+MCr.LastError+').';
				if(MCr.LastErrorCode!=0){ //-2146893816
					if(!confirm(s+PLRS3_3)) sendConf(UID,MCr.LastErrorCode);
					else da.fs1.style.display="";
				}
				else {
					alert(s);
					da.fs1.style.display="block";
				}
				da.spMsg.innerText=s;
				return;
			}
			else{
				switch(MCr.Step){
					case 1:
						df.ReqPublicKeyTransfer.value="";
						sendConf(UID);
						break;
					case 2: if(!confirm(PLRS5+'"'+df.Params_NameSign.value+'"')) return; break;
					case 3: if(!confirm(PLRS6)) return; break;
					case 4: if(!confirm(PLRS7)) return; break;
					case 5: 
						var LR=PLRS8;
						LR+=(MCr.CryptoEngineType=='M-Pro v2.x')?'3.0.0.3':'2.0.0.27';
						LR+=PLRS8a;
						if(!confirm(LR)) return; 
					break;
				}
			}
		}
		while(MCr.Step!=1)
	}
	w.IsForm=false;
}
function sendConf(UID,exParam){
	var URL='t='+df.T.value+'&SID='+df.SID.value+'&SCHEMENAME='+df.SCHEMENAME.value+'&tms='+Top.fnRnd();
	O=new ActiveXObject("Microsoft.XMLHTTP");
	O.onreadystatechange=doRSCFinish;
	O.open("POST",Top.XMLScriptPath,true);
	O.setRequestHeader("Rts-Request",URL);
	O.setRequestHeader("df-act","CC="+UID);
	var oXML=Top.GetSimpleXML_1251('R');
	var oRoot=oXML.documentElement;
	var oAttr=oXML.createAttribute('CUID');
	oAttr.text = df.CryptoUID.value;
	oRoot.setAttributeNode(oAttr);
	oAttr=oXML.createAttribute('PI');
	oAttr.text = df.ProfileID.value;
	oRoot.setAttributeNode(oAttr);
	if(exParam!=null && exParam!='')
		oRoot.setAttribute('EP',exParam);
	O.send(oXML);
}
function doRSCFinish(){
	var	MCr=document.MyCrypto;
	MCr.XMLCryptoParamsData=Top.SignP;
	Top.canGetCNT=true;
	if (O.readyState==4){
		w.WaitMes.innerText="";
		O.onreadystatechange=new Function("");
		var oXML=O.responseXML;
		if(oXML.documentElement==null){
			da.xslViewcFrom.innerHTML=O.responseText;
			return false;
		}
		else {
			var ErrMsg=Top.GetSTErrorFromXML(oXML,false);
			var res=oXML.documentElement.text;
			if(ErrMsg!=''){
				da.spMsg.innerHTML=ErrMsg;
				return false;
			}
			else if (res=="1"){
				if(Top.ReloadSignConf(w)){
					nv.MySigner.XMLCryptoParamsData=Top.SignConf.xml
					if(isTLS) da.spMsg.innerText=PLRS4+PLRS10;
					else if(isNV) da.spMsg.innerText=PLRS4;
					else da.fs2.style.display="block";
				}
			}
			else if (res=="11"){
				return false;
			}
			else {
				da.spMsg.innerText=O.responseText;
				return false;
			}
		}
		if(isTLS){
			MCr.RegisterOIDInfo('','1.3.6.1.4.1.16745.3.2.3',PLRtls1);
			MCr.RegisterOIDInfo('','1.3.6.1.4.1.16745.3.2.4',PLRtls2);
			MCr.RegisterOIDInfo('','1.3.6.1.4.1.16745.3.2.5',PLRtls3);
			MCr.RegisterOIDInfo('','1.3.6.1.4.1.16745.3.3.1',PLRtls4);
			if(!MCr.InstallCertsInMyStore('','1.3.6.1.5.5.7.3.2') && MCr.LastError!='') alert(PLRS3+PLRS3_2+MCr.LastError+').');
			else{
				var iRes=MCr.FunctionResult;
				if(iRes>0) alert(PLRtls5);
				if(iRes==0) alert(PLRtls6);
				if(iRes<0) alert(PLRtls7);
			}
		}
	}
}

function checkCorrectTransfer(){
	if(df.BankPublicKeyProperties.value!=''){
		var MCr=document.MyCrypto;
		MCr.XMLCryptoParamsData=Top.SignP;
		var s=df.ReqPublicKeyTransfer.value;
		if(!MCr.RemoveSignFromMimeData(w.dlh, s))MCr.IncludePublicKeyTransfer(w.dlh, df.BankPublicKeyProperties.value)
	}
	return fnCertGenFinish()
}

function goReg(){
	loadXSLForm(da.fData.selectSingleNode('/BXD/DROW/KRT').text);
}
function passReg(){
	td=Top.document.all;
	top.HideToolBar(window);
	if(Top.ReloadSignConf(window)){
		nv.MySigner.XMLCryptoParamsData=Top.SignConf.xml
		Top.mw_crypt='';
		if(Top.mw_news && Top.mw_news!='') Top.mw.location.replace(Top.mw_news+'&tms='+Top.fnRnd());
		else{
			//Top.nv.document.body.style.display='';
			Top.mw.location.replace(Top.mw_wlc);
			td.FG.frameSpacing=1;
			td.FN.noResize=false;
			td.FT.rows=Top.FTrows;	td.FG.cols=Top.FGcols;
		}
	}
}
function backToPrs(){
	if(typeof(Top.mw_crypt)=='undefined' || Top.mw_crypt=='') Top.nv.CREATE('CRYPTO','NEW');
	else Top.mw.location.replace(Top.mw_crypt);
}

function GetNewRTSCert(){
	w.WaitMes.innerText=Top.LRS3;
	var MCr=document.MyCrypto,MIm=Top.nv.MyImport;
	MCr.XMLCryptoParamsData=Top.SignP;
	var wForms=w.document.forms;
	function doRSCCert(){
		if (O.readyState==4){
			w.WaitMes.innerText="";
			da.dnl.disabled=false;
			O.onreadystatechange=new Function("");
			var oXML=O.responseXML;
			var ErrMsg=Top.GetSTErrorFromXML(oXML,false);
			if(ErrMsg!=''){top.placeMsg(ErrMsg,w); return;}
			oD=oXML.documentElement;
			if(oD.nodeName=='S'){
				s=oD.text;
				MIm.FileName='bank.cer';
				if(MIm.SelectFile(false,2)){
					MIm.Data=Top.nv.MyTools.UnMime(s);
					if(MIm.Save()){
						if(!MCr.IncludePublicKey(w.dlh,MIm.FileName))
							alert(PLRS11+MCr.LastError+').');
						else{
							da.fs1.style.display='block';
							da.fs3.style.display='none';
						}
					}
					else alert(PLRS11+MIm.ErrorMessage+').');
				}
			}
			else alert(PLRS11+'Unknown answer format. Tag S not found!).');
		}
	}
	O=new ActiveXObject("Microsoft.XMLHTTP");
	O.onreadystatechange = doRSCCert;
	O.open("POST",Top.XMLScriptPath,true);
	O.setRequestHeader("Rts-Request", 't=RT_2Crypto.getRTSCert&sid=' + Top.SID);
	da.dnl.disabled=true;
	O.send(Top.GetSimpleXML_1251('R'));
}

function showAbonentData(oXROW){
	da.ABONENTDATA.style.display='block';
	da.vNS.value=oXROW.selectSingleNode('NS').text;
	da.vCUID.value=oXROW.selectSingleNode('CUID').text;
	da.vCLN.value=oXROW.selectSingleNode('CLN').text
	da.vTMP.value=(oXROW.selectSingleNode('TMP').text=='0')?PLRASt11:PLRASt12;
	da.vDS.value=oXROW.selectSingleNode('DS').text
	da.vDF.value=oXROW.selectSingleNode('DF').text
	if(oXROW.selectSingleNode('NFB')!=null){
		da.vNFB.value=oXROW.selectSingleNode('NFB').text;
		da.bNFB.style.display='';
	}
	else da.bNFB.style.display='none';
}

function initForm201(oXROW){
	var pars=oXROW.selectSingleNode('KGP').text;
	w.UIDType=oXROW.selectSingleNode('UT').text;
	w.CNL=oXROW.selectSingleNode('CNL').text;

	//предобработка
	if(df.CryptoLibID.value=='25')
		genDeviceList();

	//заполнение полей из KeyGenParams
	if(pars=='') return;
	var arrPar=pars.split('\x01');
	w.arrDefPar=new Array();
	for(var i=0;i<arrPar.length;i++){
		var par=arrPar[i];
		var inx=par.indexOf('='), n=par.substring(0,inx), v=par.substr(inx+1);
		if(v!=''&&da(n)) da(n).value=v;
		try{if(typeof(da(n).onchange)=='function') da(n).onchange();}catch(e){}
		//predefine default params
		if(n=='DefaultEngineParams'){
			w.DefaultEngineParams=Top.nv.MyTools.UnMime(v);
			w.arrDefPar=w.DefaultEngineParams.split('\r\n');
		}
	}
	
	//постобработка
	if(df.CryptoLibID.value=='9' && w.UIDType=='SN') df.Common_name.disabled=false;
	if(df.CryptoLibID.value=='8'){
		df.CryApiCNL.value=w.CNL;
		if(w.UIDType=='S') df.CryApiState.disabled=true;
		if(w.UIDType=='L') df.CryApiCity.disabled=true;
		if(w.UIDType=='O') df.Company.disabled=true;
		if(w.UIDType=='OU') df.CryApiDepartment.disabled=true;
		if(w.UIDType=='CN' || w.UIDType=='') df.Common_name.disabled=true;
		if(w.UIDType=='E') df.CryApie_mail.disabled=true;
	}
	if(df.CryptoLibID.value=='19'){
		genKeyList();
	}
	if(df.CryptoLibID.value=='25'){
		if(df.AlTokSerialNo.value!='') df.AlTokSerialNo.disabled=true;
	}
	if(w.standalone) da.AbGenStart.style.display='';
}

function onChgDvc(sel){
	var inp1, inp2, sCEName;
	switch(df.CryptoLibID.value){
		case '17':  //ccom32x
			inp1=da.CCom3xSKey;
			inp2=da.CCom3xSKeyID;
			sCEName="Key gen - SKey";
			break;
		case '9':  //mprov2x
			inp1=da.MPro2xSecPath;
			inp2=da.MPro2xKeyID;
			sCEName="";
			break;
	}
	if(sel.value=='0' || sel.value=='DISK'){
		da.disk.style.display="block";
		da.token.style.display="none";
		inp1.setAttribute("CEName",sCEName);
		inp2.setAttribute("CEName","");
	}
	else{
		da.disk.style.display="none";
		da.token.style.display="block";
		inp2.setAttribute("CEName",sCEName);
		inp1.setAttribute("CEName","");
	}
}
function SelectPath(oInp){
	var oSP=Top.MyTools;
	var sPath=oInp.value;
	if(oSP.SelectDirectory('',''+sPath+'')){
		oInp.value=oSP.LastChooseDir;
	}
}
function genKeyList(){
	if(df.LirSSLKeyDevice.value==0) return;
	var oOpt,oSel=df.LirSSLKeyID;
	for(i=oSel.options.length-1; i>=0; i--) oSel.options.remove(i);
	var sD='',sPD=Top.MyTools.Mime(arKDNames[df.LirSSLKeyDevice.value]);
	var MCr=document.MyCrypto;
	MCr.XMLCryptoParamsData=createCrParamsXML(true);
	MCr.InitCryptoEngine('',false);
	var b=MCr.ExportCryptoObject('',301,sPD,0);
	if(b){
		sD=Top.MyTools.UnMime(MCr.CurrentData);
		if(sD!=''){
			var ar=sD.split(String.fromCharCode(1));
			for(i in ar){
				oOpt=document.createElement('OPTION');
				oOpt.text=ar[i];
				oOpt.value=ar[i];
				oSel.add(oOpt);
			}
		}
		else alert(PLRCF20);
	}
	else alert(MCr.LastErrorCode+': '+MCr.LastError)
}
function genDeviceList(){
	var oOpt,oSel=df.AlTokSerialNo,sD;
	var MCr=document.MyCrypto;
	MCr.XMLCryptoParamsData=createCrParamsXML(false);
	MCr.InitCryptoEngine('',false);
	var b=MCr.ExportCryptoObject('',35,'',0);
	if(b){
		sD=Top.MyTools.UnMime(MCr.CurrentData);
		if(sD!=''){
			var ar=sD.split('\r\n');
			for(i in ar){
				oOpt=document.createElement('OPTION');
				oOpt.text=ar[i];
				oOpt.value=ar[i];
				oSel.add(oOpt);
			}
		}
		else alert(PLRCF20);
	}
	else alert(MCr.LastErrorCode+': '+MCr.LastError)
	oSel.selectedIndex=-1;
}

function chkKeyUsageOIDs(o){
	if(o.value!=''){
		var re=new RegExp('^(([0-9]+)([.][0-9]+)*(;)?)*$','g');
		if(!re.test(o.value)){alert(PLRCF01);o.focus();return false;}
	}
	return true;
}
function chkSecKeyUsage(o){
	if(o.value!=''){
		var ar=o.value.split(';'),i,chStr=';DigitalSignature;NonRepudiation;KeyEncipherment;DataEncipherment;KeyAgreement;KeyCertSign;OffLineCrlSign;CrlSign;EncipherOnly;';
		for(i in ar){
			if(ar[i]=='' || chStr.indexOf(';'+ar[i]+';')==-1){alert(PLRCF02);o.focus();return false;}
			else chStr=chStr.replace(';'+ar[i],"");
		}
	}
	return true;
}

function getTagText(obj,tagName){
	return obj.getElementsByTagName(tagName)[0].firstChild.nodeValue;
}
function SubCheckLen(obj,fieldName){
	if(obj.value=='' || obj.value.length==obj.maxLength) return true;
	else{
		alert(PLRCL1.replace('%s',fieldName)+obj.maxLength);
		return false;
	}
}

function fnCheckFields(){
//checks for 201 (no UID)
	var b=true;
	switch(df.CryptoLibID.value){
		case '17':  //ccom32x
/*
			b=Top.SubCheckEmpty(w,'CCom3xUID','',"Не заполнено поле Идентификатор",b);
			b=Top.SubCheckEmpty(w,'CCom3xKey_device','',"Не заполнено поле Устройство",b);
*/
			if(da.CCom3xKey_device.value=='DISK')
				b=Top.SubCheckEmpty(w,'CCom3xSKey','',PLRCF11,b);
			else
				b=Top.SubCheckEmpty(w,'CCom3xSKeyID','',PLRCF13,b);
			break;
		case '8':  //mscapi20
			b=Top.SubCheckEmpty(w,'CryApiCryptoProvider','',PLRCF2,b);
			b=Top.SubCheckEmpty(w,'CryApiRequestType','',PLRCF3,b);
			b=Top.SubCheckEmpty(w,'CryApiKey_Length','',PLRCF4,b);
			b=Top.SubCheckEmpty(w,'Common_name','',PLRCF1,b);
			b=Top.SubCheckEmpty(w,'CryApiCountry','',PLRCF10,b);
			b=Top.SubCheckEmpty(w,'CryApiState','',PLRCF5,b);
			if(b)b=SubCheckLen(df.CryApiOGRN,getTagText(fData,'GF11'));
			if(b)b=SubCheckLen(df.CryApiOGRNIP,getTagText(fData,'GF14'));
			if(b)b=SubCheckLen(df.CryApiSNILS,getTagText(fData,'GF12'));
			if(b)b=SubCheckLen(df.CryApiINN,getTagText(fData,'GF13'));
			if(w.UIDType=='L' || w.CNL=='L') b=Top.SubCheckEmpty(w,'CryApiCity','',PLRCF6,b);
			b=Top.SubCheckEmpty(w,'Company','',PLRCF7,b);
			if(w.UIDType=='OU' || w.CNL=='OU') b=Top.SubCheckEmpty(w,'CryApiDepartment','',PLRCF8,b);
			if(w.UIDType=='E' || w.CNL=='E') b=Top.SubCheckEmpty(w,'CryApie_mail','',PLRCF9,b);
			if(b)b=chkSecKeyUsage(df.CryApiSecKeyUsage);
			if(b)b=chkKeyUsageOIDs(df.CryApiKeyUsageOIDs);
			break;
		case '9':  //mprov2x
			b=Top.SubCheckEmpty(w,'Common_name','',PLRCF1,b);
			b=Top.SubCheckEmpty(w,'MPro2xCountry','',PLRCF10,b);
			b=Top.SubCheckEmpty(w,'MPro2xState','',PLRCF5,b);
			b=Top.SubCheckEmpty(w,'Company','',PLRCF7,b);
			//b=Top.SubCheckEmpty(w,'MPro2xRequestType','',"Не заполнено поле Тип запроса",b);
			if(b)b=SubCheckLen(df.MPro2xOGRN,getTagText(fData,'GF11'));
			if(b)b=SubCheckLen(df.MPro2xOGRNIP,getTagText(fData,'GF14'));
			if(b)b=SubCheckLen(df.MPro2xSNILS,getTagText(fData,'GF12'));
			if(b)b=SubCheckLen(df.MPro2xINN,getTagText(fData,'GF13'));
			if(da.MPro2xKeyDevice.value=='0')
				b=Top.SubCheckEmpty(w,'MPro2xSecPath','',PLRCF11,b);
			else
				b=Top.SubCheckEmpty(w,'MPro2xKeyID','',PLRCF12,b);
			break;
		case '19':  //lirssl
			b=Top.SubCheckEmpty(w,'LirSSLCountry','',PLRCF10,b);
			b=Top.SubCheckEmpty(w,'LirSSLState','',PLRCF5,b);
			b=Top.SubCheckEmpty(w,'Company','',PLRCF7,b);
			b=Top.SubCheckEmpty(w,'Common_name','',PLRCF1b,b);
			if(df.LirSSLKeyDevice.value==0) b=Top.SubCheckEmpty(w,'LirSSLSecPath','',PLRCF11,b);
			break;
		case '25':  //ard
			b=Top.SubCheckEmpty(w,'AlTokCountry','',PLRCF10,b);
			b=Top.SubCheckEmpty(w,'AlTokState','',PLRCF5,b);
			b=Top.SubCheckEmpty(w,'Company','',PLRCF7,b);
			b=Top.SubCheckEmpty(w,'Common_name','',PLRCF1b,b);
			b=Top.SubCheckEmpty(w,'AlTokSerialNo','',PLRCF14,b);
			break;

	}
	//проверка существования сессии (63990)
	if(!w.standalone){
		var oxh=new ActiveXObject(Top.XMLHTTP_ID),ox;
		oxh.open("GET",Top.XMLScriptPath+'?t=rt_1common.testSession&SID='+Top.SID+'&tms='+Top.fnRnd(),false);
		oxh.setRequestHeader("Content-Type","text/xml");
		oxh.send('');
		if(oxh.readyState==4){
			ox=oxh.responseXML;
			var e=Top.GetSTErrorFromXML(ox,0);
			if(e!=''){Top.placeMsg(e,window); b=false;}
		}
	}
	return(b);
}
function fnOnSubmit(){
	var b=true;
	if(w.nouid==1){
		b=fnCheckFields();
		if(b){
			df.ReqPublicKeyTransfer.value=df.PublicKeyProperties.value='';
			var MCr=document.MyCrypto;
			MCr.ClearCash();
			MCr.FreeCryptoEngine(); //??
			df.KeyMedia.value=createKeyMedia();
			MCr.XMLCryptoParamsData=createCrParamsXML(true);
			MCr.InitCryptoEngine('',false);
			MCr.CurrentData='';
			b=MCr.ExportCryptoObject('',11,'',0);
			if(b){
				df.ReqPublicKeyTransfer.value=MCr.CurrentData;
				b=MCr.ExportCryptoObject('',14,MCr.CurrentData,0);
				if(b){
					df.PublicKeyProperties.value=Top.MyTools.UnMime(MCr.CurrentData);
					df.STATUS.value=Top.sST_DELIV;
				}
			}
			if(!b) alert(MCr.LastError);
		}
	}
	if(!b){
		w.WaitMes.innerText='';
		da.EDITFORM.style.display="block";
	}
	return(b);
}

function createCrParamsXML(fillParams){
	var oX=new ActiveXObject(Top.XMLDOM_ID);
	oX.loadXML('<?xml version="1.0"?><Signs><Sign DisplayName="" Engine="'+df.CryptoLibID.value+'"><Params></Params></Sign></Signs>');
	if(fillParams){
		oX.selectSingleNode('Signs/Sign/@DisplayName').text=df.Params_NameSign.value;
		var oN=oX.selectSingleNode('//Params'),oP;
		var arrDefParI;
		//set default params
		for(var i=0;i<w.arrDefPar.length;i++){
			arrDefParI=w.arrDefPar[i].split('=');
			oP=oN.appendChild(oX.createElement('Param'));
			oP.setAttribute("Name",arrDefParI[0]);
			oP.setAttribute("Value",arrDefParI[1]);
		}
		//set new modified params
		for(var i=0;i<df.elements.length;i++){
			var el=df.elements(i), sCEName=el.getAttribute("CEName");
			if(sCEName&&sCEName!=''){
				oP=oN.selectSingleNode('Signs/Sign/Params/Param[@Name="'+sCEName+'"]');
				if(oP==null) oP=oN.appendChild(oX.createNode(1,'Param',''));
				oP.setAttribute("Name",sCEName);
				oP.setAttribute("Value",el.value);
			}
		}
	}
	return(oX.xml);
}

function createKeyMedia(){
	var r='';
	switch(df.CryptoLibID.value){
		case '17':  //ccom32x
			r=df.CCom3xKey_device.value+':';
			if(df.CCom3xKey_device.value!='DISK') r=r+df.CCom3xSKeyID.value;
			else r=r+df.CCom3xSKey.value;
			break;
		case '8':  //mscapi20
			r=df.CryApiCryptoProvider.value;
			break;
		case '9':  //mprov2x
			if(df.MPro2xKeyDevice.value==0){
				r=df.MPro2xSecPath.value;
				df.MPro2xNewKeysPath.value=r;
			}
			else{
				r=arKDNames[df.MPro2xKeyDevice.value];
				if(r.indexOf(':')>=0){ if(r.lastIndexOf('\\')!=(r.length-1)) r=r+'\\';}
				else r=r+':\\';
				r=r+df.MPro2xKeyID.value;
				df.MPro2xNewKeysPath.value=r;
			}
			break;
		case '19':  //lirssl
			df.LirSSLNewKeysDevice.value=arKDNames[df.LirSSLKeyDevice.value];
			if(df.LirSSLKeyDevice.value==0){
				r=df.LirSSLSecPath.value;
				df.LirSSLNewKeysPath.value=r;
			}
			else {
				r=arKDNames[df.LirSSLKeyDevice.value];
				if(r.indexOf(':')>=0){ if(r.lastIndexOf('\\')!=(r.length-1)) r=r+'\\';}
				else r=r+':\\';
				r=r+df.LirSSLKeyID.value;
				df.LirSSLNewKeysPath.value=df.LirSSLKeyID.value;
			}
			break;
		case '25':  //ard
			r=df.AlTokSerialNo.value;
			break;
	}
	r=w.da.MyTools.Mime(r);
	return r;
}

//---
function confRefuse(ogROW){
	if(confirm(PLRS18+ogROW.selectSingleNode('NFB').text+PLRS18q)){
		var URL='SID='+Top.SID+'&t=RT_1Loader.Load&step=41&ACT=CONFREFUSE&SCHEMENAME='+df.SCHEMENAME.value+'&IDR='+ogROW.selectSingleNode('CKEIDR').text+'&XMLDATA=1&tms='+ Top.fnRnd();
		w.RtsRequest=URL;
		w.SendXMLSwitch='JustRequest';
		Top.HideAllBars(w);
		w.WaitMes.innerText=Top.LRS3;
		Top.SendXML('w.completeConfRefuse',w);
	}
	else if(w.standalone){
		w.returnValue='0';
		w.close();
	}

}
function completeConfRefuse(w,ACTID,XMLHTTP){
	w.SendXMLSwitch='';
	w.WaitMes.innerText="";
	Top.ShowAllBars(w);
	var oXML=XMLHTTP.responseXML;
	if(w.standalone){
		var ErrMsg=Top.GetSTErrorFromXML(oXML,true);
		if(ErrMsg!=''){w.alert(ErrMsg);w.returnValue='0';}
		else w.returnValue='5';
		w.close();
	}
	else{
		var ErrMsg=Top.GetSTErrorFromXML(oXML,false);
		if(ErrMsg!=''){Top.placeMsg(ErrMsg,w); return;}
		backToPrs();
	}
}
//---

function RegenScrollerRow(w,RI,MTEN,ACTID){
	var oXMT=Top.GetXMLMetaTable(w,MTEN);
	if (oXMT==null) return false;
	w.oXROW=oXMT.childNodes(RI);
	var GT=w.oXROW.selectSingleNode('GT').text;
	ogROW=w.oXROW.cloneNode(true);
	if((ACTID=='REGEN' && (GT=='10' || GT=='11')) || (ACTID=='GETCERT' && GT!='11') || ((ACTID=='ACT' || ACTID=='CARD') && GT=='201') || ((ACTID=='CONFREFUSE') && GT!='13')){
		alert(Top.LRS11P);
		return false;
	}
	switch (ACTID){
		case 'WORKUP':
		case 'REGEN':
		case 'GETCERT':
			if(ACTID!='REGEN'){
				if(Top.bAuthXNotPassed){
					alert(Top.LRnoSK0);
					return false;
				}
			}
			if(!w.showRegenForm(ogROW)) return false;
			break;
		case 'ACT':
		case 'CARD':
			if(ACTID=='CARD' && ogROW.selectSingleNode('CUID').text==''){
				alert(w.PLRS21);
				return false;
			}
			var CU=Top.XMLhexEncode(ogROW.selectSingleNode('CUID').text);
			if(w.standalone)
				window.location.replace(Top.scriptPath+'?T=RT_1Loader.Load&nvgt=1&SID='+Top.SID+'&step=41&ACT=ACT&CryptoUID='+CU+((CU!='')?'':'&PI='+Top.XMLhexEncode(ogROW.selectSingleNode('PI').text))+'&TMS='+Top.fnRnd());
			else
				Top.nv.DEF('RT_2CRYPTO.'+ACTID,null,null,null,'&CryptoUID='+CU+((CU!='')?'':'&PI='+Top.XMLhexEncode(ogROW.selectSingleNode('PI').text)));
			break;
		case 'DATA':
			if(!w.showAbonentData(ogROW)) return false;
			break;
		case 'CONFREFUSE':
			if(!w.confRefuse(ogROW)) return false;
			break;
	}
	ogROW=null;
	return true;
}

function selRow(Prf){
	var ARC=da.ABONENTS.rows;
	for(i=0;i<ARC.length;i++){
		if(ARC[i].all.PI){
			if(ARC[i].all.PI.innerText==Prf)da.ABONENTS.rows(i).click()
		}
	}
}
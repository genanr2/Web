var host=(top.bSSL==1)?'':document.location.hostname,CP;
var tbMAP='0',tbPanID='REGCARD_DEFAULT_FORM';
var
PLRr1='Номер',
PLRr2='Номер ключа подписи',
PLRr3='Номер ключа шифрации',
PLRr4='Алгоритм',
PLRr5='Алгоритм ключа подписи',
PLRr6='Алгоритм ключа шифрации',
PLRr7='Начало срока действия',
PLRr8='Окончание срока действия',
PLRr9='Начало срока действия ключа подписи',
PLRr10='Окончание срока действия ключа подписи',
PLRr11='Начало срока действия ключа шифрации',
PLRr12='Окончание срока действия ключа шифрации',
PLRr13='Ключ подписи',
PLRr14='Ключ шифрования',
PLRr15='Серийный номер ключа',
PLRr16='Серийный номер ключа подписи',
PLRr17='Серийный номер ключа шифрации',
PLRr18='Имя владельца ключей',
PLRr19='Имя владельца ключей подписи',
PLRr20='Имя владельца ключей шифрации',
PLRr21='UID ключа подписи',
PLRr22='UID ключа шифрации',
PLRr23='Данные об издателе',
PLRr24='Должность';
var
CDR_0='Дополнительная информация о владельце ключа:',
CDR_0S='Данные о ключе подписи:',
CDR_0E='Данные о ключе шифрации:',
CDR_0I='Параметры издателя (центра сертификации):',
CDR_0SI='Данные о ключе подписи:',
CDR_0EI='Данные о ключе шифрации:',
CDR_CN='Имя',
CDR_C='Код страны',
CDR_S='Страна',
CDR_L='Город',
CDR_O='Организация',
CDR_OU='Подразделение в организации',
CDR_E='E-mail',
CDR_SN='Серийный номер ключа',
CDR_KN='Номер ключа';

function getKeyTag(Name,KeyProps){
	var sTag="\r\n"+Name+"=",i=j=0;
	KeyProps="\r\n"+KeyProps;
	i=KeyProps.indexOf(sTag);
	if(i<0) return "";
	KeyProps=KeyProps.substr(i+sTag.length);
	var sEnd="\r\n";
	if(Name=='PKey' || Name=='SPKey' || Name=='EPKey' || Name=='CertSign') sEnd="\r\n\r\n";
	j=KeyProps.indexOf(sEnd);
	if(j<0) return KeyProps;
	else return KeyProps.substring(0,j);
}

function setTagTextDescr(Name,Descr,ne){
	var r="";
	v=getKeyTag(Name,CP);
	if(v=="" && ne==null) return r;
	if(Descr!="") Descr=Descr.substr(0,1).toUpperCase()+Descr.substr(1);
	r="\n"+Descr+v;
	return r;
}

function getCommaTag(Name){
	v=getKeyTag(Name,CP);
	if(v!="") v=","+v;
	return v;
}

function GetExtInfCert(sPrefix,bCN,bSNKN){
	var s="";
	if(bCN)
		s+=setTagTextDescr(sPrefix+'CN',CDR_CN+': ');
	s+=setTagTextDescr(sPrefix+'C',CDR_C+': ');
	s+=setTagTextDescr(sPrefix+'S',CDR_S+': ');
	s+=setTagTextDescr(sPrefix+'L',CDR_L+': ');
	s+=setTagTextDescr(sPrefix+'O',CDR_O+': ');
	s+=setTagTextDescr(sPrefix+'OU',CDR_OU+': ');
	s+=setTagTextDescr(sPrefix+'E',CDR_E+': ');
	if(bSNKN){
		s+=setTagTextDescr(sPrefix+'SN',CDR_SN+': ');
		s+=setTagTextDescr(sPrefix+'KN',CDR_KN+': ');
	}
	return s;
}

function CertDet(){
	var s="",
	 ExtInfCert=GetExtInfCert('',false,false),
	 ExtInfCertS=GetExtInfCert('S',true,false),
	 ExtInfCertE=GetExtInfCert('E',true,false),
	 ExtInfCertI=GetExtInfCert('I',true,true),
	 ExtInfCertSI=GetExtInfCert('SI',true,true),
	 ExtInfCertEI=GetExtInfCert('EI',true,true);
	if(ExtInfCert!='' || ExtInfCertS!='' || ExtInfCertE!=''){
		s=CDR_0+ExtInfCert;
		if(ExtInfCertS!='') s+='\n'+CDR_0S+ExtInfCertS;
		if(ExtInfCertE!='') s+='\n'+CDR_0E+ExtInfCertE;
	}
	if(ExtInfCertI!='' || ExtInfCertSI!='' || ExtInfCertEI!=''){
		s+='\n'+CDR_0I+ExtInfCertI;
		if(ExtInfCertSI!='') s+='\n'+CDR_0SI+ExtInfCertSI;
		if(ExtInfCertEI!='') s+='\n'+CDR_0EI+ExtInfCertEI;
	}
	return s;
}

function fillForm(da,bUL){
	var s;
	if(bUL=='') da.CN.innerText=getKeyTag("CN",CP);
	s="";
	s+=setTagTextDescr('KN',PLRr1+': ');
	s+=setTagTextDescr('SKN',PLRr2+': ');
	s+=setTagTextDescr('EKN',PLRr3+': ');
	s+=setTagTextDescr('PKeyAlg',PLRr4+': ');
	s+=setTagTextDescr('SPKeyAlg',PLRr5+': ');
	s+=setTagTextDescr('EPKeyAlg',PLRr6+': ');
	s+=setTagTextDescr('NotBefore',PLRr7+': ');
	s+=setTagTextDescr('NotAfter',PLRr8+': ');
	s+=setTagTextDescr('SNotBefore',PLRr9+': ');
	s+=setTagTextDescr('SNotAfter',PLRr10+': ');
	s+=setTagTextDescr('ENotBefore',PLRr11+': ');
	s+=setTagTextDescr('ENotAfter',PLRr12+': ');
	if(s!="") s=s.substr(1);
	da.KeyPr.innerText=s;

	s="";
	s+=setTagTextDescr('PKey','');
	s+=setTagTextDescr('SPKey',PLRr13+':');
	s+=setTagTextDescr('EPKey',PLRr14+':');
	if(s!="") s=s.substr(1).replace(/(^\n*)/g,"");
	da.KeyDet.innerText=s;

	s="";
	s+=setTagTextDescr('SN',PLRr15+': ');
	s+=setTagTextDescr('SSN',PLRr16+': ');
	s+=setTagTextDescr('ESN',PLRr17+': ');
	s+=setTagTextDescr('CN',PLRr18+': ');
	s+=setTagTextDescr('SCN',PLRr19+': ');
	s+=setTagTextDescr('ECN',PLRr20+': ');
	s+=setTagTextDescr('T',PLRr24+': ');
	s+=setTagTextDescr('UID','UID: ');
	s+=setTagTextDescr('SUID',PLRr21);
	s+=setTagTextDescr('EUID',PLRr22);
	if(s!="") s=s.substr(1);
	da.CertPr.innerText=s;

	s="";
	if(da.DRAct==null) s=CertDet();
	if(s!='') da.CertPr.innerText+="\n"+s;

	s="";
	s=getCommaTag('ICN')+getCommaTag('IC')+getCommaTag('IS')+getCommaTag('IL')+getCommaTag('IO')+getCommaTag('IOU')+getCommaTag('IE')+getCommaTag('ISN')+getCommaTag('IKN');
	if(s!="") da.CertPr.innerText+="\n\n"+PLRr23+": "+s.substr(1);
	
	if(da.INN) da.INN.innerHTML=getKeyTag("INN",CP);
	if(da.OGRN) da.OGRN.innerHTML=getKeyTag("OGRN",CP);
	if(da.OGRNIP) da.OGRNIP.innerHTML=getKeyTag("OGRNIP",CP);
	if(da.SNILS) da.SNILS.innerHTML=getKeyTag("SNILS",CP);
	if(da.TTL) da.TTL.innerHTML=getKeyTag("T",CP);
}

function showCard(){
	cForm.async=false;
	if(DT!='')
		cForm.load("../scheme/crypto/crypto_"+DT+"_russian.xsl");
	if(cForm.readyState=="complete"){
		Err=Top.CheckXML4ParseError(cForm,false);
		if(Err!='') ERRORTD.innerHTML=Err;
		else xslViewcFrom.innerHTML=cForm.transformNode(cForm.XMLDocument);
	}

	if(da.PKP.innerText!='')
		CP=da.PKP.innerText;
	else if(CUID=='')
		{Top.placeMsg(Top.GetErrMessage('0|6=0:'+PLRS21),window); return;}
	else{
		var MCr=(w.standalone)?w.Top.MyCrypto:nv.MyCrypto;
		MCr.ClearCash();
		MCr.FreeCryptoEngine();
	
		var XHR=new ActiveXObject(Top.XMLHTTP_ID);
		var URL=Top.XMLScriptPath+'?t=rt_1SignConf.GetSignCFG&SID='+Top.SID+'&Regen=1&CryptoUID='+Top.XMLhexEncode(CUID)+'&tms='+Top.fnRnd();
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

			MCr.XMLCryptoParamsData=ox.xml;
			MCr.InitCryptoEngine(host);

			MCr.aPublicKeyTransfer=da.PKT.innerText;
			if(newKey=='1') MCr.GetPublicKeyPropertiesByTransfer(host);
			//else if(CUID!=''){MCr.GetPublicKeyProperties(host,CUID);}
			else{MCr.GetPublicKeyProperties(host,MCr.GetCurrentUserUID(host));}
			if(MCr.LastErrorCode!=0){alert(PLRS19+MCr.LastErrorCode+': '+MCr.LastError); return;}

			CP=MCr.CertificateProperties;
		}
	}
	if(DT=='card') da.O.innerText=getKeyTag('O',CP);
	else if(DT=='act' && bU==''){
		da.Off.style.display=da.Org.style.display='none';
		da.PNS.innerText=' ('+PNS+')';
	}
	fillForm(da,bU);
}

function processPrintForm(w,xmlSrc){
	var wda=w.document.all;

	CP=xmlSrc.selectSingleNode("//PKP").text.replace(/\n/g,'\r\n');
	if(wda.fData.selectSingleNode('//bU').text==''){
		wda.Off.style.display=wda.Org.style.display='none';
		wda.PNS.innerText=' ('+xmlSrc.selectSingleNode("//NS").text+')';
	}
	fillForm(wda,wda.fData.selectSingleNode('//bU').text);
}
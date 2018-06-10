var da=document.all, inputErrorCode=0, oX=null, signInfo;
var sKvit,sSign,sCert;
var bKvit,bSign,bCert;

//save
function initSaveFm(){
	da.FN.value=wfd.selectSingleNode("//KVITBLOCK/FileName").text;
	Top.attachHandlersToFields(null,w);
}

function closeMD(){
	w.close();
}

function doAfterSave(){
	if (oX.readyState==4){
		oX.onreadystatechange=new Function("");
		closeMD();
	}
}
function saveMD(){
	var tt=da.MyTools,MIm=da.MyImport,b=false;
	var Sl=wfd.selectNodes("//KVITBLOCK/ContrSigns/CS").length;
	for(var i=0;i<Sl;i++){
		b=tt.SaveSignToFiles(wfd.selectSingleNode("//KVITBLOCK/DirName").text,wfd.selectSingleNode("//KVITBLOCK/KVIT").text,wfd.selectNodes("//KVITBLOCK/ContrSigns/CS/S")[i].text,wfd.selectSingleNode("//KVITBLOCK/FileName").text+'_Kvit'+(i+1));
		if(b)wfd.selectSingleNode("//KVITBLOCK/DirName").text=tt.LastChooseDir;
		if(wfd.selectNodes("//KVITBLOCK/ContrSigns/CS/CR")[i] && wfd.selectNodes("//KVITBLOCK/ContrSigns/CS/CR")[i].text!=''){
			MIm.FileName=wfd.selectSingleNode("//KVITBLOCK/DirName").text+'\\'+wfd.selectSingleNode("//KVITBLOCK/FileName").text+'_Kvit'+(i+1)+'.cer';
			if(MIm.SelectFile(false,2)){
				MIm.Data=tt.UnMime(wfd.selectNodes("//KVITBLOCK/ContrSigns/CS/CR")[i].text);
				MIm.Save();
			}
		}
	}
	if(b){
		var URL="SID="+Top.SID+"&t=RT_1Kvit.saveKvitDirName&tms="+Top.fnRnd();
		oX=new ActiveXObject("Microsoft.XMLHTTP");
		oX.onreadystatechange=doAfterSave;
		oX.open("POST",Top.XMLScriptPath,true);
		oX.setRequestHeader("Rts-Request",URL);
		var sXT=Top.GetSimpleXML_1251('R');
		oN=sXT.createNode(1,'DirName','');
		oN.text=tt.LastChooseDir;
		sXT.documentElement.appendChild(oN);
		oX.send(sXT);
		wfd.selectSingleNode("//KVITBLOCK/DirName").text=tt.LastChooseDir;
	}
}

//check
function initCheckFm(){
	tt=Top.nv.MyTools;
	cr=Top.nv.MyCrypto;
	sKvit=sSign=sCert='';
	Top.SetToolBar(w);
	Top.ShowToolBar(w);
	if(w.da.flN&&Top.flN!='')w.da.flN.innerText=Top.fil1+Top.flN;
}

function getKvitFile(){
  var KName=da.KName.value;
  da.KName.value='';
  if(tt.ReadMimeFileData(da.KName.value,PLRS1+' (*.dat)|*.dat|'+PLRS3+' (*.*)|*.*')){
		sKvit=tt.Data;
		bKvit=true;
		da.KName.value=tt.LastFileName;
	}
	else if(tt.LastError!=''){
		bKvit=false;
		alert(top.LRS24+PLRS4+tt.LastError+').');
	}
	if(da.KName.value=='') da.KName.value=KName;
}

function getSingFile(){
  var SName=da.SName.value;
  da.SName.value='';
  if(tt.ReadMimeFileData(da.SName.value,PLRS2+' (*.sig)|*.sig|'+PLRS3+' (*.*)|*.*')){
		sSign=tt.Data;
		bSign=true;
		da.SName.value=tt.LastFileName;
	}
	else if(tt.LastError!=''){
		bSign=false;
		alert(top.LRS24+PLRS4+tt.LastError+').');
	}
	if(da.SName.value=='') da.SName.value=SName;
}

function getCertFile(){
  var CName=da.CName.value;
  da.CName.value='';
  if(tt.ReadMimeFileData(da.CName.value,PLRS2+' (*.cer)|*.cer|'+PLRS3+' (*.*)|*.*')){
		sCert=tt.Data;
		bCert=true;
		da.CName.value=tt.LastFileName;
	}
	else if(tt.LastError!=''){
		bCert=false;
		alert(top.LRS24+PLRS4+tt.LastError+').');
	}
	if(da.CName.value=='') da.CName.value=CName;
}

function checkKvit(){
	if(bKvit && bSign && da.KName.value!='' && da.SName.value!=''){
		Top.ReloadSignConf(w,null,1);
		var SC=Top.SignConf, c=SC.selectNodes('/Signs/Sign').length, BankUID='', sOut='', SCA;
		for(j=1;j<=c;j++){
			cr.ClearCash();
			cr.XMLCryptoParamsData=Top.GNP(SC.xml,j);
			SCA=SC.selectNodes('/Signs/Sign').item(j-1).attributes;
			n=SCA.getNamedItem('SignNumber').nodeValue
			s=(parseInt(n)<0)?PLRS13:Top.LRSSig15+n
			sOut+='\n\n'+PLRS11+Top.XMLhexDecode(SCA.getNamedItem('DisplayName').nodeValue)+' ('+s+')';
			if(bCert && da.CName.value!='')if(!cr.ImportCryptoObject('',11,0,sCert));// continue;

			var bR=(top.bDemo)?true:cr.VerifyData(w.dlh,tt.UnMime(sKvit),sSign);
			if(bR){
				if(top.bDemo)BankUID=top.nv.MyTools.UnMime(sSign)
				else if(BankUID=='')BankUID=cr.CurrentUID;
				sOut+='\n'+PLRS12+'\n'+PLRS6;
			}
			else sOut+='\n'+PLRS12+'\n'+PLRS10+cr.LastError+').';
		}
		signInfo=PLRS8;
		if(BankUID!=''){
			w.WaitMes.innerText=Top.LRS3;
			var URL="SID="+da.SID.value+"&t=RT_1Kvit.getBankDisplayName&tms="+Top.fnRnd();
			oX=new ActiveXObject(Top.XMLHTTP_ID);
			oX.open("POST",Top.XMLScriptPath,false);
			oX.setRequestHeader("Rts-Request",URL);
			var sXT=Top.GetSimpleXML_1251('R');
			var oRoot=sXT.documentElement;
			var oAttr=sXT.createAttribute('BankUID');
			oAttr.text=Top.XMLhexEncode(BankUID);
			oRoot.setAttributeNode(oAttr);
			oX.send(sXT);
			var oXML=oX.responseXML;
			w.WaitMes.innerText='';
			if(oXML.documentElement!=null){
				if (oXML.documentElement.text!="-1") signInfo=PLRS9+oXML.documentElement.text+'\n';
			}
		}
		if(sSign.length>1024) sSign=sSign.substr(0,1024)+'…';
		alert(signInfo+PLRS7+sSign+sOut);
	}
	else alert(PLRS5);
}

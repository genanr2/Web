var fD, wda, wfD, arrCC, NDSType=0;
var paType,raType,NumLen, inputErrorCode=0;
var NamesStr='BankPlaceType=RECEIVERPLACETYPE,BankPlace=RECEIVERPLACE,BankType=RECEIVERBANKTYPE,BankName=RECEIVERBANKNAME,BIC=RECEIVERBIC,CorrAccount=RECEIVERCORRACCOUNT,Account=RECEIVERACCOUNT,INN=RECEIVERINN,PropertyType=RECEIVERPROPERTYTYPE,NameShort=RECEIVER,KPP=RECEIVERKPP,PaymentUrgent=PAYMENTURGENT,Ground=GROUND';
var start138i=false;

function setNDSVal(si,na,bF){
	var nds=Top.NormalizeMoney(na[0],true),am=Top.NormalizeMoney(na[1]);
	if(nds=='')nds='__.__'
	var s=fD.selectSingleNode('//NTPL').text,b=false;;
	s=s.replace(/<\&n>/g,'\n')
	s=s.replace(/<\&p>/g,da.NDSP.value)
	s=s.replace(/<\&r>/g,nds.slice(0,nds.indexOf('.')))
	s=s.replace(/<&k>/g,nds.slice(nds.indexOf('.')+1,nds.length))
	sG=df.GROUND.value.replace(/(\r\n.*НДС.*)/,'');
	sA='';
	if(!bF){
		switch(si){
			case '2':sA='\n'+PLRS1+am;
			case '1': case '3': case '4': b=confirm(PLRS2+sG+s+sA);if(b)df.GROUND.value=sG+s;
		}
		if(b){
			switch(si){
				case '2':df.AMOUNT.value=am;
				case '1':df.iNDS.value=nds;
			}
		}
	}else da.addNds.alt=da.addNds.title=PLRS9+s;
}

function fnNDSType(si){
	var f1=f3=false,f2=f4='';
	switch (si){
		case '0':case '4' :f1=false;f2='elm-inp';f3=true;f4='InpDsbD0';break;
		case '1':case '2' :f1=true;f2='InpDsbD0';f3=false;f4='elm-inp';break;
		case '3':da.iNDS.value='';f1=true;f2='InpDsbD0';f3=true;f4='InpDsbD0';break;
	}
	da.iNDS.readOnly=f1;da.iNDS.className=f2;da.NDSP.readOnly=f3;da.NDSP.className=f4
	sN=da.NDSP.value;
	if(sN=='')sN='__'
	da.NDSCalcuType.title=fD.selectSingleNode('//NDSH').text.replace(/<NDS>/,sN)
}

function calcN(si){
	var ndsp=parseFloat(df.NDSP.value,10);am=parseFloat(df.AMOUNT.value,10),s='';
	if(si=='1')s=(ndsp*am)/(ndsp+100);
	if(si=='2'){s=(ndsp*am)/100;am=am+s;}
	if(si=='4')s=parseFloat(df.iNDS.value,10);
	return Array (Top.NormalizeMoney(s,true),Top.NormalizeMoney(am))
}

function fnAddNDSNote(bF){
	var si=da.NDSCalcuType.value,ndsp,am,nds;
	if(!bF){
		if(si=='0'){alert(PLRS32);return}
		if (!(Top.SubCheckEmptyMoney(w,'AMOUNT','',PLRS33,true))) return;
		if (!(Top.SubCheckEmptyTrim(w,'GROUND','',PLRS31,true))) return;
		if((si=='1')||(si=='2'))if (!(Top.SubCheckEmptyMoney(w,'NDSP','',PLRS34,true))) return;
		if(si=='4'){
			if (!(Top.SubCheckEmptyMoney(w,'iNDS','',PLRS35,true))) return;
			if(Top.NormalizeMoney(df.NDSP.value)<=0)return;
		}
	}
	w.NSet=true;
	setNDSVal(si,calcN(si),bF);
	fnNDSType(si)
}

function chkAm(){
	var si=da.NDSCalcuType.value,sN=da.iNDS.value;
	if(w.NSet && si!='' && da.NDS.value!=''){
		n=calcN(si);
		if((si=='1')||(si==2))if(n[0]!=sN)alert(PLRS3+sN+PLRS4+n[0]+PLRS5);
		if(si=='4'){alert(PLRS3+sN+PLRS6+n[1]+PLRS5)}
	}
}

function addKPP(){
	var i=df.PAYER.value.indexOf(PLRS21);
	if (i >= 0&&!confirm(PLRS12)) return;
	df.PAYER.value=PLRS21+df.PAYERKPP.value+' '+df.PAYERPROPERTYTYPE.value+' '+df.PAYER.value;
	df.PAYERPROPERTYTYPE.value='';
}

//	Cкрипты, действующие ON SUBMIT
function fnOnSubmit(){
	if (w.inputErrorCode != 0) { // Если какой-либо инпут при потере фокуса обругался то Submit'a не будет
		return false;
	}
	var i=(df.STATUS.value != Top.sST_TPL) ? fnCheckEmty(): true;
	return (i);
}

function fnCheckEmty(){
	var b=true;
	b=Top.fnChkNumberLen(w,df.DOCUMENTNUMBER,b);
	b=Top.SubCheckEmpty(w,'DOCUMENTDATE','',PLRS14,b);
	b=Top.SubCheckEmptyMoney(w,'AMOUNT','',PLRS15,b);
	b=Top.SubCheckEmpty(w,'PAYER','',PLRS23,b);
	if(df.STAT1256.value=='03' || df.STAT1256.value=='19'){
		//if(fD.selectSingleNode('//I').text==fD.selectSingleNode('//I_').text) fD.selectSingleNode('//I').text='';
		b=Top.SubCheckEmpty(w,'PAYERINN','',PLRS20,b);
	}
	b=Top.SubCheckEmpty(w,'RECEIVER','',PLRS16,b);
	//b=Top.SubCheckEmpty(w,'RECEIVERACCOUNT','',PLRS17,b);
	b=Top.SubCheckEmpty(w,'RECEIVERBIC','',PLRS18,b);
	b=Top.SubCheckEmpty(w,'RECEIVERBANKNAME','',PLRS19,b);
	if(b&&(((df.DOCDATEPARAM2.value!='')||(df.DOCDATEPARAM3.value!=''))&&(parseInt(df.DOCDATEPARAM2.value,10)>12))){
		alert(PLRS24);
		try{df.DOCDATEPARAM2.focus()}catch(e){};
		b=false;
	}
	if(b&&(df.DOCDATEPARAM2.value!='')&&(df.DOCDATEPARAM3.value.length<4)){
		alert(PLRS25);
		try{df.DOCDATEPARAM3.focus()}catch(e){};
		b=false;
	}
	if(b && df.vTAXPAYTYPE.value==2 && df.v2TPP1.value.length!=8){
		alert(PLRS40);
		try{df.v2TPP1.focus()}catch(e){};
		b=false;
	}
	return (b);
}

// MISC
// Подстановка тестовых значений.
function fnCreateNumber(){
	if (!Top.IsDEBUG){return;};
	var nd, msdiff, s, s1, s2, pow;
	s=""; s1="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	nd=new Date();
	mdf=Math.round(nd.getTime()/1000-900000000);
	s2=nd.getTime().toString()
	df.RECEIVERACCOUNT_.value=df.RECEIVERACCOUNT.value="408078104001"+s2.substr(4,8);
	df.RECEIVERCORRACCOUNT.value="301018107000"+s2.substr(4,8);
	df.RECEIVERINN.value="77"+s2.substr(4,8);
	df.RECEIVERBIC.value="044583"+s2.substr(9,3);
	df.RECEIVERBANKTYPE.value="AKБ";
	df.RECEIVERBANKNAME.value="БАНК No "+s2.substr(9,3);
	df.RECEIVERPLACE.value="Нью Васюки ";
	df.RECEIVER.value="Получ. No "+s2.substr(9,3);
	df.AMOUNT.value=s2.substr(9,3)+'.'+s2.substr(7,2);
	df.GROUND.value="Основание No "+s2.substr(9,3);

	pow=Math.log(mdf)/Math.log(61);
	for (i=0; i<pow; i++ ){
	s=(i==0) ? ("-"+mdf%61) : (s1.charAt(mdf%61)+s);
	mdf=Math.floor(mdf/61);
	}
	event.cancelBubble=true;
}

function chngCodeUIPStyle(){
	var startDate = parseInt(fD.selectSingleNode("//CUIPD").text.split('.').reverse().join(''));
	var docDate = parseInt(df.DOCUMENTDATE.value.split('.').reverse().join(''));
	if(docDate<startDate){
		df.CODEUIP.readOnly=true;
		df.CODEUIP.className='InpDsbD0';
	}else{
		df.CODEUIP.readOnly=false;
		df.CODEUIP.className='elm-inp';
	}
}

function InitForm(){
	fD=da.fData;
	arrCC=da.CurrCodeArr.innerText.split("|");
	setTPT();
	changeS1256(da.STAT1256,false);
	chngCodeUIPStyle();

	start138i=CheckIs138iStartByDocDate();
	if(start138i)
	  fnSetupPSViewMode(true);
	EnDisNRA();
	
	df.SENDTYPECODE.value=fD.selectSingleNode('//STC').text;
	
	if (fD.selectSingleNode("//DROW/@FILTERIDENT").text == 'IMPORTED') {
		tbMAP="01110001";
		top.SetToolBar(window);
		top.ShowToolBar(window);
	}
	fnAddNDSNote(1);
	fD.selectSingleNode("//PCA_").text=Top.addDelim2Acc(fD.selectSingleNode("//PCA").text);
	onChgRCA();
	if(start138i)
		parseGroundBy138i();
	fldsFromNote()
	setupAdd();
}

function onChgRCA(){
	fD.selectSingleNode("//RCA_").text=Top.addDelim2Acc(fD.selectSingleNode("//RCA").text);
}

function fnOnCngPAC(){
	var obj=df.PAYERACCOUNT;
	if(obj.selectedIndex>=0){
		fD.getElementsByTagName('PAC')(0).text=obj[obj.selectedIndex].value;
		df.CURRCODE.value=arrCC[obj.selectedIndex];
		EnDisNRA();
	}
}
//---------------- NRA ------------------
function AccType(acc){
	var accT=fD.getElementsByTagName('NRA')(0).text.split(','), l=accT.length;
	for (i=0; i < l; i++){//40807,40820,426,30231,40818,30230
		if (acc.indexOf(accT[i])==0) return true;
	}
	return false;
}

function doEnDis(act){
	df.OPERCODE.readOnly=act;
  Top.bSet(act,da.DP);Top.bSet(act,da.NRABtn);Top.bSet(act,da.OC);
	df.OPERCODE.className=(act)?'InpDsbD0':'Inp';
	if(act) df.OPERCODE.value='';
	for(var i=1; i<=5; i++) {
		with(df.item('PSN'+i)){
			readOnly=act;
			if(act) value='';
			className=(act)?'InpDsbD0':'Inp';
		}
	}
}

function EnDisNRA(){
	var pa=fD.getElementsByTagName('PAC')(0).text, ra=fD.getElementsByTagName('RAC')(0).text;
	var gr=df.GROUND, p;
	paType=AccType(pa);
	raType=AccType(ra);
	if (!paType&&!raType) {
		doEnDis(true);

	}
	else doEnDis(false);
}

function addSL(s){
	if(!s) return '';
	var s1=s;
	s1=s.substr(0,8)+'/'+s.substr(8,4)+'/'+s.substr(12,4)+'/'+s.substr(16,1)+'/'+s.substr(17,1);
	return s1;
}

function parseVO(s){
	for (var i=0;i<s.length;i++){if (isNaN(parseInt(s.substr(i,1)))) return false;}
	return true;
}

function fnGetUINEndIndex(gr){
	j=0;
	if(gr.substr(0,3)=='УИН'){
		if(gr.substr(3,4)=='0///')j=7;
		if(gr.substr(23,3)=='///')j=26;
	}
	return j;
}

function fnAddNote(){
	var gr=df.GROUND, oc=df.OPERCODE.value, psn=addSL(df.PSNUMBER.value);
	var j=0, uin='', k=0;
	var startDate = parseInt(fD.selectSingleNode("//SD107").text.split('.').reverse().join(''));
	var uipDate = parseInt(fD.selectSingleNode("//CUIPD").text.split('.').reverse().join(''));
	var docDate = parseInt(df.DOCUMENTDATE.value.split('.').reverse().join(''));
	if (oc!=''||psn!=''){
		//если дата док-та больше, чем дата в OrderStartFlag, то инф-я подставляется в начало
		//поля назначение платежа, игнорируя наличие символов УИП*///
		if (docDate>startDate) j=fnGetUINEndIndex(gr.value);
		if (docDate>=uipDate) j=0;
		if(j>0)uin=gr.value.substr(0,j);
		while(gr.value.charAt(j)==' '){
			j++;
		}
		if (gr.value.substr(j,3)=='{VO'&&parseVO(gr.value.substr(j+3,5))){
			var p=gr.value.substr(j,33).indexOf('}');
			if (p==-1) {alert(PLRS27); return;}
			if (oc!='') {
				if (oc.length!=5) {alert(PLRS28);df.OPERCODE.focus();return;}
				else gr.value=uin+'{VO'+oc+gr.value.slice(j+8);
			}
			if (psn!='') {
				if (psn.length!=22) {alert(PLRS29);df.PSN1.focus();return;}
				else gr.value=gr.value.substr(0,j+8)+'PS'+psn+gr.value.slice(j+p)
			}
			else gr.value=gr.value.substr(0,j+8)+gr.value.slice(j+p)
		}
		else {
			if (oc=='') {alert(PLRS26); df.OPERCODE.focus();}
			else {
				if (oc.length!=5) {alert(PLRS28);df.OPERCODE.focus();return;}
				if (psn.length!=22&&psn!='') {alert(PLRS29);df.PSN1.focus();return;}
				gr.value=uin+'{VO'+oc+((psn!='')?'PS'+psn:'')+'} '+gr.value.slice(j);
			}
		}
	}
}
function fldsFromNote(){
	var gr=df.GROUND.value;
	var fp=gr.indexOf('{')
	if(fp>-1){
		var lp=gr.indexOf('}',fp)
		if(lp>-1){
			var flds=gr.substring(fp+1,lp);
			if(flds.length==7 || flds.length==31){
				if(flds.indexOf('VO')>-1){
					df.OPERCODE.value=flds.substr(2,5);
					if(flds.indexOf('PS')>6){
						df.PSNUMBER.value=flds.substr(9).replace(/\//g,"");
						getPSN();
					}
				}
			}
		}
	}
}

function setPSN(o,n){
	df.PSNUMBER.value=df.PSN1.value+df.PSN2.value+df.PSN3.value+df.PSN4.value+df.PSN5.value;
	if(event.propertyName=='value' && df.PSNUMBER.value!=df.PSNUMBER.prevValue){
		var l=o.getAttribute("MAXLENGTH");
		if(o.value.length==l && n!=null) df.elements['PSN'+n].focus();
		df.PSNUMBER.prevValue=df.PSNUMBER.value;
	}
}

function getPSN(){
	var s=df.PSNUMBER.value;
	if(s) {
		df.PSN1.value=s.substr(0,8);
		df.PSN2.value=s.substr(8,4);
		df.PSN3.value=s.substr(12,4);
		df.PSN4.value=s.substr(16,1);
		df.PSN5.value=s.substr(17,1);
	}
}

function checkNonResBankAcc() {
	//наличие первых пяти символов счета получателя в настройке NonResBankAcc
	var sList=","+fD.selectSingleNode("//NRBA").text+",";
	return sList.indexOf(","+fD.selectSingleNode("//RAC").text.substr(0,5)+",")>-1;
}

function checkBalAccounts() {
	var b;
	//наличие первых пяти символов счета отправителя в настройке BalAccounts и непустота пок.стат.
	var sList=","+fD.selectSingleNode("//BACC").text+",";
	b = ((sList.indexOf(","+fD.selectSingleNode("//PAC").text.substr(0,5)+",")>-1)&&(df.STAT1256.value!=''));
	if (b) {
		if (fD.selectSingleNode("//RBACC").text == '') return true;
		var sList=","+fD.selectSingleNode("//RBACC").text+",";
		b = (sList.indexOf(","+fD.selectSingleNode("//RAC").text.substr(0,5)+",")>-1)
	}
	return b;
}

function setupAdd(){
	var enable=(checkNonResBankAcc()||checkBalAccounts());
	Top.bSet(!enable,da.btAdd);
}

function addAdd(){
	var sSep, sAddr, sLen;
	if (checkBalAccounts()) {
		sSep = '//';
	} else {
		sSep = fD.selectSingleNode("//PAS").text;
	}
	sAddr=sSep+fD.selectSingleNode("//PLA").text+sSep;
	sLen=fD.selectSingleNode("//MPL").text;
	if((df.PAYERPROPERTYTYPE.value+" "+df.PAYER.value+" "+sAddr).length <= parseInt(sLen,10))
		df.PAYER.value=df.PAYER.value+sAddr;
	else
		alert(PLRS41.replace(/%0:d/i, sLen).replace(/%1:s/i, sSep));
}

//---------------------------------------
function InitView(w){
	wda=w.document.all;
	wfD=wda.fData;
	if(wda.AM!=null)wda.AM.innerText=Top.extMoney(wfD.selectSingleNode('//AM').text);
	setTPTv();
}

function processPrintRow(ddr,xRow){
	if(xRow.selectSingleNode('GR/text()')!=null)ddr.sg.innerHTML=xRow.selectSingleNode('GR/text()').xml.replace(/\n/g,'<BR/>');
	Top.wordInTo(ddr.d32,ddr.d43,Top.getEM(xRow,"AM",0),Top.getEM(xRow,"CC",0),' - ');
}
function processPrintForm(w,xmlSrc){
	var da=w.document.all;
	xmlSrc.preserveWhiteSpace=true;
	if(da.DR.length==null)
		processPrintRow(da.DR.all, xmlSrc.selectSingleNode("//DROW"));
	else{
		for(j=0; j<da.DR.length; j++)
			processPrintRow(da.DR(j).all, xmlSrc.selectNodes("//DROW")(j));
		Top.insPageBr(da.DR);
	}
}


function checkFilterData(){
	return Top.fnChekDateDif(da.StartDate.value,da.EndDate.value,Top.LRSChecks12);
}

function EnDisFlds(b){
	if(b){df.vTAXPAYTYPE.value='1'; changeTPT(da.vTAXPAYTYPE,false);}
	Top.setInputDisabled(w, da.vTAXPAYTYPE, b);
	with(df){
		(b)?CBCCODE.value=OKATOCODE.value=PAYGRNDPARAM.value=TAXPERIODPARAM1.value=TAXPERIODPARAM2.value=TAXPERIODPARAM3.value=DOCNUMPARAM1.value=DOCNUMPARAM2.value=DOCDATEPARAM1.value=DOCDATEPARAM2.value=DOCDATEPARAM3.value=PAYTYPEPARAM.value='':'';
		CBCCODE.readOnly=OKATOCODE.readOnly=PAYGRNDPARAM.readOnly=v1TPP1.readOnly=TAXPERIODPARAM2.readOnly=TAXPERIODPARAM3.readOnly=DOCNUMPARAM2.readOnly=DOCDATEPARAM1.readOnly=DOCDATEPARAM2.readOnly=DOCDATEPARAM3.readOnly=PAYTYPEPARAM.readOnly=b;
		CBCCODE.className=OKATOCODE.className=PAYGRNDPARAM.className=v1TPP1.className=TAXPERIODPARAM2.className=TAXPERIODPARAM3.className=DOCNUMPARAM2.className=DOCDATEPARAM1.className=DOCDATEPARAM2.className=DOCDATEPARAM3.className=PAYTYPEPARAM.className=(b)?'InpDsbD0':'Inp';
		Top.bSet(b,BT1);Top.bSet(b,BT2);Top.bSet(b,BT3);Top.bSet(b,BT4);
	}
}
function changeS1256(o,bChangeINN){
	if(bChangeINN==null) bChangeINN=true;
	o.value=Top.Trim(fD.getElementsByTagName('S1256')(0).text);
	if(o.value=='') {EnDisFlds(true)} else EnDisFlds(false);
	if(o.value=='03' || o.value=='05' || o.value=='19' || o.value=='20' || o.value=='22' || o.value=='26'){
		df.PAYERINN.readOnly=false;
		df.PAYERINN.className='Inp';
		if(bChangeINN && o.value!='05' && fD.selectSingleNode('//I').text==fD.selectSingleNode('//I_').text) fD.selectSingleNode('//I').text='';
	}
	else{
		df.PAYERINN.readOnly=true;
		df.PAYERINN.className='InpDsbD0';
		if(bChangeINN) fD.selectSingleNode('//I').text=fD.selectSingleNode('//I_').text;
	}
}

function setTPT(){
	if(fD.selectSingleNode('//TPP1').text=='0') df.vTAXPAYTYPE.value='0';
	else if(fD.selectSingleNode('//TPP1').text.length>2) df.vTAXPAYTYPE.value='2';
	else df.vTAXPAYTYPE.value='1';
	changeTPT(da.vTAXPAYTYPE,false);
}
function setTPTv(){
	if(wda.vTAXPAYTYPEv!=null){
		if(wfD.selectSingleNode('//TPP1').text=='0'){
			wda.vTAXPAYTYPEv.innerText=wfD.selectSingleNode("//YS0").text;
			wda.TPPbl0v.style.display='inline';
			wda.TPPbl1v.style.display='none';
		}
		else if(wfD.selectSingleNode('//TPP1').text.length>2){
			wda.vTAXPAYTYPEv.innerText=wfD.selectSingleNode("//YS2").text;
			wda.TPPbl0v.style.display='inline';
			wda.TPPbl1v.style.display='none';
		}
		else{
			wda.vTAXPAYTYPEv.innerText=wfD.selectSingleNode("//YS1").text;
			wda.TPPbl0v.style.display='none';
			wda.TPPbl1v.style.display='inline';
		}
	}
}

function changeTPT(o,bChangeTPP){
	da.TPPbl0.style.display=da.TPPbl1.style.display=da.TPPbl2.style.display='none';
	switch(o.value){
		case '0':
			fD.selectSingleNode('//TPP1').text='0';
			fD.selectSingleNode('//TPP2').text=fD.selectSingleNode('//TPP3').text='';
			da.TPPbl0.style.display='inline';
			break;
		case '1':
			if(bChangeTPP) fD.selectSingleNode('//TPP1').text='';
			da.TPPbl1.style.display='inline';
			break;
		case '2':
			if(bChangeTPP) fD.selectSingleNode('//TPP1').text='';
			w.fData.selectSingleNode('//TPP2').text=w.fData.selectSingleNode('//TPP3').text='';
			da.TPPbl2.style.display='inline';
			break;
	}
}

function changeTPP(o){
	if(o.value=='ГД')
		df.TAXPERIODPARAM2.value='00';
	else if(o.value=='0'){
		df.TAXPERIODPARAM2.value='';
		df.TAXPERIODPARAM3.value='';
	}
}

function changeRA(o){
	if((df.KPPCheckList!=null)&&(o.value.length>=1)){
		var i,sa=df.KPPCheckList.value.split(";");
		for(i in sa){
			if(o.value.substr(0,sa[i].length)==sa[i]){
/*
				if(df.STAT1256.value.length < 2) {
					df.STAT1256.value=df.MNSStatusParam.value;
					changeS1256(df.STAT1256);
				}
*/
				if(df.PAYERINN.value.length==12) df.PAYERKPP.value=df.PAYERKPP_.value;
			}
		}
	}
}

function CheckCorrespData(){
	var b=true;
	b=Top.SubCheckEmpty(w,'RECEIVER','',PLRS16,b);
	b=Top.SubCheckEmpty(w,'RECEIVERACCOUNT','',PLRS17,b);
	b=Top.SubCheckEmpty(w,'RECEIVERBIC','',PLRS18,b);
	return (b);
}

function copyVal(){if(da.AMOUNTMAX.value=='') da.AMOUNTMAX.value=da.AMOUNT.value;}

function CheckIs138iStartByDocDate(){
	var r=false;
	var sdocDate=df.DOCUMENTDATE.value;
	if((sdocDate=='') || (sdocDate=='__.__.____')){
		r=start138i;
		return(r);
	}  
	sdocDate=sdocDate.replace(/(\d+).(\d+).(\d+)/, '$2-$1-$3');
	
	if(Date.parse(df.StartDate138i.value)<=Date.parse(sdocDate))
		r=true;
		
	return (r);
}

function fnSetupPSViewMode(bIsInit){
	if(start138i){
		if(!bIsInit){
			df.OPERCODE.value='';

			df.PSN1.value='';
			df.PSN2.value='';
			df.PSN3.value='';
			df.PSN4.value='';
			df.PSN5.value='';		
			df.PSNUMBER.value='';
		}
		df.PSN1.style.display='none';
		df.PSN2.style.display='none';
		df.PSN3.style.display='none';
		df.PSN4.style.display='none';
		df.PSN5.style.display='none';
		da.DP.style.display='none';
		
		da.t_i18.style.display='none';
		da.t_i19.style.display='none';
		da.t_i20.style.display='none';
		da.t_i21.style.display='none';
		da.t_i22.style.display='none';
		
		da.NRABtn.alt=PLRS43;
	}
	else{
		df.PSN1.style.display='';
		df.PSN2.style.display='';
		df.PSN3.style.display='';
		df.PSN4.style.display='';
		df.PSN5.style.display='';
		da.DP.style.display='';
		
		da.t_i18.style.display='';
		da.t_i19.style.display='';
		da.t_i20.style.display='';
		da.t_i21.style.display='';
		da.t_i22.style.display='';
		
		da.NRABtn.alt=PLRS42;
		
		EnDisNRA();		
	}
}

function docDateLostFocus(){
	var tmpIsStart138i=CheckIs138iStartByDocDate();
	if(tmpIsStart138i==start138i)
	  return;
	  
	start138i = tmpIsStart138i;  
	fnSetupPSViewMode(false);  
}

function fnPayOperTypeClick(){
	if(start138i)
	  Top.Dict(w,'PAYOPERTYPEINT138I')
	else
		Top.Dict(w,'PAYOPERTYPEINT');
}

function parseGroundBy138i(){
	var sGround=df.GROUND.value;
	var fp=sGround.indexOf('{')
	if(fp>-1){
		var lp=sGround.indexOf('}',fp)
		if(lp>-1){
			var j=fnGetUINEndIndex(sGround);
			var uin='';
			if(j>0)uin=sGround.substr(0,j);
			var sTmpGround=sGround.substr(lp);
			var flds=sGround.substring(fp+1,lp);
			if(flds.length==7 || flds.length==31){
				if(flds.indexOf('VO')>-1){
					if(flds.indexOf('PS')>6){
						sGround=uin+'{VO'+flds.substr(2,5)+sTmpGround;
						df.GROUND.value=sGround;
					}
				}
			}
		}
	}
}

function setSendType(stText){
	var selElem = df.SENDTYPETEXT;
	for(var i=0; i<selElem.options.length; i++){
		if(selElem.options[i].text == stText){
			selElem.selectedIndex = i;
			df.SENDTYPECODE.value = selElem.value;
			break;
		}
	}
}

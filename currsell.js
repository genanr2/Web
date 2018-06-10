var arrPO, arrFO, arrCC1, arrCCISO1, arrCC2, arrCCISO2, arrCCC, arrDT, arrDAD1, arrDAD2, CBB, DBB, fD, NumLen, inputErrorCode=0;

function fnOnSubmit(){
	//проверка по DTYPE
	if (w.inputErrorCode!=0) return false;
	da.GROUNDDOC.value = da.fData.selectSingleNode('//CP').xml;
	var i=(df.STATUS.value!=Top.sST_TPL) ? fnCheckEmty() : true;
	return (i);
}

function fnCheckEmty(){
	var b=true, ad, ac;
	b=Top.fnChkNumberLen(w,df.DOCUMENTNUMBER,b);
	b=Top.SubCheckEmpty(w,'DOCUMENTDATE','',PLRS2,b);
	b=Top.SubCheckEmpty(w,'CUSTOMERNAME','',PLRS3,b);
	if (df.TRANSFER(0).checked) acc='ACCOUNTDEBET1';
	else {
		b=Top.SubCheckEmpty(w,'TRANSFERDOCUMENTNUMBER','',PLRS6,b);
		b=Top.SubCheckEmpty(w,'TRANSFERDOCUMENTDATE','',PLRS8,b);
		acc='ACCOUNTDEBET2';
	}
	b=Top.SubCheckEmpty(w,acc,'',PLRS5,b);
	if (df.BANK(0).checked) acc='ACCOUNTCREDIT1';
	else {
		acc='ACCOUNTCREDIT2';
		if ((w.df[acc].value.length!='')&&(w.df[acc].value.length!=20)&&b){
			alert(PLRS13);
			w.df[acc].focus();
			return false;
		}
		b=Top.SubCheckEmpty(w,'CREDITBANKBIC2','',PLRS14,b);
	}
	b=Top.SubCheckEmpty(w,acc,'',PLRS7,b);
	if(b && da.RRT2.checked)
		b=Top.SubCheckEmpty(w,'REQUESTRATE','',PLRS18,b);
	if(b && df.DEALTYPE.value=='Ќа межбанковском рынке')//локализовать ресурс не надо!
		b=Top.SubCheckEmpty(w,'REQUESTRATE','',PLRS17,b);
	if(b && df.SUPPLYCONDITION.value!='' && df.SUPPLYCONDITION.value!='-')
		b=Top.SubCheckEmpty(w,'SUPPLYCONDITIONDATE','',PLRS19,b);
	b=Top.SubCheckEmptyMoney(w,'AMOUNTDEBET','_',PLRS20,b);
	b=Top.SubCheckEmptyMoney(w,'AMOUNTCREDIT','_',PLRS21,b);
	return (b);
}

function ShowEditDialog(w){
	ACTID=w.ACTION;

	var adddocURL='../scheme/currsell/GroundDocs_form_' + Top.LanguageID.toLowerCase() + '.htm?ACT='+ACTID;
	return showModalDialog(adddocURL,w,"dialogWidth: 550px; dialogHeight:240px; center: yes; edge: raised; help: no; resizable: no; scroll: no; status: no; unadorned: yes;");
}

function InitForm(){
	fD=mw.da.fData;
	//инициализаци€ массивов
	arrPO=da.PhoneOfficialArr.innerText.split("|");
	arrFO=da.FaxOfficialArr.innerText.split("|");
	arrCC1=da.CurrCodeArr.innerText.split("|");
	arrCCISO1=da.CurrCodeISOArr.innerText.split("|");
	arrCC2=da.CurrCode2Arr.innerText.split("|");
	arrCCISO2=da.CurrCodeISO2Arr.innerText.split("|");
	arrCCC=da.CurrCodeCArr.innerText.split("|");
	arrDT = da.DocumentTypeArr.innerText.split("|");
	arrDAD1=da.DADArr.innerText.split("|");
	arrDAD2=da.DAD2Arr.innerText.split("|");
	CBB=fD.getElementsByTagName("CBB")(0).text;
	DBB=fD.getElementsByTagName("DBB")(0).text;
	if (fD.getElementsByTagName("SO1")(0).text=='0'){da.SENDEROFFICIALS2.style.display='block';}
	else{da.SENDEROFFICIALS2.style.display='none';}

	var s=fD.getElementsByTagName("DAD")(0).text;
	if(s!='') da.AMOUNTDEBET.setAttribute('DAD',s);
	chkRRT();
	chkCHT();
	onChgSC();
	if (fD.getElementsByTagName("TDN")(0).text==''){
		da.TRANSFER[0].checked=true;
		ShHBnk('trans2','trans1');
	}
	else {
		da.TRANSFER[1].checked=true;
		ShHBnk('trans1','trans2');
	}
	if (CBB==DBB){
		da.BANK[0].checked=true;
		ShHBnk('bnk2','bnk1');
	}
	else {
		da.BANK[1].checked=true;
		ShHBnk('bnk1','bnk2');
	}
	var l=fD.getElementsByTagName('CP')(0).selectNodes('DOC').length;
	if ((fD.getElementsByTagName('FOC')(0).text!='1') && (fD.getElementsByTagName('GD')(0).text!='1') && (l==1) && fD.getElementsByTagName('OC')(0).text=='' && fD.getElementsByTagName('OCD')(0).text=='' && fD.getElementsByTagName('CDIN')(0).text=='' && fD.getElementsByTagName('CDID')(0).text=='')
		Top.HideBlock(da,2,"fHGD");
	else
		document.body.onclick=new Function("Top.RemoveTRSelection(window,'CP');");
}

function CalcAmt(cr,db,bl){
	if (fD.getElementsByTagName("CLCA")(0).text=='1'){
		var c=cr.value, d=db.value;
		if (((c!='' || d!='') && (c=='' || d=='')) || bl){
			var b,fld,r; b=(bl)?bl:c==''; fld=(b)?cr:db;
			r=df.REQUESTRATE.value;
			if ((r==''||r<0.00005)&&!bl) Top.setInputDisabled(w,fld,true);
			else if (((r==''||r<0.00005)&&bl)) {db.value=Top.NormalizeMoney(db.value,false,db.getAttribute('DAD'))}
			else {
				fld.value=(b)?Top.NormalizeMoney(db.value*r):Top.NormalizeMoney(cr.value/r,false,db.getAttribute('DAD'));
				Top.setInputDisabled(w,fld,false);
			}
		}else {Top.setInputDisabled(w,cr,false); Top.setInputDisabled(w,db,false);}
	}
}

function fnOnChangeSO(){
	var v=df.SENDEROFFICIALS1.value, i=df.SENDEROFFICIALS1.selectedIndex;
	df.SENDEROFFICIALS2.style.display=('0'==v)?'block':'none';
	df.SENDEROFFICIALS.value=('0'==v)?'':v;
	df.SENDEROFFICIALS2.value='';
	df.PHONEOFFICIAL.value=arrPO[i];
	df.FAXOFFICIAL.value=arrFO[i];
}

function chkRRT(){
	try{
		if(fD.selectSingleNode("//RRT").text=='0')
			with(df.REQUESTRATE){value=''; readOnly=true; className='InpDsbD0';}
		else
			with(df.REQUESTRATE){readOnly=false; className=''; focus();}
	}catch(e){}
}

function chkCHT(){
	if(fD.selectSingleNode("//CHT").text=='1'){
		with(df.CHARGEACCOUNT){value=''; disabled=true;}
		da.btnCHA.disabled=true;
		da.CHBB.value='';
	}
	else{
		df.CHARGEACCOUNT.disabled=false;
		da.btnCHA.disabled=false;
		da.CHBB.value=fD.selectSingleNode("//DBB").text;
	}
}

function onChgSC(){
	if(fD.selectSingleNode('//SC').text=='' || fD.selectSingleNode('//SC').text=='-'){
		with(df.SUPPLYCONDITIONDATE){value=''; readOnly=true; className='InpDsbD0';}
		Top.bSet(true,da.btnSCD);
	}
	else{
		with(df.SUPPLYCONDITIONDATE){readOnly=false; className='';}
		Top.bSet(false,da.btnSCD);
	}
}

function fnOnChangeADB(n){
	eval('var i=df.ACCOUNTDEBET'+n+'.selectedIndex');
	if(i>=0){
		eval('df.CURRCODEDEBET.value=arrCC'+n+'[i]');
		eval('df.CURRISOCODE.value=arrCCISO'+n+'[i]');
		eval('df.ACCOUNTDEBET.value=df.ACCOUNTDEBET'+n+'.value');
		eval('df.AMOUNTDEBET.setAttribute("DAD",arrDAD'+n+'[i])');
		eval('fD.getElementsByTagName("DAD")(0).text=arrDAD'+n+'[i]');
		CalcAmt(df.AMOUNTCREDIT,df.AMOUNTDEBET,1);
	}
}

function ShHBnk(h,s){
	da[h].style.display='none';
	da[s].style.display='inline';
}

function fnOnClickBnk(h,s,a){
	ShHBnk(h,s);
	switch(a){
		case 'TRANSFER':
			df.CURRCODEDEBET.value='';
			df.CURRISOCODE.value='';
			df.AMOUNTDEBET.setAttribute("DAD",2);
			break;
		case 'BANK':
			df.CURRCODECREDIT.value='';
			df.CREDITBANKBIC.value='';
			df.ACCOUNTCREDIT.value='';
			df.ACCOUNTCREDIT2_.value='';
			df.CREDITBANKBIC2.value='';
			df.CREDITBANKTYPE.value='';
			df.CREDITBANKNAME.value='';
			df.CREDITBANKPLACETYPE.value='';
			df.CREDITBANKPLACE.value='';
			df.CREDITBANKCORRACC.value='';
	}
	switch(s){
		case 'trans1':
			df.TRANSFERDOCUMENTNUMBER.value='';
			df.TRANSFERDOCUMENTDATE.value='';
			df.MyObj.value='';
			df.ACCOUNTDEBET2.value='';
			break;
		case 'trans2':
			df.ACCOUNTDEBET1.value='';
			break;
		case 'bnk1':
			df.CREDITBANKBIC1.value=df.CREDITBANKBIC.value=df.DEBETBANKBIC.value;
			break;
		case 'bnk2':
			df.ACCOUNTCREDIT1.value='';
	}
}

function InitView(w){
	var wda=w.document.all, wfD=wda.fData;
	DBB=wfD.getElementsByTagName("DBB")(0).text;
	CBB=wfD.getElementsByTagName("CBB")(0).text;

	if (wfD.getElementsByTagName("TDN")(0).text==''){
		wda.trans2_.style.display='none';
		wda.trans1_.style.display='inline';
	}
	else {
		wda.trans1_.style.display='none';
		wda.trans2_.style.display='inline';
	}
	if (CBB=='') CBB=wfD.getElementsByTagName("CBB")(0).text=DBB;
	if (CBB==DBB){
		wda.bnk2_.style.display='none';
		wda.bnk1_.style.display='inline';
		wda.cbnk.style.display='none';
	}
	else {
		wda.bnk1_.style.display='none';
		wda.bnk2_.style.display='inline';
		wda.cbnk.style.display='inline';
	}
	if(wfD.getElementsByTagName("CHT")(0).text=='1')
		wda.cm1.style.display='none';
	else
		wda.cm2.style.display='none';

	var l=wfD.getElementsByTagName('CP')(0).selectNodes('DOC').length;
	if (wfD.getElementsByTagName('FOC')(0).text!='1' && wfD.getElementsByTagName('GD')(0).text!='1' && l==1 && wfD.getElementsByTagName('OC')(0).text=='' && wfD.getElementsByTagName('OCD')(0).text=='' && wfD.getElementsByTagName('CDIN')(0).text=='' && wfD.getElementsByTagName('CDID')(0).text=='')
		Top.HideBlock(wda,2,"vHGD",1);
}

function processPrintForm(w,xmlSrc){
	var da=w.document.all,killZeros=true;
	var DTv;
	if (da.DR.length==null){
		Top.wordInTo(da.CurWr,da.CurDg,xmlSrc.getElementsByTagName("AMD")(0).text,xmlSrc.getElementsByTagName("CCD")(0).text,'.',xmlSrc.getElementsByTagName("DAD")(0).text);
		Top.wordInTo(da.RurWr,da.RurDg,xmlSrc.getElementsByTagName("AMC")(0).text,xmlSrc.getElementsByTagName("CCC")(0).text,'.');
		da.CurDg.innerText=Top.extMoney(da.CurDg.innerText,' ');
		da.RurDg.innerText=Top.extMoney(da.RurDg.innerText,' ');
		var SCt=xmlSrc.getElementsByTagName("SC")(0).text, SCDt=xmlSrc.getElementsByTagName("SCD")(0).text;
		if(SCt=='' || SCt=='-') da.SC.innerText='-';
		else {
			da.SC.innerText=SCt;
			if(SCDt=='') Top.addSpaces(da.SCD,20);
			else da.SCD.innerText=SCDt;
		}

		setInnerText(da.aDb,getMaskedAccount(xmlSrc.getElementsByTagName("ADB")(0).text));
		setInnerText(da.aCr,getMaskedAccount(xmlSrc.getElementsByTagName("ACR")(0).text));
		setInnerText(da.aCh,getMaskedAccount(xmlSrc.getElementsByTagName("CAC")(0).text));
//		da.RequestRate.innerText=Top.extMoney(xmlSrc.getElementsByTagName("RR")(0).text,' ',killZeros);
		da.ACT.innerText=Top.extMoney(xmlSrc.getElementsByTagName('ACT')(0).text);
		da.ART.innerText=Top.extMoney(xmlSrc.getElementsByTagName('ART')(0).text);
		da.CA.innerText=Top.extMoney(xmlSrc.getElementsByTagName('CA')(0).text);
		da.CR.innerText=Top.extMoney(xmlSrc.getElementsByTagName('CR')(0).text,' ',killZeros)

		if (typeof(da.debet1) == 'object') {
			if (xmlSrc.getElementsByTagName("TDN")(0).text==''&& !(w.IsForm&&da.TRANSFER[1].checked)){
					da.debet1.style.display="inline";
					da.debet2.style.display="none";
				}
				else {
					da.debet1.style.display="none";
					da.debet2.style.display="inline";
				}
		}
	} else {
		for (j=0; j<da.DR.length; j++){
			Top.wordInTo(da.CurWr(j),da.CurDg(j),xmlSrc.getElementsByTagName("AMD")(j).text,xmlSrc.getElementsByTagName("CCD")(j).text,'.',xmlSrc.getElementsByTagName("DAD")(j).text);
			Top.wordInTo(da.RurWr(j),da.RurDg(j),xmlSrc.getElementsByTagName("AMC")(j).text,xmlSrc.getElementsByTagName("CCC")(j).text,'.');
			da.CurDg(j).innerText=Top.extMoney(da.CurDg(j).innerText,' ');
			da.RurDg(j).innerText=Top.extMoney(da.RurDg(j).innerText,' ');
			var SCt=xmlSrc.getElementsByTagName("SC")(j).text, SCDt=xmlSrc.getElementsByTagName("SCD")(j).text;
			if(SCt=='' || SCt=='-') da.SC(j).innerText='-';
			else {
				da.SC(j).innerText=SCt;
				if(SCDt=='') Top.addSpaces(da.SCD(j),20);
				else da.SCD(j).innerText=SCDt;
			}

			setInnerText(da.aDb(j),getMaskedAccount(xmlSrc.getElementsByTagName("ADB")(j).text));
			setInnerText(da.aCr(j),getMaskedAccount(xmlSrc.getElementsByTagName("ACR")(j).text));
			setInnerText(da.aCh(j),getMaskedAccount(xmlSrc.getElementsByTagName("CAC")(j).text));
//			da.RequestRate(j).innerText=Top.extMoney(xmlSrc.getElementsByTagName("RR")(j).text,' ',killZeros);
			da.ACT(j).innerText=Top.extMoney(xmlSrc.getElementsByTagName('ACT')(j).text);
			da.ART(j).innerText=Top.extMoney(xmlSrc.getElementsByTagName('ART')(j).text);
			da.CA(j).innerText=Top.extMoney(xmlSrc.getElementsByTagName('CA')(j).text);
			da.CR(j).innerText=Top.extMoney(xmlSrc.getElementsByTagName('CR')(j).text,' ',killZeros);

			if (typeof(da.debet1) == 'object') {
				if (xmlSrc.getElementsByTagName("TDN")(j).text==''&& !(w.IsForm&&da.TRANSFER[1](j).checked)){
					da.debet1(j).style.display="inline";
					da.debet2(j).style.display="none";
				}
				else {
					da.debet1(j).style.display="none";
					da.debet2(j).style.display="inline";
				}
			}
		}
		Top.insPageBr(da.DR);
	}
}

function checkFilterData(){
	return Top.fnChekDateDif(da.StartDate.value,da.EndDate.value,Top.LRSChecks12);
}

function getMaskedAccount(account){
	if (account.length > 0) return account.substr(0,5) + '.' + account.substr(5,3) + '.' + account.substr(8,1) + '.' + account.substr(9); else return '';
}

function setValue(obj,value){
	if (typeof(obj) == 'object') {
		obj.value = value;
		return true;
	} else return false;
}

function setInnerText(obj,innerText){
	if (typeof(obj) == 'object') {
		obj.innerText = innerText;
		return true;
	} else return false;
}

function changeSC(){
	if(fD.selectSingleNode('//SC').text=='' || fD.selectSingleNode('//SC').text=='-'){
		df.SUPPLYCONDITIONDATE.value='';
		Top.setInputDisabled(w,df.SUPPLYCONDITIONDATE,true);
		Top.bSet(true,da.btnSCD);
	}
	else{
		Top.setInputDisabled(w,df.SUPPLYCONDITIONDATE,false);
		Top.bSet(false,da.btnSCD);
	}
}

function dictPAYOPERTYPEINT(){
	var dd=Top.strToDate(df.DOCUMENTDATE.value);
	var di=Top.strToDate(fD.selectSingleNode('//DDi').text);
	var dictName=(dd<di)?'PAYOPERTYPEINT':'PAYOPERTYPEINT138I';
	Top.Dict(w,dictName,'','CurrConversion');
}

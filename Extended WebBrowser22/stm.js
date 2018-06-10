// 02 10 2001
var inputErrorCode=0, sViewFormURL, sCustId, sCustIdList="",dntConfirm=true;

var IsSTM=true, cr='\n', sD0, sD1, sD2;
function fnSF(){
	var bIsSF=da.SF.checked;
	da.REAP.disabled=!bIsSF;
	da.REAP.checked=bIsSF;
	doCheck(da.REAP,'//REAP');
	for(var i=0;i<da.FLD.length-1;i++){
		da.FLD[i].disabled=!bIsSF;
		if(!bIsSF) da.FLD[i].checked=false;
	}
}

function collectAccounts(v){
	var s='';
	if(da.cbAcc){
		var iCnt=da.cbAcc.length;
		if(!iCnt && da.cbAcc.checked) s=da.cbAcc.getAttribute("V");
		else{
			for(var i=0; i<iCnt; i++)
				if(da.cbAcc[i].checked) s+=da.cbAcc[i].getAttribute("V")+', ';
			s=s.substr(0,s.length-2);
		}
	}
	if(s=='' && v==1)alert(w.PLRS2);
	df.Acc.value=s;
}

function SendXML(){
	var XMLHTTP=null, oXML;
		function doHttpReadyStateChange(){
			if (XMLHTTP.readyState == 4) {
			XMLHTTP.onreadystatechange=new Function("");
			receiveAccounts(XMLHTTP);
		} 
	}
	XMLHTTP=new ActiveXObject(Top.XMLHTTP_ID);
	XMLHTTP.Open("POST",Top.XMLScriptPath,true);
	XMLHTTP.onreadystatechange=doHttpReadyStateChange;
	var a=new Array();a[1]=mw;a[3]=df;
	oXML=Top.GetFParamsXML(w,XMLHTTP,a);
	XMLHTTP.Send(oXML);
}

function doCheck(o,nName){o.value=fData.selectSingleNode(nName).text=(o.checked)?'1':'0';}

function putSL(w,o){
	if (!o.all.Sl0){
		var i=w.document.createElement('<SPAN ID="Sl0" CLASS="SORTLNK_STM" CFLD="'+o.CFLD+'" DFLD="'+o.DFLD+'" TEXT="'+o.TEXT+'" onreadystatechange="if(this.readyState==\'complete\'){this.initSL();}">')
		o.appendChild(i)
	}else{if(!o.ACTIVEE){try{o.all.Sl0.initSL()}catch(e){}}}
}

function checkScHtc(w){
	var o=w.document.all.SRTLNK_M_STM,i;
	if(o){
		if(o.length){for(i=0;i<o.length;i++){putSL(w,o.item(i))}}
		else if(!o.initSL)putSL(w,o)
	}
}

function dis(obj,b){
	if(obj){
		var al=obj.length;
		if(!al) obj.disabled=b;
		else for(var i=0; i<al; i++) obj[i].disabled=b;
	}
}

function fnSTM(bS){
	if (w.inputErrorCode != 0) { // Если какой-либо инпут при потере фокуса обругался то Submit'a не будет
		return false;
	}

	if(!bS){Top.ACTS(w,'VIEW','RT_2STM.STM_view');return;}
	Top.clearMsg(w);
	if (Top.fnChekDateDif(da.FDATE0.value,da.FDATE1.value) && Top.fnChekDateDif('31.12.1979',da.FDATE1.value,PLRS1)){
		var vals=new Array(), URL;
		var wForms=w.document.forms;
		wForms('MForm').T.value=w.stmTask;
		if(bS==1) df.CRESORT.value=df.DRESORT.value='';

		dis(da.Acc,true);
		dis(da.cbAcc,true);
		URL=Top.GetFParams(wForms("MForm"));
		dis(da.cbAcc,false);

		var s='';
		for(var i=0; i<da.FLD.length;i++) s+=(da.FLD[i].checked)?'1'+',':'0'+',';
		URL += 'sh='+s+'&tms='+Top.fnRnd();
		Top.URLDebugInfo(URL,w,'_COPY_OF_XMLRESULT');
		collectAccounts(1);
		if(df.Acc.value=='') return;
		w.WaitMes.innerText=Top.LRS3;

		var XMLHTTP=null;
		XMLHTTP=new ActiveXObject(Top.XMLHTTP_ID);
		XMLHTTP.Open("POST",Top.XMLScriptPath,false);
		XMLHTTP.setRequestHeader("Rts-Request",URL);

		var oXML=Top.GetSimpleXML_1251('X');
		var oRoot=oXML.documentElement;
		var oAttr=oXML.createElement('ACC');
		oAttr.text=df.Acc.value;
		oRoot.appendChild(oAttr);
		XMLHTTP.send(oXML);
		if(XMLHTTP.readyState==4){
			var oX=XMLHTTP.responseXML, map=tbMAP, sV='none';
			var sE=Top.GetSTErrorFromXML(oX,false);
			if(sE!='') Top.placeMsg(sE,w);
			else{
				ScData.loadXML(XMLHTTP.responseXML.xml);

				//Loading OutputViewForm
				xData.async=false;
				xData.preserveWhiteSpace=false;
				xData.load(sViewFormURL);
				if ((ScData.readyState == "complete") && (xData.readyState == "complete")){
					var Err=Top.GetSTErrorFromXML(ScData)+Top.GetSTErrorFromXML(xData);
					if (Err != '') Top.addMsg(Err,w);
					else{
						sh(da.AddFldsSw,da.AddFlds,false);
						map=w.tbMAP2; sV='block';
						xslViewTarget.style.verticalAlign='top';
						xslViewTarget.innerHTML=ScData.transformNode(xData.XMLDocument);
					}
				}
			}
			Top.SetCustomToolBar(w,tbPanID,map);
			xslViewTarget.style.display=sV;
			checkScHtc(mw);
		}
	}
	w.WaitMes.innerText='';
} // fnSTM

// ############################# select Customer&Account ################################
function createCustSelect(){
	var sA=fD.selectSingleNode("//BXD/DROW/Acc/@V").nodeValue, sC="";
	if(sA!='')
		sC=fD.selectSingleNode("//BXD/DROW/OPS/O[@A='"+sA+"']/@CID").nodeValue;
	var oORG=fD.selectNodes('//ORGS/ORG');
	var oOPTION=document.createElement('OPTION');
	var oORGi, cOPTION;
	for(var i=0; i<oORG.length; i++){
		oORGi=oORG(i);
		cOPTION=oOPTION.cloneNode();
		cOPTION.innerText=oORGi.text;
		cOPTION.value=oORGi.getAttribute("CID");
		if(sA!=''&&cOPTION.value==sC || sA==''&&oORGi.getAttribute("Main")=='1')
			cOPTION.selected=true;
		df.selectMain.appendChild(cOPTION);
	}
	if(i>1){
		cOPTION=oOPTION.cloneNode();
		cOPTION.innerText=PLRS3;
		df.selectMain.appendChild(cOPTION);
	}
	chgCustSelect(sA);
}

function chgCustSelect(sA){
	sCustId=df.selectMain.options(df.selectMain.selectedIndex).value;
	createCurrSelect();
	createAccList(sA);
}

function sortCurrs(a,b){
	r=0;
	if(a=="RUR") r=-1; else if(b=="RUR") r=1;
	else if(a=="USD") r=-1; else if(b=="USD") r=1;
	else if(a=="EUR") r=-1; else if(b=="EUR") r=1;
	if(r==0) r=(a>b)?1:-1;
	return r;
}

function createCurrSelect(){
	df.selCCI.innerHTML="";
	var sCond=(sCustId=="")? "":"[@CID='"+sCustId+"']";
	var arr1=new Array(), oCurr=fD.selectNodes("//OPS/O"+sCond+"/@CCI");
	// get rid of doubles
	for(var i=0; i<oCurr.length; i++)
		arr1[oCurr(i).text]=oCurr(i).text;
	// sort
	var arr2=new Array();
	for(var k in arr1)
		arr2.push(arr1[k]);
	if(sCustId=="")arr2=arr2.sort(sortCurrs);

	var oOPTION=document.createElement('OPTION');
	for(var i=-1; i<arr2.length; i++){
		cOPTION=oOPTION.cloneNode();
		if(i==-1){
			cOPTION.value=""
			cOPTION.innerText=PLRS3;
		}
		else
			cOPTION.value=cOPTION.innerText=arr2[i];
		df.selCCI.appendChild(cOPTION);
	}
	df.selCCI.options(0).selected=true;
}

function createAccList(sA){
	da.dACC.innerHTML="";
	var sCCI=df.selCCI.options(df.selCCI.selectedIndex).value;
	var k=0;
	if(sCCI!=""){
		sCCI="@CCI='"+sCCI+"'";
		k++;
	}
	var sCond="";
	if(sCustId!=""){
		sCond="@CID='"+sCustId+"'";
		k++;
	}
	var sAnd=(k==2)? "&&":"";
	sCond=(k==0)?"":"["+sCond+sAnd+sCCI+"]";
	var oAcc=fD.selectNodes("//OPS/O"+sCond);

	for(var i=0; i<oAcc.length; i++){
		var sAcci=oAcc(i).getAttribute("A"), sCustIDi=oAcc(i).getAttribute("CID");
		var oInp=document.createElement('<INPUT TYPE="checkbox" CLASS="rb" NAME="cbAcc" ID="Acc'+i+'" onclick="setAllAcc(this)">'),
			oSp=document.createElement('SPAN'),
			oLbl=document.createElement('<LABEL FOR="Acc'+i+'">')
			oText=document.createTextNode(" "+Top.addDelim2Acc(sAcci));
		oInp.setAttribute("V",sCustIDi+"="+sAcci);
		da.dACC.appendChild(oInp);
		if(sA && sA==sAcci)
			oInp.checked=true;
		oSp.appendChild(oText);
		oLbl.appendChild(oSp);
		da.dACC.appendChild(oLbl);
		da.dACC.appendChild(document.createElement('BR'));
	}
	if(sA) da.AllAcc.checked=false;
	else checkAllAccs();
}
// ============================= EOF select Customer&Account =========================

function InitForm()
{
	window.w=window;
	with(w){
		Top=top.Top;
		IsForm=1;
		document.oncontextmenu=Top.OnCntxtMnu;
	}
	Top.AsignFrameAliases(w);
	Top.attachHandlersToFields(xForm.XMLDocument.selectSingleNode('//TABLE[@ID="EDITFORM"]'),w);
	Top.DoXSLTransForm(w);
	Top.InitObjectsAliases(w);
	try{da.DivGlobalID.style.display="block"}catch (e){};
	try{Top.SetToolsPannel(w)}catch(e){
	if(window.IsDEBUG)alert(e.description);}
	var d=w.document, oS=d.createStyleSheet(), oP=d.createStyleSheet(),
	s1="#FORSCREEN", s2="#xslPrintTarget", s3="{display:block;}", s4="{display:none;}";
	w.fD=mw.fData;// w.opR=mw.da.RSEL; w.opC=mw.da.CSEL;// w.opL=mw.da.LSEL;
	sViewFormURL = '../scheme/'+fD.selectSingleNode("//DROW/@V_XF").text+'_view_'+fD.selectSingleNode("//DROW/@LLNG").text+'.xsl';
	oS.media="screen";
	oS.addRule(s1,s3);
	oS.addRule(s2,s4+" border: 5mm solid #DADADA; background-color: gray;");
	oP.media="print";
	for (var i=0; i<d.styleSheets.length;i++) if (d.styleSheets(i).media=='print')w.PrnStyleSheet = i;
	with (mw)
	{
		cssText01=s1+s4+s2+s3;cssText10=s1+s3+s2+s4;
		ShowFHid=false;WID='SCROLLER';HlpString=Top.LRSscr1;
		document.body.onclick=new Function("Top.RemoveTRSelection(window,'SCROLLER');");
		STMprnTaskName=fD.selectSingleNode('//DROW/@T2').nodeValue;
	}

	da.AllAcc.checked=true;
	createCustSelect();
	initCustIdList();
	w.tbMAP2=Top.getEM(fD,'@T2_M',0);
	w.stmTask=Top.getEM(fD,'@T',0);
	onDCEval=Top.getEM(fD,'@DC',0);
	if (fD.selectSingleNode('//DROW/@FILTERIDENT').nodeValue=='EMPTYARC'){
		da.bBAL.style.display='none';
		da.tdBTN.style.textAlign='center';
	}
/*
	d.all.dINQ.style.display=(fD.selectSingleNode('//INQ/@S').nodeValue==1)?'inline':'none';
*/
	sD0=fD.selectSingleNode("//D0").text;
	sD1=fD.selectSingleNode("//D1").text;
	sD2=fD.selectSingleNode("//D2").text;
	setPeriod(true);
	df.SF.value=fD.selectSingleNode("//SF").text;
	df.SF.checked=(fD.selectSingleNode("//SF").text==1)?true:false;
	df.SDT2.value=fD.selectSingleNode("//SDT2").text;
	df.NL.value=fD.selectSingleNode("//NL").text;
	df.ISH.value=fD.selectSingleNode("//ISH").text;
	df.ISH.checked=(fD.selectSingleNode("//ISH").text==1)?true:false;
	df.REAP.value=fD.selectSingleNode("//REAP").text;
	fnSF();
	setChecks();
	ShowForm();
}

function initCustIdList(){
	oN=fD.selectNodes("//ORGS/ORG/@CID");
	for(var i=0; i<oN.length; i++){
		sCustIdList+=oN(i).text;
		if(i<oN.length-1) sCustIdList+=',';
	}
}

function STM_prn(){
	Top.RemoveTRSelection(window,'SCROLLER');
	mw.document.styleSheets(w.PrnStyleSheet).cssText=w.cssText10;
	var da=document.all, h6=da.H6, h11=da.H11, h6len=0;
	if (h6!=null) h6len=h6.length;
	for (var i=0; i< h6len;i++){
		if ((h6len>1) && (i<h6len-1)){
			if (h11==null) h6(i).style.pageBreakAfter="always";
			else h11(i).style.pageBreakAfter="always";
		}
	}
	window.focus();
	window.print();
}

function fnPRN_SelDocs(){
	mw.document.styleSheets(w.PrnStyleSheet).cssText=w.cssText01;
	Top.GetIDsEx(w,da.SCROLLER,'');
	if(da.SCROLLER.idrs==''){Top.fnHlp(w);return;}
	var wdf=mw.document.forms('MForm');
	var URL='T='+mw.STMprnTaskName+'&SID='+wdf.SID.value+'&SCHEMENAME='+wdf.SCHEMENAME.value+'&FILTERIDENT='+wdf.FILTERIDENT.value+'&tms='+ Top.fnRnd();
	Top.URLDebugInfo(URL,w,false); // Show request string in DEBUG mode
	// Download xData
	w.WaitMes.innerText=Top.LRS5;

	var XMLHTTP=null;
	XMLHTTP=new ActiveXObject(Top.XMLHTTP_ID);
	XMLHTTP.Open("POST",Top.XMLScriptPath,false);
	XMLHTTP.setRequestHeader("Rts-Request",URL);

	var oXML=Top.GetSimpleXML_1251('X');
	var oRoot=oXML.documentElement;
	var oAttr=oXML.createElement('IDRS');
	oAttr.text=w.da.SCROLLER.idrs;
	oRoot.appendChild(oAttr);
	XMLHTTP.send(oXML);
	if (XMLHTTP.readyState==4){
		var oX=XMLHTTP.responseXML;
		var sE=Top.GetSTErrorFromXML(oX,false);
		if(sE!='') Top.placeMsg(sE,w);
		else{
			xData.loadXML(oX.xml);
			setTimeout("Top.fnPRN(mw,'PRN',true);",100);
		}
	}
}

function goBalance(){
	if (w.inputErrorCode != 0) { // Если какой-либо инпут при потере фокуса обругался то Submit'a не будет
		return false;
	}
	var df=document.forms('MForm');
	collectAccounts(1);
	if (df.Acc.value=='')return;

	var XMLHTTP=null;
	XMLHTTP=new ActiveXObject(Top.XMLHTTP_ID);
	XMLHTTP.Open("POST",Top.XMLScriptPath,false);
	XMLHTTP.setRequestHeader("Rts-Request",'t=RT_2Balance.setAcc&SID='+Top.SID+'&tms='+Top.fnRnd());
	var oXML=Top.GetSimpleXML_1251('X');
	var oRoot=oXML.documentElement;
	var oAttr=oXML.createElement('Acc');
	oAttr.text=df.Acc.value;
	oRoot.appendChild(oAttr);
	XMLHTTP.send(oXML);
	if(XMLHTTP.readyState==4){}

	var sURL=Top.scriptPath+"?t="+Top.MainBllName + ".dictFRAMESET&sid="+df.SID.value+"&SCHEMENAME=BALANCE&tms="+Top.fnRnd();
	var retVal=w.showModalDialog(sURL,w,"dialogWidth:700px; dialogHeight:650px; help: no; status: no; resizable: yes;");
	if(typeof(retVal)=='string'&&retVal=='OpenNewSession') try{Top.location=Top.scriptPath+Top.OpenNewSessQ;}catch(e){}
}

function goStatementRu(){
	if (w.inputErrorCode != 0) { // Если какой-либо инпут при потере фокуса обругался то Submit'a не будет
		return false;
	}
	function addAttr(oX,sAtt){
		var oAttr=oX.createElement(sAtt);
		oAttr.text=df[sAtt].value;
		oX.documentElement.appendChild(oAttr);
	}
	var df=document.forms('MForm');
	collectAccounts(1);
	if (df.Acc.value=='')return;

	var XMLHTTP=null;
	XMLHTTP=new ActiveXObject(Top.XMLHTTP_ID);
	XMLHTTP.Open("POST",Top.XMLScriptPath,false);
	XMLHTTP.setRequestHeader("Rts-Request",'t=RT_2Balance.setAcc&SID='+Top.SID+'&tms='+Top.fnRnd());
	var oXML=Top.GetSimpleXML_1251('X');
	addAttr(oXML,'Acc');
	addAttr(oXML,'ISH');
	addAttr(oXML,'FDATE0');
	addAttr(oXML,'FDATE1');
	XMLHTTP.send(oXML);
	if(XMLHTTP.readyState==4){}

	var sURL=Top.scriptPath+"?t="+Top.MainBllName + ".dictFRAMESET&sid="+df.SID.value+"&SCHEMENAME=STATEMENTRU&tms="+Top.fnRnd();
	var retVal=w.showModalDialog(sURL,w,"dialogWidth:700px; dialogHeight:650px; help: no; status: no; resizable: yes;");
	if(typeof(retVal)=='string'&&retVal=='OpenNewSession') try{Top.location=Top.scriptPath+Top.OpenNewSessQ;}catch(e){}
}

function receiveAccounts(XMLHTTP){
	w.WaitMes.innerText="";
	Top.status='';
	var wdf=w.df, wd=w.document, ErrMsg, oXML=XMLHTTP.responseXML;
	var RCode=parseFloat('0'+XMLHTTP.getResponseHeader("RCode"));
	if(RCode < 5){
		ErrMsg=XMLHTTP.responseText; 
		if(!ErrMsg.match(/^</)) Top.placeMsg(UndefinedError(ErrMsg),w);
		else{
			ErrMsg=Top.GetSTErrorFromXML(oXML,false);
			if(ErrMsg != '') Top.placeMsg(ErrMsg,w);
			else Top.placeMsg(Top.LRS20,w);
		}
		return;
	}
	ErrMsg=Top.GetSTErrorFromXML(oXML,false);
	if(ErrMsg != '') Top.placeMsg(ErrMsg,w);
	xData.async=false;
	xData.load(sViewFormURL);
	if (xData.readyState == "complete"){
		ErrMsg=Top.GetSTErrorFromXML(xData);
		if (ErrMsg != '') Top.addMsg(ErrMsg,w);
		else{ s=oXML.transformNode(xData.XMLDocument);Top.placeMsg(s, w);}
	}
}


function ShowForm(){
	if(da.FormBody.style.display=='block'){
		da.FormBody.style.display='none';
		da.SHFltrIco.src = '../img/ico/fltrmax.gif';
//		da.SHFltrIco.setAttribute("alt",LRSShowFltr);
	}else{
		da.FormBody.style.display='block';
		da.SHFltrIco.src = '../img/ico/fltrmin.gif';
//		da.SHFltrIco.setAttribute("alt",LRSHideFltr);
	}
}

function sh(sw,tg,b){
	if(b==null) b=tg.style.display=='none';
	tg.style.display=b?'':'none';
	sw.src='../img/ico/'+(b?'up':'down')+'.gif';
}

function checkAllAccs(){
	if(!da.cbAcc) return;
	var iCnt=da.cbAcc.length;
	if(!iCnt){da.cbAcc.checked=da.AllAcc.checked; return;}
	for(var i=0; i<iCnt; i++)
		da.cbAcc(i).checked=da.AllAcc.checked;
}
function setAllAcc(o){
	if(!o.checked || da.cbAcc.length==null) da.AllAcc.checked=o.checked;
	else{
		var iCnt=da.cbAcc.length,bCh=false;
		for(var i=0; i<iCnt; i++){bCh=da.cbAcc(i).checked;if(!bCh)break;}
		da.AllAcc.checked=bCh;
	}
}

function setPeriod(bDef){
	if(bDef){
		try{da.PType.value=fD.selectSingleNode("//PT").text;}
		catch(e){da.PType.value=1;}
		if(da.PType.value==4){
			da.FDATE0.value=fD.selectSingleNode("//SD").text;
			da.FDATE1.value=fD.selectSingleNode("//ED").text;
		}
	}
	if(da.PType.value==4){
		c='inline';
		s='elm-inp'
		r=false;
	}else{
		c='none'
		s='InpDsbD0'
		r=true;
	}
	da.btn1.style.display=da.btn2.style.display=c;
	da.FDATE0.readOnly=da.FDATE1.readOnly=r;
	da.FDATE0.className=da.FDATE1.className=s
	if(da.PType.value==1) {da.FDATE0.value=da.FDATE1.value=sD0; return;}
	if(da.PType.value==2) {da.FDATE0.value=da.FDATE1.value=sD1; return;}
	if(da.PType.value==3){
		da.FDATE0.value=sD2;
		da.FDATE1.value=sD0;
		return;
	}
}

function setChecks(){
	var sMsk=fD.selectSingleNode("//AFM").text;
	for(var i=0; i<da.FLD.length;i++)
		da.FLD[i].checked=(sMsk.charAt(i)=='1')?true:false;
}

function copy2buff(){
	da.BUFF.innerText=da.copy.innerText;
	da.BUFF.createTextRange().execCommand("Copy");
	alert(PLRS4);
}

function exp(){
	if(!Top.bAX){
		alert(Top.LRnoAX10+'\n'+Top.LRnoAX16);
		return false;
	}
	collectAccounts(0);
	var s='&PTYPE='+da.PType.value;
	if(sCustId=='') sCustId='0';
	Top.stmAccList=df.Acc.value;
	Top.nv.DEF('RT_2IMPORT.expstmform',null,null,null,'&CUSTID='+sCustId+s+'&FDATE0='+df.FDATE0.value+'&FDATE1='+df.FDATE1.value+'&REAP='+df.REAP.checked+'&FLD5='+da.FLD5.checked);
}

function stmprocessPrintRow(ddr,xRow){
	var DSN=xRow.selectSingleNode("DSN").text;
	if(DSN=='DebetMemorderC'){
		if(xRow.selectSingleNode('GR/text()')!=null) ddr.sg.innerHTML=xRow.selectSingleNode('GR/text()').xml.replace(/\n/g,'<BR/>');
		top.wordInTo(ddr.dAmountTxt,ddr.dAmount,Top.getEM(xRow,"AM",0),Top.getEM(xRow,"CC",0),' - ');
		top.replaceSep(ddr.dAmount2,Top.getEM(xRow,"AM",0),' - ');
	}
	else if(DSN=='CreditMemorderB'){
		top.wordInTo(ddr.d32,ddr.d43,Top.getEM(xRow,"AM",0),Top.getEM(xRow,"CC",0),' - ');
		top.wordInTo(ddr.sp328,ddr.td306,Top.getEM(xRow,"AM",0),Top.getEM(xRow,"CC",0),' - ');
		top.wordInTo(ddr.sp328,ddr.td322,Top.getEM(xRow,"AM",0),Top.getEM(xRow,"CC",0),' - ');
		if(xRow.selectSingleNode('GR/text()')!=null) ddr.sg.innerHTML=xRow.selectSingleNode('GR/text()').xml.replace(/\n/g,'<BR/>');
		if(xRow.selectSingleNode('GR/text()')!=null) ddr.sg2.innerHTML=xRow.selectSingleNode('GR/text()').xml.replace(/\n/g,'<BR/>');
	}
	else if(DSN=='MemorderCurrZ'){
		top.wordInTo(ddr.dAmountTxt,ddr.dAmount,Top.getEM(xRow,"AM",0),Top.getEM(xRow,"CC",0),'.');
		top.wordInTo(ddr.dAmountNatTxt,ddr.dAmountNat,Top.getEM(xRow,"AMN",0),Top.getEM(xRow,"NC",0),'.');
	}
	else if(DSN=='DebetMemorderCurrH' || DSN=='CreditMemorderCurrH'){
		if(xRow.selectSingleNode('GR/text()')!=null) ddr.sg.innerHTML=xRow.selectSingleNode('GR/text()').xml.replace(/\n/g,'<BR/>');
		top.wordInTo(ddr.dAmountTxt,ddr.dAmount,Top.getEM(xRow,"AM",0),Top.getEM(xRow,"CC",0),' - ');
		top.replaceSep(ddr.dAmountNat,Top.getEM(xRow,"AMN",0),' - ');
	}
	else if(DSN=='DebetMemorderCurrD' || DSN=='CreditMemorderCurrD'){
		if(xRow.selectSingleNode('GR/text()')!=null) ddr.sg.innerHTML=xRow.selectSingleNode('GR/text()').xml.replace(/\n/g,'<BR/>');
		top.wordInTo(ddr.dAmountTxt,ddr.dAmount,Top.getEM(xRow,"AM",0),Top.getEM(xRow,"CC",0),' - ');
		top.replaceSep(ddr.dAmountNat,Top.getEM(xRow,"AMN",0),' - ');
	}
	else {
		if(xRow.selectSingleNode('GR/text()')!=null) ddr.sg.innerHTML=xRow.selectSingleNode('GR/text()').xml.replace(/\n/g,'<BR/>');
		top.wordInTo(ddr.d32,ddr.d43,Top.getEM(xRow,"AM",0),Top.getEM(xRow,"CC",0),' - ');
	}
}
function stmprocessPrintForm(w,xmlSrc){
	var da=w.document.all;

	//xmlSrc.preserveWhiteSpace=true;
	if(da.DR.length==null){
		if(xmlSrc.selectSingleNode("//DROW/DSN").text=='DebetMemorderA' || xmlSrc.selectSingleNode("//DROW/DSN").text=='CreditMemorderA')
			processPrintRow(da.DR.all, xmlSrc.selectSingleNode("//DROW"));
		else
			stmprocessPrintRow(da.DR.all, xmlSrc.selectSingleNode("//DROW"));
	}
	else {
		for(j=0; j<da.DR.length; j++){
			if(xmlSrc.selectNodes("//DROW/DSN")(j).text=='DebetMemorderA' || xmlSrc.selectNodes("//DROW/DSN")(j).text=='CreditMemorderA')
				processPrintRow(da.DR(j).all, xmlSrc.selectNodes("//DROW")(j));
			else
				stmprocessPrintRow(da.DR(j).all, xmlSrc.selectNodes("//DROW")(j));
		}
		Top.insPageBr(da.DR);
	}
}

var inputErrorCode=0;
window.lrDocName1="//C/SCROLLER_DOC_COUNT_FOUND24/@V";

function InitForm(){
	var dr=da.fData.selectSingleNode('/BXD/DROW')
	da.bdy.innerHTML=dr.selectSingleNode('B').text.replace(/\n/g,'<BR/>');
	if(dr.selectSingleNode('NS').text=='0' && dr.selectSingleNode('RS').text=='1' && dr.selectSingleNode('SOR').text=='0'){
		upd(w,'ReadStatus','0');
	}
	var f=w.fData.getElementsByTagName('RS')[0].firstChild;
	var bNA=w.fData.getElementsByTagName('bNA')[0].firstChild;
	Top.setInputDisabled(w,w.df.FEEDBACKINFO, (!(f!=null && f.nodeValue == '1') || (bNA!=null && bNA.nodeValue=='1')));
}

function manageFeedBackField(w){
	Top.setInputDisabled(w,w.df.FEEDBACKINFO,!w.df.FEEDBACKINFO.readOnly);
}

function postProcTB(){
	if(w.IsForm==1){
		if(fData.selectSingleNode('/BXD/DROW/ER').text!='') Top.markTBbyMask(w,'1001');
		else if(fData.selectSingleNode('/BXD/DROW/RS').text=='1') Top.markTBbyMask(w,'1101');
		else Top.markTBbyMask(w,'1011');
	}
}

function patchScr(){
	var j=da.SCROLLER.rows.length;
	var bPass=da.ScData.selectSingleNode("//FILTER/PASS").text=='1';
	for(var i=1;i<j;i++){
		var oScRi=da.SCROLLER.rows(i);
		var oR=oScRi.all.rC;
		var oR1=oScRi.all.rB;
		var oR2=oScRi.all.rU;
		if(oR.all.fR.innerText!='1'){
			oScRi.className=oScRi.rowclass='RowUnSelHlite';
		}
		if(oR.all.fP.innerText=='1'){
			oScRi.className=oScRi.rowclass+=' persnl';
		}
		if(oR.all.bn.innerText!=''){
			oR.all.bn.innerText=LR4+oR.all.bn.innerText;
			oR.all.bn.style.display='block';
		}
		else oR.all.bn.style.display='none';
		if(oR.all.nDt.innerText!=''){
			oR.all.nCp.innerText=' || '+oR.all.nCp.innerText;
		}
		var f=oR.all.fImp;
		var fSOR=oR.all.SOR;
		if(f.innerText=='1' || f.innerText=='3'){
			if(f.innerText=='1') f.innerHTML='<IMG SRC="../img/ico/flash.gif" ALT="'+LR3+'"/>';
			if(f.innerText=='3'){
				if(fSOR.innerHTML=='1' && bPass) f.innerHTML='<IMG SRC="../img/ico/superflash.gif" ALT="'+LR3s+'" STYLE="filter:Gray();"/>';
				else f.innerHTML='<IMG SRC="../img/ico/superflash.gif" ALT="'+LR3s+'"/>';
			}
			f.style.display='inline';
			f.style.marginRight='7px';
		}
		if(oR1.all.nFl.innerText!=''){
			oR1.all.nL.innerText=LR1;
			oR1.all.nL.setAttribute('idr', oR1.all.SIDR.value);
			oR1.all.lBlk.style.display='inline';
		}
		if(oR2.all.url.innerText!=''){
			oR2.all.lTxt.innerText=LR2;
			oR2.all.nL.innerText=oR2.all.url.innerText;
			oR2.all.nL.setAttribute('lnk', oR2.all.url.innerText);
			oR2.all.lBlk.style.display='inline';
		}
	}
	var UF=document.createElement('INPUT');
	with(UF){
		type="hidden";
		name='UF';
		id='UF';
		value='ReadStatus';
	}
	document.forms('MForm').appendChild(UF);
	UF=document.createElement('INPUT');
	with(UF){
		type="hidden";
		name='UV';
		id='UV';
		value='';
	}
	document.forms('MForm').appendChild(UF);
}

function GoNews(o){Top.nv.DEF(Top.MainBllName + '.form','NEWS',null,null,'&amp;IDR='+o.getAttribute('idr'));}
function GoUrl(o){
	window.open(o.getAttribute('lnk'),'_blank','',false)
}

function updcomplete(w,s,oX){
	w.WaitMes.innerText='';
	var oXML=oX.responseXML;
	E=Top.GetSTErrorFromXML(oXML,false);
	if(E=='') if(oN=oXML.selectSingleNode('/R/E')) if(oN.xml!='') E=Top.GetTextFromErrmsgTag(oN);
	if(E!=''){Top.placeMsg(E,w);return}
	if(oXML.selectSingleNode('R').text=='1') Top.markTBbyMask(w,'1101');
	else{
		Top.markTBbyMask(w,'1011');
		if(w.df.FEEDBACKINFO!=null) Top.setInputDisabled(w,w.df.FEEDBACKINFO, true);
	}
}

function upd(w,fld,val){
	w.SendXMLSwitch='PrivateXML';
	var oX=Top.GetSimpleXML_1251('R');
	var oT;
	oT=oX.createElement('IDR');	oT.text=fData.selectSingleNode('//IDR').text;	oX.documentElement.appendChild(oT);
	oT=oX.createElement('UF');	oT.text=fld;	oX.documentElement.appendChild(oT);
	oT=oX.createElement('UV');	oT.text=val;	oX.documentElement.appendChild(oT);

	w.WaitMes.innerText=Top.LRS3;
	Top.SendXML('mw.updcomplete',w,fld,oX,'T=RT_2News.updateNews&SID='+Top.SID);
}

function fnOnReadyStateChange(){
	Top.showScrl(w);
	if(da.SCROLLER.readyState=='complete'){
		patchScr();
		if(w.ScData.selectSingleNode('//@rcnt').text!=0){
			var mwWidth=mw.document.body.offsetWidth;
			w.SCRDIV.style.width=(mwWidth<700)?mwWidth-10:700;
		}
	}
}

function InitScroller(){
	if(da.ScData.selectSingleNode("//FILTER/MAND").text=='1'){
		if(da.ScData.selectSingleNode("//DOCS/@rcnt").text=='0'){
			passNews();
			return;
		}
		da.FilterForm.style.display=da.RecordsCountInfo_M.style.display="none";
		if(da.ScData.selectSingleNode("//FILTER/PASS").text!='1' || da.ScData.selectNodes('//NEWS[@SOR="0"]').length>0){
			da.FooterTxtM.innerHTML=LR5;
			da.FooterTxtM.style.display='';
		}
		else{
			da.passBtn.innerHTML=LR6;
			da.FooterTxtP.style.display='';
		}
	}
}

function passNews(){
	var td=Top.document.all;
	top.HideToolBar(window);
	Top.mw.location.replace(Top.mw_wlc);
	td.FG.frameSpacing=1;
	td.FT.rows=Top.FTrows;
	td.FG.cols=Top.FGcols;
}

function fnOnDblClick(oTR){
	if(oTR.rowIndex==0) return;
	if(da.rB.length)
		da.rB(oTR.rowIndex-1).all("nL").fireEvent("onclick");
	else
		da.rB.all("nL").fireEvent("onclick");
}

function processNews(w,s,oX){
	w.WaitMes.innerText='';
	var oXML=oX.responseXML;
	var e = Top.GetSTErrorFromXML(oXML,false);
	if (e!=''){
		Top.placeMsg(e,w);
		rv=0;
		return;
	}
	if(oXML.selectSingleNode('R').text=='0') 
		  upd(w,'ReadStatus','0');
	else 
		Top.nv.DEF(Top.MainBllName + '.form','NEWSACK','NEW',null,'&SourceIDR='+w.df.IDR.value,Top.ccSITE+'_HLP');
}

function checkAckExist(w){
	w.SendXMLSwitch='PrivateXML';
	var oX=Top.GetSimpleXML_1251('R');
	var oT;
	oT = oX.createElement('IDR');	
	oT.text = fData.selectSingleNode('//IDR').text;	
	oX.documentElement.appendChild(oT);

	w.WaitMes.innerText=Top.LRS3;
	Top.SendXML('mw.processNews',w,null,oX,'T=RT_2NewsAck.CheckNewsAckOnCreateNecessary&SID='+Top.SID);
}

function fnCheckEmty(){
	var b=true;
	var f=fData.getElementsByTagName('FOR')[0].firstChild;
	if(f!=null && f.nodeValue == '1')
		b=Top.SubCheckEmpty(w,'FEEDBACKINFO','',PLRS1,b);
	return (b);
}

function checkOnSign(w){
	if(w.inputErrorCode!=0)	return false;

	if(fData.selectSingleNode('//SOR').text == '1'){
		if(!fnCheckEmty()) return false;
		checkAckExist(w);
	}
	else
		upd(w,'ReadStatus','0');
}

window.noHint=1;

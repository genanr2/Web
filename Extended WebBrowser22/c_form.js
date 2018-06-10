var ResXML='XDoC';
// ################### XML/XSL Loading And Transform #########################
function DoXSLTransForm(w){
	with(w){
		var Err=Top.CheckXML4ParseError(xDefForm,false)+Top.CheckXML4ParseError(xForm,false)+Top.GetSTErrorFromXML(fData,false);
		if(Err!=''){placeMsg(Err,w); return false;}
		w.XMLStoreID=(fData.selectSingleNode("//DROW/@V_XF")!=null)?fData.selectSingleNode("//DROW/@V_XF").text:fData.selectSingleNode("//DROW/@P_XF").text;
		w.XMLStoreID='scheme/'+w.XMLStoreID+'_'+Top.LanguageID.toLowerCase()+'.xml';
		if(!LoadLResXML(w,fData,"//DROW")) return false;
		w.XMLStoreID='xsl/LRSC_'+Top.LanguageID.toLowerCase()+'.xml';
		if(!LoadLResXML(w,fData,"//DROW")) return false;

		var oForm=xForm.XMLDocument.documentElement;
		var oDefForm=xDefForm.XMLDocument;
		var oDefFormIns=oDefForm.selectSingleNode("//*[@ID $eq$ 'CUSTOM_PART_OF_FORM_HERE']");
		oDefFormIns.appendChild(oForm);

		fnPreInitSHH(fData,oDefForm.selectNodes("//SPAN[@ID $eq$ 'SHF']").length);
		w.sTransformResult=fData.transformNode(xDefForm.XMLDocument)
		w.document.body.innerHTML=w.sTransformResult;
	}
}

function DoXSLTransView(w,sViewFormURL){
	// Получение формы просмотра, путем трансформации XML и XSL (который предварительно подгружается)
	with(w){
		xView.async=false;
		xView.load(sViewFormURL);
		if(xView.readyState!="complete") {Top.placeMsg(Top.LRSview1+sViewFormURL,window); return false;}
		var Err=Top.CheckXML4ParseError(xView,false);
		if(Err!='') {Top.placeMsg(Err,window); return false;}
		xslViewTarget.innerHTML=fData.transformNode(xView.XMLDocument);
		fnSHHinView(w.document.all);
		return true;
	}
}
// ================ EOF XML/XSL Loading And Transform ========================


// ################## SHOW/HIDE FORM, VIEW Form And PRINT Form ###############

function ShowFORM(w){
	with(w){
		if(typeof(da.VIEWBLOCK)=='object'){da.VIEWBLOCK.style.display="none"};
		da.EDITFORM.style.display="block";
		w.IsEditForm=true;
	}
}

function ShowVIEW(w){
	with(w){
		if(da.xslViewTarget.innerHTML==''){
			if(!DoXSLTransView(w,ViewFormURL))return false;
		}
		if(typeof(da.VIEWBLOCK) != 'object'){Top.placeMsg("Division 'VIEWBLOCK' is not found within the partial XSL template "+w.ViewFormURL,w); return false;}
		da.EDITFORM.style.display="none";
		da.VIEWBLOCK.style.display="block";
		if(typeof(InitView)=='function') try {InitView(w,true)} catch(e){};
		w.IsEditForm=false;
		if((fData.selectSingleNode('//STATUS')!=null && fData.selectSingleNode('//STATUS').text==20) && typeof(da.VSubTitle)=='object'){
			da.VSubTitle.innerText=fData.selectSingleNode('//NFB').text;
			da.SubTitle.style.display=da.TplNameForm.style.display='none';
		}
		return true;
	}
}

function HideALLFORMS(w){
 with(w){
	da.EDITFORM.style.display="none";
	if(typeof(da.VIEWBLOCK)=='object'){da.VIEWBLOCK.style.display="none"};
 }
}

function ChangeVF(w){w.IsEditForm? ShowVIEW(w):ShowFORM(w)}

function PrintFORM(w){
	// Подгрузка XSL печатной формы при необходимости, обязательная трансформация и печать результата
	// вызывается из панели меню (pm.pm) через функцию FORMPRINT(w)
	closeCalendar(w,1)
	var Err, xslPrintTarget=w.xslPrintTarget, xPrint=w.xPrint, fData=w.fData;
	var wmw=w.top.mw;
	if(null != wmw&&typeof(wmw.InitPrint)=='function') try{wmw.InitPrint(w,w.fData);}catch(e){};
	if (xslPrintTarget.innerHTML==''){
		xPrint.async=false;
		xPrint.load(w.PrintFormURL);
		if (xPrint.readyState != "complete"){placeMsg(Err,w); return false;};
	}
	Err=CheckXML4ParseError(xPrint);
	if(Err != ''){placeMsg(Err,w); return false;}
	xslPrintTarget.innerHTML=fData.transformNode(xPrint.XMLDocument);
	if(null != wmw&&typeof(wmw.processPrintForm)=='function') wmw.processPrintForm(w,w.fData);	 ///Проверить, устранить один аргумент
	w.focus();
	//w.print();
	if(!bAX)placeMsg(GetErrMessage('0|5=0:'+LRnoAX10+'[BR]'+LRnoAX17),w)
	if (typeof(w.da.MESSAGELOG)=='object') {//на время печати убираем окно с сообщиями, если есть
		var msgl=w.da.MESSAGELOG.style,s=msgl.display;
		msgl.display="none";
		w.print();
		if(s=='block'){msgl.display="block";}
	}
	else w.print();
	return true;
}
// ============================= EOF SHOW/HIDE FORMs =========================


function ShowObjOnComplete(oDataConsumer,objToShow){
	if (oDataConsumer.readyState=='complete'){
		var doc=oDataConsumer.document, w=doc.parentWindow;
		InitObjectsAliases(w);
		w.tbPanID=w.fData.selectSingleNode('//DROW/@T_B').text;
		w.tbMAP=w.fData.selectSingleNode('//DROW/@T_M').text;
		w.ViewFormURL='../scheme/'+w.fData.selectSingleNode('//DROW/@V_XF').text+'_view.xsl';
		try{w.PrintFormURL='../scheme/'+w.fData.selectSingleNode('//DROW/@P_XF').text+'_print_russian.xsl';}catch(e){w.PrintFormURL='';};

		var df=w.df;
		w.da[objToShow].style.display="block";
		try{
			var s=w.df.SCHEMENAME.value
			if(top.TreeType!='GROUPED')s+='_CREATE';
			if(!w.top.IsDictionary)nv.selectNode(s)
		}catch(e){};
		try{w.InitForm();}catch(e){}
		if (!w.bDefDataIsSet){w.sDefData=w.fData.text;w.bDefDataIsSet=true;}
		fnInitSHH(w.da,"SHF","SH");
		w.MWdone=true;
		try{Top.SetToolsPannel(w);}catch(e){}
		if((bPKI)&&(Top.ExtSR=='0')&&(!w.top.IsDictionary))Top.completeCommOnload(w);
	}
} // ShowObjOnComplete

// ############################# ON SAVE FORM ################################

function XRqFld(sFld,oX){
	var s=GetTextFromXMLTag(sFld,oX);
	return (s==''?'':('&'+sFld+'='+s));
}	// XRqstStr

// ========================= FILE ATTACHMENT OPERATIONS=============================
function FILEATT(w,ACTID,sFileIndex,sFileName){																		// Модифицировать и проверить
	ACTID=ACTID.toUpperCase();
	if (sFileName==null) sFileName='';
	InitObjectsAliases(w);
	var wdf=w.df;
	var wf1=(w.IsForm || w.IsVIEW)? w.document.forms("FDnld") : wdf;
	w.focus();
	clearMsg(w);

	wf1.FI.value=sFileIndex;
	//wf1.FN.value=sFileName;

	w.token=fnRnd();

	switch (ACTID){
	case 'GETF':
		wf1.T.value=MainBllName+'.getf';
		w.onbeforeunload=new Function("");
		if(w.IsForm){
			if(w.document.frames.length<1) w.document.body.insertAdjacentHTML('beforeEnd',sACCEPTOR)
			wf1.target='ACCEPTOR';
		}else wf1.target='_self';
		wf1.submit();
		if(w.IsForm) {var tmr=w.setTimeout("w.onbeforeunload=Top.fnCommOnbeforeunload;",300);}
		return;

	case 'DELF':
		wf1.T.value=MainBllName+'.DelF_DOC';
		ShowVIEW(w);
		HideToolBar(w);
		w.WaitMes.innerText=LRS3;
		w.SendXMLSwitch='default';
		SendXML('fnOnFormSaveResult',w,ACTID,wf1);
	 break;

	default : alert(LRSfrm4+ACTID); return;
	} // end switch
} // FILEATT


function ForceEdit(w){
	w.focus();
	try{ShowFORM(w)}catch(e){};
	try{
		if(w.df.STATUS!=null) w.df.STATUS.value=sST_NEW;
		if(w.df.SIGNS!=null){w.df.SIGNS.value=''; ClearSignPms(w.df);}
		if(window.bDemo){w.df.UID1.value=w.df.UID2.value='';}
		w.da.INFOSTATUS.innerText=getStatus(w,'NAME',sST_NEW);
	}catch(e){};
	var TB=w.top.tb.MyToolBar, Ts=TB.style, Pid=w.tbPanID;
	//Ts.display="none";
	Top.SetCustomToolBar(w,Pid,w.tbMAP);
	Top.ShowToolBar(w);
}

function prepareSaveTemplate(w){
	if(w.inputErrorCode!=0) return false;
	w.da.TplName.value='';
	w.da.SubTitle.style.display=w.da.TplNameForm.style.display='block';
	w.da.CUSTOM_PART_OF_FORM_HERE.style.display='none';
	HideToolBar(w);
	w.da.TplName.focus();
}
function proceedSaveTemplate(w){
	Top.ACTF(top.mw,'SAVEDOCASTPL');
	w.da.TplName.value='';
}
function cancelSaveTemplate(w){
	w.da.SubTitle.style.display=w.da.TplNameForm.style.display='none';
	w.da.CUSTOM_PART_OF_FORM_HERE.style.display='block';
	ShowToolBar(w);
	w.da.TplName.value='';
}

function ACTF(w,inACTID,S){
	// Сохранение формы. Активизируется по команде из обьекта MyToolBar (ссылка в Pm.Pm)
	inACTID=inACTID.toUpperCase();
	InitObjectsAliases(w);
	w.rout=getRoute(w);

	var wdf=w.df;
	if(!w.IsDictionary) w.da.STEP.value=S;
	w.focus();
	clearMsg(w);

	wdf.T.value=(w.SpecT!=null && w.SpecT!='')?w.SpecT:MainBllName+'.save';
	w.SendXMLSwitch='default';

	switch(inACTID){
		case 'FORCESAVE':
			w.SendXMLSwitch='ForceSave'; // При отправке запроса в заголовке будет Force-Save : 1
			break;
		case 'SAVEDOC':;
		case 'SAVEFORM':
			if(S=='2'){
				w.SendXMLSwitch='CompoundSave';
				w.FltParams = 'MForm$SID|MForm$T|MForm$XACTION|MForm$STATUS|MForm$SIGNS|MForm$SCHEMENAME|MForm$UID1|MForm$UID2|MForm$LIBTYPENAME1|MForm$LIBTYPENAME2|MForm$SIGNNAME1|MForm$SIGNNAME2|MForm$STEP';
			}else{if(!w.IsDictionary)wdf.SGCFG.value=(Top.GetSConfForDoc(w))?'exist':Top.GetSignState(w);}
			if(typeof(w.fnOnSubmit)=='function'){if(!w.fnOnSubmit())return;}
			if(!w.Crypto){if(w.da.NEEDCHECK!=null){if(w.da.NEEDCHECK.value=='1' && !ShowVIEW(w)){alert(LRSfrm2+LRSfrm6); return;}}}
			if(!w.FormHasAttachment) break;

			// Еси форма имееет поле типа FILE, то работает иной механизм отправки запроса.
			HideToolBar(w);
			w.token=fnRnd();	// устанавливаем токен, по которому, по приходу ответа, удостоверимся в присутствии страницы - потребителя информации ответа.

			try{wdf.XACTION.value=inACTID;}catch(e){}

			var dfr=w.document.frames;
			if(dfr.length < 1) w.document.body.insertAdjacentHTML('beforeEnd',sACCEPTOR)

			w.WaitMes.innerText=LRS3;

			with(w){
				document.frames('ACCEPTOR').document.body.onunload=new Function('ogInterval=window.setInterval("Top.fnCheck_ACCEPTOR_ReadyState(w,\''+inACTID+'\');",50);');
				setTimeout("df.submit();",200);
			}
			return;


		case 'SAVEDOCASTPL' :
			w.LastStatus=wdf.STATUS.value;
			wdf.STATUS.value=sST_TPL;
			if(typeof(w.OnSaveTEMPLATE)=='function'){if (!w.OnSaveTEMPLATE()){return;}}
			break;
		default : alert(LRSfrm3); return;
	} // EOF switch

	w.WaitMes.innerText=LRS3;
	HideToolBar(w);
	w.token=fnRnd();	// устанавливаем токен, по которому, по приходу ответа, удостоверимся в присутствии страницы - потребителя информации ответа.
	try{wdf.XACTION.value=inACTID;}catch(e){}

	SendXML('fnOnFormSaveResult',w,inACTID,wdf);
}	// ACTF


function fnCheck_ACCEPTOR_ReadyState(w,inACTID){
	with(w){
		var xf=w.document.frames('ACCEPTOR'), xd=xf.document,
		CurrState=xd.readyState;
		if (CurrState=='complete'){
			clearInterval(ogInterval);
			var xda=xd.all, xR=xf.xResponse, xH=xda.HEADERS;
			// Создаем фиктивный объект XMLHTTP
			w.XMLHTTP=new Object();
			if(xR != null && xR.XMLDocument.documentElement!=null){
				w.XMLHTTP.responseXML=GetSimpleXML_1251(xR.XMLDocument.documentElement.nodeName);
				var iL=xR.XMLDocument.documentElement.childNodes.length;
				for(var i=0;i<iL;i++){
					w.XMLHTTP.responseXML.documentElement.appendChild(xR.XMLDocument.documentElement.childNodes(i).cloneNode(true));
				}
				w.XMLHTTP.responseText=xR.innerHTML;
			}else{
				w.XMLHTTP.responseXML=new ActiveXObject(XMLDOM_ID);
				w.XMLHTTP.responseText=xd.body.innerHTML;
			}
			if(xH==null){
				xH=xd.createElement('P');
			}
			xH.setAttribute('Token',w.token);
			w.XMLHTTP.headers=xH;
			function grh(hName){
				var hVal=this.headers.getAttribute(hName);
				return ((hVal==null)?'':hVal);
			}
			w.XMLHTTP.getResponseHeader=grh;
			fnOnFormSaveResult(w,inACTID,w.XMLHTTP);
		}
	}
}

function prepareAndSign(w,f,oX){
	var s=nv.MySigner.NumberOfSignatures;
	if(n=oX.selectSingleNode('/DT/SC/Signs')){
		s=parseInt(n.attributes.getNamedItem('NOS').nodeValue);
		if(isNaN(s)) s=0;
		if(s>0){
			top.nv.MySigner.XMLCryptoParamsData=Top.RestoreSParams(w,n);
			if(top.ExtSR=='0' && !w.bB2B) Top.SignConf.loadXML(nv.MySigner.XMLCryptoParamsData);
		}
		nv.MySigner.NumberOfSignatures=s;
	}
	if(s>0){
		nv.MySigner.DocScheme = w.fData.selectSingleNode('//DROW/@SCHEMEID').text;
		
		if((w.HIDDENFORM) && (f.SCHEMENAME.value != 'NEWSACK'))nv.MySigner.B2BDealSignaturesXML(oX);
		else
			nv.MySigner.DealSignaturesXML(oX);
	}
	return 'SID='+Top.SID+'&T=RT_2IC.save' +'&GO=1'+'&SCHEMENAME='+f.SCHEMENAME.value+'&STEP='+f.STEP.value+'&STATUS='
}
function FORCE(w,ACTID){
	var wdf=w.df, wd=w.document;
	var oX=getXO(ResXML).cloneNode(true);
	w.da.STEP.value='2';

	switch (ACTID){
		case 'SAVEDOC':
			if(mw.rout==3){
				var RR=prepareAndSign(w,wdf,oX)
				if(wdf.NOS.value>0){
					if(!oX.selectSingleNode('//DOCS/R/SIGN/S')){
						ForceEdit(w);
						placeMsg(GetErrMessage('0|7=0:'+LRSSig12,false),w);
						break;
					}
					f=oX.selectSingleNode('//DOCS/R/SIGN/@SI').text;
				}else f=7;
				var bGO=w.sig=='SIGGO';
				if (bGO&&f != sST_SIG&&f != sST_NEW){
					alert(LRSSig8);
					bGO=false;
					w.sig='SIG';
				}
				w.da.STATUS.value=(w.sig.indexOf('GO') > -1)?'10':f
				RR=RR+w.da.STATUS.value;
				w.SendXMLSwitch='SetSigns';
				oEr=oX.selectSingleNode('//DT/errmsg');
				if(oEr)oEr.parentNode.removeChild(oEr);
				oEr=oX.selectSingleNode('//DT/SC');
				if(oEr)oEr.parentNode.removeChild(oEr);
				HideToolBar(w);
				w.WaitMes.innerText=LRS3;
				SendXML('fnOnFormSaveResult',w,ACTID,oX,RR);
				break;
			}
		default: alert(LRSfrm9+ACTID); return;
	}
}

function fnOnFormSaveResult(w,ACTID,XMLHTTP){
	w.WaitMes.innerText="";
	var RCode=parseFloat('0'+XMLHTTP.getResponseHeader("RCode"));
	var oXML=XMLHTTP.responseXML;
	var wdf=w.df, wd=w.document;
	var ErrMsg, Status;
	setXO(ResXML,oXML);
	if(RCode < 5){
		ErrMsg=XMLHTTP.responseText;
		if(!ErrMsg.match(/^</)) placeMsg(UndefinedError(ErrMsg),w);
		else{
			ErrMsg=GetSTErrorFromXML(oXML,false);
			if((ErrMsg=='')&&(oXML.parseError.errorCode==0)){
				oXML=new ActiveXObject(XMLDOM_ID);
				oXML.loadXML(XMLHTTP.responseText)
				ErrMsg=GetSTErrorFromXML(oXML,false);
			}
			if(ErrMsg != '') placeMsg(ErrMsg,w);
			else placeMsg(LRS20,w);
		}

		ForceEdit(w);
		return;
	}
	var RToken=XMLHTTP.getResponseHeader("Token");
	if(RToken != w.token){
		ShowToolBar(w);
		if(Top.bShowReqInfo)alertToken(w.token,RToken);
		return;
	}
	function checkSCFG(oX){
		var oN=oX.selectSingleNode('//Signs/ERROR');
		if(oN!=null && Trim(oN.text)!=''){
			placeMsg(GetErrMessage('0|1='+Trim(oN.text),false),w);
			ForceEdit(w);
			return false
		}else return true
	}
	Status=XMLHTTP.getResponseHeader("Status");
	var s=GetTextFromReplyTag(oXML);
	if(s.charAt(0)=='1'){
		w.TokenD=XMLHTTP.getResponseHeader("Token-D");
		if(RCode>=5){
			s=s.slice(1);
			if(s.length>0){
				oX=new ActiveXObject(Top.XMLDOM_ID);
				if(oX.loadXML(s)){
					if(!checkSCFG(oX))return
					else{
						top.nv.MySigner.XMLCryptoParamsData=Top.RestoreSParams(w,oX.documentElement);
						Top.SignConf.loadXML(nv.MySigner.XMLCryptoParamsData);
						var nSigns=parseInt(oX.documentElement.attributes.getNamedItem('NOS').nodeValue);
						if(isNaN(nSigns)) nSigns=0;
						nv.MySigner.NumberOfSignatures=nSigns;
					}
				}
			}
		}
	}else if(!checkSCFG(oXML))return

	if(RCode==5){ // Поступили предупреждения. (но док. можно сохранять)
		try{wdf.STATUS.value=Status;}catch(e){};
		w.TokenD=XMLHTTP.getResponseHeader("Token-D");
		ErrMsg=GetSTErrorFromXML(oXML,false);
		if(ErrMsg=='')ErrMsg=LRS20;
		placeMsg(ErrMsg,w);
		SetCustomToolBar(w,'FORCE_SAVE_EDIT','111');
		ShowToolBar(w);
		return;
	}

	// К "Последним 10 транзакциям" (Олег)
	if (XMLHTTP.getResponseHeader("Spc")=='1'){
		ErrMsg=GetSTErrorFromXML(oXML,true);
		if(ErrMsg != ''){placeMsg(ErrMsg,w);return;}
		try{w.localResult(oXML);}catch(e){};
		return;
	}

	// Если в XML присутствует тег errmsg, то значит есть сообщение об ошибке
	ErrMsg=GetSTErrorFromXML(oXML,false);
	if(ErrMsg != ''){placeMsg(ErrMsg,w); return;}

	// Иначе - Все ОК / СКРОЛЛЕР

	if(wdf.STATUS != null){
		if(ACTID=='FORCESAVE')ACTID+='DOC';
	}
	switch (ACTID) {
	case 'FORCESAVEDOC':;
	case 'SAVEDOC':
		// при двух-разовом проходе при сохранении документа, после первого прохода результат проверок TRUE.
		// получить подпись и необходимые данные и передать на сервер для сохранения, изменив STEP (1 на 2)
		if(w.da.STEP.value==1){
			if(w.rout==3){
				w.TokenD=XMLHTTP.getResponseHeader("Token-D");
				w.da.STEP.value='2';
				var RR=prepareAndSign(w,wdf,oXML)
				if(wdf.NOS.value>0){
					if(!top.bDemo){
						oSg=oXML.selectSingleNode('//DOCS/R/SIGN/S');
						if(!oSg || !oSg.text){
							if(!w.HIDDENFORM){
								ForceEdit(w);
								addMsg(GetErrMessage('0|7=0:'+LRSSig12,false),Top.mw);
							}
							else emptyWin(mh);
							break;
						}
					}
					f=oXML.selectSingleNode('//DOCS/R/SIGN/@SI').text;
				}else f=7;
				var bGO=w.sig=='SIGGO';
				if(bGO && f!=sST_SIG && f!=sST_NEW){
					alert(LRSSig8);
					bGO=false;
					w.sig='SIG';
				}
				w.da.STATUS.value=(w.sig.indexOf('GO') > -1)?'10':f;
				RR=RR+w.da.STATUS.value;
				w.SendXMLSwitch='SetSigns';
				oEr=oXML.selectSingleNode('//DT/SC');
				if(oEr)oEr.parentNode.removeChild(oEr);
				w.WaitMes.innerText=LRS3;
				SendXML('fnOnFormSaveResult',w,ACTID,oXML,RR);
			}else if(mw.rout==2)SignFORM(w,w.sig,'2');
			break;
		}

		fnUnselectNode();
		w.bDefDataIsSet=false;

		// Обновляем инфо-ячейки в пан.нав.
		var cnt=Trim(XMLHTTP.getResponseHeader("Cnt"));
		if(cnt!='') nv.setInfoCellValues(unescape(cnt));

		var sSts=Trim(XMLHTTP.getResponseHeader("Status")), sFltrID='ALL';
		var sSchName=getSheme(w), DTI=w.da.DOCTYPEID;
		switch(sSts){
			case '20': sFltrID='TEMPLATES';break;
			case '0': sFltrID=(w.bB2B)?'NEW-B2B':((sSchName=='CRYPTO')?'NEWCRYPTO':'NEW');break;
			case '1':;
			case '2':;
			case '7': sFltrID='SIGNED';break;
			case '400':;
			case '401':;
			case '402': sFltrID=(w.bB2B)?'INPROCESS-B2B':'INPROCESS';break;
		}
		var sI=XMLHTTP.getResponseHeader("SavedDocIdr");
		w.Status=Status;
		if(typeof(w.AfterSaveForm)=='function')w.AfterSaveForm();
		else{
			if(!w.HIDDENFORM){
				nv.DEF(Top.MainBllName + '.SC',sSchName,null,sFltrID,'&AfterSave=1'+((sI=='')?'':'&SAVEDDOCIDR='+sI)+((DTI==null)?'':'&DOCTYPEID='+DTI.value));
				try{nv.selectNode((DTI.value=='')?nv.document.all.MyXML.selectSingleNode("//ITEM[@ICNAME='" + sFltrID + '_' + sSchName + "']/@ID").text:sSchName+DTI.value);}catch(e){};
				//Результат сохранения - в переменную для последующего отображения после вывода скроллера.
				if(Status=='32221')
					Top.AddMes=GetErrMessage('0|5=0:'+LRS8+getStatus(w,'NAME',Status)+'". '+LRS28)
				else
					Top.AddMes=GetErrMessage('0|6=0:'+LRS8+getStatus(w,'NAME',Status)+'".');
			}
			else{
				var parentSN = sSchName;
				if (w.da.PARENTSCHEMENAME != null)
				  parentSN = w.da.PARENTSCHEMENAME.value;
				nv.DEF(Top.MainBllName + '.SC',parentSN,null,mw.da.FILTERIDENT.value,((sI=='')?'':'&SAVEDDOCIDR='+sI)+((DTI==null)?'':'&DOCTYPEID='+DTI.value));
				Top.AddMes=GetErrMessage('0|6=0:'+LRS8x.replace('%s','"'+w.fData.getElementsByTagName('DROW/FH')[0].text+'"')+getStatus(w,'NAME',Status)+'".');
				emptyWin(w);
			}
/*
		if(!Top.bShowReqInfo){ //DEBUG
			wd.body.innerHTML='';
			w.tbPanID='EMPTY';
		}
*/
		}
		break;
	case 'SAVEDOCASTPL':
		// Выдаем на экран результат сохранения.
		w.sDefData=w.fData.text;
		wdf.STATUS.value=w.LastStatus;
		w.da.SubTitle.style.display=w.da.TplNameForm.style.display='none';
		w.da.CUSTOM_PART_OF_FORM_HERE.style.display='block';
		ShowToolBar(w);
		placeMsg('<BR>'+GetErrMessage('0|6=0:'+LRS8t),w);
		// Обновляем инфо-ячейки в пан.нав.
		var cnt=Trim(XMLHTTP.getResponseHeader("Cnt"));
		if (cnt != ''){nv.setInfoCellValues(unescape(cnt))}
		break;
	case 'FORCESAVE':;
	case 'SAVEFORM':
		w.IsScroller=true; w.IsForm=false;
		wd.body.innerHTML='';
		wd.body.insertAdjacentHTML('afterBegin',GetTextFromReplyTag(oXML));
		with(w){w.oInterval=w.setInterval('try{FocusAcceptor.focus();clearInterval(oInterval);}catch(e){}',200);}
		break;
	case 'DELF':
		var oReply=oXML.selectSingleNode("reply");
		if(oReply==null){placeMsg(GetErrMessage('0|1=0:'+LRS10),w); return};

		var oDATT=w.fData.selectSingleNode('//DATT');
		var oON=oDATT.selectSingleNode('//FsRooT');
		var oCN=oON.selectSingleNode('TX');

		var oData=new ActiveXObject(XMLDOM_ID);
		if (!oData.loadXML(GetTextFromReplyTag(oXML))){placeMsg(GetParserError(oData,false),w); return;}
		var oNN=oData.selectSingleNode('//FsRooT');
		if (oNN==null){placeMsg(GetErrMessage('0|1=0:'+LRS21),w); return;}
		if (oCN != null) oNN.appendChild(oCN.cloneNode(true));
		oDATT.replaceChild(oNN.cloneNode(true),oON);
		try{w.checkUpdateSize();}catch(e){}
		ShowFORM(w);
		ShowToolBar(w);
		break;
	default : alert(LRSfrm5+ACTID); return;
	} // end switch
} // fnOnFormSaveResult
// ========================= EOF ON SAVE FORM ================================

function ClearSignPms(obj){
	with(obj){UID1.value=LIBTYPENAME1.value=SIGNNAME1.value=UID2.value=LIBTYPENAME2.value=SIGNNAME2.value='';}
}

function fnForSave(w,ACTID){
	if(w.df.STEP.value=='1'){
		switch(w.rout){
			case '3':FORCE(w,'SAVEDOC');break
			case '2':SignFORM(w,w.sig,'2');
		}return
	}
	ACTF(w,'FORCESAVE');
}

function fnRedirect(w,ACTID){
	if(Top.bAuthXNotPassed){alert(LRnoSK0); return false;}
	if(ACTID=='SIG' && w.df.NOS.value=='0'){Top.mw.alert(LRSSig29);return}
	if(w.df.NOS.value!='0')if(Top.isAlertNoAX('\n'+Top.LRnoAX11)) return false;
	w.rout=getRoute(w);
	if((w.rout==1)||(w.df.NOS.value=='0')) SignFORM(w,ACTID,'0');
	if((w.rout==2||w.rout==3)&&(w.df.NOS.value!='0')){
		w.sig=ACTID;
		ACTF(w,'SAVEDOC','1');
	}
}

function SignFORM(w,ACTID,S){
	InitObjectsAliases(w);
	w.focus(); w.da.STEP.value=S;
	try{if(!w.fnOnSubmit())return;}catch(e){}
	ACTID=ACTID.toUpperCase();

	var df=w.df,FSg='',sg=df.SIGNS,st=df.STATUS,SGMASK=da.SGMASK.innerText,ns=df.NOS.value;
	if(bAX)oSigner=nv.MySigner;
	if((ns==0)&&(ACTID=='SIG'))return (w.Crypto)? true:'';
	//if (SGTXTID=='') alert('Error in function SignFORM (c_form.js):\nparameter SGTXTID is empty.');
	SGTXTID=da.SGTXTID.innerText;
	oSigner.UID='';
	if (window.bDemo) {oSigner.UID=df.UID1.value+'\r\n'+df.UID2.value;} //	DEMO
	if(w.Crypto){
		w.SignN=ns;w.SignB=oSigner.XMLCryptoParamsData;
		oSigner.NumberOfSignatures=1;oSigner.XMLCryptoParamsData=w.SignP;
	}
	if((w.Crypto)&&(top.MyTools.CryptMode==0)&&(Top.TtPr>1)){
		var oX=new ActiveXObject(XMLDOM_ID);
		oX.loadXML(w.SignP)
		U=oX.selectSingleNode('/Signs/Sign/@UID').nodeValue;
		DN=oX.selectSingleNode('/Signs/Sign/@DisplayName').nodeValue;
		FSg=oSigner.FRM_SIGN_RG(SGMASK,sg.value,SGTXTID,U,DN,location.hostName);
	}
	else{
		if(ns>0){
			oSigner.DocScheme=w.fData.selectSingleNode('//DROW/@SCHEMEID').text;
			if(oSigner.NumberOfSignatures>0)
				FSg=oSigner.DealSignaturesEx(SGMASK,sg.value,SGTXTID);
		}
		else	
			FSg='7';
	}
	if(w.Crypto){oSigner.NumberOfSignatures=w.SignN;oSigner.XMLCryptoParamsData=w.SignB;}
	if(FSg==0){
		ForceEdit(w);
		addMsg(GetErrMessage('0|7=0:'+LRSSig12,false),w);
		return false;
	}
	if(bAX)var U=oSigner.UID.split("\r\n"), L=oSigner.LibTypeName.split("\r\n"), N=oSigner.SignName.split("\r\n");
 // addMsg(' 1* <BR>'+FSg+'<BR>'+U+'<BR>'+L+'<BR>'+N,w);
	function SignPms(StatusIdent){
		if(StatusIdent == sST_NEW){
			ClearSignPms(df);
		}
		else{
			with(df) for(i=0;i<U.length-1;i++){
				elements('UID'+(i+1)).value=U[i];
				elements('SIGNNAME'+(i+1)).value=N[i];
				elements('LIBTYPENAME'+(i+1)).value=L[i];
			}
		}
	}
	var f=FSg.charAt(0);
	if (!w.Crypto) {(f=='0')? ShowFORM(w) : ShowVIEW(w);}
	if(top.getStatus(w,'NAME',f)==null){
		if(!w.Crypto)alert(LRSSig7+f+').');
		f=st.value=sST_NEW; SignPms(sST_NEW);
	}
	var bGO=ACTID=='SIGGO';
	if (bGO&&f != sST_SIG&&f != sST_NEW ){
		alert(LRSSig8);
		bGO=false;
	}
	var ResSt=(bGO&&f==sST_SIG) ? sST_TOPROC : f;
/*	try {
		if (df.SCHEMENAME.value == 'PAYDOCRU' && bGO && df.VISAACCOUNTS.value.indexOf(df.PAYERACCOUNT.value)!=-1) ResSt = sST_VISA;
	}catch(e){}*/
	st.value=ResSt;
	var ist=da.INFOSTATUS;
	if (ist != null) ist.innerText=getStatus(w,'NAME',ResSt);
	if(bAX)SignPms(ResSt,df);
	sg.value=FSg.substr(1);
	if (w.Crypto) {if(f=='0') return false; else return true;}
	if (f!=sST_NEW&&((bGO&&bSaveAfterSIGGO&&(f==sST_SIG))||(!bGO&&bSaveAfterSIG)))ACTF(w,'SAVEDOC',S);
}


function FORMROLLBACK(w){
	var df=w.df;
	if(confirm(LRSTot1)){
		var SIDval=w.df.SID.value;
		w.df.reset();
		w.df.SID.value=SIDval;
		if ((typeof(w.fnOnReset)=='function')&&(w.df.IDR.value=='')) {w.fnOnReset();}
		if (typeof(w.fnOnLoad)=='function') {w.fnOnLoad();}
	}
}	// FORMROLLBACK


function FORMEXIT(w){
	w.focus();
	if (FDataChanged(w)) return;
	var f=w.df, URL=Top.scriptPath+'?SID='+SID+
	'&T='+MainBllName+'.sc&SCHEMENAME='+f.SCHEMENAME.value+'&XACTION=FORMEXIT'+
	((f.DICTIONARY.value != '')?'&DICTIONARY=1':'')+
	((f.FROMSCHEME.value!='')?'&FROMSCHEME='+f.FROMSCHEME.value:'')+
	((f.FROMPOINT.value!='')?'&FROMPOINT='+f.FROMPOINT.value:'')+
	'&tms='+fnRnd();
	Top.HideAllBars(w);
	if(!URLDebugInfo(URL,w)) w.location.replace(URL);
}	// FORMEXIT

function FORMPRINT(w){
	w.focus();
	PrintFORM(w);
}

add_M('c_form')
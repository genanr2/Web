var
	ind = "index.html",
	defDoc = "ug.useric.outgoing.html",
	defDictCorp = "ug.useric.corporativeDictionaries.html",
	defDictPriv = "ug.useric.internalDictionaries.html";

var com = "MAINPAGE=index.html|NEWS=index.html|";
var doc = "PAYDOCRU=docPayDocRu.html|"+
					"PAYDOCRUVISA=docPayDocRu.html|"+
					"PAYROLLDOC=docPayRollDoc.html|"+
					"PAYDOCCUR=docPayDocCur.html|"+
					"CURRBUY=docCurrBuy.html|"+
					"CURRSELL=docCurrSell.html|"+
					"CURRCONVERSION=docCurrConversion.html|"+
					"MANDATORYCURRSELL=docMandatoryCurrSell.html|"+
					"TRANSITACCPAYDOC=ug.useric.docTransitAcc.html|"+
					"CURRDEALINQUIRY=ug.useric.outgoing.html|"+
					"RURDEALINQUIRY=ug.useric.outgoing.html|"+
					"CONFDOCINQUIRY=ug.useric.outgoing.html|"+
					"FREECLIENTDOC=ug.useric.freeClientDoc.html|"+
					"STATEMENTQUERY=docStatementQuery.html|"+
					"CANCELLATIONREQUEST=ug.useric.cancellationRequest.html|"+
					"DEALPASSCON=ug.useric.docDealPassCon.html|"+
					"DEALPASSCRED=ug.useric.outgoing.html|"+
					"CLIENTCUSTOMDOC=ug.useric.docClientCustomDoc.html|"+

					"STM=docStatementRu.html|"+
					"FREEBANKDOC=ug.useric.freeBankDoc.html|"+
					"TRANSITACCNOTICE=docTransitAccNotice.html|"+
					
					"CUSTOMDEALOUT=docCustomDeal.html|"+
					"CUSTOMBILLOUT=docCustomBill.html|"+
					"CUSTOMACTOUT=docCustomAct.html|"+
					"CUSTOMINVOICEOUT=docCustomInvoice.html|"+
					"CUSTOMFREEDOCOUT=docCustomFreeDoc.html|"+
					
					"CUSTOMDEALIN=docCustomDeal.html|"+
					"CUSTOMBILLIN=docCustomBill.html|"+
					"CUSTOMACTIN=docCustomAct.html|"+
					"CUSTOMINVOICEIN=docCustomInvoice.html|"+
					"CUSTOMFREEDOCIN=docCustomFreeDoc.html|"+

					"DEALPASSCON138I=docDealPassCon138i.html|"+
					"DEALPASSCRED138I=docDealPassCred138i.html|"+
					"CURRDEALINQUIRY138I=docCurrDealInquiry138i.html|"+
					"CONFDOCINQUIRY138I=docConfDocInquiry138i.html|"+
					"DEALPASSCLOSE=docDealPassClose.html|"+
					"DEALPASSRENEW=docDealPassRenew.html|"+

					"CHARGEREQUEST=docChargeRequest.html|"+
					"CHARGEANSWER=docChargeAnswer.html|";

var dictCorp = "BANKRU=|BANKINT=|CURRENCIES=|CURRENCYRATES=|STAT1256=|PAYGRNDPARAM=|TAXPERIODPARAM=|PAYTYPEPARAM=|CBCCODES=|PAYOPERTYPEINT=|ACTIVITYTYPE=|";
var dictPriv = "ACCOUNT=|REMOTEOFFICIALS=|REMOTECORRESP=|REMOTEGROUND=|REMOTEBENEF=|REMOTEGROUNDINT=|DEALPASSPORT=|REMOTES2RINFO=|";
var docSc = "CRYPTO=ug.useric.reqRegener.html|";
var docF = "CRYPTO=ug.useric.profiles.html|";
var dictB2B = "B2BCUSTOMER=dictB2BCustomerOwn.html|"+
							"B2BDESTCUSTOMER=dictB2BCustomerOther.html|"+
							"STATERU=dictStateRu.html|"+
							"METRICS=dictMetrics.html|";

function Help(HREF,w){
	if (HREF == '' || HREF == null){
		var SchemeName = '';
		var FilterIdent = '';

		try{
			df = mw.document.forms("MForm");
			var SchemeName = df.SCHEMENAME.value;
			var FilterIdent = df.FILTERIDENT.value;
		}catch(e){};

		if(FilterIdent=='ARCHIVE') HREF='ug.useric.archive.html';
		else if(FilterIdent=='TEMPLATES') HREF = 'ug.useric.createTemplate.html';
		else
			if(!(HREF = getHref(com,SchemeName,ind)))
				if(!(HREF = getHref(doc,SchemeName,defDoc)))
				  if(!(HREF = getHref(dictB2B,SchemeName,ind)))
					  if(!(HREF = getHref(dictCorp,SchemeName,defDictCorp)))
  						if(!(HREF = getHref(dictPriv,SchemeName,defDictPriv))){
	  						if(mw.IsScroller)
									HREF = getHref(docSc,SchemeName,defDoc);
								else
									HREF = getHref(docF,SchemeName,defDoc);
								if(!HREF) HREF = ind;
						}
	}

	w = window.open(GetHelpRootPath(w) + HREF,"_blank","toolbar=0; location=0; menubar=0; status=0; directories=0; resizable=1; scrollbars=1; height=440; width=400;");
	try{w.moveTo(document.body.clientWidth - 400, 20);}catch(e){}
}

function getHref(str,SchemeName,def){
	try {SchemeName=SchemeName.toUpperCase();}
	catch(e){};

	var arr=Split(str);
	var HREF=arr[SchemeName];
	if(HREF=='') HREF=def;

	return(HREF);
}

function Split(str){
	var a, ar, arHREFs=new Object();
	ar=str.split('|');
	for(var i=0; i<ar.length; i++){
		a=ar[i].split("=");
		
		arHREFs[a[0]]=a[1];
	}
	return(arHREFs);
}

function GetHelpRootPath(w){
	var sRef='';
	if(typeof(Top.IsLegal)!='undefined' || (w!=null && w.gotoVerPath)){
		sRef='../'
	}
	return (sRef+'help/'+Top.LanguageID.toLowerCase()+'/html/');
}


add_M('c_help')
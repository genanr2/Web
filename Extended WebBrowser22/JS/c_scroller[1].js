// ##############	BEHAVIORS OF SCROLLER ROWS	##############
var DivL="RowUnSel", DivSel="RowSel";
var inputErrorCode=0,newwin;

// ################### XML/XSL Loading And Transform #########################
function DoXSLTransSc(w){
	with(w){
		var Err=Top.CheckXML4ParseError(xDefSc,false)+Top.GetSTErrorFromXML(ScData,false),
			xHd=xHeader.documentElement,
			xFt=xFooter.documentElement,
			xF=xFilter.documentElement,
			xDT=xDocTbl.documentElement;
		if(xHd!=null) Err+=Top.CheckXML4ParseError(xHeader,false);
		if(xFt!=null) Err+=Top.CheckXML4ParseError(xFooter,false);
		if(xF!=null) Err+=Top.CheckXML4ParseError(xFilter,false);
		if(xDT!=null) Err+=Top.CheckXML4ParseError(xDocTbl,false);
		if(Err!=''){Top.placeMsg(Err,w); return false;}
		if(w.LResURL!=null&&w.LResURL!=''){
			w.XMLStoreID=w.LResURL;
			LoadLResXML(w,ScData,"/DOCS");
		}
		w.XMLStoreID='xsl/LRSC_'+Top.LanguageID.toLowerCase()+'.xml';
		if(!LoadLResXML(w,ScData,"/DOCS")) return false;

		if(xHd!=null) xDefSc.selectSingleNode("//SPAN[@ID='PageHeader']").appendChild(xHd.cloneNode(true));
		if(xFt!=null) xDefSc.selectSingleNode("//SPAN[@ID='PageFooter']").appendChild(xFt.cloneNode(true));
		if(xF!=null) xDefSc.selectSingleNode("//FORM[@ID='FilterForm']").appendChild(xF.cloneNode(true));
		if(xDT!=null && ScData.selectNodes('/DOCS/*').length>0)
			xDefSc.selectSingleNode("//DIV[@ID='SCRDIV']").appendChild(xDT.cloneNode(true));
		w.sTransformResult=ScData.transformNode(xDefSc.XMLDocument);
		var o=w.document.all.body;
		if (o){if (o.tagName.toUpperCase()!='DIV'){o=w.document.body;}}
		else o=w.document.body;
		o.innerHTML = w.sTransformResult;

		try{
			var sFromScheme=ScData.selectSingleNode('/DOCS/@FROMSCHEME').text;
			var sSchemeTypeExt=ScData.selectSingleNode('/DOCS/@SCHEMETYPEEXT').text;
			var sSchemeName=ScData.selectSingleNode('/DOCS/@SCHEMENAME').text;
			var bIsTransitAccNotice=(sSchemeName=='TRANSITACCNOTICE' && (sFromScheme=='TRANSITACCPAYDOC' || sFromScheme=='MANDATORYCURRSELL' || sFromScheme=='CURRDEALINQUIRY138I'));
			if(w.document.all.FilterBody!=null && w.Grouped!=null && w.Grouped!='' && !bIsTransitAccNotice && sFromScheme!='CANCELLATIONREQUEST' && sFromScheme!='CURRDEALINQUIRY' && sFromScheme!='DEALPASSCON' && sFromScheme!='DEALPASSCRED' && sFromScheme!='PAYROLLDOC'){
				var stateTR,stateTD,s;
				stateTR=w.document.all.FilterBody.insertRow(0);
				stateTD=stateTR.insertCell(0);
				var bB2Bfi=(w.Grouped=='TPL1_B2BOUT' || w.Grouped=='TPL2_B2BOUT' || w.Grouped=='TPL3_B2BOUT' || w.Grouped=='TPL1_B2BRROUT');
				var bB2BfiIN=(w.Grouped=='TPL1_B2BIN');
				var bB2BfiRRIN=(w.Grouped=='TPL1_B2BRRIN');
				var bB2BfiRROUT=(w.Grouped=='TPL1_B2BRROUT');
				s='<SPAN STYLE="font-size: 12px; width: 100px;">'+LRfs0+'</SPAN>';
				s+='<SELECT NAME="FilterIdentList" STYLE="font-size: 12px; width: 230px;" onChange="da.FILTERIDENT.value=this.value; Top.modScFilter(w,(this.value==\'ALL\' || this.value==\'VISAALL\' || this.value==\'ALL-B2BIN\')); Top.checkFilter(window);">';
				if(w.Grouped=='TPL3' || w.Grouped=='TPL3_2'){
					s+='<OPTION VALUE="BANKDOCXALL">'+LRfs7+'</OPTION>';
					s+='<OPTION VALUE="BANKDOCXNEWGTHEN0">'+LRfs1+'</OPTION>';
					if(w.Grouped!='TPL3_2') s+='<OPTION VALUE="BANKDOCXFAVORITES">'+LRfs10+'</OPTION>';
					s+='<OPTION VALUE="BANKDOCXCOMPLETED">'+LRfs6+'</OPTION>';
				}
				else if(w.Grouped=='TPL7'){
					s+='<OPTION VALUE="BANKDOCXALL">'+LRfs7+'</OPTION>';
					s+='<OPTION VALUE="BANKDOCXNEWGTHEN0">'+LRfs1+'</OPTION>';
					s+='<OPTION VALUE="BANKDOCXCOMPLETED">'+LRfs6+'</OPTION>';
				}
				else if(w.Grouped=='TPL6'){
					s+='<OPTION VALUE="VISAALL">'+LRfs7+'</OPTION>';
					s+='<OPTION VALUE="VISASIGNED">'+LRfs11+'</OPTION>';
					s+='<OPTION VALUE="VISAINPROCESS">'+LRfs4+'</OPTION>';
					s+='<OPTION VALUE="VISAREJECTED0GTHEN0">'+LRfs5+'</OPTION>';
				}
				else if(bB2BfiIN){
						s+='<OPTION VALUE="ALL-B2BIN" SELECTED="1" RSELECTED="1">'+LRfs7+'</OPTION>';
						s+='<OPTION VALUE="NEW-B2BIN">'+LRfs1+'</OPTION>';
						s+='<OPTION VALUE="ACCEPTED-B2B">'+LRfs13+'</OPTION>';
						s+='<OPTION VALUE="REJECTED-B2B0GTHEN0">'+LRfs5+'</OPTION>';
				}
				else if(bB2BfiRRIN){
						s+='<OPTION VALUE="ALL-B2BIN" SELECTED="1" RSELECTED="1">'+LRfs7+'</OPTION>';
						s+='<OPTION VALUE="NEW-B2BIN">'+LRfs1+'</OPTION>';
						s+='<OPTION VALUE="ACCEPTED-B2BRRIN">'+LRfs14+'</OPTION>';
						s+='<OPTION VALUE="REJECTED-B2B0GTHEN0">'+LRfs15+'</OPTION>';
				}
				else if(bB2BfiRROUT){
						s+='<OPTION VALUE="ALL" SELECTED="1" RSELECTED="1">'+LRfs7+'</OPTION>';
						s+='<OPTION VALUE="NEW">'+LRfs1+'</OPTION>';
						s+='<OPTION VALUE="SIGNED">'+LRfs3+'</OPTION>';
						s+='<OPTION VALUE="INPROCESS">'+LRfs4+'</OPTION>';
						s+='<OPTION VALUE="COMPLETED">'+LRfs14+'</OPTION>';
						s+='<OPTION VALUE="REJECTED-B2BRR0GTHEN0">'+LRfs5+'</OPTION>';
				}
				else {
					if(w.Grouped=='TPL5'){
						s+='<OPTION VALUE="ALL" SELECTED="1" RSELECTED="1">'+LRfs12+'</OPTION>';
						s+='<OPTION VALUE="NEWCRYPTO">'+LRfs1+'</OPTION>';
					}else{
						s+='<OPTION VALUE="ALL" SELECTED="1" RSELECTED="1">'+LRfs7+'</OPTION>';
						s+='<OPTION VALUE="NEW'+((bB2Bfi)?'-B2B':'')+'">'+LRfs1+'</OPTION>';
					}
					if(w.Grouped=='TPL4' || w.Grouped=='TPL3_B2BOUT')
						s+='<OPTION VALUE="IMPORTED">'+LRfs2+'</OPTION>';
					s+='<OPTION VALUE="SIGNED">'+LRfs3+'</OPTION>';
					s+='<OPTION VALUE="INPROCESS'+((bB2Bfi)?'-B2B':'')+'">'+LRfs4+'</OPTION>';
					if(w.Grouped=='TPL5'){
						s+='<OPTION VALUE="REGISTERED">'+LRfs9+'</OPTION>';
						s+='<OPTION VALUE="REJECTEDCRYPTO">'+LRfs5+'</OPTION>';
					}
					else
						s+='<OPTION VALUE="REJECTED'+((bB2Bfi)?'-B2B':'')+'0GTHEN0">'+LRfs5+'</OPTION>';
					s+='<OPTION VALUE="COMPLETED'+((w.Grouped=='TPL1_DP')?'DEALPASS':'')+((bB2Bfi)?'-B2B':'')+'">'+((bB2Bfi)?LRfs13:LRfs6)+'</OPTION>';
					if(w.Grouped!='TPL2' && w.Grouped!='TPL2_B2BOUT' && w.Grouped!='TPL5')
						s+='<OPTION VALUE="TEMPLATES">'+LRfs8+'</OPTION>';
				}
				s+='</SELECT>';
				stateTD.innerHTML=s;
				w.document.all.FilterIdentList.value=ScData.selectSingleNode("DOCS/@FILTERIDENT").text;
				if(w.document.all.Filter!=null) w.document.all.Filter.style.display='block';
			}
		}catch(e){}
	}
}

function putRC(w,o){
	if(!o.all.Rc0){
		var i=w.document.createElement('<SPAN ID="Rc0" RETRIEVED1="'+o.RETRIEVED1+'" RETRIEVED2="'+o.RETRIEVED2+'" RETRIEVED3="'+o.RETRIEVED3+'" SHOWED="'+o.SHOWED+'" PAGES="'+o.PAGES+'" PAGERULER="'+o.PAGERULER+'" ABSENT1="'+o.ABSENT1+'" ABSENT2="'+o.ABSENT2+'" ABSENT3="'+o.ABSENT3+'" onreadystatechange="if(this.readyState==\'complete\'){this.initLCI();}">')
		o.appendChild(i)
	}else{if(!o.ACTIVEE){try{o.all.Rc0.initLCI()}catch(e){}}}
}

function putSH(w,o){
	if(!o.all.SHcolSwch){
		var sF=o.F;
		if(w.da.FILTERIDENT.value=='TEMPLATES' && typeof(o.FT)!='undefined') sF=o.FT;
		if(sF=='') return;
		var i=w.document.createElement('<SPAN ID="SHcolSwch" S="'+o.S+'" H="'+o.H+'" F="'+sF+'" onreadystatechange="if(this.readyState==\'complete\'){this.initSHCol();}">')
		o.appendChild(i)
	}else{if(!o.ACTIVEE){try{o.all.SHcolSwch.initSHCol()}catch(e){}}}
}

function putSL(w,o){
	if (!o.all.Sl0){
		var i=w.document.createElement('<SPAN ID="Sl0" CLASS="SORTLNK" FLD="'+o.FLD+'" TEXT="'+o.TEXT+'" onreadystatechange="if(this.readyState==\'complete\'){this.initSL();}">')
		o.appendChild(i)
	}else{if(!o.ACTIVEE){try{o.all.Sl0.initSL()}catch(e){}}}
}

function checkScHtc(w){
	var o=w.document.all.RecordsCountInfo_M,i;
	if(o)putRC(w,o)
	o=w.document.all.SRTLNK_M,i;
	if(o){
		if(o.length){for(i=0;i<o.length;i++){putSL(w,o.item(i))}}
		else if(!o.initSL)putSL(w,o)
	}
	o=w.document.all.SHcol_M;
	if(o)putSH(w,o)
}

function modScFilter(w,b){
	if(w.da.FNameBlock!=null && w.da.FilterBody.style.display!='none') w.da.FNameBlock.style.visibility=b? 'visible': 'hidden';
	if(w.da.FLT_STATUS!=null && w.da.FStatusLbl!=null){
		w.da.FLT_STATUS.disabled=!b;
		w.da.FLT_STATUS.style.display=w.da.FStatusLbl.style.display=b? 'inline': 'none';
	}
	setFilterStatus(w,w.isDefVals);
}

function showScrl(w){
	if(w.event.srcElement.readyState=='complete' && w.SCRDIV){
		w.da.SCROLLER.style.display='none';
		w.SCRDIV.style.display=((w.ScData.selectNodes('/DOCS/DOC').length==0) && (w.ScData.selectNodes('/DOCS/NEWS').length==0))?'none':'block';
		if(w.hint&&(!w.noHint)){
			if(w.hint.style.display=='none'){
				if((w.FilterForm.childNodes.length>0)&&(w.FilterForm.childNodes(1))&&(w.FilterForm.childNodes(1).offsetWidth!=0)) w.hint.style.width=w.FilterForm.childNodes(1).offsetWidth;
				else if(w.SCROLLER && w.SCROLLER.offsetWidth!=0) w.hint.style.width=w.SCROLLER.offsetWidth;
				w.hint.style.display='block';
			}
		}
		if((bPKI)&&(Top.ExtSR=='0')&&(!w.top.IsDictionary))Top.completeCommOnload(w);
		try{
			s=w.da.SCHEMENAME.value;
			if(top.TreeType!='GROUPED'&&s!='MAINPAGE')s+='_'+w.da.FILTERIDENT.value;
			else if(top.TreeType=='GROUPED'&&w.da.FILTERIDENT.value.indexOf('ARCHIVE')!=-1)s+='_'+w.da.FILTERIDENT.value;
			if(!w.top.IsDictionary)nv.selectNode(s);
		}catch(e){};
		checkScHtc(w);
		if(typeof(w.InitScrollFilter)=='function') w.InitScrollFilter ();
		if(typeof(w.da.FORTPL)=='object') w.da.FORTPL.style.display=(w.da.FILTERIDENT.value=='TEMPLATES')?'block':'none';
		if(w.da.FILTERIDENT.value=='TEMPLATES'){
			var cols=w.da.SCROLLER.all.tags('COL');
			for(i=0; i<cols.length; i++) if(cols[i].NOTTPL=="1") cols[i].style.display='none';
		}
		w.MWdone=true;
		try{Top.SetToolsPannel(w);}catch(e){}
		w.da.SCROLLER.style.display='block';
	}
	if(Top.lastFocusedEl!=null) try{Top.lastFocusedEl.focus();}catch(e){}
}

function GetParentTBL(el){
	var TBL=el;
	do {TBL=TBL.parentElement} while (TBL.tagName!='TABLE')
	return TBL;
}
//--------------------------------------
function getENH(TBL){return (TBL.getAttribute("enhanced")!=null);}
function IsFirstRowEmpty(TBL){ return (TBL.getAttribute("firstrowempty")!=null);}
function IsSelSingleRow(TBL){ return (TBL.getAttribute("selectsinglerow")!=null);}
function getRowSelClass(TBL,DefaultRowSelClass){
	var RSCL=TBL.getAttribute("rowselclass");
	return ((RSCL==null) || (RSCL=='')) ? DefaultRowSelClass : RSCL;
}
//--------------------------------------
function getLSTR(TBL){
	var LSTR=TBL.getAttribute("lstr");
	return LSTR==null ? -1 : LSTR;
}
function setLSTR(LSTR,TBL){TBL.setAttribute("lstr",LSTR);}
//--------------------------------------
function getTRC(TBL){
	var TRC=TBL.getAttribute("trc");
	return TRC==null ? 0 : TRC;
}
function setTRC(TRC,TBL){TBL.setAttribute("trc",TRC);}
//--------------------------------------
function getTRARR(TBL){
	var TRARR=TBL.getAttribute("trarr");
	return TRARR==null ? new Array() : TRARR;
}
function setTRARR(TRARR,TBL){TBL.setAttribute("trarr",TRARR);}
//--------------------------------------
function getRIARR(TBL){
	var RIARR=TBL.getAttribute("riarr");
	return RIARR==null ? new Array() : RIARR;
}
function setRIARR(RIARR,TBL){TBL.setAttribute("riarr",RIARR);}
//--------------------------------------
//function getRICOUNT(TBL){var RICOUNT=TBL.getAttribute("ricount"); return RICOUNT==null ? -1 : RICOUNT;}
//--------------------------------------
function getIDRS(TBL){
	var IDRS=TBL.getAttribute("idrs");
	return IDRS==null ? '' : IDRS;
}
function setIDRS(IDRS,TBL){TBL.setAttribute("idrs",IDRS);}
//--------------------------------------
function getIDRSCnt(TBL){
	var IDRSCnt=TBL.getAttribute("idrscount");
	return IDRSCnt==null ? 0 : IDRSCnt;
}
function setIDRSCnt(IDRSCnt,TBL){TBL.setAttribute("idrscount",IDRSCnt);}
//--------------------------------------

//####
function ClearSelection(TBL){
	// Remove selection from all selected rows
	var LastSelectedTR=getLSTR(TBL),
	TRArray=getTRARR(TBL);

	if (-1!=LastSelectedTR){
		var RWS=TBL.rows, IsEnhanced=getENH(TBL), TRSelectCount=getTRC(TBL);
		if (TRSelectCount==1){
			RWS(LastSelectedTR).className=IsEnhanced ? RWS(LastSelectedTR).rowclass : DivL;
			TRArray[LastSelectedTR]=false;
		}else{
			for (var i=0; i < TRArray.length; i++){
				if (TRArray[i]){
					TRArray[i]=false;
					RWS(i).className=IsEnhanced ? RWS(i).rowclass : DivL;
				}
			}
		}
	}

	setLSTR(-1,TBL);
	setTRC(0,TBL);
	setTRARR(TRArray,TBL)
} // ClearSelection

//####
function ReInitSCR(TBL){
	// Remove selection from all selected rows
	// Reinit Table Variables
	var RWS=TBL.rows,
	IsEnhanced=getENH(TBL),
	RL=RWS.length,
	TRArray=new Array(RL), RWSi;
	var RSCL=IsEnhanced? getRowSelClass(TBL,DivSel) : DivSel;

	for (var i=0; i < RL; i++){
		RWSi=RWS(i);
		if (RWSi.className==RSCL){
			RWSi.className=IsEnhanced ? RWSi.rowclass : DivL;
		}
	}

	setLSTR(-1,TBL);
	setTRC(0,TBL);
	setTRARR(TRArray,TBL)
} // ReInitSCR

//####
function SelectSingleRow(el){
	var TBL=GetParentTBL(el),
	LastSelectedTR=el.rowIndex,
	TRArray=getTRARR(TBL);
	ClearSelection(TBL);

	el.className=getENH(TBL) ? getRowSelClass(TBL,DivSel) : DivSel;
	TRArray[LastSelectedTR]=true;

	setLSTR(LastSelectedTR,TBL);
	setTRC(1,TBL);
	setTRARR(TRArray,TBL)
} // SelectSingleRow

//####
function SelectRows(Start,End,el){
	// Select the rows interval	(function used with SHIFT key)
	var TBL=GetParentTBL(el),
	RWS=TBL.rows,
	TRSelectCount=getTRC(TBL),
	TRArray=getTRARR(TBL),
	IsEnhanced=getENH(TBL),
	RSCL=getRowSelClass(TBL,DivSel);

	for (var i=Start; i <=End; i++){
		if (!TRArray[i]){
			TRSelectCount++;
			TRArray[i]=true;
			RWS(i).className=IsEnhanced ? RSCL : DivSel;
		}
	}

	setTRC(TRSelectCount,TBL);
	setTRARR(TRArray,TBL)
} //	 SelectRows

//####
function RemoveTRSelection(w,ScrollerIDToClearSelection,bChangeTB){
	// Remove selection from all selected rows anr set LastSelectedTR (last clicked row index) to -1
	if(bChangeTB==null)bChangeTB=true;
	try{w.event.cancelBubble=true;}catch(e){}
	var oSCR=w.document.all[ScrollerIDToClearSelection];
	if (oSCR!=null) ClearSelection(oSCR);
	if(bChangeTB && typeof(markTB)=='function')markTB(w);
} // RemoveTRSelection


//####
function IverseRowSelection(el){
	// Invert row selection (function used with CTRL key)
	var TBL=GetParentTBL(el),
	TRSelectCount=getTRC(TBL),
	TRArray=getTRARR(TBL),
	IsEnhanced=getENH(TBL),
	RSCL=getRowSelClass(TBL,DivSel),
	LastSelectedTR=getLSTR(TBL),
	RI=el.rowIndex;

	if (TRArray[RI]){
		el.className=IsEnhanced ? el.rowclass : DivL;
		TRSelectCount--;
		TRArray[RI]=false;
		if (LastSelectedTR==RI){
			LastSelectedTR=-1;
			var i=0;
			while (i < TRArray.length){
				if (TRArray[i]) {
					LastSelectedTR=i;
					break;
				}
				i++;
			}
		}
	}
	else{
		el.className=IsEnhanced ? RSCL : DivSel;
		TRSelectCount++;
		TRArray[RI]=true;
		LastSelectedTR=RI;
	}

	setLSTR(LastSelectedTR,TBL);
	setTRC(TRSelectCount,TBL);
	setTRARR(TRArray,TBL)
} //	IverseRowSelection

//####
function ClearSelectionButFirst(TBL){
	// Remove the selection from all selected rows but first and return pointer on it
	// if there is no selected row - return null
	var TRSelectCount=getTRC(TBL),
	LastSelectedTR=getLSTR(TBL);

	if (-1==LastSelectedTR) return null;

	var RWS=TBL.rows,
	TRArray=getTRARR(TBL),
	IsEnhanced=getENH(TBL),
	PassFirst=false;

	if (TRSelectCount!=1){
		var i=0;
		while (i < TRArray.length){
			i++;
			if (TRArray[i]){
				LastSelectedTR=i;
				break;
			}
		}
		while (i < TRArray.length){
			i++;
			if (TRArray[i]){
				TRArray[i]=false;
				RWS(i).className=IsEnhanced ? RWS(i).rowclass : DivL;
			}
		}
	}
	TRSelectCount=1;

	setLSTR(LastSelectedTR,TBL);
	setTRC(TRSelectCount,TBL);
	setTRARR(TRArray,TBL)
	return RWS(LastSelectedTR);
} // ClearSelectionButFirst

function ClearSelectionButFirstIDR(TBL){
	//Remove the selection from all selected rows but first and return its IDR
	//if there is no selected row - return empty string ''
	var oROW=ClearSelectionButFirst(TBL), IDR;
	IDR=oROW==null ? '' : oROW.all.SIDR.value;
	setIDRS(IDR,TBL);
	return IDR;
}

function GetRIs(TBL){
	// Fill SCROLLER-TABLE'S attributes:
	// riarr - array of indexes of rows selected
	var RWS=TBL.rows,
	IsEnhanced=getENH(TBL),
	RL=RWS.length,
	RIArray=new Array(), j=0;
	var RSCL=IsEnhanced? getRowSelClass(TBL,DivSel) : DivSel;

	for (var i=0; i < RL; i++){
		if (RWS(i).className==RSCL){
			RIArray[j]=i; j++;
		}
	}

	setRIARR(RIArray,TBL);
	return RIArray;
} // GetRIs

function TrCL(rw){
	var evt=rw.document.parentWindow.event;
	evt.cancelBubble=true;
	var TBL=GetParentTBL(rw);
	if(IsFirstRowEmpty(TBL) && ((TBL.all.TRIDR.length==null) || (TBL.all.TRIDR[0]==rw))) return;
	LastSelectedTR=getLSTR(TBL);
	if ((-1==LastSelectedTR) || (!evt.shiftKey && !evt.ctrlKey) || IsSelSingleRow(TBL)){SelectSingleRow(rw);}
	else if (evt.shiftKey){
		ClearSelection(TBL);
		var CurrentTR=rw.rowIndex;
		if (CurrentTR < LastSelectedTR){SelectRows(CurrentTR,LastSelectedTR,rw);}
		else {SelectRows(LastSelectedTR,CurrentTR,rw);}
	}
	else {IverseRowSelection(rw);}
	setLSTR(rw.rowIndex,TBL);
	if(rw.all.ST) markTB(rw.document.parentWindow,rw);
	else{
		if(rw.all.SCID != null){
			if(rw.all.SCID.value==0 && rw.document.all.SCHEMENAME.value=='METRICS')markTBbyMask(rw.document.parentWindow,'0010');
			else if(rw.all.SCID.value==0 && rw.document.all.SCHEMENAME.value=='NDSTYPES')markTBbyMask(rw.document.parentWindow,'1010');
			else{
				markTBbyMask(rw.document.parentWindow,'');
			}
		}
		else{
			markTBbyMask(rw.document.parentWindow,'');
		}
	}
}

function TrDCL(rw){
// Handler OnDoubleClick
	var w=rw.document.parentWindow;
		w.event.cancelBubble=true;
		if (!w.event.shiftKey && !w.event.ctrlKey){
			Top.SelectSingleRow(rw);
			if (w.onDCEval!=''){eval(w.onDCEval);}
		}
} // TrDCL

//Remove body selection
function RBS(w){
	var dE=w.document.activeElement;
	if(dE)if(dE.form){if(dE.form.name=='FilterForm') return;}
	w.document.selection.empty();
}

function GetIDsEx(w,TBL,ACTID,IDRX){
	// Fill attributes
	// TBL.idrs - List of IDR-s of selected scroller rows ( delimited by '$')
	// TBL.IDRSCnt - Selected IDR-s count
	// В	StatucesToRemove	содержится список "тонких" статусов, каждый из которых заканчивается знаком @
	var RWS=TBL.rows,
	IsEnhanced=getENH(TBL),
	RSCL, RWSi, RL, IDRLst='', IDRSCnt=0, Delim='', iRemoved=0;
	var RSCL=IsEnhanced ? getRowSelClass(TBL,DivSel) : DivSel;

	RL=RWS.length;
	if(w.df.xIDR!=null) w.df.xIDR.value=(IDRX)?'1':'';
	if(typeof(TBL.all.ST)=='object' && TBL.NOTDOC==null){
		// Для документарных скроллеров необходимо снять пометку с тех документов, чьи статусы перечислены в StatucesToRemove
		for(var i=1; i<RL; i++){
			RWSi=RWS(i);
			var sSt=sAl=sFi=null;
			if(RWSi.className==RSCL)sSt=RWSi.all.ST.innerText,sAl=getStatus(w,'ALLOW',sSt),sFi=w.df.FILTERIDENT.value;
			if (sAl!=null){
				if((ACTID=='SIGGO')&&(sSt=='801'))bPassVisa=((sFi=='VISASIGNED')||(sFi=='VISAALL'));
				else bPassVisa=true;
				if (bPassVisa&&((ACTID=='')||(sAl.indexOf(ACTID)>-1)&&!(((ACTID=='BDARH')||(ACTID=='FAV'))&&(sSt.lastIndexOf('*')==sSt.length-1)))){
					IDRSCnt++;
					Delim=(IDRSCnt==1)? '' : '$';
					IDRLst+=Delim+RWSi.all.SIDR.value;
					if(IDRX && RWSi.all.RST!=null) IDRLst+='|'+RWSi.all.RST.value;
				}
				else {
					RWSi.className=IsEnhanced ? RWSi.rowclass : DivL;
					iRemoved ++;
				}
			}
		}
	}
	else{
	// Для НЕ документарных скроллеров...
		for (var i=1; i < RL; i++){
			RWSi=RWS(i);
			if (RWSi.className==RSCL){
				IDRSCnt ++;
				Delim=(IDRSCnt==1)? '' : '$';
				if(typeof(RWSi.all.SIDR)=='object') IDRLst +=Delim+RWSi.all.SIDR.value;
			}
		}
	}
	setIDRS(IDRLst,TBL);
	setIDRSCnt(IDRSCnt,TBL);
	return iRemoved;
}

function getInfo(w,TBL){
	var RWS=TBL.rows,
	IsEnhanced=getENH(TBL),
	RWSi, RL, iDocCnt=0, fAmount=0, bSelection = false;
	var RSCL=IsEnhanced ? getRowSelClass(TBL,DivSel) : DivSel;

	RL=RWS.length;
	if (typeof(TBL.all.AM)=='object' && w.da.thiscnt.value!='0') {
		for (var i=1; i < RL; i++){
			RWSi=RWS(i);
			if (RWSi.className==RSCL){
				bSelection = true;
				iDocCnt++;
				fAmount += parseFloat(RWSi.all.AM.innerText);
			}
		}
		if(!bSelection){
			for (var i=1; i < RL; i++)
				fAmount += parseFloat(RWS(i).all.AM.innerText);
			iDocCnt = RL-1;
		}
	}
	fAmount=Math.round(fAmount*100)/100;
	return(LRS21+iDocCnt+'\n'+LRS22+fAmount+LRS23)
} // getInfo



//#############	INDEPENDENT HTML SCROLLER (XML Data Binding) #################
var ogROW, ogROW2;

function GetXMLMetaTable(w,MetaTableElementName){
	var oGR=w.fData.documentElement.selectSingleNode("//"+MetaTableElementName);
	if (oGR==null){alert('XML metatable <'+MetaTableElementName+'/> is not found.');}
	return oGR;
}
function GetXMLMetaTable2(w,MetaTableElementName,ScrollerNum){
	var oGR;
	if (w.wdict) oGR = w.wdict.fData.documentElement.selectSingleNode("//"+"XmlBuf"+"/"+"DOC").selectSingleNode(MetaTableElementName); 
		else {
			var Psrows = w.fData.documentElement.selectNodes("//PSROWS/DOC");
			for (var i=0;i<Psrows.length;i++) {
				if (Psrows(i).selectSingleNode('ID').text== ScrollerNum) {
					oGR = Psrows(i).selectSingleNode(MetaTableElementName);
					}
			}
		}
	if (oGR==null){alert('XML metatable <'+MetaTableElementName+'/> is not found.');}
	return oGR;
}

function fnIsEmptyXMTROW(oXROW){return oXROW.getAttribute("X")=='';}

function clearXMTROW(oXROW){
	var oCN=oXROW.childNodes, iL=oCN.length;
	for (var i=0; i < iL; i++){oCN(i).text=''} //unescape('%A0')
	oXROW.setAttribute("X","");
}

function RemoveScrollerRow(w,RI,MTEN,IsConfirm){
	var oXMT=GetXMLMetaTable(w,MTEN);
	if (oXMT==null) return false;
	var oCNs=oXMT.childNodes, oXROW=oCNs(RI);
	if(fnIsEmptyXMTROW(oXROW)){clearXMTROW(oXROW);	return false;}
	if(IsConfirm){if (!confirm('Remove row['+(RI+1)+'] ?')) return false;}
	((oCNs.length < 2) && (RI==0)) ? clearXMTROW(oXROW) : oXMT.removeChild(oXROW);
	return true;
} // RemoveScrollerRow

function RemoveScrollerRow2(w,RI,MTEN,IsConfirm,ScrollerNum,ParentScrollerID,WrapperName){
	var oXMT2=GetXMLMetaTable2(w,MTEN,ScrollerNum);
	if (oXMT2==null) return false;
	var oCNs=oXMT2.childNodes, oXROW2=oCNs(RI);
	if(fnIsEmptyXMTROW(oXROW2)){clearXMTROW(oXROW2);	return false;}
	if(IsConfirm){if (!confirm('Remove row['+(RI+1)+'] ?')) return false;}
	((oCNs.length < 2) && (RI==0)) ? clearXMTROW(oXROW2) : oXMT2.removeChild(oXROW2);
	return true;
} // RemoveScrollerRow

function EditScrollerRow(w,RI,MTEN){
	var oXMT=GetXMLMetaTable(w,MTEN);
	if (oXMT==null) return false;
	var oXROW=oXMT.childNodes(RI);
	ogROW=oXROW.cloneNode(true);
	window.ACTION='EDIT';
	if (!w.ShowEditDialog(window)) return false;
	oXMT.replaceChild(ogROW,oXROW);
	ogROW=null;
	return true;
} // EditScrollerRow

function EditScrollerRow2(w,RI,MTEN,ScrollerNum){
	var oXMT2=GetXMLMetaTable2(w,MTEN,ScrollerNum);
	if (oXMT2==null) return false;
	var oXROW2=oXMT2.childNodes(RI);
	ogROW2=oXROW2.cloneNode(true);
	window.ACTION='EDIT';
	if (!w.ShowEditDialog(window)) return false;
	oXMT2.replaceChild(ogROW2,oXROW2);
	ogROW2=null;
	return true;
} // EditScrollerRow

function AddScrollerRow(w,RI,MTEN){
	var oXMT=GetXMLMetaTable(w,MTEN), oXROW;
	if (oXMT==null) return;
	if (RI==null){
		oXROW=oXMT.childNodes(0);
		ogROW=oXROW.cloneNode(true);
		clearXMTROW(ogROW)
		}else {
		oXROW=oXMT.childNodes(RI);
		ogROW=oXROW.cloneNode(true);
	}
	window.ACTION='ADD';
	if (!w.ShowEditDialog(window)) return false;
	fnIsEmptyXMTROW(oXROW) ? oXMT.replaceChild(ogROW,oXROW) : oXMT.appendChild(ogROW);
	ogROW=null;
	return true;
} // AddScrollerRow

function AddScrollerRow2(w,RI,MTEN,ScrollerNum){
	var oXMT2=GetXMLMetaTable2(w,MTEN,ScrollerNum), oXROW2;
	if (oXMT2==null) return;
	if (RI==null){
		oXROW2=oXMT2.childNodes(0);
		ogROW2=oXROW2.cloneNode(true);
		clearXMTROW(ogROW2)
		}else {
		oXROW2=oXMT2.childNodes(RI);
		ogROW2=oXROW2.cloneNode(true);
	}
	window.ACTION='ADD';
	if (!w.ShowEditDialog(window)) return false;
	fnIsEmptyXMTROW(oXROW2) ? oXMT2.replaceChild(ogROW2,oXROW2) : oXMT2.appendChild(ogROW2);
	ogROW2=null;
	return true;
} // AddScrollerRow

function swapRows(w,actRow,swapRow,ScrollerID){
	var result=false;
	var root=w.da.fData.selectSingleNode("//"+ScrollerID), docs=root.selectNodes("DOC");
	if(actRow==null || swapRow<1 || swapRow>=docs.length) return false;
	x=docs[actRow].cloneNode(true);
	y=docs[swapRow].cloneNode(true);
	root.replaceChild(y,docs[actRow]);
	root.replaceChild(x,docs[swapRow]);
	result=true;
	return(result);
}
function rowUp(w,RI,ScrollerID,HRL){if(swapRows(w,RI,RI-1,ScrollerID)) Top.TrCL(da[ScrollerID].rows(RI-1+HRL));}
function rowDn(w,RI,ScrollerID,HRL){if(swapRows(w,RI,RI+1,ScrollerID)) Top.TrCL(da[ScrollerID].rows(RI+1+HRL));}

function ACTS2(w,ACTID,ScrollerID){
	if(w.inputErrorCode!=null && w.inputErrorCode!=0) return;

	var RW, RI, RIList,
	TBL=w.document.all[ScrollerID],
	RL=TBL.rows.length, HRL=RL - TBL.all.TRIDR.length;

	switch (ACTID) {

		case 'DEL':
			if(isNaN(HRL)){RemoveTRSelection(w,ScrollerID); return;}
			var RIArray=GetRIs(TBL), ArL=RIArray.length, i;
			if(ArL==0) return;
			var ConfirmMsg=top.LRS14+ArL+top.LRS15;
			if(!confirm(ConfirmMsg)) return;
			for (i=ArL-1; i >=0; i--){RemoveScrollerRow(w,RIArray[i] - HRL,ScrollerID,false)}
			break;

		case 'EDIT':
			if(isNaN(HRL)){RemoveTRSelection(w,ScrollerID); return;}
			RW=ClearSelectionButFirst(TBL);
			if (RW==null) break;
			if (EditScrollerRow(w,RW.rowIndex - HRL,ScrollerID)) break;
			else return;

		case 'ADD':
		case 'UP':
		case 'DOWN':
			RW=ClearSelectionButFirst(TBL);
			RI=RW==null? null: (RW.rowIndex-HRL);
			if(ACTID=='ADD'){if(AddScrollerRow(w,RI,ScrollerID)) break; else return;}
			if(ACTID=='UP'){rowUp(w,RI,ScrollerID,HRL); return;}
			if(ACTID=='DOWN'){rowDn(w,RI,ScrollerID,HRL); return;}
			break;

		case 'WORKUP':
		case 'REGEN':
		case 'CONFREFUSE':
		case 'GETCERT':
		case 'ACT':
		case 'CARD':
		case 'DATA':
			if(isNaN(HRL))HRL=1;
			RW=ClearSelectionButFirst(TBL);
			if(RW==null){w.alert(LRSscr1); break;}
			if(w.RegenScrollerRow(w,RW.rowIndex - HRL,ScrollerID,ACTID))break;
			else return;

		default : alert(top.LRSscrXX+ACTID); return;
	} // EOF switch

	ReInitSCR(TBL);
}	// ACTS2

function ACTS3(w,ACTID,ScrollerID,ScrollerNum){
	if(w.inputErrorCode!=null && w.inputErrorCode!=0) return;
	var RW, RI, RIList,
	TBL=w.document.all[ScrollerID+ScrollerNum],
	RL=TBL.rows.length, HRL=RL - TBL.all.TRIDR.length;
	switch (ACTID) {

		case 'DEL':

			if(isNaN(HRL)){RemoveTRSelection(w,ScrollerID+ScrollerNum); return;}
			var RIArray=GetRIs(TBL), ArL=RIArray.length, i;
			if(ArL==0) return;
			var ConfirmMsg=top.LRS14+ArL+top.LRS15;
			
			if(!confirm(ConfirmMsg)) return;
			for (i=ArL-1; i >=0; i--){RemoveScrollerRow2(w,RIArray[i] - HRL,ScrollerID,false,ScrollerNum)}
			break;

		case 'EDIT':
			if(isNaN(HRL)){RemoveTRSelection(w,ScrollerID+ScrollerNum); return;}
			RW=ClearSelectionButFirst(TBL);
			if (RW==null) break;
			if (EditScrollerRow2(w,RW.rowIndex - HRL,ScrollerID,ScrollerNum)) break;
			else return;

		case 'ADD' :
			RW=ClearSelectionButFirst(TBL);
			RI=RW==null ? null : (RW.rowIndex - HRL);
			if (AddScrollerRow2(w,RI,ScrollerID,ScrollerNum)) break;
			else return;

		case 'WORKUP':
		case 'REGEN':
		case 'CONFREFUSE':
		case 'GETCERT':
		case 'ACT':
		case 'CARD':
		case 'DATA':
			if(isNaN(HRL))HRL=1;
			RW=ClearSelectionButFirst(TBL);
			if(RW==null){w.alert(LRSscr1); break;}
			if(w.RegenScrollerRow(w,RW.rowIndex - HRL,ScrollerID,ACTID))break;
			else return;

		default : alert(top.LRSscrXX+ACTID); return;
	} // EOF switch

	ReInitSCR(TBL);
}	// ACTS2



//----------------- EOF INDEPENDENT HTML SCROLLER ----------------------------

// Вывод формы просмотра документа (из скроллера) в новом окне
function fnVIEW(w,sTsk,kvit){
	if(sTsk==null) sTsk=MainBllName+'.view';
	var wdf=w.df, URL=URLdllSid+sTsk+'&SCHEMENAME='+wdf.SCHEMENAME.value+'&IDR='+wdf.IDR.value+
		'&FORMACTION='+wdf.XACTION.value+'&FILTERIDENT='+wdf.FILTERIDENT.value+'&nw=1&tms='+ fnRnd();
	if(kvit!=null) URL=URL+'&KVIT='+kvit;
	if(wdf.DocTypeId!=null) URL=URL+'&DocTypeId='+wdf.DocTypeId.value;
	URLDebugInfo(URL,w,false); // Show request string in DEBUG mode
	newwin=window.open(URL,"_blank","toolbar=0; location=0; menubar=0; status=0; directories=0; resizable=1; scrollbars=1; height=450; width=450;");
	var idTm;
	function completeVIEW(){
		try{
			if(newwin==null || newwin.document==null || newwin.document.readyState!="complete"){
				idTm=w.top.setTimeout(completeVIEW,100); return;
			}
		}catch(e){idTm=w.top.setTimeout(completeVIEW,100); return;}
		newwin.Top=Top;
		newwin.jsOwner=w;
		newwin.IsVIEW=true;
		newwin.w=newwin;
		w.top.clearTimeout(idTm);
	}
	completeVIEW();
}

//---
function fnRTFDoc(w){
	var wdf=w.df;
	var URL='SID='+Top.SID+'&T=RT_1RTF.runDocRTFExport&SCHEMENAME='+wdf.SCHEMENAME.value+'&FILTERIDENT='+wdf.FILTERIDENT.value+'&IDR='+wdf.IDR.value+'&CurAON='+((AsOp!=null)?'&CurAON='+AsOp.Name:'')+'&tms='+ fnRnd();
	if(wdf.DocTypeId!=null) URL=URL+'&DocTypeId='+wdf.DocTypeId.value;
	URLDebugInfo(URL,w,false); // Show request string in DEBUG mode
	w.RtsRequest=URL;
	w.SendXMLSwitch='JustRequest';
	HideAllBars(w);
	w.WaitMes.innerText=LRS3;
	SendXML('Top.checkStartRTFDOC',w);
}
function checkStartRTFDOC(w,ACTID,XMLHTTP){
	w.SendXMLSwitch='';
	w.WaitMes.innerText="";
	ShowAllBars(w);
	var oXML=XMLHTTP.responseXML;
	ErrMsg=GetSTErrorFromXML(oXML,false);
	if(ErrMsg!=''){placeMsg(ErrMsg,w); return;}
	if(oXML.selectSingleNode('R')!=null){
		Top.runAsOperation(oXML.selectSingleNode('R').text, Top.LRAOn4, 'RTFDOC', true);
	}
}
//---

function GetScrollData(w){
	// Made request for portion of XML data in the island	'ScData'
	var wdf=w.df;
	try{wdf.CNT.value=wdf.WSTATUS.value=wdf.SIGNDATA.value='';}catch(e){}
	// gets IDR of first or last record on the page
	var oRoot=w.ScData.documentElement;

	var n=0, IDR='';
	if(wdf.DIRECTION.value=='1') n=oRoot.getAttribute("eindex")-oRoot.getAttribute("sindex");
	try{IDR=oRoot.getElementsByTagName("DOC")(n).getAttribute('IDR');}catch(e){}
	if(IDR!='' && wdf.XACTION.value!="DEL" && wdf.XACTION.value!="KILL" && wdf.XACTION.value!="IMP") wdf.IDR.value=IDR;

	w.token=fnRnd();
	HideAllBars(w);
	w.WaitMes.innerText=LRS3;
	w.bRqst=true;
	RemoveTRSelection(window,'SCROLLER');
	w.AddEmptyPrm=(wdf.XACTION.value!="DEL");
	SendXML('Check_ScrollData',w,'',wdf,w.document.forms("FilterForm"));
}

function Check_ScrollData(w,ACTID,XMLHTTP){
	w.WaitMes.innerText="";
	var oXML=XMLHTTP.responseXML;
	// проверяем, совпадение токена (окно, инициализировавшее запрос - то самое окно)

	InitObjectsAliases(w);
	var wdf=w.df;

	var ErrMsg;
	w.bRqst=false;
	var RCode=parseFloat('0'+XMLHTTP.getResponseHeader("RCode"));

	if(RCode < 5){ // Критическая ошибка. Ошибка RTS
		ErrMsg=XMLHTTP.responseText;
		// В случае неопределенной ошибки первый символ ответа - не <
		if(!ErrMsg.match(/^</)) placeMsg(UndefinedError(ErrMsg),w);
		else{
			// В ответе должен быть XML
			ErrMsg=GetSTErrorFromXML(oXML,false);
			if(ErrMsg!='') placeMsg(ErrMsg,w); // Корректный ответ с СОО
			else placeMsg(LRS20,w);
		}
		ShowAllBars(w);
		return;
	}
	var RToken=XMLHTTP.getResponseHeader("Token");
	if(RToken!=w.token){
		ShowAllBars(w);
		if(Top.bShowReqInfo)alertToken(w.token,RToken);//DEBUG
		return;
	}
	ErrMsg=GetSTErrorFromXML(oXML,false);
	if(ErrMsg!=''){placeMsg(ErrMsg,w); return;}

	var oDOCS=oXML.selectSingleNode("DOCS");
	if(oDOCS==null){placeMsg(LRSscr4,w); return;}
	var rcnt=oDOCS.getAttribute("rcnt"), pn=oDOCS.getAttribute("pn"), pl=oDOCS.getAttribute("pl");
	setTbDCcfg(w,oXML)
	try{Top.SetToolsPannel(w);}catch(e){}
	if(oH=oDOCS.attributes.getNamedItem('SCROLLHEADER'))if(oH.nodeValue!='')w.da.ScrollHeader.innerText=oH.nodeValue
	w.ScData.loadXML(oXML.xml);
	w.scrollTo(0,0);
	ShowAllBars(w);
	InitObjectsAliases(w);
	if(rcnt < 1){try{w.da.SCRDIV.style.display="none";} catch(e){}}
	nv.setInfoCellValues(unescape(oDOCS.getAttribute("scnt")));
	var fi=w.da.FILTERIDENT.value;
	modScFilter(w,(fi=='ALL' || fi=='VISAALL' || fi=='ALL-B2BIN'));

	var sReply=GetTextFromReplyTag(oXML);
	if(sReply!='') placeMsg(GetErrMessage(sReply,false),w);
} // Check_ScrollData

function resetForm(wdf){
	var i, j=wdf.length, el;
	// Установка значений по умолчанию.
	for(i=0; i<j; i++){
		el=wdf.elements[i];

		if(!(el.name=='FNAME' && el.parentElement.id=='FNameBlock') && (el.parentElement.id!='TransitAccNotice') && (el.type=="text" || el.type=="hidden" || el.tagName=="TEXTAREA")){
			el.defaultValue=(el.RVAL!=null)? el.RVAL: '';
		}
		else if(el.type=="checkbox" || el.type=="radio"){
			el.defaultChecked=(el.RCHECKED!=null);
		}
		else if(el.tagName=="SELECT"){
			var opts=el.options, l=opts.length;
			for(var k=0; k<l; k++){
				var opt=opts[k];
				opt.defaultSelected=(opt.RSELECTED!=null);
			}
		}
	}

	wdf.reset();
}	// resetForm

function InitFlds4GoToDirect(wdf,Direct,RSRT,XA){
	wdf.IDR.value=wdf.FLIDR.value='';
	wdf.DIRECTION.value=Direct;
	wdf.T.value=MainBllName+'.sc';
	wdf.RESORT.value=RSRT;
	try{wdf.XACTION.value=XA;}catch(e){}
}

function GoToDirect(Direct,w){
	if(w.document.readyState!="complete"){alert(LRSscr2);return;}
	AsignFrameAliases(w);
	w=w.mw;
	var oR=w.ScData.documentElement;
	if(((oR.getAttribute("sindex")=="1")&&(Direct<0))||
	 ((oR.getAttribute("eindex")==w.ScData.XMLDocument.selectSingleNode("DOCS").getAttribute("rcnt"))&&(Direct>0))
	)return;
	InitObjectsAliases(w);
	InitFlds4GoToDirect(w.df,Direct,'','');
	GetScrollData(w);
}

function InitFlds4GetScroll(wdf,PGN,RSRT,XA){
	wdf.FLIDR.value=''; //обнуление списка выделенных строк
	wdf.DIRECTION.value='-2';
	wdf.PAGENUMBER.value=PGN;
	wdf.T.value=MainBllName+'.sc';
	wdf.RESORT.value=RSRT;
	try{wdf.XACTION.value=XA;}catch(e){}
}

function GoToPage(Page,w,d){
	if(w.document.readyState!="complete"){alert(LRSscr2);return;}
	InitObjectsAliases(w);
	InitFlds4GetScroll(w.df,Page,'','');
	if(d==null) d=0;
	else w.df.PAGEID.value=Page;
	w.df.DIRECTION.value=d;
	GetScrollData(w);
}

function completeFilter(w,ACTID,XMLHTTP){
	w.WaitMes.innerText="";
	var wdff=w.document.forms("FilterForm");
	var oXML=XMLHTTP.responseXML;
	var ErrMsg=GetSTErrorFromXML(oXML,false);
	if(ErrMsg=='' && oXML.parseError.errorCode==0){
		var fn='«'+oXML.selectSingleNode('R/@N').text+'»', mes='';
		switch(oXML.selectSingleNode('R').text){
			case '1':
				mes=LRfs51+fn+LRfs56; break;
			case '2':
				mes=LRfs54a+fn+LRfs54b; break;
			case '3':
				mes=LRfs51+fn+LRfs55;
				wdff.FNAMEOLD.value=wdff.FNAME.value;
				break;
			case '-2':
			case '-3':
				mes=LRfs54a+fn+LRfs57;
				break;
		}
		if(mes!='') alert(mes);
	}
	else placeMsg(ErrMsg,w); // Корректный ответ с СОО
	ShowAllBars(w);
}

function XFilter(ACTID,w,b){
	if(b==null) b=true;
	if(w.document.all.DATATBL.readyState!='complete')return false;
	Top.lastFocusedEl=w.event.srcElement;
	w.df=w.document.forms("MForm");
	var wdff=w.document.forms("FilterForm");
	w.df.SCROLLACTID.value=ACTID;
	w.AddEmptyPrm=(ACTID=='SAVE');
	if(ACTID=='SAVE' || ACTID=='DELETE'){
		w.df.T.value='RT_1common.setFilterInTable';
		if(wdff.FNAME.value==''){alert(LRfs50); wdff.FNAME.focus(); return false;}
		//if(ACTID=='SAVE' && (b && !confirm(LRfs51+'«'+wdff.FNAME.value+'»'+LRfs52))) return false;
		//if(ACTID=='DELETE' && !confirm(LRfs51+'«'+wdff.FNAME.value+'»'+LRfs53)) return false;

		HideAllBars(w);
		w.WaitMes.innerText=LRS3;
		Top.SendXML('completeFilter',w,ACTID,w.df,wdff);
		return true;
	}
	else if(ACTID=='REMOVE'){
		resetForm(wdff);
		if(wdff.FilterIdentList) w.df.FILTERIDENT.value=wdff.FilterIdentList.value;
	}
	else{
		if(ACTID=='APPLY' && w.FNameBlock!=null && wdff.isSvdVals!=null && wdff.isSvdVals!=true) wdff.FNAME.value='';
		if(w.inputErrorCode!=null && w.inputErrorCode!=0) return false;
		else {try{if(!(w.checkFilterData()))return false;}catch(e){}}
	}
	InitObjectsAliases(w);
	InitFlds4GetScroll(w.df,1,'','');
	//w.tb.PageBar.Visible=false;
	GetScrollData(w);
	return true;
}

function ReSort(w,FLD){
	InitObjectsAliases(w);
	if(w.event.ctrlKey){
		var o=w.document.all.Sl0,i=0,b=false;
		for(i;i<o.length;i++){if(!b)b=o.item(i).getAttribute('IDX')}
		if(b)FLD='_'+FLD;
	}
	InitFlds4GetScroll(w.df,1,FLD,'');
	GetScrollData(w);
	w.df.RESORT.value='oo';
}

// exit from dictionary without changes
function OnExitDict(w){w.top.close();}

function checkRec(SchName,IDR){
	//проверка записи таблицы
	var oxh=new ActiveXObject(Top.XMLHTTP_ID),ox;
	var b=true;
	oxh.open("GET",Top.XMLScriptPath+'?t=rt_2ic.checkRec&SID='+Top.SID+'&SCHEMENAME='+SchName+'&IDR='+IDR+'&tms='+Top.fnRnd(),false);
	oxh.setRequestHeader("Content-Type","text/xml");
	oxh.send('');
	if(oxh.readyState==4){
		ox=oxh.responseXML;
		var e=Top.GetSTErrorFromXML(ox,0);
		if(e!=''){Top.placeMsg(e,Top.mw); b=false;}
	}
	return(b);
}

// ######################## Function of Form Sending	########################
function ACTS(w,ACTID,Prm1,Prm2){
	if(w.WaitMes.innerText!='')return;
	ACTID=ACTID.toUpperCase(); //alert('ACTS\nACTID: ' +ACTID );
	InitObjectsAliases(w);
	var wdf=w.df, TBL=w.da.SCROLLER, iRemoved, URL;
	clearMsg(w);	//w.da.ERRORTD.innerHTML='';

	w.sWaitMesage=LRS3;
	closeCalendar(w,1)
	wdf.XACTION.value=ACTID;

	try{
		// очистка полей, в которых могут содержаться данные предыдущих запросов
		wdf.SIGNDATA.value='';
		wdf.WSTATUS.value='';
		wdf.CNT.value='';
		wdf.FLIDR.value='';//обнуление списка выделенных строк
		wdf.xIDR.value='';
	}catch(e){}

	switch (ACTID){
		// Cases, wich returned from function

		case 'INFO':
			alert(getInfo(w,TBL));
			return;

		case 'DEL':;
		case 'KILL':
			iRemoved=GetIDsEx(w,TBL,ACTID,typeof(TBL.all.RST)=='object');
			if(TBL.idrs==''){
				if(iRemoved==0) fnHlp(w);
				else{alert(LRS11);setLSTR(null,TBL);}
				return;
			}
			wdf.IDR.value=TBL.idrs;
			if(w.da.NOS!=null && w.da.FILTERIDENT.value!='TEMPLATES') var ConfirmMsg=LRS14+TBL.idrscount+LRS15;
			else var ConfirmMsg=LRS14t+TBL.idrscount+LRS15t;
			if(w.confirm(ConfirmMsg)){
				wdf.T.value=MainBllName+'.del';
				GetScrollData(w);
			}
			return;

		case 'ADD':
			ClearSelectionButFirstIDR(TBL);
			wdf.IDR.value=TBL.idrs;
			wdf.T.value=MainBllName+'.form';
			wdf.XMLDATA.value='';
			URL=Top.scriptPath+'?'+GetFParams(wdf,true)+'&tms='+fnRnd()+'&L='+Top.LanguageID;
			if (!URLDebugInfo(URL,w)) w.location.replace(URL);
			//wdf.XMLDATA.value='1';
			return;

		case 'GETCERT':
			if(Top.bAuthXNotPassed){alert(LRnoSK0); return;}
			oRow=ClearSelectionButFirst(TBL);
			iRemoved=GetIDsEx(w,TBL,ACTID);
			if(TBL.idrs==''){
				if(iRemoved==0) fnHlp(w);
				else{alert(LRS11);setLSTR(null,TBL);}
				return;
			}
			wdf.T.value=MainBllName+'.form';
			wdf.IDR.value=TBL.idrs;
			wdf.XMLDATA.value='';
			URL=Top.scriptPath+'?'+'t='+wdf.T.value+'&SID='+df.SID.value+'&SCHEMENAME='+wdf.SCHEMENAME.value+'&tms='+fnRnd()+'&L='+Top.LanguageID+
				'&XACTION='+ACTID+'&IDR='+wdf.IDR.value+'&CryptoUID='+Top.XMLhexEncode(oRow.all.CUID.innerText)+'&DocRef='+oRow.all.DOCREF.value;
			if (!URLDebugInfo(URL,w)) w.location.replace(URL);
			return;

		case 'EDIT':;
		case 'EDIT_TPL':
			ClearSelectionButFirstIDR(TBL);
			iRemoved=GetIDsEx(w,TBL,ACTID);
			if (TBL.idrs==''){
				if(iRemoved==0) fnHlp(w);
				else{alert(LRS11);setLSTR(null,TBL);}
				return;
			}
			wdf.IDR.value=TBL.idrs;
			wdf.T.value=MainBllName+'.form';
			wdf.XMLDATA.value='';
			URL=Top.scriptPath+'?'+GetFParams(wdf,true)+'&tms='+fnRnd()+'&L='+Top.LanguageID;
			if(!URLDebugInfo(URL,w)) w.location.replace(URL);
			//wdf.XMLDATA.value='1';
			return;

		case 'EXIT':
			if(FDataChanged(w))return;
			if(w.top.IsDictionary){OnExitDict(w); return;}
			alert('Сообщите администратору!!!'); ////???? Вот и узнаем, когда нужно бывает вернуться из скроллера, открытого не в модальном окне
			return;

		case 'GETKVIT':;
		case 'GETKVITSTM':;
		case 'CHECKKVIT':
			if(Top.isAlertNoAX('\n'+Top.LRnoAX14)) return false;

			ClearSelectionButFirstIDR(TBL);
			iRemoved=GetIDsEx(w,TBL,ACTID);
			wdf.IDR.value=TBL.idrs;
			if(TBL.idrs==''){
				if(iRemoved==0) fnHlp(w);
				else{alert(LRS11);setLSTR(null,TBL);}
			}else{
				if(ACTID=='GETKVIT') Top.fnVIEW(w,Prm1,Prm2);
				else if(ACTID=='GETKVITSTM') Top.getDocXML(w,wdf.SCHEMENAME.value,wdf.IDR.value,'&KVIT=STM');
				else Top.showMD(mw,'../scheme/kvit/kvitchoose_form_',600,230);
			}
			return;

		case 'VIEW':;
		case 'VIEW_TPL':	////?????
			ClearSelectionButFirstIDR(TBL);
			iRemoved=GetIDsEx(w,TBL,ACTID);
			if(TBL.idrs==''){
				if(iRemoved==0) fnHlp(w);
				else{alert(LRS11);setLSTR(null,TBL);}
				return;
			}
			else{
				wdf.IDR.value=TBL.idrs;
				fnVIEW(w,Prm1);
			}
			return;

		case 'ACT':
			RW=Top.ClearSelectionButFirst(TBL);
			iRemoved=GetIDsEx(w,TBL,ACTID);
			wdf.IDR.value=TBL.idrs;
			if(TBL.idrs==''){
				if(iRemoved==0) fnHlp(w);
				else{alert(LRS11);setLSTR(null,TBL);}
			}
			else Top.nv.DEF('RT_2CRYPTO.ACT',null,null,null,'&CryptoUID='+RW.all.CUID.innerText+'&newKey=0');
			return;

		case 'PRN':
			GetIDsEx(w,TBL,'');
			if(TBL.idrs=='') fnHlp(w);
			else{
				wdf.IDR.value=TBL.idrs;
				fnPRN(w,ACTID);
			}
			return;

		case 'PRNALL':
			//зд. 39683: перед печатью проверяет, применены ли условия фильтра
			if (checkFilter(w)) {
			GetIDsEx(w,TBL,'');
			wdf.FLIDR.value=TBL.idrs;
				fnSCRPRN(w,ACTID);} else
				Top.alert(w.xLRs.selectSingleNode('//C/FILTER_PRNALL_CHECK/@V').text);
			return;

		case 'RTF':
			ClearSelectionButFirstIDR(TBL);
			if(TBL.idrs=='') fnHlp(w);
			else{
				wdf.IDR.value=TBL.idrs;
				Top.checkAsOperation('RTF');
			}
			return;

		case 'CHK':
			ClearSelectionButFirstIDR(TBL);
			if(TBL.idrs=='') fnHlp(w);
			else{
				wdf.IDR.value=TBL.idrs;
				wdf.T.value=MainBllName+'.InsDict';
				if(GetxData(w)) w.top.close();
			}
			return;

		 // Cases, wich continue function

		case 'SIG':if (df.NOS.value=='0'){alert(LRSSig29);return};
		case 'SIGGO':;
		case 'GOPROC':;
		case 'DOCACK':
			if(Top.bAuthXNotPassed){alert(LRnoSK0); return;}
			var addMes=(wdf.FILTERIDENT.value.indexOf('VISA')==0)?Top.LRnoAX12:Top.LRnoAX11;
			if(df.NOS.value!='0')if(Top.isAlertNoAX('\n'+addMes)) return false;
			
			if(ACTID=='SIG' && nv.MySigner.NumberOfSignatures==0) return false;
			iRemoved=GetIDsEx(w,TBL,ACTID,typeof(TBL.all.RST)=='object');
			if(TBL.idrs==''){
				if(iRemoved==0) fnHlp(w);
				else{alert(LRS11);setLSTR(null,TBL);}
				return;
			}

			var idrT=TBL.idrs;
			if((ACTID=='SIGGO')||(ACTID=='DOCACK')){
				idrP=idrS='';
				arr=idrT.split('$')
				for(var i=1;i<TBL.rows.length;i++){
					for(var j=0;j<arr.length;j++){
						rwa=TBL.rows.item(i).all;
						var sTmp=((rwa.SIDR!=null)?rwa.SIDR.value:'')+((rwa.RST!=null)?'|'+rwa.RST.value:'');
						if(arr[j]==sTmp){
							var sS=rwa.ST.innerText;
							if((sS=='7')||((sS=='0')&&(df.NOS.value=='0')))idrP+=arr[j]+'$'
							else idrS+=arr[j]+'$'
						}
					}
				}
				idrT=idrS.replace(/\$$/,'')+'#'+idrP.replace(/\$$/,'');
			}

			if(ACTID=='DOCACK'){
				URL=Top.scriptPath+'?SID='+Top.SID+'&t=RT_3DocAck.GetDocAckForm&' + '&tms='+fnRnd()+'&xIDR=1'+'&S='+w.ScData.selectSingleNode('/DOCS/@SCHEMEID').text+'&R='+idrT;
				var retVal=w.showModalDialog(URL,w,"dialogWidth:500px; dialogHeight:450px; help: no; status: no; resizable: no;");
				if(retVal==1){
					w.df.T.value='RT_2IC.sc';
					GetScrollData(w);
				}	
				return;			
			}
				
			wdf.IDR.value=idrT;
			wdf.T.value=MainBllName+((ACTID=='GOPROC')?'.sc_status':'.sc_get_signs');
			w.bSendToProcess=(ACTID.indexOf('GO') > -1);
			if(ACTID.indexOf('SIG') > -1)wdf.SGCFG.value=(Top.GetSConfForDoc(w))?'exist':Top.GetSignState(w);
			wdf.WSTATUS.value=(w.bSendToProcess)? ((Top.bReaccept)? sST_INPROC: sST_ACCPT): sST_SIG; // 'распознан' / 'принят' / 'подписан'
			break;

		case 'BDARH':;
		case 'FAV':
			iRemoved=GetIDsEx(w,TBL,ACTID,typeof(TBL.all.RST)=='object');
			if(TBL.idrs==''){
				if(iRemoved==0) fnHlp(w);
				else{alert(LRS11);setLSTR(null,TBL);}
				return;
			}
			wdf.IDR.value=TBL.idrs;
			if(ACTID=='BDARH'){
				wdf.WSTATUS.value=sST_ARCH;	// 'архивный'
				wdf.T.value=MainBllName+'.sc_status';
			}
			else
				wdf.T.value=MainBllName+'.sc_mark_seen';
			break;

		case 'RVISA':
			if(Top.bAuthXNotPassed){alert(LRnoSK0); return;}
			iRemoved=GetIDsEx(w,TBL,ACTID,typeof(TBL.all.RST)=='object');
			if (TBL.idrs==''){(iRemoved==0)? fnHlp(w) : alert(LRS11); return;}
			if (confirm(LRSSig10)) {
				wdf.IDR.value=TBL.idrs;
				wdf.WSTATUS.value=sST_NOTACCPT;  // не принят
				wdf.T.value=MainBllName + '.sc_status';
			} else return;
			break;

		case 'MOV':;
		case 'TPL':	 ////???? Token
			GetIDsEx(w,TBL,'');
			if (TBL.idrs==''){fnHlp(w); return;}
			wdf.IDR.value=TBL.idrs;
			wdf.T.value=MainBllName+((ACTID=='MOV')?'.sc_mark_seen':'.sc_to_template');
			break;

		case 'IMP':
			iRemoved=GetIDsEx(w,TBL,ACTID);
			if(TBL.idrs==''){
				if(iRemoved==0) fnHlp(w);
				else{alert(LRS11);setLSTR(null,TBL);}
				return;
			}
			wdf.IDR.value=TBL.idrs;
			wdf.T.value=MainBllName+'.accept_imported';
			GetScrollData(w);
			return;

		case 'CDOCACC':
		case 'CDOCREJ':
			if(Top.bAuthXNotPassed){alert(LRnoSK0); return;}
			if(df.NOS.value!='0')if(Top.isAlertNoAX('\n'+Top.LRnoAX18)) return false;
			iRemoved=GetIDsEx(w,TBL,ACTID,typeof(TBL.all.RST)=='object');
			if(TBL.idrs==''){
				if(iRemoved==0) fnHlp(w);
				else{alert(LRS11);setLSTR(null,TBL);}
				return;
			}
			var idrT=TBL.idrs;

			idrP=idrS='';
			arr=idrT.split('$')
			for(var i=1;i<TBL.rows.length;i++){
				for(var j=0;j<arr.length;j++){
					rwa=TBL.rows.item(i).all;
					var sTmp=((rwa.SIDR!=null)?rwa.SIDR.value:'')+((rwa.RST!=null)?'|'+rwa.RST.value:'');
					if(arr[j]==sTmp){
						var sS=rwa.ST.innerText;
						if((sS=='7')||((sS=='0')&&(df.NOS.value=='0')))idrP+=arr[j]+'$'
						else idrS+=arr[j]+'$'
					}
				}
			}
			idrT=idrS.replace(/\$$/,'')+'#'+idrP.replace(/\$$/,'');

			wdf.IDR.value=idrT;
			if(ACTID=='CDOCACC' && !CheckDoc() &&!w.b2bSS){alert(LRSSig42+'\n\n'+mw.jOut); return;}
			wdf.T.value=MainBllName+'.sc_get_signs';
			w.bSendToProcess=true;
			wdf.SGCFG.value=(Top.GetSConfForDoc(w))?'exist':Top.GetSignState(w);
			if(ACTID=='CDOCACC'){
				wdf.WSTATUS.value=sST_CDOCACC;
				wdf.FACCEPT.value='1';
			}
			if(ACTID=='CDOCREJ'){
				wdf.WSTATUS.value=sST_CDOCREJ;
				wdf.FACCEPT.value='2';
				nv.MyTools.InputTextData='';
				var ResultIsOK = nv.MyTools.ShowInputTextDialog(LRS27c,LRS27,1000,false);
				//зм. 78357 Для при отказе запроса на добавление контрагента B2B не допускается пустое поле причины отказа
				if(ResultIsOK){if(nv.MyTools.InputTextData!=null) 
					{if ((nv.MyTools.InputTextData=='')&&(w.b2bSS)) {
						Top.placeMsg(Top.GetErrMessage('0|6=0:'+Top.LRS27m),w); return;} else
							wdf.ACCEPTCOMMENT.value=nv.MyTools.InputTextData;} 
			}
				else
					if ((!ResultIsOK)&&(w.b2bSS)) return;
			}
			break;

		case 'CDOCCONF':
			RW=Top.ClearSelectionButFirst(TBL);
			iRemoved=GetIDsEx(w,TBL,ACTID,typeof(TBL.all.RST)=='object');
			if(TBL.idrs==''){(iRemoved==0)? fnHlp(w): alert(LRS11); return;}
			wdf.IDR.value=TBL.idrs;
			if(!CheckDoc()){
				if(RW.all.RST.value=='17443'){
					if(!confirm(LRSSig43)) return;
					wdf.WSTATUS.value='18041';
				}
				else if(!confirm(mw.jOut+'\n\n'+LRSSig41)) return;
			}
			else if(!confirm(mw.jOut+'\n\n'+LRSSig41)) return;
			wdf.T.value=MainBllName + '.sc_status';
			break;
		case 'ACKNOW1':
		case 'ACKNOW2':
		case 'ACKNOW3':
		case 'NOTICE':
		case 'ADJUST':
		case 'SCADJUST':
		case 'ACKADJUST':
		case 'CRPDR':
			RW=Top.ClearSelectionButFirst(TBL);
			iRemoved=GetIDsEx(w,TBL,ACTID,typeof(TBL.all.RST)=='object');
			if(TBL.idrs==''){(iRemoved==0)? fnHlp(w): alert(LRS11); return;}
			wdf.IDR.value=TBL.idrs;
			if(ACTID=='ADJUST') Top.nv.DEF(Top.MainBllName + '.form','CUSTOMINVOICESPECOUT','NEW',null,'&SourceIDR='+wdf.IDR.value);
			else if(ACTID=='SCADJUST') Top.nv.DEF(Top.MainBllName + '.SC',Prm1,null,Prm2,'&SourceIDR='+wdf.IDR.value);
			else  if(ACTID=='CRPDR') Top.nv.DEF(Top.MainBllName + '.form',Prm1,'NEW',null,'&SourceIDR='+wdf.IDR.value+'&SRCSCHEMENAME='+Top.mw.da.SCHEMENAME.value);
			else if(checkRec(wdf.SCHEMENAME.value,wdf.IDR.value)) Top.nv.DEF(Top.MainBllName + '.form',Prm1,'NEW',null,'&SourceIDR='+wdf.IDR.value+((Prm2!=null)?'&AT='+Prm2:''),Top.ccSITE+'_HLP');
			return;

		default: alert(LRSscr3+ACTID); return;
	} // EOF switch

	HideToolBar(w);
	w.token=fnRnd();	// устанавливаем токен, по которому, по приходу ответа, удостоверимся в присутствии страницы - потребителя информации ответа.
	w.WaitMes.innerText=w.sWaitMesage;
	w.SendXMLSwitch='default';
	if(ACTID=='GOPROC'||ACTID=='MOV'||ACTID=='BDARH'||ACTID=='FAV'||ACTID=='RVISA'||ACTID=='CDOCCONF')
		SendXML('Check_ScrollData',w,ACTID,wdf);
	else
		SendXML('fnOnDataResult',w,ACTID,wdf);
}	// ACTS


function fnOnDataResult(w,ACTID,XMLHTTP){
	// Выполняется по приходу данных в XMLHTTPrequest.
	w.WaitMes.innerText="";
	var oXML=XMLHTTP.responseXML;

	var wdf=w.df;

	var ErrMsg;
	var RCode=parseFloat('0'+XMLHTTP.getResponseHeader("RCode"));

	if(RCode < 5){ // Критическая ошибка. Просто ошибка. Ошибка RTS
		ErrMsg=XMLHTTP.responseText;
		// В случае неопределенной ошибки первый символ ответа - не <
		if(!ErrMsg.match(/^</)) placeMsg(UndefinedError(ErrMsg),w);
		else{
			// В ответе должен быть XML
			ErrMsg=GetSTErrorFromXML(oXML,false);
			if((ErrMsg=='')&&(oXML.parseError.errorCode==0)){
				oXML=new ActiveXObject(XMLDOM_ID);
				oXML.loadXML(XMLHTTP.responseText)
					alert(oXML.xml)
				ErrMsg=GetSTErrorFromXML(oXML,false);
			}
			if(ErrMsg!='') placeMsg(ErrMsg,w); // Корректный ответ с СОО
			else placeMsg(LRS20,w);
		}
		ShowToolBar(w);
		return;
	}
	var RToken=XMLHTTP.getResponseHeader("Token");
	if(RToken!=w.token){
		ShowToolBar(w);
		if(Top.bShowReqInfo)alertToken(w.token,RToken);//DEBUG
		return;
	}
	// Если в XML присутствует тег errmsg, то значит есть сообщение об ошибке
	var ErrMsg=GetSTErrorFromXML(oXML,false);
	if(ErrMsg!=''){placeMsg(ErrMsg,w); ShowToolBar(w); return;}
	// Иначе - Все ОК / СКРОЛЛЕР

	var sReply=GetTextFromReplyTag(oXML);
	if(sReply!='') placeMsg(GetErrMessage(sReply,false),w);

	w.XRQST=XMLHTTP;
	w.setTimeout("if(Top.DoItOnDataResult(window,'"+ACTID+"', window.XRQST))Top.ShowToolBar(window)",50);
}

function DoItOnDataResult(w,ACTID,XMLHTTP){
	switch (ACTID){
	case 'TPL':;
	case 'CHANGE_STATUS':
		var cnt=XMLHTTP.getResponseHeader("Cnt");
		if (cnt!=''){nv.setInfoCellValues(unescape(cnt))}
		var IdrStatusList=XMLHTTP.getResponseHeader("IdrStatusList");
		fnRefreshStatusesInScroller(w,IdrStatusList);
		break;

	case 'SIG':;
	case 'SIGGO':
	case 'CDOCACC':
	case 'CDOCREJ':
		var wdf=w.df;
		// Проверяем, не включен ли режим остановки перед подписыванием.
		if(Top.bStopSign && !arguments[3]) {
			w.XMLHTTP=XMLHTTP;
			var sHTML='<DIV><BUTTON onclick="var pe=this.parentElement; pe.style.display=\'none\'; Top.DoItOnDataResult(window,\''+ACTID+'\',window.XMLHTTP,true); pe.removeNode(true);">Continue Sign Operation</BUTTON></DIV>';
			Drow_sHTML(w,sHTML);
			return true;
		}
		var oXML=XMLHTTP.responseXML;
		var sInitXML=XMLHTTP.responseXML.xml;
		// Если нет документов для подписи, прервать операцию.
		if (parseFloat('0'+XMLHTTP.getResponseHeader("Sign-Count")) < 1) {
			if(oXML.selectSingleNode('/DOCS'))Check_ScrollData(w,ACTID,XMLHTTP)
			ClearSelection(w.da.SCROLLER);
			return true;
		}
		var oSIc=oXML.selectNodes("//DOCS/R/SIGN/@SI"), oIDRc=oXML.selectNodes("//DOCS/R/@IDR"),
		j=oSIc.length, arSI=new Object(), oDR, sSI, sIDR;
		for(var i=0; i < j; i ++){
			if(oSIc.item(i).text=='0'){
				sIDR=oIDRc.item(i).text;
				if(sIDR!='') arSI[oIDRc.item(i).text]='0';
			}
		}
		var bSgCh=false;
		var prevNOS = nv.MySigner.NumberOfSignatures;
		var bIsVisa = (oXML.selectSingleNode('/DT/DOCS/R/@ST').text == sST_VISA && (wdf.FILTERIDENT.value.indexOf('VISA')>-1));
		var oc=oXML.selectSingleNode('/DT/DOCS[@CF="1"]');
		n=oXML.selectSingleNode('/DT/SC/Signs');
		if(top.ExtSR=='1'||w.Crypto||bIsVisa||oc||n){
			if(n){
				var errNode=n.selectSingleNode('ERROR');
				if(errNode!=null && Trim(errNode.text)!=''){
					if(errNode.text!='') addMsg(GetErrMessage('0|1=0:'+errNode.text,false),w);
					return true
				}else{
					if(bIsVisa){
						nv.MySigner.XMLCryptoParamsData=Top.RestoreSParams(w,n);
						// nv.MySigner.AutoSignMask = 's3a1=1';
						nv.MySigner.HideSignsNumbers = '1,2';	
						nv.MySigner.NumberOfSignatures = 3;
					}else{
						is=(w.Crypto)?1:parseInt(n.attributes.getNamedItem('NOS').nodeValue);
						if(w.Crypto||oc)w.SignB=nv.MySigner.XMLCryptoParamsData;
						if(is>0){
							nv.MySigner.XMLCryptoParamsData=Top.RestoreSParams(w,n);
							if(!w.Crypto && !w.bB2B) Top.SignConf.loadXML(nv.MySigner.XMLCryptoParamsData);
						}
						nv.MySigner.NumberOfSignatures=isNaN(is)?0:is;
					}
				}
			}
		}else if(top.nv.MySigner.XMLCryptoParamsData=='')if(Top.ReloadSignConf(w)){
			top.nv.MySigner.XMLCryptoParamsData=Top.SignConf.xml;
			nv.MySigner.NumberOfSignatures=parseInt(Top.SignConf.documentElement.attributes.getNamedItem('NOS').nodeValue);
		}

		if(nv.MySigner.NumberOfSignatures>0){
			if((w.Crypto)&&(Top.TtPr>1)&&(Top.MyTools.CryptMode==0)){
				var oX=new ActiveXObject(XMLDOM_ID);
				if(oXML.selectSingleNode('/DT/DOCS/R/SIGN/S').text==''){
					oX.loadXML(nv.MySigner.XMLCryptoParamsData)
					U=oX.selectSingleNode('/Signs/Sign/@UID').nodeValue;
					DN=oX.selectSingleNode('/Signs/Sign/@DisplayName').nodeValue;
					nv.MySigner.SC_SIGN_RG(oXML,U,DN,location.hostName);
					bSgCh=nv.MySigner.SignChanged;
				}else{
					if(confirm(LRSSig26)){
						oXML.selectSingleNode('/DT/DOCS/R/SIGN/S').text='';
						var oN=oXML.selectNodes('/DT/DOCS/R/SIGN/TYP');
						for(i=0;i<oN.length;i++){
							oN.item(i).attributes.getNamedItem('I').nodeValue=''
							oN.item(i).attributes.getNamedItem('U').nodeValue=''
							oN.item(i).attributes.getNamedItem('L').nodeValue=''
							oN.item(i).attributes.getNamedItem('N').nodeValue=''
							oN.item(i).removeChild(oN.item(i).selectSingleNode('FIELDS'))
						}
						oXML.selectSingleNode('/DT/DOCS/R/SIGN/@SI').nodeValue='0';
						oXML.selectSingleNode('/DT/DOCS/R/@ST').nodeValue='0';
						bSgCh=true;
					}else{addMsg(GetErrMessage('0|7=0:'+LRSSig12,false),w);break;}
				}
			}else{
				nv.MySigner.DocScheme = w.ScData.selectSingleNode('/DOCS/@SCHEMEID').text;
			
				if((ACTID=='CDOCACC' || ACTID=='CDOCREJ')&&w.bB2B){
					if(ACTID=='CDOCACC')
					  nv.MySigner.DocScheme=nv.MySigner.DocScheme+'_A'					
					else
						nv.MySigner.DocScheme=nv.MySigner.DocScheme+'_N';
					nv.MySigner.B2BDealSignaturesXML(oXML);
				}	
				else
					nv.MySigner.DealSignaturesXML(oXML);
					
				bSgCh=nv.MySigner.SignChanged;
				if(bSgCh){
					var oInitXML=getLoadedXML(sInitXML);
					var oResRecs=oXML.selectNodes('/DT/DOCS/R');
					var oInitRecs=oInitXML.selectNodes('/DT/DOCS/R');
					var oResTyp, oInitTyp;
					var iCh,i,j,n;
					n=0;
					var ar=[];
					for(i=0;i<oResRecs.length;i++){
						oResTyp=oResRecs.item(i).selectNodes('SIGN/TYP');
						oInitTyp=oInitRecs.item(i).selectNodes('SIGN/TYP');
						iCh=0;
						for(j=0;j<oResTyp.length;j++){
							if(oResTyp.item(j).attributes.getNamedItem('U').nodeValue != oInitTyp.item(j).attributes.getNamedItem('U').nodeValue)
								iCh=1;
						}		
						if(iCh==0){
							ar[n]=i;
							n++;
						}		
					}
					if(ar.length!=0)
						for(i=ar.length-1;i>-1;i--){
							oXML.selectSingleNode('/DT/DOCS').removeChild(oResRecs.item(ar[i]));
						}
				}	
			}
		}else{
			oN=oXML.selectNodes('/DT/DOCS/R');
			if (oN.length>0)for(var i=0;i<oN.length;i++){
				oN.item(i).selectSingleNode('SIGN/D').text=''
				oN.item(i).selectSingleNode('SIGN/@SI').nodeValue=7;
			}
		}

		nv.MySigner.NumberOfSignatures = prevNOS;
		nv.MySigner.AutoSignMask = '';
                nv.MySigner.HideSignsNumbers = '';

		if(w.Crypto||oc)nv.MySigner.XMLCryptoParamsData=w.SignB;
		if(n=oXML.selectSingleNode('/DT/SC/Signs'))n.parentNode.removeChild(n)
		for(key in arSI){
			oDR=oXML.selectSingleNode('//DOCS/R[@IDR="'+key+'"]');
			if(oDR!=null && arSI[key]=='0' && oDR.selectSingleNode("SIGN/@SI").text=='0') oDR.parentNode.removeChild(oDR);
		}
		j=oXML.selectNodes("//DOCS/R").length;
		if(j < 1 || (!bSgCh&&(bIsVisa || (wdf.WSTATUS.value!=sST_ACCPT && wdf.WSTATUS.value!=sST_INPROC)))){
			addMsg(GetErrMessage('0|7=0:'+LRSSig12,false),w);
			break;
		}

		placeMsg(GetErrMessage('0|7=0:'+LRSSig13+j,false),w);
		var oFIELDS=oXML.selectNodes('//FIELDS');
		for(var i=0;i<oFIELDS.length;i++){oFIELDS.item(i).text = '';}
		var oReply=oXML.selectSingleNode('//reply');
		if(oReply!=null) oReply.parentNode.removeChild(oReply);
		var RtsRequest='SID='+SID+'&T=RT_2IC.sc_set_signs'+
		((w.bSendToProcess)?'&GO=1':'')+'&SCHEMENAME='+wdf.SCHEMENAME.value+'&XACTION='+ACTID+'&FILTERIDENT='+wdf.FILTERIDENT.value+'&XMLDATA=1'+((wdf.DocTypeId!=null)?'&DocTypeId='+wdf.DocTypeId.value:'');
		if((ACTID=='CDOCACC' || ACTID=='CDOCREJ')&&w.bB2B&&wdf.ACCEPTCOMMENT!=''){
			var docs=oXML.selectSingleNode('/DT/DOCS');
			var node=oXML.createElement('ACCEPTCOMMENT');
			node.text=wdf.ACCEPTCOMMENT.value;
			docs.appendChild(node);
			var node=oXML.createElement('FACCEPT');
			node.text=wdf.FACCEPT.value;
			docs.appendChild(node);
			w.TokenD=XMLHTTP.getResponseHeader("Token-D");
		}

		if (wdf.SCHEMENAME.value=='CRYPTO') RtsRequest+='&REFRESH_FILTER_IDENT_LIST_FOR_SIGN=NEWCRYPTO,SIGNED,INPROCESS,REGISTERED,REJECTEDCRYPTO';

		HideAllBars(w);
		w.token=fnRnd();
		w.WaitMes.innerText=w.sWaitMesage;
		w.SendXMLSwitch='SetSigns';

		SendXML('Check_ScrollData',w,'SET_SIGNS',oXML,RtsRequest);

		w.SendXMLSwitch='default';
		return false;
	} // EOF switch
	return true;
} // fnOnDataResult

//===========================================================================

function fnRefreshStatusesInScroller(w,IdrStatusList){
	// Обновление статусов в скроллере по данным вида 'IDR1=STATUS1$IDR2=STATUS2'
	var a, ar, arRes=new Object(), arT, key, RWiA, StID;
	var SidrLng, RL, daS=w.da.SCROLLER, daSS=daS.all.SIDR;

	if (IdrStatusList!=''){
		ar=IdrStatusList.split("$");
		for (var i=0; i<ar.length; i++){
			a=ar[i].split("=");
			arRes[a[0]]=a[1];
		}
		SidrLng=(daSS==null) ? 0 : ((daSS.length==null) ? 1 : daSS.length);
		var RWS=daS.rows;
		RL=RWS.length;
		for (i=RL - SidrLng; i < RL; i++){
			RWiA=RWS(i).all;
			key=RWiA.SIDR.value;
			if(arRes[key]!=null){
				StID=arRes[key];
				if(StID=='*')RWiA.STN.innerText=getStatus(w,'NAME',RWiA.ST.innerText)+StID;
				else{
					RWiA.ST.innerText=StID;
					RWiA.STN.innerText=getStatus(w,'NAME',StID);
				}
			}
		}
	}
}	// fnRefreshStatusesInScroller


// ######################## Chain of PRINT functions #########################
function fnSCRPRN(w,actID,pF){
	w.WaitMes.innerText=LRS3;
	w.status=LRS3;
	w.focus();
	w.xslPrintTarget.innerHTML='';

	if (!w.isRep) w.df.T.value=MainBllName+'.sc';
	var s=GetFParams(w.df,true,true,false);
	w.RtsRequest=s+'&PrnFlag='+((pF==null)?2:pF);
	w.token=fnRnd();
	w.NoLoadData=true;
	w.SendXMLSwitch='JustRequest';
	SendXML('Top.drillReport',w,actID);
}
function fnPRN(w,ACTID,bLoadData){
	ClearTimeStamp();
	w.NoLoadData=(bLoadData!=null);
	//clearMsg(w);
	// Подгрузить xPrint (Print XSL), при необходимости.
	// При ошибке - вывести сообщение и прекратить.
	// Если все ОК - продолжить.

	var xPrint=w.xPrint;
	if (xPrint.XMLDocument.xml!=''){after_xPrint_Ready(w); return;}
	//addMsg(LRS4+'<BR>',w);
	w.WaitMes.innerText=LRS4;
	xPrint.async=true;
	xPrint.load(w.PrintFormURL);
	with(w){window.ogInterval=window.setInterval("Top.Check_xPrint_ReadyState(window);",100);}
}

function Check_xPrint_ReadyState(w){
	with(w){
		//addMsg('xPrint readyState : '+xPrint.readyState+'<BR>',w);
		if (w.xPrint.readyState=='complete'){
			clearInterval(window.ogInterval);
			var sErr=CheckXML4ParseError(w.xPrint,false);
			if (sErr!=''){WaitMes.innerText=""; Top.placeMsg(sErr,window); return;}
			Top.after_xPrint_Ready(window);
		}
	}
}

function after_xPrint_Ready(w){
	SetTimeStamp(LRS4);
	var wdf=w.df, xData=w.xData;
	if (w.NoLoadData){with(w){Top.after_xData_Ready(window);return;}}
	var URL=XMLScriptPath+'?'+'T='+MainBllName+'.PRN&SID='+wdf.SID.value+
	'&FILTERIDENT='+wdf.FILTERIDENT.value+
	'&SCHEMENAME='+wdf.SCHEMENAME.value+((wdf.DocTypeId!=null)?'&DocTypeId='+wdf.DocTypeId.value:'')+
	'&IDR='+w.da.SCROLLER.idrs+'&tms='+ fnRnd();
	URLDebugInfo(URL,w,false); // Show request string in DEBUG mode
	// Download xData
	w.WaitMes.innerText=LRS5;

	w.XHR=new ActiveXObject(Top.XMLHTTP_ID);
	w.XHR.open("GET",URL,true);
	w.XHR.send('');

	with(w){window.ogInterval=window.setInterval("Top.Check_xData_ReadyState(window);",100);}
}

function Check_xData_ReadyState(w){
	with(w){
		//addMsg('xData readyState : '+xData.readyState+'<BR>',w);
		if(w.XHR.readyState==4){
			clearInterval(window.ogInterval);
			w.xData.async=false;
			w.xData.validateOnParse=false;
			w.xData.resolveExternals=false;
			w.xData.preserveWhiteSpace=false;
			w.xData.loadXML(w.XHR.responseXML.xml);
				var sErr=GetSTErrorFromXML(w.xData,false);
			if (sErr!=''){WaitMes.innerText=""; Top.placeMsg(sErr,window); return;}
			Top.after_xData_Ready(window);
		}
	}
}

function after_xData_Ready(w){
	SetTimeStamp(Top.LRS5);
	w.WaitMes.innerText=LRS6;
	with(w){
		 clearTimeout(window.ogTimeout);
		 window.ogTimeout=window.setTimeout("Top.Continue_Transform_Data_for_Print(window);",50);
	}
}

function Continue_Transform_Data_for_Print(w){
	SetTimeStamp(LRS6);
	with(w){
		if(typeof(InitPrint)=='function') try{InitPrint(w,w.xData);}catch(e){};
		w.sTransResult=w.xData.transformNode(w.xPrint.XMLDocument);
		WaitMes.innerText=Top.LRS6x;
		setTimeout("Top.Continue_Render_Data_for_Print(window);",50);
	}
}

function Continue_Render_Data_for_Print(w){
	SetTimeStamp(LRS6x);
	with(w){
		w.da.xslPrintTarget.innerHTML=w.sTransResult;

		var cSB=w.xData.selectNodes('//SIGNSBLOCK');
		for(i=0;i<cSB.length;i++){
			try{
				if(cSB.length==1) w.da.SIGNSBLOCK.innerHTML=cSB[i].transformNode(xsSignBlock.XMLDocument);
				else w.da.SIGNSBLOCK[i].innerHTML=cSB[i].transformNode(xsSignBlock.XMLDocument);
			}catch(e){}
		}

		WaitMes.innerText="";
		if(typeof(stmprocessPrintForm)=='function') stmprocessPrintForm(window,w.xData);
		else try{processPrintForm(window,w.xData)}catch(e){} // function processPrintForm находится в частном js
		if (!w.isReport){
			if(!bAX)placeMsg(GetErrMessage('0|5=0:'+LRnoAX10+'[BR]'+LRnoAX17),w)
			w.focus(); 
			w.print();
		}
		else w.enablePrn()
	}
}

function drillReport(w,ACTID,XMLHTTP){
	w.SendXMLSwitch='';
	var wdf=w.df, wd=w.document;
	w.WaitMes.innerText="";
	Top.status='';

	var oXML=XMLHTTP.responseXML;

	var ErrMsg, Status;
	var RCode=parseFloat('0'+XMLHTTP.getResponseHeader("RCode"));
	if(RCode < 5){ // Критическая ошибка. Просто ошибка. Ошибка RTS
		ErrMsg=XMLHTTP.responseText;
		// В случае неопределенной ошибки первый символ ответа - не <
		if(!ErrMsg.match(/^</)) placeMsg(UndefinedError(ErrMsg),w);
	else{
			// В ответе должен быть XML
			ErrMsg=GetSTErrorFromXML(oXML,false);
			if((ErrMsg=='')&&(oXML.parseError.errorCode==0)){
				oXML=new ActiveXObject(XMLDOM_ID);
				oXML.loadXML(XMLHTTP.responseText)
					alert(oXML.xml)
				ErrMsg=GetSTErrorFromXML(oXML,false);
			}
			if(ErrMsg!='') placeMsg(ErrMsg,w); // Корректный ответ с СОО
			else placeMsg(LRS20,w);
		}
		return;
	}

	var RToken=XMLHTTP.getResponseHeader("Token");
	if(RToken!=w.token){
		ShowToolBar(w);
		if(Top.bShowReqInfo)alertToken(w.token,RToken);//DEBUG
		return;
	}

	if(RCode==5){ // Поступили предупреждения.
		ErrMsg=GetSTErrorFromXML(oXML,true);
		if (ErrMsg!='' && confirm(ErrMsg)) Top.fnSCRPRN(w,'PRNALL','1');
		// По идее здесь бы разместить код обработки	ErrMsg==''
		return;
	}

	//RCode==7
	if ((oXML.selectSingleNode("DOCS") ==null) || (oXML.selectSingleNode("DOCS").getAttribute("rcnt")<1)){alert(Top.LRNoRecSC);return}

	if (w.isReport==1){w.goReport(oXML)}
	else{
		w.SendXMLSwitch='default';
		w.xData.loadXML(oXML.xml);
		if(w.LResURL!=null&&w.LResURL!=''){
			w.XMLStoreID=w.LResURL;
			LoadLResXML(w,w.ScData,"/DOCS");
		}
		w.XMLStoreID='xsl/LRSC_'+Top.LanguageID.toLowerCase()+'.xml';
		if(!LoadLResXML(w,w.xData,"/DOCS"));
		fnPRN(w,ACTID,1);
	}
}

function gotoTmplts(){
	var da=Top.mw.da;
	if(da.FilterBody!=null){
		da.FILTERIDENT.value='TEMPLATES';
		if(da.FilterIdentList)da.FilterIdentList.value=da.FILTERIDENT.value;
		da.FilterBody.all.tags('BUTTON')[0].click();
	}
}

function keyActsSc(w){
	if(w.event.keyCode==13){
		var oFB=w.da.FilterBody;
		if(oFB!=null){
			var oAB=oFB.all.tags('BUTTON')[0];
			if(oAB!=null && w.event.srcElement!=oAB && w.event.srcElement!=oFB.all.tags('BUTTON')[1]){
				oAB.focus();
				function ABclick(){oAB.click();}
				w.setTimeout(ABclick,100);
			}
		}
	}
}

add_M('c_scroller');
// ########### Toolbar & PageBar

// Show / Hide PageBar
function ShowPageBar(MW){
	try{
		var o=MW.ScData.XMLDocument.selectSingleNode("DOCS");
		if(parseInt(o.getAttribute("rcnt")) <= parseInt(o.getAttribute("pl"))) return;
		var PB=MW.top.tb.PAGEBAR;
		PB.style.display="";
		PB=PB.getElementsByTagName("span");
		if(o.getAttribute("sindex")=="1"){
			PB(0).style.visibility='hidden';
			PB(1).style.visibility='hidden';
		}else{
			PB(0).style.visibility='visible';
			PB(1).style.visibility='visible';
		}
		if(o.getAttribute("rcnt")==o.getAttribute("eindex")){
			PB(2).style.visibility='hidden';
			PB(3).style.visibility='hidden';
		}else{
			PB(2).style.visibility='visible';
			PB(3).style.visibility='visible';
		}
	}catch(e){};
}
function HidePageBar(MW){
	var PB;
	try{
		PB=MW.top.tb.PAGEBAR;
		PB.style.display="none";
		PB=PB.getElementsByTagName("span");
		PB(0).style.visibility='hidden';
		PB(1).style.visibility='hidden';
		PB(2).style.visibility='hidden';
		PB(3).style.visibility='hidden';
	}catch(e){};
}

//-------------------------------ToolBar-----------------------------------------------------------
function ChgStyleTb(Obj,Event){
	try{
		switch(Event){
			case 'over':
				Obj.className='ToolImg_A';
				Obj.all.img.className="TImg_A"
				break;
			case 'out':
				Obj.className='ToolImg';
				Obj.all.img.className="TImg_A"
				break;
			case 'down':
				Obj.className='ToolImg_D';
				Obj.all.img.className="TImg_B"
				break;
			case 'up':
				Obj.className='ToolImg_A';
				Obj.all.img.className="TImg_A"
				break;
		}
	}catch(e){}	
}

function SetToolBar(MW){
	//addMsg(getCaller(SetToolBar)+'<br>',MW)
	var tbPanID=MW.tbPanID, tbMap=MW.tbMAP;
	try{
		SetCustomToolBar(MW,tbPanID,tbMap);
	}catch(e){};
	markTB(MW);
}

function alerter(o1,o2){
	alert(o1.srcElement+'\n'+o2.srcElement)
}
function SetCustomToolBar(w,tbPanID,tbMap){
	if(w.HIDDENFORM) return;
	var oTbl=w.top.tb.MyToolBar;
	if(!tbPanID){oTbl.innerHTML='';return;}
	var oXml=w.top.tb.oTbData,oXsl=w.top.tb.xToolBar,oTbNode=oXml.selectSingleNode("//" + tbPanID),oTbNodes,index=0,oA;
	if(oTbNode==null){oTbl.innerHTML='';return;}
	var oNX=new ActiveXObject(Top.XMLDOM_ID);
	oNX.appendChild(oNX.createProcessingInstruction('xml', ' version="1.0" encoding="windows-1251"'));
	var oRN=oNX.appendChild(oNX.createElement(tbPanID));
	var ir=tbMap.split(''),str='';
	var bP=(oTbNode.attributes.getNamedItem('P')!=null);
	if(bP){oA=oNX.createNode(2,'P','');oA.nodeValue='1';}
	for (j=0;j<oTbNode.childNodes.length;j++){
		iMask=(!ir[j])?1:parseInt(ir[j]);
		if(iMask==1){
			var oN=oTbNode.childNodes.item(j).cloneNode(true);
			if(bP)oN.attributes.setNamedItem(oA.cloneNode(true))
			oRN.appendChild(oN);
		}
	}
	txt=oRN.transformNode(oXsl.XMLDocument);
	oTbl.innerHTML=txt;
}

function ChngAct(msk){
	var aR=new Array('onclick','onmouseover','onmouseout','onmousedown','onmouseup');
	for(var i=0; i<5; i++){
		if(msk==0){eval('if(vPC.'+aR[i]+'!=""){vPC.'+aR[i]+'_=vPC.'+aR[i]+';vPC.'+aR[i]+'="";}')
		}else eval('if(vPC.'+aR[i]+'=="")vPC.'+aR[i]+'=vPC.'+aR[i]+'_;');
	}
}

// Show / Hide ToolBar
function ShowToolBar(MW){
 try{
	//tb.MyToolBar.ShowPanel(mw.tbPanID); //≈сли эту строку заремарить, то глюки (с эксепшнами при удалении записи) исчезнут
	MW.top.tb.MyToolBar.style.display="block";
 }catch(e){};
}
function HideToolBar(MW){
	if(MW.HIDDENFORM) return;
	try{MW.top.tb.MyToolBar.style.display="none";}catch(e){};
}

// Show / Hide	all pannels
function ShowAllBars(MW){
	ShowToolBar(MW);
	ShowPageBar(MW);
}
function HideAllBars(MW){
	if(MW.HIDDENFORM) return;
	HideToolBar(MW);
	HidePageBar(MW);
}

// Show ToolBar & PageBar (with PageBar refresh if need)
function SetToolsPannel(MW){
	if(MW.HIDDENFORM) return;
	//if(MW.MWdone==false){with(MW){window.TBtmr=window.setTimeout("Top.SetToolsPannel(window)",50)};return}
	//else if(MW.TBtmr!=null)Top.clearTimeout(MW.TBtmr)
	try{SetToolBar(MW)}catch(e){};
	ShowAllBars(MW);

	if(MW.IsScroller){
		var s=MW.ScData.selectSingleNode('//@SAVEDDOCIDR');
		s=(s==null)?'':s.text;
		if(s!='') for(var i=1;i<MW.SCROLLER.rows.length;i++) if(MW.SCROLLER.rows[i].all.SIDR!=null && MW.SCROLLER.rows[i].all.SIDR.value==s) MW.SCROLLER.rows[i].click();//TrCL(MW.SCROLLER.rows[i]);
	}
	
	if(typeof(MW.postProcTB)=='function') MW.postProcTB();
}

// TOOLBAR FUNC
function fnAbout(){
	window.version=version;
	window.showModalDialog("../aboutbss_"+top.LanguageID.toLowerCase()+".htm",window,"dialogWidth=487px; dialogHeight=330px; center=1; help=0; border=thin; status=0; maximize=0; minimize=0;");
}
function OKD_tb(){
	var w=this.parentWindow;
	if(top.sA['c_debug']==1){OKD_tb2(w); return;} // OKD_tb2 in common_debug.js
}

function DBG(toolwin){
 //alert('DBG\ntoolwin: '+toolwin.name + '\nwindow.IsDEBUG: ' +window.IsDEBUG + '\nDEBUGJS.readyState: ' +DEBUGJS.readystate);
 if((top.sA['c_debug']==1)&&(window.IsDEBUG=='1'))Show_DEBUG_TD(toolwin,true);
}


function GetToolbar(){
	//копирует HTML панели инструментов (удвл€ет изображение логотипа) дл€ использовани€ в мод. окнах справочников.
	var ID='ToolBarHTML', s=getXOs(ID);
	if(s==null){
		s=Top.tb.document.body.parentElement.outerHTML;
		setXOs(ID,s);
	}
	return s;
}

function activate(o,isActive){
		if(!o.t_oc)o.t_oc=o.onclick;
		if(!o.t_oov)o.t_oov=o.onmouseover;
		if(!o.t_oou)o.t_oou=o.onmouseout;
		if(!o.t_od)o.t_od=o.onmousedown;
		if(!o.t_ou)o.t_ou=o.onmouseup;
		if(isActive){
			o.onclick=o.t_oc;o.onmouseover=o.t_oov;o.onmouseout=o.t_oou;o.onmousedown=o.t_od;o.onmouseup=o.t_ou;
			if(o.all.dvs){o.all.img.className='TImg_A';o.all.dvs.style.filter=''}
		}else{
			o.onclick=o.onmouseover=o.onmouseout=o.onmousedown=o.onmouseup='';
			if(o.all.dvs){o.all.img.className='shad';o.all.dvs.style.filter="alpha(opacity:40)";}
		}
}
function markTB(w,rw){
	var p='',isrw=(typeof(rw)=='object'),invTB='';
	if(isrw && rw.all.TBNOTALLOW!=null)invTB=','+rw.all.TBNOTALLOW.value+',';
	if(isrw){
		var TBL=Top.GetParentTBL(rw),
		TRArray=Top.getTRARR(TBL);
		for(i=1; i<TBL.rows.length; i++)
		if(TRArray[i] && TBL.rows[i].all.ST)
			p+=','+Top.getStatus(w,'ALLOW',TBL.rows[i].all.ST.innerText);
		p+=',';
	}
	var cont=w.Top.tb.document.all.TB_cells;
	if(cont) for(i=0;i<cont.cells.length;i++){
		o=cont.cells(i);
		var s=o.id;s=s.slice(3,s.length);
		var isActive=(o.getAttribute('permanent') || (isrw && p.match(','+s+',')));
		if(isActive && invTB!='') isActive=(invTB.match(','+s+',')==null);
		activate(o,isActive);
	}
}
function markTBbyMask(w,msk){
	if(!w.standalone){
		var cont=(w.top.tb)?w.top.tb.document.all.TB_cells:null;
		if(cont) for(i=0;i<cont.cells.length;i++){
			o=cont.cells(i);
			var isActive=(o.getAttribute('permanent') || msk=='' || msk.charAt(i)=='1');
			activate(o,isActive);
		}
	}
}
add_M('c_toolbar')
var fld,GlobRds=null,bHideInfo=true,passExp,bATO=true,oXS=null,a_bS,FTrows='40,*,0',FGcols='237,*',gotPKI=false;
function a_l(w){a_mw=w;a_d=w.document;a_da=a_d.all;w.Top=top.Top;}
function a_s(w,i,t){a_l(w);if(top.bEmptyPass!='1'){if(!a_da.L.disabled){if(i==1)a_da.L.focus();else a_da.P.focus();} mda.fUnsafe.checked=(top.bDemo)?true:!bAX; changeSafe(mda.fUnsafe); if(top.bDemo){a_da.P.value=a_da.L.value=top.sDemoL;try{a_da.SB.focus()}catch(e){}}}}
function a_k(w,ev){
	e=ev.srcElement.id;
	if(13==ev.keyCode){
		if(e=='L'&&mda.L.value)mda.P.focus();
		if(e=='P'&&mda.P.value){
			if(a_da.NWD.activate=='1')mda.NWD.focus();
			else mda.SB.click();
		}
		if(e=='OD')mda.NWD.focus();
		if(e=='NWD')mda.CND.focus();
		if(e=='CND')mda.SB.click();
//		if(e=='CND')mda.SBC.click();
		if(e=='Inp_Key_SKInput')mda.Btn_Ok_SKInput.click();
		if(e=='Inp_Psw')mda.Btn_OkActiv.click();
		return false;
	}
}
function tryFocus(obj){try{if(!obj.disabled){obj.focus();return true;}}catch(e){return false;}return false;}

function chs(e){var or=e.srcElement.readyState;if(or=='loaded'||or=='complete'){w.rcnt++;}}
function swm(w){o=(w)?w.mda.wm:mda.wm; o.style.visibility='visible';}
function hwm(w){o=(w)?w.mda.wm:mda.wm; o.style.visibility='hidden';}
function m(i){
	hwm();top.step=i+1;
	li=(i>3)?(i-2):1;
	li=(i>6)?4:li;
	for(var i=1;i<li;i++){
		var l='r'+i;
		oR=mda[l];
		if(oR.all.txt.className!='RO'){
			oR.all.state.src='img/loader/done.gif'
			oR.all.txt.className="";
		}else{oR.all.state.src='img/loader/done_gr.gif';}
		oR.all.wayLine.src="img/z.gif"
		oR.all.wayLine.height="1";
		oR.all.rLine.src="img/loader/vr.gif"
	}
	oR=mda['r'+li];
	if(oR.all.txt.className!='RO'){
		oR.all.state.src="img/loader/arrow.gif"
		oR.all.txt.className="act"
		oR.all.wayLine.src="img/loader/hr.gif"
		oR.all.wayLine.height="7";
		oR.all.rLine.src="img/loader/vrh.gif"
	}else{oR.all.state.src='img/loader/done_gr.gif';}
	return;
}

function updateTasks(){
	var h=i=0
	for(i=0;i<top.st[5].length;i++){
		c=top.st[5].charAt(i);o=fld['r'+(i+1)];
		o.all.txt.className=(c=='0')?"RO":((i==0)?'act':'')
		if(c=='n'){
			o.style.display='none'
			h=h+31
		}else{
			o.style.display='block'
		}
	}
	fld.dmpf.height=+h
}

function DoInfo(sJ,sH){
	if((sJ+sH)!=''){
		if(sJ!='') alert(sJ);
		mda.fMsg.style.visibility='visible';
		mda.Msg.innerHTML=(sH==null)? sJ.replace('\n','<BR/>'):sH;
	}else mda.fMsg.style.visibility='hidden';
}

function changeSafe(obj){
	if(mda.L!=null)mda.L.disabled=!obj.checked;
	mda.P.disabled=!obj.checked;
	if(a_da.NWD.activate=='1') mda.NWD.disabled=mda.CND.disabled=!obj.checked;
	if(obj.checked){
		mda.SB.style.display='';
		mda.SfB.style.display='none';
	}
	else{
		if(a_bS && a_da.NWD.activate!='1') mda.L.value='';
		mda.P.value=mda.NWD.value=mda.CND.value='';
		mda.SB.style.display='none';
		mda.SfB.style.display='';
	}
}

function doSafe(){
	if(a_bS && a_da.NWD.activate!='1') mda.L.value='';
	mda.NWD.value=mda.CND.value='';
	if(bAX){
		var oTools=new ActiveXObject('bssax.AXTools');
		if(oTools!=null){
			if(a_da.NWD.activate!='1'){
				if(a_bS){
					if(oTools.RequestLoginPassword(mda.SW.value)==true){
						mda.L.value=oTools.LoginEx;
						mda.SP.value=oTools.PasswordEx;
						mda.SB.click();
					}
				}
				else{
					var f=oTools.NewRequestForm();
					oTools.AddInputControl(f,'Pass',true,A_AX12);
					oTools.SetFormParamValue(f,105,A_AX1);
					oTools.SetFormParamValue(f,106,A_AX3);
					oTools.SetFormParamValue(f,107,A_AX4);
					oTools.SetFormParamValue(f,108,A_AX5);
					if(oTools.ShowRequestForm(f)==0){
						mda.SP.value=oTools.GetInputControlValue(f,'Pass',mda.SW.value);
						mda.SB.click();
					}
					oTools.CloseRequestForm(f);
				}
			}
			else{
				var f=oTools.NewRequestForm();
				if(top.bEmptyPass!=1)oTools.AddInputControl(f,'OPass',true,A_AX13a);
				oTools.AddInputControl(f,'NPass',true,A_AX14);
				oTools.AddInputControl(f,'CPass',true,A_AX15);
				oTools.SetFormParamValue(f,105,A_AX2);
				oTools.SetFormParamValue(f,106,A_AX3);
				oTools.SetFormParamValue(f,107,A_AX4);
				oTools.SetFormParamValue(f,108,A_AX5);
				if(oTools.ShowRequestForm(f)==0){
					if(top.bEmptyPass!=1)mda.SP.value=oTools.GetInputControlValue(f,'OPass',mda.SW.value);
					mda.SNWD.value=oTools.GetInputControlValue(f,'NPass',mda.SW.value);
					mda.SCND.value=oTools.GetInputControlValue(f,'CPass',mda.SW.value);
					mda.SB.click();
				}
			}
		}
	}
}

function checkCPL(){
	var res=null;
	if(top.cl.selectSingleNode('/R/OX')!=null){
		var oRCP=new ActiveXObject('bssax.AXRemoteCryptoProvider');
		var CrProId=top.cl.selectSingleNode('/R/OX/@ActCrProId').text;
		if(oXS==null){
			var XHR=new ActiveXObject(Top.XMLHTTP_ID);
			var URL=Top.XMLScriptPath+'?t=rt_1SignConf.GetSignCFG&SID='+top.SID+'&Regen=1&CryptoUID='+CrProId+'&tms='+Top.fnRnd();
			XHR.open("GET",URL,false);
			XHR.send('');
			if(XHR.readyState==4){
				oXS=new ActiveXObject(top.XMLDOM_ID);
				oXS.async=false;
				oXS.validateOnParse=false;
				oXS.resolveExternals=false;
				oXS.loadXML(XHR.responseXML.xml);
				var e=top.GetSTErrorFromXML(oXS,0);
				if(e!=''){
					oXS=null;
					return (res);
				}
			}
			else {
				oXS=null;
				return (res);
			}
		}
		var oN=top.cl.selectSingleNode('/R/OX');
		oRCP.XMLCryptoParamsData=oXS.xml;
		w.dlh=(top.bSSL==1)?'':document.location.hostname;
		oRCP.GetParamInfo(w.dlh,1);
		if(oRCP.ParamInfo.indexOf(oN.selectSingleNode('@PrId').text)==-1 && oRCP.GetCryptoParamValue(w.dlh,1).toUpperCase()==oN.selectSingleNode('@PrName').text.toUpperCase())
			res=oN;
		oRCP.ClearCash();
	}
	return (res);
}

function cS(o){
	if((!o)||(!l)) return;
	var f=o.getAttribute('F'), sH, oCPLNode, bCPLChecked=false;
	swm();
	switch(o.readyState){
		case 0:DoInfo(sMsg3);hwm();break;
		case 4:
			if(o.id=='MO'){
				var baseV=o.BV.split(','),baseVi,realVi;
				try{
					var oTools=new ActiveXObject('bssax.AXTools');
					if(oTools!=null){
						try{var realV=oTools.AXVersion().split('.');}catch(e){throw "cannot check AXVersion";}
						for(i in baseV){
							baseVi=parseInt(baseV[i],10);
							realVi=parseInt(realV[i],10);
							if(baseVi>realVi){throw "AXVersion is wrong";}
							else if(baseVi<realVi) break;
						}
					}
				}catch(e){
					hwm();
					sH='<DIV ID="Menu" STYLE="height: 159px; overflow: auto; text-align: justify; background-color: transparent;">';
					sH+=LRnoAX0;
					sH+=LRnoAX1;
					if(top.st[17]!='') sH+='<BR>'+LRnoAX4+'</DIV><BUTTON CLASS="stdBtn" STYLE="margin: 10 0 0 336px;" onclick="top.location.href=\''+top.st[17]+'\';">'+LRnoAXBt0+'</BUTTON>';
					mda.b3.innerHTML=sH;
					mda.b2.style.display='none';
					mda.b3.style.display='block';
					return false;
				}
			}

			if(!f) break;
			hwm();
			o.setAttribute('F',0);
			top.Rc++;
			try{
				if(o.id=='MyObj_8x'){
					oCPLNode=checkCPL();
					bCPLChecked=true;
					if(oCPLNode!=null)
						throw "CPL is not installed";
					else
						top.RcGood++;
				}else{
					v=o.object.version;
					if(v!=o.getAttribute('RV')){}
					top.RcGood++;
				}
			}catch(e){
				if(o.id=='MO' || bAuth){
					sH='<DIV ID="Menu" STYLE="height: 159px; overflow: auto; text-align: justify; background-color: transparent;">';
					if(o.id=='MO') sH+=LRnoAX0;
					else sH+=LRnoAX3;
					if(bAuth){
						sH+=LRnoAX1;
						if(top.st[17]!='') sH+='<BR>'+LRnoAX4+'</DIV><BUTTON CLASS="stdBtn" STYLE="margin: 10 0 0 336px;" onclick="top.location.href=\''+top.st[17]+'\';">'+LRnoAXBt0+'</BUTTON>';
					}
					else if(o.id=='MO') sH+=LRnoAX2+'</DIV><BUTTON CLASS="stdBtn" STYLE="margin: 10 0 0 336px;" onclick="top.bAX=0; top.mda.b3.innerHTML=\'\'; top.n(top.step);">'+LRnoAXBt0+'</BUTTON>';
					mda.b3.innerHTML=sH;
					mda.b2.style.display='none'
					mda.b3.style.display='block';
					if(o.id=='MO' && !bAuth) with(mda.Menu.style){
						padding='0 5px';
						border='1px solid';
					}
				}
			}
	}
	if(top.Rc==top.Oc){
		if(top.Rc==top.RcGood){
			if(o.id=='MO') bAX=1;
			else {
				bPKI=1;
				if(bAX==1 && !bCPLChecked){
					try{
						oCPLNode=checkCPL();
						if(oCPLNode!=null){
							a=mh.document.createElement('<OBJECT id="'+oCPLNode.attributes.getNamedItem('i').nodeValue+'" F="'+oCPLNode.attributes.getNamedItem('f').nodeValue+'" CLASSID="clsid:'+oCPLNode.attributes.getNamedItem('c').nodeValue+'" onreadystatechange="if(this.readyState==4 && typeof(top.cS)==\'function\') top.cS(this);" RV="'+oCPLNode.attributes.getNamedItem('r').nodeValue+'" CODEBASE="'+oCPLNode.attributes.getNamedItem('cb').nodeValue+'">')
							r=mda.b2.all.o0.insertAdjacentElement('beforeEnd',a);
							top.Oc++;
						}
					}catch(e){}
				}
			}
		}
		if((top.Rc==top.RcGood && (oCPLNode==null)) || (o.id!='MO' && !bAuth && (oCPLNode==null || bCPLChecked))) top.n(top.step);
	}
}

function cobj(oX,o){
	var oN=oX.selectNodes('/R/O'),i,a,r;
	top.Rc=0;
	top.RcGood=0;
	window.Oc=oN.length;
	o.all.l01.innerText=oX.documentElement.attributes.getNamedItem('L1').nodeValue
	o.all.l1.innerText=oX.documentElement.attributes.getNamedItem('L2').nodeValue
	o.all.l0.innerText=oX.documentElement.attributes.getNamedItem('L3').nodeValue
	for (i=0;i<window.Oc;i++){
		N=oN.item(i)
		a=mh.document.createElement('<OBJECT id="'+N.attributes.getNamedItem('i').nodeValue+'" F="'+N.attributes.getNamedItem('f').nodeValue+'" CLASSID="clsid:'+N.attributes.getNamedItem('c').nodeValue+'" onreadystatechange="if(this.readyState==4 && typeof(top.cS)==\'function\') top.cS(this);" RV="'+N.attributes.getNamedItem('r').nodeValue+'" CODEBASE="'+N.attributes.getNamedItem('cb').nodeValue+'#version='+N.attributes.getNamedItem('v').nodeValue+'" BV="'+N.attributes.getNamedItem('v').nodeValue+'">')
		r=o.all.o0.insertAdjacentElement('beforeEnd',a);
	}
	return r;
}

///=======
function add_M(s){
	if(typeof(w.sA[s])!='undefined'){
		if(fld.module!=null){
			w.scnt++;
			c=(100/w.rso)*w.scnt
			for(i=1;i<=15;i++){
				b=(((100/15)*i)<=c)?'black':'';
				o=fld.pb.rows(0).cells(i-1);
				if(o.style.backgroundColor=='')o.style.backgroundColor=b;
			}
		}
		w.sA[s]=1;
	}
}
function cJe(){
	var e='';
	for (s in w.sA){if(w.sA[s]==0)e+=s+'\n'}
	if(e!=''){DoInfo('Error loading core component(s):\n'+e);return false}
	else return true
}
function wchk(){
	if((w.rso==w.scnt)&&(w.rso==w.rcnt)){clearInterval(GlobRds);GlobRds=null;l=true;n(w.toS);}
	else{if(TW>300){clearInterval(GlobRds);GlobRds=null;clearInterval(GlobTW);GlobTW=null;cJe()}}
}
function loadJS(f,b){
	var i,j=0;w.rso=0;w.rcnt=w.scnt=0;w.toS=f;mda=top.frames(3).document.all;
	if(!b){
		w.sA={'c_common':0,'c_xml':0,'c_misc':0,'c_checks':0,'c_toolbar':0,'c_form':0,'c_scroller':0,'c_errors':0,'c_help':0,'c_calendar':0},hd=w.d.getElementsByTagName('HEAD')(0);
		w.sA['locres_'+LanguageID.toLowerCase()]=0;
		if(sAAdds)for (an in sAAdds){w.sA[an]=0;}
	}
	mda.module.innerHTML='';
	mda.load.innerText=w.st[7]
	mda.b1.style.display="block";mda.b2.style.display=mda.b3.style.display=mda.b4.style.display="none";
	j=mda.pbr.cells.length;
	for(i=0;i<j;i++){mda.pbr.deleteCell();}
	for(i=0;i<15;i++){o=mda.pbr.insertCell();o.innerHTML='&#160;';}
	for(si in sA){
		if(sA[si]==0){
			w.rso++;
			s=d.createElement('SCRIPT');
			s.id=si;
			s.attachEvent('onreadystatechange',chs);
			s.src=(sJSP+si+".js").toLowerCase();
			hd.appendChild(s);
		}
	}
	TW=0;
	GlobTW=setInterval("TW++",1000)
	GlobRds=setInterval("wchk()",500)
}
///=======

function AddTopParams(o){
	var oN=o.selectSingleNode('//PARAMS');
	for(var i=0;i<oN.childNodes.length;i++){
		var oC=oN.childNodes.item(i);
		var s=oC.nodeName;
		top[s]=oC.text;
	}
	bFirstLoadTB=true;
}

function WinOnLoad(){
	var j=0;fl=top.frames(3).window;fld=fl.document.all;fl.da=fld;
	fld.COLORCSS.href='css/'+top.csName+'.css';
	updateTasks()
	with(fld){
		b2.style.display="block";l4.innerText=w.st[1];l6.innerText=w.st[3];l6.href='mailto:'+w.st[3];
		l7.innerHTML=w.st[4];l3.innerText=w.st[0];b0.innerText=w.st[8];lw.innerText=w.st[9];lu.innerText=w.st[10];lx.innerText=w.st[11];
		ly.innerText=w.st[12];lz.innerText=w.st[13];lc.innerText=w.st[14];lb.innerText=w.st[15];la.innerText=w.st[16];
		ln1.innerText=w.st[18]
		ln2.innerText=w.st[19]
		ln3.innerText=w.st[20]
		ln4.innerText=w.st[21]
	}
	if(top.TParams)AddTopParams(top.TParams)
	loadJS(1);
	top.bAuth=(top.st[5].charAt(3)==1 || top.st[5].charAt(3)==3)?1:0;
	top.bAuthX=(top.st[5].charAt(3)==2 || top.st[5].charAt(3)==3)?1:0;
	oR=fld.lngsl.insertRow()
	for (l in lngs){
		oC=oR.insertCell()
		oC.style.verticalAlign="bottom"
		oC.innerHTML='<LI><SPAN onmouseOver="top.Hilite(window)" onmouseOut="top.Restore(window)" class="lnk" onclick="top.location.href=\'s/bsi.dll?t=RT_1loader.load&L='+l+'\'">'+lngs[l]+'</SPAN></LI>';
	}
	fld.lngsl.style.display='inline'

}

function setValToNode(sN,oN,sV){
	oN2=oN.ownerDocument.createNode(1,sN,'');
	oN2.text=Top.XMLhexEncode((sV!=null)?sV:mda[sN].value);
	oN.appendChild(oN2);
}

function n_ol(i){
	switch(i){
		case 2:
			if(top.MyTools.readyState!=4)return;
			clearInterval(top.chol);
			top.MyTools.object.CryptMode=top.CrMd;
			top.MyTools.object.LocResFile='../toc/ax_res_'+top.LanguageID.toLowerCase()+'.xml';
			top.MyTools.object.Language=top.LanguageID;
			top.MyTools.object.DialogsXMLConfig='../toc/ax_color_'+top.csName+'.xml';
			top.MyTools.object.DialogsXMLConfig='../toc/BSVK_color_'+top.csName+'.xml';
			break;
		case 3:
			clearInterval(top.chol);
			cobj(top.cl,mda.b2);
			break;
		case 5:
			if(top.MyCrypto.readyState!=4)return;
			clearInterval(top.chol);
			p_l();
			break;
	}
}

function n(i,h){
	var u='s/bsi.dll?t=';
	i=(i)?i:0;
	mda.b4.style.display=mda.b1.style.display="none";
	if(!h)m(i);
	if(i>3)mda.b0.style.display='none'
	switch(i){
		case 1:
			if(!cJe())return
			initCal()
			AsignFrameAliases(w);mh.Top=w;
			mda.b2.style.display='block'
			cobj(top.obj,mda.b2).version=3;
		break;
		case 2:
			a_bS=(top.chsc==1);
			if(bAX){
				var z=top.document.createElement('<OBJECT id="MyTools" CLASSID="CLSID:34E60EF0-8825-4AD8-ABED-ADC2F358F2C9">');
				top.document.getElementsByTagName('HEAD')(0).insertAdjacentElement('afterBegin',z);
				top.chol=setInterval('top.n_ol(2)',50);
			}
			if(top.lg){
				mda.b2.style.display='none'
				mda.b3.insertAdjacentHTML('afterBegin',top.lg.documentElement.xml)
				if(top.bEmptyPass!=1) mda.b3.style.display='block';
				top.a_s(top.mh,top.chsc);
				if(top.bEmptyPass==1) top.SF(window,top.chsc);
			}else {n(3);return}
		break;
		case 3:
			a_l(w);
			IsSessionOpen=true,URLdllSid=DllName+'?sid='+SID+"&t=",Tclss=EntryBll+".CloseSess",clssURL=URLdllSid+Tclss;
			MFonload();
			if(top.cl){
				mda.b2.all.l01.innerText=mda.b2.all.l1.innerText=mda.b2.all.l0.innerText='';
				mda.b2.style.display='block'
				mda.b3.style.display='none';
				if(bAX){
//					var z=top.document.createElement('<OBJECT id="MyTools" CLASSID="CLSID:34E60EF0-8825-4AD8-ABED-ADC2F358F2C9">');
//					top.document.getElementsByTagName('HEAD')(0).insertAdjacentElement('afterBegin',z);
					top.chol=setInterval('top.n_ol(3)',50);
				}
				else
					top.n(top.step);
			}
		break;
		case 4:
			mda.lngsl.style.visibility='hidden'
			mda.b3.innerHTML='';
			mda.b3.style.display='block'
			mda.b2.style.display='none'
			if(!top.lg){
				SF(w,4);
				if(!w.checkedUser){
					mda.b3.innerHTML=A_A0;
					break;
				}
			}
			if(top.Tls){
				top.st[5]='0nnn1'
				updateTasks()
				setTimeout('top.n(8)',100)
			}
			else if(top.oXMLorgs){
				mda.b3.innerHTML=top.oXMLorgs.selectSingleNode('/R/H').firstChild.xml;
				generateSELECTfromXMLobject(fl);
			}
			else setTimeout('top.n(5)',100)
		break;
		case 5:
			mda.b2.style.display='none'
			if(top.Fil){
				mda.b3.innerHTML=top.Fil.selectSingleNode('/R/H').firstChild.xml;
				fld.BTN1.focus()
			}else setTimeout('top.n(6)',100)
			mda.b3.style.display='block'
		break;
		case 6:
			if(typeof(top.PK)!='undefined' && gotPKI){
				mda.b3.innerHTML=top.PK.selectSingleNode('/R/TABLE').xml;
				var z='<OBJECT id="MyCrypto" CLASSID="clsid:47A89441-43B5-423B-88D4-B7D24FD633F6">'+((top.bDemo)?'<PARAM NAME="Demo" VALUE="TRUE"></PARAM>':'')+'</OBJECT>'+
				      '<OBJECT id="MyImport" classid="CLSID:9B60CB8F-ED51-4A1E-B940-671E3AEF44FC"></OBJECT>';
				top.document.getElementsByTagName('HEAD')(0).insertAdjacentHTML('afterBegin',z);
				top.chol=setInterval('top.n_ol(5)',50)
			}
			else if(top.bAuthX) setTimeout('top.n(7)',100);
			else setTimeout('top.n(8)',100);
		break;
		case 7:
			if(top.SKI && top.SKI.selectSingleNode('/R/TABLE')){
				mda.b3.innerHTML=top.SKI.selectSingleNode('/R/TABLE').xml;
				try{if(mda.Btn_Cancel_SKCheck) mda.Btn_Cancel_SKCheck.focus();}catch(e){}
				try{
					if(mda.Inp_ViewBlock.value=='SKSets'){
						mda.SKInput.style.display='none';
						mda.SKCheck.style.display='none';
						mda.SMSInput.style.display='none'; 
						mda.SKSets.style.display='block';
						mda.Inp_Psw.focus();
					}
					else if(mda.Inp_ViewBlock.value=='SKInput'){
						mda.SKCheck.style.display='none'; 
						mda.SKInput.style.display='block';
						mda.SMSInput.style.display='none';
						mda.SKSets.style.display='none';
						mda.Inp_Key_SKInput.focus();
					}	
					else if(mda.Inp_ViewBlock.value=='SKCheck'){
						mda.SKCheck.style.display='block'; 
						mda.SKInput.style.display='none';
						mda.SMSInput.style.display='none';
						mda.SKSets.style.display='none';
						mda.Inp_Key_SKCheck.focus();
					}
					else if(mda.Inp_ViewBlock.value=='SMSInput'){
						mda.SKInput.style.display='none';
						mda.SKCheck.style.display='none';
						mda.SMSInput.style.display='block'; 
						mda.SKSets.style.display='none';
						mda.Btn_GET_SMS.focus();						
					}
				}catch(e){}
			}
			else setTimeout('top.n(8)',100)
		break;
		case 8:
			if(bPKI==1){
				top.DO=0;
				if(top.ReloadSignConf(top.frames(top.ccSITE+'_MAINW'),null,null,'1')==0){
					var sEh,sEj;
					sEh=GetSTErrorFromXML(Top.SignConf,false);
					sEj=GetSTErrorFromXML(Top.SignConf,true);
					if((sEj!='')||(sEh!='')){
						DoInfo(sEj,sEh);
						bHideInfo=false;
						return false;
					}
				}
				if(top.Tls){
					mda.b3.innerHTML=top.Tls.selectSingleNode('/R/H').firstChild.xml;
					mda.SC.loadXML(top.SignConf.xml);
					return
				}
//?				//if(top.SignConf.selectSingleNode('/Signs/@NOS').text=='' || top.SignConf.selectSingleNode('/Signs/@NOS').text=='0') bPKI=0;
			}

			da=document.all;
			sBURL='../s/bsi.dll?sid='+top.SID+'&L='+top.LanguageID+'&t=RT_2IC.';
			var oN=top.mw_cont.selectSingleNode('//Win/m');
			var s=top.mw_wlc=oN.firstChild.nodeValue;
			oN=top.mw_cont.selectSingleNode('//Win/n');
			if(oN) s=top.mw_news=oN.firstChild.nodeValue;
			var oC=top.mw_cont.selectSingleNode('//Win/c');
			if(oC) s=top.mw_crypt=oC.firstChild.nodeValue;
			if(!bAX||!bPKI||(!oN&&!oC)){
				da.FN.noResize=false;
				da.FT.rows=FTrows;
				da.FG.cols=FGcols;
			}else{
				if(s!=''){
					da.FT.rows=FTrows;
					da.FG.frameSpacing=1;
					da.FS.src="../null.htm";
				}
			}

			var XHR=new ActiveXObject(Top.XMLHTTP_ID);
			var URL=Top.XMLScriptPath+'?sid='+top.SID+'&t=rt_1Loader.Load&step=10&bPKI='+bPKI+'&tms='+Top.fnRnd();
			XHR.open("GET",URL,false);
			XHR.send('');
			top.tb.location.replace(sBURL+"FRAME_TOOLBAR&tms="+Top.fnRnd());
			top.nv.location.replace(sBURL+"FRAME_NVGT"+"&bAX="+bAX+"&bPKI="+bPKI+NVGTAdd+'&tms='+Top.fnRnd());
			top.mw.location.replace(s);
			canGetCNT=true;
		break;
	}
	if(bHideInfo) mda.fMsg.style.visibility='hidden';
}

function cErr(oX){
	var s='';
	if(oX.xml=='') s='#M:'+A_LR3+A_LR4;
	else{
		s=CheckXML4ParseError(oX);
		if(s!='')alert(A_LR3+A_LR5+s+').');
		else{s=GetTextFromXMLTag('E',oX);if(s=='')s=GetTextFromXMLTag('DIV[@ID="ErrTxt"]',oX);}
	}
	return s;
}
function xC(sN, sN2, o){
	window[sN]=GetSimpleXML_1251(sN2)
	window[sN].documentElement.parentNode.replaceChild(o.cloneNode(true),window[sN].documentElement);
}
function stPKI(oE){
	fld.SDATA=oE.selectSingleNode('DTA').text;
	xC('SC','SIGNS',oE.selectSingleNode('SC').firstChild)
	gotPKI=true;
}

function c_RST(w,s,oX){
	if(s=='Tan'){
		top.hwm();
		try{
			mda.Btn_Ok_SKInput.disabled=mda.Btn_Cancel_SKInput.disabled=mda.Btn_OkActiv.disabled=mda.Btn_Cancel_SKSets.disabled=false;
			mda.Btn_OkSMS.disabled=mda.Btn_CancelSMS.disabled=false;
		}catch(e){}
		var s=cErr(oX);
		if(s!=''){
			if(s.indexOf('#E:')>-1){
				w.iE=s.slice(s.indexOf(':')+1);
				if(",-1,1,2,3,21,".indexOf(','+w.iE+',')>-1) alert(SK_LR0);
				else if(",101,102,103,110,121,".indexOf(','+w.iE+',')>-1) alert(SK_LR10);
				else if(",100,30,130,".indexOf(','+w.iE+',')>-1){
					var rPN, rTS, cSet;
					try{
						rPN=oX.selectSingleNode('/R/PN').text;
						rTS=oX.selectSingleNode('/R/TS').text;
					}catch(e){}
					opt=mda.selectSetID_SKSets.options;
					if(opt.item(opt.selectedIndex).value!=rTS){
						if(w.iE=='30') alert(SK_LR30+rTS+'\n'+SK_LR30x+rPN);
						if(w.iE=='130') alert(SK_LR30+rTS);
					}
					
					try{
						mda.PSW_NO_SKInput.innerText=mda.Inp_KeyNum_SKInput.value=rPN;
						mda.TANSetID.innerText=mda.Inp_SetID_SKInput.value=rTS;
					}catch(e){}
					mda.SKInput.style.display='block';
					mda.SKCheck.style.display='none'; 
					mda.SMSInput.style.display='none';
					mda.SKSets.style.display='none';
					if(mda.Inp_Key_SKInput) mda.Inp_Key_SKInput.focus();
				}
				else alert(SK_LR0);
			}
		}
		else{
			bAuthXNotPassed=(oX.selectSingleNode('/R/NA').text=='1');
			top.mw_cont=oX;
			n(8,true);
		}
		return;
	}
	if(oE=oX.selectSingleNode('/R/PARAMS')){AddTopParams(oE)}
	if(oE=oX.selectSingleNode('/R/PKI')){
		stPKI(oE);
		n(6);
	}
	else if(oE=oX.selectSingleNode('/R/R[@id="F"]')){
		xC('Fil','R',oE);
		top.st[5]=top.st[5].slice(0,2)+'1'+top.st[5].slice(3)
		updateTasks();
		n(5);
	}
	else if(top.bAuthX){
		top.mw_cont=oX;
		var oE=oX.selectSingleNode('/R/R[@id="SKI"]');
		if(oE) xC('SKI','R',oE);
		n(7);
	}
	else{
		top.mw_cont=oX;
		n(8);
	}
}
function setCHP(){
	mda.b3.style.display=mda.b4.style.display='none';
	mda.b4.innerHTML=top.CHP;
	mda.b4.style.display='block';
	setTimeout('top.mda.OD.focus()',100)
}
function stopTO(){
	top.hwm();
	a_da.fUnsafe.disabled=a_da.SfB.disabled=a_da.SB.disabled=false;
	changeSafe(a_da.fUnsafe);
	if(a_bS){
		if(w.iE!=4){if(iAuthType!=1) a_da.L.value=''; if(!tryFocus(a_da.L))tryFocus(a_da.P);}
		else tryFocus(a_da.P);
	}
	else if(top.bEmptyPass!=1) tryFocus(a_da.P);
}
function a_RST(w,sA,oX,args){
	top.hwm();
	bATO=true;
	if(sA=='User'){
		if(oX.selectSingleNode('/R').text=='0'){
			w.checkedUser=false;
			alert(A_A0);
		}
		else w.checkedUser=true;
		return;
	}
	var oE,t,s=cErr(oX),i,bj=false,PassMinL='';
	if(s!=''){
		if(s.indexOf('#E:')>-1){
			w.iE=s.slice(s.indexOf(':')+1);
			if(",3,9,10,11,".indexOf(','+w.iE+',')>-1) alert(A_LR8+eval('A_A'+w.iE)+').');
			else if(",201,203,".indexOf(','+w.iE+',')>-1) alert(A_A201+'.');
			else if(",202,204,206,".indexOf(','+w.iE+',')>-1) alert(eval('A_A'+w.iE)+'.');
			else if(",205,".indexOf(','+w.iE+',')>-1) {PassMinL=CheckXML4ParseError(oX); PassMinL=GetTextFromXMLTag('L',oX); alert(A_A205.replace('%s',PassMinL)+'.');}
			else if(",211,212,213,214,".indexOf(','+w.iE+',')>-1) alert(A_A211+'.');
			else if(",21,22,23,".indexOf(','+w.iE+',')>-1){
				passExp=true;
				alert(A_A12);
				a_da.ChPd.style.display='';
				//a_da.CrPd.style.display='none';
				if(top.bEmptyPass==1)a_da.CrPd.style.visibility='hidden';
				a_da.CrPdLb.style.display='none';
				a_da.OdPdLb.style.display='';
				if(a_da.L){
					a_da.CrLg.style.display='none';
					//a_da.LgPdLb.style.visibility='hidden';
					a_da.LgPdLb.style.display='none';
					a_da.L.disabled=true;
				}
				a_da.P.disabled=true;
				a_da.NWD.activate='1';
				changeSafe(mda.fUnsafe);
				//a_da.NWD.disabled=a_da.CND.disabled=false;
				if(a_da.lnkTD) a_da.lnkTD.style.visibility="hidden";
			}
			else if(w.iE==90) alert(A_A90);
			else if(w.iE==6){
				if(bATO){top.swm(); w.setTimeout("top.SF(window,top.chsc);", parseInt(top.ATO,10)*1000); bATO=false; return;}
			}
			else if(",2,5,8,".indexOf(','+w.iE+',')>-1){
				if(bATO){top.swm(); w.setTimeout("alert(A_A0); stopTO();", parseInt(top.ATO,10)*1000); bATO=false; return;}
			}
			else if(iAuthType==1 || w.iE==103) alert(A_A0);
			else{
				s=eval('A_A'+w.iE);
				if(w.iE==4){oE=oX.selectSingleNode('/R/A');if(oE)s+=(3-parseInt(oE.text))+A_A42}
				alert(s);
			}
			if(!passExp) a_da.SP.value='';
		}else
			if(s.indexOf('#E2:')>-1){
				s=s.slice(s.indexOf(':')+1);
				if(s==11) alert(A_LR10+A_LR11);
				else alert(A_LR10);
			}
			else {
				if (s.indexOf('#M:')>-1){
					s=s.slice(s.indexOf(':')+1);
					alert(s.replace('[BR]','\n'));
				}
				else
					alert(A_LR6+'\n'+s.replace('[BR]','\n')+').');
			}
	}else{
		if(sA=='Login'){
		  top.VisibleTemplateXML=new ActiveXObject(top.XMLDOM_ID);
		  top.VisibleTemplateXML=oX.selectSingleNode('/R/VT');
		}  
		if(oE=oX.selectSingleNode('/R/TABLE[@id="CHP"]')){top.CHP=oE.xml;setCHP();return}
		oE=oX.selectSingleNode('/R/S');
		if(oE){
			if(oE.text=='')alert(A_LR6+A_LR7);
			else{
				window.SID=oE.text;
				top.LanguageID=GetTextFromXMLTag('L',oX);
				if(oE=oX.selectSingleNode('/R/R[@id="C"]')){
					xC('cl','R',oE)
					bl=false;
				}
				if(oE=oX.selectSingleNode('/R/PARAMS')){AddTopParams(oE)}
				if(oE=oX.selectSingleNode('/R/Win')){top.mw_cont=oE}
				if(oE=oX.selectSingleNode('/R/R[@id="Tls"]')){
					xC('Tls','R',oE);
					w.sA['pkiauth']=0;
					bj=true;
					a=oE.selectSingleNode('LR').attributes;
					for (i=0;i<a.length;i++){top['t_'+a.item(i).nodeName]=a.item(i).nodeValue;}
				}
				if(oE=oX.selectSingleNode('/R/R[@id="P"]')){
					xC('PK','R',oE);
					w.sA['pkiauth']=0;
					a=oE.selectSingleNode('LR').attributes;
					for (i=0;i<a.length;i++){top['p_'+a.item(i).nodeName]=a.item(i).nodeValue;}
					bj=true;
					if(oE=oX.selectSingleNode('/R/PKI')) stPKI(oE);
				}
				if(oE=oX.selectSingleNode('/R/R[@id="SKI"]')){
					xC('SKI','R',oE);
				}
				if(oE=oX.selectSingleNode('/R/R[@id="O"]')){
					xC('oXMLorgs','R',oE);
					top.st[5]=top.st[5].slice(0,1)+'1'+top.st[5].slice(2)
					w.sA['select_customer']=0;
					bj=true;
				}
				if(oE=oX.selectSingleNode('/R/R[@id="F"]')){xC('Fil','R',oE);top.st[5]=top.st[5].slice(0,2)+'1'+top.st[5].slice(3)}
				updateTasks();
				(bj)?loadJS(3,1):n(3);
				return;
			}
		}
		a_t=GetTextFromXMLTag('T',oX);
		if(a_t==''){SID=0;alert(A_LR6+A_LR9);}
	}
	if(SID){n(3)}
	else{
		a_da.fUnsafe.disabled=a_da.SfB.disabled=a_da.SB.disabled=false;
		changeSafe(a_da.fUnsafe);
		if(passExp){
			mda.b3.style.display='block';
			//try{a_da.NWD.focus();}catch(e){}
			tryFocus(a_da.P);
			return false;
		}
		a_da.wm.style.visibility='hidden'
		if(iAuthType!=1) a_da.P.value='';
		if(sA=='CHP'){
			a_da.SBC.disabled=a_da.SBA.disabled=false;
			a_da.OD.value=a_da.NWD.value=a_da.CND.value='';
			a_da.OD.focus()
		}
		else{
			if(a_bS){
				if(w.iE!=4){if(iAuthType!=1) a_da.L.value=''; tryFocus(a_da.L);}
				else tryFocus(a_da.P);
			}
			else if(top.bEmptyPass!=1) tryFocus(a_da.P);
		}
	}
}

function fillAD(oN){
	var r=false;
	try{
		if(top.sADPswID!=''){
			var oTools=new ActiveXObject('bssax.AXTools');
			if(oTools!=null){
				setValToNode('ADPswID',oN,top.sADPswID);
				setValToNode('AD',oN,oTools.AuthorizeDataEx(top.sADPsw));
				top.sADPswID=top.sADPsw="";
				r=true;
			}
		}
	}catch(e){}
	return(r);
}
function SF(w,i){
	i=parseInt(i,10);
	DoInfo('','');
	var oX=GetSimpleXML_1251('R'),oN=oX.documentElement,oN2,oX2;
	SendXMLSwitch='PrivateXML';

	switch(i){
		case -1:
			if(top.CHP)setCHP()
			else{
				top.swm();
				a_da.SfB.disabled=a_da.SB.disabled=true;
				SendXML('resumerXH',window,'CHP',oX,"t="+top.LoaderBll+".Load&Step=6&F=1&RTSID="+top.sRTSID+"&L="+top.LanguageID);
			}
		break;
		case 3:
			sOP=mda.OD.value;sNP=mda.NWD.value;sNC=mda.CND.value;
			/*if(sOP.length<6){DoInfo(A_LR2,GetErrMessage('0|1=0:'+A_LR2));mda.OD.focus();return;}
			if(((sNP.length<6)&&(sNP.length>0))||((sNC.length<6)&&(sNC.length>0))){
				DoInfo('',GetErrMessage('0|1=0:'+A_LR12));mda.NWD.focus();return;
			}*/
			setValToNode('OD',oN);setValToNode('NWD',oN);setValToNode('CND',oN)
			top.swm();
			mda.SBC.disabled=mda.SBA.disabled=true;
			SendXML('resumerXH',window,'CHP',oX,"t="+top.LoaderBll+".Load&Step=6&RTSID="+top.sRTSID+"&L="+top.LanguageID);
		break;
		case 1:;case 0:;case 2:
			top.swm();

			var XHR=new ActiveXObject(Top.XMLHTTP_ID);
			XHR.open("GET",top.XMLScriptPath+'?t=rt_1Loader.getAD&RTSID='+top.sRTSID+'&tms='+Top.fnRnd(),false);
			XHR.send('');
			if(XHR.readyState==4){}

			oX2=new ActiveXObject(top.XMLDOM_ID);
			oX2.async=false;
			oX2.validateOnParse=false;
			oX2.resolveExternals=false;
			oX2.loadXML(XHR.responseXML.xml);
//			oX2.load(top.XMLScriptPath+'?t=rt_1Loader.getAD&RTSID='+top.sRTSID+'&tms='+Top.fnRnd());
zzz=oX2;
			var eH=top.GetSTErrorFromXML(oX2,0);
			var eJ=top.GetSTErrorFromXML(oX2,1);
			if(eH!=''||eJ!=''){
				DoInfo(eJ,eH);
				bHideInfo=false;
				top.hwm();
				return false;
			}
			top.sADPswID=oX2.selectSingleNode('/R/PID').text;
			top.sADPsw=oX2.selectSingleNode('/R/P').text;
			fillAD(oN);

			if(a_da.NWD.activate=='1'){
				if(a_bS){setValToNode('L',oN)}
				if(!mda.fUnsafe.checked){
					setValToNode('SW',oN);
					setValToNode('SP',oN);
					setValToNode('NWD',oN,mda.SNWD.value);
					setValToNode('CND',oN,mda.SCND.value);
					mda.SNWD.value='';
					mda.SCND.value='';
				}
				else {
					setValToNode('P',oN);
					setValToNode('NWD',oN);
					setValToNode('CND',oN);
				}
				a_da.fUnsafe.disabled=a_da.P.disabled=a_da.SfB.disabled=a_da.SB.disabled=true;
				if(bATO) setValToNode('ATO',oN,'1');
			}
			else {
				var sP=a_da.P.value,sL=(a_bS)?a_da.L.value:'';
				if((sL.length<6)&&(a_bS)){alert(A_LR1);if(a_da.fUnsafe.checked)a_da.L.focus();top.hwm();return;}
				if(a_bS){setValToNode('L',oN)}
				setValToNode('P',oN);a_da.P.value='';
				if(!mda.fUnsafe.checked){setValToNode('SP',oN);setValToNode('SW',oN);}
				if(bATO) setValToNode('ATO',oN,'1');
				a_da.fUnsafe.disabled=a_da.P.disabled=a_da.SfB.disabled=a_da.SB.disabled=true;
				if(a_bS)a_da.L.disabled=true;
			}
			SendXML('resumerXH',window,'Login',oX,"t="+top.LoaderBll+".Load&Step=2&RTSID="+top.sRTSID+"&L="+top.LanguageID);
		break;
		case 6:
			top.swm();
			w.BTN1.disabled=true;
			setValToNode('NBF',oN,((w.NBF.checked)?1:0))
			if(top.mw_cont)setValToNode('Win',oN,'1')
			var sF;for(var i=0;i<w.FILIAL.length;i++)if(w.FILIAL.item(i).checked)sF=w.FILIAL.item(i).value;
			SendXML('resumerXH',window,'Fil',oX,"t="+top.LoaderBll+".Load&Step=4&F="+sF+"&SID="+SID+"&L="+top.LanguageID);
		break;
		case 7:;case 8:;case 9:;case 11:;case 12:
			if(i==7 && mda.Inp_Key_SKCheck.value==''){
				alert(top.SK_LR12);
				return false;
			}	
			if(i==12 && mda.Inp_Key_SKInput.value==''){
				alert(top.SK_LR12);
				return false;
			}
			if(i==11 && mda.Inp_SMS.value==''){
				alert(top.SK_LR12);
				return false;
			}			
			if(i==9){
				opt=mda.selectSetID_SKSets.options;
				if(opt.item(opt.selectedIndex).value=='' || mda.Inp_Psw.value==''){
					alert(top.SK_LR11);
					return false;
				}
			}	
			top.swm();
			try{
				w.Btn_Ok_SKInput.disabled=w.Btn_Cancel_SKInput.disabled=w.Btn_Cancel.disabled=w.Btn_OkActiv.disabled=w.Btn_CancelActiv.disabled=true;
				w.Btn_OkSMS.disabled=w.Btn_CancelSMS.disabled=true;
				w.Btn_Ok_SKCheck.disabled=w.Btn_Cancel_SKCheck.disabled=true;
			}catch(e){}
			if(i==7){
				setValToNode('Inp_Key_SKCheck',oN);
				setValToNode('Inp_KeyNum_SKCheck',oN);
				setValToNode('Inp_SetID_SKCheck',oN);
			}
			if(i==12){
				setValToNode('Inp_Key_SKInput',oN);
				setValToNode('Inp_KeyNum_SKInput',oN);
				setValToNode('Inp_SetID_SKInput',oN);
			}			
			if(i==9){
				setValToNode('Set',oN,opt.item(opt.selectedIndex).value);
				setValToNode('Inp_Psw',oN);
			}
			if (i==11)
				setValToNode('Inp_SMS',oN);
			SendXML('resumerXH',window,'Tan',oX,"t="+top.LoaderBll+".Load&Step=7&B="+i+"&SID="+SID+"&L="+top.LanguageID);
		break;
	}
}

function resumerXH(w,s,oX){
	hwm();
	oXML=oX.responseXML;
	sEh=GetSTErrorFromXML(oXML,false);
	sEj=GetSTErrorFromXML(oXML,true);
	if((sEh+sEj)!=''){DoInfo(sEj,sEh);if(s=='Auth')p_enbl();return}
	try{
		top.sADPswID=oXML.selectSingleNode('/R/PID').text;
		top.sADPsw=oXML.selectSingleNode('/R/P').text;
	}catch(e){}
	switch(s){
		case 'Login':;case 'CHP':;case 'User':a_RST(w,s,oXML);break;
		case 'OrgC':; case 'Fil':; case 'Tan':c_RST(w,s,oXML);break;
		case 'Auth':p_RST(oXML);break;
	}
}
function H(s,w){
	if(top.sA['c_help']==1)Top.Help(s,w)
}

function GetSMS(){
	mda.Btn_GET_SMS.disabled = true;
  SendXMLSwitch='PrivateXML';
  var oX=GetSimpleXML_1251('R');
  SendXML('resumerXH', window, '',oX,'t='+top.LoaderBll+'.GetSMS&SID='+SID);
}

function onChangeTANSetID(){
	if(mda.Inp_ViewBlock.value!='SKCheck')
		return;
  opt=mda.selectSetID_SKCheck.options;
	mda.PSW_NO_SKCheck.innerText=opt.item(opt.selectedIndex).getAttribute("KeyNum");
	mda.Inp_KeyNum_SKCheck.value=mda.PSW_NO_SKCheck.innerText;
	mda.Inp_SetID_SKCheck.value=opt.item(opt.selectedIndex).value;
}


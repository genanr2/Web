// XML
var XMLDOM_ID = "Microsoft.XMLDOM", XMLHTTP_ID = "Microsoft.XMLHTTP";

var reHEX = new Array();
for(var i=0; i<32; i++){
  reHEX[i] = new Array();
  reHEX[i][0] = ('%' + (i<16?'0':'') + i.toString(16)).toUpperCase();
  reHEX[i][1] = new RegExp(unescape(reHEX[i][0]),"g");
}
function XMLhexDecode(s){return unescape(s);}
function XMLhexEncode(s){
  s = s.toString().replace(/\%/g,'%25').replace(/\"/g,'%22').replace(/#/g,'%23').replace(/&/g,'%26').replace(/\'/g,'%27').replace(/\+/g,'%2B').replace(/</g,'%3C').replace(/>/g,'%3E');
  for(var i=0; i<32; i++) s = s.replace(reHEX[i][1],reHEX[i][0]);
  return s;
}

function getXO(ID){
  // Получение обьекта XML по идентификатору из сессионного кеша
  var wX = window.XMLStore;
  if(wX == null){
    window.XMLStore = new Object();
    return null;
  }
  var oX = wX[ID];
  if(oX == null) return null;
  return oX;
}

function setXO(ID,obj){
  // Добавление обьекта XML по идентификатору в сессионный кеш
  var wX = window.XMLStore;
  if(wX == null) window.XMLStore = new Object();
  window.XMLStore[ID] = obj;
}

function getXOs(ID){
  // Получение сообщения из сесс. кеша по ID
  var wX = window.XMLStore;
  if(wX == null){
    window.XMLStore = new Object();
    return null;
  }
  var sX = wX['s'+ID];
  if(sX == null) return null;
  return sX;
}

function setXOs(ID,s){
  // Добавление сообщения в сесс. кеш по ID
  var wX = window.XMLStore;
  if(wX == null) window.XMLStore = new Object();
  window.XMLStore['s'+ID] = s;
}

function getXOb(ID){
  // Получение флага из сесс. кеша по ID
  var wX = window.XMLStore;
  if(wX == null){
    window.XMLStore = new Object();
    return null;
  }
  return (wX['b'+ID]);
}

function setXOb(ID,b){
  // Добавление флагая в сесс. кеш по ID
  var wX = window.XMLStore;
  if(wX == null) window.XMLStore = new Object();
  window.XMLStore['b'+ID] = b;
}

function XMLru(){
  // получение простейшего XML обьекта <X/>
  var ID = 'XMLru', oX = getXO(ID);
  if(oX != null)return oX;
  oX = GetSimpleXML_1251('X');
  setXO(ID,oX);
  return oX;
}

function GetSimpleXML_1251(sRootNodeName){
  var oXML = new ActiveXObject(XMLDOM_ID);
  oXML.validateOnParse = false;
  oXML.preserveWhiteSpace = true;
  oXML.appendChild(oXML.createProcessingInstruction('xml', ' version="1.0" encoding="windows-1251"'));
  if(sRootNodeName != null && sRootNodeName != ''){
    if(typeof(sRootNodeName) != 'string'){
      alert("Incorrect type ('" + typeof(sRootNodeName) + "') of parametr 'sRootNodeName' is passed to the function 'GetSimpleXML_1251'. Type must be 'string'.");
      return;
    }
    oXML.appendChild(oXML.createElement(sRootNodeName));
  }
  return oXML;
}  // GetSimpleXML_1251

function ProcessXMLSectionByType(objXMLcn){
  // Process text of block in dependence of it's type
  // ELEMENT - 1; ATTRIBUTE - 2; TEXT - 3; CDATA SECTION - 4; ENTITY REFERENCE - 5; ENTYTY - 6; PROCESSING INSTRUCTION - 7;
  // COMMENT - 8; DOCUMENT - 9; DOCUMENT TYPE - 10; DOCUMENT FRAGMENT - 11; DOCUMENT NOTATION - 12;
  var s = (objXMLcn.nodeValue == null)? '' : objXMLcn.nodeValue;
  //alert('nodeType :' + objXMLcn.nodeType + '\nnodeValue :' + s);
  switch (objXMLcn.nodeType) {
    case 4 : s = s.slice(1); break; // Remove first simbol from text of CDATA block
    default :;
  } // EOF switch
  return s;
}

function GetParserError(oXML,bJava){ // Get any errors from XML parser.
  if (bJava){var sHead = "Invalid XML", sn = "\n", s1 = ": ", s2 = "", s3 = "";}
  else{var sHead = "<DIV CLASS='BadXML'><DIV CLASS='BadXMLH'>Invalid XML</DIV>", sn = "", s1 = ": <SPAN CLASS='blue'>", s2 = "</SPAN><BR>", s3 = "</DIV>";}
  var oXMLPE = oXML.parseError;
  return (LRS24 + 
  sn + sHead + sn +
  sn + "Island" + s1 + oXML.id + s2 +
  sn + "Line" + s1 + oXMLPE.line + s2 +
  sn + "Character" + s1 + oXMLPE.linepos + s2 +
  sn + "Source Text" + s1 + oXMLPE.srcText + s2 +
  sn + "Error Code" + s1 + oXMLPE.errorCode + s2 +
  sn + "Description" + s1 + oXMLPE.reason + s2 +
  sn + "URL" + s1 + oXMLPE.url + s2 + ').' + s3);
}

function CheckXML4ParseError(oXML,bJava){
  // Проверяет наличие XML и наличие ошибок парсера. OK -> ''.
  var sSrcTxt = oXML.parseError.srcText;
  if (oXML == null){return LRS7;}
  if(oXML.parseError.errorCode != 0) return (((sSrcTxt!=null) && (sSrcTxt.indexOf('id=ErrTxt')+1))?GetErrLine(0,'','1','0','RTS Error:',false)+GetErrLine(1,'','11','',sSrcTxt,false):GetParserError(oXML,bJava))
  else return '';
}

function GetErrMsgFromXMLResponse(oXML,bJ){
	bJ=(!bJ || bJ!=1)?false:true;
  var Er = GetTextFromErrmsgTag(oXML), oRTS;
  if(Er!='') return Er;
  oRTS=oXML.selectSingleNode('//*[@ID="rtserror" or @ID="ErrTxt"]');
  if(oRTS == null) return '';
  return (bJ)?('0|1=0:RTS Error:\n1|11=0:'+(oRTS.text)):('0|1=0:RTS Error:\n1|11=0:'+(oRTS.xml).replace(/\r\n/,'[BR]').replace(/TEXTAREA/,'SPAN'));
}

function GetSTErrorFromXML(oXML,bJava){
  // Get err fr XML parser, if occure, or user err fr <errmsg> tag. Otherwise return ''
  var sErr = CheckXML4ParseError(oXML,bJava);
  if (sErr == '') sErr = GetErrMessage(GetErrMsgFromXMLResponse(oXML,bJava),bJava);
  return (Trim(sErr));
}

function Check_XML_On_Error(w,oXML){
  // Проверяет XML на наличие ошибок парсера, либо на наличие ноды <errmsg>, содержащей СОО
  // Есл ошибок нет, возвращает   false
  // Если ошибки есть, выводит их на экран и возвращает true (остальное содержание страницы при этом скрывается)

  var ERRtext = GetSTErrorFromXML(oXML);
  if (ERRtext == ''){
    //clearMsg(w);
    w.da.DivGlobalID.style.display = "block";
    return false;
  }else {
    placeMsg(ERRtext,w);
    w.da.DivGlobalID.style.display = "none";
    return true;
  }
}  // Check_XML_On_Error

function GetHTML_From_XML_Node(oNode){
  var str = '', oNodeCNi;
  for (i=0; i < oNode.childNodes.length; i++ ) {
    oNodeCNi = oNode.childNodes.item(i);
    str += ProcessXMLSectionByType(oNodeCNi);
  }
  str = Trim(str);
  return str;
}

function GetTextFromXMLTag(TagName,oXML){
  var sTxt = '', oN = oXML.selectSingleNode("//"+TagName);
  if (oN != null) sTxt = Trim(GetHTML_From_XML_Node(oN));
  return sTxt;
}
function GetTextFromErrmsgTag(oXML){return GetTextFromXMLTag("errmsg",oXML);}
function GetTextFromReplyTag(oXML){return GetTextFromXMLTag("reply",oXML);}


function GetxData(w){
  // Отправляет запрос на получение XML данных в island xData
  // Вызывается из скроллера, расположенного в модальном окне.
  // Если функция вернет False, то закрытия модального окна не последует
  var URL=Top.XMLScriptPath;
  URLDebugInfo(URL,w,false); // Show request string in DEBUG mode
	var XHR=new ActiveXObject(Top.XMLHTTP_ID);
	XHR.open("POST",URL,false);
	if(w.df.XACTION.value='CHK'){
		var a=new Array();a[1]=w;a[3]=w.df;
		var oXML=GetFParamsXML(w,XHR,a);
		XHR.send(oXML);
	}
	else
		XHR.send(GetFParams(w.df,true)+'&tms='+Top.fnRnd());
	if(XHR.readyState==4){
		var wxData = w.xData;
		wxData.async = false;
		wxData.preserveWhiteSpace = true;
		wxData.loadXML(XHR.responseXML.xml);

	  if(wxData.readyState == "complete"){
	    var vals = w.top.returnValue, oA, oCN, stxt;
	    if(Check_XML_On_Error(w,wxData)){return false;} // Выдаст СОО на экран в мод. окне
	    var oRoot = wxData.XMLDocument.documentElement;
	    if(oRoot.nodeName != 'DICT'){
	      placeMsg(GetErrMessage('0|2=0:'+LRS24+'Incorrect XML data.<br>The root element name is not "DICT").'),w);
	      return false;
	    }
	    // В запросе на справочные данные, RootElemrnt должен называться DICT
	    // В таком случае ожидается, что в атрибутах корневого элемента и в дочернех нодах
	    // содержится информация для подстановки  поля формы (имена атрибутов и дочерних нод
	    // должны в точности соответствовать именам полей формы)
	    var oEs = oRoot.selectNodes("./element()|attribute()"), j = oEs.length;
	    for(var i=0; i<j; i++){
	      var oE = oEs.item(i), stxt = '', oEc = oE.childNodes, l = oEc.length;
	      for(var k=0; k<l; k++) stxt += ProcessXMLSectionByType(oEc.item(k));
	      vals[oE.nodeName] = stxt;
	      //alert('oE.nodeName: ' + oE.nodeName + '\nstxt=' + stxt);
	    }
	    return true;
	  }
	}
} // GetxData


function insertXMLTag(oXML,tag,s){
  var el = oXML.selectSingleNode("//"+tag);
  if (el==null){
    var oD = oXML.selectSingleNode("//DROW");
    if(oD == null) return;
    el = oD.appendChild(oXML.createElement(tag));
    el.appendChild(oXML.createTextNode(s));
	}
  else el.text=s;
}

function ReloadSignConf(w,s,b,noCuid){
	var rv=0;
	if(!Top.SignConf)Top.SignConf=new ActiveXObject(Top.XMLDOM_ID);

	var XHR=new ActiveXObject(Top.XMLHTTP_ID);
	var URL=Top.XMLScriptPath+'?'+'t=RT_1SignConf.GetSignCFG'+((s)?('&U='+s):'')+((b)?('&B=1'):'')+((noCuid=="1")?('&noCuid=1'):'')+'&SP='+((top.DO==1)?'0':'1')+'&SCHEMENAME='+getSheme(w)+'&SID='+Top.SID+'&tms='+Top.fnRnd();
	XHR.open("GET",URL,false);
	XHR.send('');
	if(XHR.readyState==4){
	Top.SignConf.async=false;
		Top.SignConf.validateOnParse=false;
		Top.SignConf.resolveExternals=false;
		Top.SignConf.loadXML(XHR.responseXML.xml);
		top.DO=null;
		rv=1;
		var e=Top.GetSTErrorFromXML(Top.SignConf,0);
		if(e=='')e=GetErrMessage(GetTextFromXMLTag('ERROR',Top.SignConf),0);
	if (e!=''){Top.placeMsg(e,w);rv=0;}
	else {
		e=Top.SignConf.selectSingleNode('HTML/BODY/DIV[@ID="ErrTxt"]')
		if(e){Top.addMsg(e.text,w);rv=0}
	}
	}
	return rv;
}

function GetSignState(w){
	var sS='';
	if(!(sS=Top.getSheme(w)))return null;
	if(!Top.SignCache)Top.SignCache=GetSimpleXML_1251('SC');
	if(!(Top.SignCache.selectSingleNode('/SC/DOCS/D[@NAME="'+sS+'"]')))sS=''
	var oN=Top.SignCache.selectNodes('/SC/UIDS/U'),i,s='';
	if(oN)for (i=0;i<oN.length;i++){s+=oN.item(i).attributes.getNamedItem('U').nodeValue+'|'}
	return sS+'='+s;
}
function GetSConfForDoc(w){
	if(!Top.SignCache)Top.SignCache=GetSimpleXML_1251('SC');
	if(!(sS=Top.getSheme(w)))return '1';
	var oN=Top.SignCache.selectNodes('/SC/DOCS/D[@NAME="'+sS+'"]/U'),i,j,s='',oN2=null;
	if(oN.length>0){
		var SConf=GetSimpleXML_1251('Signs');
		for(i=0;i<oN.length;i++){
			var oN3=Top.SignCache.selectSingleNode('/SC/UIDS/U[text()="'+oN.item(i).text+'"]');
			if(oN3){
				oN2= SConf.appendChild(SConf.createNode(1,'Sign',''))
				for(j=0;j<oN.item(i).attributes.length;j++){oN2.attributes.setNamedItem(oN.item(i).attributes.item(j).cloneNode(true))}
				oN2.appendChild(oN3.firstChild.cloneNode(true));
			}
		}
	}
	return oN2
}

function RestoreSParams(w,oX){
	if(!(sS=Top.getSheme(w)))return null;
	var bS=1;
	if(n=oX.selectSingleNode('/DT/DOCS/@CF'))bS=(n.text=='1')?0:1
	if(bS){
		var oN=oX.selectNodes('Sign'),i,oN2,oN3,oN4,oN5,oA,oNo;
		if(!Top.SignCache)Top.SignCache=GetSimpleXML_1251('SC');
		if(!(oN5=Top.SignCache.selectSingleNode('/SC/UIDS'))){oN5=Top.SignCache.documentElement.appendChild(oX.ownerDocument.createNode(1,'UIDS',''))}
		if(!(oN2=Top.SignCache.selectSingleNode('/SC/DOCS'))){
			oN2=oX.ownerDocument.createNode(1,'DOCS','')
			Top.SignCache.documentElement.appendChild(oN2)
		}
		if(oN.length>0)if(oN3=Top.SignCache.selectSingleNode('/SC/DOCS/D[@NAME="'+sS+'"]'))oN3.parentNode.removeChild(oN3)
		if(!(oN3=Top.SignCache.selectSingleNode('/SC/DOCS/D[@NAME="'+sS+'"]'))){
			oN3=oX.ownerDocument.createNode(1,'D','')
			oA=oX.ownerDocument.createNode(2,'NAME','');
			oA.nodeValue=sS
			oN3.attributes.setNamedItem(oA)
			oN2.appendChild(oN3)
		}
		for(i=0;i<oN.length;i++){
			oNo=oN.item(i);
			oN4=oN3.appendChild(oX.ownerDocument.createNode(1,'Sign',''))
			for (j=0;j<oNo.attributes.length;j++){oN4.attributes.setNamedItem(oNo.attributes.item(j).cloneNode(true))}
			oN3.appendChild(oN4)
		}
		for(i=0;i<oN.length;i++){
			oNo=oN.item(i);
			if(!(oN4=Top.SignCache.selectSingleNode('/SC/UIDS/U[@U="'+oNo.attributes.getNamedItem('UID').nodeValue+'"]'))){
				oN4=oX.ownerDocument.createNode(1,'U','');
				oA=oX.ownerDocument.createNode(2,'U','');
				oA.nodeValue=oNo.attributes.getNamedItem('UID').nodeValue;
				oN4.attributes.setNamedItem(oA);
				oN4.appendChild(oNo.selectSingleNode('Params').cloneNode(true));
				if(oNo.selectSingleNode('CaCerts'))oN4.appendChild(oNo.selectSingleNode('CaCerts').cloneNode(true));
				if(oNo.selectSingleNode('SelfCert'))oN4.appendChild(oNo.selectSingleNode('SelfCert').cloneNode(true));
				if(oNo.selectSingleNode('AbCert'))oN4.appendChild(oNo.selectSingleNode('AbCert').cloneNode(true));
				oN5.appendChild(oN4);
			}
		}
		var oX2=oX.cloneNode(false);
		oN=Top.SignCache.selectNodes('/SC/DOCS/D[@NAME="'+sS+'"]/Sign');
		for(i=0;i<oN.length;i++){
			oN2=oN.item(i).cloneNode(true);
			oN5=Top.SignCache.selectSingleNode('/SC/UIDS/U[@U="'+oN.item(i).attributes.getNamedItem('UID').nodeValue+'"]');
			if(oN5.selectSingleNode('Params'))oN2.appendChild(oN5.selectSingleNode('Params').cloneNode(true));
			if(oN5.selectSingleNode('CaCerts'))oN2.appendChild(oN5.selectSingleNode('CaCerts').cloneNode(true));
			if(oN5.selectSingleNode('SelfCert'))oN2.appendChild(oN5.selectSingleNode('SelfCert').cloneNode(true));
			if(oN5.selectSingleNode('AbCert'))oN2.appendChild(oN5.selectSingleNode('AbCert').cloneNode(true));
			oX2.appendChild(oN2);
		}
	}else {
		oN=oX.selectNodes('Sign');
		for(i=0;i<oN.length;i++){
			if(oN2=oN.item(i).selectSingleNode('Params/CACHED')){
				oN.item(i).replaceChild(Top.SignCache.selectSingleNode('/SC/UIDS/U[@U="'+oN.item(i).attributes.getNamedItem('UID').nodeValue+'"]').firstChild.cloneNode(true),oN2.parentNode)
			}
		}
		return oX.xml
	}
	return oX2.xml;
}

add_M('c_xml')
function Transform(xslURL,xmlSTR,bJava){
	var Err;
	if(!bJava){
		var xsl = new ActiveXObject(XMLDOM_ID);
		xsl.async = false;
		xsl.validateOnParse = false;
		xsl.preserveWhiteSpace = true;
		xsl.load(xslURL);
		Err = CheckXML4ParseError(xsl);
		if(Err != '') return LRS19 + ':<BR>' + LRS7 + Err;
	}
	var xml = new ActiveXObject(XMLDOM_ID);
	xml.validateOnParse = false;
	xml.preserveWhiteSpace = true;
	xml.loadXML(xmlSTR);
	Err = CheckXML4ParseError(xml);
	if(Err != '') return LRS19 + ':<BR>' + LRS1 + Err;
	if(bJava){
		n=xml.selectNodes('/*/*');
		s='';
		for (i=0;i<n.length;i++){s+=n.item(i).text+' ';}
		return s
	}
	return xml.transformNode(xsl)
}

function ProcessErrXML(Code,XslXml,bDecode,bJava){
	var re = new RegExp("^(([^<#]*)#)*(.*)","i");
	re.exec(XslXml);
	if(RegExp.$2 == '') return RegExp.$3
	var sXML = bDecode ? unescape(RegExp.$3) : RegExp.$3;
	return Transform(XSLPath + RegExp.$2,sXML,bJava);
}  // ProcessErrXML

function processErrMessageByCodeHTML(code,message){
	switch (code){
		case 0: return ('<SPAN CLASS="ERR0">' + message + '</SPAN>');
		case 44: return message.replace(/(.+\d{8})(\d)(\d{11}.*)/,"$1<SPAN STYLE='FONT-WEIGHT: 700; COLOR: red;'>$2</SPAN>$3");
		default: return message;
	} // end switch
}  // processErrMessageByCode

function GetErrLine(level,subtype,type,code,message,bJava){
	switch (subtype){
		case 'xmlc': message = ProcessErrXML(code,message,true,bJava); break;
		case 'htmlc': message = unescape(message); break;
	} // end switch
	if(bJava){
		var res = '';
		switch (type){
		case '0':  res += message + '\n\n'; break;
		default: res += '\t' + message + '\n';
		} // end switch
		return res;
	}
	var indent = 6 + 24 * parseInt(level);
	var Top=(window.Top)?window.Top:window.top;
	var s1='<DIV CLASS="ErrMsgLine"><DIV CLASS="ErrMsgLMargin', s2='" STYLE="margin-left: ', s3='px">',
	s4='<SPAN CLASS="ErrBullet', s5='"><IMG SRC="'+Top.VerPath+'img/ico/err', s6='.gif" ALIGN=Top CLASS="ErrBulletIMG" BORDER=0 VSPACE=0 HSPACE=0></SPAN><DIV CLASS="ErrMsg">',
	s7='<DIV CLASS="ErrMsgLP">';
	switch (type){
		case '0': res = s1 + s2 + indent + s3 + '<DIV CLASS="ErrMsgH0">'; break;
		case '01': res = s1 + s2 + indent + s3 + '<DIV CLASS="ErrMsgH01">'; break;
		case '8': res = s1 + s2 + indent + s3 + s4 + type + s5 + type + s6; break;
		case '9': res = s1 + type + s2 + indent + s3 + '<DIV CLASS="ErrMsg9">&#0149;&nbsp;'; break;
		case '10':res = s1 + s2 + indent + s3 + '<DIV CLASS="ErrMsgMoreInfoSwitch" S="' + LRS17 +
			'" H="' + LRS18 + '" onclick="var x=this.parentElement.all[1].style; var h=(x.display==\'none\'); x.display=h?\'block\':\'none\'; this.innerText=h?this.H:this.S;">' +
			LRS17 + '</DIV><DIV CLASS="ErrMsgMoreInfoText" STYLE="display: none;">'; break;
		case '11': res = s1 + s2 + indent + s3 + s7; break;
		case '50': res = s1 + s2 + indent + s3 + '<DIV CLASS="ErrMsgH50">'; break;
		default:  res = s1 + s2 + indent + s3 + s4 + s5 + type + s6;
	} // end switch
	res += processErrMessageByCodeHTML(parseInt(code),message) + '</DIV></DIV></DIV>\r\n';
	return res;
}

function GetErrMessage(Erors,bJava){
	if(Erors.replace(/(^\s*)|(\s*$)/g, "") == '') return '';
	var i, result = '', Er = Erors.replace(/\r/g,'\n').replace(/\n\n/g,'\n').replace(/\[EL\]\n/gi,'0|11=0:&nbsp;\n');
	var sR = "(\\d)\\|(xmlc|htmlc|)[-]?(\\d{1,2})=(\\d+):([^\\r\\n]*)";
	var re = new RegExp(sR,'gi'), ArL = Er.match(re);
	if(ArL == null || (ArL.length == null)) return '';
	re.compile(sR,'i');
	var j = ArL.length;
	for(i=0; i<j; i++){
		var Ax = re.exec(ArL[i]);
		result += GetErrLine(Ax[1],Ax[2].toLowerCase(),Ax[3],Ax[4],Ax[5],bJava);
	}
	result=result.replace(/\[BR\]/g,(bJava?'\n':'<BR>'));
	result=result.replace(/(&apos;)/g,'\'');
	return result;
}


function UndefinedError(ErrMsg){return ('<DIV class="ErrUndefined">'+ErrMsg+'</DIV>');}

add_M('c_errors')
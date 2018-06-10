// CLDR_sDT === Текущая дата в активном календаре в виде строки
var CLDR_oDT;// === Злемент - контейнер данных (даты)
// CLDR_actDt === Активная дата (число) в активном календаре
function initCal(){
	months=Top.LRMonths.split(','), days=Top.LRWeekDay.split(',');
	monthd=new Array(".01.",".02.",".03.",".04.", ".05.", ".06.", ".07.", ".08.", ".09.",".10.", ".11.", ".12.");
	daysInMonth=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
	with(top){calTransf=winC=CLDR_oDT=CLDR_sDT=CLDR_actDt=null;}
}
function getDays(month,year){
	if (1==month) return ((0==year%4)&&(0!=(year%100)))||(0==year%400)?29:28;
	else return daysInMonth[month];
}

function getToday(){
	this.now=new Date();
	this.year=getMill(this.now);
	this.month=this.now.getMonth();
	this.day=this.now.getDate();
}

var today=new getToday();

function newCalendar(da){
	if(CLDR_sDT&&CLDR_sDT!=null&&CLDR_sDT!=''){
		if(!da.year)return
		var dt=CLDR_sDT;//надо ввести dt т.к. CLDR_sDT обнулится при смене года или месяца
		if (da.year.value!=dt.substr(6,4)) da.year.value=dt.substr(6,4);
		da.month.selectedIndex=parseInt(dt.substr(3,2),10)-1;
		CLDR_actDt=parseInt(dt.substr(0,2),10).toString();
	}
//	today=new getToday();
	var newCal=new Date(parseInt(da.year.value),da.month.selectedIndex,1);
	var day=-1,daily=0,dailynext=1;
	var lastMnthDays=checkMonth(newCal);

	if (newCal.getDay()==0) var startDay=6
	else startDay=newCal.getDay()-1;
	if ((today.year==getMill(newCal))&&(today.month==newCal.getMonth())) day=today.day;

	var tblCal=da.dayList;
	var iDaysInMnth=getDays(newCal.getMonth(),getMill(newCal));
	var xx=lastMnthDays-startDay+1;
	for (var intWeek=0; intWeek<tblCal.rows.length; intWeek++)
		for (var intDay=0; intDay<tblCal.rows[intWeek].cells.length; intDay++){
			var cell=tblCal.rows[intWeek].cells[intDay];
			// Счетчик дней
			if ((intDay==startDay)&&(0==daily)) daily=1; 

			// Вывод чисел в таблицу
			if ((daily>0)&&(daily<=iDaysInMnth)){// Выделение текущего дня.
				(day==daily)?markToday(cell):(intDay<5)?normDay(cell):redDay(cell,1);
				cell.id=(daily==CLDR_actDt)?'md':'';
				cell.innerText=daily++;
			}else{
				(intDay<5)?grayDay(cell):redDay(cell,0);
				cell.id='';
				if (daily>20) cell.innerText=dailynext++
				else cell.innerText=xx++;
			}
		}
}

function markToday(cell){with(cell.style){color="limegreen";fontWeight="bold";}}
function redDay(cell,b){with(cell.style){color=(b)?"red":"#cc9900";fontWeight="normal";}}
function normDay(cell){with(cell.style){color="black";fontWeight="normal";}}
function grayDay(cell){with(cell.style){color="gray";fontWeight="normal";}}

function getDateStr(D){return D?((D.getDate()<10?"0":"")+D.getDate()+monthd[D.getMonth()]+D.getFullYear()):'';}

function insDate(w){
	var wda=w.document.all, o=wda.md;
	//var o=w.event.srcElement;
	if (!o) CLDR_oDT.value=getDateStr(today.now);
	else{
		if ("TD"==o.tagName)
			if (o.style.color=="black"||o.style.color=="limegreen"||o.style.color=="red")
				getChange(w,0,0,0,0,0)
			else if (parseInt(o.innerText)>20) getChange(w,-1,11,-1,0,-1)
			else getChange(w,1,1,-11,1,0);
	}
	closeCalendar(w.parent);
	//w.event.cancelBubble=true;
}

function checkMonth(D){return (D.getMonth()==0)?31:getDays(D.getMonth()-1,getMill(D))}

function getMill(D){return D.getYear();}

function changeDate(w,n,mn,d,j){
	var k, da=w.document.all, dt=da.md.innerText;
	k=(mn==0)?j:((mn==11)?d:0);
	if(da.year.value=='')da.year.value=today.year;
	CLDR_oDT.value=((dt.length==1)?'0':'')+dt+monthd[da.month.selectedIndex+n]+(parseInt(da.year.value)+k);
	if(w.IsScroller) Top.checkFilter(w);
}

function getChange(w,n,nn,mm,d,j){
	var k, mn=w.document.all.month.selectedIndex;
	k=(mn==0)?nn:((mn==11)?mm:n);
	changeDate(w,k,mn,d,j)
}

function chgYear(o,act){
	if(o.value=='')o.value=today.year;
	switch (act){
		case '+': o.value=parseInt(o.value)+1;break;
		case '-': o.value=parseInt(o.value)-1;break;
	}
}

function winTransform(sXSL,sXML){
	if(typeof(sXSL)!='object'){
		var xsl=new ActiveXObject(Top.XMLDOM_ID);
		xsl.async=false;
		xsl.validateOnParse=false;
		xsl.preserveWhiteSpace=true;
		if(!xsl.load(sXSL)) {alert('Error while loading calendar.xsl\n'+ xsl.parseError.reason); return false;}
	}else xsl=sXSL;
	var xml=getLoadedXML(sXML);
	return xml.transformNode(xsl);
}

function getLeftOffset(o){i=0; while(o){i+=o.offsetLeft; o=o.offsetParent;}	return i;}
function getTopOffset(o){i=0; while(o){i+=o.offsetTop; o=o.offsetParent;} return i;}

function positionCalendar(w){
	var oT=w.event.srcElement;
	if(!oT)return;
	dY=w.document.body.clientHeight-getTopOffset(oT)-220+w.document.body.scrollTop;
	iH=getTopOffset(oT)+10+((dY<0)?dY:10);
	iW=getLeftOffset(oT)-140-((dY<0)?16:0); if(iW<0) iW=1;
}

function Calendar(obj,InpSrc){
	var w=obj.document.parentWindow, wd=w.document;
	if(w.ex||(w.inputErrorCode!=null && w.inputErrorCode!=0))return;
	w.ex=1;
	CLDR_oDT=InpSrc;
	setCurnt(InpSrc.value);
	var oC=fnGCLDR(w);
	positionCalendar(w);
	if(oC){
		with(oC.style){left=iW;top=iH;}
		if (oC.style.display!='block') wd.body.attachEvent("onclick",top.Top.Ebug);
		oC.style.display='block';
		newCalendar(wd.frames("id_Cal").document.all);
		wd.frames("id_Cal").document.body.focus();
		w.ex=0;
	}else{
		wd.body.attachEvent("onclick",top.Top.Ebug);
		oC=initCalendar(w);
		oC=fnGCLDR(w);
	}
}

function Ebug(){//Закрытие календаря при клике на другом объектке окна
	var w=CLDR_oDT.document.parentWindow
	if(w.event.srcElement.className!='ICOBTN'){
		var oA=fnGCLDR(w)
		if(oA&&oA.style.display=='block')closeCalendar(w);
	}
}

function initCalendar(w){
	var wd=w.document;//w=obj.document.parentWindow, 
	try{var WCal=wd.body.appendChild(wd.createElement("DIV"));}catch(e){return;}
	WCal.id="calendarBlock";
	with(WCal.style){
		WCal.WIDTH=width=160;
		WCal.HEIGHT=height=200;
		position="absolute";
		left=iW;
		top=iH;
		zIndex=1001; //потому что в JSelect сразу 1000
	}
	var sIframe='<IFRAME ID="id_Cal" src="'+((w.wdla)?'../':'')+'../scheme/null1.htm" '+
	'SCROLLING=no FRAMEBORDER=no MARGINWIDTH=0 MARGINHEIGHT=0 '+
	'STYLE="width:100%; height:100%; border:0;"></IFRAME>';
	calTransf=winTransform('../xsl/calendar.xsl','<X></X>');
	if(WCal==null||!calTransf)return;
	WCal.innerHTML=sIframe;
	w.setTimeout('Top.fnCalTransf(w)',50);
}

function buildTable(d){
	var s='',i,cda=d.all,oO,cO;
	oO=d.createElement('OPTION');
	for (i=0; i<months.length; i++){
		cO=oO.cloneNode(true);
		cO.text=months[i];
		if (today.month==i) cO.selected='true';
		cda.month.options.add(cO);
	}
	cda.year.innerText=today.year;

	oO=d.createElement('TH');
	for (i=0; i<days.length; i++){
		cO=oO.cloneNode(true);
		cO.innerText=days[i];
		cO.setAttribute('id','d');
		cda.days.appendChild(cO);
	}
	var oTR=d.createElement('TR'),oO=d.createElement('TD'), cTR;
	for (var iWeeks=0; iWeeks<6; iWeeks++){//по неделям в месяце
		cTR=oTR.cloneNode(true);
		for (var iDays=0; iDays<7; iDays++){//по дням в неделе
			cO=oO.cloneNode(true);
			cTR.appendChild(cO);
		}
		cda.dayList.appendChild(cTR);
	}
	cda.td.innerText=Top.LRToday;
	cda.cnl.innerText=Top.LRCnl;
}

function fnCalTransf(w){
	NO=0;
	if(!(winC=w.document.frames("id_Cal")))NO=1
	else if (!winC.document)NO=2
	else if(!(db=winC.document.body))NO=3;
	if(NO>0){w.setTimeout('Top.fnCalTransf(w)',10); return;}
	db.innerHTML=calTransf;
	buildTable(winC.document);
	try{db.focus();}catch(e){w.setTimeout('Top.fnCalTransf(w)',10); return;}
	winC.document.all.dayList.onselectstart=new Function('return false;');

	var oL=winC.document.createElement("LINK");
	oL.rel="Stylesheet";
	oL.href="../css/main.css";
	db.appendChild(oL);
	oL=winC.document.createElement("LINK");
	oL.rel="Stylesheet";
	oL.id='COLORCSS';
	var s=w.document.all("COLORCSS").href, i=s.lastIndexOf('/');
	s=s.substr(i+1);
	oL.href="../css/"+s;
	db.appendChild(oL);
	db.onkeypress=new Function('if(13==this.document.parentWindow.event.keyCode)top.insDate(this.document.parentWindow)');
	var oC=fnGCLDR(w);
	if (!oC) return;
	oC.style.display='block';
	winC.da=winC.document.all; winC.Top=winC.top.Top;
	newCalendar(winC.da);
	Top.attachHandlersToFields(null,winC);//top.
	w.ex=0;
}

function fnGCLDR(w){return w.document.getElementById('calendarBlock');}

function setCurnt(sDT){
	if ((sDT!='')&&(sDT.search(/(\d{2}).(\d{2}).(\d{4})/)!=-1))
		CLDR_sDT=sDT;
	else CLDR_sDT=getDateStr(today.now);//=null;
}

function makeCurnt(o){
	var i, j, evSrc=o.document.parentWindow.event.srcElement;
	for (i=0;i<o.childNodes.length;i++)
		for (j=0;j<o.childNodes(i).childNodes.length;j++)
			o.childNodes(i).childNodes(j).id='';
	if (evSrc.tagName=='TD'){
		evSrc.id='md';
		CLDR_actDt=evSrc.innerText;
	}
}

function closeCalendar(w,noFocus){
	if(typeof(w.wdla)=='undefined' && !noFocus) CLDR_oDT.focus();
	var oA=fnGCLDR(w)
	if(oA!=null) oA.style.display='none';
	CLDR_actDt='';
	w.document.body.detachEvent("onclick",top.Top.Ebug);
}

function ClearCalendar(InpSrc){
	var w=InpSrc.document.parentWindow;
	InpSrc.value='';
	InpSrc.blur();
	if (typeof(w.document.all.PopupMessID)=='object') w.document.all.PopupMessID.innerText='';
	top.status='';
}
add_M('c_calendar')
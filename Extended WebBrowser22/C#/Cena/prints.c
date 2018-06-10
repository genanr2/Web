//user32.lib gdi32.lib winspool.lib comdlg32.lib advapi32.lib shell32.lib ole32.lib 
//oleaut32.lib uuid.lib odbc32.lib odbccp32.lib kernel32.lib user32.lib gdi32.lib
//winspool.lib comdlg32.lib advapi32.lib shell32.lib ole32.lib oleaut32.lib uuid.lib 
//odbc32.lib odbccp32.lib 
//WIN32,,_CONSOLE,_MBCS
#include <io.h>
#include <SYS\STAT.H>
#include <stdio.h>
#include <direct.h>
#include <stdlib.h>
#include <string.h>
#include <Windows.h>
#include "calc.h"
FILE*file;
char fileName[12];
int debug=0;
char str[128];
int createDir(char*d);
void CharPrintf(char*s){CharToOem(s,s);printf("%s",s);}
int isTrue(int no,Reminders*rems)// killProcess
{
	Reminders*rr=rems;
	while(rr!=NULL)
	{
		if(rr->reminder->type==excludeType)
		{
			if(rr->reminder->gen.exludeRegs!=NULL)
			return!isInList(no,rr->reminder->gen.exludeRegs);
		}
		rr=rr->next;
	}return 1;
}
SecondSectionList*findSecondList(Regions*part,Region*cc)
{
	Regions*aa=part;Region*bb;
	while(aa!=NULL)
	{
		bb=aa->region;
		if(bb!=NULL&&bb->type==secondType){if(bb->regionNo==cc->regionNo)return bb->gen.second;}
		aa=aa->next;
	}return(SecondSectionList*)NULL;
}
ThirdSectionList*findThirdList(Regions*part,Region*cc)
{
	Regions*aa=part;Region*bb;
	while(aa!=NULL)
	{
		bb=aa->region;
		if(bb!=NULL&&bb->type==thirdType){if(bb->regionNo==cc->regionNo)return bb->gen.third;}
		aa=aa->next;
	}return(ThirdSectionList*)NULL;
}
int isInList(int f1,DigList*lines)
{
	DigList*ll=lines;while(ll!=NULL){if(ll->dig==f1)return 1;ll=ll->next;}return 0;
}
int findLineNumber(int partNo,Reminders*rem)
{
	Reminders*r=rem;
	while(r!=NULL)
	{
		Reminder*rr=r->reminder;
		if(rr->type==partType)
		{
			PartList*parts=rr->gen.parts;
			while(parts!=NULL)
			{
				Part*pp=parts->part;if(pp->partNo==partNo)return pp->lines;parts=parts->next;
			}
		}r=r->next;
	}return 0;
}
char*findXyStart(int partNo,Reminders*rem)
{
	Reminders*r=rem;
	while(r!=NULL)
	{
		Reminder*rr=r->reminder;
		if(rr->type==xyStartType)
		{
			XyStartList*list=rr->gen.xyStart;
			while(list!=NULL)
			{
				XyStart*pp=list->xy;if(pp->partNo==partNo){return pp->xy;}list=list->next;
			}
		}r=r->next;
	}return "";
}


int isDelLine(int partNo,int f1,Reminders*rem)
{
	Reminders*r=rem;
	Reminder*rr;
	while(r!=NULL)
	{
		rr=r->reminder;
		if(rr->type==delType)
		{
			DelList*delList=rr->gen.delList;
			while(delList!=NULL)
			{
				DelPart*pp=delList->del;
				if(pp->regNo==partNo)return isInList(f1,pp->lines);delList=delList->next;
			}
		}r=r->next;
	}return 0;
}
void printFirstSection(FILE*f,FirstSectionList*first,Reminders*r)
{
	FirstSectionList*aa=first;
	Reminders*rem=r;
	int i=1,j=1;
	FirstSection*bb;
	int lineNum=findLineNumber(1,r);
	while(aa!=NULL)
	{
		bb=aa->first;
		if(bb!=NULL)
		{
			while(bb->f1>i)
			{
				if(!isDelLine(1,i,rem))
				{
					if(lineNum>=j){printDebug(f,j,i);printZero(f,2);printfEmpty(i,1);}j++;
				}i++;
			}
			if(!isDelLine(1,bb->f1,rem))
			{
				if(lineNum>=j)
				{
					printDebug(f,i,bb->f1);fprintf(f,"%d\t",bb->f2);fprintf(f,"%d\n",bb->f3);
				}j++;
			}else if(debug){sprintf(str,"\tРаздел 1: удалена %d строка\n",bb->f1);CharPrintf(str);}
		}
		if(aa->next==NULL)
		{
			if(lineNum<(j-1))printfLineMore(1,j,lineNum);
			else while(lineNum>(j-1)){i++;printDebug(f,j,i);printZero(f,2);printfEmpty(i,1);j++;}
		}aa=aa->next;i++;
	}printfPartEnd(f);
}
void printSecondSection(FILE*f,SecondSectionList*second,Reminders*r)
{
	SecondSectionList*aa=second;
	SecondSection*bb;
	Reminders*rem=r;
	int i=1,j=1;
	int lineNum=findLineNumber(2,r);
	while(aa!=NULL)
	{
		bb=aa->second;
		if(bb!=NULL)
		{
			while(bb->s1>i)
			{
				if(!isDelLine(2,i,rem))
				{
					if(lineNum>=j){printDebug(f,j,i);printZero(f,6);printfEmpty(i,2);}j++;
				}i++;
			}
			if(!isDelLine(2,bb->s1,rem))
			{
				if(lineNum>=j)
				{
					printDebug(f,j,bb->s1);
					fprintf(f,"%d\t",bb->s2);fprintf(f,"%d\t",bb->s3);fprintf(f,"%d\t",bb->s4);
					fprintf(f,"%d\t",bb->s5);fprintf(f,"%d\t",bb->s6);fprintf(f,"%d\n",bb->s7);
				}
				j++;
			}else if(debug){sprintf(str,"\tРаздел 2: удалена %d строка\n",bb->s1);CharPrintf(str);}
//			}else printf("\tdeleted %d line in 2 part\n",bb->s1);
		}
		if(aa->next==NULL)
		{
			if(lineNum<(j-1))printfLineMore(2,j,lineNum);
			else while(lineNum>(j-1)){i++;printDebug(f,j,i);printZero(f,6);printfEmpty(i,2);j++;}
		}aa=aa->next;i++;
	}
	printfPartEnd(f);
}
void printThirdSection(FILE*f,ThirdSectionList*third,Reminders*r)
{
	ThirdSectionList*aa=third;ThirdSection*bb;Reminders*rem=r;
	int i=1,j=1;
	int lineNum=findLineNumber(3,r);
	while(aa!=NULL)
	{
		bb=aa->third;
		if(bb!=NULL)
		{
			while(bb->t1>i)
			{
				if(!isDelLine(3,i,rem))
					{if(lineNum>=j){printDebug(f,j,i);printZero(f,3);printfEmpty(i,3);}j++;}i++;
			}
			if(!isDelLine(3,bb->t1,rem))
			{
				if(lineNum>=j)
				{
					printDebug(f,j,bb->t1);
					fprintf(f,"%d\t",bb->t2);fprintf(f,"%d\t",bb->t3);fprintf(f,"%d\n",bb->t4);
				}j++;
			}else if(debug){sprintf(str,"\tРаздел 3: удалена %d строка\n",bb->t1);CharPrintf(str);}
		}
		if(aa->next==NULL)
		{
			if(lineNum<(j-1))printfLineMore(3,j,lineNum);
			else while(lineNum>(j-1)){i++;printDebug(f,j,i);printZero(f,3);printfEmpty(i,3);j++;}
		}aa=aa->next;i++;
	}printfPartEnd(f);
}
void printRegions(Goal*g)
{
	Reminders*rem=g->rems;
	Reminders*rem1=g->rems;
	Regions*aa=g->regs;
	Region*bb;
	SecondSectionList*second;
	ThirdSectionList*third;
	int files=0,i=1,trueReg=0,excluded=0;
	char year[20];
	if(aa!=NULL){createDir("alk");}
	while(rem1!=NULL)
	{
		if(rem1->reminder->type==fileType)files=rem1->reminder->gen.files;
		if(rem1->reminder->type==debugType)debug=rem1->reminder->gen.debug;
		rem1=rem1->next;
	}
//	if(debug)
	printReminders(g->rems);
	while(aa!=NULL)
	{
		bb=aa->region;
		if(bb!=NULL&&bb->type==firstType)
		{
			if(trueReg=isTrue(bb->regionNo,g->rems))
			{
				sprintf(fileName,"alk\\%d.alk",i);
				if((file=fopen(fileName,"w+"))==NULL)printf("\nFile %s could't be opened\n",fileName);
				else
				{	
					printf("\n================\tC %d %d %d file=%s\t================\n",bb->regionNo,bb->year,bb->month,fileName);
					fprintf(file,"C");
					if(bb->regionNo<=9)fprintf(file,"000%d",bb->regionNo);
					else if(bb->regionNo<=99)fprintf(file,"00%d",bb->regionNo);
					else if(bb->regionNo<=999)fprintf(file,"0%d",bb->regionNo);else fprintf(file,"%d",bb->regionNo);
					sprintf(year,"%d",bb->year);fprintf(file,"%c",year[strlen(year)-1]);
					if(bb->month<=9)fprintf(file,"0%d\n",bb->month);else fprintf(file,"%d\n",bb->month);
					if(bb->gen.first==NULL)printfNullPart(1);
						else printFirstSection(file,bb->gen.first,rem);
					if((second=findSecondList(g->regs,bb))!=NULL){printSecondSection(file,second,rem);}
						else printfNullPart(2);
					if((third=findThirdList(g->regs,bb))!=NULL){printThirdSection(file,third,rem);}
						else printfNullPart(3);
						if(fclose(file)){sprintf(str,"Невозможно закрыть %s файл\n",fileName);CharPrintf(str);}
					i++;
				}
			}if(!trueReg){sprintf(str,"\n\tРегион %d исключён\n",bb->regionNo);CharPrintf(str);excluded++;}
		}aa=aa->next;
		if(aa==NULL&&i>files)
		{
			sprintf(str,"\n\n\t********** Количество выданных и заказанных файлов. **********\n");
			CharPrintf(str);
			sprintf(str,"\t\tзак\t - выд - искл.\n");CharPrintf(str);
			printf("\t\t%d\t -  %d  -  %d\n",files,i-1,excluded);
		}
	}
	printf("\n");
	if(i<files)
	{
		sprintf(str,"\n\t********** Количество выданных и заказанных файлов. **********\n");//,files,i-1,files-i+1);
		CharPrintf(str);
		sprintf(str,"\t\tзак\t - выд\n");CharPrintf(str);
		printf("\t\t%d\t -  %d\n",files,i-1);
		sprintf(str,"\t\tПропущенных регионов: %d\n",excluded);CharPrintf(str);
	}
}
void printReminders(Reminders*rems)
{
	Reminders*aa=rems;
	int f=0,p=0,d=0,deb=0,e=0;
	while(aa!=NULL)
	{
		Reminder*bb=aa->reminder;
		switch((int)bb->type)
		{
			case fileType:		sprintf(str,"\tВыходных файлов: %d\n",bb->gen.files);CharPrintf(str);f++;break;
//			case fileType:		printf("\tFiles = %d\n",bb->gen.files);f++;break;
			case partType:		printPartList(bb->gen.parts);p++;break;
			case delType:			printDelList(bb->gen.delList);d++;break;
			case debugType:	if(bb->gen.debug)sprintf(str,"\tОтладка: да.\n");
											else sprintf(str,"\tОтладка: нет.\n");
											CharPrintf(str);deb++;break;
			case excludeType:	printExcludeList(bb->gen.exludeRegs);e++;break;
			default: break;
		}aa=aa->next;
	}
	if(!f){sprintf(str,"\tФайлов для вывода нет.\n");CharPrintf(str);}
	if(!p)printPartList(NULL);if(!d)printDelList(NULL);
	if(!deb){sprintf(str,"\tВыключить режим отладки.\n");CharPrintf(str);}
	if(!e)printExcludeList(NULL);

}
void printExcludeList(DigList*ex)
{
	DigList*aa=ex;
	if(aa!=NULL)
	{
		sprintf(str,"\tРегионы для пропуска: %d",aa->dig);aa=aa->next;
		CharToOem(str,str);printf("%s",str);
//		printf("\tRegions to exclude = %d",aa->dig);aa=aa->next;
		while(aa!=NULL){printf(",%d",aa->dig);aa=aa->next;}printf(";\n");
	}
	else {sprintf(str,"\tДля пропуска регионов нет.\n");CharToOem(str,str);printf("%s",str);}
//	else printf("\tRegions to exclude = 0");
}
void printPartList(PartList*parts)
{
	PartList*aa=parts;
	if(aa==NULL)
	{
		int i=1;
		for(i;i<4;i++)
		{
			sprintf(str,"\tРаздел %d:\tвыводимых строк нет\n",i);
			CharToOem(str,str);printf("%s",str);
		}
		//printf("\tPart %d\tlines = 0\n",i);
	}
	else while(aa!=NULL)
	{
		Part*bb=aa->part;
		sprintf(str,"\tРаздел %d:\tвыводится ",bb->partNo);CharPrintf(str);
		if(bb->lines==1)sprintf(str,"%d строка.\n",bb->lines);
		else sprintf(str,"%d строк.\n",bb->lines);
		CharPrintf(str);
		aa=aa->next;
	}
}
void printDelList(DelList*delList)
{
	DelList*aa=delList;
	int n=0;
	if(aa==NULL)
	{
		for(n;n<3;n++)
		{
			sprintf(str,"\tРаздел %d: строки не удаляются\n",n+1);CharToOem(str,str);printf("%s",str);
		}
	}
//	{for(n;n<3;n++)printf("\tIn part %d would be deleted\t0 lines\n",n+1);}
	else while(aa!=NULL)
	{
		DelPart*bb=aa->del;
		DigList*cc=bb->lines;
		sprintf(str,"\tРаздел %d: ",bb->regNo);CharPrintf(str);
		if(cc->next==NULL){sprintf(str,"будет удалена %d строка.\n",cc->dig);CharPrintf(str);}
		else
		{
			sprintf(str,"будут удалены\t%d",cc->dig);CharPrintf(str);
			cc=cc->next;while(cc!=NULL){printf(",%d",cc->dig);cc=cc->next;}
			sprintf(str,"\tстроки.\n");CharPrintf(str);
		}
		aa=aa->next;
	}
}
int createDir(char*d)
{
  struct _finddata_t c_file;
  long hFile;
	if(_mkdir(d))
	{
		if(errno!=17)perror(d);
		if(_chdir(d))
		{
			sprintf(str,"Невозможно перейти в каталог %s.\n",d);
			fprintf(stderr,str);exit(0);
		}
//		if(_chdir(d)){fprintf(stderr,"Could not go into dir %s.\n",d);exit(0);}
    if((hFile=_findfirst( "*.*",&c_file))==-1L)
		{
			sprintf(str,"Нет таких фалов: *.*");perror(str);
		}
    else
		{
			while(_findnext(hFile,&c_file)==0)
			{
				if(strcmp(c_file.name,"..")!=0)
				{
					if(c_file.attrib&_A_RDONLY||c_file.attrib&_A_SYSTEM||c_file.attrib&_A_HIDDEN||
						c_file.attrib&_A_ARCH)
					if(_chmod(c_file.name,_S_IWRITE))
					{
						sprintf(str,"Невозможно сменить режим доступа к файлу.");perror(str);
					}
					if(remove(c_file.name))perror(c_file.name);
				}
			}
			_findclose(hFile);
		}
		if(_chdir("..")){sprintf(str,"Невозможно перейти в .. каталог\n");perror(str);exit(0);}
	}return 1;
}
void printDebug(FILE*f,int a,int b)
{
	if(debug)
	{
		if(a<=9)fprintf(f,"|   %d |",a);		else if(a>9&&a<=99)fprintf(f,"|  %d |",a);
		if(b<=9)fprintf(f,"   %d ||\t",b);	else if(b>9&&a<=99)fprintf(f,"  %d ||\t",b);
	}
}
void printZero(FILE*f,int num)
{
	int i=num;
	while(i-1>0){fprintf(f,"0\t");i--;}fprintf(f,"0\n");
}
void printfEmpty(int line,int partNo)
{
	if(debug)
	{
		sprintf(str,"\tРаздел %d: добавлена пустая %d строка\n",partNo,line);// AnsiToOem
		CharToOem(str,str);printf("%s",str);
	}
}
void printfLineMore(int partNo,int j,int order)
{
	sprintf(str,"\tРаздел %d: строк должно быть больше заказанного (%d - %d = %d)\n",partNo,j-1,order,j-1-order);
	CharToOem(str,str);printf("%s",str);
}
void printfPartEnd(FILE*f)
{
	if(debug)
	{
		fprintf(f,"=======================================================\n");
		printf("------------------------------------------------\n");
	}
}
void printfNullPart(int d)
{
	sprintf(str,"\t\t********   Пустой %d раздел.   *********\n",d);
	CharToOem(str,str);printf("%s",str);
}
//_com_dispatch_method

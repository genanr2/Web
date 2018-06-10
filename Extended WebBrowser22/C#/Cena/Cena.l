%{
#include <Windows.h>
#include "stdio.h"
#include <stdlib.h>
#include <tchar.h>
#include <wchar.h>
#include "calc.h"
#include "CenaYacc.h"
#define yywrap() 1
#define YY_SKIP_YYWRAP
#include "FlexDef.h"
extern int YYLVAL;
int line_num=1;
int comment_caller;
FILE*file;
extern char**files;
char str[128];
%}
%x comment comment2 foo cenaStart otStart
WS		[[:blank:]]+
NL		\r?\n
dig	[0-9]
cena		[ц÷][е≈][нЌ][ај]
year		[г]
reg			[з«][ај][р–][е≈][г√]
ot			[оќ][т]
alpha	[A-Za-zа-€ј-яЄ®]
NAME	({alpha}|{dig}|\$)({alpha}|{dig}|\_|\.|\-|\/|\$)* 
	/*punc	[[:punct:]]{1}*/
%%
[\^]+	{return '^';}
"/*" {comment_caller=INITIAL;BEGIN(comment);}
<foo>"/*" {comment_caller=foo;BEGIN(comment); }
<comment>[^*\n]*
<comment>"*"+[^*/\n]*  
<comment>\n			++line_num;
<comment>"*"+"/"	BEGIN(comment_caller);
<comment><<EOF>> {
			strcpy(str,*files);strcat(str,": незаконченный комментарий в конце файла. ");
			strcat(str,"\n\t\t\tƒолжно сто€ть */ и перевод строки.\n");
			CharToOem(str,str);printf("\t%s",str);yyterminate();}
"//"							{BEGIN(comment2);}
<comment2>[^\n]*
<comment2>\n		{line_num++;BEGIN(INITIAL);}
<comment2><<EOF>> {
			strcpy(str,*files);strcat(str,": незаконченный комментарий в конце файла. ");
			strcat(str,"\n\t\t\tƒолжен сто€ть перевод строки.\n");
			CharToOem(str,str);printf("\t%s",str);yyterminate();
	}
{NL}	{line_num++;line_num++;}
{WS}  {;}
{cena}			{BEGIN(cenaStart);return cenaKey;}
<cenaStart>{dig}+ {yylval.valFloat=atof(yytext);return FLOATDIG;}
<cenaStart>{dig}+"."{dig}* {yylval.valFloat=atof(yytext);return FLOATDIG;}
<cenaStart>{NAME} {BEGIN(INITIAL);}
<cenaStart>{NL}	{line_num++;line_num++;}
<cenaStart>{WS}  {;}
<cenaStart>"\""  {;}
{dig}+"." {
						char str[32];
						strncpy(str,yytext,strlen(yytext)-1);
						yylval.valInt=atoi(str);return DIGIT1;
					}
{reg}"."{dig}+"."{dig}+"."{dig}+ {
				int i;char str[32],str1[32],*str2;
				strcpy(str1,yytext);str2=str1;
				for(i=0;i<(int)strlen(str1)-4;i++)str2++;
				strncpy(str,str2,strlen(str2));
				yylval.valInt=atoi(str);return DIGIT2;
	}
{ot}			{BEGIN(otStart);}
<otStart>{dig}+"."{dig}+"."{dig}+ {
				int i;char str[32],str1[32],*str2;
				strcpy(str1,yytext);str2=str1;
				for(i=0;i<(int)strlen(str1)-2;i++)str2++;
				strncpy(str,str2,strlen(str2));
				yylval.valInt=atoi(str);BEGIN(INITIAL);
				return DIGIT3;
	}
{year}+"."	{return yearKey;}
	/*{ot}			{return otKey;}*/
{NAME}	{;}
.|\n
%%

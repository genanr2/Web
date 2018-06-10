%{
#include <Windows.h>
#define YYSTATE double
#include <malloc.h>
#include <stdio.h>
#include <ctype.h>
#include <ctype.h>
#include "FlexDef.h"
#include "calc.h"
#define YYDEBUG 1
FILE*file;
char**files;
char fileName[128];
double summ97=0,summ98=0,summ99=0;
%}
%union {int valInt;double valFloat;}
%token yearKey cenaKey otKey
%token <valInt>DIGIT1
%token <valInt>DIGIT
%token <valInt>DIGIT2
%token <valInt>DIGIT3
%token <valFloat>FLOATDIG
%type <valInt>year;
//%type <valInt>otYear
%type <valFloat>cena;
%type <valFloat>digitSumm;
%%
input:lines
			{
				char str[64];
				printf("\n\n\t\t\t\t");
				CharToOem(fileName,fileName);
				printf(fileName);
				printf("\n================================ 1997 ================================\n");
				CharToOem("\t\tОбщая сумма договоров за 1997 год ------ %.2f руб.\n",str);
				printf(str,summ97);
				printf("\n================================ 1998 ================================\n");
				CharToOem("\t\tОбщая сумма договоров за 1998 год ------ %.2f руб.\n",str);
				printf(str,summ98);
				printf("\n================================ 1999 ================================\n");
				CharToOem("\t\tОбщая сумма договоров за 1999 год ------ %.2f руб.\n\n",str);
				printf(str,summ99);
			}
			|error'\n'{yyerrok;YYERROR;};
lines:line|lines line;
line:DIGIT1 DIGIT3 year cena
		{
			char str[64];double summ;double cena98;double cena99;
//			CharToOem("%d\t%d г. (рег. в %d г.)\t Цена =\t%.2f",str);
			CharToOem("%d.\t%d г. (рег. %d)\t Цена =\t%.2f",str);
//			printf(str,$1,$2,$3);
//			if($3==1997){summ97+=$4;summ=summ97;printf(str,$1,$3,$4);}
			if($2==97){summ97+=$4;summ=summ97;}//printf(str,$1,$2,$4);}
//			else if($3==1998)
			else if($2==98)
			{
/*
				if($2<$3&&$4>=10000000)
					cena98=$4/1000;else cena98=$4;
				summ98+=cena98;
				summ=summ98;printf(str,$1,$3,cena98);
*/
				summ98+=$4;summ=summ98;
			}
//			else if($3==1999)
			else if($2==99)
			{
/*
				if($2<$3&&$4>=10000000)
					cena99=$4/1000;else cena99=$4;
				summ99+=cena99;
				summ=summ99;printf(str,$1,$3,cena99);
*/
				summ99+=$4;summ=summ99;//printf(str,$1,$2,cena99);
			}
			printf(str,$1,$2,$3,$4);
			CharToOem("\t\tСумма за %d г. = %.2f\n",str);
			printf(str,$2,summ);
		}|error;
year:DIGIT2 yearKey{$$=$1;};
//otYear:otKey DIGIT2{$$=$2;};
cena:cenaKey{$$=0;}|cenaKey digitSumm{$$=$2;};
digitSumm:FLOATDIG{$$=$1;}|digitSumm FLOATDIG{$$=$1+$2;};
%%
void yyerror(char*s)
{
	char str[32],str1[32];
	CharToOem("номер строки",str);
	CharToOem(*files,str1);
	printf("\n\t%s:\t%s.\t%s %d\n",str1,s,str,line_num);
}
int main(int argc,char**argv)
{
	char str[64];
	++argv,--argc;files=argv;
	if((file=fopen(*files,"r"))!=NULL)
	{
		if(*files!=NULL)strcpy(fileName,*files);yyin=file;
	}
	else 
	{
		CharToOem("Вводите, пожалуйста, свои строки (Для выхода: CTRL C):\n",str);
		fprintf(stderr,str);yyin=stdin;//standard=1;
	}while(yyparse()!=0);return 0;
}

typedef struct Year Year;

/*
typedef struct DelList DelList;
typedef struct DelPart DelPart;
typedef struct Goal Goal;
typedef struct Region Region;
typedef struct Regions Regions;
typedef struct Reminder Reminder;
typedef struct Reminders Reminders;
typedef struct FirstSection FirstSection;
typedef struct FirstSectionList FirstSectionList;
typedef struct Part Part;
typedef struct PartList PartList;
typedef struct DigList DigList;
typedef struct SecondSection SecondSection;
typedef struct SecondSectionList SecondSectionList;
typedef struct ThirdSection ThirdSection;
typedef struct ThirdSectionList ThirdSectionList;
typedef struct XyStartList XyStartList;
typedef struct XyStart XyStart;
//typedef struct ExludeRegs ExludeRegs;
enum RegionType{firstType=1,secondType=2,thirdType=3};
enum ReminderType{fileType=1,partType=2,delType=3,debugType=4,excludeType=5,excelType=6,
									visualType=7,xyStartType=8};
*/
struct Year{int year;};
/*
struct Goal{Reminders*rems;Regions*regs;};
struct Reminders{Reminder*reminder;Reminders*next;};
struct Reminder
{
	union
	{
		int files;
		int debug;
		int excelVer;
		int visual;
		PartList*parts;
		XyStartList*xyStart;
		DelList*delList;
		DigList*exludeRegs;
	}gen;
	enum ReminderType type;
};
struct PartList{Part*part;PartList*next;};
struct Part{int partNo;int lines;};
struct XyStartList{XyStart*xy;XyStartList*next;};
struct XyStart{int partNo;char*xy;};
struct DelList{DelPart*del;DelList*next;};
struct DelPart{int regNo;DigList*lines;};
struct DigList{int dig;DigList*next;};
struct Region
{
	int sectNo;int year;int month;int regionNo;
	union{FirstSectionList*first;SecondSectionList*second;ThirdSectionList*third;}gen;
	enum RegionType type;
};
struct Regions{Region*region;Regions*next;};
struct FirstSectionList{FirstSection*first;FirstSectionList*next;};
struct FirstSection{int f1;int f2;int f3;};
struct SecondSectionList{SecondSection*second;SecondSectionList*next;};
struct SecondSection{int s1;int s2;int s3;int s4;int s5;int s6;int s7;};
struct ThirdSectionList{ThirdSection*third;ThirdSectionList*next;};
struct ThirdSection{int t1;int t2;int t3;int t4;};
extern void printRegions(Goal*g);				extern void printReminders(Reminders*rems);
extern void printPartList(PartList*parts);	extern void printDelList(DelList*delList);
extern void printExcludeList(DigList*ex);
extern int isInList(int f1,DigList*lines);
//extern "C"int createDir(char*d);
extern void printDebug(FILE*f,int a,int b);
extern void printZero(FILE*f,int num);
extern void printfEmpty(int line,int partNo);
void printfLineMore(int partNo,int j,int order);
extern void printfPartEnd(FILE*f);
extern void printfNullPart(int d);
*/
extern int line_num;

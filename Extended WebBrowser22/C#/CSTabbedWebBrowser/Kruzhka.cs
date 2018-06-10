using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Windows;
using System.Windows.Controls;

using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;

using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Controls.Primitives;
using System.ComponentModel;

//using CSUnvsAppCommandBindInDT.Model;
using System.Collections.ObjectModel;

//using CSTabbedWebBrowser.ViewModel2;
//using CSUnvsAppCommandBindInDT;
//using CSTabbedWebBrowser.DynamicButton;

namespace CSTabbedWebBrowser.DynamicButton
{
  //  public class DynamicImageButton : System.Windows.Forms.ButtonBase
  public class DynamicImageButton : ButtonBase
  {
    static DynamicImageButton()
    {
      DefaultStyleKeyProperty.OverrideMetadata(typeof(DynamicImageButton), new FrameworkPropertyMetadata(typeof(DynamicImageButton)));
    }
    public string IconImageUri
    {
      get { return (string)GetValue(IconImageUriProperty); }
      set { SetValue(IconImageUriProperty, value); }
    }
    public static readonly DependencyProperty IconImageUriProperty =
        DependencyProperty.Register("IconImageUri", typeof(string), typeof(DynamicImageButton), new UIPropertyMetadata(string.Empty,
          (o, e) =>
          {
            try
            {
              Uri uriSource = new Uri((string)e.NewValue, UriKind.RelativeOrAbsolute);
              if (uriSource != null)
              {
                DynamicImageButton button = o as DynamicImageButton;
                BitmapImage img = new BitmapImage(uriSource);
                button.SetValue(IconImageProperty, img);
              }
            }
            catch (Exception ex)
            {
              throw ex;
            }
          }));
    public BitmapImage IconImage
    {
      get { return (BitmapImage)GetValue(IconImageProperty); } set { SetValue(IconImageProperty, value); }
    }
    public static readonly DependencyProperty IconImageProperty =
        DependencyProperty.Register("IconImage", typeof(BitmapImage), typeof(DynamicImageButton), new UIPropertyMetadata(null));
  }
}
namespace CSTabbedWebBrowser
{

  //System.Windows.Forms.
  public class KruzhkaButton : System.Windows.Forms.Button //,  INotifyPropertyChanged

  {
    public Kruzhka KruzhkaId { get; set; }
/*
    #region INotifyPropertyChanged Interface
    public event PropertyChangedEventHandler PropertyChanged;
    private void OnNotifyPropertyChanged(string propertyName)
    {
      if (PropertyChanged != null) { PropertyChanged(this, new PropertyChangedEventArgs(propertyName)); }
    }
    #endregion
*/
    //    public string Director { get; set; }
  }
  public class AddKruzhka
  {
    public string ShortName { get; set; }
    public string DirectorSN { get; set; }
    public Kruzhka kr { get; set; }
  }
  public class AddKruzhkaList : List<AddKruzhka>
  {
  }
  public class Kruzhka : IComparable
  {
//    public int CompareTo(object obj)
//    {
//       return ((IComparable)IdName).CompareTo(obj);
//    }

        public string IdName { get; set; }
        public int CompareTo(object other)
        {
            return string.Compare(this.IdName, ((Kruzhka)other).IdName);
        }
        public string Passwd { get; set; }
    public string Address { get; set; }
    public string LastName { get; set; }
    public string FirstName { get; set; }
    public DateTime HireDate { get; set; }
    public int KruzhkaID { get; set; }
    public string Buhgalter { get; set; }
    public string DirectorSN { get; set; }
    public Person Director { get; set; }
    public AddKruzhkaList AddKruzhki { get; set; }
    public string Comment { get; set; }
    public string ETokenPwd { get; set; }
    public bool ReadOnly { get; set; }
    public bool Vip { get; set; }
    public int Age { get; set; }
    public string UrEddress { get; set; }
    public string FactEddress { get; set; }
    public string Telefon { get; set; }
    public string Faks { get; set; }

  }
  public class Person
  {
    public string fullName { get; set; }
    public string shortName { get; set; }
    public string passport { get; set; }
    public string address { get; set; }

  }
  public class DirectorList : List<Person>
  {
    public DirectorList()
    {
      Add(new Person{fullName = "Фролов Максим Борисович", shortName = "Фролов М.Б.",passport = "серия: 45 11, № 608342, выдан: 17 мая 2012 года, Отделением УФМС России по гор. Москве по району Новогиреево, № подр. 770-054", address = "111397, Москва г, Братская ул, дом № 19, корпус 3, кв.90" });
      Add(new Person{fullName = "Масляшова Евгения Алексанлровна", shortName = "Масляшова Е.А.",passport = "серия: 56 04, № 430169, выдан: 14 марта 2005 года, ОВД Городищенского р-на Пензенской обл., № подр. 582-016", address = "442660, Пензенская обл, Городищенский р-н, Чаадаевка рп, Фабричная ул, дом № 33, кв.1" });
      Add(new Person{fullName = "Остапенко Елена Валерьевна", shortName = "Остапенко Е.В.",passport = "серия: 46 11, № 262927, выдан: 21 января 2011 года, ТП ОУФМС России по Московской области в Домодедовском р-не в ж/г аэропорта Домодедово, № подр. 500-025", address = "142046, Московская обл, Домодедово г, Авиационный мкр, Академика Королева ул, дом № 7, корпус 2, кв.49" });
      Add(new Person{fullName = "Рудко Андрей Михайлович",shortName = "Рудко А.М.",passport = "серия: 45 14, № 913024, выдан: 09 декабря 2014 года, Отделом УФМС России по гор. Москве по району Южное Бутово, № подр. 770-124", address = "117042, Москва г, Адмирала Лазарева ул, дом № 19, корпус 1, кв.106" });
      Add(new Person{fullName = "Васильев Сергей Владимирович", shortName = "Васильев С.В.",passport = "серия: 45 07, № 175662, выдан: 12 августа 2004 года, ОВД района Северное Тушино г. Москвы, № подр. 	", address = "125480, Москва г, Героев-Панфиловцев ул, дом № 14, корпус 1, кв.124" });
      Add(new Person{fullName = "Амуров Николай Николаевич", shortName = "Амуров Н.Н.",passport = "серия: 71 10, № 822718, выдан: 30 ноября 2010 года, Отделом №1 УФМС России по Тюменской обл. в Ленинском районе г. Тюмени , № подр. 720-001", address = "625047, Тюменская обл, Тюмень г, Копытова д, Зеленая ул, дом № 8, кв.8" });
      Add(new Person{fullName = "Аймуранова Лариса Шамилиевна", shortName = "Аймуранова Л.Ш.", passport = "серия: 89 04, № 836406, выдан: 27 октября 2004 года, Отделом внутренних дел Октябрьского района гор. Саранска, № подр. 132-001", address = "430006, Мордовия Респ, Саранск г, Вакеева ул, дом № 20, кв.11" });
      Add(new Person{fullName = "Сапронова Мария Николаевна", shortName = "Сапронова М.Н.",passport = "серия: 45 07, № 890906, выдан: 23 июня 2005 года, ОВД района Соколиная Гора г. Москвы, № подр. 	", address = "105318, Москва г, Зверинецкая ул, дом № 14, кв.43" });
      Add(new Person{fullName = "Соловьёв Георгий Валерьевич", shortName = "Соловьёв Г.В.",passport = "серия: 45 04, № 415592, выдан: 14 января 2003 года, Паспортным столом № 1 ОВД Соколиная гора г. Москвы, № подр. 	", address = "105318, Москва г, Щербаковская ул, дом № 26, кв.238" });
      Add(new Person{fullName = "Паршиков Александр Иванович", shortName = "Паршиков А.И.",passport = "серия: 45 10, № 806261, выдан: 11 июня 2010 года, ОТДЕЛЕНИЕМ ПО РАЙОНУ БОГОРОДСКОЕ ОУФМС РОССИИ ПО ГОР. МОСКВЕ В ВАО, № подр. 770-045", address = "107370, Москва г, Маршала Рокоссовского б-р, дом № 11, кв.5" });
      Add(new Person{fullName = "Голубева Сильвия Степановна", shortName = "Голубева С.С.",passport = "серия: 45 12, № 991034, выдан: 13 декабря 2012 года, Отделом УФМС России по гор. Москве по району Царицыно, № подр. 	", address = "140053, Московская обл, Котельники г, Южный мкр, дом № 8, кв.393" });
      Add(new Person{fullName = "Шевчук Никита Владиславович", shortName = "Шевчук Н.В.",passport = "серия: 45 08, № 414239, выдан: 26 апреля 2006 года, ОВД района Хамовники УВД ЦАО г. Москвы, № подр. 	", address = "119034, Москва г, Остоженка ул, дом № 20, кв.4" });
      Add(new Person{fullName = "Козодаев А.Н.", shortName = "Козодаев А.Н.",passport = "серия: 45 02, № 362968, выдан: 22 мая 2002 года, Паспортным столом № 2 ОВД Коньково г. Москвы, № подр. 	", address = "117342, Москва г, Островитянова ул, дом № 45, корпус 1, кв.186" });
      Add(new Person{fullName = "Трунов Альберт Валерьевич", shortName = "Трунов А.В.",passport = "серия: 46 08, № 215411, выдан: 22 мая 2008 года, ТП№1 в г. Люберцы ОУФМС России по Московской обл, в Люберецком р-не , № подр. 	", address = "140000, Московская обл, Люберецкий р-н, Люберцы г, Октябрьский пр-кт, дом № 265, кв.54" });
      Add(new Person{fullName = "Кирьяков А.Ф.", shortName = "Кирьяков А.Ф.",passport = "",address = ""});
      Add(new Person{fullName = "Лукина Н.А.", shortName = "Лукина Н.А.",passport = "",address = ""});
      Add(new Person {fullName = "Кабачек Евгения Сергеевна", shortName = "Кабачек Е.С.", passport = "серия: 45 08, № 046009, выдан: 12 декабря 2005 года, Паспортно-визовым отделением ОВД района Замоскворечье города Москвы, № подр. ", address = "301990, Тульская обл, Каменский р-н, Шишковка д, дом № 4, кв.3" });
      Add(new Person { fullName = "Шафран Наталья Александровна.", shortName = "Шафран Н.А.", passport = "серия  45 14 № 713734, выдан «20» августа 2014 г. , Отделом УФМС по г. Москве по району Коньково", address = "" });

    }
  }

  public class KruzhkaList : List<Kruzhka>
  {
    public KruzhkaList()
    {
      DirectorList directors = new DirectorList();
            //      ООО "Амега" Нортима, Марьино Фролов М.Б. 7514857045 9104406188    22.05.2015

      Add(new Kruzhka
      {
        KruzhkaID = 8,
        FirstName = "ООО \"Амега\"",
        LastName = "Амега",
        Buhgalter = "",
//        DirectorSN = "Фролов М.Б.",
        DirectorSN = directors[0].shortName,
        Director = directors[0],
        IdName = "7514857045",
        Passwd = "9104406188",
        AddKruzhki = new AddKruzhkaList {
          new AddKruzhka { ShortName = "Нортима", DirectorSN = directors[0].shortName,
            kr =new Kruzhka
            {
              FirstName = "ООО \"Нортима\"",
              LastName = "Нортима",
              DirectorSN = directors[0].shortName,Director = directors[0],
              UrEddress= "117452, Москва г, Внутренний проезд, дом № 8, строение 9",
              FactEddress= "101000, Москва г, Мясницкая ул, дом № 32 стр. 1",
              Telefon= "+7 (499) 962-81-95",
              Faks= ""
            }  },
          new AddKruzhka { ShortName = "Марьино", DirectorSN = directors[0].shortName,
            kr =new Kruzhka
            {
              FirstName = "ООО \"Марьино\"",
              LastName = "Марьино",
              DirectorSN = directors[0].shortName,Director = directors[0],
              UrEddress= "109651, Москва г, Новочеркасский б-р, дом № 13 А",
              FactEddress= "109369, Москва г, Новочеркасский б-р, дом № 57, корпус 2",
              Telefon= "+7 (495) 937-81-95",
              Faks= ""
            }
          } },
        Comment = "чтение",
        ETokenPwd = "",
        HireDate = DateTime.Parse("27/4/2016"),
        UrEddress= "109044, Москва г, Крутицкий 3-й пер, дом № 13",
        FactEddress= "109044, Москва г, Крутицкий 3-й пер, дом № 13",
        Telefon= "+7 (495) 937-81-95",
        Faks= "+7 (495) 937-81-95"
      });
      // ООО "Амега" чтение, Земляной вал  Фролов М.Б. 3312800687  9104406188  1234567890  18.02.2016  Солодухина
      Add(new Kruzhka
      {
        KruzhkaID = 22,
        FirstName = "ООО \"Амега\"",
        LastName = "Амега ЗВ",
        Buhgalter = "Солодухина И.",
//        DirectorSN = "Фролов М.Б.",
        DirectorSN = directors[0].shortName,
        Director = directors[0],
        IdName = "3312800687",
        Passwd = "9104406188",
        AddKruzhki = new AddKruzhkaList { },
        Comment = "чтение",
        ETokenPwd = "1234567890",
        HireDate = DateTime.Parse("18/2/2016"),
        UrEddress = "109044, Москва г, Крутицкий 3-й пер, дом № 13",
        FactEddress = "109044, Москва г, Крутицкий 3-й пер, дом № 13",
        Telefon = "+7 (499) 962-81-95",
        Faks = ""
      });
      //      ООО "Анко"    Лукина Н.А. 4347384493  910 440 6188    26.06.2015  Солодухина
      Add(new Kruzhka
      {
        KruzhkaID = 7,
        FirstName = "ООО \"Анко\"",
        LastName = "Анко",
        Buhgalter = "Солодухина И.",
//        DirectorSN = "Лукина Н.А.",
        DirectorSN = directors[17].shortName,
        Director = directors[17],
        IdName = "5691046818",
        Passwd = "9104406188",
        AddKruzhki = new AddKruzhkaList { },
        Comment = "чтение",
        ETokenPwd = "",
        HireDate = DateTime.Parse("09/06/2016"),
        UrEddress = "109651, Москва г, Новочеркасский б-р, дом № 13, корпус А",
        FactEddress = "109651, Москва г, Новочеркасский б-р, дом № 13, корпус А",
        Telefon = "+7 (499) 962-81-95",
        Faks = "+7 (499) 962-81-95"
      });

      Add(new Kruzhka {
        KruzhkaID = 1,
        FirstName = "ООО \"Тушино\"", 
        LastName = "Тушино",
        Buhgalter = "",
        //        DirectorSN = "Васильев С.В.",
        DirectorSN = directors[4].shortName,
        Director = directors[4],
        IdName = "6609435424",
        Passwd = "9104406188",
        AddKruzhki = new AddKruzhkaList { },
        Comment = "чтение",
        ETokenPwd = "",
        HireDate = DateTime.Parse("21/05/2015"),
        UrEddress = "127006, Москва г, Долгоруковская ул, дом № 40",
        FactEddress = "125362, Москва г, Тушинская ул, дом № 17",
        Telefon = "+7 (495) 937-81-95",
        Faks = "+7 (495) 663-37-43"
      });
//      ООО "Профи" ГКК, Матиз, Курсор, Нортима, Марьино, Амега, Книжка, Тушино, ТехноКрафтЛит, Фрегат, Крылат Масляшова Е.Остапенко Е.В, 
//  Рудко А.М., Фролов М.Б., Кабачек Е.С. 8823254649  9104406188    21.05.2015
      Add(new Kruzhka
      {
        KruzhkaID = 2,
        FirstName = "ООО \"Профи\"",
        LastName = "Профи",
        Buhgalter = "",
//        DirectorSN = "Масляшова Е.А.",
        DirectorSN = directors[1].shortName,
        Director = directors[1],

        IdName = "8823254649",
        Passwd = "9104406188",
        AddKruzhki = new AddKruzhkaList {
          new AddKruzhka {ShortName= "ООО \"ГКК\"", DirectorSN= directors[3].shortName,
            kr =new Kruzhka
            {
              FirstName = "ООО \"ГКК\"",
              LastName = "ГКК",
              DirectorSN = directors[3].shortName,Director = directors[3], // Рудко
              UrEddress= "105064, Москва г, Сусальный Ниж. пер, дом № 5, корпус 1",
              FactEddress= "105064, Москва г, Сусальный Ниж. пер, дом № 5, корпус 1",
              Telefon= "+7 (499) 962-81-95",
              Faks= "+7 (499) 962-81-95"
            }
          },
          new AddKruzhka {ShortName= "ООО \"ТехноКрафтЛит\"", DirectorSN= directors[3].shortName,
            kr =new Kruzhka
            {
              FirstName = "ООО \"ТехноКрафтЛит\"",
              LastName = "ТехноКрафтЛит",
              DirectorSN = directors[3].shortName,Director = directors[3], // Рудко
              UrEddress= "123242, Москва г, Кудринская пл, дом № 1",
              FactEddress= "123242, Москва г, Кудринская пл, дом № 1",
              Telefon= "+7 (499) 252-10-68",
              Faks= "+7 (495) 937-81-95"

            }

          },
          new AddKruzhka {
              ShortName= "ООО \"Курсор\"", DirectorSN= directors[2].shortName,
            kr =new Kruzhka
            {
              FirstName = "ООО \"Курсор\"",
              LastName = "Курсор",
              DirectorSN = directors[2].shortName,Director = directors[2], // Остапенко
              UrEddress= "111116, Москва г, Энергетический проезд, дом № 3 стр. 1",
              FactEddress= "105064, Москва г, Сусальный Ниж. пер, дом № 5, строение 1",
              Telefon= "+7 (499) 252-10-68",
              Faks= "+7 (495) 937-81-95"
            }
          },
          new AddKruzhka {ShortName= "ООО \"Книжка\"", DirectorSN=directors[2].shortName,
            kr =new Kruzhka
            {
              FirstName = "ООО \"Книжка\"",
              LastName = "Книжка",
              DirectorSN = directors[2].shortName,Director = directors[2], // Остапенко
              UrEddress= "117624, Москва г, Адмирала Ушакова б-р, дом № 5",
              FactEddress= "117624, Москва г, Адмирала Ушакова б-р, дом № 5",
              Telefon= "+7 (495) 937-81-95",
              Faks= "+7 (495) 937-81-95"
            }
          
          },
          new AddKruzhka {ShortName= "ООО \"Фрегат\"", DirectorSN= directors[2].shortName,
            kr =new Kruzhka
            {
              FirstName = "ООО \"Фрегат\"",
              LastName = "Фрегат",
              DirectorSN = directors[2].shortName,Director = directors[2], // Остапенко
              UrEddress= "125212, Москва г, Адмирала Макарова ул, дом № 45",
              FactEddress= "125212, Москва г, Адмирала Макарова ул, дом № 45",
              Telefon= "+7 (495) 937-81-95",
              Faks= "+7 (495) 937-81-95"
            }

          },

          new AddKruzhka {ShortName= "ООО \"Нортима\"", DirectorSN= directors[0].shortName,
            kr =new Kruzhka
            {
              FirstName = "ООО \"Нортима\"",
              LastName = "Нортима",
              DirectorSN = directors[0].shortName,Director = directors[0],
              UrEddress= "117452, Москва г, Внутренний проезд, дом № 8, строение 9",
              FactEddress= "101000, Москва г, Мясницкая ул, дом № 32 стр. 1",
              Telefon= "+7 (499) 962-81-95",
              Faks= ""
            }
          },
          new AddKruzhka {ShortName= "ООО \"Марьино\"", DirectorSN= "Фролов М.Б.",
            kr =new Kruzhka
            {
              FirstName = "ООО \"Марьино\"",
              LastName = "Марьино",
              DirectorSN = directors[0].shortName,Director = directors[0],
              UrEddress= "109651, Москва г, Новочеркасский б-р, дом № 13 А",
              FactEddress= "109369, Москва г, Новочеркасский б-р, дом № 57, корпус 2",
              Telefon= "+7 (495) 937-81-95",
              Faks= ""
            }
          },
          new AddKruzhka {ShortName= "ООО \"Амега\"", DirectorSN= directors[0].shortName,
            kr =new Kruzhka
            {
              FirstName = "ООО \"Амега\"",
              LastName = "Амега",
              DirectorSN = directors[0].shortName,Director = directors[0],
              UrEddress= "109044, Москва г, Крутицкий 3-й пер, дом № 13",
              FactEddress= "109044, Москва г, Крутицкий 3-й пер, дом № 13",
              Telefon= "+7 (495) 937-81-95",
              Faks= ""
            }
          },

          new AddKruzhka {ShortName= "ООО \"Тушино\"", DirectorSN= directors[15].shortName,
            kr =new Kruzhka
            {
              FirstName = "ООО \"Тушино\"",
              LastName = "Тушино",
              DirectorSN = directors[15].shortName,Director = directors[15],
              UrEddress= "127006, Москва г, Долгоруковская ул, дом № 40",
              FactEddress= "125362, Москва г, Тушинская ул, дом № 17",
              Telefon= "+7 (495) 937-81-95",
              Faks= "+7 (495) 663-37-43"
            }
          },
/*
          new AddKruzhka {ShortName= "ООО \"Крылат\"", DirectorSN= directors[0].shortName,
            kr =new Kruzhka
            {
              FirstName = "ООО \"Крылат\"",
              LastName = "Крылат",
              DirectorSN = directors[0].shortName,Director = directors[0],
              UrEddress= "127006, Москва г, Долгоруковская ул, дом № 40",
              FactEddress= "125362, Москва г, Тушинская ул, дом № 17",
              Telefon= "+7 (495) 937-81-95",
              Faks= "+7 (495) 663-37-43"
            }

          }
 */
        },
        Comment = "чтение",
        ETokenPwd = "",
        HireDate = DateTime.Parse("27/4/2016"),
        UrEddress = "127006, Москва г, Петровка ул, дом № 32/1-3, корпус 2",
        FactEddress = "117321, Москва г, Профсоюзная ул, дом № 128, корпус 2",
        Telefon = "+7 (495) 937-81-95",
        Faks = "+7 (495) 337-15-55"
      });
//      ООО "Курсор"	Фрегат, Крылат, Книжка Остапенко Е.В.  5938318188	9104406188		21.05.2015
      Add(new Kruzhka {
        KruzhkaID = 3,
        FirstName = "ООО \"Курсор\"",
        LastName = "Курсор",
        Buhgalter = "",
        DirectorSN = directors[2].shortName, //"Остапенко Е.В.",
        IdName = "5938318188",
        Passwd = "9104406188",
        AddKruzhki = new AddKruzhkaList { },
        Comment = "чтение",
        ETokenPwd = "",
        HireDate = DateTime.Parse("27/4/2016"),
        UrEddress = "111116, Москва г, Энергетический проезд, дом № 3 стр. 1",
        FactEddress = "105064, Москва г, Сусальный Ниж. пер, дом № 5, строение 1",
        Telefon = "+7 (499) 962-81-95",
        Faks = "+7 (499) 962-81-95"
      });
//      ООО "ТехноКрафтЛит" ГКК Рудко А.М.  6781278295  9104406188    22.05.2015
      Add(new Kruzhka {
        KruzhkaID = 4,
        FirstName = "ООО \"ТехноКрафтЛит\"",
        LastName = "ТехноКрафтЛит",
        Buhgalter = "",
        DirectorSN = directors[3].shortName,
        IdName = "6781278295",
        Passwd = "9104406188",
        AddKruzhki = new AddKruzhkaList { new AddKruzhka { 
            ShortName = "ГКК", DirectorSN = directors[3].shortName,
            kr =new Kruzhka
            {
              FirstName = "ООО \"ГКК\"",
              LastName = "ГКК",
              DirectorSN = directors[3].shortName,Director = directors[3], // Рудко
              UrEddress= "105064, Москва г, Сусальный Ниж. пер, дом № 5, корпус 1",
              FactEddress= "105064, Москва г, Сусальный Ниж. пер, дом № 5, корпус 1",
              Telefon= "+7 (499) 962-81-95",
              Faks= "+7 (499) 962-81-95"
            }

        } },
        Comment = "чтение",
        ETokenPwd = "",
        HireDate = DateTime.Parse("27/4/2016")
      });
//      ООО "Яммикс"  Стройдекор - СК, Овиком Амуров Н.Н. 3294764119  8424966863    09.07.2015  Фролова И.
      Add(new Kruzhka {
        KruzhkaID = 5,
        FirstName = "ООО \"Яммикс\"",
        LastName = "Яммикс",
        Buhgalter = "Фролова И.",
        DirectorSN = "Амуров Н.Н.",
        IdName = "3294764119",
        Passwd = "8424966863",
        AddKruzhki = new AddKruzhkaList 
        { 
            new AddKruzhka { ShortName = "Стройдекор-СК", DirectorSN = directors[2].shortName,
            kr =new Kruzhka
            {
              FirstName = "ООО \"Стройдекор-СК\"",
              LastName = "Стройдекор-СК",
              DirectorSN = directors[2].shortName,Director = directors[2], 
              UrEddress= "127562, Москва г, Алтуфьевское ш, дом № 28",
              FactEddress= "127562, Москва г, Алтуфьевское ш, дом № 28",
              Telefon= "+7 (495) 937-81-95",
              Faks= "+7 (495) 937-81-95"
            }
            }, 
            new AddKruzhka { ShortName = "Овиком", DirectorSN = directors[2].shortName,
            kr =new Kruzhka
            {
              FirstName = "ООО \"Овиком\"",
              LastName = "Овиком",
              DirectorSN = directors[2].shortName,Director = directors[2], 
              UrEddress= "117452, Москва г, Внутренний проезд, дом № 8, корпус 9",
              FactEddress= "117452, Москва г, Внутренний проезд, дом № 8, корпус 9",
              Telefon= "+7 (495) 937-81-95",
              Faks= "+7 (495) 937-81-95"
            }
            } },
        Comment = "чтение",
        ETokenPwd = "",
        HireDate = DateTime.Parse("10/6/2016"),
        UrEddress = "103009, Москва г, Тверская ул, дом № 10, строение 3",
        FactEddress = "103009, Москва г, Тверская ул, дом № 10, строение 3",
        Telefon = "+7 (495) 937-81-95",
        Faks = "+7 (495) 937-81-95"
      });
//      ООО "Символ"    Остапенко Е.В.  8832315991  9104406188    13.10.2015  Адаменко
      Add(new Kruzhka {
        KruzhkaID = 6,
        FirstName = "ООО \"Символ\"",
        LastName = "Символ",
        Buhgalter = "Адаменко С.",
//        DirectorSN = " Остапенко Е.В.",
        DirectorSN = directors[2].shortName,
        Director = directors[2], // Остапенко Е.В.
        IdName = "8832315991",
        Passwd = "9104406188",
        AddKruzhki = new AddKruzhkaList {},
        Comment = "чтение",
        ETokenPwd = "",
        HireDate = DateTime.Parse("13/10/2015"),
        UrEddress = "124482, Москва г, Зеленоград г, Юности пл, дом № 2, корпус 1",
        FactEddress = "124482, Москва г, Зеленоград г, Юности пл, дом № 2",
        Telefon = "+7 (495) 937-81-95",
        Faks = "+7 (499) 736-83-09"
      });
//      ООО "Джайф"   Аймуранова Л.Ш. 2523907395  7133685418    26.06.2015  Штец О.
/*
      Add(new Kruzhka {
        KruzhkaID = 9,
        FirstName = "ООО \"Джайф\"",
        LastName = "Джайф",
        Buhgalter = "Штец О.",
//        DirectorSN = "Аймуранова Л.Ш.",
        DirectorSN = directors[6].shortName,
        Director = directors[6], // Остапенко Е.В.
        IdName = "2523907395",
        Passwd = "7133685418",
        AddKruzhki = new AddKruzhkaList { },
        Comment = "чтение",
        ETokenPwd = "",
        HireDate = DateTime.Parse("26/6/2015"),
        UrEddress = "123100, Москва г, Шмитовский проезд, дом № 11А",
        FactEddress = "123100, Москва г, Чертановская ул, дом № 1/В, строение 1",
        Telefon = "+7 (499) 962-81-95",
        Faks = "+7 (499) 962-81-95"
      });
*/
      /*
      ООО "Сёма"		Сапронова М.Н.  9411877295	9104406188	Пусто 15.09.2015	Адаменко
      */
      Add(new Kruzhka {
        KruzhkaID = 10,
        FirstName = "ООО \"Сёма\"",
        LastName = "Сёма",
        Buhgalter = "Адаменко С.",
        DirectorSN = "Сапронова М.Н.",
        IdName = "9411877295",
        Passwd = "9104406188",
        AddKruzhki = new AddKruzhkaList { },
        Comment = "чтение",
        ETokenPwd = "",
        HireDate = DateTime.Parse("15/9/2015"),
        UrEddress = "105318, Москва г, Семеновская пл, дом № 7, корпус 17",
        FactEddress = "105318, Москва г, Семеновская пл, дом № 7, корпус 17",
        Telefon = "+7 (495) 937-81-95",
        Faks = "+7 (495) 789-45-02"
      });
// ООО "ГКК-Экспресс"    Соловьёв Г.В. 0279985778  910 440 6188  Пусто 15.09.2015  Фролова
    Add(new Kruzhka {
        KruzhkaID = 11,
        FirstName = "ООО \"ГКК-Экспресс\"",
        LastName = "ГКК-Экспресс",
        Buhgalter = "Фролова И.",
        DirectorSN = "Соловьёв Г.В.",
        IdName = "0279985778",
        Passwd = "9104406188",
        AddKruzhki = new AddKruzhkaList { },
        Comment = "чтение",
        ETokenPwd = "",
        HireDate = DateTime.Parse("15/9/2015"),
        UrEddress = "121609, Москва г, Осенний б-р, дом № 7, корпус 2",
        FactEddress = "125375, Москва г, Тверская ул, дом № 7",
        Telefon = "+7 (499) 962-81-95",
        Faks = "+7 (499) 962-81-95"
    });
// ООО "Фактор"    Паршиков А.И. 8174097537  8248700554  Пусто 14.11.2015  Муханова
    Add(new Kruzhka {
        KruzhkaID = 12,
        FirstName = "ООО \"Фактор\"",
        LastName = "Фактор",
        Buhgalter = "Муханова Е.",
        DirectorSN = "Паршиков А.И.",
        IdName = "8174097537",
        Passwd = "8248700554",
        AddKruzhki = new AddKruzhkaList { },
        Comment = "чтение",
        ETokenPwd = "",
        HireDate = DateTime.Parse("14/11/2015"),
        UrEddress = "109651, Москва г, Новочеркасский б-р, владение № 13А",
        FactEddress = "109651, Москва г, Новочеркасский б-р, владение № 13А",
        Telefon = "+7 (495) 937-81-95",
        Faks = "+7 (495) 937-81-95"
    });
      /*
            ООО "Аякс"  Братислава Голубева С.С. 3524977601  9104406188    29.09.2015  Фролова
      */
      Add(new Kruzhka {
        KruzhkaID = 13,
        FirstName = "ООО \"Аякс\"",
        LastName = "Аякс",
        Buhgalter = "Фролова И.",
        DirectorSN = directors[10].shortName, //"Голубева С.С.",
        IdName = "3524977601",
        Passwd = "9104406188",
        Director = directors[10],
        AddKruzhki = new AddKruzhkaList { 
            new AddKruzhka { 
                DirectorSN = directors[10].shortName /*"Голубева С.С."*/, ShortName= "Братислава",
            kr =new Kruzhka
            {
              FirstName = "ООО \"Братислава\"",
              LastName = "Братислава",
              DirectorSN = directors[10].shortName,Director = directors[10],
              UrEddress= "127006, Москва г, Петровка ул, дом № 32/1-3, корпус 2",
              FactEddress= "109341, Москва г, Братиславская ул, дом № 12",
              Telefon= "+7 (499) 962-81-95",
              Faks= "+7 (499) 722-28-50"
            }
            } },
        Comment = "чтение",
        ETokenPwd = "",
        HireDate = DateTime.Parse("29/9/2015"),
        UrEddress = "109341, Москва г, Люблинская ул, дом № 163/1",
        FactEddress = "109341, Москва г, Люблинская ул, дом № 163/1",
        Telefon = "+7 (499) 962-81-95",
        Faks = "+7 (499) 962-81-95"
      });
//    ООО "Очерк"   Васильев С.В. 5876340158  9104406188  Tel9104406188 11.03.2016  Фролова
      Add(new Kruzhka {
        KruzhkaID = 14,
        FirstName = "ООО \"Очерк\"",
        LastName = "Очерк",
        Buhgalter = "Фролова И.",
//        DirectorSN = " Васильев С.В.",
        DirectorSN = directors[4].shortName,
        Director = directors[4],

        IdName = "5876340158",
        Passwd = "9104406188",
        AddKruzhki = new AddKruzhkaList { },
        Comment = "чтение",
        ETokenPwd = "Tel9104406188",
        HireDate = DateTime.Parse("11/3/2016"),
        UrEddress = "109651, Москва г, Новочеркасский б-р, владение № 13А",
        FactEddress = "109651, Москва г, Новочеркасский б-р, владение № 13А",
        Telefon = "+7 (495) 937-81-95",
        Faks = "+7 (495) 937-81-95"
      });
//    ООО "Инфо"    Остапенко Е.В.  1107459826  910 440 6188  1234567890  10.02.2016  Белавина
      Add(new Kruzhka {
        KruzhkaID = 15,
        FirstName = "ООО \"Инфо\"",
        LastName = "Инфо",
        Buhgalter = "Белавина Е.",
//        DirectorSN = " Остапенко Е.В.",
        DirectorSN = directors[2].shortName,
        Director = directors[2],
        IdName = "1107459826",
        Passwd = "9104406188",
        AddKruzhki = new AddKruzhkaList { },
        Comment = "чтение",
        ETokenPwd = "1234567890",
        HireDate = DateTime.Parse("10/2/2016"),
        UrEddress = "107023, Москва г, Семеновская Б. ул, владение № 15А, строение 1",
        FactEddress = "107023, Москва г, Семеновская Б. ул, владение № 15А, строение 1",
        Telefon = "+7 (499) 962-81-95",
        Faks = "+7 (499) 962-81-95"
      });

      //      ООО "Инфо"  чтение Киевская Остапенко Е.В.  7113212218  9104406188  Пусто 10.07.2015  Белавина
      Add(new Kruzhka {
        KruzhkaID = 16,
        FirstName = "ООО \"Инфо\"",
        LastName = "Инфо К",
        Buhgalter = "Белавина Е.",
//        DirectorSN = " Остапенко Е.В.",
        DirectorSN = directors[2].shortName,
        Director = directors[2],
        IdName = "7113212218",
        Passwd = "9104406188",
        AddKruzhki = new AddKruzhkaList { },
        Comment = "чтение Киевская",
        ETokenPwd = "",
        HireDate = DateTime.Parse("16/6/2016"),
        UrEddress = "107023, Москва г, Семеновская Б. ул, владение № 15А, строение 1",
        FactEddress = "107023, Москва г, Семеновская Б. ул, владение № 15А, строение 1",
        Telefon = "+7 (499) 962-81-95",
        Faks = "+7 (499) 962-81-95"
      });
//      ИП "Шевчук Никита Владиславович"  чтение Шевчук Н.В. 1624494661  9104406188  Пусто 11.07.2015  Штец,
      Add(new Kruzhka {
        KruzhkaID = 17,
        FirstName = "ИП \"Шевчук Никита Владиславович\"",
        LastName = "Шевчук",
          //        DirectorSN = "Шевчук Н.В.",
        DirectorSN = directors[11].shortName,
        Director = directors[11],
        Buhgalter = "Штец О.",
        IdName = "1624494661",
        Passwd = "9104406188",
        AddKruzhki = new AddKruzhkaList { },
        Comment = "чтение",
        ETokenPwd = "",
        HireDate = DateTime.Parse("16/6/2016"),
        UrEddress = "119034, Москва г, Остоженка ул, дом № 20, кв.4",
        FactEddress = "119034, Москва г, Остоженка ул, дом № 20, кв.4",
        Telefon = "+7 (495) 937-81-95",
        Faks = "+7 (495) 937-81-95"
      });
//  ООО "Барк"  чтение Остапенко Е.В.  3511207833  9104406188  Пусто 13.10.2015  Белавина
      Add(new Kruzhka {
        KruzhkaID = 18,
        FirstName = "ООО \"Барк\"",
        LastName = "Барк",
        Buhgalter = "Белавина Е.",
//        DirectorSN = " Остапенко Е.В.",
        DirectorSN = directors[2].shortName,
        Director = directors[2],
        IdName = "3511207833",
        Passwd = "9104406188",
        AddKruzhki = new AddKruzhkaList { },
        Comment = "чтение",
        ETokenPwd = "",
        HireDate = DateTime.Parse("13/10/2015"),
        UrEddress = "127006, Москва г, Долгоруковская ул, дом № 40",
        FactEddress = "127006, Москва г, Долгоруковская ул, дом № 40",
        Telefon = "+499 (962) 81-95",
        Faks = "+499 (962) 81-95"
      });
//ООО "Овиком"  чтение Козодаев А.Н. 7814381158  910 440 6188  Пусто 28.10.2015  Солодухина
    Add(new Kruzhka {
        KruzhkaID = 19,
        FirstName = "ООО \"Овиком\"",
        LastName = "Овиком",
        Buhgalter ="Солодухина И.",
//        DirectorSN = "Козодаев А.Н.",
        DirectorSN = directors[12].shortName,
        Director = directors[12],
        IdName = "7814381158",
        Passwd = "9104406188",
        AddKruzhki = new AddKruzhkaList { },
        Comment = "чтение",
        ETokenPwd = "",
        HireDate = DateTime.Parse("28/10/2015"),
        UrEddress = "117452, Москва г, Внутренний проезд, дом № 8, корпус 9",
        FactEddress = "117418, Москва г, Гарибальди ул, дом № 25, корпус 1",
        Telefon = "+7 (495) 937-81-95",
        Faks = "+7 (495) 779-47-31"
});
//  ООО "ПродСнабТрест" рабочий Трунов А. 2917391595  9021409977  1234567890  11.03.2016  Белавина
      Add(new Kruzhka {
        KruzhkaID = 20,
        FirstName = "ООО \"ПродСнабТрест\"",
        LastName = "ПродСнабТрест",
        Buhgalter = "Белавина Е.",
//        DirectorSN = "Трунов А.",
        DirectorSN = directors[13].shortName,
        Director = directors[13],
        IdName = "2917391595",
        Passwd = "9021409977",
        AddKruzhki = new AddKruzhkaList { },
        Comment = "чтение",
        ETokenPwd = "1234567890",
        HireDate = DateTime.Parse("11/3/2016"),
        UrEddress = "109651, Москва г, Новочеркасский б-р, владение № 13А",
        FactEddress = "109651, Москва г, Новочеркасский б-р, владение № 13А",
        Telefon = "+7 (499) 962-81-95",
        Faks = "+7 (499) 962-81-95"
      });
//  ООО "РедДаймонд"  рабочий Китай-Город Кирьяков А.Ф. 8104903739  9104406188  1234567890  18.03.2016  Штец
      Add(new Kruzhka {
        KruzhkaID = 21,
        FirstName = "ООО \"РедДаймонд\"",
        LastName = "РедДаймонд",
        Buhgalter = "Штец О.",
//        DirectorSN = "Кирьяков А.Ф.",
        DirectorSN = directors[14].shortName,
        Director = directors[14],
        IdName = "8104903739",
        Passwd = "9104406188",
        AddKruzhki = new AddKruzhkaList { },
        Comment = "рабочий",
        ETokenPwd = "1234567890",
        HireDate = DateTime.Parse("18/3/2016"),
        UrEddress = "101000, Москва г, Мясницкая ул, дом № 22/2/5, строение 1",
        FactEddress = "101000, Москва г, Маросейка ул, дом № 2/15, строение 1",
        Telefon = "",
        Faks = ""
      });
//  ООО "Джайф" чтение, Земляной вал  Аймуранова Л.Ш. 0004307803 910 440 6188  1234567890  18.02.2016  Калинина
      Add(new Kruzhka {
        KruzhkaID = 23,
        FirstName = "ООО \"Джайф\"",
        LastName = "Джайф ЗВ",
        Buhgalter = "Калинина В.",
        DirectorSN = directors[6].shortName,Director = directors[6],
        IdName = "0004307803",
        Passwd = "9104406188",
        AddKruzhki = new AddKruzhkaList { },
        Comment = "чтение",
        ETokenPwd = "1234567890",
        HireDate = DateTime.Parse("18/2/2016"),
        UrEddress = "123100, Москва г, Шмитовский проезд, дом № 11А",
        FactEddress = "123100, Москва г, Чертановская ул, дом № 1/В, строение 1",
        Telefon = "+7 (499) 962-81-95",
        Faks = "+7 (499) 962-81-95"
      });
//  ООО "Митино"  чтение, Земляной вал  Остапенко Е.В.  0025810613  9104406188  Tel9104406188 18.02.2016  Калинина
      Add(new Kruzhka {
        KruzhkaID = 24,
        FirstName = "ООО \"Митино\"",
        LastName = "Митино ЗВ",
        Buhgalter = "Калинина В.",
//        DirectorSN = "Остапенко Е.В.",
        DirectorSN = directors[2].shortName,
        Director = directors[2],
        IdName = "0025810613",
        Passwd = "9104406188",
        AddKruzhki = new AddKruzhkaList { },
        Comment = "чтение",
        ETokenPwd = "Tel9104406188",
        HireDate = DateTime.Parse("18.02.2016"),
        UrEddress = "125581, Москва г, Митинская ул, дом № 25, корпус 4",
        FactEddress = "125581, Москва г, Митинская ул, дом № 25, корпус 4",
        Telefon = "",
        Faks = ""
      });
//  ООО "Мяско" чтение, Земляной вал  Голубева С.С. 6870996329  910 440 6188  1234567890  18.02.2016  Белавина
      Add(new Kruzhka {
        KruzhkaID = 25,
        FirstName = "ООО \"Мяско\"",
        LastName = "Мяско ЗВ",
        Buhgalter = "Белавина Е.",
//        DirectorSN = " Голубева С.С.",
        DirectorSN = directors[10].shortName,
        Director = directors[10],
        IdName = "6870996329",
        Passwd = "9104406188",
        AddKruzhki = new AddKruzhkaList { },
        Comment = "чтение",
        ETokenPwd = "1234567890",
        HireDate = DateTime.Parse("18.02.2016"),
        UrEddress = "101000, Москва г, Мясницкая ул, дом № 32, строение 1",
        FactEddress = "101000, Москва г, Мясницкая ул, дом № 32, строение 1",
        Telefon = "",
        Faks = ""
      });
      /*
            ООО "Измак" чтение, Земляной вал  Остапенко Е.В.  3590691554  9104406188  1234567890  18.02.2016  Калинина
            Антимоний Trust Антимоний 2184593546 123456 Штец
            */
      Add(new Kruzhka { 
        KruzhkaID = 26,
        FirstName = "ООО \"Измак\"",
        LastName = "Измак ЗВ",
        Buhgalter = "Калинина В.",
//        DirectorSN = "Остапенко Е.В.",
        DirectorSN = directors[2].shortName,
        Director = directors[2],
        IdName = "3590691554",
        Passwd = "9104406188",
        AddKruzhki = new AddKruzhkaList { },
        Comment = "чтение",
        ETokenPwd = "1234567890",
        HireDate = DateTime.Parse("18/02/2016"),
        UrEddress = "105187, Москва г, Измайловское ш, дом № 71, корпус 16",
        FactEddress = "105187, Москва г, Измайловское ш, дом № 71, корпус 16",
        Telefon = "",
        Faks = ""
      });
            Add(new Kruzhka
            {
                KruzhkaID = 27,
                FirstName = "ООО \"Электра\"",
                LastName = "Электра",
                Buhgalter = "Белавина Е.",
                DirectorSN = directors[12].shortName,
                Director = directors[12],
                IdName = "4273551543",
                Passwd = "9104406188",
                AddKruzhki = new AddKruzhkaList { },
                Comment = "чтение",
                ETokenPwd = "",
                HireDate = DateTime.Parse("02/06/2016"),
                UrEddress = "105064, Москва г, Сусальный Ниж. пер, владение № 5, строение 1",
                FactEddress = "125057, Москва г, Ленинградский проспект, д. 75Г, стр.1 ",
                Telefon = "+7 (499) 962-81-95",
                Faks = ""
            });
            /*
                  Add(new Kruzhka
                  {
                    KruzhkaID = 27,
                    FirstName = "Печать",
                    LastName = "ПечатьАкта",
                    Buhgalter = "Солодухина И.",
                    //        DirectorSN = "Фролов М.Б.",
                    DirectorSN = directors[0].shortName,
                    Director = directors[0],
                    IdName = "3312800687",
                    Passwd = "9104406188",
                    AddKruzhki = new AddKruzhkaList { },
                    Comment = "чтение",
                    ETokenPwd = "1234567890",
                    HireDate = DateTime.Parse("18/2/2016"),
                    UrEddress = "109044, Москва г, Крутицкий 3-й пер, дом № 13",
                    FactEddress = "109044, Москва г, Крутицкий 3-й пер, дом № 13",
                    Telefon = "+7 (499) 962-81-95",
                    Faks = ""
                  });
            */
        }

    }
    public class KruzhkaHierarchy : Tree<Kruzhka>
    {
      public KruzhkaHierarchy()
      {
        //root
        Data = new Kruzhka { KruzhkaID = 1, FirstName = "Jay", LastName = "Adams", HireDate = DateTime.Parse("1/1/2007") };
        //1st level
        Left = new Tree<Kruzhka>();
        Right = new Tree<Kruzhka>();
        Left.Data = new Kruzhka { KruzhkaID = 2, FirstName = "Adam", LastName = "Barr", HireDate = DateTime.Parse("15/3/2006") };
        Right.Data = new Kruzhka { KruzhkaID = 17, FirstName = "Karen", LastName = "Berge", HireDate = DateTime.Parse("17/6/2005") };
        //2nd level
        //left
        Left.Left = new Tree<Kruzhka>();
        Left.Right = new Tree<Kruzhka>();
        Left.Left.Data = new Kruzhka { KruzhkaID = 3, FirstName = "Scott", LastName = "Bishop", HireDate = DateTime.Parse("19/3/2000") };
        Left.Right.Data = new Kruzhka { KruzhkaID = 14, FirstName = "Jo", LastName = "Brown", HireDate = DateTime.Parse("17/7/2003") };
        //right
        Right.Left = new Tree<Kruzhka>();
        Right.Right = new Tree<Kruzhka>();
        Right.Left.Data = new Kruzhka { KruzhkaID = 18, FirstName = "David", LastName = "Campbell", HireDate = DateTime.Parse("13/9/2005") };
        Right.Right.Data = new Kruzhka { KruzhkaID = 19, FirstName = "Rob", LastName = "Caron", HireDate = DateTime.Parse("3/12/2002") };

        //3rd level
        //left
        //left.left
        Left.Left.Left = new Tree<Kruzhka>();
        Left.Left.Right = new Tree<Kruzhka>();
        Left.Left.Left.Data = new Kruzhka { KruzhkaID = 4, FirstName = "Jane", LastName = "Clayton", HireDate = DateTime.Parse("1/7/2008") };
        Left.Left.Right.Data = new Kruzhka { KruzhkaID = 7, FirstName = "Pat", LastName = "Coleman", HireDate = DateTime.Parse("7/1/2008") };
        //left.right
        Left.Right.Left = new Tree<Kruzhka>();
        Left.Right.Right = new Tree<Kruzhka>();
        Left.Right.Left.Data = new Kruzhka { KruzhkaID = 15, FirstName = "Aaron", LastName = "Con", HireDate = DateTime.Parse("1/11/2001") };
        Left.Right.Right.Data = new Kruzhka { KruzhkaID = 16, FirstName = "Don", LastName = "Hall", HireDate = DateTime.Parse("21/4/2006") };
        //4th level
        //left.left.left
        Left.Left.Left.Left = new Tree<Kruzhka>();
        Left.Left.Left.Right = new Tree<Kruzhka>();
        Left.Left.Left.Left.Data = new Kruzhka { KruzhkaID = 5, FirstName = "Joe", LastName = "Howard", HireDate = DateTime.Parse("19/7/2006") };
        Left.Left.Left.Right.Data = new Kruzhka { KruzhkaID = 6, FirstName = "Jim", LastName = "Kim", HireDate = DateTime.Parse("9/3/2001") };
        //left.left.right
        Left.Left.Right.Left = new Tree<Kruzhka>();
        Left.Left.Right.Right = new Tree<Kruzhka>();
        Left.Left.Right.Left.Data = new Kruzhka { KruzhkaID = 8, FirstName = "Eric", LastName = "Lang", HireDate = DateTime.Parse("15/7/2005") };
        Left.Left.Right.Right.Data = new Kruzhka { KruzhkaID = 11, FirstName = "Jose", LastName = "Lugo", HireDate = DateTime.Parse("6/8/2003") };

        Left.Left.Right.Left.Left = new Tree<Kruzhka>();
        Left.Left.Right.Left.Right = new Tree<Kruzhka>();
        Left.Left.Right.Left.Left.Data = new Kruzhka { KruzhkaID = 9, FirstName = "Nikki", LastName = "McCormick", HireDate = DateTime.Parse("18/5/2005") };
        Left.Left.Right.Left.Right.Data = new Kruzhka { KruzhkaID = 10, FirstName = "Susan", LastName = "Metters", HireDate = DateTime.Parse("5/8/2002") };
        Left.Left.Right.Right.Left = new Tree<Kruzhka>();
        Left.Left.Right.Right.Right = new Tree<Kruzhka>();
        Left.Left.Right.Right.Left.Data = new Kruzhka { KruzhkaID = 12, FirstName = "Linda", LastName = "MIctchell", HireDate = DateTime.Parse("1/10/2006") };
        Left.Left.Right.Right.Right.Data = new Kruzhka { KruzhkaID = 13, FirstName = "Kim", LastName = "Ralls", HireDate = DateTime.Parse("7/12/2002") };
      }
    }

    public class Tree<T>
    {
      public T Data; public Tree<T> Left, Right;
    }
  /*
  class DelegateCommand : ICommand
  {
    private Action<object> execute;
    private Func<object, bool> canExecute;
    public DelegateCommand(Action<object> execute)
    {
      this.execute = execute;
      this.canExecute = (x) => { return true; };
    }
    public DelegateCommand(Action<object> execute, Func<object, bool> canExecute)
    {
      this.execute = execute;
      this.canExecute = canExecute;
    }
    public bool CanExecute(object parameter)
    {
      return canExecute(parameter);
    }
    public event EventHandler CanExecuteChanged;
    public void RaiseCanExecuteChanged()
    {
      if (CanExecuteChanged != null)
      {
        CanExecuteChanged(this, EventArgs.Empty);
      }
    }
    public void Execute(object parameter)
    {
      execute(parameter);
    }
  }
  class InitializeSampleData
  {
    public static ObservableCollection<Kruzhka> GetData()
    {
      ObservableCollection<Kruzhka> Kruzhki = new ObservableCollection<Kruzhka>();
      Kruzhki.Add(new Kruzhka() { KruzhkaID = 1, LastName = "Allen", ReadOnly = true, Age = 25, Vip = true });
      Kruzhki.Add(new Kruzhka() { KruzhkaID = 2, LastName = "Carter", ReadOnly = true, Age = 26, Vip = true });
      Kruzhki.Add(new Kruzhka() { KruzhkaID = 3, LastName = "Rose", ReadOnly = true, Age = 30, Vip = false });
      Kruzhki.Add(new Kruzhka() { KruzhkaID = 4, LastName = "Daisy", ReadOnly = false, Age = 20, Vip = false });
      Kruzhki.Add(new Kruzhka() { KruzhkaID = 5, LastName = "Mary", ReadOnly = false, Age = 15, Vip = true });
      Kruzhki.Add(new Kruzhka() { KruzhkaID = 6, LastName = "Ray", ReadOnly = true, Age = 39, Vip = false });
      Kruzhki.Add(new Kruzhka() { KruzhkaID = 7, LastName = "Sherry", ReadOnly = false, Age = 55, Vip = false });
      Kruzhki.Add(new Kruzhka() { KruzhkaID = 8, LastName = "Lisa", ReadOnly = false, Age = 32, Vip = false });
      Kruzhki.Add(new Kruzhka() { KruzhkaID = 9, LastName = "Judy", ReadOnly = false, Age = 19, Vip = true });
      Kruzhki.Add(new Kruzhka() { KruzhkaID = 10, LastName = "Jack", ReadOnly = true, Age = 28, Vip = false });
      Kruzhki.Add(new Kruzhka() { KruzhkaID = 11, LastName = "May", ReadOnly = false, Age = 20, Vip = false });
      Kruzhki.Add(new Kruzhka() { KruzhkaID = 12, LastName = "Vivian", ReadOnly = false, Age = 32, Vip = true });
      return Kruzhki;
    }
  }
}
namespace CSTabbedWebBrowser.ViewModel2
{
  class KruzhkaViewModel : INotifyPropertyChanged
  {
    // This property will be bound to GridView's ItemsDataSource property for providing data
    private ObservableCollection<Kruzhka> m_customers;
    //    KruzhkaList List<Kruzhka>
    public ObservableCollection<Kruzhka> Kruzhki
    {
      get{return m_customers;}set{if(m_customers!=value){m_customers=value;OnPropertyChanged("Customers");}}
    }
    // This property will be bound to button's Command property for deleting item
    public ICommand DeleteCommand{set;get;}
    public KruzhkaViewModel()
    {
      // create a DeleteCommand instance
      this.DeleteCommand = new DelegateCommand(ExecuteDeleteCommand);
      // Get data source
      Kruzhki = InitializeSampleData.GetData();
    }
    void ExecuteDeleteCommand(object param)
    {
      int id = (Int32)param;
      Kruzhka cus = GetCustomerById(id);
      if (cus != null) { Kruzhki.Remove(cus); }
    }
    // Get the deleting item by Id property
    private Kruzhka GetCustomerById(int id)
    {
      try{return Kruzhki.First(x => x.KruzhkaID == id);}catch{return null;}
    }
    #region INotifyPropertyChanged
    public event PropertyChangedEventHandler PropertyChanged;
    private void OnPropertyChanged(string propertyName)
    {
      if(PropertyChanged!=null){PropertyChanged(this,new PropertyChangedEventArgs(propertyName));}
    }
    #endregion
  }
*/

}










/*
namespace CSUnvsAppCommandBindInDT
{
  class InitializeSampleData2
  {
    public static ObservableCollection<Customer> GetData()
    {
      ObservableCollection<Customer> Customers = new ObservableCollection<Customer>();

      Customers.Add(new Customer() { Id = 1, Name = "Allen", Sex = true, Age = 25, Vip = true });
      Customers.Add(new Customer() { Id = 2, Name = "Carter", Sex = true, Age = 26, Vip = true });
      Customers.Add(new Customer() { Id = 3, Name = "Rose", Sex = true, Age = 30, Vip = false });
      Customers.Add(new Customer() { Id = 4, Name = "Daisy", Sex = false, Age = 20, Vip = false });
      Customers.Add(new Customer() { Id = 5, Name = "Mary", Sex = false, Age = 15, Vip = true });
      Customers.Add(new Customer() { Id = 6, Name = "Ray", Sex = true, Age = 39, Vip = false });
      Customers.Add(new Customer() { Id = 7, Name = "Sherry", Sex = false, Age = 55, Vip = false });
      Customers.Add(new Customer() { Id = 8, Name = "Lisa", Sex = false, Age = 32, Vip = false });
      Customers.Add(new Customer() { Id = 9, Name = "Judy", Sex = false, Age = 19, Vip = true });
      Customers.Add(new Customer() { Id = 10, Name = "Jack", Sex = true, Age = 28, Vip = false });
      Customers.Add(new Customer() { Id = 11, Name = "May", Sex = false, Age = 20, Vip = false });
      Customers.Add(new Customer() { Id = 12, Name = "Vivian", Sex = false, Age = 32, Vip = true });

      return Customers;
    }
  }
}
  namespace CSUnvsAppCommandBindInDT.ViewModel
  {
  class DelegateCommand : ICommand
  {
    private Action<object> execute;
    private Func<object, bool> canExecute;
    public DelegateCommand(Action<object> execute)
    {
      this.execute = execute;
      this.canExecute = (x) => { return true; };
    }
    public DelegateCommand(Action<object> execute, Func<object, bool> canExecute)
    {
      this.execute = execute;
      this.canExecute = canExecute;
    }
    public bool CanExecute(object parameter)
    {
      return canExecute(parameter);
    }
    public event EventHandler CanExecuteChanged;
    public void RaiseCanExecuteChanged()
    {
      if (CanExecuteChanged != null)
      {
        CanExecuteChanged(this, EventArgs.Empty);
      }
    }
    public void Execute(object parameter)
    {
      execute(parameter);
    }
  }
  class CustomerViewModel : INotifyPropertyChanged
    {
      // This property will be bound to GridView's ItemsDataSource property for providing data
      private ObservableCollection<Customer> m_customers;
      public ObservableCollection<Customer> Customers
      {
        get { return m_customers; }
        set { if (m_customers != value) { m_customers = value; OnPropertyChanged("Customers"); } }
      }
      // This property will be bound to button's Command property for deleting item
      public ICommand DeleteCommand { set; get; }
      public CustomerViewModel()
      {
        // create a DeleteCommand instance
        this.DeleteCommand = new DelegateCommand(ExecuteDeleteCommand);
        // Get data source
        Customers = InitializeSampleData2.GetData();
      }
      void ExecuteDeleteCommand(object param)
      {
        int id = (Int32)param;
        Customer cus = GetCustomerById(id);
        if (cus != null) { Customers.Remove(cus); }
      }
      // Get the deleting item by Id property
      private Customer GetCustomerById(int id)
      {
        try { return Customers.First(x => x.Id == id); } catch { return null; }
      }
      #region INotifyPropertyChanged
      public event PropertyChangedEventHandler PropertyChanged;
      private void OnPropertyChanged(string propertyName)
      {
        if (PropertyChanged != null) { PropertyChanged(this, new PropertyChangedEventArgs(propertyName)); }
      }
      #endregion
    }
  }
  namespace CSUnvsAppCommandBindInDT.Model
  {
    public class Customer : INotifyPropertyChanged
    {
      #region private fields
      private int id;
      private string name;
      private bool sex;
      private int age;
      private bool vip;
      #endregion
      #region Properties
      public int Id { get { return id; } set { if (id != value) { id = value; OnNotifyPropertyChanged("Id"); } } }
      public string Name { get { return name; } set { if (name != value) { name = value; OnNotifyPropertyChanged("Name"); } } }
      public bool Sex { get { return sex; } set { if (sex != value) { sex = value; OnNotifyPropertyChanged("Sex"); } } }
      public int Age { get { return age; } set { if (age != value) { age = value; OnNotifyPropertyChanged("Age"); } } }
      public bool Vip { get { return vip; } set { if (vip != value) { vip = value; OnNotifyPropertyChanged("Vip"); } } }
      #endregion
      #region INotifyPropertyChanged Interface
      public event PropertyChangedEventHandler PropertyChanged;
      private void OnNotifyPropertyChanged(string propertyName)
      {
        if (PropertyChanged != null) { PropertyChanged(this, new PropertyChangedEventArgs(propertyName)); }
      }
      #endregion
    }

  }
*/
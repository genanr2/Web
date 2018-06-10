using System;
using System.Windows.Forms;
using System.Collections.Generic;
using System.Web.UI.WebControls;

//using CSTabbedWebBrowser.ViewModel2;

using CSTabbedWebBrowser.DynamicButton;
using System.Drawing;
using System.IO;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;
using System.Windows.Xps;
using SKYPE4COMLib;
using HelloBotCommunication;
using HelloBotCore;
using SkypeBotAdapterConsole.ChatSyncer;
namespace CSTabbedWebBrowser
{
    partial class MainForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        private static Skype skype = new Skype();
        private static HelloBot bot;
        private static SkypeChatSyncer chatSyncer;
        private static IDictionary<string, IChat> chats { get; set; }
        private static object _chatLocker = new object();

				private System.Windows.Forms.DataGrid dgDetail;
        private System.Windows.Forms.DataGrid PersonDetail;


    //        private CustomerViewModel m_cusViewModel;
    //        this.NavigationCacheMode = NavigationCacheMode.Required;
    //        m_cusViewModel = new ViewModel.CustomerViewModel();

    /// <summary>
    /// Clean up any resources being used.
    /// </summary>
    /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
    protected override void Dispose(bool disposing)
        {
            if(disposing &&(components!=null)){components.Dispose();}base.Dispose(disposing);
        }
//        void MainForm_Load()
//        {
//            webBrowserContainer.ObjectForScripting = this;
//            webBrowserContainer.DocumentText ="<html><head><script>" +
//                "function test(message) { alert(message); }" +"</script></head><body><button " +
//                "onclick=\"window.external.Test('called from script code')\">" +"call client code from script code</button>" + "</body></html>";
//        }

//        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
//      this.pnlHeader = new System.Windows.Forms.Panel();
      this.tbUrl = new System.Windows.Forms.TextBox();
      //      this.pnlNavigate = new System.Windows.Forms.Panel();
      //      this.lbUrl = new System.Windows.Forms.Label();
      //      this.btnRefresh = new System.Windows.Forms.Button();
      //      this.btnForward = new System.Windows.Forms.Button();
      //      this.btnBack = new System.Windows.Forms.Button();
      //      this.pnlTabCommand = new System.Windows.Forms.Panel();
      //      this.lbGo = new System.Windows.Forms.Label();
      //      this.chkEnableTab = new System.Windows.Forms.CheckBox();
      //      this.btnCloseTab = new System.Windows.Forms.Button();
      //      this.btnNewTab = new System.Windows.Forms.Button();
//      this.ButtonList=new List
      this.KruzhkaNetwork = new KruzhkaList();
			this.dgDetail = new System.Windows.Forms.DataGrid();
      this.PersonDetail = new System.Windows.Forms.DataGrid();

      KruzhkaNetwork.Sort(delegate (Kruzhka x, Kruzhka y)
      {
        if (x.LastName == null && y.LastName == null) return 0;
        else if (x.LastName == null) return -1;
        else if (y.LastName == null) return 1;
        else return x.LastName.CompareTo(y.LastName);
      });

      webBrowserContainer = new TabbedWebBrowserContainer();


      
//      this.pnlHeader.SuspendLayout();
//      this.pnlNavigate.SuspendLayout();
//      this.pnlTabCommand.SuspendLayout();

      SuspendLayout();
      // 
      // pnlHeader
      // 
/*
//      this.pnlHeader.Controls.Add(this.tbUrl);
      this.pnlHeader.Controls.Add(this.pnlNavigate);
      this.pnlHeader.Controls.Add(this.pnlTabCommand);
      this.pnlHeader.Dock = System.Windows.Forms.DockStyle.Top;
      this.pnlHeader.Location = new System.Drawing.Point(0, 0);
      this.pnlHeader.Name = "pnlHeader";
      this.pnlHeader.Size = new System.Drawing.Size(946, 30);
      this.pnlHeader.TabIndex = 0;
 */ 
/*
      // 
      // tbUrl
      // 
      this.tbUrl.Dock = System.Windows.Forms.DockStyle.Fill;
      this.tbUrl.Font = new System.Drawing.Font("Microsoft Sans Serif", 13F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
      this.tbUrl.Location = new System.Drawing.Point(193, 0);
      this.tbUrl.Name = "tbUrl";
      this.tbUrl.Size = new System.Drawing.Size(360, 27);
      this.tbUrl.TabIndex = 2;
      this.tbUrl.Text = "https://dboc.bankrs.ru/";
      this.tbUrl.KeyDown += new System.Windows.Forms.KeyEventHandler(this.tbUrl_KeyDown);
 */
      this.tbUrl.Text = "https://dboc.bankrs.ru/";
      // 
      // pnlNavigate
      // 
//      this.pnlNavigate.Controls.Add(this.lbUrl);
//      this.pnlNavigate.Controls.Add(this.btnRefresh);
//      this.pnlNavigate.Controls.Add(this.btnForward);
//      this.pnlNavigate.Controls.Add(this.btnBack);
//      this.pnlNavigate.Dock = System.Windows.Forms.DockStyle.Left;
//      this.pnlNavigate.Location = new System.Drawing.Point(0, 0);
//      this.pnlNavigate.Name = "pnlNavigate";
//      this.pnlNavigate.Size = new System.Drawing.Size(193, 30);
//      this.pnlNavigate.TabIndex = 0;

/*
      // 
      // lbUrl
      // 
      this.lbUrl.AutoSize = true;
      this.lbUrl.Location = new System.Drawing.Point(171, 8);
      this.lbUrl.Name = "lbUrl";
      this.lbUrl.Size = new System.Drawing.Size(20, 13);
      this.lbUrl.TabIndex = 1;
      this.lbUrl.Text = "Url";
*/

/*
      // 
      // btnRefresh
      // 
      this.btnRefresh.Location = new System.Drawing.Point(113, 4);
      this.btnRefresh.Name = "btnRefresh";
      this.btnRefresh.Size = new System.Drawing.Size(52, 23);
      this.btnRefresh.TabIndex = 0;
      this.btnRefresh.Text = "Refresh";
      this.btnRefresh.UseVisualStyleBackColor = true;
      this.btnRefresh.Click += new System.EventHandler(this.btnRefresh_Click);
      // 
      // btnForward
      // 
      this.btnForward.Location = new System.Drawing.Point(54, 4);
      this.btnForward.Name = "btnForward";
      this.btnForward.Size = new System.Drawing.Size(53, 23);
      this.btnForward.TabIndex = 0;
      this.btnForward.Text = "Forward";
      this.btnForward.UseVisualStyleBackColor = true;
      this.btnForward.Click += new System.EventHandler(this.btnForward_Click);
      // 
      // btnBack
      // 
      this.btnBack.Location = new System.Drawing.Point(3, 4);
      this.btnBack.Name = "btnBack";
      this.btnBack.Size = new System.Drawing.Size(45, 23);
      this.btnBack.TabIndex = 0;
      this.btnBack.Text = "Back";
      this.btnBack.UseVisualStyleBackColor = true;
      this.btnBack.Click += new System.EventHandler(this.btnBack_Click);
 */
/*
      // 
      // pnlTabCommand
      // 
      this.pnlTabCommand.Controls.Add(this.lbGo);
      this.pnlTabCommand.Controls.Add(this.chkEnableTab);
      this.pnlTabCommand.Controls.Add(this.btnCloseTab);
      this.pnlTabCommand.Controls.Add(this.btnNewTab);
      this.pnlTabCommand.Dock = System.Windows.Forms.DockStyle.Right;
      this.pnlTabCommand.Location = new System.Drawing.Point(553, 0);
      this.pnlTabCommand.Name = "pnlTabCommand";
      this.pnlTabCommand.Size = new System.Drawing.Size(393, 30);
      this.pnlTabCommand.TabIndex = 3;
*/

/*
      // 
      // lbGo
      // 
      this.lbGo.AutoSize = true;
      this.lbGo.Location = new System.Drawing.Point(4, 9);
      this.lbGo.Name = "lbGo";
      this.lbGo.Size = new System.Drawing.Size(137, 13);
      this.lbGo.TabIndex = 3;
      this.lbGo.Text = "Press Enter to visit the URL";
*/
/*
      // 
      // chkEnableTab
      // 
      this.chkEnableTab.AutoSize = true;
      this.chkEnableTab.Location = new System.Drawing.Point(147, 8);
      this.chkEnableTab.Name = "chkEnableTab";
      this.chkEnableTab.Size = new System.Drawing.Size(81, 17);
      this.chkEnableTab.TabIndex = 1;
      this.chkEnableTab.Text = "Enable Tab";
      this.chkEnableTab.UseVisualStyleBackColor = true;
      // 
      // btnCloseTab
      // 
      this.btnCloseTab.Location = new System.Drawing.Point(315, 4);
      this.btnCloseTab.Name = "btnCloseTab";
      this.btnCloseTab.Size = new System.Drawing.Size(75, 23);
      this.btnCloseTab.TabIndex = 0;
      this.btnCloseTab.Text = "Закр. вкладку";
      this.btnCloseTab.UseVisualStyleBackColor = true;
      this.btnCloseTab.Click += new System.EventHandler(this.btnCloseTab_Click);
      // 
      // btnNewTab
      // 
      this.btnNewTab.Location = new System.Drawing.Point(234, 5);
      this.btnNewTab.Name = "btnNewTab";
      this.btnNewTab.Size = new System.Drawing.Size(75, 23);
      this.btnNewTab.TabIndex = 0;
      this.btnNewTab.Text = "Вкладка";
      this.btnNewTab.UseVisualStyleBackColor = true;
      this.btnNewTab.Click += new System.EventHandler(this.btnNewTab_Click);
 */
      // Mjasko
/*
      this.Mjasko.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
      this.Mjasko.Location = new System.Drawing.Point(3, 1);
      this.Mjasko.Name = "Mjasko";
      this.Mjasko.Size = new System.Drawing.Size(75, 23);
      this.Mjasko.TabIndex = 2;
      this.Mjasko.Text = "Мяско";
      this.Mjasko.UseVisualStyleBackColor = true;
      this.Mjasko.Click += new System.EventHandler(this.Mjasko_Click);
      // Vost
      this.Vost.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
      this.Vost.Location = new System.Drawing.Point(3, 25);
      this.Vost.Name = "Vost";
      this.Vost.Size = new System.Drawing.Size(75, 23);
      this.Vost.TabIndex = 12;
      this.Vost.Text = "Вост";
      this.Vost.UseVisualStyleBackColor = true;
      this.Vost.Click += new System.EventHandler(this.Vost_Click);
      // Vost2
      this.Vost2.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
      this.Vost2.Location = new System.Drawing.Point(84, 25);
      this.Vost2.Name = "Vost2";
      this.Vost2.Size = new System.Drawing.Size(75, 23);
      this.Vost2.TabIndex = 13;
      this.Vost2.Text = "Вост2";
      this.Vost2.UseVisualStyleBackColor = true;
      this.Vost2.Click += new System.EventHandler(this.Vost2_Click);
*/
      /*
        1. ООО "АМЕГА" (КРУТИЦКАЯ)	м.Пролетарская	3-й Крутицкий переулок, д.13	109044, Москва, 3-й Крутицкий пер., д.13	8-495-676-05-89	Фролов Максим Борисович	Мещерякова (Олифиренко) Наталья	ИНН 7722500326   КПП 772201001   ОГРН 1037739975107 Р/с 40702810360140249901 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
        2. ООО "АМЕГА" (ЛАДОЖСКАЯ)	м.Бауманская	ул.Ладожская, д.5	109044, Москва, 3-й Крутицкий пер., д.13	8-495-632-20-03                8-495-632-20-10	Фролов Максим Борисович	Самхарадзе Марина	ИНН 7722500326   КПП 772201001   ОГРН 1037739975107 Р/с 40702810360140249901 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
        3. ООО "АЯКС"	м.Марьино	ул.Люблинская, д.163/1	109341, Москва, ул.Люблинская, д.163/1	8-495-347-98-29                8-495-345-72-19	Голубева Сильвия Степановна	Голубева Сильвия Степановна	ИНН 7734506379   КПП 772301001   ОГРН 1037789033270 Р/с 40702810160140260601 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119 
        4. ООО "БайКонУР"	м.Отрадное	ул.Декабристов, д.17	127490, Москва, ул.Декабристов, д.17	8-499-550-01-34    8-499-550-01-33	Тарасюк Оксана Вячеславовна	Тарасюк Оксана Вячеславовна	ИНН 7715648184   КПП 771501001   ОГРН 5077746748360 Р/с 40702810570140387501 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
        5. ООО "Братислава"	м.Братиславская	ул.Братиславская, д.12	127006, Москва, ул. Петровка д. 32/1-3 стр. 2	8-499-722-28-50                8-499-722-28-51	Голубева Сильвия Степановна	Голубева Сильвия Степановна	ИНН 7707564420   КПП 770701001   ОГРН 1057748726750 Р/с 40702810950140690601 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
        6. ООО "Варшавка"	м.Варшавская	Варшавское шоссе 83,стр.1	117556, Москва, Варшавское шоссе 83,стр.1	8-499-610-57-50                8-499-610-56-31	Васильев Сергей Владимирович	Аймуранова Лариса	ИНН 7726595760   КПП 772601001   ОГРН 1087746622545 Р/с 40702810090140089101 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
        7. ООО "ВоСт"	м.Водный Стадион	ул.Адмирала Макарова, д.45	127006, Москва, ул.Петровка, д.32/1-3, стр.2	8-499-747-68-05	Тимофеева Наталья Викторовна	Тимофеева Наталья Викторовна	ИНН 7707564300   КПП 770701001   ОГРН 1057748714396 Р/с 40702810950140691901 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
        8. ООО "Джайф"	м.Чертановская	ул.Чертановская, д.1/В, стр.1	123100, Москва, Шмитовский пр-д, д.11 А	8-495-316-66-55                8-495-316-67-45	Аймуранова Лариса Шамилевна	Аймуранова Лариса	ИНН 7703573720   КПП 770301001   ОГРН 1057749361592 Р/с 40702810060140294201 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
        9.. ООО "Книжка"		117624, г.Москва, бульвар Адмирала Ушакова, д.5	117624, г.Москва, бульвар Адмирала Ушакова, д.5		Остапенко Елена Валерьевна		ИНН/КПП 7709783435/772701001  ОГРН 1087746340725 р/с 40702810980140616901 к/с 30101810600000000119 БИК 044583119 в ОАО «Промсвязьбанк» г.Москва
        9. ООО "Крылат"	м.Крылатское	Осенний бульвар, д.7, корп.2	127055, Москва, ул.Новослободская, д.54/56	8-495-412-10-83                8-495-412-10-01	Остапенко Елена Валерьевна	Тарасюк Оксана Вячеславовна	ИНН 7707597225   КПП 770701001   ОГРН 5067746035033 Р/с 40702810160140420001 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      10. ООО "Курсор"	м.Курская	Нижний Сусальный пер., д.5, стр.1	111116, Москва, Энергетический проезд д. 3, стр. 1	8-495-785-62-85                8-495-785-62-87	Остапенко Елена Валерьевна	Самхарадзе Марина	ИНН 7722559993   КПП 772201001   ОГРН 1057748818600 Р/с 40702810860140007601 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      11. ООО "ЛесКо"	м.Алтуфьево	ул.Лескова, д.3 Г	127349, Москва, ул.Лескова, д.3 Г	8-499-909-09-25	Васильев Сергей Владимирович	Тарасюк Оксана Вячеславовна	ИНН 7715700885   КПП 771501001   ОГРН 1087746622534 Р/с 40702810490140090101  в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      12. ООО "Локо"	м.Черкизовская 	ул.Б.Черкизовская, д.125 Б	127006, Москва, ул.Петровка, д.32/1-3, стр.2	8-499-161-86-85                8-499-161-26-51	Амуров Николай Николаевич	Золотухина Ксения	ИНН 7707564325   КПП 770701001   ОГРН 1057748714946 Р/с 40702810950140694801 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      13. ООО "ЛюксСтар"	м.Кузнецкий Мост	ул.Пушечная, д.9/6, стр.1	107031, Москва, ул.Пушечная, д.9/6, стр.1	8-495-623-61-58	Аль-Джобури Самир Фейсал	Гришанкова Анна	ИНН 7701827338   КПП 770201001   ОГРН 1097746025904 Р/с 40702810000710859201 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      14. ООО "Маркетсофт"	м.Кузнецкий Мост (2)	ул.Большая Лубянка, д.13/16	107031, Москва, ул.Б.Лубянка, д.13/16, стр.1	214-41-16              214-41-15	Остапенко Елена Валерьевна	Гришанкова Анна	ИНН 7707675882   КПП 770201001   ОГРН 5087746157835 Р/с 40702810410710632801 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      15. ООО "МАТИЗ"	м.Митино	Пятницкое шоссе, д.39	103473, Москва, Самотечный 3-й пер., д.11, стр.1	8-495-754-70-40	Кабачек Евгения Сергеевна	Кабачек Евгения	ИНН 7707585491   КПП 770701001   ОГРН 1067746531610 Р/с 40702810150140753801 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      16. ООО "Мастер-Фуд Остоженка"	м.Парк Культуры	ул.Остоженка, д.40/1	119034, Москва, ул.Остоженка, д.40/1	8-499-245-71-51                8-499-246-61-07	Остапенко Елена Валерьевна с 22.01.10	Моралес Рамос Луис Мигель	ИНН 7704685924    КПП 770401001 ОГРН 1087746502711 Р/с  40702810230710548201 к/с №30101810600000000119 БИК 044583119, в ОАО «Промсвязьбанк» г.Москва    
      17. ООО "МИСТРАЛЬ"	м.Площадь Революции (Никольская)	ул.Никольская, д.15, стр.1	103030, Москва, ул.Долгоруковская, д.29, стр.1	8-495-710-71-99                8-919-772-48-49	Шахов Дмитрий Дмитриевич	Великоцкий Максим	ИНН 7707555345   КПП 770701001   ОГРН 1057747561464 Р/с 40702810750140717001 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      18. ООО "Нортима"	м.Чистые Пруды	ул.Мясницкая, д.32/1, стр.1	113149, Москва, Внутренний пр-д, д.8, стр.9	8-495-644-39-36                8-495-644-39-35	Фролов Максим Борисович	Суханова Наталья	ИНН 7727228890   КПП 772701001   ОГРН 1027727010640 Р/с 40702810660140587101 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      19. ООО "Овиком"	м.Новые Черемушки 	ул.Гарибальди, д.25, к.1	113149, Москва, Внутренний пр-д, д.8, стр.9	8-495-779-47-31                8-495-779-47-80	Рудко Андрей Михайлович	Жебанова Ольга	ИНН 7727240456   КПП 772701001   ОГРН 1037727009143 Р/с 40702810760140330601 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      20. ООО "Профи"	м.Коньково	ул.Профсоюзная, д.128, к.2	127006, Москва, ул.Петровка, д.32/1-3, стр.2	8-495-337-15-55                8-495-338-70-30	Рудко Андрей Михайлович	Масляшова Евгения	ИНН 7707581419   КПП 770701001   ОГРН 1067746412601 Р/с 40702810960140041101 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      21. ООО "РИКИ-дизайн"	м.Багратионовская	ул.Барклая, д.9/2 стр.3	121096, Москва, ул.Барклая, д.9/2 стр.3	8-499-148-75-69                8-499-730-76-46	Федоров Георгий Алексеевич		ИНН 7730137836   КПП 773001001   ОГРН 1027700352020 Р/с 40702810760140400201 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      22. ООО "Родон"	м.Электрозаводская	ул.Б.Семеновская, д.32, стр.3	127006, Москва. ул.Петровка, д.32/1-3, стр.2	8-499-409-34-22 	Суханова Наталья Алексеевна	Сапронова Мария	ИНН 7707564580   КПП 770701001   ОГРН 1057748750950 Р/с 40702810550140826901 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      23. ООО "Рост"	г.Ногинск	ул.Комсомольская, д.28	142400, Моск.обл., г.Ногинск, ул.Комсомольская, д.28	8-909-935-14-80	Шапина Наталья Анатольевна	Токарева Елена	ИНН 5031082838   КПП 503101001   ОГРН 1085031059409 Р/с 40702810140280002235 в "СБЕРБАНК РОССИИ" ОАО г. Москва   К/с 30101810400000000225   БИК 044525225
      24. ООО "Сема"	м.Семеновская	Семеновская пл., д.7, стр.17	105318, Москва, Семеновская пл., д.7, стр.17	8-495-789-45-02              8-495-789-45-10	Сапронова Мария Николаевна	Сапронова Мария	ИНН 7719730873     КПП 771901001     ОГРН 1097746543290 Р/с 40702810520710430401 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      25. ООО "СИМВОЛ"	г.Зеленоград 	пл.Юности, д.2, стр.1	124305, Москва, Площадь Юности, д.2	8-499-735-26-89	Павлова Ольга Николаевна	Павлова Ольга	ИНН 7702505206   КПП 773501001   ОГРН 1037739929083 Р/с 40702810450140897001 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      26. ООО "Слобода"	м.Новослободская	ул.Долгоруковская, д.40	127006, Москва, ул.Долгоруковская, д.40	8-499-973-56-26                8-499-973-56-27	Трунов Альберт Валерьевич	Моралес Рамос Луис Мигель	ИНН 7707627945   КПП 770701001   ОГРН 5077746823336 Р/с 40702810870140439201 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      27. ООО "Сокол"	м.Сокол	Ленинградский проспект, д.75 Г, стр.1	125057, Москва, Ленинградский проспект, д.75 Г, стр.1	226-33-41	Остапенко Елена Валерьевна	Тимофеева Наталья Викторовна	ИНН 7743740992   КПП 774301001   ОГРН 1097746227391 Р/с 40702810810710412401 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      28. ООО "Стройдекор-СК"	м.Партизанская	Измайловское шоссе, д.71, стр.16	127562, Москва, Алтуфьевское ш., д.28	8-499-166-45-79        8-499-166-45-64	Крючков Денис Валентинович	Токарева Елена	ИНН 7715288735   КПП 771501001   ОГРН 1037700013801 Р/с 40702810050140969601 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      29. ООО "Таганка"	м.Таганская	ул.Ниж.Радищевская, д.10, стр.1	109240, Москва, ул.Ниж.Радищевская, д.10, стр.1	8-495-915-62-06                8-495-915-62-83	Фролов Максим Борисович	Кирюкова Анна	ИНН 7705893860     КПП 770501001     ОГРН 1097746437480 Р/с   40702810020710105401 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      30. ООО "ТЕХНО КРАФТ ЛИТ"	м.Баррикадная	Кудринская пл., д.1, стр.1	123242, Москва, Кудринская пл., д.1, стр.2	8-499-252-10-68                8-499-252-05-64	Рудко Андрей Михайлович	Моралес Рамос Луис Мигель, Мария	ИНН 7725112272   КПП 770301001   ОГРН 1037700019367 Р/с 40702810760140007701 в в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      31. ООО "Тушино"	м.Тушинская	ул.Тушинская, д.17	127006, Москва, ул.Долгоруковская, д.40	8-495-663-37-43	Васильев Сергей Владимирович	Павлова Ольга	ИНН 7707664520   КПП 770701001   ОГРН 1087746622567 Р/с 40702810690140090901 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      32. ООО "ФАЗЕНДА"	м.Тургеневская	ул.Большая Лубянка, д.30/2, стр.1	103031, Москва, ул.Кузнецкий Мост, д.9/10, стр.1	8-495-624-44-97                8-495-625-13-74	Моралес Рамос Луис Мигель	Суханова Наталья	ИНН 7702351411   КПП 770201001   ОГРН 1037702020751 Р/с 40702810570140422301 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      33. ЗАО "ЭСТЕЙШН"	м.Лубянка	ул.Мясницкая, д.13, стр.1	127254, Москва, Огородный пр-д, д.5, стр.7	8-495-621-15-22                8-495-621-16-26	Жебанова Ольга  Александровна	Суханова Наталья	ИНН 7714275420   КПП 771501001   ОГРН 1027714004361 Р/с 40702810370140872601 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      34. ООО "Юпорт"	м.Кожуховская	ул.Южнопортовая, д.22, стр.10	127055, Москва, ул.Новослободская, д.54/56	8-495-679-27-62	Голубева Сильвия Степановна	Мещерякова (Олифиренко) Наталья	ИНН 7707597264    КПП 770701001   ОГРН 5067746035550 Р/с 40702810860140302801 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      ПРОЧИЕ ЮРИДИЧЕСКИЕ ЛИЦА							
      ООО "ГАЗГОЛЬДЕР-РЕКОРД"			103064, Москва, Нижний Сусальный пер., д.5, стр.1		Булавинов Юрий Михайлович		ИНН 7709621836    КПП 770901001   ОГРН 1057747603760 Р/с 40702810950140816401 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      ООО "Персона-Фуд"			115093, Москва, ул.Люсиновская, д.36/50		Запевалин Роман Васильевич		ИНН 7705697640   КПП 770501001   ОГРН 1057748964646 Р/с 40702810650140987601 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      ООО "Варгас"			125047, Москва, ул.Лесная, д.1/2		Рудко Андрей Михайлович		ИНН 7710606776   КПП 771001001   ОГРН 1057748962050 Р/с 40702810260140772701 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      ООО "Эльза"			107023, Москва, ул.Б.Семеновская, д.32, стр.3		Бурмистров Дмитрий Николаевич		ИНН 7719683983   КПП 771901001   ОГРН 1087746713010 Р/с 40702810390140277901 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      ООО "Фрегат"			125212, Москва, ул.Адмирала Макарова, д.45		Остапенко Елена Валерьевна		ИНН 7702562405   КПП 774301001   ОГРН 1057746806875 Р/с 40702810800710861101 в ОАО "Промсвязьбанк" г. Москва   К/с 30101810600000000119   БИК 044583119
      */
      // 
      // webBrowserContainer
      this.webBrowserContainer.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
      this.webBrowserContainer.AutoScroll = true;
      this.webBrowserContainer.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
      this.webBrowserContainer.Location = new System.Drawing.Point(3, 93);
      this.webBrowserContainer.Name = "webBrowserContainer";
      this.webBrowserContainer.Size = new System.Drawing.Size(931, 633);
      this.webBrowserContainer.TabIndex = 1;
      // MainForm
      this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
      this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
      this.ClientSize = new System.Drawing.Size(946, 738);

      // Varshavka
      //      this.Varshavka.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
      //      this.Varshavka.Location = new System.Drawing.Point(737, 1);
      //      this.Varshavka.Name = "Varshavka";
      //      this.Varshavka.Size = new System.Drawing.Size(78, 23);
      //      this.Varshavka.TabIndex = 11;
      //      this.Varshavka.Text = "Варшавка";
      //      this.Varshavka.UseVisualStyleBackColor = true;
      //      this.Varshavka.Click += new System.EventHandler(this.Varshavka_Click);
      //      this.Varshavka.AccessibleDescription = "\"ООО\" Варшавка";
      //      KruzhkaList
//      System.Drawing.Point pp = new System.Drawing.Point(3, 1);
      int hor = 3;
      int vert = 1;
      int tabInd = 2;
      foreach (Kruzhka kr in KruzhkaNetwork)
      {
        KruzhkaButton b = new KruzhkaButton();
        b.FlatStyle = FlatStyle.Flat;
        b.FlatStyle = FlatStyle.Popup;
        b.Location = new Point(hor, vert);
        b.Name = kr.LastName;
        b.Size = new Size(78, 23);
        b.TabIndex = tabInd++;
        b.Text = kr.LastName;
        b.UseVisualStyleBackColor = true;
        b.Click += new EventHandler(Varshavka_Click);
        b.MouseHover += new EventHandler(KruzkaMouseHover);
        b.MouseEnter += new EventHandler(KruzkaMouseDown);
        b.AccessibleDescription = kr.FirstName;
        b.KruzhkaId = kr;
        DateTime d = DateTime.Now;
        if ((kr.HireDate - d).TotalDays <= 30)
        {
          Graphics g = b.CreateGraphics();
          Size preferredSize = g.MeasureString(kr.FirstName, b.Font).ToSize();
          Padding p=new Padding(5);
          Bitmap s=new Bitmap(16, 16);
          string text = string.Empty;
          text += (kr.HireDate - d).Days;
          Bitmap bitmap = new Bitmap(1, 1);
          Font font = new Font("Arial", 11, FontStyle.Bold, GraphicsUnit.Pixel);
          Graphics graphics = Graphics.FromImage(bitmap);
          int width = (int)graphics.MeasureString(text, font).Width;
          int height = (int)graphics.MeasureString(text, font).Height;
          bitmap = new Bitmap(bitmap, new Size(width, height));
          graphics = Graphics.FromImage(bitmap);
          graphics.Clear(Color.Aquamarine);
          Pen blackPen = new Pen(Color.Tomato, 3);
          Rectangle rect = new Rectangle(0, 0, 12, 12);
          // Create start and sweep angles.
          float startAngle = 90.0F;
          float sweepAngle = 145.0F;
          graphics.TextRenderingHint =System.Drawing.Text.TextRenderingHint.SingleBitPerPixel;
          graphics.SmoothingMode = SmoothingMode.AntiAlias;
          graphics.TextContrast = 12;
          graphics.DrawString(text, font, new SolidBrush(Color.FromArgb(128,216, 81, 128)), 0, 0);
          graphics.Flush();
          graphics.Dispose();
          b.BackgroundImage = bitmap;
          b.BackgroundImageLayout = ImageLayout.None;
          /*    // Retrieve the graphics object.
              Graphics formGraphics = e.Graphics;
              // Declare a new font.
              Font myFont = new Font(FontFamily.GenericSansSerif, 20, FontStyle.Regular);
              // Set the TextRenderingHint property.formGraphics.TextRenderingHint = System.Drawing.Text.TextRenderingHint.SingleBitPerPixel;
              // Draw the string.
              formGraphics.DrawString("Hello World", myFont, Brushes.Firebrick, 20.0F, 20.0F);
              // Change the TextRenderingHint property.
              formGraphics.TextRenderingHint = System.Drawing.Text.TextRenderingHint.AntiAliasGridFit;
              // Draw the string again.
              formGraphics.DrawString("Hello World", myFont, Brushes.Firebrick, 20.0F, 60.0F);
              // Set the text contrast to a high-contrast setting.
              formGraphics.TextContrast = 0;
              // Draw the string.
              formGraphics.DrawString("Hello World", myFont, Brushes.DodgerBlue, 20.0F, 100.0F);
              // Set the text contrast to a low-contrast setting.
              formGraphics.TextContrast = 12;
              // Draw the string again.
              formGraphics.DrawString("Hello World", myFont, Brushes.DodgerBlue, 20.0F, 140.0F);

              // Dispose of the font object.
              myFont.Dispose();
          */
          /*


                    List<string> splitBytes = new List<string>();
                    string byteString = "";
                    foreach (var chr in "12")
                    {
                      byteString += chr;
                      if (byteString.Length == 3){splitBytes.Add(byteString);byteString = "";}
                    }
                    var pixelCount = splitBytes.Count / 3;
                    var numRows = pixelCount / 4;
                    var numCols = pixelCount / 4;
                    Bitmap map = new Bitmap(numRows, numCols);
          */

          /*
                    Bitmap bmpReturn = null;
                    string base64String = "12";
                    MemoryStream memoryStream = new MemoryStream();
                    byte[] byteBuffer = memoryStream.ToArray();
                    byte[] byteBuffer2 = Convert.FromBase64String(base64String);


                      string base64String = string.Empty;
                      MemoryStream memoryStream = new MemoryStream();
                      bmp.Save(memoryStream, imageFormat);
                      memoryStream.Position = 0;
                      byte[] byteBuffer = memoryStream.ToArray();

                    MemoryStream memoryStream2 = new MemoryStream(byteBuffer);
                    memoryStream.Position = 0;
                    bmpReturn = (Bitmap)Bitmap.FromStream(memoryStream);
                    memoryStream.Close();memoryStream = null;byteBuffer = null;
          */
          //          String sc = "ssadf";
          //          sc.


          //          Bitmap ss = new Bitmap()

          //          s.
          //          b.Padding
          // Pad the text and resize the control.
          b.ClientSize = new Size(b.Width + (b.Padding.Size.Width * 2),b.Height + (b.Padding.Size.Height * 2));
//          g.DrawPie
//          b.ClientSize = new Size(preferredSize.Width + (2 * 2), preferredSize.Height + (2 * 2));

          // Create string to draw.
          //          String drawString = "Sample Text";
                    // Create font and brush.
//          Font drawFont = new Font("Arial", 32);
//          SolidBrush drawBrush = new SolidBrush(Color.Black);
                    // Create point for upper-left corner of drawing.
          //          PointF drawPoint = new PointF(150.0F, 150.0F);
//          Point drawPoint = new Point(b.Width-50, 10);
                    // Draw string to screen.
//          g.DrawString("12erew ew rew rewr ewr ew rew rewr ewr \n df df d fweewr e dsf ewrt we we rt", b.Font, drawBrush, drawPoint);
          //          b.dr

          //          g.DrawString("15", System.Drawing.Font("Arial", 10));
          //          b.BackgroundImage = System.Drawing.Image.FromFile("../CSTabbedWebBrowser/Icons/HOURGLASS.png"); //Calender 31 Day
          //          System.Drawing.Image.FromStream.
/*
          b.BackgroundImage = bmpReturn;
          b.BackgroundImageLayout = ImageLayout.None;
//          b.BindingContext//= ImageLayout.None;
*/
        }
        else if ((kr.HireDate - d).TotalDays <= 45){b.BackColor = System.Drawing.Color.Aqua;}else if ((kr.HireDate-d).TotalDays<=60){b.BackColor = System.Drawing.Color.LightPink;}
        this.Controls.Add(b);
        hor += 81;
        if(hor>900){hor = 3;vert += 24;}
        List<String> names = new List<String>();
//        names.Add("Bruce");names.Add("Alfred");names.Add("Tim");names.Add("Richard");
        string nnn = kr.HireDate.ToString("d.M.yyyy"); // DateTime
        nnn += "\n" + kr.FirstName + "\nОф. бухгалтер " + kr.Buhgalter + "\nДиректор " + kr.DirectorSN + "\nИмя: " + kr.IdName + "\nПароль : " + kr.Passwd;
//        nnn += "\nОф. бухгалтер "+kr.Buhgalter;nnn += "\nДиректор " + kr.Director;nnn += "\nИмя: " + kr.IdName;nnn += "\nПароль : " + kr.Passwd;
        string adds = "";
        int a = 0;
        foreach(AddKruzhka addKr in kr.AddKruzhki)
        {
          adds += addKr.ShortName+ " ";
          if (a > 4) { adds += "\n\t "; a = 0; }
          a++;
        }
        nnn += "\nЕщё:\t" + adds; nnn += "\nТип " + kr.Comment; nnn += "\nЕТокен " + kr.ETokenPwd; ToolTip tt = new ToolTip(); tt.SetToolTip(b, nnn);
      } // foreach (Kruzhka kr in KruzhkaNetwork)
      hor += 81;
      if (hor > 900) { hor = 3; vert += 24; }
      KruzhkaButton bb = new KruzhkaButton();
      bb.FlatStyle = FlatStyle.Flat;
      bb.FlatStyle = FlatStyle.Popup;
      bb.Location = new Point(hor, vert);
      bb.Name = "Print";
      bb.Size = new Size(78, 23);
      bb.TabIndex = tabInd++;
      bb.Text = "Кружки";
      bb.UseVisualStyleBackColor = true;
//      bb.Image = Properties.Resources.Chat;
      System.Globalization.CultureInfo rcc = global::System.Globalization.CultureInfo.CurrentCulture;
      bb.Click += new EventHandler(Print_Click);
      bb.MouseHover += new EventHandler(PrintMouseHover);
      bb.AccessibleDescription = "Кружки";
      this.Controls.Add(bb);

			hor += 81;
			if (hor > 900) { hor = 3; vert += 24; }
			KruzhkaButton bbb = new KruzhkaButton();
			bbb.FlatStyle = FlatStyle.Flat;
			bbb.FlatStyle = FlatStyle.Popup;
			bbb.Location = new Point(hor, vert);
			bbb.Name = "Print2";
			bbb.Size = new Size(78, 23);
			bbb.TabIndex = tabInd++;
			bbb.Text = "Директоры";
			bbb.UseVisualStyleBackColor = true;
			//      bb.Image = Properties.Resources.Chat;
			System.Globalization.CultureInfo rccc = global::System.Globalization.CultureInfo.CurrentCulture;
			bbb.Click += new EventHandler(Print2_Click);
			bbb.MouseHover += new EventHandler(Print2MouseHover);
			bbb.AccessibleDescription = "Директоры";
			this.Controls.Add(bbb);

      hor += 81;
      if (hor > 900) { hor = 3; vert += 24; }
      KruzhkaButton bbbb = new KruzhkaButton
      {
        FlatStyle = FlatStyle.Flat & FlatStyle.Popup,Location = new Point(hor, vert),Name = "Print3",
        Size = new Size(78, 23),TabIndex = tabInd++,Text = "Ключи",AccessibleDescription = "Ключи",
        UseVisualStyleBackColor = true
      };
      //      bb.Image = Properties.Resources.Chat;
//      System.Globalization.CultureInfo rccс = global::System.Globalization.CultureInfo.CurrentCulture;
      bbbb.Click += new EventHandler(Print3_Click);
//      bbbb.MouseHover += new EventHandler(PrintMouseHover);
//      bbbb.AccessibleDescription = "Ключи";
      this.Controls.Add(bbbb);


      hor += 81;
      if (hor > 900) { hor = 3; vert += 24; }
      KruzhkaButton bbbb2 = new KruzhkaButton {FlatStyle = FlatStyle.Flat & FlatStyle.Popup, Location = new Point(hor, vert), Name = "Print4",
        Size = new Size(78, 23),TabIndex = tabInd++,Text = "Ключи 2",AccessibleDescription = "Ключи 2",UseVisualStyleBackColor = true
//        Click += new EventHandler(Print4_Click)
    };
      //      bb.Image = Properties.Resources.Chat;
//      System.Globalization.CultureInfo rccс2 = global::System.Globalization.CultureInfo.CurrentCulture;
      bbbb2.Click += new EventHandler(Print4_Click);
      //      bbbb.MouseHover += new EventHandler(PrintMouseHover);
//      bbbb2.AccessibleDescription = "Ключи 2";
      Controls.Add(bbbb2);
      //      b.KruzhkaId = kr;

      //      DynamicImageButton
      DynamicImageButton db = new DynamicImageButton();
      //      db.Focusable = true;
      //      db.
      //      db.Height = 100;
      //      db.Width = 100;
      //      db.ToolTip = "dsf d fdf df";
      //      db.IconImageUri = "icons/CHAT.png";Calender 31 Day
      //      db.Content = "Chat";
      //      this.Controls.Add(db);
      //      db.st
      //      System.Windows.Controls.Primitives.ButtonBase dbb = new System.Windows.Controls.Primitives.ButtonBase();
      System.Windows.Controls.Primitives.ToggleButton tb = new System.Windows.Controls.Primitives.ToggleButton();
//      dbb.ri
      //      DropShadowEffect
      //(UIElement.Effect).(DropShadowEffect.BlurRadius)
      //      System.Web.UI.WebControls)
      //      db.dur
      //      db.
      //      db.IsMouseOver = true;

      //      db.
      //      this.Controls.Add(db);
      //      db.Foreground = System.Windows.Media.Brush()
      /*
            System.Windows.Forms.Button bbb= new System.Windows.Forms.Button();//Измак ЗВ
            bbb.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            bbb.Location = new System.Drawing.Point(819, 1);
            bbb.Name = "Izmak";
            bbb.Size = new System.Drawing.Size(78, 23);
            bbb.TabIndex = 14;
            bbb.Text = "Измак ЗВ";
            bbb.UseVisualStyleBackColor = true;
            bbb.Click += new System.EventHandler(this.Varshavka_Click);
            bbb.AccessibleDescription = "\"ООО\" Измак";
            this.Controls.Add(bbb);
      */

      /*
            this.Controls.Add(this.Factor);
            this.Controls.Add(this.Ajaks);
            this.Controls.Add(this.Ocherk);
            this.Controls.Add(this.Info);
            this.Controls.Add(this.Bark);
            this.Controls.Add(this.Ovikom);
            this.Controls.Add(this.Mjasko);
            this.Controls.Add(this.Baiconur);
            this.Controls.Add(this.Bratislava);
            this.Controls.Add(this.Varshavka);

            this.Controls.Add(this.Vost);
            this.Controls.Add(this.Vost2);
      */

      Controls.Add(this.webBrowserContainer);
//      this.Controls.Add(this.pnlHeader);
      Name = "MainForm";
      Text = "TabbedWebBrowser";
//      this.pnlHeader.ResumeLayout(false);
//      this.pnlHeader.PerformLayout();
//      this.pnlNavigate.ResumeLayout(false);
//      this.pnlNavigate.PerformLayout();
//      this.pnlTabCommand.ResumeLayout(false);
//      this.pnlTabCommand.PerformLayout();
      ResumeLayout(false);

        }

//        #endregion

//        private System.Windows.Forms.Panel pnlHeader;
        private System.Windows.Forms.TextBox tbUrl;
//        XpsDocumentWriter _xpsDocument = new XpsDocument(containerName, FileAccess.ReadWrite);
        const string packageWithPrintTicketName = "XpsDocument-withPrintTicket.xps";
        const string packageName = "XpsDocument.xps"; // (without PrintTicket)

//        private System.Windows.Forms.Panel pnlNavigate;
//        private System.Windows.Forms.Label lbUrl;
//        private System.Windows.Forms.Button btnRefresh;
//        private System.Windows.Forms.Button btnForward;
//        private System.Windows.Forms.Button btnBack;
        public TabbedWebBrowserContainer webBrowserContainer;
        public string currentButton;
    //        private System.Windows.Forms.Panel pnlTabCommand;
    //        private System.Windows.Forms.Button btnCloseTab;
    //        private System.Windows.Forms.Button btnNewTab;
    //        private System.Windows.Forms.CheckBox chkEnableTab;
    //        internal System.Windows.Forms.Label lbGo;
        KruzhkaList KruzhkaNetwork;
        private object  ButtonList;
    
  }
}


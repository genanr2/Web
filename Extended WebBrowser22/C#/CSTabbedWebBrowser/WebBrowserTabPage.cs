/****************************** Module Header ******************************\
* Module Name:  WebBrowserTabPage.cs
* Project:	    CSTabbedWebBrowser
* Copyright (c) Microsoft Corporation.
* This class inherits the the System.Windows.Forms.TabPage class and contains a WebBrowserEx property. An instance of this class could be add to a tab control directly.
* It exposes the NewWindow3 event of WebBrowserEx, and handle the DocumentTitleChanged event.
* This source is subject to the Microsoft Public License.
* See http://www.microsoft.com/en-us/openness/licenses.aspx#MPL.
* All other rights reserved.
* THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, 
* EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED 
* WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR PURPOSE.
\***************************************************************************/
using System;
using System.Windows.Forms;
using System.Security.Permissions;
using System.IO;
using mshtml;
using System.Threading.Tasks;
using Scripting;
using mshtmlScriptElement = mshtml.IHTMLScriptElement;
using mshtmlDomNode = mshtml.IHTMLDOMNode;
namespace CSTabbedWebBrowser
{
  public class WebBrowserTabPage : TabPage
  {
    public WebBrowserEx WebBrowser { get; private set; }
    private MenuStrip menuStrip1;
    private MenuStrip menuStrip2;

   //    STATEMENTQUERYStripMenuItem
    private ToolStripMenuItem fileToolStripMenuItem, saveAsToolStripMenuItem, printToolStripMenuItem,
        printPreviewToolStripMenuItem, pageSetupToolStripMenuItem, propertiesToolStripMenuItem, closeTabToolStripMenuItem,
        serviceToolStripMenuItem, propsTabToolStripMenuItem, aboutBankStripMenuItem, closeThisTab, pravkaToolStripMenuItem, erasePage, copyPage, pastePage; // exitToolStripMenuItem,
    private ToolStripSeparator toolStripSeparator1, toolStripSeparator2;//, closeThisTab;

    private ToolStripMenuItem MAINPAGE, ALLNEWS, DOCS, PAYDOCCUR, CURRBUY, CURRSELL, Item103, Item209, Item210, 
      Item219, Item234, Item247, REMOTE, /*DEALPASSPORT, REMOTES2RINFO,*/ Item272,
      MyImport, MySigner, MyCrypto, MyTools;

    private ToolStripMenuItem PAYDOCRU, PAYDOCRU_CREATE, PAYDOCRU_IMPORTED, PAYDOCRU_NEW, PAYDOCRU_SIGNED, PAYDOCRU_INPROCESS, PAYDOCRU_REJECTED0GTHEN0, PAYDOCRU_COMPLETED, PAYDOCRU_ALL, PAYDOCRU_TEMPLATES;
    private ToolStripMenuItem CURR, CURRBUY_CREATE, CURRBUY_NEW, CURRBUY_SIGNED, CURRBUY_INPROCESS, CURRBUY_REJECTED0GTHEN0, CURRBUY_COMPLETED, CURRBUY_ALL, CURRBUY_TEMPLATES;
    private ToolStripMenuItem CURRSELL_CREATE, CURRSELL_NEW, CURRSELL_SIGNED, CURRSELL_INPROCESS, CURRSELL_REJECTED0GTHEN0, CURRSELL_COMPLETED, CURRSELL_ALL, CURRSELL_TEMPLATES;
    private ToolStripMenuItem MANDATORYCURRSELL, MANDATORYCURRSELL_CREATE, MANDATORYCURRSELL_NEW, MANDATORYCURRSELL_SIGNED, MANDATORYCURRSELL_INPROCESS, MANDATORYCURRSELL_REJECTED0GTHEN0,
              MANDATORYCURRSELL_COMPLETED, MANDATORYCURRSELL_AL, MANDATORYCURRSELL_TEMPLATES;

    private ToolStripMenuItem DEALPASS, DEALPASSCON138I, DEALPASSCON138I_CREATE, DEALPASSCON138I_NEW, DEALPASSCON138I_SIGNED, DEALPASSCON138I_INPROCESS, DEALPASSCON138I_REJECTED0GTHEN0, DEALPASSCON138I_COMPLETEDDEALPASS,
                    DEALPASSCON138I_ALL, DEALPASSCON138I_TEMPLATES;
    private ToolStripMenuItem DEALPASSCRED138I, DEALPASSCRED138I_CREATE, DEALPASSCRED138I_NEW, DEALPASSCRED138I_SIGNED, DEALPASSCRED138I_INPROCESS, DEALPASSCRED138I_REJECTED0GTHEN0,
          DEALPASSCRED138I_COMPLETEDDEALPASS, DEALPASSCRED138I_ALL, DEALPASSCRED138I_TEMPLATES;

    private ToolStripMenuItem CURRDEAL, CURRDEALINQUIRY138I, CURRDEALINQUIRY138I_CREATE, CURRDEALINQUIRY138I_NEW, CURRDEALINQUIRY138I_SIGNED, CURRDEALINQUIRY138I_INPROCESS,
          CURRDEALINQUIRY138I_REJECTED0GTHEN0, CURRDEALINQUIRY138I_COMPLETED, CURRDEALINQUIRY138I_ALL, CURRDEALINQUIRY138I_TEMPLATES;


    private ToolStripMenuItem CONFDOCINQUIRY138I, CONFDOCINQUIRY138I_CREATE, CONFDOCINQUIRY138I_NEW, CONFDOCINQUIRY138I_SIGNED, CONFDOCINQUIRY138I_INPROCESS, CONFDOCINQUIRY138I_REJECTED0GTHEN0,
          CONFDOCINQUIRY138I_COMPLETED, CONFDOCINQUIRY138I_ALL, CONFDOCINQUIRY138I_TEMPLATES;
    private ToolStripMenuItem DEALPASSCLOSE, DEALPASSCLOSE_CREATE, DEALPASSCLOSE_NEW, DEALPASSCLOSE_SIGNED, DEALPASSCLOSE_INPROCESS, DEALPASSCLOSE_REJECTED0GTHEN0, DEALPASSCLOSE_COMPLETED,
          DEALPASSCLOSE_ALL, DEALPASSCLOSE_TEMPLATES;

    private ToolStripMenuItem DEALPASSRENEW, DEALPASSRENEW_CREATE, DEALPASSRENEW_NEW, DEALPASSRENEW_SIGNED, DEALPASSRENEW_INPROCESS, DEALPASSRENEW_REJECTED0GTHEN0,
      DEALPASSRENEW_COMPLETED, DEALPASSRENEW_ALL, DEALPASSRENEW_TEMPLATES;

    private ToolStripMenuItem DEALPASSCON, DEALPASSCON_CREATE, DEALPASSCON_NEW, DEALPASSCON_SIGNED, DEALPASSCON_INPROCESS, DEALPASSCON_REJECTED0GTHEN0, DEALPASSCON_COMPLETED,
        DEALPASSCON_ALL, DEALPASSCON_TEMPLATES;
    private ToolStripMenuItem DEALPASSCRED, DEALPASSCRED_CREATE, DEALPASSCRED_NEW, DEALPASSCRED_SIGNED, DEALPASSCRED_INPROCESS, DEALPASSCRED_REJECTED0GTHEN0,
        DEALPASSCRED_COMPLETED, DEALPASSCRED_ALL, DEALPASSCRED_TEMPLATES;

    private ToolStripMenuItem CURRDEALINQUIRY, CURRDEALINQUIRY_CREATE, CURRDEALINQUIRY_NEW, CURRDEALINQUIRY_SIGNED, CURRDEALINQUIRY_INPROCESS, CURRDEALINQUIRY_REJECTED0GTHEN0,
        CURRDEALINQUIRY_COMPLETED, CURRDEALINQUIRY_ALL, CURRDEALINQUIRY_TEMPLATES;
    private ToolStripMenuItem RURDEALINQUIRY, RURDEALINQUIRY_CREATE, RURDEALINQUIRY_NEW, RURDEALINQUIRY_SIGNED, RURDEALINQUIRY_INPROCESS, RURDEALINQUIRY_REJECTED0GTHEN0,
        RURDEALINQUIRY_COMPLETED, RURDEALINQUIRY_ALL, RURDEALINQUIRY_TEMPLATES;
    private ToolStripMenuItem CONFDOCINQUIRY, CONFDOCINQUIRY_CREATE, CONFDOCINQUIRY_NEW, CONFDOCINQUIRY_SIGNED, CONFDOCINQUIRY_INPROCESS, CONFDOCINQUIRY_REJECTED0GTHEN0,
        CONFDOCINQUIRY_COMPLETED, CONFDOCINQUIRY_ALL, CONFDOCINQUIRY_TEMPLATES;
    private ToolStripMenuItem FREECLIENTDOC, FREECLIENTDOC_CREATE, FREECLIENTDOC_NEW, FREECLIENTDOC_SIGNED, FREECLIENTDOC_INPROCESS, FREECLIENTDOC_REJECTED0GTHEN0,
      FREECLIENTDOC_COMPLETED, FREECLIENTDOC_ALL;
    private ToolStripMenuItem STATEMENTS, STATEMENTQUERY, STATEMENTQUERY_CREATE, STATEMENTQUERY_NEW, STATEMENTQUERY_SIGNED, STATEMENTQUERY_INPROCESS, STATEMENTQUERY_REJECTED0GTHEN0,
        STATEMENTQUERY_COMPLETED, STATEMENTQUERY_ALL;//, STATEMENTQUERY_TEMPLATES;
    private ToolStripMenuItem CANCELLATIONREQUEST, CANCELLATIONREQUEST_CREATE, CANCELLATIONREQUEST_NEW, CANCELLATIONREQUEST_SIGNED, CANCELLATIONREQUEST_INPROCESS, CANCELLATIONREQUEST_REJECTED0GTHEN0,
        CANCELLATIONREQUEST_COMPLETED, CANCELLATIONREQUEST_ALL;
    private ToolStripMenuItem CLIENTCUSTOMDOC1,CLIENTCUSTOMDOC1_CREATE, CLIENTCUSTOMDOC1_NEW, CLIENTCUSTOMDOC1_SIGNED, CLIENTCUSTOMDOC1_INPROCESS, CLIENTCUSTOMDOC1_REJECTED0GTHEN0,
        CLIENTCUSTOMDOC1_COMPLETED, CLIENTCUSTOMDOC1_ALL, CLIENTCUSTOMDOC1_TEMPLATES;
    private ToolStripMenuItem CLIENTCUSTOMDOC2, CLIENTCUSTOMDOC2_CREATE, CLIENTCUSTOMDOC2_NEW, CLIENTCUSTOMDOC2_SIGNED, CLIENTCUSTOMDOC2_INPROCESS, CLIENTCUSTOMDOC2_REJECTED0GTHEN0,
        CLIENTCUSTOMDOC2_COMPLETED, CLIENTCUSTOMDOC2_ALL, CLIENTCUSTOMDOC2_TEMPLATES;

    private ToolStripMenuItem CLIENTCUSTOMDOC3, CLIENTCUSTOMDOC3_CREATE, CLIENTCUSTOMDOC3_NEW, CLIENTCUSTOMDOC3_SIGNED, CLIENTCUSTOMDOC3_INPROCESS, CLIENTCUSTOMDOC3_REJECTED0GTHEN0,
        CLIENTCUSTOMDOC3_COMPLETED, CLIENTCUSTOMDOC3_ALL, CLIENTCUSTOMDOC3_TEMPLATES;
    private ToolStripMenuItem CLIENTCUSTOMDOC4, CLIENTCUSTOMDOC4_CREATE, CLIENTCUSTOMDOC4_NEW, CLIENTCUSTOMDOC4_SIGNED, CLIENTCUSTOMDOC4_INPROCESS, CLIENTCUSTOMDOC4_REJECTED0GTHEN0,
        CLIENTCUSTOMDOC4_COMPLETED, CLIENTCUSTOMDOC4_ALL, CLIENTCUSTOMDOC4_TEMPLATES;
    private ToolStripMenuItem FREEBANKDOC, FREEBANKDOC_BANKDOCXNEWGTHEN0, FREEBANKDOC_BANKDOCXFAVORITES, FREEBANKDOC_BANKDOCXCOMPLETED;
    private ToolStripMenuItem TRANSITACCNOTICE, TRANSITACCNOTICE_BANKDOCXCOMPLETED, TRANSITACCNOTICE_BANKDOCXALL;
    private ToolStripMenuItem ARCHIVE, PAYDOCRU_ARCHIVE, PAYROLLDOC_ARCHIVE, PAYDOCCUR_ARCHIVE, CURRBUY_ARCHIVE, CURRSELL_ARCHIVE, CURRCONVERSION_ARCHIVE,
      TRANSITACCPAYDOC_ARCHIVE, MANDATORYCURRSELL_ARCHIVE, DEALPASSCON138I_ARCHIVE, DEALPASSCRED138I_ARCHIVE, CURRDEALINQUIRY138I_ARCHIVE, CONFDOCINQUIRY138I_ARCHIVE,
      DEALPASSCLOSE_ARCHIVE, DEALPASSRENEW_ARCHIVE;
    private ToolStripMenuItem DEALPASSCON_ARCHIVE, DEALPASSCRED_ARCHIVE, CURRDEALINQUIRY_ARCHIVE, RURDEALINQUIRY_ARCHIVE, CONFDOCINQUIRY_ARCHIVE,
        FREECLIENTDOC_ARCHIVE, STATEMENTQUERY_ARCHIVE, CANCELLATIONREQUEST_ARCHIVE;
    private ToolStripMenuItem Item243, FREEBANKDOC_BANKDOCXARCHIVE, TRANSITACCNOTICE_BANKDOCXARCHIVE, CLIENTCUSTOMDOC_BANKDOCXARCHIVE;

    private ToolStripMenuItem BRANCHES, Item250, Item251, Item252, Item253, Item254, Item255, Item256, Item257, Item258, Item259, Item260, Item261,
        Item262, Item263, Item264, REMOTEOFFICIALS, REMOTECORRESP, REMOTEGROUND, REMOTEBENEF, REMOTEGROUNDINT, DEALPASSPORT, REMOTES2RINFO;


    private ToolStripMenuItem CRYPTO_NEWCRYPTO, CRYPTO_SIGNED, CRYPTO_INPROCESS, CRYPTO_REGISTERED, CRYPTO_REJECTEDCRYPTO, CRYPTO_COMPLETED, CRYPTO_ALL, Item285, Item286, Item287, Item288, Item289,
        Item290, Item291, Item292, Item293, Item294;
    private ToolStripMenuItem Item273, Item274, Item275, Item276, Item277;

    private ToolStrip toolStrip1, toolStrip2;
        private ToolStripTextBox toolStripTextBox1;
        private ToolStripButton goButton, backButton,forwardButton, stopButton, refreshButton,homeButton, searchButton, printButton,
          IdPwdButton, BankStatementButton, RealBankStatementButton, MainPageButton;
        private StatusStrip statusStrip1;
        /// <summary>
        /// 
        /// </summary>
        private ToolStripStatusLabel toolStripStatusLabel1;
        public string currentButton2;
        public KruzhkaButton tabPageKruzhka;
        // Expose the NewWindow3 event of WebBrowserEx.
        public event EventHandler<WebBrowserNewWindowEventArgs> NewWindow
        {
            add{WebBrowser.NewWindow3 += value;}remove{WebBrowser.NewWindow3 -= value;}
        }
        /// <summary>
        /// Initialize the WebBrowserEx instance.
        /// </summary>
        [PermissionSetAttribute(SecurityAction.LinkDemand, Name = "FullTrust")]
        public WebBrowserTabPage(): base()
        {
            WebBrowser = new WebBrowserEx();
            WebBrowser.Dock = DockStyle.Fill;
            WebBrowser.IsWebBrowserContextMenuEnabled = true;
            currentButton2 = "";

            WebBrowser.DocumentTitleChanged += new EventHandler(WebBrowser_DocumentTitleChanged);
            WebBrowser.CanGoBackChanged += new EventHandler(WebBrowser_CanGoBackChanged);

            WebBrowser.CanGoForwardChanged += new EventHandler(webBrowser1_CanGoForwardChanged);
            WebBrowser.DocumentTitleChanged += new EventHandler(webBrowser1_DocumentTitleChanged);
            WebBrowser.StatusTextChanged += new EventHandler(webBrowser1_StatusTextChanged);

            menuStrip1 = new MenuStrip();
            fileToolStripMenuItem = new ToolStripMenuItem();
            saveAsToolStripMenuItem = new ToolStripMenuItem(); // "Сохр. &как...";
            toolStripSeparator1 = new ToolStripSeparator(); 
            printToolStripMenuItem = new ToolStripMenuItem(); //  "&Печать...";
            printPreviewToolStripMenuItem = new ToolStripMenuItem(); // "Просмотр &печати...";
            toolStripSeparator2 = new ToolStripSeparator();
//            exitToolStripMenuItem = new ToolStripMenuItem(); // "Вы&ход";
            pageSetupToolStripMenuItem = new ToolStripMenuItem(); // "Параметры. ст&раницы...";
            propertiesToolStripMenuItem = new ToolStripMenuItem(); // "Свойства";
            closeTabToolStripMenuItem = new ToolStripMenuItem(); // "Закрыть вкладку";
            closeThisTab = new ToolStripMenuItem(); // "Закрыть вкладку";


            menuStrip2 = new MenuStrip();


            serviceToolStripMenuItem = new ToolStripMenuItem(); // 
            propsTabToolStripMenuItem = new ToolStripMenuItem(); // 
            aboutBankStripMenuItem = new ToolStripMenuItem(); // 

            pravkaToolStripMenuItem = new ToolStripMenuItem(); // 
            erasePage = new ToolStripMenuItem(); // 
            copyPage  = new ToolStripMenuItem(); // 
            pastePage = new ToolStripMenuItem(); // 

            MAINPAGE = new ToolStripMenuItem("Главная страница"); // 
            ALLNEWS = new ToolStripMenuItem("Все новости"); // 
            DOCS = new ToolStripMenuItem("Документы"); // 
            PAYDOCRU = new ToolStripMenuItem("Платежные поручения (в рублях)");

            PAYDOCRU_CREATE = new ToolStripMenuItem("Создать новый документ"); // 
            PAYDOCRU_IMPORTED = new ToolStripMenuItem("Импортированные документы"); // 
            PAYDOCRU_NEW = new ToolStripMenuItem("Список новых документов, доступных для редактирования"); // 
            PAYDOCRU_SIGNED = new ToolStripMenuItem("Подписанные документы"); // 
            PAYDOCRU_INPROCESS = new ToolStripMenuItem("Список документов, находящихся в процессе обработки в банке");
            PAYDOCRU_REJECTED0GTHEN0 = new ToolStripMenuItem("Список отказанных документов, помеченных как непросмотренные");
            PAYDOCRU_COMPLETED = new ToolStripMenuItem("Список завершенных документов");
            PAYDOCRU_ALL = new ToolStripMenuItem("Все документы(новые, подписанные, в обработке, завершенные...)");
            PAYDOCRU_TEMPLATES = new ToolStripMenuItem("Шаблоны документов");

            PAYDOCRU.DropDownItems.AddRange(new ToolStripItem[] { PAYDOCRU_CREATE, PAYDOCRU_IMPORTED, PAYDOCRU_NEW, PAYDOCRU_SIGNED, PAYDOCRU_INPROCESS, PAYDOCRU_REJECTED0GTHEN0,
              PAYDOCRU_COMPLETED,PAYDOCRU_ALL, PAYDOCRU_TEMPLATES});


            CURR=new ToolStripMenuItem("Валюта"); // 
            CURRBUY = new ToolStripMenuItem("Поручения на покупку валюты"); // 

            CURRBUY_CREATE = new ToolStripMenuItem("Создать новый документ"); // 
            CURRBUY_NEW = new ToolStripMenuItem("Список новых документов, доступных для редактирования");
            CURRBUY_SIGNED = new ToolStripMenuItem("Подписанные документы");
            CURRBUY_INPROCESS = new ToolStripMenuItem("Список документов, находящихся в процессе обработки в банке");
            CURRBUY_REJECTED0GTHEN0 = new ToolStripMenuItem("Список отказанных документов, помеченных как непросмотренные");
            CURRBUY_COMPLETED = new ToolStripMenuItem("Список завершенных документов");
            CURRBUY_ALL = new ToolStripMenuItem("Все документы(новые, подписанные, в обработке, завершенные...)");
            CURRBUY_TEMPLATES = new ToolStripMenuItem("Шаблоны документов");
            CURRBUY.DropDownItems.AddRange(new ToolStripItem[] { CURRBUY_CREATE, CURRBUY_NEW, CURRBUY_SIGNED, CURRBUY_INPROCESS, CURRBUY_REJECTED0GTHEN0, CURRBUY_COMPLETED, CURRBUY_ALL, CURRBUY_TEMPLATES });


            CURRSELL = new ToolStripMenuItem("Поручения на продажу валюты");
            CURRSELL_CREATE = new ToolStripMenuItem("Создать новый документ");
            CURRSELL_NEW = new ToolStripMenuItem("Список новых документов, доступных для редактирования");
            CURRSELL_SIGNED = new ToolStripMenuItem("Подписанные документы");
            CURRSELL_INPROCESS = new ToolStripMenuItem("Список документов, находящихся в процессе обработки в банке");
            CURRSELL_REJECTED0GTHEN0 = new ToolStripMenuItem("Список отказанных документов, помеченных как непросмотренные");
            CURRSELL_COMPLETED = new ToolStripMenuItem("Список завершенных документов");
            CURRSELL_ALL = new ToolStripMenuItem("Все документы(новые, подписанные, в обработке, завершенные...)");
            CURRSELL_TEMPLATES = new ToolStripMenuItem("Шаблоны документов");
            CURRSELL.DropDownItems.AddRange(new ToolStripItem[] { CURRSELL_CREATE, CURRSELL_NEW, CURRSELL_SIGNED, CURRSELL_INPROCESS, CURRSELL_REJECTED0GTHEN0, CURRSELL_COMPLETED,
              CURRSELL_ALL, CURRSELL_TEMPLATES });

            MANDATORYCURRSELL = new ToolStripMenuItem("Распоряжения на обязательную продажу валютной выручки"); // 
            MANDATORYCURRSELL_CREATE = new ToolStripMenuItem("Создать новый документ"); // 
            MANDATORYCURRSELL_NEW = new ToolStripMenuItem("Список новых документов, доступных для редактирования"); // 
            MANDATORYCURRSELL_SIGNED = new ToolStripMenuItem("Подписанные документы");
            MANDATORYCURRSELL_INPROCESS = new ToolStripMenuItem("Список документов, находящихся в процессе обработки в банке");
            MANDATORYCURRSELL_REJECTED0GTHEN0 = new ToolStripMenuItem(" Список отказанных документов, помеченных как непросмотренные");
            MANDATORYCURRSELL_COMPLETED = new ToolStripMenuItem("Список завершенных документов");
            MANDATORYCURRSELL_AL = new ToolStripMenuItem("Все документы(новые, подписанные, в обработке, завершенные...)");
            MANDATORYCURRSELL_TEMPLATES = new ToolStripMenuItem("Шаблоны документов");

            MANDATORYCURRSELL.DropDownItems.AddRange(new ToolStripItem[] {  MANDATORYCURRSELL_CREATE, MANDATORYCURRSELL_NEW, MANDATORYCURRSELL_SIGNED, MANDATORYCURRSELL_INPROCESS, MANDATORYCURRSELL_REJECTED0GTHEN0,
              MANDATORYCURRSELL_COMPLETED, MANDATORYCURRSELL_AL, MANDATORYCURRSELL_TEMPLATES });

            CURR.DropDownItems.AddRange(new ToolStripItem[] { CURRBUY, CURRSELL, MANDATORYCURRSELL });


            DEALPASS = new ToolStripMenuItem("Паспорта сделок"); // 
            DEALPASSCON138I = new ToolStripMenuItem("Паспорта сделок по контракту (138-И)"); // 
            DEALPASSCON138I_CREATE = new ToolStripMenuItem("Создать новый документ"); // 
            DEALPASSCON138I_NEW = new ToolStripMenuItem("Список новых документов, доступных для редактирования");
            DEALPASSCON138I_SIGNED = new ToolStripMenuItem("Подписанные документы");
            DEALPASSCON138I_INPROCESS = new ToolStripMenuItem("Список документов, находящихся в процессе обработки в банке");
            DEALPASSCON138I_REJECTED0GTHEN0 = new ToolStripMenuItem("Список отказанных документов, помеченных как непросмотренные");
            DEALPASSCON138I_COMPLETEDDEALPASS = new ToolStripMenuItem("Список завершенных документов");
            DEALPASSCON138I_ALL = new ToolStripMenuItem("Все документы(новые, подписанные, в обработке, завершенные...)");
            DEALPASSCON138I_TEMPLATES = new ToolStripMenuItem("Шаблоны документов");

            DEALPASSCON138I.DropDownItems.AddRange(new ToolStripItem[] {DEALPASSCON138I_CREATE, DEALPASSCON138I_NEW, DEALPASSCON138I_SIGNED, DEALPASSCON138I_INPROCESS, DEALPASSCON138I_REJECTED0GTHEN0, DEALPASSCON138I_COMPLETEDDEALPASS,
                    DEALPASSCON138I_ALL, DEALPASSCON138I_TEMPLATES});

            DEALPASSCRED138I = new ToolStripMenuItem("Паспорта сделок по кредитному договору (138-И)");

            DEALPASSCRED138I_CREATE = new ToolStripMenuItem("Создать новый документ");
            DEALPASSCRED138I_NEW = new ToolStripMenuItem("Список новых документов, доступных для редактирования");
            DEALPASSCRED138I_SIGNED = new ToolStripMenuItem("Подписанные документы");
            DEALPASSCRED138I_INPROCESS = new ToolStripMenuItem("Список документов, находящихся в процессе обработки в банке");
            DEALPASSCRED138I_REJECTED0GTHEN0 = new ToolStripMenuItem("Список отказанных документов, помеченных как непросмотренные");
            DEALPASSCRED138I_COMPLETEDDEALPASS = new ToolStripMenuItem("Список завершенных документов");
            DEALPASSCRED138I_ALL = new ToolStripMenuItem("Все документы(новые, подписанные, в обработке, завершенные...)");
            DEALPASSCRED138I_TEMPLATES = new ToolStripMenuItem("Шаблоны документов");

            DEALPASSCRED138I.DropDownItems.AddRange(new ToolStripItem[] { DEALPASSCRED138I_CREATE, DEALPASSCRED138I_NEW, DEALPASSCRED138I_SIGNED, DEALPASSCRED138I_INPROCESS, DEALPASSCRED138I_REJECTED0GTHEN0,
                    DEALPASSCRED138I_COMPLETEDDEALPASS, DEALPASSCRED138I_ALL, DEALPASSCRED138I_TEMPLATES});


            CURRDEAL = new ToolStripMenuItem("Справки");
            CURRDEALINQUIRY138I = new ToolStripMenuItem("Справки о валютных операциях (138-И)");

            CURRDEALINQUIRY138I_CREATE = new ToolStripMenuItem("Создать новый докумен");
            CURRDEALINQUIRY138I_NEW = new ToolStripMenuItem("Список новых документов, доступных для редактирования");
            CURRDEALINQUIRY138I_SIGNED = new ToolStripMenuItem("Подписанные документы");
            CURRDEALINQUIRY138I_INPROCESS = new ToolStripMenuItem("Список документов, находящихся в процессе обработки в банке");
            CURRDEALINQUIRY138I_REJECTED0GTHEN0 = new ToolStripMenuItem("Список отказанных документов, помеченных как непросмотренные");
            CURRDEALINQUIRY138I_COMPLETED = new ToolStripMenuItem("Список завершенных документов");
            CURRDEALINQUIRY138I_ALL = new ToolStripMenuItem("Все документы(новые, подписанные, в обработке, завершенные...)");
            CURRDEALINQUIRY138I_TEMPLATES = new ToolStripMenuItem("Шаблоны документов");

            CURRDEALINQUIRY138I.DropDownItems.AddRange(new ToolStripItem[] { CURRDEALINQUIRY138I_CREATE, CURRDEALINQUIRY138I_NEW, CURRDEALINQUIRY138I_SIGNED, CURRDEALINQUIRY138I_INPROCESS,
              CURRDEALINQUIRY138I_REJECTED0GTHEN0, CURRDEALINQUIRY138I_COMPLETED, CURRDEALINQUIRY138I_ALL, CURRDEALINQUIRY138I_TEMPLATES});

            CONFDOCINQUIRY138I = new ToolStripMenuItem("Справки о подтверждающих документах (138-И)");

            CONFDOCINQUIRY138I_CREATE = new ToolStripMenuItem("Создать новый документ");
            CONFDOCINQUIRY138I_NEW = new ToolStripMenuItem("Список новых документов, доступных для редактирования");
            CONFDOCINQUIRY138I_SIGNED = new ToolStripMenuItem("Подписанные документы");
            CONFDOCINQUIRY138I_INPROCESS = new ToolStripMenuItem("Список документов, находящихся в процессе обработки в банке");
            CONFDOCINQUIRY138I_REJECTED0GTHEN0 = new ToolStripMenuItem("Список отказанных документов, помеченных как непросмотренные");
            CONFDOCINQUIRY138I_COMPLETED = new ToolStripMenuItem(" Список завершенных документов");
            CONFDOCINQUIRY138I_ALL = new ToolStripMenuItem("Все документы(новые, подписанные, в обработке, завершенные...)");
            CONFDOCINQUIRY138I_TEMPLATES = new ToolStripMenuItem("Шаблоны документов");

            CONFDOCINQUIRY138I.DropDownItems.AddRange(new ToolStripItem[] { CONFDOCINQUIRY138I_CREATE, CONFDOCINQUIRY138I_NEW, CONFDOCINQUIRY138I_SIGNED, CONFDOCINQUIRY138I_INPROCESS, CONFDOCINQUIRY138I_REJECTED0GTHEN0,
                CONFDOCINQUIRY138I_COMPLETED, CONFDOCINQUIRY138I_ALL, CONFDOCINQUIRY138I_TEMPLATES });

//      DEALPASS = new ToolStripMenuItem("");
            DEALPASSCLOSE = new ToolStripMenuItem("Заявления о закрытии/ переводе паспортов сделок (138 - И)");
            DEALPASSCLOSE_CREATE = new ToolStripMenuItem("Создать новый документ");
            DEALPASSCLOSE_NEW = new ToolStripMenuItem("Список новых документов, доступных для редактирования");
            DEALPASSCLOSE_SIGNED = new ToolStripMenuItem("Подписанные документы");
            DEALPASSCLOSE_INPROCESS = new ToolStripMenuItem("Список документов, находящихся в процессе обработки в банке");
            DEALPASSCLOSE_REJECTED0GTHEN0 = new ToolStripMenuItem("Список отказанных документов, помеченных как непросмотренные");
            DEALPASSCLOSE_COMPLETED = new ToolStripMenuItem("Список завершенных документов");
            DEALPASSCLOSE_ALL = new ToolStripMenuItem("Все документы(новые, подписанные, в обработке, завершенные...)");
            DEALPASSCLOSE_TEMPLATES = new ToolStripMenuItem("Шаблоны документов");

            DEALPASSCLOSE.DropDownItems.AddRange(new ToolStripItem[] {  DEALPASSCLOSE_CREATE, DEALPASSCLOSE_NEW, DEALPASSCLOSE_SIGNED, DEALPASSCLOSE_INPROCESS, DEALPASSCLOSE_REJECTED0GTHEN0, DEALPASSCLOSE_COMPLETED,
              DEALPASSCLOSE_ALL, DEALPASSCLOSE_TEMPLATES });

      DEALPASSRENEW = new ToolStripMenuItem("Заявления о переоформлении паспортов сделок (138 - И)");
      DEALPASSRENEW_CREATE = new ToolStripMenuItem("Создать новый документ");
      DEALPASSRENEW_NEW = new ToolStripMenuItem("Список новых документов, доступных для редактирования");
      DEALPASSRENEW_SIGNED = new ToolStripMenuItem("Подписанные документы");
      DEALPASSRENEW_INPROCESS = new ToolStripMenuItem("Список документов, находящихся в процессе обработки в банке");
      DEALPASSRENEW_REJECTED0GTHEN0 = new ToolStripMenuItem("Список отказанных документов, помеченных как непросмотренные");
      DEALPASSRENEW_COMPLETED = new ToolStripMenuItem("Список завершенных документов");
      DEALPASSRENEW_ALL = new ToolStripMenuItem("Все документы(новые, подписанные, в обработке, завершенные...)");
      DEALPASSRENEW_TEMPLATES = new ToolStripMenuItem("Шаблоны документов");
      DEALPASSRENEW.DropDownItems.AddRange(new ToolStripItem[] { DEALPASSRENEW_CREATE, DEALPASSRENEW_NEW, DEALPASSRENEW_SIGNED, DEALPASSRENEW_INPROCESS, DEALPASSRENEW_REJECTED0GTHEN0,
          DEALPASSRENEW_COMPLETED, DEALPASSRENEW_ALL, DEALPASSRENEW_TEMPLATES });



      Item103 = new ToolStripMenuItem("");
      DEALPASSCON = new ToolStripMenuItem("Паспорта сделок по контракту");
      DEALPASSCON_CREATE = new ToolStripMenuItem("Создать новый документ");
      DEALPASSCON_NEW = new ToolStripMenuItem("Список новых документов, доступных для редактирования");
      DEALPASSCON_SIGNED = new ToolStripMenuItem("Подписанные документы");
      DEALPASSCON_INPROCESS = new ToolStripMenuItem("Список документов, находящихся в процессе обработки в банке");
      DEALPASSCON_REJECTED0GTHEN0 = new ToolStripMenuItem("Список отказанных документов, помеченных как непросмотренные");
      DEALPASSCON_COMPLETED = new ToolStripMenuItem("Список завершенных документов");
      DEALPASSCON_ALL = new ToolStripMenuItem("Все документы(новые, подписанные, в обработке, завершенные...)");
      DEALPASSCON_TEMPLATES = new ToolStripMenuItem("Шаблоны документов");

      DEALPASSCON.DropDownItems.AddRange(new ToolStripItem[] {  DEALPASSCON_CREATE, DEALPASSCON_NEW, DEALPASSCON_SIGNED, DEALPASSCON_INPROCESS, DEALPASSCON_REJECTED0GTHEN0, DEALPASSCON_COMPLETED,
        DEALPASSCON_ALL, DEALPASSCON_TEMPLATES });


      DEALPASSCRED = new ToolStripMenuItem("Паспорта сделок по кредитному договору");
      DEALPASSCRED_CREATE = new ToolStripMenuItem("Создать новый документ");
      DEALPASSCRED_NEW = new ToolStripMenuItem("Список новых документов, доступных для редактирования");
      DEALPASSCRED_SIGNED = new ToolStripMenuItem("Подписанные документы");
      DEALPASSCRED_INPROCESS = new ToolStripMenuItem("Список документов, находящихся в процессе обработки в банке");
      DEALPASSCRED_REJECTED0GTHEN0 = new ToolStripMenuItem("Список отказанных документов, помеченных как непросмотренные");
      DEALPASSCRED_COMPLETED = new ToolStripMenuItem("Список завершенных документов");
      DEALPASSCRED_ALL = new ToolStripMenuItem("Все документы(новые, подписанные, в обработке, завершенные...)");
      DEALPASSCRED_TEMPLATES = new ToolStripMenuItem("Шаблоны документов");

      DEALPASSCRED.DropDownItems.AddRange(new ToolStripItem[] { DEALPASSCRED_CREATE, DEALPASSCRED_NEW, DEALPASSCRED_SIGNED, DEALPASSCRED_INPROCESS, DEALPASSCRED_REJECTED0GTHEN0,
        DEALPASSCRED_COMPLETED, DEALPASSCRED_ALL, DEALPASSCRED_TEMPLATES });

      CURRDEALINQUIRY = new ToolStripMenuItem("Справки о валютных операциях");
      CURRDEALINQUIRY_CREATE = new ToolStripMenuItem("Создать новый документ");
      CURRDEALINQUIRY_NEW = new ToolStripMenuItem("Список новых документов, доступных для редактирования");
      CURRDEALINQUIRY_SIGNED = new ToolStripMenuItem("Подписанные документы");
      CURRDEALINQUIRY_INPROCESS = new ToolStripMenuItem("Список документов, находящихся в процессе обработки в банке");
      CURRDEALINQUIRY_REJECTED0GTHEN0 = new ToolStripMenuItem("Список отказанных документов, помеченных как непросмотренные");
      CURRDEALINQUIRY_COMPLETED = new ToolStripMenuItem("Список завершенных документов");
      CURRDEALINQUIRY_ALL = new ToolStripMenuItem("Все документы(новые, подписанные, в обработке, завершенные...)");
      CURRDEALINQUIRY_TEMPLATES = new ToolStripMenuItem("Шаблоны документов");

      CURRDEALINQUIRY.DropDownItems.AddRange(new ToolStripItem[] { CURRDEALINQUIRY_CREATE, CURRDEALINQUIRY_NEW, CURRDEALINQUIRY_SIGNED, CURRDEALINQUIRY_INPROCESS, CURRDEALINQUIRY_REJECTED0GTHEN0,
        CURRDEALINQUIRY_COMPLETED, CURRDEALINQUIRY_ALL, CURRDEALINQUIRY_TEMPLATES });

      RURDEALINQUIRY = new ToolStripMenuItem("Справки о поступлении валюты РФ");
      RURDEALINQUIRY_CREATE = new ToolStripMenuItem("Создать новый документ");
      RURDEALINQUIRY_NEW = new ToolStripMenuItem("Список новых документов, доступных для редактирования");
      RURDEALINQUIRY_SIGNED = new ToolStripMenuItem("Подписанные документы");
      RURDEALINQUIRY_INPROCESS = new ToolStripMenuItem("Список документов, находящихся в процессе обработки в банке");
      RURDEALINQUIRY_REJECTED0GTHEN0 = new ToolStripMenuItem("Список отказанных документов, помеченных как непросмотренные");
      RURDEALINQUIRY_COMPLETED = new ToolStripMenuItem("Список завершенных документов");
      RURDEALINQUIRY_ALL = new ToolStripMenuItem("Все документы(новые, подписанные, в обработке, завершенные...)");
      RURDEALINQUIRY_TEMPLATES = new ToolStripMenuItem("Шаблоны документов");

      RURDEALINQUIRY.DropDownItems.AddRange(new ToolStripItem[] { RURDEALINQUIRY_CREATE, RURDEALINQUIRY_NEW, RURDEALINQUIRY_SIGNED, RURDEALINQUIRY_INPROCESS, RURDEALINQUIRY_REJECTED0GTHEN0,
          RURDEALINQUIRY_COMPLETED, RURDEALINQUIRY_ALL, RURDEALINQUIRY_TEMPLATES });

      CONFDOCINQUIRY = new ToolStripMenuItem("Справки о подтверждающих документах");
      CONFDOCINQUIRY_CREATE = new ToolStripMenuItem("Создать новый документ");
      CONFDOCINQUIRY_NEW = new ToolStripMenuItem("Список новых документов, доступных для редактирования");
      CONFDOCINQUIRY_SIGNED = new ToolStripMenuItem("Подписанные документы");
      CONFDOCINQUIRY_INPROCESS = new ToolStripMenuItem("Список документов, находящихся в процессе обработки в банке");
      CONFDOCINQUIRY_REJECTED0GTHEN0 = new ToolStripMenuItem("Список отказанных документов, помеченных как непросмотренные");
      CONFDOCINQUIRY_COMPLETED = new ToolStripMenuItem("Список завершенных документов");
      CONFDOCINQUIRY_ALL = new ToolStripMenuItem("Все документы(новые, подписанные, в обработке, завершенные...)");
      CONFDOCINQUIRY_TEMPLATES = new ToolStripMenuItem("Шаблоны документов");

      CONFDOCINQUIRY.DropDownItems.AddRange(new ToolStripItem[] { CONFDOCINQUIRY_CREATE, CONFDOCINQUIRY_NEW, CONFDOCINQUIRY_SIGNED, CONFDOCINQUIRY_INPROCESS, CONFDOCINQUIRY_REJECTED0GTHEN0,
          CONFDOCINQUIRY_COMPLETED, CONFDOCINQUIRY_ALL, CONFDOCINQUIRY_TEMPLATES });


      FREECLIENTDOC = new ToolStripMenuItem("Документы в произвольном формате в банк");
      FREECLIENTDOC_CREATE = new ToolStripMenuItem("Создать новый документ");
      FREECLIENTDOC_NEW = new ToolStripMenuItem("Список новых документов, доступных для редактирования");
      FREECLIENTDOC_SIGNED = new ToolStripMenuItem("Подписанные документы");
      FREECLIENTDOC_INPROCESS = new ToolStripMenuItem("Список документов, находящихся в процессе обработки в банке");
      FREECLIENTDOC_REJECTED0GTHEN0 = new ToolStripMenuItem("Список отказанных документов, помеченных как непросмотренные");
      FREECLIENTDOC_COMPLETED = new ToolStripMenuItem("Список завершенных документов");
      FREECLIENTDOC_ALL = new ToolStripMenuItem("Все документы(новые, подписанные, в обработке, завершенные...)");
      //      FREECLIENTDOC_TEMPLATES = new ToolStripMenuItem("Шаблоны документов");

      FREECLIENTDOC.DropDownItems.AddRange(new ToolStripItem[] { FREECLIENTDOC_CREATE, FREECLIENTDOC_NEW, FREECLIENTDOC_SIGNED, FREECLIENTDOC_INPROCESS, FREECLIENTDOC_REJECTED0GTHEN0,
          FREECLIENTDOC_COMPLETED, FREECLIENTDOC_ALL });


      STATEMENTS = new ToolStripMenuItem("Выписки");
      STATEMENTQUERY = new ToolStripMenuItem("Запросы на получение выписки по счету за определенный период");
      STATEMENTQUERY_CREATE = new ToolStripMenuItem("Создать новый документ");
      STATEMENTQUERY_NEW = new ToolStripMenuItem("Список новых документов, доступных для редактирования");
      STATEMENTQUERY_SIGNED = new ToolStripMenuItem("Подписанные документы");
      STATEMENTQUERY_INPROCESS = new ToolStripMenuItem("Список документов, находящихся в процессе обработки в банке");
      STATEMENTQUERY_REJECTED0GTHEN0 = new ToolStripMenuItem("Список отказанных документов, помеченных как непросмотренные");
      STATEMENTQUERY_COMPLETED = new ToolStripMenuItem("Список завершенных документов");
      STATEMENTQUERY_ALL = new ToolStripMenuItem("Все документы(новые, подписанные, в обработке, завершенные...)");
      //      STATEMENTQUERY_TEMPLATES = new ToolStripMenuItem("Шаблоны документов");

      STATEMENTQUERY.DropDownItems.AddRange(new ToolStripItem[] { STATEMENTQUERY_CREATE, STATEMENTQUERY_NEW, STATEMENTQUERY_SIGNED, STATEMENTQUERY_INPROCESS, STATEMENTQUERY_REJECTED0GTHEN0,
        STATEMENTQUERY_COMPLETED, STATEMENTQUERY_ALL});


      CANCELLATIONREQUEST = new ToolStripMenuItem("Запросы на отзыв документа");
      CANCELLATIONREQUEST_CREATE = new ToolStripMenuItem("Создать новый документ");
      CANCELLATIONREQUEST_NEW = new ToolStripMenuItem("Список новых документов, доступных для редактирования");
      CANCELLATIONREQUEST_SIGNED = new ToolStripMenuItem("Подписанные документы");
      CANCELLATIONREQUEST_INPROCESS = new ToolStripMenuItem("Список документов, находящихся в процессе обработки в банке");
      CANCELLATIONREQUEST_REJECTED0GTHEN0 = new ToolStripMenuItem("Список отказанных документов, помеченных как непросмотренные");
      CANCELLATIONREQUEST_COMPLETED = new ToolStripMenuItem("Список завершенных документов");
      CANCELLATIONREQUEST_ALL = new ToolStripMenuItem("Все документы(новые, подписанные, в обработке, завершенные...)");
      CANCELLATIONREQUEST.DropDownItems.AddRange(new ToolStripItem[] {  CANCELLATIONREQUEST_CREATE, CANCELLATIONREQUEST_NEW, CANCELLATIONREQUEST_SIGNED, CANCELLATIONREQUEST_INPROCESS, CANCELLATIONREQUEST_REJECTED0GTHEN0,
        CANCELLATIONREQUEST_COMPLETED, CANCELLATIONREQUEST_ALL });

      CLIENTCUSTOMDOC1 = new ToolStripMenuItem("Заявления о закрытии/переводе паспортов сделок");
      CLIENTCUSTOMDOC1_CREATE = new ToolStripMenuItem("Создать новый документ");
      CLIENTCUSTOMDOC1_NEW = new ToolStripMenuItem("Список новых документов, доступных для редактирования");
      CLIENTCUSTOMDOC1_SIGNED = new ToolStripMenuItem("Подписанные документы");
      CLIENTCUSTOMDOC1_INPROCESS = new ToolStripMenuItem("Список документов, находящихся в процессе обработки в банке");
      CLIENTCUSTOMDOC1_REJECTED0GTHEN0 = new ToolStripMenuItem("Список отказанных документов, помеченных как непросмотренные");
      CLIENTCUSTOMDOC1_COMPLETED = new ToolStripMenuItem("Список завершенных документов");
      CLIENTCUSTOMDOC1_ALL = new ToolStripMenuItem("Все документы(новые, подписанные, в обработке, завершенные...)");
      CLIENTCUSTOMDOC1_TEMPLATES = new ToolStripMenuItem("Шаблоны документов");

      CLIENTCUSTOMDOC1.DropDownItems.AddRange(new ToolStripItem[] {CLIENTCUSTOMDOC1_CREATE, CLIENTCUSTOMDOC1_NEW, CLIENTCUSTOMDOC1_SIGNED, CLIENTCUSTOMDOC1_INPROCESS, CLIENTCUSTOMDOC1_REJECTED0GTHEN0,
        CLIENTCUSTOMDOC1_COMPLETED, CLIENTCUSTOMDOC1_ALL, CLIENTCUSTOMDOC1_TEMPLATES });

      CLIENTCUSTOMDOC2 = new ToolStripMenuItem("Поручения на списание средств с депозитного счета");
      CLIENTCUSTOMDOC2_CREATE = new ToolStripMenuItem("Создать новый документ");
      CLIENTCUSTOMDOC2_NEW = new ToolStripMenuItem("Список новых документов, доступных для редактирования");
      CLIENTCUSTOMDOC2_SIGNED = new ToolStripMenuItem("Подписанные документы");
      CLIENTCUSTOMDOC2_INPROCESS = new ToolStripMenuItem("Список документов, находящихся в процессе обработки в банке");
      CLIENTCUSTOMDOC2_REJECTED0GTHEN0 = new ToolStripMenuItem("Список отказанных документов, помеченных как непросмотренные");
      CLIENTCUSTOMDOC2_COMPLETED = new ToolStripMenuItem("Список завершенных документов");
      CLIENTCUSTOMDOC2_ALL = new ToolStripMenuItem("Все документы(новые, подписанные, в обработке, завершенные...)");
      CLIENTCUSTOMDOC2_TEMPLATES = new ToolStripMenuItem("Шаблоны документов");
      CLIENTCUSTOMDOC2.DropDownItems.AddRange(new ToolStripItem[] {CLIENTCUSTOMDOC2_CREATE, CLIENTCUSTOMDOC2_NEW, CLIENTCUSTOMDOC2_SIGNED, CLIENTCUSTOMDOC2_INPROCESS, CLIENTCUSTOMDOC2_REJECTED0GTHEN0,
        CLIENTCUSTOMDOC2_COMPLETED, CLIENTCUSTOMDOC2_ALL, CLIENTCUSTOMDOC2_TEMPLATES });

      CLIENTCUSTOMDOC3 = new ToolStripMenuItem("Просьбы внести изменения в банковскую карточку");
      CLIENTCUSTOMDOC3_CREATE = new ToolStripMenuItem("Создать новый документ");
      CLIENTCUSTOMDOC3_NEW = new ToolStripMenuItem("Список новых документов, доступных для редактирования");
      CLIENTCUSTOMDOC3_SIGNED = new ToolStripMenuItem("Подписанные документы");
      CLIENTCUSTOMDOC3_INPROCESS = new ToolStripMenuItem("Список документов, находящихся в процессе обработки в банке");
      CLIENTCUSTOMDOC3_REJECTED0GTHEN0 = new ToolStripMenuItem("Список отказанных документов, помеченных как непросмотренные");
      CLIENTCUSTOMDOC3_COMPLETED = new ToolStripMenuItem("Список завершенных документов");
      CLIENTCUSTOMDOC3_ALL = new ToolStripMenuItem("Все документы(новые, подписанные, в обработке, завершенные...)");
      CLIENTCUSTOMDOC3_TEMPLATES = new ToolStripMenuItem("Шаблоны документов");
      CLIENTCUSTOMDOC3.DropDownItems.AddRange(new ToolStripItem[] {CLIENTCUSTOMDOC3_CREATE, CLIENTCUSTOMDOC3_NEW, CLIENTCUSTOMDOC3_SIGNED, CLIENTCUSTOMDOC3_INPROCESS, CLIENTCUSTOMDOC3_REJECTED0GTHEN0,
        CLIENTCUSTOMDOC3_COMPLETED, CLIENTCUSTOMDOC3_ALL, CLIENTCUSTOMDOC3_TEMPLATES });
      CLIENTCUSTOMDOC4 = new ToolStripMenuItem("Заявления о переводе на обслуживание в другое структурное подразделение Банка");
      CLIENTCUSTOMDOC4_CREATE = new ToolStripMenuItem("Создать новый документ");
      CLIENTCUSTOMDOC4_NEW = new ToolStripMenuItem("Список новых документов, доступных для редактирования");
      CLIENTCUSTOMDOC4_SIGNED = new ToolStripMenuItem("Подписанные документы");
      CLIENTCUSTOMDOC4_INPROCESS = new ToolStripMenuItem("Список документов, находящихся в процессе обработки в банке");
      CLIENTCUSTOMDOC4_REJECTED0GTHEN0 = new ToolStripMenuItem("Список отказанных документов, помеченных как непросмотренные");
      CLIENTCUSTOMDOC4_COMPLETED = new ToolStripMenuItem("Список завершенных документов");
      CLIENTCUSTOMDOC4_ALL = new ToolStripMenuItem("Все документы(новые, подписанные, в обработке, завершенные...)");
      CLIENTCUSTOMDOC4_TEMPLATES = new ToolStripMenuItem("Шаблоны документов");
      CLIENTCUSTOMDOC4.DropDownItems.AddRange(new ToolStripItem[] {CLIENTCUSTOMDOC4_CREATE, CLIENTCUSTOMDOC4_NEW, CLIENTCUSTOMDOC4_SIGNED, CLIENTCUSTOMDOC4_INPROCESS, CLIENTCUSTOMDOC4_REJECTED0GTHEN0,
        CLIENTCUSTOMDOC4_COMPLETED, CLIENTCUSTOMDOC4_ALL, CLIENTCUSTOMDOC4_TEMPLATES });

      Item209 = new ToolStripMenuItem("Документы из банка ");
      Item210 = new ToolStripMenuItem("Выписки клиента",null);
      FREEBANKDOC = new ToolStripMenuItem("Документ в произвольном формате");

      FREEBANKDOC_BANKDOCXNEWGTHEN0 = new ToolStripMenuItem("Новые документы");
      FREEBANKDOC_BANKDOCXFAVORITES = new ToolStripMenuItem("Избранные документы");
      FREEBANKDOC_BANKDOCXCOMPLETED = new ToolStripMenuItem("Список завершенных документов");
      FREEBANKDOC.DropDownItems.AddRange(new ToolStripItem[] { FREEBANKDOC_BANKDOCXNEWGTHEN0, FREEBANKDOC_BANKDOCXFAVORITES, FREEBANKDOC_BANKDOCXCOMPLETED });
      Item209.DropDownItems.AddRange(new ToolStripItem[] { Item210,FREEBANKDOC });

      TRANSITACCNOTICE = new ToolStripMenuItem("Уведомление о зачислении средств на транзитный валютный счет");
      TRANSITACCNOTICE_BANKDOCXCOMPLETED = new ToolStripMenuItem("Список завершенных документов");
      TRANSITACCNOTICE_BANKDOCXALL = new ToolStripMenuItem("Все документы (новые, подписанные, в обработке, завершенные...) ");
      TRANSITACCNOTICE.DropDownItems.AddRange(new ToolStripItem[] { TRANSITACCNOTICE_BANKDOCXCOMPLETED, TRANSITACCNOTICE_BANKDOCXALL});

      Item219 = new ToolStripMenuItem("");

      ARCHIVE = new ToolStripMenuItem("Архивы");
      PAYDOCRU_ARCHIVE = new ToolStripMenuItem("Архив платежных поручений (в рублях)");
      PAYROLLDOC_ARCHIVE = new ToolStripMenuItem("Архив зарплатных ведомостей");
      PAYDOCCUR_ARCHIVE = new ToolStripMenuItem("Архив поручений на перевод валюты");
      CURRBUY_ARCHIVE = new ToolStripMenuItem("Архив поручений на покупку валюты");
      CURRSELL_ARCHIVE = new ToolStripMenuItem("Архив поручений на продажу валюты");
      CURRCONVERSION_ARCHIVE = new ToolStripMenuItem("Архив поручений на конверсию валюты");
      TRANSITACCPAYDOC_ARCHIVE = new ToolStripMenuItem("Архив распоряжений на списание средств с транзитного валютного счета");
      MANDATORYCURRSELL_ARCHIVE = new ToolStripMenuItem("Архив распоряжений на обязательную продажу валютной выручки");
      DEALPASSCON138I_ARCHIVE = new ToolStripMenuItem("Архив паспортов сделок по контракту (138-И)");
      DEALPASSCRED138I_ARCHIVE = new ToolStripMenuItem("Архив паспортов сделок по кредитному договору (138-И)");
      CURRDEALINQUIRY138I_ARCHIVE = new ToolStripMenuItem("Архив справок о валютных операциях (138-И)");
      CONFDOCINQUIRY138I_ARCHIVE = new ToolStripMenuItem("Справки о подтверждающих документах (138-И)");
      DEALPASSCLOSE_ARCHIVE = new ToolStripMenuItem("Заявления о закрытии/переводе паспортов сделок (138-И)");
      DEALPASSRENEW_ARCHIVE = new ToolStripMenuItem("Заявления о переоформлении паспортов сделок (138-И)");

      Item234 = new ToolStripMenuItem("--------------------------------");
      DEALPASSCON_ARCHIVE = new ToolStripMenuItem("Архив паспортов сделок по контракту");
      DEALPASSCRED_ARCHIVE = new ToolStripMenuItem("Архив паспортов сделок по кредитному договору");
      CURRDEALINQUIRY_ARCHIVE = new ToolStripMenuItem("Архив справок о валютных операциях");
      RURDEALINQUIRY_ARCHIVE = new ToolStripMenuItem("Архив справок о поступлении валюты");
      CONFDOCINQUIRY_ARCHIVE = new ToolStripMenuItem("Архив справок о подтверждающих документах");
      FREECLIENTDOC_ARCHIVE = new ToolStripMenuItem("Архив документов в произвольном формате в банк");
      STATEMENTQUERY_ARCHIVE = new ToolStripMenuItem("Архив запросов на получение выписки по счету за определенный период");
      CANCELLATIONREQUEST_ARCHIVE = new ToolStripMenuItem("Архив запросов на отзыв документа");

      ARCHIVE.DropDownItems.AddRange(new ToolStripItem[] { PAYDOCRU_ARCHIVE, PAYROLLDOC_ARCHIVE, PAYDOCCUR_ARCHIVE, CURRBUY_ARCHIVE, CURRSELL_ARCHIVE, CURRCONVERSION_ARCHIVE,
        TRANSITACCPAYDOC_ARCHIVE, MANDATORYCURRSELL_ARCHIVE, DEALPASSCON138I_ARCHIVE, DEALPASSCRED138I_ARCHIVE, CURRDEALINQUIRY138I_ARCHIVE, CONFDOCINQUIRY138I_ARCHIVE,
        DEALPASSCLOSE_ARCHIVE, DEALPASSRENEW_ARCHIVE});

      ARCHIVE.DropDownItems.AddRange(new ToolStripItem[] {Item234,DEALPASSCON_ARCHIVE, DEALPASSCRED_ARCHIVE, CURRDEALINQUIRY_ARCHIVE, RURDEALINQUIRY_ARCHIVE, CONFDOCINQUIRY_ARCHIVE,
        FREECLIENTDOC_ARCHIVE, STATEMENTQUERY_ARCHIVE, CANCELLATIONREQUEST_ARCHIVE}); ;

      Item243 = new ToolStripMenuItem("Архив выписок");
      FREEBANKDOC_BANKDOCXARCHIVE = new ToolStripMenuItem("Архив документов в произвольном формате из банка");
      TRANSITACCNOTICE_BANKDOCXARCHIVE = new ToolStripMenuItem("Архив уведомлений о зачислении средств на транзитный валютный счет");
      CLIENTCUSTOMDOC_BANKDOCXARCHIVE = new ToolStripMenuItem("Архив иных клиентских документов");
      Item243.DropDownItems.AddRange(new ToolStripItem[] { FREEBANKDOC_BANKDOCXARCHIVE, TRANSITACCNOTICE_BANKDOCXARCHIVE, CLIENTCUSTOMDOC_BANKDOCXARCHIVE});
      ARCHIVE.DropDownItems.AddRange(new ToolStripItem[] { Item243 });

      Item247 = new ToolStripMenuItem("Сведения");

      BRANCHES = new ToolStripMenuItem("Подразделения");
      Item250 = new ToolStripMenuItem("Российские банки");
      Item251 = new ToolStripMenuItem("Банки мира");
      Item252 = new ToolStripMenuItem("Валюты");
      Item253 = new ToolStripMenuItem("Курсы валют");
      Item254 = new ToolStripMenuItem("Показатели статуса налогоплательщика");
      Item255 = new ToolStripMenuItem("Показатели основания платежа");
      Item256 = new ToolStripMenuItem("Показатели налогового периода");
      Item257 = new ToolStripMenuItem("Показатели типа платежа");
      Item258 = new ToolStripMenuItem("Коды бюджетной классификации");
      Item259 = new ToolStripMenuItem("Виды валютных операций (117-И)");
      Item260 = new ToolStripMenuItem("Виды деятельности");
      Item261 = new ToolStripMenuItem("--------------------------------------");

      Item262 = new ToolStripMenuItem("Виды валютных операций");
      Item263 = new ToolStripMenuItem("Основания для закрытия ПС");
      Item264 = new ToolStripMenuItem("--------------------------------------");
      REMOTEOFFICIALS = new ToolStripMenuItem("Уполномоченные лица");
      REMOTECORRESP = new ToolStripMenuItem("Корреспонденты (для рублевых платежей)");
      REMOTEGROUND = new ToolStripMenuItem("Назначения платежа (для рублевых платежей)");
      REMOTEBENEF = new ToolStripMenuItem("Контрагенты");
      REMOTEGROUNDINT = new ToolStripMenuItem("Назначения валютного платежа");
      DEALPASSPORT = new ToolStripMenuItem("Номера паспортов сделок");
      REMOTES2RINFO = new ToolStripMenuItem("Информация получателю платежа");

      REMOTE = new ToolStripMenuItem("");
//      DEALPASSPORT = new ToolStripMenuItem();
//      REMOTES2RINFO = new ToolStripMenuItem();
      Item272 = new ToolStripMenuItem("");
      Item273 = new ToolStripMenuItem("Импорт документов из бухгалтерских систем");

      Item274 = new ToolStripMenuItem("Генерация");
      Item275 = new ToolStripMenuItem("Генерация и автоматический переход на новый комплект ключей");
      Item276 = new ToolStripMenuItem("Создать запрос на перегенерацию, посмотреть параметры подписей абонентов");

      Item274.DropDownItems.AddRange(new ToolStripItem[] { Item275, Item276 });

      CRYPTO_NEWCRYPTO = new ToolStripMenuItem("Список новых документов, доступных для редактирования");
      CRYPTO_SIGNED = new ToolStripMenuItem("Подписанные документы");
      CRYPTO_INPROCESS = new ToolStripMenuItem("Список запросов, находящихся в процессе обработки в банке");
      CRYPTO_REGISTERED = new ToolStripMenuItem("Список обработанных запросов");
      CRYPTO_REJECTEDCRYPTO = new ToolStripMenuItem("Список отказанных запросов, помеченных как непросмотренные");
      CRYPTO_COMPLETED = new ToolStripMenuItem("Список завершённых запросов");
      CRYPTO_ALL = new ToolStripMenuItem("Все запросы (новые, подписанные, в обработке, завершенные...)");

      Item277 = new ToolStripMenuItem("Прочее");
      Item285 = new ToolStripMenuItem("Смена пароля");
      Item286 = new ToolStripMenuItem("Проверка квитанций");
      Item287 = new ToolStripMenuItem("Настройка параметров ключевых носителей абонентов ЭЦП");
      Item288 = new ToolStripMenuItem("-----------------------------------------------------");
      Item289 = new ToolStripMenuItem("Настройка параметров выписки");
      Item290 = new ToolStripMenuItem("Настройка интерфейса");
      Item291 = new ToolStripMenuItem("-----------------------------------------------------");
      Item292 = new ToolStripMenuItem("Переключиться на русский язык");
      Item293 = new ToolStripMenuItem("Переключиться на английский язык");
      Item294 = new ToolStripMenuItem("Выйти из системы");

      CRYPTO_NEWCRYPTO.DropDownItems.AddRange(new ToolStripItem[] { Item273, CRYPTO_SIGNED, CRYPTO_INPROCESS, CRYPTO_REGISTERED, CRYPTO_REJECTEDCRYPTO, CRYPTO_COMPLETED, CRYPTO_ALL });
      Item277.DropDownItems.AddRange(new ToolStripItem[] { Item285, Item286, Item287, Item288, Item289, Item290, Item291, Item292, Item293, Item294 });

      MyImport = new ToolStripMenuItem("");
      MySigner = new ToolStripMenuItem("");
      MyCrypto = new ToolStripMenuItem("");
      MyTools = new ToolStripMenuItem("");

      Item247.DropDownItems.AddRange(new ToolStripItem[] { BRANCHES, Item250, Item251, Item252, Item253, Item254, Item255, Item256, Item257, Item258, Item259, Item260, Item261,
        Item262, Item263, Item264, REMOTEOFFICIALS, REMOTECORRESP, REMOTEGROUND, REMOTEBENEF, REMOTEGROUNDINT, DEALPASSPORT, REMOTES2RINFO });

      STATEMENTS.DropDownItems.AddRange(new ToolStripItem[] { STATEMENTQUERY, CANCELLATIONREQUEST, Item209, TRANSITACCNOTICE });
      DOCS.DropDownItems.AddRange(new ToolStripItem[] { PAYDOCRU, FREECLIENTDOC, CRYPTO_NEWCRYPTO });
      CURRDEAL.DropDownItems.AddRange(new ToolStripItem[] { CURRDEALINQUIRY138I, CONFDOCINQUIRY138I, CURRDEALINQUIRY, RURDEALINQUIRY, CONFDOCINQUIRY });
      DEALPASS.DropDownItems.AddRange(new ToolStripItem[] { DEALPASSCON138I, DEALPASSCRED138I, DEALPASSCLOSE, DEALPASSRENEW, 
        DEALPASSCON, DEALPASSCRED, CLIENTCUSTOMDOC1, CLIENTCUSTOMDOC2, CLIENTCUSTOMDOC3, CLIENTCUSTOMDOC4});
      menuStrip2.Items.AddRange(new ToolStripItem[]
      {
              MAINPAGE, ALLNEWS,DOCS,CURR,DEALPASS,CURRDEAL,STATEMENTS,ARCHIVE,Item247,Item274,Item277
      });
      //        private ToolStripMenuItem MAINPAGE, ALLNEWS, DOCS, PAYDOCRU, PAYDOCCUR, CURRBUY, CURRSELL, MANDATORYCURRSELL, DEALPASSCON138I, DEALPASSCRED138I,
      //          CURRDEALINQUIRY138I, CONFDOCINQUIRY138I, DEALPASSCLOSE, DEALPASSRENEW, Item103, DEALPASSCON, DEALPASSCRED, CURRDEALINQUIRY, RURDEALINQUIRY, CONFDOCINQUIRY,
      //      FREECLIENTDOC, STATEMENTQUERY, CANCELLATIONREQUEST, CLIENTCUSTOMDOC1, CLIENTCUSTOMDOC2, CLIENTCUSTOMDOC3, CLIENTCUSTOMDOC4, Item209, Item210, FREEBANKDOC,
      //      TRANSITACCNOTICE, Item219, ARCHIVE, Item234, Item243, Item247, REMOTE, DEALPASSPORT, REMOTES2RINFO, Item272,
      //      CRYPTO_NEWCRYPTO, Item285, MyImport, MySigner, MyCrypto, MyTools;





      toolStrip1 = new ToolStrip();goButton = new ToolStripButton();backButton = new ToolStripButton();
          forwardButton = new ToolStripButton();stopButton = new ToolStripButton();refreshButton = new ToolStripButton();
          homeButton = new ToolStripButton();searchButton = new ToolStripButton();printButton = new ToolStripButton(); IdPwdButton= new ToolStripButton();
          BankStatementButton = new ToolStripButton();
          RealBankStatementButton = new ToolStripButton();


          MainPageButton = new ToolStripButton();
          toolStrip2 = new ToolStrip();
          toolStripTextBox1 = new ToolStripTextBox();
          statusStrip1 = new StatusStrip();
          toolStripStatusLabel1 = new ToolStripStatusLabel();

//            menuStrip1.Items.Add(fileToolStripMenuItem);
            menuStrip1.Items.AddRange(new ToolStripItem[] 
            {
              fileToolStripMenuItem, pravkaToolStripMenuItem,serviceToolStripMenuItem
            });

      //            menuStrip2.Items.Add(serviceToolStripMenuItem);

            fileToolStripMenuItem.DropDownItems.AddRange(new ToolStripItem[] {saveAsToolStripMenuItem, toolStripSeparator1, 
                    pageSetupToolStripMenuItem, printToolStripMenuItem, printPreviewToolStripMenuItem, toolStripSeparator2,
                    propertiesToolStripMenuItem, closeTabToolStripMenuItem});// exitToolStripMenuItem});
            serviceToolStripMenuItem.DropDownItems.AddRange(new ToolStripItem[] {propsTabToolStripMenuItem});
            serviceToolStripMenuItem.DropDownItems.AddRange(new ToolStripItem[] { aboutBankStripMenuItem });
      

            pravkaToolStripMenuItem.DropDownItems.AddRange(new ToolStripItem[] {erasePage,copyPage,pastePage});


            fileToolStripMenuItem.Text = "&Файл";
            saveAsToolStripMenuItem.Text = "Сохр. &как...";
            pageSetupToolStripMenuItem.Text = "Настр. пе&чати...";
            printToolStripMenuItem.Text = "&Печать...";
            printPreviewToolStripMenuItem.Text = "Просмотр &печати...";
            propertiesToolStripMenuItem.Text = "Свойства";
            closeTabToolStripMenuItem.Text = "Закрыть вкладку";

//            exitToolStripMenuItem.Text = "Вы&ход";

            serviceToolStripMenuItem.Text = "Сервис";
            propsTabToolStripMenuItem.Text = "Свойства браузера";
            aboutBankStripMenuItem.Text = "О банке";


            pravkaToolStripMenuItem.Text= "Правка";
            erasePage.Text= "Вырезать";
            copyPage.Text= "Копировать";
            pastePage.Text = "Вставить";

            MAINPAGE.Text = "Главная страница";
      /*
              private ToolStripMenuItem MAINPAGE, ALLNEWS, DOCS, PAYDOCRU, PAYDOCCUR, CURRBUY, CURRSELL, MANDATORYCURRSELL, DEALPASSCON138I, DEALPASSCRED138I,
                CURRDEALINQUIRY138I, CONFDOCINQUIRY138I, DEALPASSCLOSE, DEALPASSRENEW, Item103, DEALPASSCON, DEALPASSCRED, CURRDEALINQUIRY, RURDEALINQUIRY, CONFDOCINQUIRY,
            FREECLIENTDOC, STATEMENTQUERY, CANCELLATIONREQUEST, CLIENTCUSTOMDOC1, CLIENTCUSTOMDOC2, CLIENTCUSTOMDOC3, CLIENTCUSTOMDOC4, Item209, Item210, FREEBANKDOC,
            TRANSITACCNOTICE, Item219, ARCHIVE, Item234, Item243, Item247, REMOTE, DEALPASSPORT, REMOTES2RINFO, Item272,
            CRYPTO_NEWCRYPTO, Item285, MyImport, MySigner, MyCrypto, MyTools;

                  STATEMENTQUERYStripMenuItem.Text = "Выписка";
                  propsTabToolStripMenuItem.Text = "Создать новый документ";
                  aboutBankStripMenuItem.Text = "Список новых документов";
                  propsTabToolStripMenuItem.Text = "Подписанные документы";
                  aboutBankStripMenuItem.Text = "В процессе обработки в банке";
                  propsTabToolStripMenuItem.Text = "Список отказанных документов";
                  aboutBankStripMenuItem.Text = "Список завершенных документов";
                  aboutBankStripMenuItem.Text = "Все документы";
      */
            printToolStripMenuItem.ShortcutKeys = Keys.Control | Keys.P;

            saveAsToolStripMenuItem.Click +=new System.EventHandler(saveAsToolStripMenuItem_Click);
            pageSetupToolStripMenuItem.Click +=new System.EventHandler(pageSetupToolStripMenuItem_Click);
            printToolStripMenuItem.Click +=new System.EventHandler(printToolStripMenuItem_Click);
            printPreviewToolStripMenuItem.Click +=new System.EventHandler(printPreviewToolStripMenuItem_Click);
            propertiesToolStripMenuItem.Click +=new System.EventHandler(propertiesToolStripMenuItem_Click);
//            exitToolStripMenuItem.Click +=new System.EventHandler(exitToolStripMenuItem_Click);
            closeTabToolStripMenuItem.Click += new System.EventHandler(closeToolStripMenuItem_Click);

            propsTabToolStripMenuItem.Click += new System.EventHandler(propsTabToolStripMenuItem_Click);
            aboutBankStripMenuItem.Click += new System.EventHandler(aboutBankStripMenuItem_Click);

            toolStrip1.Items.AddRange(new ToolStripItem[] { goButton, backButton, forwardButton, stopButton, refreshButton, homeButton, searchButton, printButton, IdPwdButton,
              BankStatementButton, RealBankStatementButton, MainPageButton });

            goButton.Text = "Пуск";backButton.Text = "Назад";forwardButton.Text = "Вперёд";
            stopButton.Text = "Остан.";refreshButton.Text = "Обновить";homeButton.Text = "Домой";
            searchButton.Text = "Поиск";printButton.Text = "Печать";IdPwdButton.Text = "ИмяПароль";
            BankStatementButton.Text = "Выписка";//span_STATEMENTQUERY
            RealBankStatementButton.Text = "Выписка в файл";//span_STATEMENTQUERY

            MainPageButton.Text = "Главная";//span_MAINPAGE

            backButton.Enabled = false;
            forwardButton.Enabled = false;

            goButton.Click += new System.EventHandler(goButton_Click);
            backButton.Click += new System.EventHandler(backButton_Click);
            forwardButton.Click += new System.EventHandler(forwardButton_Click);
            stopButton.Click += new System.EventHandler(stopButton_Click);
            refreshButton.Click += new System.EventHandler(refreshButton_Click);
            homeButton.Click += new System.EventHandler(homeButton_Click);
            searchButton.Click += new System.EventHandler(searchButton_Click);
            printButton.Click += new System.EventHandler(printButton_Click);
            IdPwdButton.Click += new System.EventHandler(IdPwdButton_Click);
            BankStatementButton.Click += new System.EventHandler(BankStatementButton_Click);
            RealBankStatementButton.Click += new System.EventHandler(RealBankStatementButton_Click);
            MainPageButton.Click += new System.EventHandler(MainPageButton_Click);
      

            toolStrip2.Items.Add(toolStripTextBox1);
            toolStripTextBox1.Size = new System.Drawing.Size(250, 25);
            toolStripTextBox1.KeyDown +=new KeyEventHandler(toolStripTextBox1_KeyDown);
            toolStripTextBox1.Click +=new System.EventHandler(toolStripTextBox1_Click);

            statusStrip1.Items.Add(toolStripStatusLabel1);
            WebBrowser.Dock = DockStyle.Fill;
            WebBrowser.Navigated +=new WebBrowserNavigatedEventHandler(webBrowser1_Navigated);

            //            toolStrip2 = new ToolStrip();
//            toolStripTextBox1 = new ToolStripTextBox();
            this.Controls.Add(WebBrowser);
//            Controls.AddRange(new Control[] { toolStrip2, toolStrip1, menuStrip1, menuStrip2, statusStrip1, menuStrip1, menuStrip2 });
            Controls.AddRange(new Control[] { toolStrip2, toolStrip1, statusStrip1, menuStrip1, menuStrip2 });
        }
         private void Load()
         {
             WebBrowser.ObjectForScripting = this;
             WebBrowser.DocumentText =
                 "<html><head><script>" +
                 "function test(message) { alert(message); }" +
                 "</script></head><body><button " +
                 "onclick=\"window.external.Test('called from script code')\">" +
                 "call client code from script code</button>" +
                 "</body></html>";

         }
         public void Test(String message)
         {
             MessageBox.Show(message, "client code");
         }
         private void button1_Click(object sender, EventArgs e)
         {
             WebBrowser.Document.InvokeScript("test",new String[] { "called from client code" });
         }
         /// <summary>
        /// Change the title of the tab page.
        /// </summary>
        void WebBrowser_DocumentTitleChanged(object sender, EventArgs e)
        {
//          this.Text = WebBrowser.DocumentTitle;
//          this.Text = "Мяско";
          MainForm cdcd = (MainForm)this.FindForm();
//          Button m = (MainForm)this.FindForm().Mjasko;
          IButtonControl ibc = cdcd.AcceptButton;
          ControlCollection asas = cdcd.Controls;
          int y = asas.Count;
          for(int i=0;i<y;i++)
          {
//            if(asas[i].GetType == Button)
            Type ttt= asas[i].GetType();
            string nmnm = ttt.Name;
            string hmhm2 = ttt.ToString();
//            WebBrowser.c
            if (asas[i].GetType().Name == "Button")
            {
                Button a = (Button)asas[i];
//              currentButton2
//                AccessibleStates aaa = a.AccessibilityObject.State;
/*
                AccessibleStates ao = a.AccessibilityObject.State;
                AccessibleObject ao2= a.AccessibilityObject.GetFocused();
                AccessibleObject ao3 = cdcd.AccessibilityObject.GetFocused();
                AccessibleObject abb = cdcd.AccessibilityObject.GetSelected();
 */
                    //                        IAccessible.accSelection
                    if (a.Focused)this.Text = a.Text;
                    this.Text = cdcd.currentButton;

              //            a.
            }
          }
          Control ccff = cdcd.ActiveControl;
          Control cfs = cdcd.Parent;
//            Отключить безопасную авторизацию 
          HtmlDocument doc = WebBrowser.Document;
          Control.ControlCollection ccc = WebBrowser.Controls;
          this.Text = cdcd.currentButton;
          //            doc.All.GetElementsByName(lg)
// "<XML id=lg>\r\n<?xml version=\"1.0\"?>\r\n<TABLE BORDER=\"0\" CELLSPACING=\"0\" width=\"440\" CELLPADDING=\"0\" ID=\"mtbl\">\r\n<TR><TD colspan=\"2\">\r\n\t<DIV CLASS=\"AlertMess\">ВНИМАНИЕ! Для Вашей безопасности рекомендуется использование функционала БЕЗОПАСНОЙ АВТОРИЗАЦИИ</DIV>\r\n\t<INPUT TYPE=\"checkbox\" ID=\"fUnsafe\" class=\"ldWrk\" STYLE=\"border: 0px;\" onclick=\"Top.changeSafe(this)\"/><LABEL for=\"fUnsafe\">Отключить безопасную авторизацию</LABEL>\r\n</TD></TR>\r\n<TR ID=\"LgPdLb\" height=\"34\"><TD colspan=\"2\">Введите Ваши логин и пароль:</TD></TR>\r\n<TR ID=\"CrLg\"><TD colspan=\"2\"><SPAN STYLE=\"width: 185px;\">Логин </SPAN><INPUT class=\"ldInp\" onkeypress=\"top.a_k(window,event)\" TYPE=\"text\" ID=\"L\" VALUE=\"1107459826\" MAXLENGTH=\"10\" DISABLED=\"false\"/></TD></TR>\r\n\t<TR ID=\"CrPd\"><TD COLSPAN=\"2\">\r\n\t\t<SPAN ID=\"CrPdLb\" STYLE=\"width: 185px;\">Пароль </SPAN><SPAN ID=\"OdPdLb\" STYLE=\"width: 185px; display: none;\">Старый пароль </SPAN>\r\n\t\t<INPUT class=\"ldInp\" onkeypress=\"top.a_k(window,event)\" TYPE=\"Password\" ID=\"P\" VALUE=\"\" MAXLENGTH=\"10\" DISABLED=\"false\"/><INPUT TYPE=\"hidden\" ID=\"SP\"/><INPUT TYPE=\"hidden\" ID=\"SW\" VALUE=\"V2QeiMu5E18lYGrcZpdzya6OfFfUqEtI9ND2Mmq0Kr285A0SaDJF2KLV1IFcHsy4RsU=\"/>\r\n\t\t</TD>\r\n\t</TR>\r\n\t<TR ID=\"ChPd\" STYLE=\"display: none;\"><TD COLSPAN=\"2\" STYLE=\"padding-top: 2px;\">\r\n\t\t<SPAN STYLE=\"width: 185px;\">Новый пароль </SPAN>\r\n\t\t<INPUT class=\"ldInp\" onkeypress=\"top.a_k(window,event)\" TYPE=\"Password\" ID=\"NWD\" VALUE=\"\" SIZE=\"20\" MAXLENGTH=\"10\" DISABLED=\"1\"/><INPUT TYPE=\"hidden\" ID=\"SNWD\"/>\r\n\t<BR/>\r\n\t\t<SPAN STYLE=\"width: 185px;\">Подтверждение нового пароля </SPAN>\r\n\t\t<INPUT class=\"ldInp\" onkeypress=\"top.a_k(window,event)\" TYPE=\"Password\" ID=\"CND\" VALUE=\"\" SIZE=\"20\" MAXLENGTH=\"10\" DISABLED=\"1\"/><INPUT TYPE=\"hidden\" ID=\"SCND\"/></TD>\r\n\t</TR>\r\n\r\n\t<TR height=\"140\">\r\n\t\t<TD colspan=\"2\" ALIGN='Right' valign=\"bottom\">\r\n\t\t\t<BUTTON ID=\"SB\" CLASS=\"stdBtn\" STYLE=\"display: none;\" onclick=\"Top.SF(window,top.chsc);\">Далее</BUTTON>\r\n\t\t\t<BUTTON ID=\"SfB\" style=\"width1: 220px; margin-left1: 125px; margin-top1: 10px;\" onclick=\"Top.doSafe();\">Безопасная авторизация</BUTTON>\r\n\t\t</TD>\r\n\t</TR>\r\n</TABLE>\r\n\r\n\r\n\r\n\r\n</XML>"
// "\r\n<?xml version=\"1.0\"?>\r\n<TABLE BORDER=\"0\" CELLSPACING=\"0\" width=\"440\" CELLPADDING=\"0\" ID=\"mtbl\">\r\n<TR><TD colspan=\"2\">\r\n\t<DIV CLASS=\"AlertMess\">ВНИМАНИЕ! Для Вашей безопасности рекомендуется использование функционала БЕЗОПАСНОЙ АВТОРИЗАЦИИ</DIV>\r\n\t<INPUT TYPE=\"checkbox\" ID=\"fUnsafe\" class=\"ldWrk\" STYLE=\"border: 0px;\" onclick=\"Top.changeSafe(this)\"/><LABEL for=\"fUnsafe\">Отключить безопасную авторизацию</LABEL>\r\n</TD></TR>\r\n<TR ID=\"LgPdLb\" height=\"34\"><TD colspan=\"2\">Введите Ваши логин и пароль:</TD></TR>\r\n<TR ID=\"CrLg\"><TD colspan=\"2\"><SPAN STYLE=\"width: 185px;\">Логин </SPAN><INPUT class=\"ldInp\" onkeypress=\"top.a_k(window,event)\" TYPE=\"text\" ID=\"L\" VALUE=\"1107459826\" MAXLENGTH=\"10\" DISABLED=\"false\"/></TD></TR>\r\n\t<TR ID=\"CrPd\"><TD COLSPAN=\"2\">\r\n\t\t<SPAN ID=\"CrPdLb\" STYLE=\"width: 185px;\">Пароль </SPAN><SPAN ID=\"OdPdLb\" STYLE=\"width: 185px; display: none;\">Старый пароль </SPAN>\r\n\t\t<INPUT class=\"ldInp\" onkeypress=\"top.a_k(window,event)\" TYPE=\"Password\" ID=\"P\" VALUE=\"\" MAXLENGTH=\"10\" DISABLED=\"false\"/><INPUT TYPE=\"hidden\" ID=\"SP\"/><INPUT TYPE=\"hidden\" ID=\"SW\" VALUE=\"/nNBGf6f0rHUdPHQVjc8fRmxvn2KnvDRj8nZvvDqJbHwwE+K8Q8/EgFm8Lai7ADHOIc=\"/>\r\n\t\t</TD>\r\n\t</TR>\r\n\t<TR ID=\"ChPd\" STYLE=\"display: none;\"><TD COLSPAN=\"2\" STYLE=\"padding-top: 2px;\">\r\n\t\t<SPAN STYLE=\"width: 185px;\">Новый пароль </SPAN>\r\n\t\t<INPUT class=\"ldInp\" onkeypress=\"top.a_k(window,event)\" TYPE=\"Password\" ID=\"NWD\" VALUE=\"\" SIZE=\"20\" MAXLENGTH=\"10\" DISABLED=\"1\"/><INPUT TYPE=\"hidden\" ID=\"SNWD\"/>\r\n\t<BR/>\r\n\t\t<SPAN STYLE=\"width: 185px;\">Подтверждение нового пароля </SPAN>\r\n\t\t<INPUT class=\"ldInp\" onkeypress=\"top.a_k(window,event)\" TYPE=\"Password\" ID=\"CND\" VALUE=\"\" SIZE=\"20\" MAXLENGTH=\"10\" DISABLED=\"1\"/><INPUT TYPE=\"hidden\" ID=\"SCND\"/></TD>\r\n\t</TR>\r\n\r\n\t<TR height=\"140\">\r\n\t\t<TD colspan=\"2\" ALIGN='Right' valign=\"bottom\">\r\n\t\t\t<BUTTON ID=\"SB\" CLASS=\"stdBtn\" STYLE=\"display: none;\" onclick=\"Top.SF(window,top.chsc);\">Далее</BUTTON>\r\n\t\t\t<BUTTON ID=\"SfB\" style=\"width1: 220px; margin-left1: 125px; margin-top1: 10px;\" onclick=\"Top.doSafe();\">Безопасная авторизация</BUTTON>\r\n\t\t</TD>\r\n\t</TR>\r\n</TABLE>"

        }
        // Updates the URL in TextBoxAddress upon navigation.
        private void webBrowser1_Navigated(object sender,WebBrowserNavigatedEventArgs e)
        {
            toolStripTextBox1.Text = WebBrowser.Url.ToString();
        }
        // Navigates webBrowser1 to the previous page in the history.
        private void backButton_Click(object sender, EventArgs e) { WebBrowser.GoBack(); }
        // Disables the Back button at the beginning of the navigation history.
        private void WebBrowser_CanGoBackChanged(object sender, EventArgs e)
        {
            backButton.Enabled = WebBrowser.CanGoBack;
        }
        // Disables the Forward button at the end of navigation history.
        private void webBrowser1_CanGoForwardChanged(object sender, EventArgs e)
        {
            forwardButton.Enabled = WebBrowser.CanGoForward;
        }
        private void stopButton_Click(object sender, EventArgs e)
        {
            WebBrowser.Stop();
        }

        // Reloads the current page.
        private void refreshButton_Click(object sender, EventArgs e)
        {
            // Skip refresh if about:blank is loaded to avoid removing
            // content specified by the DocumentText property.
            if (!WebBrowser.Url.Equals("about:blank")){WebBrowser.Refresh();}
        }
        // Navigates webBrowser1 to the home page of the current user.
        private void homeButton_Click(object sender, EventArgs e){WebBrowser.GoHome();}
        // Navigates webBrowser1 to the search page of the current user.
        private void searchButton_Click(object sender, EventArgs e){WebBrowser.GoSearch();}
        // Prints the current document using the current print settings.
        private void printButton_Click(object sender, EventArgs e){WebBrowser.Print();}
    // Updates the status bar with the current browser status text.

    private void WriteFrame(StreamWriter sw, HtmlWindow frame)
    {
      if (frame.Document.All.Count > 0)
      {
        HtmlDocument frDoc = frame.Document;
        HtmlElementCollection frColl = frDoc.All;
        sw.WriteLine("Документ "+"===============================================================================");
        sw.WriteLine("Документ "+"===============================================================================\n");
        sw.WriteLine("Заголовок документа: " + frDoc.Title.ToString());
        sw.WriteLine("Интернет ссылка документа: " + frDoc.Url.ToString());
        sw.WriteLine("Имя документа: " + frDoc.Window.Name.ToString());
        sw.WriteLine("Количество элементов: " + frDoc.All.Count.ToString() + ";");
        foreach (HtmlElement elem in frColl)
        {
          sw.WriteLine("Имя элемента: " + elem.Name.ToString() + ";+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
          if (elem.OuterText != null) sw.Write("\n\nOuterText: " + elem.OuterText.ToString() + ";\n"); else sw.Write("\nOuterText: ;-----------------------------------------------\n");
          if (elem.InnerHtml != null) sw.WriteLine("\n\nInnerHtml: " + elem.InnerHtml.ToString() + ";\n"); else sw.Write("\nInnerHtml: -----------------------------------------------;\n");
          if (elem.GetType().ToString() != null) sw.WriteLine("\n\nТип элемента: " + elem.GetType().ToString() + ";\n"); else sw.Write("\nТип элемента: -----------------------------------------------;\n");
          if (elem.Style != null) sw.WriteLine("\n\nСтиль элемента: " + elem.Style.ToString() + ";\n"); else sw.Write("\nСтиль элемента: -----------------------------------------------;\n");
          sw.WriteLine("Конец элемента;" + elem.Name.ToString() + "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");

          //                    elem.GetAttribute
        }
        //function SC(SchemeName,FilterIdent){
        //                DEF(Top.MainBllName + '.SC', SchemeName, null, FilterIdent);
        /*
      function onClickH(sItemID) {
        var oItemNode = document.all.MyXML.selectSingleNode("//ITEM[@ID='" + sItemID + "']");
        if (oItemNode == null) return;
        var oURL = oItemNode.selectSingleNode('@URL');
        var sActID = oItemNode.getAttribute('ACTID');
        if (oURL != null) eval(oURL.text)
        else OpenClose(sItemID); // Открываем/закрываем дочерние ветки, если они есть
        if (document.all['tr_' + sItemID] == null) selectNode(sItemID);
        }

        function DEF(TaskName,P1,P2,P3,P4,Target){
          if(Top.FDataChanged(Top.mw)){Top.noSID=''; return;}
          var URL='?T='+TaskName+'&nvgt=1'+
          ((Top.noSID=='1')?'':'&SID='+Top.SID)+
          ((P1==null)?'':'&SCHEMENAME='+P1)+
          ((P2==null)?'':'&XACTION='+P2)+
          ((P3==null)?'':'&FILTERIDENT='+P3)+
          ((P4==null)?'':P4)+
          '&TMS='+Top.fnRnd();
          Top.noSID='';
          if(Target==null) Top.mw.location.replace(S_PathName+URL);
          else if(Target==Top.ccSITE+'_HLP') Top.mh.location.replace(S_PathName+URL);
          else window.open(S_PathName+URL ,((Target!=null)?Target:(Top.ccSITE+'_MAINW')));
        }
onClickH('MAINPAGE')
<TD align=right><B><SPAN onclick="Top.nv.SC('NEWS', 'DEFAULT')" class=lnk></SPAN></B></TD></TR></TBODY></TABLE>
        */
      }
      sw.WriteLine("Конец документа "+"===============================================================================");
      sw.WriteLine("Конец документа "+"===============================================================================\n");
    }
private void WriteFrames(HtmlDocument hDoc)
{
      //      mshtml.HTMLDocument hDocDom = (mshtml.HTMLDocument)hDoc.DomDocument;
      //      IHTMLDocument2 currentDoc = (IHTMLDocument2)hDoc.DomDocument;
      string lblTime = string.Format("{0:D2}.{1:D2}.{2:D2}", DateTime.Now.Date.Day, DateTime.Now.Date.Month, DateTime.Now.Date.Year);

      //      dd.Date
      string sourceDirectory = @"..\" + lblTime;
//      string path = @"..\" + sourceDirectory + "Objects.txt";


      string pathNVGT = sourceDirectory + "\\Frames_NVGT.txt";
      string pathTOOLBAR =sourceDirectory + "\\Frames_TOOLBAR.txt";
      string pathMAINW = sourceDirectory + "\\Frames_MAINW.txt";// RT_IC_MAINW
      string pathHLP = sourceDirectory + "\\Frames_HLP.txt";
      StreamWriter swNVGT; StreamWriter swTOOLBAR, swMAINW,swHLP;
      if (!System.IO.File.Exists(pathNVGT)){using (swNVGT = System.IO.File.CreateText(pathNVGT)){ swNVGT.WriteLine(DateTime.Today); }}
      if (!System.IO.File.Exists(pathTOOLBAR)) { using (swTOOLBAR = System.IO.File.CreateText(pathTOOLBAR)) { swTOOLBAR.WriteLine(DateTime.Today); } }
      if (!System.IO.File.Exists(pathMAINW)) { using (swMAINW = System.IO.File.CreateText(pathMAINW)) { swMAINW.WriteLine(DateTime.Today); } }
      if (!System.IO.File.Exists(pathHLP)) { using (swHLP = System.IO.File.CreateText(pathHLP)) { swHLP.WriteLine(DateTime.Today); } }


      //      HtmlWindow currentWindow = hDoc.Window;
      if (hDoc.Window.Frames.Count > 0)
      {
        HtmlWindowCollection wc = hDoc.Window.Frames;
        foreach (HtmlWindow frame in wc)
        {
          //            sw.WriteLine("Имя фрэйма " + frame.Name.ToString());sw.WriteLine("Интернет ссылка фрэйма " + frame.Url.ToString());
          if (frame.Name.ToString() == "RT_IC_TOOLBAR")
          {
            using (swTOOLBAR = System.IO.File.AppendText(pathTOOLBAR)) if (frame.Document.All.Count > 0) swTOOLBAR.WriteLine(DateTime.Today);
          }
          if (frame.Name.ToString() == "RT_IC_NVGT")
          {
            //              WriteFrame(sw, frame);
            using (swNVGT = System.IO.File.AppendText(pathNVGT))
            {
              if (frame.Document.All.Count > 0)
              {
                swNVGT.WriteLine(DateTime.Today);
                HtmlDocument frDoc = frame.Document;
                HtmlElementCollection frColl = frDoc.All;
                foreach (HtmlElement elem in frColl)
                {
                  int ad = frColl.Count;
                  HtmlElementCollection hColl = elem.GetElementsByTagName("Tree");
                  if (hColl != null && hColl.Count > 0) { int ad2 = hColl.Count; }
                  HtmlElementCollection hColl2 = elem.GetElementsByTagName("MyXSL");
                  if (hColl2 != null && hColl2.Count > 0) { int ad22 = hColl2.Count; }
                  int ec = elem.All.Count;
                  swNVGT.WriteLine("Elem of RT_IC_NVGT All.Count: " + elem.All.Count + " Name " + elem.Name + " Id " + elem.Id + ";");
                  if (elem.Id == "img_MAINPAGE")
                  {
                    int ad2232 = 25;
                    //                    elem.
                    //                    item.click(); //object[] oS = new object[1]; oS[0] = item; hDoc.InvokeScript("changeSafe", oS);

                  }
                }
                IHTMLElementCollection frColl2 = ((mshtml.HTMLDocument)frDoc.DomDocument).all;
                foreach (IHTMLElement elem2 in frColl2)
                {
                  swNVGT.WriteLine("DomDocument elem of RT_IC_NVGT title " + elem2.title + " id " + elem2.id + ";");
                  if (elem2.id == "img_MAINPAGE") { elem2.click(); }
                  if (elem2.id == "span_MAINPAGE") { elem2.click(); }
                }
              }
            }
          }
          if (frame.Name.ToString() == "RT_IC_MAINW")
          {
            using (swMAINW = System.IO.File.AppendText(pathMAINW))
            {
              if (frame.Document.All.Count > 0)
              {
                swMAINW.WriteLine(DateTime.Today);
                //                  HtmlDocument frDoc = frame.Document;
                HtmlElementCollection frColl = frame.Document.All;
                foreach (HtmlElement elem in frColl)
                {
                }
                IHTMLElementCollection frColl2 = ((mshtml.HTMLDocument)frame.Document.DomDocument).all;
                foreach (IHTMLElement elem2 in frColl2)
                {
                  swMAINW.WriteLine("DomDocument elem of RT_IC_NVGT title " + elem2.title + " id " + elem2.id + ";");
                  //                    if (elem2.id == "img_MAINPAGE") { elem2.click(); }
                  //                    if (elem2.id == "span_MAINPAGE") { elem2.click(); }
                }
              }

            }

          }
          if (frame.Name.ToString() == "RT_IC_HLP")
          {
            using (swHLP = System.IO.File.AppendText(pathHLP)) if (frame.Document.All.Count > 0) swHLP.WriteLine(DateTime.Today);
          }

        }
      }
          //          }

          //          Hashtable frameLinksHash = new Hashtable();
          //          linksTable.Add(frameUrl, frameLinksHash);
          //          foreach (HtmlElement hrefElement in frame.Document.Links)
          //          {
          //            frameLinksHash.Add(hrefElement.GetAttribute("HREF"), "Url");
          //          }
}
//    df.INQ.value='0';fnSTM(1)
    private void WriteStatementFrames(HtmlDocument hDoc)
    {
      string lblTime = string.Format("{0:D2}.{1:D2}.{2:D2}", DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second);
      string pathNVGT = @"..\StFrames_NVGT_" + lblTime + ".txt";
      string pathTOOLBAR = @"..\StFrames_TOOLBAR_" + lblTime + ".txt";
      string pathMAINW = @"..\StFrames_MAINW_" + lblTime + ".txt";// RT_IC_MAINW
      string pathHLP = @"..\StFrames_HLP_" + lblTime + ".txt";
      StreamWriter swNVGT,swTOOLBAR, swMAINW, swHLP;
      if (!System.IO.File.Exists(pathNVGT)) {using(swNVGT = System.IO.File.CreateText(pathNVGT)) { swNVGT.WriteLine(DateTime.Now); } }
      if (!System.IO.File.Exists(pathTOOLBAR)) {using(swTOOLBAR = System.IO.File.CreateText(pathTOOLBAR)){swTOOLBAR.WriteLine(DateTime.Now);}}
      if (!System.IO.File.Exists(pathMAINW)) {using(swMAINW = System.IO.File.CreateText(pathMAINW)) { swMAINW.WriteLine(DateTime.Now); } }
      if (!System.IO.File.Exists(pathHLP)) {using(swHLP = System.IO.File.CreateText(pathHLP)) { swHLP.WriteLine(DateTime.Now); } }
      //hDoc.Windows.Frames.[2].Document.Forms[0].Name - 
      if(hDoc.Window.Frames.Count > 0)
      {
        HtmlWindowCollection wc = hDoc.Window.Frames;
        foreach (HtmlWindow frame in wc)
        {
          if (frame.Name.ToString() == "RT_IC_TOOLBAR")
          {
            using (swTOOLBAR = System.IO.File.AppendText(pathTOOLBAR)) if (frame.Document.All.Count > 0) swTOOLBAR.WriteLine(DateTime.Today.ToShortTimeString());
          }
          if (frame.Name.ToString() == "RT_IC_NVGT")
          {
            using (swNVGT = System.IO.File.AppendText(pathNVGT))
            {
              if (frame.Document.All.Count > 0)
              {
                swNVGT.WriteLine(DateTime.Today);
                HtmlDocument frDoc = frame.Document;
                HtmlElementCollection frColl = frDoc.All;
                foreach (HtmlElement elem in frColl)
                {
                  swNVGT.WriteLine("All.Count: " + elem.All.Count + " Name " + elem.Name + " Id " + elem.Id + ";");
                }
                IHTMLElementCollection frColl2 = ((mshtml.HTMLDocument)frame.Document.DomDocument).all;
//                frame.Document.DomDocument.all.
                foreach (IHTMLElement elem2 in frColl2)
                {
                  swNVGT.WriteLine("DomDocument elem title " + elem2.title + " id " + elem2.id + ";");
                }
              }
            }
          }
//          frDoc.Forms
          if (frame.Name.ToString() == "RT_IC_MAINW")
          {
            using (swMAINW = System.IO.File.AppendText(pathMAINW))
            {
              if (frame.Document.All.Count > 0)
              {
                swMAINW.WriteLine(DateTime.Today);
                HtmlElementCollection frColl = frame.Document.All;
                foreach (HtmlElement elem in frColl)
                {
                }
                IHTMLElementCollection frColl2 = ((mshtml.HTMLDocument)frame.Document.DomDocument).all;
                foreach (IHTMLElement elem2 in frColl2)
                {
                  swMAINW.WriteLine("\n\t\tDomDocument elem of RT_IC_MAINW title\n" + elem2.title + "\n\t\t id " + elem2.id + ";\n\n");
                }
              }
              foreach (HtmlElement fForm in frame.Document.Forms)
              {
                swMAINW.WriteLine("Frame form title " + fForm.Name + " id " + fForm.Id + ";");
                foreach (HtmlElement fEl in fForm.All)
                {
                  swMAINW.WriteLine("\t\tForm element name\t" + fEl.Name + " \t\tId " + fEl.Id + "\n\t\tForm element OuterHtml\n" + fEl.OuterHtml + "\n\n\t\tForm element OuterText\n" + fEl.OuterText + ";\n\n");
                  swMAINW.WriteLine("\t\tForm element InnerHtml\t" + fEl.InnerHtml + "\n\n\t\tForm element InnerText\n" + fEl.InnerText + "Form element syle" + fEl.Style+";\n\n\n");
                }
                foreach (HtmlElement fEl2 in fForm.Document.All)
                  swMAINW.WriteLine("\t\tForm Document name" + fEl2.Name + "\t\tForm Document Id " + fEl2.Id + "\n\t\tForm Document OuterHtml\n" + fEl2.OuterHtml + "\n\n\t\tForm Document OuterText\n" + fEl2.OuterText + ";\n\n\n");
              }
            }
          }
          if (frame.Name.ToString() == "RT_IC_HLP")
          {
            using (swHLP = System.IO.File.AppendText(pathHLP)) if (frame.Document.All.Count > 0) swHLP.WriteLine(DateTime.Today);
          }

        }
      }
      //          }

      //          Hashtable frameLinksHash = new Hashtable();
      //          linksTable.Add(frameUrl, frameLinksHash);
      //          foreach (HtmlElement hrefElement in frame.Document.Links)
      //          {
      //            frameLinksHash.Add(hrefElement.GetAttribute("HREF"), "Url");
      //          }
    }

    public async Task<string> WaitAsynchronouslyAsync2()
    {
      HtmlDocument hDoc = ((MainForm)FindForm()).webBrowserContainer.ActiveTab.WebBrowser.Document;
      foreach (HtmlWindow frame in hDoc.Window.Frames)
      {
        if (frame.Name.ToString() == "RT_IC_NVGT")
        {
          if (frame.Document.All.Count > 0)
          {
            IHTMLElement it210 = ((mshtml.HTMLDocument)frame.Document.DomDocument).all.item("span_Item210");
            if (it210 != null) it210.click(); //CUSTOM_PART_OF_FORM_HERE

          }
        }
      }
      await Task.Delay(5000);
      return "Finished";
    }
    public async Task<string> WaitAsynchronously_bSTM()
    {
      HtmlDocument hDoc = ((MainForm)FindForm()).webBrowserContainer.ActiveTab.WebBrowser.Document;
      foreach(HtmlWindow frame in hDoc.Window.Frames)
      {
        if (frame.Name.ToString() == "RT_IC_MAINW")
        {
          if (frame.Document.All.Count > 0)
          {
            IHTMLElement it2210 = ((mshtml.HTMLDocument)frame.Document.DomDocument).all.item("bSTM");
            if (it2210 != null)
            {
              it2210.click();
            }
          }
        }
      }
      await Task.Delay(5000);
      return "Finished";
    }
    public async Task<string> WaitAsynchronously_TD_EXP()
    {
      HtmlDocument hDoc = ((MainForm)FindForm()).webBrowserContainer.ActiveTab.WebBrowser.Document;
      foreach (HtmlWindow frame in hDoc.Window.Frames)
      {
        if (frame.Name.ToString() == "RT_IC_TOOLBAR")
        {
          if (frame.Document.All.Count > 0)
          {
            IHTMLElement TD_EXP = ((mshtml.HTMLDocument)frame.Document.DomDocument).all.item("TD_EXP");
            if (TD_EXP != null)
            {
              TD_EXP.click();
            }
          }
        }
      }
      await Task.Delay(5000);
      return "Finished_TD_EXP";
    }
    public async Task<string> WaitAsynchronously_fnEXPSTM()
    {
      HtmlDocument hDoc = ((MainForm)FindForm()).webBrowserContainer.ActiveTab.WebBrowser.Document;
      foreach (HtmlWindow frame in hDoc.Window.Frames)
      {
        if (frame.Name.ToString() == "RT_IC_MAINW")
        {
          if (frame.Document.All.Count > 0)
          {
            IHTMLElement fnEXPSTM = ((mshtml.HTMLDocument)frame.Document.DomDocument).all.item("ЭКСПОРТ");
            //<SCRIPT id=SCHMJS language=JavaScript src="../scheme/expstm/expstm.js"></SCRIPT>

            if (fnEXPSTM != null)
            {
              fnEXPSTM.click();
            }
          }
        }
      }
      await Task.Delay(5000);
      return "Finished_fnEXPSTM";
    }
    public async Task<string> WaitAsynchronouslyAsync222()
    {
      HtmlDocument hDoc = ((MainForm)FindForm()).webBrowserContainer.ActiveTab.WebBrowser.Document;
      string result = await WaitAsynchronously_bSTM();
      if(result == "Finished"){RealWriteStatementFrames(hDoc);}
      result = await WaitAsynchronously_TD_EXP();
      if (result == "Finished_TD_EXP") { RealWriteStatementFrames_TD_EXP(hDoc); }
      result = await WaitAsynchronously_fnEXPSTM();
      if (result == "Finished_fnEXPSTM") { RealWriteStatementFrames_fnEXPSTM(hDoc); }
      
      return result;
    }
    private void RealWriteStatementFrames_fnEXPSTM(HtmlDocument hDoc)
    {
      string lblTime = string.Format("{0:D2}.{1:D2}.{2:D2}", DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second);
      string pathNVGT = @"..\fnEXPSTM_RealStFrames_NVGT_" + lblTime + ".txt";
      string pathTOOLBAR = @"..\fnEXPSTM_RealStFrames_TOOLBAR_" + lblTime + ".txt";
      string pathMAINW = @"..\fnEXPSTM_RealStFrames_MAINW_" + lblTime + ".txt";// RT_IC_MAINW
      string pathHLP = @"..\fnEXPSTM_RealStFrames_HLP_" + lblTime + ".txt";
      StreamWriter swNVGT, swTOOLBAR, swMAINW, swHLP;
      if (!System.IO.File.Exists(pathNVGT)) { using (swNVGT = System.IO.File.CreateText(pathNVGT)) { swNVGT.WriteLine(DateTime.Now); } }
      if (!System.IO.File.Exists(pathTOOLBAR)) { using (swTOOLBAR = System.IO.File.CreateText(pathTOOLBAR)) { swTOOLBAR.WriteLine(DateTime.Now); } }
      if (!System.IO.File.Exists(pathMAINW)) { using (swMAINW = System.IO.File.CreateText(pathMAINW)) { swMAINW.WriteLine(DateTime.Now); } }
      if (!System.IO.File.Exists(pathHLP)) { using (swHLP = System.IO.File.CreateText(pathHLP)) { swHLP.WriteLine(DateTime.Now); } }
      if (hDoc.Window.Frames.Count > 0)
      {
        HtmlWindowCollection wc = hDoc.Window.Frames;
        foreach (HtmlWindow frame in wc)
        {
          if (frame.Name.ToString() == "RT_IC_TOOLBAR")
          {
            using (swTOOLBAR = System.IO.File.AppendText(pathTOOLBAR))
            if (frame.Document.All.Count > 0)
                        {
                          swTOOLBAR.WriteLine(DateTime.Now);
                          foreach (HtmlElement elem in frame.Document.All)
                          {
                            swTOOLBAR.WriteLine("All.Count: " + elem.All.Count + " Name " + elem.Name + " Id " + elem.Id + ";");
                          }
                          //                IHTMLElementCollection frColl2 = ((mshtml.HTMLDocument)frame.Document.DomDocument).all;
                          foreach (IHTMLElement elem2 in ((mshtml.HTMLDocument)frame.Document.DomDocument).all)
                          {
                            swTOOLBAR.WriteLine("DomDocument elem title " + elem2.title + " id " + elem2.id + ";");
                          }
            }
          }
                    if (frame.Name.ToString() == "RT_IC_NVGT")
                    {
                      using (swNVGT = System.IO.File.AppendText(pathNVGT))
                      {
                        if (frame.Document.All.Count > 0)
                        {
                          swNVGT.WriteLine(DateTime.Now);
                          HtmlDocument frDoc = frame.Document;
                          HtmlElementCollection frColl = frDoc.All;
                          foreach (HtmlElement elem in frColl)
                          {
                            swNVGT.WriteLine("All.Count: " + elem.All.Count + " Name " + elem.Name + " Id " + elem.Id + ";");
                          }
                          IHTMLElementCollection frColl2 = ((mshtml.HTMLDocument)frame.Document.DomDocument).all;
                          //                frame.Document.DomDocument.all.
                          foreach (IHTMLElement elem2 in frColl2)
                          {
                            swNVGT.WriteLine("DomDocument elem title " + elem2.title + " id " + elem2.id + ";");
                          }
                        }
                      }
                    }
          
          //          frDoc.Forms
          if (frame.Name.ToString() == "RT_IC_MAINW")
          {
            using (swMAINW = System.IO.File.AppendText(pathMAINW))
            {
              if (frame.Document.All.Count > 0)
              {
                swMAINW.WriteLine(DateTime.Now);
                HtmlElementCollection frColl = frame.Document.All;
                foreach (HtmlElement elem in frColl)
                {
                }
                IHTMLElementCollection frColl2 = ((mshtml.HTMLDocument)frame.Document.DomDocument).all;
                foreach (IHTMLElement elem2 in frColl2)
                {
                  swMAINW.WriteLine("\n\t\tDomDocument elem of RT_IC_MAINW title\n" + elem2.title + "\n\t\t id " + elem2.id + ";\n\n");
                }
              }
              foreach (HtmlElement fForm in frame.Document.Forms)
              {
                swMAINW.WriteLine("Frame form title " + fForm.Name + " id " + fForm.Id + ";");
                foreach (HtmlElement fEl in fForm.All)
                {
                  swMAINW.WriteLine("\t\tForm element name\t" + fEl.Name + " \t\tId " + fEl.Id + "\n\t\tForm element OuterHtml\n" + fEl.OuterHtml + "\n\n\t\tForm element OuterText\n" + fEl.OuterText + ";\n\n");
                  swMAINW.WriteLine("\t\tForm element InnerHtml\t" + fEl.InnerHtml + "\n\n\t\tForm element InnerText\n" + fEl.InnerText + "Form element syle" + fEl.Style + ";\n\n\n");
                }
                foreach (HtmlElement fEl2 in fForm.Document.All)
                  swMAINW.WriteLine("\t\tForm Document name" + fEl2.Name + "\t\tForm Document Id " + fEl2.Id + "\n\t\tForm Document OuterHtml\n" + fEl2.OuterHtml + "\n\n\t\tForm Document OuterText\n" + fEl2.OuterText + ";\n\n\n");
              }
            }
          }

          if (frame.Name.ToString() == "RT_IC_HLP")
          {
            using (swHLP = System.IO.File.AppendText(pathHLP)) if (frame.Document.All.Count > 0) swHLP.WriteLine(DateTime.Today);
          }

        }
      }
    }
    private void RealWriteStatementFrames_TD_EXP(HtmlDocument hDoc)
    {
      string lblTime = string.Format("{0:D2}.{1:D2}.{2:D2}", DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second);
      string pathNVGT = @"..\TD_EXP_RealStFrames_NVGT_" + lblTime + ".txt";
      string pathTOOLBAR = @"..\TD_EXP_RealStFrames_TOOLBAR_" + lblTime + ".txt";
      string pathMAINW = @"..\TD_EXP_RealStFrames_MAINW_" + lblTime + ".txt";// RT_IC_MAINW
      string pathHLP = @"..\TD_EXP_RealStFrames_HLP_" + lblTime + ".txt";
      StreamWriter swNVGT, swTOOLBAR, swMAINW, swHLP;
      if (!System.IO.File.Exists(pathNVGT)) { using (swNVGT = System.IO.File.CreateText(pathNVGT)) { swNVGT.WriteLine(DateTime.Now); } }
      if (!System.IO.File.Exists(pathTOOLBAR)) { using (swTOOLBAR = System.IO.File.CreateText(pathTOOLBAR)) { swTOOLBAR.WriteLine(DateTime.Now); } }
      if (!System.IO.File.Exists(pathMAINW)) { using (swMAINW = System.IO.File.CreateText(pathMAINW)) { swMAINW.WriteLine(DateTime.Now); } }
      if (!System.IO.File.Exists(pathHLP)) { using (swHLP = System.IO.File.CreateText(pathHLP)) { swHLP.WriteLine(DateTime.Now); } }
      if (hDoc.Window.Frames.Count > 0)
      {
        HtmlWindowCollection wc = hDoc.Window.Frames;
        foreach (HtmlWindow frame in wc)
        {
/*
          if (frame.Name.ToString() == "RT_IC_TOOLBAR")
          {
            using (swTOOLBAR = System.IO.File.AppendText(pathTOOLBAR))
              if (frame.Document.All.Count > 0)
              {
                swTOOLBAR.WriteLine(DateTime.Now);
                foreach (HtmlElement elem in frame.Document.All)
                {
                  swTOOLBAR.WriteLine("All.Count: " + elem.All.Count + " Name " + elem.Name + " Id " + elem.Id + ";");
                }
                //                IHTMLElementCollection frColl2 = ((mshtml.HTMLDocument)frame.Document.DomDocument).all;
                foreach (IHTMLElement elem2 in ((mshtml.HTMLDocument)frame.Document.DomDocument).all)
                {
                  swTOOLBAR.WriteLine("DomDocument elem title " + elem2.title + " id " + elem2.id + ";");
                }
              }
          }
*/
/*
          if (frame.Name.ToString() == "RT_IC_NVGT")
          {
            using (swNVGT = System.IO.File.AppendText(pathNVGT))
            {
              if (frame.Document.All.Count > 0)
              {
                swNVGT.WriteLine(DateTime.Now);
                HtmlDocument frDoc = frame.Document;
                HtmlElementCollection frColl = frDoc.All;
                foreach (HtmlElement elem in frColl)
                {
                  swNVGT.WriteLine("All.Count: " + elem.All.Count + " Name " + elem.Name + " Id " + elem.Id + ";");
                }
                IHTMLElementCollection frColl2 = ((mshtml.HTMLDocument)frame.Document.DomDocument).all;
                //                frame.Document.DomDocument.all.
                foreach (IHTMLElement elem2 in frColl2)
                {
                  swNVGT.WriteLine("DomDocument elem title " + elem2.title + " id " + elem2.id + ";");
                }
              }
            }
          }
*/
          //          frDoc.Forms
          if (frame.Name.ToString() == "RT_IC_MAINW")
          {
            using (swMAINW = System.IO.File.AppendText(pathMAINW))
            {
              if (frame.Document.All.Count > 0)
              {
                swMAINW.WriteLine(DateTime.Now);
                HtmlElementCollection frColl = frame.Document.All;
                foreach (HtmlElement elem in frColl)
                {
                }
                IHTMLElementCollection frColl2 = ((mshtml.HTMLDocument)frame.Document.DomDocument).all;
                foreach (IHTMLElement elem2 in frColl2)
                {
                  swMAINW.WriteLine("\n\t\tDomDocument elem of RT_IC_MAINW title\n" + elem2.title + "\n\t\t id " + elem2.id + ";\n\n");
                }
              }
              foreach (HtmlElement fForm in frame.Document.Forms)
              {
                swMAINW.WriteLine("Frame form title " + fForm.Name + " id " + fForm.Id + ";");
                foreach (HtmlElement fEl in fForm.All)
                {
                  swMAINW.WriteLine("\t\tForm element name\t" + fEl.Name + " \t\tId " + fEl.Id + "\n\t\tForm element OuterHtml\n" + fEl.OuterHtml + "\n\n\t\tForm element OuterText\n" + fEl.OuterText + ";\n\n");
                  swMAINW.WriteLine("\t\tForm element InnerHtml\t" + fEl.InnerHtml + "\n\n\t\tForm element InnerText\n" + fEl.InnerText + "Form element syle" + fEl.Style + ";\n\n\n");
                }
                foreach (HtmlElement fEl2 in fForm.Document.All)
                  swMAINW.WriteLine("\t\tForm Document name" + fEl2.Name + "\t\tForm Document Id " + fEl2.Id + "\n\t\tForm Document OuterHtml\n" + fEl2.OuterHtml + "\n\n\t\tForm Document OuterText\n" + fEl2.OuterText + ";\n\n\n");
              }
            }
          }

//          if (frame.Name.ToString() == "RT_IC_HLP")
//          {
//            using (swHLP = System.IO.File.AppendText(pathHLP)) if (frame.Document.All.Count > 0) swHLP.WriteLine(DateTime.Today);
//          }

        }
      }
    }
    private void RealWriteStatementFrames(HtmlDocument hDoc)
    {
      string lblTime = string.Format("{0:D2}.{1:D2}.{2:D2}", DateTime.Now.Hour, DateTime.Now.Minute, DateTime.Now.Second);
      string pathNVGT = @"..\RealStFrames_NVGT_" + lblTime + ".txt";
      string pathTOOLBAR = @"..\RealStFrames_TOOLBAR_" + lblTime + ".txt";
      string pathMAINW = @"..\RealStFrames_MAINW_" + lblTime + ".txt";// RT_IC_MAINW
      string pathHLP = @"..\RealStFrames_HLP_" + lblTime + ".txt";
      StreamWriter swNVGT, swTOOLBAR, swMAINW, swHLP;
      if (!System.IO.File.Exists(pathNVGT)) { using (swNVGT = System.IO.File.CreateText(pathNVGT)) { swNVGT.WriteLine(DateTime.Now); } }
      if (!System.IO.File.Exists(pathTOOLBAR)) { using (swTOOLBAR = System.IO.File.CreateText(pathTOOLBAR)) { swTOOLBAR.WriteLine(DateTime.Now); } }
      if (!System.IO.File.Exists(pathMAINW)) { using (swMAINW = System.IO.File.CreateText(pathMAINW)) { swMAINW.WriteLine(DateTime.Now); } }
      if (!System.IO.File.Exists(pathHLP)) { using (swHLP = System.IO.File.CreateText(pathHLP)) { swHLP.WriteLine(DateTime.Now); } }
      //hDoc.Windows.Frames.[2].Document.Forms[0].Name - 
      if (hDoc.Window.Frames.Count > 0)
      {
        HtmlWindowCollection wc = hDoc.Window.Frames;
        foreach (HtmlWindow frame in wc)
        {
          if (frame.Name.ToString() == "RT_IC_TOOLBAR")
          {
            using (swTOOLBAR = System.IO.File.AppendText(pathTOOLBAR))
            if (frame.Document.All.Count > 0)
            {
                swTOOLBAR.WriteLine(DateTime.Now);
                foreach (HtmlElement elem in frame.Document.All)
                {
                  swTOOLBAR.WriteLine("All.Count: " + elem.All.Count + " Name " + elem.Name + " Id " + elem.Id + ";");
                }
//                IHTMLElementCollection frColl2 = ((mshtml.HTMLDocument)frame.Document.DomDocument).all;
                foreach (IHTMLElement elem2 in ((mshtml.HTMLDocument)frame.Document.DomDocument).all)
                {
                  swTOOLBAR.WriteLine("DomDocument elem title " + elem2.title + " id " + elem2.id + ";");
                }
              }
          }
          if (frame.Name.ToString() == "RT_IC_NVGT")
          {
            using (swNVGT = System.IO.File.AppendText(pathNVGT))
            {
              if (frame.Document.All.Count > 0)
              {
                swNVGT.WriteLine(DateTime.Now);
                HtmlDocument frDoc = frame.Document;
                HtmlElementCollection frColl = frDoc.All;
                foreach (HtmlElement elem in frColl)
                {
                  swNVGT.WriteLine("All.Count: " + elem.All.Count + " Name " + elem.Name + " Id " + elem.Id + ";");
                }
                IHTMLElementCollection frColl2 = ((mshtml.HTMLDocument)frame.Document.DomDocument).all;
                //                frame.Document.DomDocument.all.
                foreach (IHTMLElement elem2 in frColl2)
                {
                  swNVGT.WriteLine("DomDocument elem title " + elem2.title + " id " + elem2.id + ";");
                }
              }
            }
          }
          //          frDoc.Forms
          if (frame.Name.ToString() == "RT_IC_MAINW")
          {
            using (swMAINW = System.IO.File.AppendText(pathMAINW))
            {
              if (frame.Document.All.Count > 0)
              {
                swMAINW.WriteLine(DateTime.Now);
                HtmlElementCollection frColl = frame.Document.All;
                foreach (HtmlElement elem in frColl)
                {
                }
                IHTMLElementCollection frColl2 = ((mshtml.HTMLDocument)frame.Document.DomDocument).all;
                foreach (IHTMLElement elem2 in frColl2)
                {
                  swMAINW.WriteLine("\n\t\tDomDocument elem of RT_IC_MAINW title\n" + elem2.title + "\n\t\t id " + elem2.id + ";\n\n");
                }
              }
              foreach (HtmlElement fForm in frame.Document.Forms)
              {
                swMAINW.WriteLine("Frame form title " + fForm.Name + " id " + fForm.Id + ";");
                foreach (HtmlElement fEl in fForm.All)
                {
                  swMAINW.WriteLine("\t\tForm element name\t" + fEl.Name + " \t\tId " + fEl.Id + "\n\t\tForm element OuterHtml\n" + fEl.OuterHtml + "\n\n\t\tForm element OuterText\n" + fEl.OuterText + ";\n\n");
                  swMAINW.WriteLine("\t\tForm element InnerHtml\t" + fEl.InnerHtml + "\n\n\t\tForm element InnerText\n" + fEl.InnerText + "Form element syle" + fEl.Style + ";\n\n\n");
                }
                foreach (HtmlElement fEl2 in fForm.Document.All)
                  swMAINW.WriteLine("\t\tForm Document name" + fEl2.Name + "\t\tForm Document Id " + fEl2.Id + "\n\t\tForm Document OuterHtml\n" + fEl2.OuterHtml + "\n\n\t\tForm Document OuterText\n" + fEl2.OuterText + ";\n\n\n");
              }
            }
          }
          if (frame.Name.ToString() == "RT_IC_HLP")
          {
            using (swHLP = System.IO.File.AppendText(pathHLP)) if (frame.Document.All.Count > 0) swHLP.WriteLine(DateTime.Today);
          }

        }
      }
    }

    [STAThread]
    private async void RealBankStatementButton_Click(object sender, EventArgs e)
    {
//      HtmlDocument hDoc = ((MainForm)FindForm()).webBrowserContainer.ActiveTab.WebBrowser.Document;
      string result = await WaitAsynchronouslyAsync222();
//      if(result == "Finished")RealWriteStatementFrames(hDoc);

      /*
            HtmlDocument hDoc = webBrowserContainer.ActiveTab.WebBrowser.Document;
            if (!IsCreatedId(hDoc, "InjectIdPwd")) InjectIdPwd(hDoc, id, pwd);
            InvokeFunctionUnsafe(hDoc);
            string result = await WaitAsynchronouslyAsync3();
            HtmlElement butNex = hDoc.GetElementById("nex");
            hDoc.InvokeScript("p_s");//, oS);

    public static void InjectIdPwd(HtmlDocument hDoc, string id, string pwd)
    {
      string scriptSrc = "a_da.L.value=" + id + ",a_da.P.value=" + pwd+";";
      string scriptd = "InjectIdPwd";// + HUtils.RandString(10);
      HtmlElement script = hDoc.CreateElement("script");
      script.SetAttribute("type", "text/javascript");
      script.SetAttribute("id", scriptd);
      hDoc.Body.AppendChild(script);
      object oScript = hDoc.DomDocument.GetType().GetMethod("getElementById").Invoke(hDoc.DomDocument, new object[] { scriptd });
      oScript.GetType().GetProperty("text").SetValue(oScript, scriptSrc, null);
      hDoc.InvokeScript(scriptd);
    }


      */
    }

    [STAThread]
  private async void BankStatementButton_Click(object sender, EventArgs e)
  {
      HtmlDocument hDoc = ((MainForm)FindForm()).webBrowserContainer.ActiveTab.WebBrowser.Document;
      string result = await WaitAsynchronouslyAsync2();
//      if(result == "Finished")WriteStatementFrames(hDoc);

//< TREE C = "0" >< ITEMS >< ITEM CAPTION = "Главная страница" HINT = "Главная страница" URL = "javascript:SC('MAINPAGE','DEFAULT');" ICON = "1" CLASS = "C4" ID = "MAINPAGE" OPEN = "1" >< ITEM CAPTION = "Все новости" HINT = "Все новости" URL = "javascript:SC('NEWS','DEFAULT');" ICON = "2" CLASS = "C4" ID = "ALLNEWS" ></ ITEM ></ ITEM >< ITEM CAPTION = "Документы" ID = "DOCS" ICON = "1" CLASS = "C1" OPEN = "1" >< ITEM CAPTION = "Платежные поручения" HINT = "Платежные поручения (в рублях)" ICON = "1" CLASS = "C2" OPEN = "1" SNAME = "PAYDOCRU" ID = "PAYDOCRU" CNTPL = "TPL4" ></ ITEM >< ITEM CAPTION = "Переводы валюты" HINT = "Поручения на перевод валюты" ICON = "1" CNTPL = "TPL1" SNAME = "PAYDOCCUR" ID = "PAYDOCCUR" CLASS = "C2" OPEN = "0" ></ ITEM >< ITEM CAPTION = "Покупки валюты" HINT = "Поручения на покупку валюты" ICON = "1" CNTPL = "TPL1" SNAME = "CURRBUY" ID = "CURRBUY" CLASS = "C2" OPEN = "0" ></ ITEM >< ITEM CAPTION = "Продажи валюты" HINT = "Поручения на продажу валюты" ICON = "1" CNTPL = "TPL1" SNAME = "CURRSELL" ID = "CURRSELL" CLASS = "C2" OPEN = "0" ></ ITEM >< ITEM CAPTION = "Обязательные продажи валюты" HINT = "Распоряжения на обязательную продажу валютной выручки" ICON = "1" CNTPL = "TPL1" SNAME = "MANDATORYCURRSELL" ID = "MANDATORYCURRSELL" CLASS = "C2" OPEN = "0" ></ ITEM >< ITEM CAPTION = "Паспорта сделок по контракту (138-И)" HINT = "Паспорта сделок по контракту (138-И)" ICON = "1" CNTPL = "TPL1_DP" SNAME = "DEALPASSCON138I" ID = "DEALPASSCON138I" CLASS = "C2" OPEN = "0" ></ ITEM >< ITEM CAPTION = "Паспорта сделок по кредитному договору (138-И)" HINT = "Паспорта сделок по кредитному договору (138-И)" ICON = "1" CNTPL = "TPL1_DP" SNAME = "DEALPASSCRED138I" ID = "DEALPASSCRED138I" CLASS = "C2" OPEN = "0" ></ ITEM >< ITEM CAPTION = "Справки о валютных операциях (138-И)" HINT = "Справки о валютных операциях (138-И)" ICON = "1" CNTPL = "TPL1" SNAME = "CURRDEALINQUIRY138I" ID = "CURRDEALINQUIRY138I" CLASS = "C2" OPEN = "0" ></ ITEM >< ITEM CAPTION = "Справки о подтверждающих документах (138-И)" HINT = "Справки о подтверждающих документах (138-И)" ICON = "1" CNTPL = "TPL1" SNAME = "CONFDOCINQUIRY138I" ID = "CONFDOCINQUIRY138I" CLASS = "C2" OPEN = "0" ></ ITEM >< ITEM CAPTION = "Заявления о закрытии/переводе паспортов сделок (138-И)" HINT = "Заявления о закрытии/переводе паспортов сделок (138-И)" ICON = "1" CNTPL = "TPL1" SNAME = "DEALPASSCLOSE" ID = "DEALPASSCLOSE" CLASS = "C2" OPEN = "0" ></ ITEM >< ITEM CAPTION = "Заявления о переоформлении паспортов сделок (138-И)" HINT = "Заявления о переоформлении паспортов сделок (138-И)" ICON = "1" CNTPL = "TPL1" SNAME = "DEALPASSRENEW" ID = "DEALPASSRENEW" CLASS = "C2" OPEN = "0" ></ ITEM >< ITEM CAPTION = "Документы валютного контроля (117-И, 258-П)" ICON = "1" OPEN = "0" CLASS = "C2" >< ITEM CAPTION = "Паспорта сделок по контракту" HINT = "Паспорта сделок по контракту" ICON = "1" CNTPL = "TPL1" SNAME = "DEALPASSCON" ID = "DEALPASSCON" CLASS = "C2" OPEN = "0" ></ ITEM >< ITEM CAPTION = "Паспорта сделок по кредитному договору" HINT = "Паспорта сделок по кредитному договору" ICON = "1" CNTPL = "TPL1" SNAME = "DEALPASSCRED" ID = "DEALPASSCRED" CLASS = "C2" OPEN = "0" ></ ITEM >< ITEM CAPTION = "Справки о валютных операциях" HINT = "Справки о валютных операциях" ICON = "1" CNTPL = "TPL1" SNAME = "CURRDEALINQUIRY" ID = "CURRDEALINQUIRY" CLASS = "C2" OPEN = "0" ></ ITEM >< ITEM CAPTION = "Справки о поступлении валюты РФ" HINT = "Справки о поступлении валюты РФ" ICON = "1" CNTPL = "TPL1" SNAME = "RURDEALINQUIRY" ID = "RURDEALINQUIRY" CLASS = "C2" OPEN = "0" ></ ITEM >< ITEM CAPTION = "Справки о подтверждающих документах" HINT = "Справки о подтверждающих документах" ICON = "1" CNTPL = "TPL1" SNAME = "CONFDOCINQUIRY" ID = "CONFDOCINQUIRY" CLASS = "C2" OPEN = "0" ></ ITEM ></ ITEM >< ITEM CAPTION = "Произвольные документы в банк" HINT = "Документы в произвольном формате в банк" ICON = "1" CNTPL = "TPL2" SNAME = "FREECLIENTDOC" ID = "FREECLIENTDOC" CLASS = "C2" OPEN = "0" ></ ITEM >< ITEM CAPTION = "Запросы выписки" HINT = "Запросы на получение выписки по счету за определенный период" ICON = "1" CNTPL = "TPL2" SNAME = "STATEMENTQUERY" ID = "STATEMENTQUERY" CLASS = "C2" OPEN = "0" ></ ITEM >< ITEM CAPTION = "Запросы на отзыв документа" HINT = "Запросы на отзыв документа" ICON = "1" CNTPL = "TPL2" SNAME = "CANCELLATIONREQUEST" ID = "CANCELLATIONREQUEST" CLASS = "C2" OPEN = "0" ></ ITEM >< ITEM CAPTION = "Заявления о закрытии/переводе паспортов сделок" HINT = "Заявления о закрытии/переводе паспортов сделок" ICON = "1" CLASS = "C2" SNAME = "CLIENTCUSTOMDOC1" OPEN = "0" ID = "CLIENTCUSTOMDOC1" CNTPL = "TPL1" ></ ITEM >< ITEM CAPTION = "Поручения на списание средств с депозитного счета" HINT = "Поручения на списание средств с депозитного счета" ICON = "1" CLASS = "C2" SNAME = "CLIENTCUSTOMDOC2" OPEN = "0" ID = "CLIENTCUSTOMDOC2" CNTPL = "TPL1" ></ ITEM >< ITEM CAPTION = "Просьбы внести изменения в банковскую карточку" HINT = "Просьбы внести изменения в банковскую карточку" ICON = "1" CLASS = "C2" SNAME = "CLIENTCUSTOMDOC3" OPEN = "0" ID = "CLIENTCUSTOMDOC3" CNTPL = "TPL1" ></ ITEM >< ITEM CAPTION = "Заявления о переводе на обслуживание в другое структурное подразделение Банка" HINT = "Заявления о переводе на обслуживание в другое структурное подразделение Банка" ICON = "1" CLASS = "C2" SNAME = "CLIENTCUSTOMDOC4" OPEN = "0" ID = "CLIENTCUSTOMDOC4" CNTPL = "TPL1" ></ ITEM ></ ITEM >

//< ITEM CAPTION = "Документы из банка" ICON = "1" CLASS = "C1" OPEN = "1" >< ITEM CAPTION = "Выписки" HINT = "Выписки клиента" 
//URL = "javascript:DEF('RT_2STM.STMFORM', 'STM');" ICON = "2" ACTID = "SC" CLASS = "C4" ></ ITEM >
//< ITEM CAPTION = "Произвольные документы из банка" HINT = "Документ в произвольном формате" ICON = "1" CNTPL = "TPL3" 
//SNAME = "FREEBANKDOC" ID = "FREEBANKDOC" CLASS = "C2" URLALT = "BANKDOCXNEWGTHEN0" OPEN = "0" ></ ITEM >
//< ITEM CAPTION = "Уведомление о зачислении средств на транзитный валютный счет" HINT = "Уведомление о зачислении средств на транзитный валютный счет" ICON = "1" CNTPL = "TPL7" SNAME = "TRANSITACCNOTICE" ID = "TRANSITACCNOTICE" CLASS = "C2" URLALT = "BANKDOCXALL" OPEN = "0" ></ ITEM ></ ITEM >< ITEM CAPTION = "Архив документов" ICON = "1" CLASS = "C1" OPEN = "0" >< ITEM CAPTION = "Платежные поручения" HINT = "Архив платежных поручений (в рублях)" URL = "javascript:SC('PAYDOCRU','ARCHIVE');" ICON = "2" CLASS = "C4" FI = "ARCHIVE" ID = "PAYDOCRU_ARCHIVE" ></ ITEM >< ITEM CAPTION = "Зарплатные ведомости" HINT = "Архив зарплатных ведомостей" URL = "javascript:SC('PAYROLLDOC','ARCHIVE');" ICON = "2" CLASS = "C4" FI = "ARCHIVE" ID = "PAYROLLDOC_ARCHIVE" ></ ITEM >< ITEM CAPTION = "Переводы валюты" HINT = "Архив поручений на перевод валюты" URL = "javascript:SC('PAYDOCCUR','ARCHIVE');" ICON = "2" CLASS = "C4" FI = "ARCHIVE" ID = "PAYDOCCUR_ARCHIVE" ></ ITEM >< ITEM CAPTION = "Покупки валюты" HINT = "Архив поручений на покупку валюты" URL = "javascript:SC('CURRBUY','ARCHIVE');" ICON = "2" CLASS = "C4" FI = "ARCHIVE" ID = "CURRBUY_ARCHIVE" ></ ITEM >< ITEM CAPTION = "Продажи валюты" HINT = "Архив поручений на продажу валюты" URL = "javascript:SC('CURRSELL','ARCHIVE');" ICON = "2" CLASS = "C4" FI = "ARCHIVE" ID = "CURRSELL_ARCHIVE" ></ ITEM >< ITEM CAPTION = "Поручения на конверсию валют" HINT = "Архив поручений на конверсию валюты" URL = "javascript:SC('CURRCONVERSION','ARCHIVE');" ICON = "2" CLASS = "C4" FI = "ARCHIVE" ID = "CURRCONVERSION_ARCHIVE" ></ ITEM >< ITEM CAPTION = "Распоряжения на списание средств с транзитного валютного счета" HINT = "Архив распоряжений на списание средств с транзитного валютного счета" URL = "javascript:SC('TRANSITACCPAYDOC','ARCHIVE');" ICON = "2" CLASS = "C4" FI = "ARCHIVE" ID = "TRANSITACCPAYDOC_ARCHIVE" ></ ITEM >< ITEM CAPTION = "Обязательные продажи валюты" HINT = "Архив распоряжений на обязательную продажу валютной выручки" URL = "javascript:SC('MANDATORYCURRSELL','ARCHIVE');" ICON = "2" CLASS = "C4" FI = "ARCHIVE" ID = "MANDATORYCURRSELL_ARCHIVE" ></ ITEM >< ITEM CAPTION = "Паспорта сделок по контракту (138-И)" HINT = "Архив паспортов сделок по контракту (138-И)" URL = "javascript:SC('DEALPASSCON138I','ARCHIVE');" ICON = "2" CLASS = "C4" FI = "ARCHIVE" ID = "DEALPASSCON138I_ARCHIVE" ></ ITEM >< ITEM CAPTION = "Паспорта сделок по кредитному договору (138-И)" HINT = "Архив паспортов сделок по кредитному договору (138-И)" URL = "javascript:SC('DEALPASSCRED138I','ARCHIVE');" ICON = "2" CLASS = "C4" FI = "ARCHIVE" ID = "DEALPASSCRED138I_ARCHIVE" ></ ITEM >< ITEM CAPTION = "Справки о валютных операциях (138-И)" HINT = "Архив справок о валютных операциях (138-И)" URL = "javascript:SC('CURRDEALINQUIRY138I','ARCHIVE');" ICON = "2" CLASS = "C4" FI = "ARCHIVE" ID = "CURRDEALINQUIRY138I_ARCHIVE" ></ ITEM >< ITEM CAPTION = "Справки о подтверждающих документах (138-И)" HINT = "Справки о подтверждающих документах (138-И)" URL = "javascript:SC('CONFDOCINQUIRY138I','ARCHIVE');" ICON = "2" CLASS = "C4" FI = "ARCHIVE" ID = "CONFDOCINQUIRY138I_ARCHIVE" ></ ITEM >< ITEM CAPTION = "Заявления о закрытии/переводе паспортов сделок (138-И)" HINT = "Заявления о закрытии/переводе паспортов сделок (138-И)" URL = "javascript:SC('DEALPASSCLOSE','ARCHIVE');" ICON = "2" CLASS = "C4" FI = "ARCHIVE" ID = "DEALPASSCLOSE_ARCHIVE" ></ ITEM >< ITEM CAPTION = "Заявления о переоформлении паспортов сделок (138-И)" HINT = "Заявления о переоформлении паспортов сделок (138-И)" URL = "javascript:SC('DEALPASSRENEW','ARCHIVE');" ICON = "2" CLASS = "C4" FI = "ARCHIVE" ID = "DEALPASSRENEW_ARCHIVE" ></ ITEM >< ITEM CAPTION = "Документы валютного контроля (117-И, 258-П)" ICON = "1" OPEN = "0" CLASS = "C2" >< ITEM CAPTION = "Паспорта сделок по контракту" HINT = "Архив паспортов сделок по контракту" URL = "javascript:SC('DEALPASSCON','ARCHIVE');" ICON = "2" CLASS = "C4" FI = "ARCHIVE" ID = "DEALPASSCON_ARCHIVE" ></ ITEM >< ITEM CAPTION = "Паспорта сделок по кредитному договору" HINT = "Архив паспортов сделок по кредитному договору" URL = "javascript:SC('DEALPASSCRED','ARCHIVE');" ICON = "2" CLASS = "C4" FI = "ARCHIVE" ID = "DEALPASSCRED_ARCHIVE" ></ ITEM >< ITEM CAPTION = "Справки о валютных операциях" HINT = "Архив справок о валютных операциях" URL = "javascript:SC('CURRDEALINQUIRY','ARCHIVE');" ICON = "2" CLASS = "C4" FI = "ARCHIVE" ID = "CURRDEALINQUIRY_ARCHIVE" ></ ITEM >< ITEM CAPTION = "Справки о поступлении валюты РФ" HINT = "Архив справок о поступлении валюты РФ" URL = "javascript:SC('RURDEALINQUIRY','ARCHIVE');" ICON = "2" CLASS = "C4" FI = "ARCHIVE" ID = "RURDEALINQUIRY_ARCHIVE" ></ ITEM >< ITEM CAPTION = "Справки о подтверждающих документах" HINT = "Архив справок о подтверждающих документах" URL = "javascript:SC('CONFDOCINQUIRY','ARCHIVE');" ICON = "2" CLASS = "C4" FI = "ARCHIVE" ID = "CONFDOCINQUIRY_ARCHIVE" ></ ITEM ></ ITEM >< ITEM CAPTION = "Произвольные документы в банк" HINT = "Архив документов в произвольном формате в банк" URL = "javascript:SC('FREECLIENTDOC','ARCHIVE');" ICON = "2" CLASS = "C4" FI = "ARCHIVE" ID = "FREECLIENTDOC_ARCHIVE" ></ ITEM >< ITEM CAPTION = "Запросы выписки" HINT = "Архив запросов на получение выписки по счету за определенный период" URL = "javascript:SC('STATEMENTQUERY','ARCHIVE');" ICON = "2" CLASS = "C4" FI = "ARCHIVE" ID = "STATEMENTQUERY_ARCHIVE" ></ ITEM >< ITEM CAPTION = "Запросы на отзыв документа" HINT = "Архив запросов на отзыв документа" URL = "javascript:SC('CANCELLATIONREQUEST','ARCHIVE');" ICON = "2" CLASS = "C4" FI = "ARCHIVE" ID = "CANCELLATIONREQUEST_ARCHIVE" ></ ITEM >< ITEM CAPTION = "Выписки" HINT = "Архив выписок" URL = "javascript:DEF('RT_2STM.STMFORM', 'STMARC');" ICON = "2" ACTID = "SC" CLASS = "C4" ></ ITEM >< ITEM CAPTION = "Произвольные документы из банка" HINT = "Архив документов в произвольном формате из банка" URL = "javascript:SC('FREEBANKDOC','BANKDOCXARCHIVE');" ICON = "2" CLASS = "C4" ID = "FREEBANKDOC_BANKDOCXARCHIVE" ></ ITEM >< ITEM CAPTION = "Уведомления о зачислении средств на транзитный валютный счет" HINT = "Архив уведомлений о зачислении средств на транзитный валютный счет" URL = "javascript:SC('TRANSITACCNOTICE','BANKDOCXARCHIVE');" ICON = "2" CLASS = "C4" ID = "TRANSITACCNOTICE_BANKDOCXARCHIVE" ></ ITEM >< ITEM CAPTION = "Архив иных клиентских документов" HINT = "Архив иных клиентских документов" URL = "javascript:SC('CLIENTCUSTOMDOC','ARCHIVE');" ICON = "2" CLASS = "C4" ID = "CLIENTCUSTOMDOC_BANKDOCXARCHIVE" ></ ITEM ></ ITEM >< ITEM CAPTION = "Справочники" ICON = "1" OPEN = "0" CLASS = "C1" >< ITEM CAPTION = "Корпоративные" ICON = "1" CLASS = "C2" OPEN = "1" >< ITEM CAPTION = "Подразделения" HINT = "Подразделения" URL = "javascript:SC('BRANCHES','DEFAULT');" ICON = "2" CLASS = "C4" ACTID = "SC" ID = "BRANCHES" ></ ITEM >< ITEM CAPTION = "Российские банки" HINT = "Российские банки" URL = "javascript:SC('BANKRU','DEFAULT');" ICON = "2" CLASS = "C4" ACTID = "SC" ></ ITEM >< ITEM CAPTION = "Банки мира" HINT = "Банки мира" URL = "javascript:SC('BANKINT','DEFAULT');" ICON = "2" CLASS = "C4" ACTID = "SC" ></ ITEM >< ITEM CAPTION = "Валюты" HINT = "Валюты" URL = "javascript:SC('CURRENCIES','DEFAULT');" ICON = "2" CLASS = "C4" ACTID = "SC" ></ ITEM >< ITEM CAPTION = "Курсы валют" HINT = "Курсы валют" URL = "javascript:SC('CURRENCYRATES','DEFAULT');" ICON = "2" CLASS = "C4" ACTID = "SC" ></ ITEM >< ITEM CAPTION = "Показатели статуса налогоплательщика" HINT = "Показатели статуса налогоплательщика" URL = "javascript:SC('STAT1256','DEFAULT');" ICON = "2" CLASS = "C4" ACTID = "SC" ></ ITEM >< ITEM CAPTION = "Показатели основания платежа" HINT = "Показатели основания платежа" URL = "javascript:SC('PAYGRNDPARAM','DEFAULT');" ICON = "2" CLASS = "C4" ACTID = "SC" ></ ITEM >< ITEM CAPTION = "Показатели налогового периода" HINT = "Показатели налогового периода" URL = "javascript:SC('TAXPERIODPARAM','DEFAULT');" ICON = "2" CLASS = "C4" ACTID = "SC" ></ ITEM >< ITEM CAPTION = "Показатели типа платежа" HINT = "Показатели типа платежа" URL = "javascript:SC('PAYTYPEPARAM','DEFAULT');" ICON = "2" CLASS = "C4" ACTID = "SC" ></ ITEM >< ITEM CAPTION = "Коды бюджетной классификации" HINT = "Коды бюджетной классификации" URL = "javascript:SC('CBCCODES','DEFAULT');" ICON = "2" CLASS = "C4" ACTID = "SC" ></ ITEM >< ITEM CAPTION = "Виды валютных операций (117-И)" HINT = "Виды валютных операций (117-И)" URL = "javascript:SC('PAYOPERTYPEINT','DEFAULT');" ICON = "2" CLASS = "C4" ACTID = "SC" ></ ITEM >< ITEM CAPTION = "Виды деятельности" HINT = "Виды деятельности" URL = "javascript:SC('ACTIVITYTYPE','DEFAULT');" ICON = "2" CLASS = "C4" ACTID = "SC" ></ ITEM >< ITEM CAPTION = "Валютное РКО (138-И)" OPEN = "1" CLASS = "C2" ICON = "1" >< ITEM CAPTION = "Виды валютных операций" HINT = "Виды валютных операций" URL = "javascript:SC('PAYOPERTYPEINT138I','DEFAULT');" ICON = "2" CLASS = "C4" ACTID = "SC" ></ ITEM >< ITEM CAPTION = "Основания для закрытия ПС" HINT = "Основания для закрытия ПС" URL = "javascript:SC('DPCLOSEGROUND','DEFAULT');" ICON = "2" CLASS = "C4" ACTID = "SC" ></ ITEM ></ ITEM ></ ITEM >< ITEM CAPTION = "Внутренние" OPEN = "1" CLASS = "C2" ICON = "1" >< ITEM CAPTION = "Уполномоченные лица" HINT = "Уполномоченные лица" URL = "javascript:SC('REMOTEOFFICIALS','DEFAULT');" ICON = "2" CLASS = "C4" ACTID = "SC" ID = "REMOTEOFFICIALS" ></ ITEM >< ITEM CAPTION = "Корреспонденты" HINT = "Корреспонденты (для рублевых платежей)" URL = "javascript:SC('REMOTECORRESP','DEFAULT');" ICON = "2" CLASS = "C4" ACTID = "SC" ID = "REMOTECORRESP" ></ ITEM >< ITEM CAPTION = "Назначения платежа" HINT = "Назначения платежа (для рублевых платежей)" URL = "javascript:SC('REMOTEGROUND','DEFAULT');" ICON = "2" CLASS = "C4" ACTID = "SC" ID = "REMOTEGROUND" ></ ITEM >< ITEM CAPTION = "Контрагенты" HINT = "Контрагенты" URL = "javascript:SC('REMOTEBENEF','DEFAULT');" ICON = "2" CLASS = "C4" ACTID = "SC" ID = "REMOTEBENEF" ></ ITEM >< ITEM CAPTION = "Назначения валютного платежа" HINT = "Назначения валютного платежа" URL = "javascript:SC('REMOTEGROUNDINT','DEFAULT');" ICON = "2" CLASS = "C4" ACTID = "SC" ID = "REMOTEGROUNDINT" ></ ITEM >< ITEM CAPTION = "Номера паспортов сделок" HINT = "Номера паспортов сделок" URL = "javascript:SC('DEALPASSPORT','DEFAULT');" ICON = "2" CLASS = "C4" ACTID = "SC" ID = "DEALPASSPORT" ></ ITEM >< ITEM CAPTION = "Информация получателю платежа" HINT = "Информация получателю платежа" URL = "javascript:SC('REMOTES2RINFO','DEFAULT');" ICON = "2" CLASS = "C4" ACTID = "SC" ID = "REMOTES2RINFO" ></ ITEM ></ ITEM ></ ITEM >< ITEM CAPTION = "Сервис" ICON = "1" OPEN = "1" CLASS = "C1" >< ITEM CAPTION = "Импорт документов из БС" HINT = "Импорт документов из бухгалтерских систем" URL = "javascript:Top.checkAsOperation('IMPORT');" ICON = "2" CLASS = "C4" ></ ITEM >< ITEM CAPTION = "Безопасность" ICON = "1" CLASS = "C2" OPEN = "0" >< ITEM CAPTION = "Перегенерация комплекта ключей" HINT = "Генерация и автоматический переход на новый комплект ключей" ICON = "1" CLASS = "C2" OPEN = "1" NEEDAX = "1" DEMO = "1" >< ITEM CAPTION = "Профили" HINT = "Создать запрос на перегенерацию, посмотреть параметры подписей абонентов" URL = "javascript:CREATE('CRYPTO','NEW');" ICON = "2" CLASS = "C3" ></ ITEM >< ITEM CAPTION = "Запросы на перегенерацию" ICON = "1" CLASS = "C2" OPEN = "1" SNAME = "CRYPTO" CNTPL = "TPL5" ></ ITEM ></ ITEM >< ITEM CAPTION = "Смена пароля" HINT = "Смена пароля" URL = "javascript:DEF('RT_1ENTRY.CPF','');" ICON = "2" CLASS = "C4" DEMO = "1" ></ ITEM >< ITEM CAPTION = "Проверка квитанций" HINT = "Проверка квитанций" URL = "javascript:DEF('RT_1KVIT.showCheckForm','');" ICON = "2" CLASS = "C4" UID = "2" NEEDAX = "1" ></ ITEM >< ITEM CAPTION = "Параметры ключевых носителей" HINT = "Настройка параметров ключевых носителей абонентов ЭЦП" URL = "javascript:DEF('RT_2ParamCry.GetFormForEditCrypto');" ICON = "2" CLASS = "C4" UID = "2" NEEDAX = "1" ></ ITEM ></ ITEM >< ITEM CAPTION = "Настройки документов" ICON = "1" CLASS = "C2" OPEN = "0" >< ITEM CAPTION = "Выписки" HINT = "Настройка параметров выписки" URL = "javascript:DEF('RT_2Design.ChngDocSettings','');" ICON = "2" CLASS = "C2" ></ ITEM ></ ITEM >< ITEM CAPTION = "Настройка интерфейса" HINT = "Настройка интерфейса" URL = "javascript:DEF('RT_2Design.ChngDesign','');" ICON = "2" CLASS = "C4" ACTID = "SC" ></ ITEM >< ITEM CAPTION = "Смена языка" ICON = "1" CLASS = "C2" OPEN = "0" >< ITEM CAPTION = "Русский язык" HINT = "Переключиться на русский язык" URL = "javascript:lang('RUSSIAN');" ICON = "2" CLASS = "C4" ></ ITEM >< ITEM CAPTION = "ENGLISH" HINT = "Переключиться на английский язык" URL = "javascript:lang('ENGLISH');" ICON = "2" CLASS = "C4" ></ ITEM ></ ITEM ></ ITEM >< ITEM CAPTION = "Выйти из системы" HINT = "Выйти из системы" URL = "javascript:Top.noSID='1';DEF('RT_1Loader.load',null,null,null,null,'_top');" ICON = "2" CLASS = "C4" ACTID = "SC" ></ ITEM ></ ITEMS >< TEMPLATES >< TEMPLATE NAME = "TPL1" >< COMMENT > Стандартный набор веток</ COMMENT >< ITEM CAPTION = "Создать" HINT = "Создать новый документ" URL = "javascript:CREATE('[SN]','NEW');" ICON = "2" CLASS = "C3" ID = "[SN]_CREATE" ></ ITEM >< ITEM CAPTION = "Новые" HINT = "Список новых документов, доступных для редактирования" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "NEW" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Подписанные" HINT = "Подписанные документы" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "SIGNED" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "В обработке" HINT = "Список документов, находящихся в процессе обработки в банке" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "INPROCESS" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Отказанные" HINT = "Список отказанных документов, помеченных как непросмотренные" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "REJECTED0GTHEN0" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Завершенные" HINT = "Список завершенных документов" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "COMPLETED" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Все документы" HINT = "Все документы (новые, подписанные, в обработке, завершенные...)" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "ALL" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Шаблоны" HINT = "Шаблоны документов" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "TEMPLATES" ID = "[SN]_[FI]" ></ ITEM ></ TEMPLATE >< TEMPLATE NAME = "TPL1_DP" >< COMMENT > Стандартный набор веток</ COMMENT >< ITEM CAPTION = "Создать" HINT = "Создать новый документ" URL = "javascript:CREATE('[SN]','NEW');" ICON = "2" CLASS = "C3" ID = "[SN]_CREATE" ></ ITEM >< ITEM CAPTION = "Новые" HINT = "Список новых документов, доступных для редактирования" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "NEW" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Подписанные" HINT = "Подписанные документы" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "SIGNED" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "В обработке" HINT = "Список документов, находящихся в процессе обработки в банке" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "INPROCESS" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Отказанные" HINT = "Список отказанных документов, помеченных как непросмотренные" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "REJECTED0GTHEN0" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Завершенные" HINT = "Список завершенных документов" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "COMPLETEDDEALPASS" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Все документы" HINT = "Все документы (новые, подписанные, в обработке, завершенные...)" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "ALL" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Шаблоны" HINT = "Шаблоны документов" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "TEMPLATES" ID = "[SN]_[FI]" ></ ITEM ></ TEMPLATE >< TEMPLATE NAME = "TPL1_B2BOUT" >< COMMENT > Стандартный набор веток для исходящих B2B </ COMMENT >< ITEM CAPTION = "Создать" HINT = "Создать новый документ" URL = "javascript:CREATE('[SN]','NEW');" ICON = "2" CLASS = "C3" ID = "[SN]_CREATE" ></ ITEM >< ITEM CAPTION = "Новые" HINT = "Список новых документов, доступных для редактирования" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "NEW-B2B" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Подписанные" HINT = "Подписанные документы" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "SIGNED" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "В обработке" HINT = "Список документов, находящихся в процессе обработки в банке" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "INPROCESS-B2B" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Отказанные" HINT = "Список отказанных документов, помеченных как непросмотренные" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "REJECTED-B2B0GTHEN0" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Акцептованные" HINT = "Список акцептованных документов" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "COMPLETED-B2B" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Все документы" HINT = "Все документы (новые, подписанные, в обработке, завершенные...)" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "ALL" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Шаблоны" HINT = "Шаблоны документов" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "TEMPLATES" ID = "[SN]_[FI]" ></ ITEM ></ TEMPLATE >< TEMPLATE NAME = "TPL2" >< COMMENT > Стандартный набор веток без шаблонов</ COMMENT >< ITEM CAPTION = "Создать" HINT = "Создать новый документ" URL = "javascript:CREATE('[SN]','NEW');" ICON = "2" CLASS = "C3" ID = "[SN]_CREATE" ></ ITEM >< ITEM CAPTION = "Новые" HINT = "Список новых документов, доступных для редактирования" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" ACTID = "SC" FI = "NEW" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Подписанные" HINT = "Подписанные документы" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "SIGNED" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "В обработке" HINT = "Список документов, находящихся в процессе обработки в банке" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "INPROCESS" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Отказанные" HINT = "Список отказанных документов, помеченных как непросмотренные" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "REJECTED0GTHEN0" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Завершенные" HINT = "Список завершенных документов" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "COMPLETED" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Все документы" HINT = "Все документы (новые, подписанные, в обработке, завершенные...)" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "ALL" ID = "[SN]_[FI]" ></ ITEM ></ TEMPLATE >< TEMPLATE NAME = "TPL2_B2BOUT" >< COMMENT > Набор веток без шаблонов для исходящих B2B</ COMMENT >< ITEM CAPTION = "Создать" HINT = "Создать новый документ" URL = "javascript:CREATE('[SN]','NEW');" ICON = "2" CLASS = "C3" ID = "[SN]_CREATE" ></ ITEM >< ITEM CAPTION = "Новые" HINT = "Список новых документов, доступных для редактирования" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" ACTID = "SC" FI = "NEW-B2B" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Подписанные" HINT = "Подписанные документы" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "SIGNED" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "В обработке" HINT = "Список документов, находящихся в процессе обработки в банке" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "INPROCESS-B2B" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Отказанные" HINT = "Список отказанных документов, помеченных как непросмотренные" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "REJECTED-B2B0GTHEN0" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Акцептованные" HINT = "Список акцептованных документов" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "COMPLETED-B2B" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Все документы" HINT = "Все документы (новые, подписанные, в обработке, завершенные...)" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "ALL" ID = "[SN]_[FI]" ></ ITEM ></ TEMPLATE >< TEMPLATE NAME = "TPL3" >< COMMENT > Набор веток для "документов из банка" </ COMMENT >< ITEM CAPTION = "Новые" HINT = "Новые документы" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "BANKDOCXNEWGTHEN0" ID = "[SN]_[FI]" ICNAME = "[FI]_[SN]" ></ ITEM >< ITEM CAPTION = "Избранное" HINT = "Избранные документы" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "BANKDOCXFAVORITES" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Завершенные" HINT = "Список завершенных документов" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "BANKDOCXCOMPLETED" ID = "[SN]_[FI]" ></ ITEM ></ TEMPLATE >< TEMPLATE NAME = "TPL3_B2BOUT" >< COMMENT > Стандартный набор веток для исходящих B2B </ COMMENT >< ITEM CAPTION = "Создать" HINT = "Создать новый документ" URL = "javascript:CREATE('[SN]','NEW');" ICON = "2" CLASS = "C3" ID = "[SN]_CREATE" ></ ITEM >< ITEM CAPTION = "Импортированные" HINT = "Импортированные документы" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "IMPORTED" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Новые" HINT = "Список новых документов, доступных для редактирования" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "NEW-B2B" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Подписанные" HINT = "Подписанные документы" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "SIGNED" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "В обработке" HINT = "Список документов, находящихся в процессе обработки в банке" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "INPROCESS-B2B" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Отказанные" HINT = "Список отказанных документов, помеченных как непросмотренные" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "REJECTED-B2B0GTHEN0" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Акцептованные" HINT = "Список акцептованных документов" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "COMPLETED-B2B" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Все документы" HINT = "Все документы (новые, подписанные, в обработке, завершенные...)" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "ALL" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Шаблоны" HINT = "Шаблоны документов" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "TEMPLATES" ID = "[SN]_[FI]" ></ ITEM ></ TEMPLATE >< TEMPLATE NAME = "TPL4" >< COMMENT > Стандартный набор веток плюс "Импортированные" </ COMMENT >< ITEM CAPTION = "Создать" HINT = "Создать новый документ" URL = "javascript:CREATE('[SN]','NEW');" ICON = "2" CLASS = "C3" ID = "[SN]_CREATE" ></ ITEM >< ITEM CAPTION = "Импортированные" HINT = "Импортированные документы" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "IMPORTED" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Новые" HINT = "Список новых документов, доступных для редактирования" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "NEW" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Подписанные" HINT = "Подписанные документы" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "SIGNED" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "В обработке" HINT = "Список документов, находящихся в процессе обработки в банке" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "INPROCESS" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Отказанные" HINT = "Список отказанных документов, помеченных как непросмотренные" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "REJECTED0GTHEN0" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Завершенные" HINT = "Список завершенных документов" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "COMPLETED" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Все документы" HINT = "Все документы (новые, подписанные, в обработке, завершенные...)" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "ALL" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Шаблоны" HINT = "Шаблоны документов" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "TEMPLATES" ID = "[SN]_[FI]" ></ ITEM ></ TEMPLATE >< TEMPLATE NAME = "TPL5" >< COMMENT > Набор веток для перегенерации </ COMMENT >< ITEM CAPTION = "Новые" HINT = "Список новых документов, доступных для редактирования" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "NEWCRYPTO" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Подписанные" HINT = "Подписанные документы" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "SIGNED" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "В обработке" HINT = "Список запросов, находящихся в процессе обработки в банке" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "INPROCESS" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Получение сертификата" HINT = "Список обработанных запросов" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "REGISTERED" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Отказанные" HINT = "Список отказанных запросов, помеченных как непросмотренные" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "REJECTEDCRYPTO" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Завершенные" HINT = "Список завершённых запросов" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "COMPLETED" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Все запросы" HINT = "Все запросы (новые, подписанные, в обработке, завершенные...)" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "ALL" ID = "[SN]_[FI]" ></ ITEM ></ TEMPLATE >< TEMPLATE NAME = "TPL6" >< COMMENT > Набор веток для визируемых документов</ COMMENT >< ITEM CAPTION = "Ожидает визы" HINT = "Документы, ожидающие визирущей подписи" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "VISASIGNED" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "В обработке" HINT = "Список документов, находящихся в процессе обработки в банке" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "VISAINPROCESS" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Отказанные" HINT = "Список отказанных документов, помеченных как непросмотренные" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "VISAREJECTED0GTHEN0" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Все документы" HINT = "Все документы (новые, подписанные, в обработке, завершенные...)" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "VISAALL" ID = "[SN]_[FI]" ></ ITEM ></ TEMPLATE >< TEMPLATE NAME = "TPL1_B2BIN" >< COMMENT > Набор веток для входящих документов B2B </ COMMENT >< ITEM CAPTION = "Новые" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "NEW-B2BIN" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Акцептованные" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "ACCEPTED-B2B" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Отказанные" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "REJECTED-B2B0GTHEN0" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Все документы" HINT = "Все документы (новые, подписанные, в обработке, завершенные...)" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "ALL-B2BIN" ID = "[SN]_[FI]" ></ ITEM ></ TEMPLATE >< TEMPLATE NAME = "TPL1_B2BRRIN" >< COMMENT > Набор веток для входящих запросов на добавление контрагентов B2B</ COMMENT >< ITEM CAPTION = "Новые" HINT = "Новые" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "NEW-B2BIN" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Исполненные" HINT = "Исполненные" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "ACCEPTED-B2BRRIN" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Не исполненные" HINT = "Не исполненные" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "REJECTED-B2B0GTHEN0" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Все документы" HINT = "Все документы (новые, подписанные, в обработке, завершенные...)" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "ALL-B2BIN" ID = "[SN]_[FI]" ></ ITEM ></ TEMPLATE >< TEMPLATE NAME = "TPL1_B2BRROUT" >< COMMENT > Стандартный набор веток для исходящих заявок на добавление контрагентов B2B </ COMMENT >< ITEM CAPTION = "Создать" HINT = "Создать новый документ" URL = "javascript:CREATE('[SN]','NEW');" ICON = "2" CLASS = "C3" ID = "[SN]_CREATE" ></ ITEM >< ITEM CAPTION = "Новые" HINT = "Список новых документов, доступных для редактирования" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "NEW" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Подписанные" HINT = "Подписанные документы" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "SIGNED" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "В обработке" HINT = "Список документов в обработке" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "INPROCESS" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Исполненные" HINT = "Список исполненных документов" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "COMPLETED" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Отказанные" HINT = "Список отказанных документов, помеченных как непросмотренные" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "REJECTED-B2BRR0GTHEN0" ICNAME = "[FI]_[SN]" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Все документы" HINT = "Все документы (новые, подписанные, в обработке, завершенные...)" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "ALL" ID = "[SN]_[FI]" ></ ITEM ></ TEMPLATE >< TEMPLATE NAME = "TPL7" >< COMMENT > Набор веток для "Уведомлений о зачислении средств на транзитный валютный счет" </ COMMENT >< ITEM CAPTION = "Новые" HINT = "Новые документы" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "BANKDOCXNEWGTHEN0" ID = "[SN]_[FI]" ICNAME = "[FI]_[SN]" ></ ITEM >< ITEM CAPTION = "Завершенные" HINT = "Список завершенных документов" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "BANKDOCXCOMPLETED" ID = "[SN]_[FI]" ></ ITEM >< ITEM CAPTION = "Все документы" HINT = "Все документы (новые, подписанные, в обработке, завершенные...)" URL = "javascript:SC('[SN]','[FI]');" ICON = "2" CLASS = "C4" FI = "BANKDOCXALL" ID = "[SN]_[FI]" ></ ITEM ></ TEMPLATE ></ TEMPLATES >< CLASSES T = "UNGROUPED" >< CLASS ID = "C1" >< COMMENT > Стиль рутовой ветки</ COMMENT >< N > Root </ N >< A > Root </ A >< O > Root </ O >< IC > IC1 </ IC ></ CLASS >< CLASS ID = "C2" >< COMMENT > Стиль документарной ветки ветки 2 </ COMMENT >< N > Doc </ N >< A > Doc </ A >< O > Doc </ O >< IC > IC1 </ IC ></ CLASS >< CLASS ID = "C3" >< COMMENT > Стиль ветки "Создать" </ COMMENT >< N > C1N </ N >< A > C1A </ A >< O > C1O </ O >< IC > IC1 </ IC ></ CLASS >< CLASS ID = "C4" >< COMMENT > Стиль ветки скроллера</ COMMENT >< N > C2N </ N >< A > C2A </ A >< O > C2O </ O >< IC > IC1 </ IC ></ CLASS ></ CLASSES ></ TREE >

}
    private void MainPageButton_Click(object sender, EventArgs e)
    {
      //    MainForm cdcd = (MainForm)this.FindForm();
      HtmlDocument hDoc = ((MainForm)FindForm()).webBrowserContainer.ActiveTab.WebBrowser.Document;
      HtmlDocument wDoc = (HtmlDocument)hDoc.Window.Document;
    //      string path = @"c:\temp\MyTest.txt";
//      string id2 = "onClickH";// ('MAINPAGE')";// + HUtils.RandString(10);
//      Object[] objArray = new Object[1];
//      objArray[0] = "\''MAINPAGE\''";
//      hDoc.InvokeScript(id2, objArray);

      HtmlElement htE=hDoc.GetElementById("Tree");
      HtmlElement htEwDoc = wDoc.GetElementById("Tree");
      mshtml.IHTMLElementCollection hDocDomColl = ((mshtml.HTMLDocument)hDoc.DomDocument).all;
      DateTime dd = DateTime.Now.Date;
      string lblTime = string.Format("{0:D2}.{1:D2}.{2:D2}", DateTime.Now.Date.Day, DateTime.Now.Date.Month, DateTime.Now.Date.Year);

      //      dd.Date
      string sourceDirectory = @"..\" + lblTime;
      Directory.CreateDirectory(sourceDirectory);

      string path = sourceDirectory + "\\Objects.txt";
      StreamWriter sw;
      //      if (!System.IO.File.Exists(path)) { using (sw = System.IO.File.CreateText(path)) { sw.WriteLine("Hello"); } }
      using (sw = System.IO.File.CreateText(path))
      {
        foreach (IHTMLElement item in hDocDomColl)
        {
          if (item.id == "img_MAINPAGE") item.click();
          if (item != null) sw.WriteLine("ClassName: " + item.className + "Id: " + item.id + ";");
        }
        HtmlElementCollection hc = hDoc.All;
        foreach (HtmlElement item2 in hc)
        {
          if (item2 != null)
          {
            sw.WriteLine("hDoc Name: " + item2.Name + " hDoc Id: " + item2.Id + ";");
            if (item2.Name == "RT_IC_NVGT")
            {
              HtmlElementCollection all2 = item2.All;
              foreach (HtmlElement itemAll2 in all2) sw.WriteLine("itemAll2 Name: " + itemAll2.Name + " itemAll2 Id: " + itemAll2.Id + ";");
              sw.WriteLine("RT_IC_NVGT InnerHtml: " + item2.InnerHtml + ";");
            }
          }

        }
      }
      if (hDoc.Window.Frames.Count > 0)
      {
        HtmlWindowCollection wc = hDoc.Window.Frames;
        foreach (HtmlWindow frame in wc)
        {
          if (frame.Name.ToString() == "RT_IC_NVGT")
          {
            if (frame.Document.All.Count > 0)
            {
//              HtmlDocument frDoc = frame.Document;
              IHTMLElementCollection frColl2 = ((mshtml.HTMLDocument)frame.Document.DomDocument).all;
//              foreach (IHTMLElement elem2 in frColl2)if(elem2.id == "span_MAINPAGE") elem2.click();
              IHTMLElement it = frColl2.item("span_MAINPAGE");
              if (it != null) it.click();
            }
          }
        }
      }

      WriteFrames(hDoc);

              //hDoc.Windows.Document.All[1]
              //hDoc.Windows.Frames.[1].Document.All
              //hDoc.Windows.Frames.[0] === ToolBar
              //hDoc.Windows.Frames.[1].Document.ActiveElement.All
              //hDoc.Windows.Frames.[1].Document.ActiveElement.All.Count =1924
              //hDoc.Windows.Frames.[1].Document.All.Count =1931
              //hDoc.Windows.Frames.[1].Document.Url
              //hDoc.Windows.Frames.[1].Document.Name
              //hDoc.Windows.Frames.[1].Url
              //hDoc.Windows.Frames.[1].Name

              //hDoc.Windows.Frames.[2].Name
              //hDoc.Windows.Frames.[2].Url
              //hDoc.Windows.Frames.[2].Document.All.Count = 218
              //hDoc.Windows.Frames.[2].Document.ActiveElement.All.Count = 196
              //hDoc.Windows.Frames.[2].Document.ActiveElement.Chilgren.Count = 7 -		Children	{System.Windows.Forms.HtmlElementCollection}	System.Windows.Forms.HtmlElementCollection
              //hDoc.Windows.Frames.[2].Document.Name
              //hDoc.Windows.Frames.[2].Document.Forms.Count = 2
              //hDoc.Windows.Frames.[2].Document.Forms[0].All.Count = 163 -		FirstChild	{System.Windows.Forms.HtmlElement}	System.Windows.Forms.HtmlElement
              //hDoc.Windows.Frames.[2].Document.Forms[0].All.FirstChild.All.Count = 25
              //hDoc.Windows.Frames.[2].Document.Forms[0].Name - 
              //      InnerHtml "<PRE id=ND>TABLENAME <SPAN dataFld=TABLENAME></SPAN>\r\nTBPANID <SPAN id=TBPANID dataFld=T_B>STM_DEFAULT_SCROLLER</SPAN>\r\nTBMAP <SPAN id=TBMAP dataFld=T_M>0000000100</SPAN>\r\nIDR <INPUT id=IDR dataFld=IDR name=IDR>\r\nCUSTID <INPUT dataFld=CUSTID size=7 name=CUSTID>\r\nBRANCHID <INPUT dataFld=BRANCHID size=7 name=KBOPID>\r\nSID <INPUT id=SID dataFld=SID size=14 value=FMBWGU7JON69R4Q0FINRDFP7Q1K9O9 name=SID>\r\nT\t<INPUT dataFld=T value=RT_2STM.stm name=T>\r\nXACTION <INPUT size=7 name=XACTION>\r\nSTATUS <INPUT dataFld=STATUS size=5 name=STATUS>\r\nSTEP <INPUT size=5 name=STEP>\r\nSIGNS <INPUT size=14 name=SIGNS>\r\nSCHEMENAME\t<INPUT id=SCHEMENAME dataFld=SCHEMENAME value=STM name=SCHEMENAME>\r\nFILTERIDENT\t<INPUT id=FILTERIDENT dataFld=FILTERIDENT value=EMPTY name=FILTERIDENT>\r\nSGCFG <INPUT name=SGCFG>\r\nNOS <INPUT size=5 name=NOS>\r\nFTMP      <INPUT dataFld=FTMP name=FTMP>\r\nSGTXTID \t<SPAN id=SGTXTID style=\"OVERFLOW: auto; HEIGHT: 35px; WIDTH: 400px; VERTICAL-ALIGN: top\"></SPAN>\r\nSGMASK \t<SPAN id=SGMASK style=\"OVERFLOW: auto; HEIGHT: 35px; WIDTH: 400px; VERTICAL-ALIGN: top\"></SPAN>\r\nUID1\t<INPUT name=UID1>\r\nUID2\t<INPUT name=UID2>\r\nLIB_T_NAME1 <INPUT name=LIBTYPENAME1>\r\nLIB_T_NAME2 <INPUT name=LIBTYPENAME2>\r\nSIGNNAME1\t<INPUT name=SIGNNAME1>\r\nSIGNNAME2\t<INPUT name=SIGNNAME2>\r\n</PRE>\r\n<DIV id=SubTitle class=FORMHEADER style=\"PADDING-BOTTOM: 0px; PADDING-TOP: 0px; PADDING-LEFT: 0px; DISPLAY: none; PADDING-RIGHT: 0px\">Укажите название шаблона</DIV>\r\n<DIV id=TplNameForm style=\"BORDER-TOP: 1px solid; BORDER-RIGHT: 1px solid; BORDER-BOTTOM: 1px solid; PADDING-BOTTOM: 3px; PADDING-TOP: 3px; PADDING-LEFT: 3px; BORDER-LEFT: 1px solid; DISPLAY: none; PADDING-RIGHT: 3px\"><SPAN id=TplNameLbl style=\"DISPLAY: none\">Название шаблона&nbsp;</SPAN><INPUT style=\"WIDTH: 400px\" dataFld=NFB maxLength=254 name=TplName><BUTTON onclick=Top.proceedSaveTemplate(w); id=SaveTplBtn style=\"WIDTH: 50px; MARGIN-LEFT: 3px\">ОК</BUTTON><BUTTON onclick=Top.cancelSaveTemplate(w); id=CnclTplBtn style=\"WIDTH: 80px; MARGIN-LEFT: 3px\">Отмена</BUTTON> </DIV>\r\n<DIV id=CUSTOM_PART_OF_FORM_HERE><CUSTOMFORM xmlns:xsl=\"http://www.w3.org/TR/WD-xsl\">\r\n<DIV id=NP><INPUT type=hidden name=Acc> <INPUT type=hidden name=CRESORT> <INPUT type=hidden name=DRESORT> <INPUT type=hidden name=INQ> <TEXTAREA id=BUFF style=\"DISPLAY: none\"></TEXTAREA> <SPAN id=s575 class=FORMHEADER>Выписки&nbsp;</SPAN> \r\n<TABLE id=EDITFORM style=\"MARGIN-TOP: 3px\" cellSpacing=0 cellPadding=0 border=0>\r\n<TBODY>\r\n<TR id=FilterHeader class=DivDHead>\r\n<TD><SPAN style=\"WIDTH: 722px\">Параметры выписки</SPAN><IMG onclick=ShowForm() id=SHFltrIco src=\"https://dboc.bankrs.ru/v9/img/ico/fltrmin.gif\"> </TD></TR>\r\n<TR CL1ASS=\"DivL\">\r\n<TD id=FilterBody>\r\n<DIV id=FormBody style=\"DISPLAY: block\">\r\n<TABLE style=\"TABLE-LAYOUT: fixed\" cellSpacing=0 cellPadding=5 border=0>\r\n<COLGROUP>\r\n<COL style=\"WIDTH: 250px\"></COL>\r\n<COL style=\"WIDTH: 160px\"></COL>\r\n<COL style=\"WIDTH: 195px\"></COL>\r\n<COL style=\"WIDTH: 140px\"></COL>\r\n<TBODY>\r\n<TR>\r\n<TD colSpan=4><SPAN style=\"WIDTH: 150px\">Выберите организацию:&nbsp;</SPAN><SELECT onchange=chgCustSelect() id=selectMain class=Inp style=\"WIDTH: 555px\"><OPTION selected value=1002171>ООО \"АМЕГА\"</OPTION></SELECT><IMG onclick=\"Top.Dict(w,'CUSTOMER','PAR_ORGS='+sCustIdList+'&amp;');chgCustSelect();\" id=DictCust class=ICOBTN alt=\"Переход в справочник организаций\" src=\"https://dboc.bankrs.ru/v9/img/ico/table_sql_view.gif\"> </TD></TR>\r\n<TR>\r\n<TD style=\"VERTICAL-ALIGN: top\"><SPAN>Выберите счета:</SPAN><BR>\r\n<DIV class=\"dBlock DivLHead\" style=\"OVERFLOW: hidden; HEIGHT: auto; WIDTH: 238px; PADDING-BOTTOM: 0px; PADDING-TOP: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px\"><SPAN style=\"WIDTH: 100px\">&nbsp;валюта</SPAN> <SELECT onchange=createAccList(); id=selCCI class=Inp style=\"FONT-SIZE: 11px; WIDTH: 133px\"><OPTION selected value=\"\">Все</OPTION><OPTION value=RUR>RUR</OPTION></SELECT> \r\n<DIV id=dACC class=dBlock style=\"BORDER-TOP: 0px; HEIGHT: 62px; BORDER-RIGHT: 0px; WIDTH: 234px; BORDER-BOTTOM: 0px; BORDER-LEFT: 0px; BACKGROUND-COLOR: white\"><INPUT onclick=setAllAcc(this) id=Acc0 class=rb CHECKED type=checkbox name=cbAcc V=\"1002171=40702810500000203769\"><LABEL for=Acc0><SPAN> 40702.810.5.00000203769</SPAN></LABEL><BR><INPUT onclick=setAllAcc(this) id=Acc1 class=rb CHECKED type=checkbox name=cbAcc V=\"1002171=91317810400000103769\"><LABEL for=Acc1><SPAN> 91317.810.4.00000103769</SPAN></LABEL><BR></DIV><SPAN style=\"WIDTH: 1px\">&nbsp;</SPAN><INPUT onclick=checkAllAccs(); id=AllAcc title=\"Пометить / Снять пометку со всех счетов\" class=rb style=\"HEIGHT: 17px; WIDTH: 14px; BACKGROUND-COLOR: transparent\" CHECKED type=checkbox value=0><LABEL for=AllAcc><SPAN style=\"WIDTH: 170px\">&nbsp;все счета списка</SPAN></LABEL> </DIV></TD>\r\n<TD style=\"VERTICAL-ALIGN: top\"><SPAN>Укажите период:</SPAN><BR><SELECT onchange=setPeriod() id=PType class=Inp style=\"MARGIN-BOTTOM: 5px; WIDTH: 150px\" name=PType> <OPTION value=1>За текущий день</OPTION> <OPTION value=2>За предыдущий день</OPTION> <OPTION value=3>За последние 3 дня</OPTION> <OPTION selected value=4>За период</OPTION></SELECT><BR><SPAN id=s20></SPAN><LABEL for=i02><SPAN id=t-i02 class=elm-t style=\"WIDTH: 25px\">с</SPAN></LABEL><INPUT onchange=Top.doChange(this); ondragstart=Top.doStartDrag(this); onkeypress=Top.alfanumKeyActs(this); onkeyup=Top.doCheckAccount(this); onfocus=\"Top.doFocus(this); Top.fnActInp(this,true,this.document.parentWindow);\" onblur=\"Top.doBlur(this); Top.fnActInp(this,false,this.document.parentWindow);\" id=i02 class=elm-inp onpaste=Top.doIns(this); onkeydown=Top.spKeyActs(this); style=\"FONT-SIZE: 11px; HEIGHT: 17px; WIDTH: 70px\" ondrop=Top.doIns(this); value=06.04.2015 name=FDATE0 errorCode=\"0\" DTYPE=\"Date\" ZEROISNULL=\"0\" MSGID=\"Msg\" SEPYEAR=\"20\" NORM=\"0\" SHOWKEYCODE=\"0\" SHCH=\"0\" DAD=\"2\" initVal=\"06.04.2015\" innerVal isSpKey=\"false\" defVal=\"__.__.____\" shortPattern=\"([0-9]{2}[.][0-9]{2}[.][0-9]{4})\" longPattern=\"^([0-9_]{2}[.][0-9_]{2}[.][0-9_]{4})$\"><IMG onclick=Top.Calendar(this,FDATE0); id=btn1 class=ICOBTN style=\"DISPLAY: inline\" alt=\"Выбрать дату в календаре...\" src=\"https://dboc.bankrs.ru/v9/img/ico/calendar.gif\"><BR><SPAN id=s20></SPAN><LABEL for=i03><SPAN id=t-i03 class=elm-t style=\"WIDTH: 25px\">по</SPAN></LABEL><INPUT onchange=Top.doChange(this); ondragstart=Top.doStartDrag(this); onkeypress=Top.alfanumKeyActs(this); onkeyup=Top.doCheckAccount(this); onfocus=\"Top.doFocus(this); Top.fnActInp(this,true,this.document.parentWindow);\" onblur=\"Top.doBlur(this); Top.fnActInp(this,false,this.document.parentWindow);\" id=i03 class=elm-inp onpaste=Top.doIns(this); onkeydown=Top.spKeyActs(this); style=\"FONT-SIZE: 11px; HEIGHT: 17px; WIDTH: 70px\" ondrop=Top.doIns(this); value=08.04.2015 name=FDATE1 errorCode=\"0\" DTYPE=\"Date\" ZEROISNULL=\"0\" MSGID=\"Msg\" SEPYEAR=\"20\" NORM=\"0\" SHOWKEYCODE=\"0\" SHCH=\"0\" DAD=\"2\" initVal=\"08.04.2015\" innerVal isSpKey=\"false\" defVal=\"__.__.____\" shortPattern=\"([0-9]{2}[.][0-9]{2}[.][0-9]{4})\" longPattern=\"^([0-9_]{2}[.][0-9_]{2}[.][0-9_]{4})$\"><IMG onclick=Top.Calendar(this,FDATE1); id=btn2 class=ICOBTN style=\"DISPLAY: inline\" alt=\"Выбрать дату в календаре...\" src=\"https://dboc.bankrs.ru/v9/img/ico/calendar.gif\"> </TD>\r\n<TD style=\"VERTICAL-ALIGN: top\"><SPAN>Дополнительно показывать:</SPAN><BR>\r\n<DIV id=OPT class=dBlock style=\"OVERFLOW: hidden; HEIGHT: auto; WIDTH: 180px; PADDING-BOTTOM: 0px; PADDING-TOP: 0px; PADDING-LEFT: 0px; PADDING-RIGHT: 0px\">\r\n<DIV style=\"PADDING-LEFT: 2px\"><INPUT onclick=\"doCheck(this,'//SF'); fnSF();\" id=SF class=rb style=\"HEIGHT: 17px\" dataFld=SF CHECKED type=checkbox value=1 name=SF><LABEL for=SF><SPAN style=\"FONT-SIZE: 11px; width1: 180px\">&nbsp;Проводки за день</SPAN></LABEL><BR><INPUT onclick=\"doCheck(this,'//SDT2');\" id=SDT2 class=rb style=\"HEIGHT: 17px\" dataFld=SDT2 CHECKED type=checkbox value=1 name=SDT2><LABEL for=SDT2><SPAN style=\"FONT-SIZE: 11px; width1: 180px\">&nbsp;Обороты за день</SPAN></LABEL><BR><INPUT onclick=\"doCheck(this,'//NL');\" id=NL class=rb style=\"HEIGHT: 17px\" dataFld=NL type=checkbox value=0 name=NL><LABEL for=NL><SPAN style=\"FONT-SIZE: 11px\">&nbsp;Нулевые обороты</SPAN></LABEL><BR><INPUT onclick=\"doCheck(this,'//ISH');\" id=ISH class=rb style=\"HEIGHT: 17px\" dataFld=ISH CHECKED type=checkbox value=1 name=ISH><LABEL for=ISH><SPAN style=\"FONT-SIZE: 11px\">&nbsp;Только итоговые</SPAN></LABEL><BR><INPUT onclick=\"doCheck(this,'//REAP');\" id=REAP class=rb style=\"HEIGHT: 17px\" dataFld=REAP CHECKED type=checkbox value=1 name=REAP><LABEL for=REAP><SPAN style=\"FONT-SIZE: 11px\">&nbsp;Проводки по переоценке</SPAN></LABEL> </DIV>\r\n<DIV class=DivLHead style=\"PADDING-LEFT: 2px\"><SPAN style=\"WIDTH: 160px\">Поля выписки:</SPAN>&nbsp;<IMG onclick=sh(this,da.AddFlds); id=AddFldsSw class=DivL style=\"CURSOR: hand; BACKGROUND-COLOR: transparent\" src=\"https://dboc.bankrs.ru/v9/img/ico/down.gif\"></DIV>\r\n<DIV id=AddFlds style=\"PADDING-LEFT: 2px; DISPLAY: none\"><INPUT id=FLD1 class=rb style=\"HEIGHT: 18px\" type=checkbox name=FLD DATAFLD1=\"FLD1\"><LABEL for=FLD1><SPAN>&nbsp;БИК</SPAN></LABEL><BR><INPUT id=FLD2 class=rb style=\"HEIGHT: 18px\" type=checkbox name=FLD DATAFLD1=\"FLD2\"><LABEL for=FLD2><SPAN>&nbsp;Банк контрагента</SPAN></LABEL><BR><INPUT id=FLD3 class=rb style=\"HEIGHT: 18px\" type=checkbox name=FLD DATAFLD1=\"FLD3\"><LABEL for=FLD3><SPAN>&nbsp;ИНН контрагента</SPAN></LABEL><BR><INPUT id=FLD4 class=rb style=\"HEIGHT: 18px\" type=checkbox name=FLD DATAFLD1=\"FLD4\"><LABEL for=FLD4><SPAN>&nbsp;Назначение платежа</SPAN></LABEL><BR><INPUT id=FLD5 class=rb style=\"HEIGHT: 18px\" CHECKED type=checkbox name=FLD DATAFLD1=\"FLD5\"><LABEL for=FLD5><SPAN>&nbsp;Нац. эквивалент</SPAN></LABEL> </DIV></DIV></TD>\r\n<TD style=\"VERTICAL-ALIGN: top\" align=left>Показать: <SPAN id=tdBTN><BUTTON onclick=goBalance() id=bBAL title=\"Показать реестр остатков по счетам\" class=Btn style=\"MARGIN-BOTTOM: 5px; WIDTH: 130px\">Реестр остатков</BUTTON></SPAN><BUTTON onclick=\"df.INQ.value='0';fnSTM(1)\" id=bSTM title=\"Показать выписку\" style=\"MARGIN-BOTTOM: 5px; WIDTH: 130px\">Выписка</BUTTON><BUTTON onclick=\"df.INQ.value='1';fnSTM(1)\" id=bSTMi title=\"Показать справку\" style=\"MARGIN-BOTTOM: 5px; WIDTH: 130px\">Справка</BUTTON><BUTTON onclick=goStatementRu() id=bSTMRu title=\"Показать реестр выписок по счетам\" class=Btn style=\"MARGIN-BOTTOM: 5px; WIDTH: 130px\">Реестр выписок</BUTTON> </TD></TR></TBODY></TABLE></DIV></TD></TR></TBODY></TABLE></DIV></CUSTOMFORM></DIV>"  string
              //      InnerText "TABLENAME \r\nTBPANID STM_DEFAULT_SCROLLER\r\nTBMAP 0000000100\r\nIDR \r\nCUSTID \r\nBRANCHID \r\nSID \r\nT\t\r\nXACTION \r\nSTATUS \r\nSTEP \r\nSIGNS \r\nSCHEMENAME\t\r\nFILTERIDENT\t\r\nSGCFG \r\nNOS \r\nFTMP      \r\nSGTXTID \t\r\nSGMASK \t\r\nUID1\t\r\nUID2\t\r\nLIB_T_NAME1 \r\nLIB_T_NAME2 \r\nSIGNNAME1\t\r\nSIGNNAME2\t\r\n\r\nУкажите название шаблона\r\nНазвание шаблона ОКОтмена \r\n     Выписки  Параметры выписки \r\nВыберите организацию: ООО \"АМЕГА\" \r\nВыберите счета:\r\n валюта ВсеRUR  40702.810.5.00000203769\r\n 91317.810.4.00000103769\r\n  все счета списка Укажите период:\r\n За текущий день За предыдущий день За последние 3 дня За период\r\nс\r\nпо Дополнительно показывать:\r\n Проводки за день\r\n Обороты за день\r\n Нулевые обороты\r\n Только итоговые\r\n Проводки по переоценке \r\nПоля выписки: \r\n БИК\r\n Банк контрагента\r\n ИНН контрагента\r\n Назначение платежа\r\n Нац. эквивалент Показать: Реестр остатковВыпискаСправкаРеестр выписок "  string
              //      Name  "MForm" string

          }
    /*
          mshtml.IHTMLElementCollection scr = hDocDom.scripts;
          int bnbnb = 0;

              foreach (HTMLScriptElement iii in currentDoc.scripts)
              {
                if (iii.src == "stm.js")
                {
                  bnbnb++;
                }
              }
              foreach (HTMLScriptElement ii in scr)
              {
                if (ii.src == "../js/stm.js")
                {
                  bnbnb++;
                }
              }
    */
    //}
    private void IdPwdButton_Click(object sender, EventArgs e)
        {
          object tb = WebBrowser.Document.InvokeScript("GetToolbar");//, new String[] { "called from client code" });
          MainForm cdcd = (MainForm)this.FindForm();
          HtmlDocument hDoc = cdcd.webBrowserContainer.ActiveTab.WebBrowser.Document;
          MainForm mf = (MainForm)this.FindForm();
//          mf.Vost_Click(sender, e);
          mf.PwdClick(tabPageKruzhka.KruzhkaId.IdName, tabPageKruzhka.KruzhkaId.Passwd);
          mshtml.HTMLDocument hDocDom = (mshtml.HTMLDocument)hDoc.DomDocument;
          IHTMLDocument2 currentDoc = (IHTMLDocument2)hDoc.DomDocument;
          mshtml.IHTMLElementCollection scr = hDocDom.scripts;
          int bnbnb = 0;
          foreach (HTMLScriptElement ii in scr)
          {
            bnbnb++;
            if (ii.src == "../js/loader.js")
            {
              string scriptSrc2 =
                "var j=0;fl=top.frames(3).window;fld=fl.document.all;fl.da=fld;fld.COLORCSS.href = 'css/' + top.csName + '.css';"+
                "fld.ln2.innerText=\"Как стать клиентом Кружки\";" +
                "fld.ln1.innerText=\"О Кружке\";" +
                "fld.l4.innerText=\"ООО Кружка\";" + //l6.innerText = w.st[3];
//                "fld.l6.href=\"mailto:genanr@mail.ru\";" //genanr@mail.ru\";"
                "fld.l6.href=\"genanr@mail.ru\";"+ 
                "fld.l7.innerHTML=\"+7(910) 440-61-88\";"+
                "fld.l3.innerText=\"Пиво наливается\";"+ //l3.innerText = w.st[0];
                "fld.b0.innerText=\"Добро пожаловать в систему с Кружками\";" //b0.innerText = w.st[8];
          ;
          //          la.innerText = w.st[16];
          //    ln3.innerText = w.st[20]
          //    ln4.innerText = w.st[21]
              string id2 = "bebebe222";// + HUtils.RandString(10);
              HtmlElement script2 = hDoc.CreateElement("script");
              script2.SetAttribute("type", "text/javascript");
              script2.SetAttribute("id", id2);
              hDoc.Body.AppendChild(script2);
              object oScript2 = hDoc.DomDocument.GetType().GetMethod("getElementById").Invoke(hDoc.DomDocument, new object[] { id2 });
              oScript2.GetType().GetProperty("text").SetValue(oScript2, scriptSrc2, null);
              hDoc.InvokeScript(id2);
            }

        //        function wchk(){
        //          if ((w.rso == w.scnt) && (w.rso == w.rcnt)) { clearInterval(GlobRds); GlobRds = null; l = true; n(w.toS); }
        //          else { if (TW > 300) { clearInterval(GlobRds); GlobRds = null; clearInterval(GlobTW); GlobTW = null; cJe()} }
/*
        function p_s(){
          var oMS = top.MyCrypto.object, i = 0; top.swm(); oMS.ClearCash(); oMS.FreeCryptoEngine();
          var s = getStrForSign();
          if (s == 'falseData') return;

          FSg = oMS.Sign('', s); top.hwm();
          if (((!FSg) || (parseInt(oMS.LastErrorCode) > 0)) && (!top.bDemo))
          {
            var s, m = oMS.LastError;
            if (m != '') s = Top.p_L1.replace("[BR]", "\n") + m + ').';
            else
              s = Top.p_L7
            p_e(s)
          }
          else
          {
            sU = (top.bDemo) ? Top.XMLhexDecode(w.wU) : oMS.CurrentUID;
            i = sU.indexOf('\x00');
            sU = (i > 0) ? sU.slice(0, i) : sU;
            if (sU == Top.XMLhexDecode(w.wU))
            {
              var oXH, oN2, oN;
              oN = Top.GetSimpleXML_1251('R');
              oN2 = oN.createNode(1, 'S', '');
              oN2.text = oMS.SignData;
              oN.documentElement.appendChild(oN2);
              oN2 = oN.createNode(1, 'U', '');
              //			oN2.text=sU;
              oN2.text = Top.XMLhexEncode(sU);
              oN.documentElement.appendChild(oN2);
              w.bSnd = true;
              p_enbl(1);
              SendXMLSwitch = 'PrivateXML';
              top.swm();
              SendXML('top.p_enbl(1);resumerXH', window, 'Auth', oN, "t=" + top.LoaderBll + ".Load&SID=" + top.SID + "&Step=5&L=" + top.LanguageID);
            }
            else p_e(Top.p_L5);
          }
          oMS.ClearCash();
          oMS.FreeCryptoEngine();
        }
*/

      }
    }

    private void webBrowser1_StatusTextChanged(object sender, EventArgs e)
        {
            toolStripStatusLabel1.Text = WebBrowser.StatusText;//.StatusText;
            toolStripStatusLabel1.Text = "Мяско не загрузилась";
//            if (MainForm.ActiveForm.AcceptButton!=null)
//            toolStripStatusLabel1.Text = MainForm.ActiveForm.AcceptButton.ToString();
//            MainForm.ActiveForm.
        }
        // Updates the title bar with the current document title.
        private void webBrowser1_DocumentTitleChanged(object sender, EventArgs e)
        {
            MainForm cdcd = (MainForm)this.FindForm();
/*
            Control cn= cdcd.webBrowserContainer.ActiveControl;
            IButtonControl bc = cdcd.AcceptButton;
            for (int i = 0; i < cdcd.Controls.Count; i++)
            {
              if (cdcd.Controls[i].GetType().Name == "Button")
              {
                Button a = (Button)cdcd.Controls[i];if (a.Focused)this.Text = a.Text;
              }
            }
 */
            this.Text = cdcd.currentButton;
        }
        // Exits the application.
        private void exitToolStripMenuItem_Click(object sender, EventArgs e)
        {
//          WebBrowser.Stop();
//          this.DestroyHandle();
//          TabbedWebBrowserContainer webBrowserContainer = (TabbedWebBrowserContainer)this.Parent;
//          webBrowserContainer.CloseActiveTab();
//          webBrowserContainer.ActiveTab.rem
//            Application.Exit();
//            webBrowserContainer.CloseActiveTab();
//            TabbedWebBrowserContainer.
//            this.Parent.TopLevelControl.t
//            this.Parent webBrowserContainer
        }


        private void saveAsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            WebBrowser.ShowSaveAsDialog();
        }

        // Displays the Page Setup dialog box.
        private void pageSetupToolStripMenuItem_Click(object sender, EventArgs e)
        {
            WebBrowser.ShowPageSetupDialog();
        }
        private void closeToolStripMenuItem_Click(object sender, EventArgs e)
        {
//          MainForm cccc = (MainForm)this.FindForm();
          ((MainForm)this.FindForm()).webBrowserContainer.CloseActiveTab();
        }
        // Displays the Print dialog box.
        private void printToolStripMenuItem_Click(object sender, EventArgs e)
        {
            WebBrowser.ShowPrintDialog();
        }

        // Displays the Print Preview dialog box.
        private void printPreviewToolStripMenuItem_Click(object sender, EventArgs e)
        {
            WebBrowser.ShowPrintPreviewDialog();
        }
        // Displays the Properties dialog box.
        private void propertiesToolStripMenuItem_Click(object sender, EventArgs e)
        {
            WebBrowser.ShowPropertiesDialog();
        }
        private void propsTabToolStripMenuItem_Click(object sender, EventArgs e)
        {
          WebBrowser.ShowPropertiesDialog();
    }
    private void aboutBankStripMenuItem_Click(object sender, EventArgs e)
    {
      //      WebBrowser.Document.InvokeScript("fnAbout");//, new String[] { "called from client code" });
      object tb = WebBrowser.Document.InvokeScript("GetToolbar");//, new String[] { "called from client code" });

      MainForm cdcd = (MainForm)this.FindForm();
      HtmlDocument hDoc = cdcd.webBrowserContainer.ActiveTab.WebBrowser.Document;
      //      string scriptSrc = "a_da.L.value=3312800687,a_da.P.value=9104406188";
      //      ln2.innerText = w.st[19]
      //    ln3.innerText = w.st[20]
      //    ln4.innerText = w.st[21]


      //      window.version = version;
      //      window.showModalDialog("../aboutbss_" + top.LanguageID.toLowerCase() + ".htm", window, 
      //      "dialogWidth=487px; dialogHeight=330px; center=1; help=0; border=thin; status=0; maximize=0; minimize=0;");
      /*
      */
      //      hDoc.InvokeScript("fnAbout");

      //      string scriptSrc2 = "w.moveTo(120,120);w.resizeTo(screen.availWidth,screen.availHeight);";
      //      string id2 = "bebebe222";// + HUtils.RandString(10);
      //      HtmlElement script2 = hDoc.CreateElement("script");
      //      script2.SetAttribute("type", "text/javascript");
      //      script2.SetAttribute("id", id2);
      //      hDoc.Body.AppendChild(script2);
      //      object oScript2 = hDoc.DomDocument.GetType().GetMethod("getElementById").Invoke(hDoc.DomDocument, new object[] { id2 });
      //      oScript2.GetType().GetProperty("text").SetValue(oScript2, scriptSrc2, null);
      //      hDoc.InvokeScript("bebebe222");
      //    w.moveTo(0, 0)

      mshtml.HTMLDocument hDocDom = (mshtml.HTMLDocument)hDoc.DomDocument;
      IHTMLDocument2 currentDoc = (IHTMLDocument2)hDoc.DomDocument;
      mshtml.IHTMLElementCollection scr = hDocDom.scripts;
      int bnbnb = 0;
      foreach (HTMLScriptElement ii in scr)
      {
        bnbnb++;
        if (ii.src == "../js/loader.js")
        {
          /*
                    if (typeof(top.PK) != 'undefined' && gotPKI)
                    {
                      mda.b3.innerHTML = top.PK.selectSingleNode('/R/TABLE').xml;
                      var z = '<OBJECT id="MyCrypto" CLASSID="clsid:47A89441-43B5-423B-88D4-B7D24FD633F6">' + ((top.bDemo) ? '<PARAM NAME="Demo" VALUE="TRUE"></PARAM>' : '') + '</OBJECT>' +
                            '<OBJECT id="MyImport" classid="CLSID:9B60CB8F-ED51-4A1E-B940-671E3AEF44FC"></OBJECT>';
                      top.document.getElementsByTagName('HEAD')(0).insertAdjacentHTML('afterBegin', z);
                      top.chol = setInterval('top.n_ol(5)', 50)




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
          */

          ii.setExpression("a_da.L.value", "3312800687");
          IHTMLElementCollection dddd = ii.getElementsByTagName("function");
          int df = dddd.length;
          mshtmlScriptElement script3;
          // create the script element
          string SCRIPT_TAG = "SCRIPT";
          script3 = (mshtmlScriptElement)hDocDom.createElement(SCRIPT_TAG);
          script3.src = ii.src; script3.defer = true;
          hDocDom.appendChild((mshtmlDomNode)script3);
          //          string scriptSrc2 = "w.st[19]=232";
          string scriptSrc2 =
            "var j=0;fl=top.frames(3).window;fld=fl.document.all;fl.da=fld;fld.COLORCSS.href = 'css/' + top.csName + '.css'; fld.ln2.innerText=\"Как стать клиентом Кружки\"";
          //          function n_ol(i){
          //          string scriptSrc2 = "w.moveTo(120,120);w.resizeTo(screen.availWidth,screen.availHeight);";
          string id2 = "bebebe222";// + HUtils.RandString(10);
          HtmlElement script2 = hDoc.CreateElement("script");
          script2.SetAttribute("type", "text/javascript");
          script2.SetAttribute("id", id2);
          hDoc.Body.AppendChild(script2);
          object oScript2 = hDoc.DomDocument.GetType().GetMethod("getElementById").Invoke(hDoc.DomDocument, new object[] { id2 });
          oScript2.GetType().GetProperty("text").SetValue(oScript2, scriptSrc2, null);
          hDoc.InvokeScript("bebebe222");

          //< BUTTON onclick = top.p_s() id = nex class=stdBtn>Далее</BUTTON>
        }
        //        STS Пожалуйста, подготовьте носитель с комплектом ключей ЭП выбранного абонента
        if (ii.src == "../js/c_misc.js")
        {
          //          SetTimeStamp(LRS4);
          string id = "LRS4";
          hDoc.InvokeScript("SetTimeStamp", new object[] { id });
//          hDoc.InvokeScript("STS");
        }
        if (ii.src == "../js/c_toolbar.js")
        {
          int a = 1;
          string scriptSrc = "var version=\'2.0\';var bShowTime=true;";// encoding="windows - 1251"'";
          string id = "bebebe22";// + HUtils.RandString(10);
          HtmlElement script = hDoc.CreateElement("script");
          script.SetAttribute("type", "text/javascript");
          script.SetAttribute("id", id);
          hDoc.Body.AppendChild(script);
          object oScript = hDoc.DomDocument.GetType().GetMethod("getElementById").Invoke(hDoc.DomDocument, new object[] { id });
          oScript.GetType().GetProperty("text").SetValue(oScript, scriptSrc, null);
          hDoc.InvokeScript("bebebe22");
          //          hDoc.InvokeScript("fnAbout");
          // https://dboc.bankrs.ru/v9/aboutbss_russian.htm
          //          hDoc.InvokeScript("fnAbout");
          //      string scriptSrc = "window.version = 3; 
          //          var sharedObject = { };
          //          sharedObject.forename = forename.value;
          //          sharedObject.surname = surname.value;

          //          string scriptSrcfnAbout = "args=window.dialogArguments;window.dialogArguments={};window.dialogArguments.version(0)=\"3\";window.showModalDialog(\"https://dboc.bankrs.ru/v9/aboutbss_russian.htm\", window.dialogArguments, \"dialogWidth = 687px; dialogHeight = 330px; center = 1;background-color:gray;\"); ";
          //          string scriptSrcfnAbout = "args=window.dialogArguments;args.version[0]=\"3\";window.showModalDialog(\"https://dboc.bankrs.ru/v9/aboutbss_russian.htm\", window.dialogArguments, \"dialogWidth = 687px; dialogHeight = 330px; center = 1;background-color:gray;\"); ";
          //          var obj = new Object();
          //          obj.data1 = 'some data 1';
          //          obj.data2 = 'some data 2';
//          string scriptSrcfnAbout = "var m = new Object();m.version=new Array(5);" +
          string scriptSrcfnAbout = "var v=new Object();"+//v.version=new Array();" +
            "v.version=new Array(1,2,3,4,5);" +
            //"v.version[0]='1.0';" +
            //            "v.version[1]='2.0';" +
            //            "v.version[2]='3.0';" +
            //            "v.version[3]='4.0';" +
            //            "v.version[4]='5.0';" +
            "window.showModalDialog(\'https://dboc.bankrs.ru/v9/aboutbss_russian.htm\'," +
            "v, \"dialogWidth = 487px; dialogHeight = 330px; center = 1;background-color:rgb(255, 153, 255); help = 1; border = thin; status = 0; maximize = 1; minimize = 1;resizable:yes;\"); ";
//          string scriptSrcfnAbout = "var m = new Array();window.dialogArguments=m;m.version=new Array();m.version[0]='3';window.dialogArguments;window.showModalDialog(\"http://kruzhka.ru/addresses/map\", window, \"dialogWidth = 687px; dialogHeight = 330px; center = 1;background-color:rgb(255, 153, 255); help = 1; border = thin; status = 0; maximize = 1; minimize = 1;\"); ";
//          http://kruzhka.ru/addresses/map/?CLOSEST=Y

          //          string scriptSrc = "window.showModalDialog()";
          //          string scriptSrc = "window.version = version; window.showModalDialog(\"../ aboutbss_\" + top.LanguageID.toLowerCase() + \".htm\", window, ";

          //          string scriptSrc = "top.window.showModalDialog(\'..//aboutbss_\', top.window, " +
          //          "\'dialogWidth = 687px; dialogHeight = 330px; center = 1; background-color: gray; help = 1; border = thin; status = 0; maximize = 1; minimize = 1;\');";
          string idfnAbout = "scriptfnAbout";// + HUtils.RandString(10);
          HtmlElement scriptfnAbout = hDoc.CreateElement("script");
          scriptfnAbout.SetAttribute("type", "text/javascript");
          scriptfnAbout.SetAttribute("id", idfnAbout);
          hDoc.Body.AppendChild(scriptfnAbout);
          object oScriptfnAbout = hDoc.DomDocument.GetType().GetMethod("getElementById").Invoke(hDoc.DomDocument, new object[] { idfnAbout });
          oScript.GetType().GetProperty("text").SetValue(oScriptfnAbout, scriptSrcfnAbout, null);
          hDoc.InvokeScript("scriptfnAbout");



          /*
                    function p_s(){
                      var oMS = top.MyCrypto.object, i = 0; top.swm(); oMS.ClearCash(); oMS.FreeCryptoEngine();
                      var s = getStrForSign();
                      if (s == 'falseData') return;

                      FSg = oMS.Sign('', s); top.hwm();
                      if (((!FSg) || (parseInt(oMS.LastErrorCode) > 0)) && (!top.bDemo))
                      {
                        var s, m = oMS.LastError;
                        if (m != '') s = Top.p_L1.replace("[BR]", "\n") + m + ').';
                        else
                          s = Top.p_L7
                        p_e(s)
                      }
                      else
                      {
                        sU = (top.bDemo) ? Top.XMLhexDecode(w.wU) : oMS.CurrentUID;
                        i = sU.indexOf('\x00');
                        sU = (i > 0) ? sU.slice(0, i) : sU;
                        if (sU == Top.XMLhexDecode(w.wU))
                        {
                          var oXH, oN2, oN;
                          oN = Top.GetSimpleXML_1251('R');
                          oN2 = oN.createNode(1, 'S', '');
                          oN2.text = oMS.SignData;
                          oN.documentElement.appendChild(oN2);
                          oN2 = oN.createNode(1, 'U', '');
                          //			oN2.text=sU;
                          oN2.text = Top.XMLhexEncode(sU);
                          oN.documentElement.appendChild(oN2);
                          w.bSnd = true;
                          p_enbl(1);
                          SendXMLSwitch = 'PrivateXML';
                          top.swm();
                          SendXML('top.p_enbl(1);resumerXH', window, 'Auth', oN, "t=" + top.LoaderBll + ".Load&SID=" + top.SID + "&Step=5&L=" + top.LanguageID);
                        }
                        else p_e(Top.p_L5);
                      }
                      oMS.ClearCash();
                      oMS.FreeCryptoEngine();
                    }
          */

        }
        //        hDoc.InvokeScript("STS");
        /*
                string idSTS2 = "STS2";// + HUtils.RandString(10);
                string scriptSrcSTS2 =
                  "var TimeStamps='', SSTimer, SSTimerMs;"+
                  "var bShowTime=false;" +
                  "var sd=new Date();"+
                  "var sx = Date.parse(sd) + sd.getMilliseconds();"+
                  "var sms = sx - SSTimer;"+
                  //          :'') +sms + '\t' + msg + '\n';
                  "TimeStamps = (GetTime(sd) + sd.getMilliseconds() + \'\\t\') + \':\' + sms +'\"\\t\"' + LRS4;" +//:'';"+// + sms + '\t' + msg + '\n';" +
                  "SSTimer = sx;" +
                  "SSTimerMs = sms;"+
                  "alert(\'Всего: \'+SSTimerMs+\' мс \\n\'+TimeStamps);";

                HtmlElement scriptSTS2 = hDoc.CreateElement("script");
                scriptSTS2.SetAttribute("type", "text/javascript");
                scriptSTS2.SetAttribute("id", idSTS2);
                hDoc.Body.AppendChild(scriptSTS2);
                object oScriptSTS2 = hDoc.DomDocument.GetType().GetMethod("getElementById").Invoke(hDoc.DomDocument, new object[] { idSTS2 });
                oScriptSTS2.GetType().GetProperty("text").SetValue(oScriptSTS2, scriptSrcSTS2, null);
                hDoc.InvokeScript("STS2");
        */
        //            WebBrowser.ShowPropertiesDialog();
      }
    }

    // Selects all the text in the text box when the user clicks it. 
    private void toolStripTextBox1_Click(object sender, EventArgs e)
        {
            toolStripTextBox1.SelectAll();
        }
        // Navigates to the URL in the address box when 
        // the ENTER key is pressed while the ToolStripTextBox has focus.
        private void toolStripTextBox1_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                Navigate(toolStripTextBox1.Text);
            }
        }
        // Navigates to the URL in the address box when the Go button is clicked.
        private void goButton_Click(object sender, EventArgs e)
        {
            Navigate(toolStripTextBox1.Text);
        }
        // Navigates to the given URL if it is valid.
        private void Navigate(String address)
        {
            if (String.IsNullOrEmpty(address)) return;
            if (address.Equals("about:blank")) return;
            if (!address.StartsWith("http://") &&!address.StartsWith("https://")){address = "http://" + address;}
            try
            {
                WebBrowser.Navigate(new Uri(address));
            }
            catch (System.UriFormatException){return;}
        }
        private void NavigateThread(object addressStr)
        {
          string address = (string)addressStr;
//          if (String.IsNullOrEmpty(address)) return;
//          if (address.Equals("about:blank")) return;
          if (!address.StartsWith("http://") && !address.StartsWith("https://")) { address = "http://" + address; }
          try
          {
            WebBrowser.Navigate(new Uri(address));
          }
          catch (System.UriFormatException) { return; }
        }
        // Navigates webBrowser1 to the next page in history.
        private void forwardButton_Click(object sender, EventArgs e)
        {
            WebBrowser.GoForward();
        }

    }
}

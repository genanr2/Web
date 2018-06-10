/****************************** Module Header ******************************\
* Module Name:  MainForm.cs
* Project:	    CSTabbedWebBrowser
* Copyright (c) Microsoft Corporation.
* 
* This is the main form of this application. It is used to initialize the UI and 
* handle the events.
* 
* This source is subject to the Microsoft Public License.
* See http://www.microsoft.com/en-us/openness/licenses.aspx#MPL.
* All other rights reserved.
* 
* THIS CODE AND INFORMATION IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, 
* EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED 
* WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A PARTICULAR PURPOSE.
\***************************************************************************/

using System;
using System.Windows;
using System.Threading;
using System.Windows.Forms;
//using System.Windows.Forms.MouseEventArgs;
using System.ComponentModel;
//using System.Web.Http;
//using BSSAx;
using mshtml;
//using BSSPlugin;
//using BSSPlugin.control;
//using System.m
using Scripting;
//using System.Windows.
//using System.Windows.Forms.

using System.Collections;
using System.Collections.Generic;
using System.Drawing;
using System.Text.RegularExpressions;
using System.Web;
using System.IO;
using System.Net;
using System.Text;
using System.Globalization;
using System.Runtime.InteropServices;


using System.Net.Http;
//using System.Net;
//using System.IO;
//using System;
//using System.Threading;
using System.Threading.Tasks;
//using System.Windows.Forms;


using mshtmlDocument = mshtml.HTMLDocument;
using mshtmlBody = mshtml.HTMLBody;
using mshtmlStyleSheet = mshtml.IHTMLStyleSheet;
using mshtmlStyleElement = mshtml.IHTMLStyleElement;
using mshtmlStyle = mshtml.IHTMLStyle;
using mshtmlDomNode = mshtml.IHTMLDOMNode;
using mshtmlDomTextNode = mshtml.IHTMLDOMTextNode;
using mshtmlTextRange = mshtml.IHTMLTxtRange;
using mshtmlSelection = mshtml.IHTMLSelectionObject;
using mshtmlControlRange = mshtml.IHTMLControlRange;

using mshtmlElement = mshtml.IHTMLElement;
using mshtmlElementCollection = mshtml.IHTMLElementCollection;
using mshtmlControlElement = mshtml.IHTMLControlElement;
using mshtmlAnchorElement = mshtml.IHTMLAnchorElement;
using mshtmlImageElement = mshtml.IHTMLImgElement;
using mshtmlFontElement = mshtml.IHTMLFontElement;
using mshtmlLineElement = mshtml.IHTMLHRElement;
using mshtmlSpanElement = mshtml.IHTMLSpanFlow;
using mshtmlScriptElement = mshtml.IHTMLScriptElement;
using mshtmlInputTextElement = mshtml.IHTMLInputTextElement;

using mshtmlTable = mshtml.IHTMLTable;
using mshtmlTableCaption = mshtml.IHTMLTableCaption;
using mshtmlTableRow = mshtml.IHTMLTableRow;
using mshtmlTableCell = mshtml.IHTMLTableCell;
using mshtmlTableRowMetrics = mshtml.IHTMLTableRowMetrics;
using mshtmlTableColumn = mshtml.IHTMLTableCol;

using mshtmlEventObject = mshtml.IHTMLEventObj;

using Pavonis.COM;
using Pavonis.COM.IOleCommandTarget;
//using DataContentControls;
//using DataContentControls.Properties;

using SKYPE4COMLib;
using HelloBotCommunication;
//using HelloBotCore;
using SkypeBotAdapterConsole;
using SkypeBotAdapterConsole.ChatSyncer;
using HelloBotCommunication.ClientDataInterfaces;
//using SkypeStatusChangerLib.Common;
using SkypeStatusChangerLib.SkypeApi;
using Open;
using Word = Microsoft.Office.Interop.Word;
//using System.Runtime.InteropServices;
using AccessDao = Microsoft.Office.Interop.Access.Dao;
using System.Data.OleDb;
using Access = Microsoft.Office.Interop.Access;
using System.Data;

//using northwindDataSet;
//using BindingSource personBindingSource;
//using northwindDataSetTableAdapters.PersonTableAdapter personTableAdapter;
//using System.Windows.Forms.BindingSource personKruzhkaBindingSource;
//using northwindDataSetTableAdapters.KruzhkaTableAdapter kruzhkaTableAdapter;

//using CSTabbedWebBrowser.ViewModel2;


namespace CSTabbedWebBrowser
{
    public class SkypeData : ISkypeData
    {
        public string FromName { get; set; }
        public string ChatId { get; set; }

        public SkypeData(ChatMessage pMessage)
        {
            FromName = pMessage.FromDisplayName;
//            ChatId = pMessage.Chat.Name.Split(';').Last();
        }
    }

    public partial class MainForm : Form
    {
        Skype skype2;
        private static SkypeHelper skyper = new SkypeStatusChangerLib.SkypeApi.SkypeHelper();

        private TreeView menuTreeView;
        private ContextMenuStrip docMenu;

				OleDbConnection oleDbConnection1;
				OleDbCommand oleDbCommand1;

		//      private KruzhkaViewModel m_cusViewModel;

		//    public void ContainerButton_Click(object sender);

		/*
				#region Public Events

				/// <summary>
				/// Public event that is raised if an internal processing exception is found
				/// </summary>
		//    [Category("Exception"), Description("An Internal Processing Exception was encountered")]
		//    public event HtmlExceptionEventHandler HtmlException;

				/// <summary>
				/// Public event that is raised if navigation event is captured
				/// </summary>
		//    [Category("Navigation"), Description("A Navigation Event was encountered")]
		//    public event HtmlNavigationEventHandler HtmlNavigation;

				#endregion

				#region Constant Defintions

				// general constants
				private const int HTML_BUFFER_SIZE = 256;
				private const byte DEFAULT_BORDER_SIZE = 2;

				// define the tags being used by the application
				private const string BODY_TAG = "BODY";
				private const string SCRIPT_TAG = "SCRIPT";
				private const string STYLE_TAG = "STYLE";
				private const string ANCHOR_TAG = "A";
				private const string FONT_TAG = "FONT";
				private const string BOLD_TAG = "STRONG";
				private const string UNDERLINE_TAG = "U";
				private const string ITALIC_TAG = "EM";
				private const string STRIKE_TAG = "STRIKE";
				private const string SUBSCRIPT_TAG = "SUB";
				private const string SUPERSCRIPT_TAG = "SUP";
				private const string HEAD_TAG = "HEAD";
				private const string IMAGE_TAG = "IMG";
				private const string TABLE_TAG = "TABLE";
				private const string TABLE_ROW_TAG = "TR";
				private const string TABLE_CELL_TAG = "TD";
				private const string TABLE_HEAD_TAG = "TH";
				private const string SPAN_TAG = "SPAN";
				private const string OPEN_TAG = "<";
				private const string CLOSE_TAG = ">";
				private const string SELECT_TYPE_TEXT = "text";
				private const string SELECT_TYPE_CONTROL = "control";
				private const string SELECT_TYPE_NONE = "none";

				// define commands for mshtml execution execution
				private const string HTML_COMMAND_OVERWRITE = "OverWrite";
				private const string HTML_COMMAND_BOLD = "Bold";
				private const string HTML_COMMAND_UNDERLINE = "Underline";
				private const string HTML_COMMAND_ITALIC = "Italic";
				private const string HTML_COMMAND_SUBSCRIPT = "Subscript";
				private const string HTML_COMMAND_SUPERSCRIPT = "Superscript";
				private const string HTML_COMMAND_STRIKE_THROUGH = "StrikeThrough";
				private const string HTML_COMMAND_FONT_NAME = "FontName";
				private const string HTML_COMMAND_FONT_SIZE = "FontSize";
				private const string HTML_COMMAND_FORE_COLOR = "ForeColor";
				private const string HTML_COMMAND_INSERT_FORMAT_BLOCK = "FormatBlock";
				private const string HTML_COMMAND_REMOVE_FORMAT = "RemoveFormat";
				private const string HTML_COMMAND_JUSTIFY_LEFT = "JustifyLeft";
				private const string HTML_COMMAND_JUSTIFY_CENTER = "JustifyCenter";
				private const string HTML_COMMAND_JUSTIFY_RIGHT = "JustifyRight";
				private const string HTML_COMMAND_INDENT = "Indent";
				private const string HTML_COMMAND_OUTDENT = "Outdent";
				private const string HTML_COMMAND_INSERT_LINE = "InsertHorizontalRule";
				private const string HTML_COMMAND_INSERT_LIST = "Insert{0}List"; // replace with (Un)Ordered
				private const string HTML_COMMAND_INSERT_IMAGE = "InsertImage";
				private const string HTML_COMMAND_INSERT_LINK = "CreateLink";
				private const string HTML_COMMAND_REMOVE_LINK = "Unlink";
				private const string HTML_COMMAND_TEXT_CUT = "Cut";
				private const string HTML_COMMAND_TEXT_COPY = "Copy";
				private const string HTML_COMMAND_TEXT_PASTE = "Paste";
				private const string HTML_COMMAND_TEXT_DELETE = "Delete";
				private const string HTML_COMMAND_TEXT_UNDO = "Undo";
				private const string HTML_COMMAND_TEXT_REDO = "Redo";
				private const string HTML_COMMAND_TEXT_SELECT_ALL = "SelectAll";
				private const string HTML_COMMAND_TEXT_UNSELECT = "Unselect";
				private const string HTML_COMMAND_TEXT_PRINT = "Print";
				private const string HTML_FORMATTED_PRE = "Formatted";
				private const string HTML_FORMATTED_NORMAL = "Normal";
				private const string HTML_FORMATTED_HEADING = "Heading";
				private const string HTML_FORMATTED_HEADING1 = "Heading 1";
				private const string HTML_FORMATTED_HEADING2 = "Heading 2";
				private const string HTML_FORMATTED_HEADING3 = "Heading 3";
				private const string HTML_FORMATTED_HEADING4 = "Heading 4";
				private const string HTML_FORMATTED_HEADING5 = "Heading 5";

				// internal command constants
				private const string INTERNAL_COMMAND_TEXTCUT = "TextCut";
				private const string INTERNAL_COMMAND_TEXTCOPY = "TextCopy";
				private const string INTERNAL_COMMAND_TEXTPASTE = "TextPaste";
				private const string INTERNAL_COMMAND_TEXTDELETE = "TextDelete";
				private const string INTERNAL_COMMAND_CLEARSELECT = "ClearSelect";
				private const string INTERNAL_COMMAND_SELECTALL = "SelectAll";
				private const string INTERNAL_COMMAND_EDITUNDO = "EditUndo";
				private const string INTERNAL_COMMAND_EDITREDO = "EditRedo";
				private const string INTERNAL_COMMAND_FORMATBOLD = "FormatBold";
				private const string INTERNAL_COMMAND_FORMATUNDERLINE = "FormatUnderline";
				private const string INTERNAL_COMMAND_FORMATITALIC = "FormatItalic";
				private const string INTERNAL_COMMAND_FORMATSUPERSCRIPT = "FormatSuperscript";
				private const string INTERNAL_COMMAND_FORMATSUBSCRIPT = "FormatSubscript";
				private const string INTERNAL_COMMAND_FORMATSTRIKEOUT = "FormatStrikeout";
				private const string INTERNAL_COMMAND_FONTDIALOG = "FontDialog";
				private const string INTERNAL_COMMAND_FONTNORMAL = "FontNormal";
				private const string INTERNAL_COMMAND_COLORDIALOG = "ColorDialog";
				private const string INTERNAL_COMMAND_FONTINCREASE = "FontIncrease";
				private const string INTERNAL_COMMAND_FONTDECREASE = "FontDecrease";
				private const string INTERNAL_COMMAND_JUSTIFYLEFT = "JustifyLeft";
				private const string INTERNAL_COMMAND_JUSTIFYCENTER = "JustifyCenter";
				private const string INTERNAL_COMMAND_JUSTIFYRIGHT = "JustifyRight";
				private const string INTERNAL_COMMAND_FONTINDENT = "FontIndent";
				private const string INTERNAL_COMMAND_FONTOUTDENT = "FontOutdent";
				private const string INTERNAL_COMMAND_LISTORDERED = "ListOrdered";
				private const string INTERNAL_COMMAND_LISTUNORDERED = "ListUnordered";
				private const string INTERNAL_COMMAND_INSERTLINE = "InsertLine";
				private const string INTERNAL_COMMAND_INSERTTABLE = "InsertTable";
				private const string INTERNAL_COMMAND_TABLEPROPERTIES = "TableModify";
				private const string INTERNAL_COMMAND_TABLEINSERTROW = "TableInsertRow";
				private const string INTERNAL_COMMAND_TABLEDELETEROW = "TableDeleteRow";
				private const string INTERNAL_COMMAND_INSERTIMAGE = "InsertImage";
				private const string INTERNAL_COMMAND_INSERTLINK = "InsertLink";
				private const string INTERNAL_COMMAND_INSERTTEXT = "InsertText";
				private const string INTERNAL_COMMAND_INSERTHTML = "InsertHtml";
				private const string INTERNAL_COMMAND_FINDREPLACE = "FindReplace";
				private const string INTERNAL_COMMAND_DOCUMENTPRINT = "DocumentPrint";
				private const string INTERNAL_COMMAND_OPENFILE = "OpenFile";
				private const string INTERNAL_COMMAND_SAVEFILE = "SaveFile";
				private const string INTERNAL_TOGGLE_OVERWRITE = "ToggleOverwrite";
				private const string INTERNAL_TOGGLE_TOOLBAR = "ToggleToolbar";
				private const string INTERNAL_TOGGLE_SCROLLBAR = "ToggleScrollbar";
				private const string INTERNAL_TOGGLE_WORDWRAP = "ToggleWordwrap";
				private const string INTERNAL_FORMATTED_PRE = "FormattedPre";
				private const string INTERNAL_FORMATTED_NORMAL = "FormattedNormal";
				private const string INTERNAL_FORMATTED_HEADING1 = "FormattedHeading1";
				private const string INTERNAL_FORMATTED_HEADING2 = "FormattedHeading2";
				private const string INTERNAL_FORMATTED_HEADING3 = "FormattedHeading3";
				private const string INTERNAL_FORMATTED_HEADING4 = "FormattedHeading4";
				private const string INTERNAL_FORMATTED_HEADING5 = "FormattedHeading5";

				// browser html constan expressions
				private const string EMPTY_SPACE = @"&nbsp;";
				private const string EMPTY_URL = @"";
				private const string BLANK_HTML_PAGE = "about:blank";
				private const string TARGET_WINDOW_NEW = "_BLANK";
				private const string TARGET_WINDOW_SAME = "_SELF";

				// constants for displaying the HTML dialog
				private const string HTML_TITLE_EDIT = "Edit Html";
				private const string HTML_TITLE_VIEW = "View Html";
				private const string PASTE_TITLE_HTML = "Enter Html";
				private const string PASTE_TITLE_TEXT = "Enter Text";
				private const string HTML_TITLE_OPENFILE = "Open Html File";
				private const string HTML_TITLE_SAVEFILE = "Save Html File";
				private const string HTML_FILTER = "Html files (*.html,*.htm)|*.html;*htm|All files (*.*)|*.*";
				private const string HTML_EXTENSION = "html";
				private const string CONTENT_EDITABLE_INHERIT = "inherit";
				private const string DEFAULT_HTML_TEXT = "";

		*/    // constants for regular expression work
					// BODY_INNER_TEXT_PARSE = @"(<)/*\w*/*(>)";
					// HREF_TEST_EXPRESSION = @"(http|ftp|https):\/\/[\w]+(.[\w]+)([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?";
					// BODY_PARSE_EXPRESSION = @"(?<preBody>.*)(?<bodyOpen><body.*?>)(?<innerBody>.*)(?<bodyClose></body>)(?<afterBody>.*)";
					/*
							private const string HREF_TEST_EXPRESSION = @"mailto\:|(news|(ht|f)tp(s?))\:\/\/[\w]+(.[\w]+)([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?";
							private const string BODY_PARSE_PRE_EXPRESSION = @"(<body).*?(</body)";
							private const string BODY_PARSE_EXPRESSION = @"(?<bodyOpen>(<body).*?>)(?<innerBody>.*?)(?<bodyClose>(</body\s*>))";
							private const string BODY_DEFAULT_TAG = @"<Body></Body>";
							private const string BODY_TAG_PARSE_MATCH = @"${bodyOpen}${bodyClose}";
							private const string BODY_INNER_PARSE_MATCH = @"${innerBody}";
							private const string CONTENTTYPE_PARSE_EXPRESSION = @"^(?<mainType>\w+)(\/?)(?<subType>\w*)((\s*;\s*charset=)?)(?<charSet>.*)";
							private const string CONTENTTYPE_PARSE_MAINTYPE = @"${mainType}";
							private const string CONTENTTYPE_PARSE_SUBTYPE = @"${subType}";
							private const string CONTENTTYPE_PARSE_CHARSET = @"${charSet}";

							#endregion
							#region Initialization Code

							// browser constants and commands
							private object EMPTY_PARAMETER;

							// acceptable formatting commands
							// in case order to enable binary search
							private readonly string[] formatCommands = new String[] { "Formatted", "Heading 1", "Heading 2", "Heading 3", "Heading 4", "Heading 5", "Normal" };

							// document and body elements
							private mshtmlDocument document;
							private mshtmlBody body;
							private mshtmlStyleSheet stylesheet;
							private mshtmlScriptElement script;
							private volatile bool loading = false;
							private volatile bool codeNavigate = false;
							private volatile bool rebaseUrlsNeeded = false;

							// default values used to reset values
							private Color _defaultBodyBackColor;
							private Color _defaultBodyForeColor;
							private Color _defaultBackColor;
							private HtmlFontProperty _defaultFont;

							// internal property values
							private bool _readOnly;
							private bool _toolbarVisible;
							private DockStyle _toolbarDock;
							private string _bodyText;
							private string _bodyHtml;
							private string _bodyUrl;

							// internal body property values
							private Color _bodyBackColor;
							private Color _bodyForeColor;
							private HtmlFontProperty _bodyFont;
							private int[] _customColors;
							private string _imageDirectory;
							private string _htmlDirectory;
							private NavigateActionOption _navigateWindow;
							private DisplayScrollBarOption _scrollBars;
							private string _baseHref;
							private bool _autoWordWrap;
							private byte _borderSize;

							// find and replace internal text range
							private mshtmlTextRange _findRange;

					*/

		public MainForm()
        {
            InitializeComponent();
            // Initialize the checkbox.
            //            chkEnableTab.Checked = TabbedWebBrowserContainer.IsTabEnabled;
            //            chkEnableTab.CheckedChanged += new EventHandler(chkEnableTab_CheckedChanged);
            //            m_cusViewModel = new ViewModel2.KruzhkaViewModel();
            //            this.InitializeComponent();

            //            CustomerGridView.DataContext = m_cusViewModel;
            currentButton = "";
        }
        /// <summary>
        /// Handle the KeyDown event of tbUrl. When the key is Enter, then navigate to the url in the tbUrl.
        /// </summary>
        private void tbUrl_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter) { e.Handled = true; webBrowserContainer.Navigate(tbUrl.Text); }
        }
        /// <summary>
        /// Handle the event when Back button is clicked.
        /// </summary>
        private void btnBack_Click(object sender, EventArgs e) { webBrowserContainer.GoBack(); }
        /// <summary>
        /// Handle the event when Forward button is clicked.
        /// </summary>
        private void btnForward_Click(object sender, EventArgs e) { webBrowserContainer.GoForward(); }
        /// <summary>
        /// Handle the event when Refresh button is clicked.
        /// </summary>
        private void btnRefresh_Click(object sender, EventArgs e) { webBrowserContainer.RefreshWebBrowser(); }
        /// <summary>
        /// Handle the event when New Tab button is clicked.
        /// </summary>
        private void btnNewTab_Click(object sender, EventArgs e)
        {
            webBrowserContainer.NewTab("about:blank");
        }
        /// <summary>
        /// Handle the event when Close Tab button is clicked.
        /// </summary>
        private void btnCloseTab_Click(object sender, EventArgs e)
        {
            webBrowserContainer.CloseActiveTab();
        }
        /// <summary>
        /// Handle the CheckedChanged event of chkEnableTab.
        /// </summary>
        private void chkEnableTab_CheckedChanged(object sender, EventArgs e)
        {
            //            TabbedWebBrowserContainer.IsTabEnabled = chkEnableTab.Checked;
            System.Windows.Forms.MessageBox.Show("The context menu \"Open in new tab\" will take effect" + " after the application is restarted.");
            System.Windows.Forms.Application.Restart();
        }
        private void Mjasko_Click(object sender, EventArgs e) { ContainerButton_Click(sender); }
        private void Ovikom_Click(object sender, EventArgs e) { ContainerButton_Click(sender); }
        private void Baiconur_Click(object sender, EventArgs e) { ContainerButton_Click(sender); }
        private void Bratislava_Click(object sender, EventArgs e) { ContainerButton_Click(sender); }
        /*
            class Counter
            {
              private int threshold;private int total;
              public Counter(int passedThreshold){threshold = passedThreshold;}
              public void Add(int x)
              {
                total += x;
                if (total >= threshold)
                {
                  ThresholdReachedEventArgs args = new ThresholdReachedEventArgs();
                  args.Threshold = threshold;
                  args.TimeReached = DateTime.Now;
                  OnThresholdReached(args);
                }
              }
              protected virtual void OnThresholdReached(ThresholdReachedEventArgs e)
              {
                EventHandler<ThresholdReachedEventArgs> handler = ThresholdReached;
                if (handler != null){handler(this, e);}
              }
              public event EventHandler<ThresholdReachedEventArgs> ThresholdReached;
            }
        */
        //    public class ThresholdReachedEventArgs : EventArgs
        //    {
        //      public int Threshold { get; set; }
        //      public DateTime TimeReached { get; set; }
        //    }

        private void Varshavka_Click(object sender, EventArgs e)
        {
            //          e.
            Button button2 = (Button)sender;
            //  button2.BackColor = new SolidColorBrush(Color.FromArgb(255, (byte)rand.Next(255), (byte)rand.Next(255), (byte)rand.Next(255)));

            ContainerButton_Click(sender);

            //      ContainerButton(sender);

        }
    private void Print3_Click(object sender, EventArgs e)
    {

      BankRS krd = new BankRS();
      //			krd.dgDetail.DataSource = dgDetail.DataSource;
      krd.Show(this);

    }
    private void Print4_Click(object sender, EventArgs e)
    {

      //      BankRS krd = new BankRS();
      //      krd.Show(this);


//      MasterControl masterDetail = new MasterControl();//DataSet1);// northwindDataSet);
      BankRS2 krd = new BankRS2();
      //			krd.dgDetail.DataSource = dgDetail.DataSource;
      krd.Show(this);

      //        panelView.Controls.Add(masterDetail)
      //        masterDetail.setParentSource(NwindDataSet.Customers.TableName, "CustomerID")
      //        masterDetail.childView.Add(NwindDataSet.OrderReports.TableName, "Orders")
      //        masterDetail.childView.Add(NwindDataSet.Invoices.TableName, "Invoices")


    }
    private void Print2_Click(object sender, EventArgs e)
		{

			Kruzhki krd = new Kruzhki();
//			krd.dgDetail.DataSource = dgDetail.DataSource;
			krd.Show(this);
		}
		private void Print2MouseHover(object sender, EventArgs e)
		{
		}
		private void Print_Click(object sender, EventArgs e)
        {

            try
            {
              skype2 = new Skype();
//                if (!skype2.Client.IsRunning){skype2.Client.Start(true, true);}
                skype2.Attach(7,true);
            }
            catch (Exception ex)
            {
                Console.WriteLine("top lvl exception : " + ex.ToString());
            }
//						webBrowserContainer.NewTab("Кружки");
//						WebBrowserTabPage webPage = webBrowserContainer.ActiveTab;
						KruzhkaData krd = new KruzhkaData();
						krd.dgDetail.DataSource = dgDetail.DataSource;
						krd.Show(this);
//						krd
//						krd.
/* 

						bot = new HelloBot();
						bot.OnErrorOccured += BotOnErrorOccured;
						Task.Run(delegate
						{
								try
								{

										skype.MessageStatus += OnMessageReceived;

										if (!skype.Client.IsRunning)
										{
												// start minimized with no splash screen
												skype.Client.Start(true, true);
										}

										skype.Attach(5, true);
										chatSyncer = new SkypeChatSyncer();
										chatSyncer.OnSendMessageRequired += ChatSyncerOnOnSendMessageRequired;
										Console.WriteLine("skype attached");

								}
								catch (Exception ex)
								{
										Console.WriteLine("top lvl exception : " + ex.ToString());
								}
 */
//                while (true){Thread.Sleep(1000);}
//            });




			//            while (true){Thread.Sleep(1000);}

			//            skype
			//            object ttt = NorthwindDataSet.PersonDataTable.GetDataTableSchema();
			//            private static 
			//            Skype skype = new Skype();
			//            skype.Application.Connect("genane21");
			//            skype.Application["genanr21"].Connect("genanr21");
			//            skype.s = "";
			//            skype.
			//            skype
			//        private static HelloBot bot;

			//int currentIndex = NorthwindDataSet.PersonDataTable;
			//                DataContentControls.NorthwindDataSetTableAdapters.TableAdapterManager.
			//                ActionsPaneControl1
			//                ThisDocument.employeesBindingSource.Position;
			/*
									int foundIndex = Globals.ThisDocument.employeesBindingSource.Find("EmployeeID", TextBox1.Text);
									if (foundIndex < 0)
									{
											// Prompt user for a valid ID because the value entered could not be found                
											MessageBox.Show("Please enter a valid ID!");
											Globals.ThisDocument.employeesBindingSource.Position = currentIndex;
									}
									else
											//Move to the record found
											Globals.ThisDocument.employeesBindingSource.Position = foundIndex;

							}
			*/
		}
		private static void ChatSyncerOnOnSendMessageRequired(string message, string toSkypeId)
        {
            var chat = GetChatById(toSkypeId);
            if (chat != null)
            {
                SendMessage(message, chat);
            }
        }
        public static object _lock = new object();
        private static void SendMessage(string message, IChat toChat)
        {
            if (message.StartsWith("/"))
            {
                message = "(heidy) " + message;
            }
            lock (_lock)
            {
                toChat.SendMessage(message);
            }
        }

        private static IChat GetChatById(string chatId)
        {
            if (chats == null)
            {
                lock (_chatLocker)
                {
                    if (chats == null)
                    {
                        chats = new Dictionary<string, IChat>();
//                        skype.
                        foreach (IChat chat in skype.Chats)
                        {
//                            string tChatId = chat.Name.Split(';').Last();chats.Add(tChatId, chat);
                        }
                    }
                }
            }
            IChat toReturn = null;
            chats.TryGetValue(chatId, out toReturn);
            return toReturn;
        }
static void BotOnErrorOccured(Exception ex)
{
            Console.WriteLine(ex.ToString());
}

private static void OnMessageReceived(ChatMessage pMessage, TChatMessageStatus status)
        {
            Console.WriteLine(status + pMessage.Body);

            if (status == TChatMessageStatus.cmsReceived)
            {
                bot.HandleMessage(pMessage.Body, (answer, answerType) => SendMessage(answer, pMessage.Chat), new SkypeData(pMessage));

//                string fromChatId = pMessage.Chat.Name.Split(';').Last();
//                chatSyncer.HandleMessage(pMessage.Body, pMessage.FromDisplayName, fromChatId);
            }
}

private void PrintMouseHover(object sender, EventArgs e)
{
}


    public async Task<bool> ContainerButton(object sender)//, string tbUrl, string sender)
    {
      await Task.Run(() => ContainerButton_Click(sender));
      return true;
    }
   private void KruzkaMouseDown3(object sender, MouseEventArgs e)
        { }

    private void KruzkaMouseHover(object sender, EventArgs e)
    {
      //          e.
      //      ContainerButton_Click(sender);
      KruzhkaButton kr = (KruzhkaButton)sender;
            //      MessageBox.Show(kr.KruzhkaId.Director);

            //      Message.Create()
            /*
                  List<String> names = new List<String>();
                  names.Add("Bruce");
                  names.Add("Alfred");
                  names.Add("Tim");
                  names.Add("Richard");
                  ToolTip tt = new ToolTip();
                  tt.SetToolTip(kr, "My button1");
            */
/*
            MenuItem menuItem1 = new MenuItem("&Copy");
            MenuItem menuItem2 = new MenuItem("&Find and Replace");
            if (e.Button == MouseButtons.Right)
            {
                MenuItem menuItem3 = new MenuItem("C&hange Picture");
                ContextMenu contextMenu1 = ((KruzhkaButton)sender).ContextMenu;
                // Clear all previously added MenuItems.
                contextMenu1.MenuItems.Clear();
                contextMenu1.MenuItems.Add(menuItem1);
                contextMenu1.MenuItems.Add(menuItem2);
            }
*/
            //      Hint
            //      Show.Text("");
        }
    private void KruzkaMouseDown(object sender, EventArgs e)
    {
            /*
        int rowIndex dgv.HitTest(e.X, e.Y).RowIndex;
        if (rowIndex == -1) return;
        if (e.Button == MouseButtons.Right){dgv.ClearSelection();dgv.Rows[rowIndex].Selected = true;dgv.CurrentCell = dgv[0, rowIndex];}
            */
            /*
                        menuTreeView = new TreeView();menuTreeView.Size = new Size(200, 200);
                        // Create the root node.
                        TreeNode docNode = new TreeNode("Documents");
                        // Add some additional nodes.
                        docNode.Nodes.Add("phoneList.doc");docNode.Nodes.Add("resume.doc");
                        // Add the root nodes to the TreeView.
                        menuTreeView.Nodes.Add(docNode);
                        // Create the ContextMenuStrip.
                        docMenu = new ContextMenuStrip();
                        //Create some menu items.
                        ToolStripMenuItem openLabel = new ToolStripMenuItem();openLabel.Text = "Open";
                        ToolStripMenuItem deleteLabel = new ToolStripMenuItem();deleteLabel.Text = "Delete";
                        ToolStripMenuItem renameLabel = new ToolStripMenuItem();renameLabel.Text = "Rename";
                        //Add the menu items to the menu.
                        docMenu.Items.AddRange(new ToolStripMenuItem[]{openLabel,deleteLabel, renameLabel});
                        // Set the ContextMenuStrip property to the ContextMenuStrip.
                        docNode.ContextMenuStrip = docMenu;
                        // Add the TreeView to the form.
                        this.Controls.Add(menuTreeView);
            */
            //            MenuItem menuItem2 = new MenuItem("&Ведение ключей");
            KruzhkaButton kr = (KruzhkaButton)sender;

//            if (e.== MouseButtons.Right)
//            {
//            MenuItem menuItem3 = new MenuItem("C&hange Picture");
//            ContextMenu contextMenu1=null;
            if (((KruzhkaButton)sender).ContextMenu == null)
            {
                kr.ContextMenu = new ContextMenu();
//                kr.ContextMenu.MenuItems.Add(new MenuItem("&Акт признания"));
                MenuItem menuItem1 = new MenuItem("&Акт признания");
//                menuItem1.Select += new EventHandler(OpenKruzhkaDoc);
								menuItem1.Click += new EventHandler(OpenKruzhkaDoc);
				//	menuItem1.RadioCheck = true;
				//	menuItem1.Checked = true;
				//	menuItem1.Text = "Показать акт признания ключа";
								kr.ContextMenu.MenuItems.Add(menuItem1);
                MenuItem menuItem2 = new MenuItem("&Ведение ключей");
								menuItem2.Click += new EventHandler(AccessDB);
								kr.ContextMenu.MenuItems.Add(menuItem2);

//              kr.ContextMenu.MenuItems.Add(menuItem1);
//              MenuItem menuItem3 = new MenuItem("&Ведение ключей");
//              menuItem3.Click += new EventHandler(AccessDB);
//              kr.ContextMenu.MenuItems.Add(menuItem3);

        //                kr.ContextMenu.MenuItems.Add(new MenuItem("C&hange Picture"));
      }
      //            contextMenu1 = ((KruzhkaButton)sender).ContextMenu;
      //            ContextMenu contextMenu1 = ((KruzhkaButton)sender).ContextMenu;
      // Clear all previously added MenuItems.
      //                contextMenu1.MenuItems.Clear();
      /*
                      if (contextMenu1.SourceControl == textBox1)contextMenu1.MenuItems.Add(menuItem1);contextMenu1.MenuItems.Add(menuItem2);}
                      else if (contextMenu1.SourceControl == pictureBox1){contextMenu1.MenuItems.Add(menuItem3);}
      */
      //        }
    }
		private void AccessDB(object sender, EventArgs e)
		{
			MenuItem menuItem1 = (MenuItem)sender;
			ContextMenu mm = (ContextMenu)menuItem1.Parent;
			KruzhkaButton kr = (KruzhkaButton)mm.SourceControl;
			string dbdPath = null;
			oleDbConnection1=new OleDbConnection();
			oleDbCommand1=new OleDbCommand();
			string txtConnectString = null;
			txtConnectString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=NorthWind.mdb";
			oleDbConnection1.ConnectionString = txtConnectString;
			string txtCommandText = "select * from Kruzhka";
			oleDbCommand1.Connection = oleDbConnection1;
			oleDbCommand1.CommandText = txtCommandText;
			using (OleDbDataAdapter da = new OleDbDataAdapter(oleDbCommand1))
			{
				DataTable KruzhkaDt = new DataTable();
				da.Fill(KruzhkaDt);
				dgDetail.DataSource = KruzhkaDt;
			}
      txtCommandText = "select * from Person";
      oleDbCommand1.CommandText = txtCommandText;
      using (OleDbDataAdapter da2 = new OleDbDataAdapter(oleDbCommand1))
      {
        DataTable PersonDt = new DataTable();
        da2.Fill(PersonDt);
        PersonDetail.DataSource = PersonDt;
      }
      //			KruzhkaButton kr = (KruzhkaButton)sender;
    }
    private void OpenKruzhkaDoc(object sender, EventArgs e)
    {
			MenuItem menuItem1 = (MenuItem)sender;
			ContextMenu mm = (ContextMenu)menuItem1.Parent;
			KruzhkaButton kr = (KruzhkaButton)mm.SourceControl;

//			Word.Document doc = null;
//			Word.Paragraphs paragraphs = null;
			string wordPath = null;
			wordPath = "C:\\Kruzhka\\Флэшка 26.02.2015\\16.06.2015\\Шаблон.dotm";
      Word.Document doc;
      Word.Application wordapp;
      //			KruzhkaButton kr = (KruzhkaButton)sender;
      if (dgDetail!=null)
			{
        DataTable KruzhkaDt = (DataTable)dgDetail.DataSource;
        if (KruzhkaDt!= null && KruzhkaDt.Rows.Count != 0)
        {
          DataSet ds = KruzhkaDt.DataSet;
//        DataTableCollection dc = ds.Tables;
          string expression;
          expression = "LastName = " + "'"+kr.Text+"'";
          /*
          private void GetRowsByFilter()
          {
              DataTable table = DataSet1.Tables["Orders"];
              // Presuming the DataTable has a column named Date.
              string expression;
              expression = "Date > #1/1/00#";
              DataRow[] foundRows;

              // Use the Select method to find all rows matching the filter.
              foundRows = table.Select(expression);

              // Print column 0 of each returned row.
              for(int i = 0; i < foundRows.Length; i ++)
              {
                  Console.WriteLine(foundRows[i][0]);
              }
          }
          */
          DataRow[] foundRows=KruzhkaDt.Select(expression);
          if (foundRows.Length > 0)
          {
            wordapp = new Word.Application();
            wordapp.Visible = true;
            DataRow dr=foundRows[0];
            doc = wordapp.Documents.Open(wordPath);
            //            doc.FormFields["OrgName"].Result = foundRows[0];.. (2);// Field("FirstName"));
            DataColumn cc = new DataColumn("FirstName");
//            string sssss = (string)dr.ItemArray[3];
            string sssss2 = (string)dr["LastName"];
            //            string  sssss = (string)foundRows.GetValue(0,3);// "FirstName"];
            //            string ssssss = (string)foundRows(0, 4);// "FirstName"];
            //            northwindDataSet.PersonDataTable
            //            this.northwindDataSet = new CSTabbedWebBrowser.northwindDataSet();

            //            DataTable KruzhkaDt2 = (DataTable)DataSet1.PersonDataTable;
            //            DataSet ds2 = KruzhkaDt2.DataSet;
            //            DataSet1.PersonDataTable
            //            personTableAdapter

            if (dr["FirstName"].ToString().Length != 0)
            {
              doc.FormFields["OrgName"].Result = (string)dr["FirstName"];
            }

            if (dr["UrAddress"].ToString().Length!=0)
            {
                doc.FormFields["UrAddress"].Result = (string)dr["UrAddress"];
            }
            if (dr["FactEddress"].ToString().Length != 0)
            {
              doc.FormFields["FactEddress"].Result = (string)dr["FactEddress"];
            }
            if (dr["Telefon"].ToString().Length != 0)
            {
              doc.FormFields["Telefon"].Result = (string)dr["Telefon"];
            }
            if (dr["Fax"].ToString().Length != 0)
            {
              doc.FormFields["Fax"].Result = (string)dr["Fax"];
            }

            if (PersonDetail != null)
            {
              DataTable PersonDt = (DataTable)PersonDetail.DataSource;
              DataSet pds = PersonDt.DataSet;
              if (PersonDt.Rows.Count != 0)
              {
                string PExpression = "Код = " + (Int32)dr["Director"];
                DataRow[] foundDirs = PersonDt.Select(PExpression);
                if (foundDirs.Length > 0)
                {
                  DataRow fdr = foundDirs[0];
                  //                doc.FormFields["Director"].Result = (Int32)dr["Director"];
                  object ppp = fdr["passport"];
                  if (ppp != null)
                  {
                    doc.FormFields["Position"].Result = (string)fdr["Position"];
                  }
                  object ooo = fdr["passport"];
                  if (ooo != null)
                  {
                    doc.FormFields["PassPlace"].Result = (string)ooo;// fdr["passport"];
                  }
                  object ppp2 = fdr["FullName"];
                  if (ppp2 != null)
                  {
                    doc.FormFields["FullName"].Result = (string)fdr["FullName"];
                    doc.FormFields["KeyName"].Result = (string)ppp2.ToString();
                  }
                  if (fdr["ShortName"].ToString().Length != 0)
                  {
                    doc.FormFields["FamilySign"].Result = (string)fdr["ShortName"];
                  }
                }
              }
            }
            doc.FormFields["StartDate"].Result = "15-07-15 09:28:19";
            doc.FormFields["EndDate"].Result = "15-07-16 09:28:19";
//            doc.FormFields["PassDate"].Result = "sdaf 123";
          }
        }
      }
		}
		private void KruzkaMouseWheel(object sender, System.Windows.Forms.MouseEventArgs e)
    {

    }

    private void Bark_Click(object sender, EventArgs e)
        {
          ContainerButton_Click(sender);
        }
        private void Info_Click(object sender, EventArgs e){ContainerButton_Click(sender);}
    private void Ocherk_Click(object sender, EventArgs e)
    {
      ContainerButton_Click(sender);
    }
    public static void ContainerButton_Click2(object data)// object sender)
    {
      //      MainForm.ContainerButton_Click(sender);
      Thread.Sleep(5000);
    }

    public static async Task<bool> DoWorkAsycNewTab(TabbedWebBrowserContainer wc)//, string tbUrl, string sender)
    {
      // use await here, like so:
      //      return await Task.Run(() => ProcessJob());
      //      uc.NewTab("about:blank");
//      await Task.Run(() => webBrowserContainer.NewTab("about:blank"));
      await Task.Run(() => wc.NewTab("about:blank"));
      return true;
    }
    public async Task<bool> DoWorkAsyc(TabbedWebBrowserContainer uc, string tbUrl, string sender)
    {
      // use await here, like so:
      //      return await Task.Run(() => ProcessJob());
      //      uc.NewTab("about:blank");
      WebBrowserTabPage at = uc.ActiveTab;
      if (at != null)
      {
        //      await Task.Run(() => uc.ActiveTab.WebBrowser.Navigate(tbUrl));
        await Task.Run(() => at.WebBrowser.Navigate(tbUrl));
      }
      return true;
    }

    /*
class StartNewDemo
  {
    static void Main()
    {
      Action<object> action = (object obj) =>{Console.WriteLine("Task={0}, obj={1}, Thread={2}",Task.CurrentId, obj.ToString(),Thread.CurrentThread.ManagedThreadId);};
      // Construct an unstarted task
      Task t1 = new Task(action, "alpha");
      // Cosntruct a started task
      Task t2 = Task.Factory.StartNew(action, "beta");
      // Block the main thread to demonstate that t2 is executing
      t2.Wait();
      // Launch t1 
      t1.Start();
      Console.WriteLine("t1 has been launched. (Main Thread={0})",Thread.CurrentThread.ManagedThreadId);
      // Wait for the task to finish.
      // You may optionally provide a timeout interval or a cancellation token
      // to mitigate situations when the task takes too long to finish.
      t1.Wait();
      // Construct an unstarted task
      Task t3 = new Task(action, "gamma");
      // Run it synchronously
      t3.RunSynchronously();
      // Although the task was run synchronously, it is a good practice
      // to wait for it in the event exceptions were thrown by the task.
      t3.Wait();
    }
  }
*/
    public static async Task<bool> DoWorkAsyc()
    {
      // use await here, like so:
      bool x=await Task.Run(() => ProcessJob());
      return x;
//      return await Task.Run(ProcessJob());
      //      return ProcessJob();
    }
    private static bool ProcessJob()
    {
      //long running work code goes here
      Thread.Sleep(5000);
      return true;
    }

    public Thread runBrowserThread2(WebBrowserTabPage webPage, string url, string sender)
    {
//      new Thread()
      var th = new Thread(() =>
      {
        //        Task<bool> result2 = DoWorkAsyc(webBrowserContainer, tbUrl.Text, sender.ToString());
        //        webBrowserContainer.Navigate2(url, sender);
        webPage.WebBrowser.DocumentCompleted += browser_DocumentCompleted2; //br.Navigate(url);
        webPage.WebBrowser.Navigate(url);
//        webPage.WebBrowser.
//        WebBrowserDocumentCompletedEventArgs
//        System.Windows.Forms.Application.Run();
      });
      th.SetApartmentState(ApartmentState.STA);
      th.Start();
      return th;
    }
    void browser_DocumentCompleted2(object sender, WebBrowserDocumentCompletedEventArgs e)
    {
      var br = sender as WebBrowser;
      if (br.Url == e.Url)
      {
//        br.DocumentCompleted
//        Thread.Sleep(2500);
        //        br.lo
        //        Console.WriteLine("Natigated to {0}", e.Url);
        //        br.e
        //        System.Windows.Forms.Application.ExitThread();   // Stops the thread
      }
    }
//   [STAThread]
    public bool ContainerButton_Click(object sender)
    {
      currentButton = ((Button)sender).Text;
//      UserControl uc = (UserControl)webBrowserContainer;
      bool yy = false;
      for (int i = 0; i < webBrowserContainer.tabControl.TabCount; i++)
      {
        if (webBrowserContainer.tabControl.TabPages[i].Text == ((Button)sender).Text){yy = true; break;}
      }
      if (!yy)
      {
        webBrowserContainer.NewTab("about:blank");
        WebBrowserTabPage webPage = webBrowserContainer.ActiveTab;
//        webBrowserContainer.Navigate2(tbUrl.Text, sender.ToString());
        Thread th=runBrowserThread2(webPage, tbUrl.Text, sender.ToString());
//        Thread th = new Thread(() => {/*webPage.WebBrowser.DocumentCompleted += browser_DocumentCompleted2;*/webPage.WebBrowser.Navigate(tbUrl.Text);});
//        th.SetApartmentState(ApartmentState.STA);
//        th.SetApartmentState(ApartmentState.MTA);
//        th.Start();
//        webPage.WebBrowser.DocumentCompleted
//        Thread.Yield();
/*
        try
        {
          // This causes an exception since newThread is sleeping.
          th.SetApartmentState(ApartmentState.STA);
        }
        catch (ThreadStateException st)
        {
          Console.WriteLine("\n{0} caught:\n" +"Thread is not in the Unstarted or Running state.", st.GetType().Name);
          Console.WriteLine("ThreadState: {0}, ApartmentState: {1}", th.ThreadState, th.GetApartmentState());
        }
*/
        Console.WriteLine("Состояние потока: {0}, ApartmentState: {1}, WebBrowserStatus {2}", th.ThreadState, th.GetApartmentState(), webPage.WebBrowser.StatusText.ToString());
        th.Join();
//        webPage.WebBrowser.NewWindow3
/*
        Thread t = new Thread(ThreadProc);
        Console.WriteLine("Before setting apartment state: {0}",t.GetApartmentState());
        t.SetApartmentState(ApartmentState.STA);
        Console.WriteLine("After setting apartment state: {0}",t.GetApartmentState());
        bool result = t.TrySetApartmentState(ApartmentState.MTA);
        Console.WriteLine("Try to change state: {0}", result);
        t.Start();
        Thread.Sleep(500);
        try
        {
          t.TrySetApartmentState(ApartmentState.STA);
        }
        catch (ThreadStateException)
        {
          Console.WriteLine("ThreadStateException occurs " +"if apartment state is set after starting thread.");
        }

        t.Join();
      }
*/
      int bbb = 123;
        /*
                webBrowserContainer.NewTab("about:blank");
        //        webBrowserContainer.s
                Task<bool>result = DoWorkAsyc();
                result.Wait();
        //        result.Wait()
                //        Task<bool> res = DoWorkAsycNewTab(webBrowserContainer);res.Wait();
                //        webBrowserContainer.NewTab(tbUrl.Text);
                Task<bool> result2 = DoWorkAsyc(webBrowserContainer,tbUrl.Text, sender.ToString());
                //        Task<bool> result = DoWorkAsyc();
        //        result2.Wait();
                result2.Wait(5000);
        */
//        webBrowserContainer.Navigate2(tbUrl.Text, sender.ToString());

        //        webBrowserContainer.ActiveTab.WebBrowser.Navigate(tbUrl.Text);
        //        Thread newThread = new Thread(webBrowserContainer.ActiveTab.WebBrowser.NavigateThread);
        //        newThread.Name = "Загрузка Dbo";
        //        newThread.Start(tbUrl.Text);
        webBrowserContainer.ActiveTab.Text = sender.ToString();
        webBrowserContainer.ActiveTab.Text = ((Button)sender).Text;
        webBrowserContainer.ActiveTab.ToolTipText = ((Button)sender).AccessibleDescription;
        webBrowserContainer.ActiveTab.tabPageKruzhka = (KruzhkaButton)sender;
        webBrowserContainer.ActiveTab.ToolTipText = webBrowserContainer.ActiveTab.tabPageKruzhka.KruzhkaId.IdName + "\t" + webBrowserContainer.ActiveTab.tabPageKruzhka.KruzhkaId.Passwd;
//        Console.WriteLine("Состояние потока: {0}, ApartmentState: {1}", th.ThreadState, th.GetApartmentState());

        return true;
      }
      return false;
    }
    public void ContainerButton_Click3(object sender)
    {
      currentButton = "dsfdf";// ((Button)sender[0]).Text;
//      UserControl uc = (UserControl)webBrowserContainer;
      CSTabbedWebBrowser.TabbedWebBrowserContainer webBrowserContainer2 = (CSTabbedWebBrowser.TabbedWebBrowserContainer)sender;
      bool yy = false;
          for (int i = 0; i < webBrowserContainer2.tabControl.TabCount; i++)
          {
            if (webBrowserContainer2.tabControl.TabPages[i].Text == currentButton)//((Button)sender[0]).Text)
            {
              yy = true; break;
            }
          }
          if (!yy)
          {
            webBrowserContainer2.NewTab("about:blank");
            webBrowserContainer2.Navigate(tbUrl.Text);//Navigate2(tbUrl.Text, sender.ToString());
            webBrowserContainer2.ActiveTab.Text = currentButton;//((Button)sender[0]).Text;
            webBrowserContainer2.ActiveTab.tabPageKruzhka = (KruzhkaButton)sender;
            webBrowserContainer2.ActiveTab.ToolTipText = webBrowserContainer2.ActiveTab.tabPageKruzhka.KruzhkaId.KruzhkaID + "\t" + webBrowserContainer2.ActiveTab.tabPageKruzhka.KruzhkaId.Passwd;
//            webBrowserContainer2.ActiveTab.ToolTipText = ((Button)sender[0]).AccessibleDescription;
//            delay(100);
          }
    }
    private void Ajaks_Click(object sender, EventArgs e)
    {
      ContainerButton_Click(sender);
/*
      object[] oS = new object[2];
      oS[0] = sender;
      oS[1] = webBrowserContainer;

      Thread newThread = new Thread(ContainerButton_Click3);
      newThread.Name="Загрузка Dbo";
      newThread.Start(webBrowserContainer);
*/
//      newThread.s
//      MainForm w = new MainForm();
//      newThread = new Thread(w.DoMoreWork);
//      Vost_Click(sender, e);
      //      Thread.Sleep(2000);
      //          Vost_Click(sender, e);
    }
    public void DoMoreWork(object data)
    {
      Console.WriteLine("Instance thread procedure. Data='{0}'",data);
      Thread.Sleep(2000);
    }
    private void Factor_Click(object sender, EventArgs e)
    {
          ContainerButton_Click(sender);
    }
    private void Vost2_Click(object sender, EventArgs e)
    {

        HtmlDocument hDoc = webBrowserContainer.ActiveTab.WebBrowser.Document;
//      HtmlElement butNex = hDoc.GetElementById("nex");
//      hDoc.InvokeScript("p_s");int a = 0;if(a==0)return;
      mshtml.HTMLDocument hDocDom = (mshtml.HTMLDocument)hDoc.DomDocument;
      IHTMLDocument2 currentDoc = (IHTMLDocument2)hDoc.DomDocument;
      mshtml.IHTMLElementCollection scr = hDocDom.scripts;
//      int bnbnb = 0;
//      object ActiveXObject = null;
      //function a_l(w){a_mw=w;a_d=w.document;a_da=a_d.all;w.Top=top.Top;}
      //var oTools=new ActiveXObject('bssax.AXTools');
//      ActiveXObject
/*
      foreach (HTMLScriptElement ii in scr)
      {
        bnbnb++;
        if(ii.src == "../js/loader.js")
        {
          ii.setExpression("a_da.L.value", "3312800687");
          IHTMLElementCollection dddd=ii.getElementsByTagName("function");
          int df = dddd.length;
          mshtmlScriptElement script;
          // create the script element
          string SCRIPT_TAG = "SCRIPT";
          script = (mshtmlScriptElement)hDocDom.createElement(SCRIPT_TAG);
          script.src = ii.src; script.defer = true;
          hDocDom.appendChild((mshtmlDomNode)script);
          //< BUTTON onclick = top.p_s() id = nex class=stdBtn>Далее</BUTTON>
        }

      }
*/
      mshtml.IHTMLElementCollection hDocDomColl = hDocDom.all;
      int l=hDocDomColl.length;
      int bbb = 0;

      foreach (IHTMLElement item in hDocDomColl)
      {
        if (item.id == "L")
        {
          item.click();
          string itemStr = item.ToString(); object df = item.getAttribute("innerText"); item.setAttribute("innnerText", "3312800687");
        }
        if (item.id == "lg"){item.click();Type tt = item.GetType();}
        if (item.id == "fUnsafe")
        {
          item.click();
          object[] oS = new object[1];
          //oS[0] = hDocDom.lastChild.lastChild
          oS[0] = item;
//          hDoc.InvokeScript("changeSafe", oS);


          //          createChBox(hDoc);
          HtmlElement log = hDoc.GetElementById("L");
          if (log != null)
          {
            mshtml.HTMLInputElement domEl = (mshtml.HTMLInputElement)log.DomElement;// domEl.@checked = true;
            string vv = domEl.value;
            domEl.focus();
            domEl.click();
            //      mshtml.HTMLDocument dDom = (mshtml.HTMLDocument)hDoc.DomDocument;
            domEl.value = "3312800687";
            domEl.disabled = false;
          }
        }
        if (item.id == "FS")
        {
          var j = 0;
//          fl = top.frames(3).window; fld = fl.document.all; fl.da = fld;

          object[] oS = new object[2];
          /*
                    HtmlElement log = hDoc.GetElementById("L");
                    if (log != null)
                    {
                      //          item.

                      mshtml.HTMLInputElement domEl = (mshtml.HTMLInputElement)log.DomElement;// domEl.@checked = true;
                      string vv = domEl.value;
                      //domEl.innerHTML = "<INPUT class=\"ldInp\" onkeypress=\"top.a_k(window,event)\" TYPE=\"text\" ID=\"L\" VALUE=\"\" MAXLENGTH=\"10\" DISABLED=\"false\"/>";
                      string a = "<INPUT class=\"ldInp\" onkeypress=\"top.a_k(window,event)\" TYPE=\"text\" ID=\"L\" VALUE=\"\" MAXLENGTH=\"10\" DISABLED=\"false\"/>";
                      //            domEl.innerHTML = a;
                      domEl.status = true;
                      domEl.focus();
                      domEl.click();
                      domEl.readOnly = false;
                      domEl.type = "text";
                      domEl.innerText = a;
                      domEl.value = "3312800687"; domEl.disabled = false;
                    }
          */
//          object[] oS = new object[2];
          item.click();
          oS[0] = hDoc.Window;
          oS[1] = 1;
          hDoc.InvokeScript("SF", oS);

          //          ii.setExpression("a_da.L.value", "3312800687");IHTMLElementCollection dddd = ii.getElementsByTagName("function");
          //          mshtmlScriptElement script;
          //          string SCRIPT_TAG = "SCRIPT";
          //          script = (mshtmlScriptElement)hDocDom.createElement(SCRIPT_TAG);
          //          script.src = ii.src; script.defer = true;
          //          hDocDom.appendChild((mshtmlDomNode)script);
          //          object[] oS2 = new object[2];
          //          oS[0] = hDoc.Window;
          //          oS[1] = 1;
          //< BUTTON onclick = top.p_s() id = nex class=stdBtn>Далее</BUTTON>
        }
        bbb++;
      }
    }
    //    private HtmlElement createLoginInput2(HtmlDocument hDoc)
    [STAThread]
    public async void PwdClick(string id, string pwd)
    {
      HtmlDocument hDoc = webBrowserContainer.ActiveTab.WebBrowser.Document;
      if (!IsCreatedId(hDoc, "InjectIdPwd")) InjectIdPwd(hDoc, id, pwd);
      InvokeFunctionUnsafe(hDoc);
      string result = await WaitAsynchronouslyAsync3();
      HtmlElement butNex = hDoc.GetElementById("nex");
      hDoc.InvokeScript("p_s");//, oS);
//      WriteFrames2(hDoc);
    }

    private void WriteFrame2(StreamWriter sw, HtmlWindow frame)
    {
      if (frame.Document.All.Count > 0)
      {
        HtmlDocument frDoc = frame.Document;
        HtmlElementCollection frColl = frDoc.All;
        sw.WriteLine("Документ " + "===============================================================================");
        sw.WriteLine("Документ " + "===============================================================================\n");
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
        }
      }
      sw.WriteLine("Конец документа " + "===============================================================================");
      sw.WriteLine("Конец документа " + "===============================================================================\n");
    }

    private void WriteFrames2(HtmlDocument hDoc)
    {
      string path = @"..\Frames2.txt";
      StreamWriter sw;
      if (!System.IO.File.Exists(path))
      {
        using (sw = System.IO.File.CreateText(path))
        {
          sw.WriteLine("Hello"); sw.WriteLine("And"); sw.WriteLine("Welcome");
        }
      }
      if (hDoc.Window.Frames.Count > 0)
      {
        HtmlWindowCollection wc = hDoc.Window.Frames;
        foreach (HtmlWindow frame in wc)
        {
          using (sw = System.IO.File.AppendText(path))
          {
            sw.WriteLine("Имя фрэйма " + frame.Name.ToString());
            sw.WriteLine("Интернет ссылка фрэйма " + frame.Url.ToString());

            if (frame.Name.ToString() == "RT_IC_TOOLBAR"){WriteFrame2(sw, frame);}
            if (frame.Name.ToString() == "RT_IC_NVGT"){WriteFrame2(sw, frame);}
            if (frame.Name.ToString() == "RT_IC_MAINW"){WriteFrame2(sw, frame);}
            if (frame.Name.ToString() == "RT_IC_HLP"){WriteFrame2(sw, frame);}
          }
        }
      }
    }
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
    public static void InjectScript(HtmlDocument hDoc)
    {
      
      string scriptSrc= "a_da.L.value=3312800687,a_da.P.value=9104406188";
      string id = "bebebe";// + HUtils.RandString(10);
      HtmlElement script = hDoc.CreateElement("script");
      script.SetAttribute("type", "text/javascript");
      script.SetAttribute("id", id);
      hDoc.Body.AppendChild(script);
      object oScript = hDoc.DomDocument.GetType().GetMethod("getElementById").Invoke(hDoc.DomDocument, new object[] { id });
      oScript.GetType().GetProperty("text").SetValue(oScript, scriptSrc, null);
      hDoc.InvokeScript("bebebe");
    }

    private void createLoginInput2(HtmlDocument hDoc)
    {
      mshtml.HTMLDocument hDocDom = (mshtml.HTMLDocument)hDoc.DomDocument;
      mshtmlDomNode inp = (mshtmlDomNode)hDocDom.createTextNode("<INPUT class=\"ldInp\" onkeypress=\"top.a_k(window,event)\" TYPE=\"text\" ID=\"L\" VALUE=\"\" MAXLENGTH=\"10\" DISABLED=\"false\"/>");
      bool ch = inp.hasChildNodes();
      int nt = inp.nodeType;
      string ss=inp.ToString();
      mshtmlDomNode node = (mshtmlDomNode)hDocDom.documentElement;
      node.appendChild(inp);
      Type t =inp.GetType();
      ControlStyles s;
      IHTMLDocument2 currentDoc = (IHTMLDocument2)hDoc.DomDocument;
    }
    private HtmlElement createLoginInput(HtmlDocument hDoc)
    {
      HtmlElement nName = hDoc.CreateElement("INPUT");
      nName.SetAttribute("TYPE", "text");
      nName.SetAttribute("ID", "L");
      nName.SetAttribute("class", "\"ldInp\"");
      nName.SetAttribute("DISABLED", "false");
      nName.SetAttribute("VALUE", "\"3312800687\"");
      nName.SetAttribute("MyOwn2", "true");
      nName.Name = "Login";
      nName.Style= "input type=text,class=ldInp,onkeypress=top.a_k(window,event),VALUE=3312800687";
      nName.OuterHtml = "<INPUT class=\"ldInp\" onkeypress=\"top.a_k(window,event)\" TYPE=\"text\" ID=\"L\" VALUE=\"3312800687\" MAXLENGTH=\"10\" DISABLED=\"false\"/>";
      nName.Enabled = true;
      nName = hDoc.Body.InsertAdjacentElement(HtmlElementInsertionOrientation.AfterBegin, nName);
      string out2 = nName.OuterHtml;
      return nName;
    }
    private bool IsCreatedId(HtmlDocument hDoc,string id)
    {
      if (hDoc.GetElementById(id) == null)
      {
        return false;
      }
      else return true;
    }
    private HtmlElement createChBox(HtmlDocument hDoc)
    {
      HtmlElement chBox = hDoc.CreateElement("INPUT");
      chBox.Name = "ADatumWarningDiv";
      chBox.Style = "background-color:black;color:white;font-weight:bold;width:100%;";
      chBox.InnerText = "Hello Workd";
      chBox.SetAttribute("TYPE", "checkbox");
      chBox.SetAttribute("ID", "fUnsafe");
      chBox.SetAttribute("class", "ldWrk");
      chBox.SetAttribute("checked", "true");
      chBox.SetAttribute("MyOwn", "true");
      chBox = hDoc.Body.InsertAdjacentElement(HtmlElementInsertionOrientation.AfterBegin, chBox);
      return chBox;
    }
    private void InvokeFunctionUnsafe(HtmlDocument hDoc)
    {
      mshtml.IHTMLElementCollection hDocDomColl = ((mshtml.HTMLDocument)hDoc.DomDocument).all;
//      ((mshtml.HTMLDocument)hDoc.DomDocument).getElementById("L");
      foreach(IHTMLElement item in hDocDomColl)
      {
        if(item.id == "fUnsafe")
        {
          item.click();object[] oS = new object[1];oS[0] = item;hDoc.InvokeScript("changeSafe",oS);
        }
      }
    }
    public static void InjectScript2(HtmlDocument hDoc)
    {

      string scriptSrc = "FSg=true";
      string id = "bebebe2";// + HUtils.RandString(10);
      HtmlElement script = hDoc.CreateElement("script");
      script.SetAttribute("type", "text/javascript");
      script.SetAttribute("id", id);
      hDoc.Body.AppendChild(script);
      object oScript = hDoc.DomDocument.GetType().GetMethod("getElementById").Invoke(hDoc.DomDocument, new object[] { id });
      oScript.GetType().GetProperty("text").SetValue(oScript, scriptSrc, null);
      hDoc.InvokeScript(id);
    }
    [STAThread]
    public async void Vost_Click(object sender, EventArgs e)
    {
      HtmlDocument hDoc = webBrowserContainer.ActiveTab.WebBrowser.Document;
      if (!IsCreatedId(hDoc, "bebebe")) InjectScript(hDoc);
      InvokeFunctionUnsafe(hDoc);
      //      Vost2_Click(sender, e);//      webBrowserContainer.ActiveTab.WebBrowser.w
      //      object[] oS = new object[2];
      //      item.click();
      //      oS[0] = hDoc.Window;
      //      oS[1] = 1;
      string result = await WaitAsynchronouslyAsync3();
      HtmlElement butNex = hDoc.GetElementById("nex");
      hDoc.InvokeScript("p_s");//, oS);
                               //      InjectScript2(hDoc);
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
*/
        //      hDoc.InvokeScript("anonymous");//, oS);
        /*
              FSg = oMS.Sign('', s); top.hwm();
              if (((!FSg) || (parseInt(oMS.LastErrorCode) > 0)) && (!top.bDemo))
              {
                var s, m = oMS.LastError;
                if (m != '') s = Top.p_L1.replace("[BR]", "\n") + m + ').';
                else
                  s = Top.p_L7
                p_e(s)
        */

        /*
              var tcs = new TaskCompletionSource<object>();
              try
              {
                webBrowserContainer.ActiveTab.WebBrowser.Navigate("auto:blank");
                // await for DocumentCompleted
                await tcs.Task;
              }
              finally { webBrowserContainer.ActiveTab.WebBrowser.DocumentCompleted -= documentCompletedHandler; }
        */

        //      hDoc.InvokeScript("top.p_s");
        //< SCRIPT LANGUAGE = "JavaScript" >
        // w = window; w.d = document; w.Top = w.top; w.WID = 'TOP',w.rso = w.rcnt = w.Rc = w.Oc = top.step = 0;
        //      var sRTSID = "HH5OY";
        //</ SC
        //SendXML('resumerXH', window, 'Login', oX, "t=" + top.LoaderBll + ".Load&Step=2&RTSID=" + top.sRTSID + "&L=" + top.LanguageID);

        //< BUTTON onclick = top.p_s() id = nex class=stdBtn>Далее</BUTTON>

      }
    public async Task<string> WaitAsynchronouslyAsync3()
    {
      HtmlDocument hDoc = webBrowserContainer.ActiveTab.WebBrowser.Document;
      object[] oS = new object[2];
      oS[0] = hDoc.Window;
      oS[1] = 1;
      hDoc.InvokeScript("SF", oS);
      await Task.Delay(10000);
//      Task.w
      return "Finished";
    }
    private void runBrowserThread(Uri url)
    {
      var th = new Thread(() => { var br = new WebBrowser();
        br.DocumentCompleted += browser_DocumentCompleted;br.Navigate(url);
        System.Windows.Forms.Application.Run();});
      th.SetApartmentState(ApartmentState.STA);
      th.Start();
    }
    void browser_DocumentCompleted(object sender, WebBrowserDocumentCompletedEventArgs e)
    {
      var br = sender as WebBrowser;
      if (br.Url == e.Url)
      {
        Console.WriteLine("Natigated to {0}", e.Url);
        System.Windows.Forms.Application.ExitThread();   // Stops the thread
      }
    }
    private async void button1_Click(object sender, EventArgs e)
    {
      // Call the method that runs asynchronously.
      string result = await WaitAsynchronouslyAsync();
      // Call the method that runs synchronously.
      string result2 = await WaitSynchronously ();

      // Display the result.
//      textBox1.Text += result;
    }
/*
    private async Task SumPageSizesAsync()
    {
      // To use the HttpClient type in desktop apps, you must include a using directive and add a 
      // reference for the System.Net.Http namespace.
      HttpClient client = new HttpClient();
      // . . .
      Task<byte[]> getContentsTask = client.GetByteArrayAsync(url);
      byte[] urlContents = await getContentsTask;

      // Equivalently, now that you see how it works, you can write the same thing in a single line.
      //byte[] urlContents = await client.GetByteArrayAsync(url);
      // . . .
    }
*/
    // The following method runs asynchronously. The UI thread is not blocked during the delay. You can move or resize the Form1 window 
    // while Task.Delay is running.
    public async Task<string> WaitAsynchronouslyAsync()
    {
      await Task.Delay(10000);return "Finished";
    }

    // The following method runs synchronously, despite the use of async.
    // You cannot move or resize the Form1 window while Thread.Sleep is running because the UI thread is blocked.
    public async Task<string> WaitSynchronously()
    {
      // Add a using directive for System.Threading.
      Thread.Sleep(10000);return "Finished";
    }
    
/*
    static async Task<object> DoWorkAsync(object[] args)
    {
      Console.WriteLine("Start working.");
      using (var wb = new WebBrowser())
      {
        wb.ScriptErrorsSuppressed = true;
        TaskCompletionSource<bool> tcs = null;
        WebBrowserDocumentCompletedEventHandler documentCompletedHandler = (s, e) => tcs.TrySetResult(true);
        // navigate to each URL in the list
        foreach (var url in args)
        {
          tcs = new TaskCompletionSource<bool>();
          wb.DocumentCompleted += documentCompletedHandler;
          try
          {
            wb.Navigate(url.ToString());
            // await for DocumentCompleted
            await tcs.Task;
          }
          finally{wb.DocumentCompleted -= documentCompletedHandler;}
          // the DOM is ready
          Console.WriteLine(url.ToString());Console.WriteLine(wb.Document.Body.OuterHtml);
        }
      }
      Console.WriteLine("End working.");return null;
    }
*/
     /*
         public static class MessageLoopWorker
         {
           public static async Task<object> Run(Func<object[], Task<object>> worker, params object[] args)
           {
             var tcs = new TaskCompletionSource<object>();
             var thread = new Thread(() =>
             {
               EventHandler idleHandler = null;
               idleHandler = async (s, e) =>
               {
                 // handle Application.Idle just once
                 Application.Idle -= idleHandler;
                 // return to the message loop
                 await Task.Yield();
                 // and continue asynchronously propogate the result or exception
                 try
                 {
                   var result = await worker(args);
                   tcs.SetResult(result);
                 }
                 catch (Exception ex)
                 {
                   tcs.SetException(ex);
                 }

                 // signal to exit the message loop
                 // Application.Run will exit at this point
                 Application.ExitThread();
               };

               // handle Application.Idle just once
               // to make sure we're inside the message loop
               // and SynchronizationContext has been correctly installed
               Application.Idle += idleHandler;
               Application.Run();
             });

             // set STA model for the new thread
             thread.SetApartmentState(ApartmentState.STA);

             // start the thread and await for the task
             thread.Start();
             try
             {
               return await tcs.Task;
             }
             finally
             {
               thread.Join();
             }
           }
         }
     */
  }
}



/*
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ConsoleApplicationWebBrowser
{
    // by Noseratio - http://stackoverflow.com/users/1768303/noseratio
    class Program
    {
        // Entry Point of the console app
        static void Main(string[] args)
        {
            try
            {
                // download each page and dump the content
                var task = MessageLoopWorker.Run(DoWorkAsync,"http://www.example.com", "http://www.example.net", "http://www.example.org");
                task.Wait();
                Console.WriteLine("DoWorkAsync completed.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("DoWorkAsync failed: " + ex.Message);
            }

            Console.WriteLine("Press Enter to exit.");
            Console.ReadLine();
        }
        // navigate WebBrowser to the list of urls in a loop
        static async Task<object> DoWorkAsync(object[] args)
        {
            Console.WriteLine("Start working.");

            using (var wb = new WebBrowser())
            {
                wb.ScriptErrorsSuppressed = true;

                TaskCompletionSource<bool> tcs = null;
                WebBrowserDocumentCompletedEventHandler documentCompletedHandler = (s, e) =>
                    tcs.TrySetResult(true);

                // navigate to each URL in the list
                foreach (var url in args)
                {
                    tcs = new TaskCompletionSource<bool>();
                    wb.DocumentCompleted += documentCompletedHandler;
                    try{                        wb.Navigate(url.ToString());// await for DocumentCompleted
                        await tcs.Task;
                    }
                    finally
                    {
                        wb.DocumentCompleted -= documentCompletedHandler;
                    }
                    // the DOM is ready
                    Console.WriteLine(url.ToString());
                    Console.WriteLine(wb.Document.Body.OuterHtml);
                }
            }

            Console.WriteLine("End working.");
            return null;
        }

    }

    // a helper class to start the message loop and execute an asynchronous task
    public static class MessageLoopWorker
    {
        public static async Task<object> Run(Func<object[], Task<object>> worker, params object[] args)
        {
            var tcs = new TaskCompletionSource<object>();

            var thread = new Thread(() =>
            {
                EventHandler idleHandler = null;

                idleHandler = async (s, e) =>
                {
                    // handle Application.Idle just once
                    Application.Idle -= idleHandler;

                    // return to the message loop
                    await Task.Yield();

                    // and continue asynchronously
                    // propogate the result or exception
                    try
                    {
                        var result = await worker(args);
                        tcs.SetResult(result);
                    }
                    catch (Exception ex)
                    {
                        tcs.SetException(ex);
                    }

                    // signal to exit the message loop
                    // Application.Run will exit at this point
                    Application.ExitThread();
                };

                // handle Application.Idle just once
                // to make sure we're inside the message loop
                // and SynchronizationContext has been correctly installed
                Application.Idle += idleHandler;
                Application.Run();
            });

            // set STA model for the new thread
            thread.SetApartmentState(ApartmentState.STA);

            // start the thread and await for the task
            thread.Start();
            try
            {
                return await tcs.Task;
            }
            finally
            {
                thread.Join();
            }
        }
    }
}
*/

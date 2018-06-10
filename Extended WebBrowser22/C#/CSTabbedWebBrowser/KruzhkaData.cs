using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.OleDb;
using Access = Microsoft.Office.Interop.Access;

namespace CSTabbedWebBrowser
{
	public partial class KruzhkaData : Form
	{
		public KruzhkaData()
		{
			InitializeComponent();
//			this.Parent
		}

		private void KruzhkaData_Load(object sender, EventArgs e)
		{
			LoadData();
    }
		private void LoadData()
		{
			OleDbConnection oleDbConnection1;
			OleDbCommand oleDbCommand1;
			string dbdPath = null;
			oleDbConnection1 = new OleDbConnection();
			oleDbCommand1 = new OleDbCommand();
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

		}

		private void dgDetail_Navigate(object sender, NavigateEventArgs ne)
		{

		}
	}
}

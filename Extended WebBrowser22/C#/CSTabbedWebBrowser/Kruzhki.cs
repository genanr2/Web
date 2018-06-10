using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CSTabbedWebBrowser
{
	public partial class Kruzhki : Form
	{
		public Kruzhki()
		{
			InitializeComponent();
		}

		private void Kruzhki_Load(object sender, EventArgs e)
		{
			// TODO: данная строка кода позволяет загрузить данные в таблицу "northwindDataSet.Kruzhka". При необходимости она может быть перемещена или удалена.
			this.kruzhkaTableAdapter.Fill(this.northwindDataSet.Kruzhka);
			// TODO: данная строка кода позволяет загрузить данные в таблицу "northwindDataSet.Person". При необходимости она может быть перемещена или удалена.
			this.personTableAdapter.Fill(this.northwindDataSet.Person);

		}

		private void personBindingSource_CurrentChanged(object sender, EventArgs e)
		{

		}

		private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
		{

		}
	}
}

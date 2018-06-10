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
  public partial class BankRS : Form
  {
    public BankRS()
    {
      InitializeComponent();
      dataGridView1.RowEnter += MasterControl_SelectionChanged;
//      dataGridView1.SelectionChanged += MasterControl_SelectionChanged;
      //      dataGridView2.SelectionChanged += Firm_SelectionChanged;
//      dataGridView1.SelectionChanged += MasterControl_SelectionChanged;
      dataGridView2.RowEnter += Firm_SelectionChanged;
      dataGridView3.RowEnter += Director_SelectionChanged;
      //      dataGridView2.Changed += Firm_SelectionChanged;
    }

    private void BankRS_Load(object sender, EventArgs e)
    {
      // TODO: данная строка кода позволяет загрузить данные в таблицу "northwindDataSet.Kruzhka". При необходимости она может быть перемещена или удалена.
      this.kruzhkaTableAdapter.Fill(this.northwindDataSet.Kruzhka);
      // TODO: данная строка кода позволяет загрузить данные в таблицу "northwindDataSet.KeyFirms". При необходимости она может быть перемещена или удалена.
      keyFirmsTableAdapter.Fill(northwindDataSet.KeyFirms);
      // TODO: данная строка кода позволяет загрузить данные в таблицу "northwindDataSet.BankRS". При необходимости она может быть перемещена или удалена.
      bankRSTableAdapter.Fill(northwindDataSet.BankRS);
      personTableAdapter1.Fill(northwindDataSet.Person);
      LoginRadio.Focus();
      LoginRadio.Checked = true;
      //      dataGridView1.SelectionChanged
      //      keyFirmsTableAdapter.SelectionChanged += MasterControl_SelectionChanged;// (object sender, EventArgs e)// Handles MyBase.SelectionChanged
    }
    private void Firm_SelectionChanged(object sender2, DataGridViewCellEventArgs e)//EventArgs e)// Handles MyBase.SelectionChanged
    {
      DataGridView sender = (DataGridView)sender2;
      if (FirmRadio.Checked && dataGridView2.RowCount != 0 && sender.CurrentRow != null && sender.CurrentRow.Cells[2].Value != null)
      {
          try
          {
            kruzhkaBindingSource.Filter = string.Format("Код = {0}", sender[2, e.RowIndex].Value);
            ((BindingSource)dataGridView3.DataSource).Filter = "Код = " + (int)((DataRowView)kruzhkaBindingSource.Current).DataView[0].Row["Director"];
          }catch (Exception){return;}
          try
          {
              ((BindingSource)dataGridView1.DataSource).Filter = "Firms = " + sender[3, e.RowIndex].Value;
          }
          catch (Exception){((BindingSource)dataGridView3.DataSource).RemoveFilter();}
      }
      else if (LoginRadio.Checked && !FirmRadio.Checked && dataGridView2.RowCount != 0 && dataGridView2.CurrentRow !=null)
      {
        try
        {
          kruzhkaBindingSource.Filter = string.Format("Код = {0}", sender[2,e.RowIndex].Value);
          ((BindingSource)dataGridView3.DataSource).Filter = "Код = " + (int)((DataRowView)kruzhkaBindingSource.Current).DataView[0].Row["Director"];
        }catch (Exception){}
      }
      else if (DiretorRadio.Checked && dataGridView2.RowCount != 0 && dataGridView2.CurrentRow != null)
      {
        try{bankRSBindingSource.Filter = string.Format("Firms = {0}", sender[3, e.RowIndex].Value);}catch (Exception) { }
      }
    }
    private void MasterControl_SelectionChanged(object sender2, DataGridViewCellEventArgs e)
    {
      DataGridView sender = (DataGridView)sender2;
      if (LoginRadio.Checked && sender.RowCount != 0 && dataGridView1.CurrentRow!=null)
        try
        {
          keyFirmsBindingSource.Filter = string.Format("Key = {0}", sender[3,e.RowIndex].Value);
          kruzhkaBindingSource.Filter = "Код = " + (int)((DataRowView)keyFirmsBindingSource.Current).DataView[0].Row["Firm"];
          ((BindingSource)dataGridView3.DataSource).Filter = "Код = " + (int)((DataRowView)kruzhkaBindingSource.Current).DataView[0].Row["Director"];
        }catch (Exception ee){ }
    }

    private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
    {
      DataGridView dgv = (DataGridView)sender;
      BindingSource ooo1 = (BindingSource)dataGridView2.DataSource;
//      BindingSource ooo = (BindingSource)dataGridView3.DataSource;
//      ooo.Filter = "Код = 1";

//      ooo1.Filter=
//      ((DataSource)dataGridView3.DataSource).RowFilter = "";

      //      dv.RowFilter = "Col < 3";
      //      Console.WriteLine("Print sorted and Filtered DataView by RowFilter. RowFilter = 'Col > 3'");
      //      PrintDataView(dv);
      // Removing Sort and RpwFilter to ilustrate RowStateFilter. DataView should contain all 10 rows back in the original order
      //      dv.Sort = String.Empty;
      //      dv.RowFilter = String.Empty;

      //      northwindDataSet.Person.DataSet.t
      //      this.personTableAdapter1.Adapter.r

      //      ((DataView)cGrid.DataSource).RowFilter = eFilter2;
    }
    private void Director_SelectionChanged(object sender2, DataGridViewCellEventArgs e)
    {
      DataGridView sender = (DataGridView)sender2;
      if (DiretorRadio.Checked && sender.RowCount != 0 && sender.CurrentRow != null && sender[3, e.RowIndex].Value != null)
      {
        try
        {
          kruzhkaBindingSource.Filter = string.Format("Director = {0}", sender[0, e.RowIndex].Value);
          int cccc = kruzhkaBindingSource.Count;
          string s=null;
          try
          {
            s = string.Format("Firm = {0}", (int)((DataRowView)kruzhkaBindingSource.Current).DataView[0].Row["Код"]);
          }
          catch (Exception ex22) {}

          for (int i = 1; i < kruzhkaBindingSource.Count; i++)
          {
            s += " or Firm ="+(int)((DataRowView)kruzhkaBindingSource.Current).DataView[i].Row["Код"];
          }
          keyFirmsBindingSource.Filter = s;
          System.Collections.IList lll=keyFirmsBindingSource.List;
          try
          {
            bankRSBindingSource.Filter = string.Format("Firms = {0}", ((DataRowView)keyFirmsBindingSource.Current).DataView[0].Row["Key"]);
          }
          catch (Exception ex2) { return; }
        }
        catch (Exception ex1){return;}
        int ccc = bindingSource1.Count;
        if (bindingSource1.Count > 0)
        {
          DataRowView ff = ((DataRowView)bindingSource1.Current);//.Field("Director");
          DataRow fff = (DataRow)ff.Row;//.Field("Director");
          int ddd = 0;
          try
          {
//                ddd = (Int32)fff["Director"];
//                ((BindingSource)dataGridView3.DataSource).Filter = "Код = " + ddd;// eFilter2;
          }
          catch (Exception ee)
          {
//          ((BindingSource)dataGridView3.DataSource).RemoveFilter();
          }
        }
      }
    }
    private void LoginRadio_CheckedChanged(object sender, EventArgs e)
    {
      FirmRadio.Checked = false;
      DiretorRadio.Checked = false;
      ((BindingSource)dataGridView1.DataSource).RemoveFilter();
    }
    private void FirmRadio_CheckedChanged(object sender, EventArgs e)
    {
      LoginRadio.Checked = false;
      DiretorRadio.Checked = false;
      ((BindingSource)dataGridView2.DataSource).RemoveFilter();
//      ((BindingSource)dataGridView3.DataSource).RemoveFilter();
    }
    private void DiretorRadio_CheckedChanged(object sender, EventArgs e)
    {
//      ((BindingSource)dataGridView1.DataSource).Filter;
//      ((BindingSource)dataGridView2.DataSource).Filter;
      ((BindingSource)dataGridView3.DataSource).RemoveFilter();
      LoginRadio.Checked = false;
      FirmRadio.Checked = false;
    }
  }
}


/*
using System;
using System.Data;
using System.Windows.Forms;

public class Form1 : Form {
   protected TextBox Text1;
   protected DataSet DataSet1;

   public static void Main() {
      DemostrateDataView();
   }

   private static void DemostrateDataView() {
      // Create a DataTable with one column
      DataTable dt = new DataTable("MyTable");DataColumn column = new DataColumn("Col", typeof(int));
      dt.Columns.Add(column); 
      // Add 5 rows on Added state
      for (int i = 0; i < 5; i++) {DataRow row = dt.NewRow();row["Col"] = i;dt.Rows.Add(row);}
      // Add 5 rows on Unchanged state
      for (int i = 5; i < 10; i++) {DataRow row = dt.NewRow();row["Col"] = i;
         dt.Rows.Add(row);
         // Calling AcceptChanges will make the DataRowVersion change from Added to Unchanged in this case
         row.AcceptChanges();
      }
      // Create a DataView
      DataView dv = new DataView(dt);
      Console.WriteLine("Print unsorted, unfiltered DataView");
      PrintDataView(dv);
      // Changing the Sort order to descending
      dv.Sort = "Col DESC";
      Console.WriteLine("Print sorted DataView. Sort = 'Col DESC'");
      PrintDataView(dv);
      // Filter by an expression. Filter all rows where column 'Col' have values greater or equal than 3
      dv.RowFilter = "Col < 3";
      Console.WriteLine("Print sorted and Filtered DataView by RowFilter. RowFilter = 'Col > 3'");
      PrintDataView(dv);
      // Removing Sort and RpwFilter to ilustrate RowStateFilter. DataView should contain all 10 rows back in the original order
      dv.Sort = String.Empty;
      dv.RowFilter = String.Empty;

      // Show only Unchanged rows or last 5 rows
      dv.RowStateFilter = DataViewRowState.Unchanged;

      Console.WriteLine("Print Filtered DataView by RowState. RowStateFilter =  DataViewRowState.Unchanged");
      PrintDataView(dv);
   }

   private static void PrintDataView(DataView dv) {
      // Printing first DataRowView to demo that the row in the first index of the DataView changes depending on sort and filters
      Console.WriteLine("First DataRowView value is '{0}'", dv[0]["Col"]);

      // Printing all DataRowViews
      foreach (DataRowView drv in dv) {
         Console.WriteLine("\t {0}", drv["Col"]);
      }
   }
}

*/

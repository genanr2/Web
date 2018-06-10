using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CSTabbedWebBrowser//.Controls
{
  public partial class BankRS2 : Form
  {
    MasterControl masterDetail;
    public BankRS2()
    {
      InitializeComponent();
    }
    private void clearFields()
    {
      panelView.Controls.Clear();
      masterDetail = null;
      Refresh();
    }
    private void btnLoad_Click(object sender, EventArgs e)
    {
      clearFields();
      bankRSTableAdapter1.Fill(northwindDataSet1.BankRS);
      keyFirmsTableAdapter1.Fill(northwindDataSet1.KeyFirms);
      personTableAdapter1.Fill(northwindDataSet1.Person);
      //      CustomersTableAdapter.Fill(Me.NwindDataSet.Customers);
      createMasterDetailView();
    }
    private void createMasterDetailView()
    {
      masterDetail = new MasterControl(northwindDataSet1);
      panelView.Controls.Add(masterDetail);
      masterDetail.setParentSource(northwindDataSet1.BankRS.TableName, "Firms");
      masterDetail.childView.Add(northwindDataSet1.KeyFirms.TableName, "Фирмы");
      masterDetail.childView.Add(northwindDataSet1.Person.TableName, "Директоры");
    }

  }
}

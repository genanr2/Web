using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data;


namespace CSTabbedWebBrowser
{
  public partial class DetailControl : TabControl
  {
    #region "Variables"
    public List<DataGridView> childGrid=new List<DataGridView>(); //As New List(DataGridView);
    public DataSet _cDataset;
    #endregion
    #region "Populate Childview"
//    public DetailControl{};
    public void Add(string tableName, string pageCaption)
    {
      TabPage tPage = new TabPage {Text = pageCaption };
      this.TabPages.Add(tPage);
      DataGridView newGrid = new DataGridView { Dock = DockStyle.Fill, DataSource = new DataView(_cDataset.Tables[tableName])};
      tPage.Controls.Add(newGrid);

      applyGridTheme(newGrid);
      setGridRowHeader(newGrid);
      //      AddHandler newGrid.RowPostPaint, AddressOf rowPostPaint_HeaderCount 
      childGrid.Add(newGrid);
      /*
            DataGridView newGrid =new DataGridView {Dock = DockStyle.Fill, DataSource = new DataView(_cDataset.Tables(tableName)));
            tPage.Controls.Add(newGrid);

            applyGridTheme(newGrid);
            setGridRowHeader(newGrid);
            AddHandler newGrid.RowPostPaint, AddressOf rowPostPaint_HeaderCount childGrid.Add(newGrid)
                  */
    }
    #endregion
  }
}
/*
Public Class detailControl Inherits TabControl
#Region "Variables"
    Friend childGrid As New List(Of DataGridView)
    Friend _cDataset As DataSet
#End Region
#Region "Populate Childview"
    Friend Sub Add(ByVal tableName As String, ByVal pageCaption As String) Dim tPage As New TabPage With {.Text = pageCaption }
Me.TabPages.Add(tPage)
        Dim newGrid As New DataGridView With {.Dock = DockStyle.Fill, .DataSource = New DataView(_cDataset.Tables(tableName))}
tPage.Controls.Add(newGrid)
        applyGridTheme(newGrid)
        setGridRowHeader(newGrid)
        AddHandler newGrid.RowPostPaint, AddressOf rowPostPaint_HeaderCount
        childGrid.Add(newGrid)
    End Sub
#End Region

End Class
*/
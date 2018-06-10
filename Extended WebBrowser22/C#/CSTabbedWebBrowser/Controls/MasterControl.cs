using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Reflection;
//using System.Windows.Forms.ImageListStreamer;

namespace CSTabbedWebBrowser
{
  public class MasterControl : DataGridView
  {
    #region "Variables"
    List<int> rowCurrent;// List<int>
    int rowDefaultHeight = 22;
    int rowExpandedHeight = 300;
    int rowDefaultDivider = 0;
    static int rowExpandedDivider = 300 - 22;
    static int rowDividerMargin = 5;
    bool collapseRow;
    public DetailControl childView = new DetailControl { Height = rowExpandedDivider - rowDividerMargin * 2, Visible = false };

    public ImageList WithEvents;
    private IContainer components;
    DataSet _cDataset;
    string _foreignKey;
    string _filterFormat;
    enum rowHeaderIcons { expand = 0, collapse = 1 };
    DataGridViewCellStyle dateCellStyle = new DataGridViewCellStyle();
    DataGridViewCellStyle amountCellStyle = new DataGridViewCellStyle();
    DataGridViewCellStyle gridCellStyle = new DataGridViewCellStyle();
    DataGridViewCellStyle gridCellStyle2 = new DataGridViewCellStyle();
    internal ImageList RowHeaderIconList;
    DataGridViewCellStyle gridCellStyle3 = new DataGridViewCellStyle();

    #endregion
    #region "Initialze and Display"
    public MasterControl(DataSet cDataset)
    {
//      DataSet cDataset = northwindDataSet1;
      Controls.Add(childView);
      InitializeComponent();
      _cDataset = cDataset;
      childView._cDataset = cDataset;
      Module m = GetType().Module;
      applyGridTheme(this);

      applyGridTheme(this);
      Dock = DockStyle.Fill;// Fill();
      this.RowHeaderMouseClick += MasterControl_RowHeaderMouseClick; //Handles MyBase.RowHeaderMouseClick //MasterControl_RowHeaderMouseClick
      RowPostPaint += MasterControl_RowPostPaint; //Handles MyBase.RowPostPaint
      SelectionChanged += MasterControl_SelectionChanged;// (object sender, EventArgs e)// Handles MyBase.SelectionChanged
      rowCurrent = new List<int>();


    }
  private void InitializeComponent()
    {
      this.components = new System.ComponentModel.Container();
      System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(MasterControl));
      this.RowHeaderIconList = new System.Windows.Forms.ImageList(this.components);
      ((System.ComponentModel.ISupportInitialize)(this)).BeginInit();
      this.SuspendLayout();
      // 
      // RowHeaderIconList
      // 
      this.RowHeaderIconList.ImageStream = ((System.Windows.Forms.ImageListStreamer)(resources.GetObject("RowHeaderIconList.ImageStream")));
      this.RowHeaderIconList.TransparentColor = System.Drawing.Color.Transparent;
      this.RowHeaderIconList.Images.SetKeyName(0, "expand.png");
      this.RowHeaderIconList.Images.SetKeyName(1, "collapse.png");
      ((System.ComponentModel.ISupportInitialize)(this)).EndInit();
      this.ResumeLayout(false);

    }
    void applyGridTheme(DataGridView grid)
    {
      //      DataGridViewCellStyle dateCellStyle2 = new DataGridViewCellStyle();

      grid.AllowUserToAddRows = false;
      grid.AllowUserToDeleteRows = false;
      grid.BackgroundColor = SystemColors.Window;
      grid.BorderStyle = BorderStyle.None;
      grid.ColumnHeadersBorderStyle = DataGridViewHeaderBorderStyle.Single;
      grid.ColumnHeadersDefaultCellStyle = gridCellStyle;
      grid.ColumnHeadersHeight = 32;
      grid.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.DisableResizing;
      grid.DefaultCellStyle = gridCellStyle2;
      grid.EnableHeadersVisualStyles = false;
      grid.GridColor = SystemColors.GradientInactiveCaption;
      grid.ReadOnly = true;
      grid.RowHeadersVisible = true;
      grid.RowHeadersBorderStyle = DataGridViewHeaderBorderStyle.Single;
      grid.RowHeadersDefaultCellStyle = gridCellStyle3;
      grid.Font = gridCellStyle.Font;

    }

    #endregion
    #region "DataControl"
    public void setParentSource(string tableName, string foreignKey)
    {
      DataSource = new DataView(_cDataset.Tables[tableName]);
      setGridRowHeader(this);
      _foreignKey = foreignKey;
      //      if(_cDataset.Tables[tableName].Columns[foreignKey].GetType() .ToString() = GetType(Integer).ToString _
      DataColumn dColumn = _cDataset.Tables[tableName].Columns[foreignKey];
      Type dType = dColumn.GetType();
      string ss = dType.ToString();
      //      GetType(Int16)
      //      if (ss = GetType(Integer).ToString ||ss = GetType(Double).ToString ||ss = GetType(Decimal).ToString)
      if (dType == typeof(int) || dType == typeof(double) || dType == typeof(decimal))
        _filterFormat = foreignKey + "={0}";
      else _filterFormat = foreignKey + "='{0}'";
    }
    void setGridRowHeader(DataGridView dgv, bool hSize = false)
    {
      dgv.TopLeftHeaderCell.Value = "NO ";
      dgv.TopLeftHeaderCell.Style.Alignment = DataGridViewContentAlignment.MiddleCenter;
      dgv.AutoResizeRowHeadersWidth(DataGridViewRowHeadersWidthSizeMode.AutoSizeToDisplayedHeaders);
      foreach (DataGridViewColumn cCol in dgv.Columns)
      {
        if (cCol.ValueType == typeof(DateTime)) cCol.DefaultCellStyle = dateCellStyle;
        else if (cCol.ValueType == typeof(decimal) || cCol.ValueType == typeof(double)) cCol.DefaultCellStyle = amountCellStyle;
      }
      if (hSize) dgv.RowHeadersWidth = dgv.RowHeadersWidth + 16; dgv.AutoResizeColumns();
    }

    #endregion
    #region "GridEvents"
//    public void MasterControl_RowHeaderMouseClick(object sender, DataGridViewCellMouseEventArgs e) //Handles MyBase.RowHeaderMouseClick
    public void MasterControl_RowHeaderMouseClick(object sender, DataGridViewCellMouseEventArgs e) // Handles MyBase.RowHeaderMouseClick
    {
      Rectangle rect = new Rectangle((rowDefaultHeight - 16) / 2, (rowDefaultHeight - 16) / 2, 16, 16);

      if (rect.Contains(e.Location))
      { 
        if (rowCurrent!=null && rowCurrent.Contains(e.RowIndex))
        {
          rowCurrent.Clear();
          Rows[e.RowIndex].Height = rowDefaultHeight;
          Rows[e.RowIndex].DividerHeight = rowDefaultDivider;
        }
        else
        {
          if (rowCurrent!=null && rowCurrent.Count != 0)
          {
            int eRow = rowCurrent[0];
            rowCurrent.Clear();
            Rows[eRow].Height = rowDefaultHeight;
            Rows[eRow].DividerHeight = rowDefaultDivider;
            ClearSelection();
            collapseRow = true;
            Rows[eRow].Selected = true;
          }
          rowCurrent.Add(e.RowIndex);
          Rows[e.RowIndex].Height = rowExpandedHeight;
          Rows[e.RowIndex].DividerHeight = rowExpandedDivider;
        }
        ClearSelection();
        collapseRow = true;
        Rows[e.RowIndex].Selected = true;
      }
      else collapseRow = false;
    }

    public void MasterControl_RowPostPaint(object sender, DataGridViewRowPostPaintEventArgs e) //Handles MyBase.RowPostPaint
    {
      //set childview control
      Rectangle rect = new Rectangle(e.RowBounds.X + ((rowDefaultHeight - 16) / 2), e.RowBounds.Y + ((rowDefaultHeight - 16) / 2), 16, 16);
      MasterControl send = (MasterControl)sender;
      if (collapseRow)
      {
        if (rowCurrent != null && rowCurrent.Contains(e.RowIndex))
        {
          //          MyBase.RowPostPaint
          send.Rows[e.RowIndex].DividerHeight = send.Rows[e.RowIndex].Height - rowDefaultHeight;
//          e.Graphics.DrawImage(RowHeaderIconList.Images[rowHeaderIcons.collapse], rect);
          e.Graphics.DrawImage(RowHeaderIconList.Images[0], rect);
          childView.Location = new Point(e.RowBounds.Left + send.RowHeadersWidth, e.RowBounds.Top + rowDefaultHeight + 5);
          childView.Width = e.RowBounds.Right - send.RowHeadersWidth;
          childView.Height = send.Rows[e.RowIndex].DividerHeight - 10;
          childView.Visible = true;
        }
        else
        {
          childView.Visible = false;
          //          e.Graphics.DrawImage(RowHeaderIconList.Images[rowHeaderIcons.expand], rect);
          e.Graphics.DrawImage(RowHeaderIconList.Images[1], rect);
        }
        collapseRow = false;
      }
      else
        if (rowCurrent != null && rowCurrent.Contains(e.RowIndex))
      {
        send.Rows[e.RowIndex].DividerHeight = send.Rows[e.RowIndex].Height - rowDefaultHeight;
        //          e.Graphics.DrawImage(RowHeaderIconList.Images[rowHeaderIcons.collapse], rect);
        e.Graphics.DrawImage(RowHeaderIconList.Images[0], rect);
        childView.Location = new Point(e.RowBounds.Left + send.RowHeadersWidth, e.RowBounds.Top + rowDefaultHeight + 5);
        childView.Width = e.RowBounds.Right - send.RowHeadersWidth;
        childView.Height = send.Rows[e.RowIndex].DividerHeight - 10;
        childView.Visible = true;
      }
      //      else e.Graphics.DrawImage(RowHeaderIconList.Images[rowHeaderIcons.expand], rect);
      else
      {
        e.Graphics.DrawImage(RowHeaderIconList.Images[1], rect);
      }
//      rowPostPaint_HeaderCount(sender, e);
    }

    private void MasterControl_Scroll(object sender, ScrollEventArgs e) //Handles MyBase.Scroll
    {
      if (rowCurrent.Count != 0)
      {
        collapseRow = true;
        ClearSelection();
        Rows[rowCurrent[0]].Selected = true;
      }
    }

  private void MasterControl_SelectionChanged(object sender, EventArgs e)// Handles MyBase.SelectionChanged
  {
      if (RowCount != 0)
        if (rowCurrent != null && rowCurrent.Contains(CurrentRow.Index))
          foreach (DataGridView cGrid in childView.childGrid)
          {
            //            cGrid. RowFilter = String.Format(_filterFormat, (_foreignKey, CurrentRow[Index].Value);
            //          (DataRow)(cGrid.DataSource).RowFilter = string.Format(_filterFormat, (_foreignKey, CurrentRow.Index).Value);
            //            ((DataView)cGrid.DataSource).RowFilter = String.Format(_filterFormat, (_foreignKey + CurrentRow.Index));
            if (((DataView)cGrid.DataSource).Table.TableName == "Person")
            {

              ((DataView)cGrid.DataSource).RowFilter = "";
            }
            else
            {
//              string eFilter = string.Format(_filterFormat, (_foreignKey + CurrentRow.Index));
              string eFilter2 = string.Format("Key = {0}", (CurrentRow.Cells[3].Value));// .Index));
              ((DataView)cGrid.DataSource).RowFilter = eFilter2;
            }
          }

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

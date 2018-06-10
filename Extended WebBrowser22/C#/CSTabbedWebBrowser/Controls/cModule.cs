using System;
using System.Windows.Forms;
using System.Drawing;
using System.Reflection;

namespace CSTabbedWebBrowser
{
  //  class cModule: Module
  //  public thisModule : System.Reflection.Module 
  //  {

      partial class DetailControl : TabControl
      {

  //  #region "CustomGrid"
    DataGridViewCellStyle dateCellStyle = new DataGridViewCellStyle();
    DataGridViewCellStyle amountCellStyle = new DataGridViewCellStyle();
    DataGridViewCellStyle gridCellStyle = new DataGridViewCellStyle();
    DataGridViewCellStyle gridCellStyle2 = new DataGridViewCellStyle();
    DataGridViewCellStyle gridCellStyle3 = new DataGridViewCellStyle();

    public DetailControl()
    {
      dateCellStyle.Alignment = DataGridViewContentAlignment.MiddleRight;
      amountCellStyle.Alignment = DataGridViewContentAlignment.MiddleRight;
      amountCellStyle.Format = "N2";
      //      DataGridViewCellStyle gridCellStyle = new DataGridViewCellStyle();
      gridCellStyle.Alignment = DataGridViewContentAlignment.MiddleLeft;
      gridCellStyle.BackColor = System.Drawing.Color.FromArgb(79, 129, 189);
      //      System.Drawing.Font fff= new System.Drawing.Font()
      gridCellStyle.Font = new Font("Segoe UI", (float)10.0, FontStyle.Regular, GraphicsUnit.Point, 0);
      gridCellStyle.ForeColor = SystemColors.ControlLightLight;//, SelectionBackColor = System.Drawing.SystemColors.Highlight
      gridCellStyle.SelectionBackColor = SystemColors.Highlight;
      gridCellStyle.SelectionForeColor = SystemColors.HighlightText;
      gridCellStyle.WrapMode = DataGridViewTriState.True;
      //    .ForeColor = System.Drawing.SystemColors.ControlLightLight, SelectionBackColor = System.Drawing.SystemColors.Highlight,
      //    DataGridViewCellStyle gridCellStyle2 = new DataGridViewCellStyle();
      gridCellStyle2.Alignment = DataGridViewContentAlignment.MiddleLeft;
      gridCellStyle2.BackColor = System.Drawing.SystemColors.ControlLightLight;
      gridCellStyle2.Font = new Font("Segoe UI", (float)10.0, FontStyle.Regular, GraphicsUnit.Point, 0);

      gridCellStyle2.SelectionBackColor = Color.FromArgb(155, 187, 89);
      gridCellStyle2.SelectionForeColor = SystemColors.HighlightText;
      gridCellStyle2.WrapMode = DataGridViewTriState.False;
      //    DataGridViewCellStyle gridCellStyle3 = new DataGridViewCellStyle();
      gridCellStyle3.Alignment = DataGridViewContentAlignment.MiddleLeft;
      gridCellStyle3.BackColor = Color.Lavender;
      gridCellStyle3.Font = new Font("Segoe UI", (float)10.0, FontStyle.Regular, GraphicsUnit.Point, 0);
      gridCellStyle3.ForeColor = SystemColors.WindowText;
      gridCellStyle3.SelectionBackColor = Color.FromArgb(155, 187, 89);
      gridCellStyle3.SelectionForeColor = SystemColors.HighlightText;
      gridCellStyle3.WrapMode = DataGridViewTriState.True;
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
    void setGridRowHeader(DataGridView dgv, bool  hSize = false)
    {
      dgv.TopLeftHeaderCell.Value = "NO ";
      dgv.TopLeftHeaderCell.Style.Alignment = DataGridViewContentAlignment.MiddleCenter;
      dgv.AutoResizeRowHeadersWidth(DataGridViewRowHeadersWidthSizeMode.AutoSizeToDisplayedHeaders);
      foreach (DataGridViewColumn cCol in dgv.Columns)
      {
        if (cCol.ValueType.ToString() == typeof(DateTime).ToString()) cCol.DefaultCellStyle = dateCellStyle;
        else if (cCol.ValueType == typeof(Decimal) || cCol.ValueType == typeof(Double)) cCol.DefaultCellStyle = amountCellStyle;
      }
      if (hSize) dgv.RowHeadersWidth = dgv.RowHeadersWidth + 16; dgv.AutoResizeColumns();
    }
    void rowPostPaint_HeaderCount(object sender, DataGridViewRowPostPaintEventArgs e)
    {
      // set rowheader count
      DataGridView grid = (DataGridView)sender;
      string rowIdx = (e.RowIndex + 1).ToString();
      StringFormat centerFormat = new StringFormat();
      centerFormat.Alignment = StringAlignment.Center;
      centerFormat.LineAlignment = StringAlignment.Center;
      Rectangle headerBounds = new Rectangle(e.RowBounds.Left, e.RowBounds.Top, grid.RowHeadersWidth, e.RowBounds.Height - grid.Rows[e.RowIndex].DividerHeight);
      e.Graphics.DrawString(rowIdx, grid.Font, SystemBrushes.ControlText, headerBounds, centerFormat);
    }

//}
    //  #endregion
  }
}
//End Module

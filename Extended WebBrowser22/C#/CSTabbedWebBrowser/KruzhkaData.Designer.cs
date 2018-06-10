using System.Data.OleDb;
using Access = Microsoft.Office.Interop.Access;
using System.Data;

namespace CSTabbedWebBrowser
{
	partial class KruzhkaData
	{
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		/// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
		protected override void Dispose(bool disposing)
		{
			if (disposing && (components != null))
			{
				components.Dispose();
			}
			base.Dispose(disposing);
		}

		#region Windows Form Designer generated code

		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
			this.dgDetail = new System.Windows.Forms.DataGrid();
			((System.ComponentModel.ISupportInitialize)(this.dgDetail)).BeginInit();
			this.SuspendLayout();
			// 
			// dgDetail
			// 
			this.dgDetail.CaptionText = "Данные о Кружках";
			this.dgDetail.DataMember = "";
			this.dgDetail.HeaderForeColor = System.Drawing.SystemColors.ControlText;
			this.dgDetail.Location = new System.Drawing.Point(2, 1);
			this.dgDetail.Name = "dgDetail";
			this.dgDetail.Size = new System.Drawing.Size(778, 488);
			this.dgDetail.TabIndex = 1;
			this.dgDetail.Navigate += new System.Windows.Forms.NavigateEventHandler(this.dgDetail_Navigate);
			// 
			// KruzhkaData
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 14F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.ClientSize = new System.Drawing.Size(792, 501);
			this.Controls.Add(this.dgDetail);
			this.Name = "KruzhkaData";
			this.Text = "KruzhkaData";
			this.Load += new System.EventHandler(this.KruzhkaData_Load);
			((System.ComponentModel.ISupportInitialize)(this.dgDetail)).EndInit();
			this.ResumeLayout(false);

		}
		#endregion

		public System.Windows.Forms.DataGrid dgDetail;
	}

}
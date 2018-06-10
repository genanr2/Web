namespace CSTabbedWebBrowser
{
  partial class BankRS2
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
      System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(BankRS2));
      this.panelView = new System.Windows.Forms.Panel();
      this.txtTitle = new System.Windows.Forms.Label();
      this.Panel1 = new System.Windows.Forms.Panel();
      this.PictureBox1 = new System.Windows.Forms.PictureBox();
      this.Panel3 = new System.Windows.Forms.Panel();
      this.btnLoad = new System.Windows.Forms.Button();
      this.northwindDataSet1 = new CSTabbedWebBrowser.northwindDataSet();
      this.tableAdapterManager1 = new CSTabbedWebBrowser.northwindDataSetTableAdapters.TableAdapterManager();
      this.bankRSTableAdapter1 = new CSTabbedWebBrowser.northwindDataSetTableAdapters.BankRSTableAdapter();
      this.keyFirmsTableAdapter1 = new CSTabbedWebBrowser.northwindDataSetTableAdapters.KeyFirmsTableAdapter();
      this.personTableAdapter1 = new CSTabbedWebBrowser.northwindDataSetTableAdapters.PersonTableAdapter();
      this.Panel1.SuspendLayout();
      ((System.ComponentModel.ISupportInitialize)(this.PictureBox1)).BeginInit();
      this.Panel3.SuspendLayout();
      ((System.ComponentModel.ISupportInitialize)(this.northwindDataSet1)).BeginInit();
      this.SuspendLayout();
      // 
      // panelView
      // 
      this.panelView.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
      this.panelView.Dock = System.Windows.Forms.DockStyle.Fill;
      this.panelView.Location = new System.Drawing.Point(0, 73);
      this.panelView.Name = "panelView";
      this.panelView.RightToLeft = System.Windows.Forms.RightToLeft.No;
      this.panelView.Size = new System.Drawing.Size(951, 545);
      this.panelView.TabIndex = 25;
      // 
      // txtTitle
      // 
      this.txtTitle.AutoSize = true;
      this.txtTitle.Font = new System.Drawing.Font("Segoe UI Symbol", 20.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
      this.txtTitle.ForeColor = System.Drawing.Color.DodgerBlue;
      this.txtTitle.Location = new System.Drawing.Point(84, 24);
      this.txtTitle.Name = "txtTitle";
      this.txtTitle.Size = new System.Drawing.Size(529, 37);
      this.txtTitle.TabIndex = 10;
      this.txtTitle.Text = "Master Detail Demo - NorthWind Database";
      // 
      // Panel1
      // 
      this.Panel1.Controls.Add(this.PictureBox1);
      this.Panel1.Controls.Add(this.txtTitle);
      this.Panel1.Dock = System.Windows.Forms.DockStyle.Top;
      this.Panel1.Location = new System.Drawing.Point(0, 0);
      this.Panel1.Name = "Panel1";
      this.Panel1.RightToLeft = System.Windows.Forms.RightToLeft.No;
      this.Panel1.Size = new System.Drawing.Size(951, 73);
      this.Panel1.TabIndex = 24;
      // 
      // PictureBox1
      // 
      this.PictureBox1.Image = ((System.Drawing.Image)(resources.GetObject("PictureBox1.Image")));
      this.PictureBox1.Location = new System.Drawing.Point(31, 16);
      this.PictureBox1.Name = "PictureBox1";
      this.PictureBox1.Size = new System.Drawing.Size(47, 51);
      this.PictureBox1.TabIndex = 11;
      this.PictureBox1.TabStop = false;
      // 
      // Panel3
      // 
      this.Panel3.Controls.Add(this.btnLoad);
      this.Panel3.Dock = System.Windows.Forms.DockStyle.Bottom;
      this.Panel3.Location = new System.Drawing.Point(0, 618);
      this.Panel3.Name = "Panel3";
      this.Panel3.RightToLeft = System.Windows.Forms.RightToLeft.No;
      this.Panel3.Size = new System.Drawing.Size(951, 72);
      this.Panel3.TabIndex = 26;
      // 
      // btnLoad
      // 
      this.btnLoad.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
      this.btnLoad.FlatAppearance.BorderColor = System.Drawing.Color.LightSkyBlue;
      this.btnLoad.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
      this.btnLoad.Location = new System.Drawing.Point(864, 23);
      this.btnLoad.Name = "btnLoad";
      this.btnLoad.Size = new System.Drawing.Size(75, 25);
      this.btnLoad.TabIndex = 21;
      this.btnLoad.Text = "Load Data";
      this.btnLoad.UseVisualStyleBackColor = true;
      this.btnLoad.Click += new System.EventHandler(this.btnLoad_Click);
      // 
      // northwindDataSet1
      // 
      this.northwindDataSet1.DataSetName = "northwindDataSet";
      this.northwindDataSet1.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
      // 
      // tableAdapterManager1
      // 
      this.tableAdapterManager1.BackupDataSetBeforeUpdate = false;
      this.tableAdapterManager1.BankRSTableAdapter = this.bankRSTableAdapter1;
      this.tableAdapterManager1.KruzhkaTableAdapter = null;
      this.tableAdapterManager1.PersonTableAdapter = null;
      this.tableAdapterManager1.UpdateOrder = CSTabbedWebBrowser.northwindDataSetTableAdapters.TableAdapterManager.UpdateOrderOption.InsertUpdateDelete;
      // 
      // bankRSTableAdapter1
      // 
      this.bankRSTableAdapter1.ClearBeforeFill = true;
      // 
      // keyFirmsTableAdapter1
      // 
      this.keyFirmsTableAdapter1.ClearBeforeFill = true;
      // 
      // personTableAdapter1
      // 
      this.personTableAdapter1.ClearBeforeFill = true;
      // 
      // BankRS2
      // 
      this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 14F);
      this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
      this.ClientSize = new System.Drawing.Size(951, 690);
      this.Controls.Add(this.panelView);
      this.Controls.Add(this.Panel1);
      this.Controls.Add(this.Panel3);
      this.Name = "BankRS2";
      this.Text = "BankRS2";
      this.Panel1.ResumeLayout(false);
      this.Panel1.PerformLayout();
      ((System.ComponentModel.ISupportInitialize)(this.PictureBox1)).EndInit();
      this.Panel3.ResumeLayout(false);
      ((System.ComponentModel.ISupportInitialize)(this.northwindDataSet1)).EndInit();
      this.ResumeLayout(false);

    }

    #endregion

    internal System.Windows.Forms.Panel panelView;
    internal System.Windows.Forms.Label txtTitle;
    internal System.Windows.Forms.Panel Panel1;
    internal System.Windows.Forms.PictureBox PictureBox1;
    internal System.Windows.Forms.Panel Panel3;
    internal System.Windows.Forms.Button btnLoad;
    private northwindDataSet northwindDataSet1;
    private northwindDataSetTableAdapters.TableAdapterManager tableAdapterManager1;
    private northwindDataSetTableAdapters.BankRSTableAdapter bankRSTableAdapter1;
    private northwindDataSetTableAdapters.KeyFirmsTableAdapter keyFirmsTableAdapter1;
    private northwindDataSetTableAdapters.PersonTableAdapter personTableAdapter1;
  }
}
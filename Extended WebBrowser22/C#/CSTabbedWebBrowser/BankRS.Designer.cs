namespace CSTabbedWebBrowser
{
  partial class BankRS
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
      this.components = new System.ComponentModel.Container();
      System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle1 = new System.Windows.Forms.DataGridViewCellStyle();
      System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle2 = new System.Windows.Forms.DataGridViewCellStyle();
      System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle3 = new System.Windows.Forms.DataGridViewCellStyle();
      this.dataGridView1 = new System.Windows.Forms.DataGridView();
      this.кодDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
      this.loginDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
      this.passwdDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
      this.firmsDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
      this.startDateDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
      this.endDateDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
      this.pKeyDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
      this.bankRSBindingSource = new System.Windows.Forms.BindingSource(this.components);
      this.northwindDataSet = new CSTabbedWebBrowser.northwindDataSet();
      this.northwindDataSetBindingSource = new System.Windows.Forms.BindingSource(this.components);
      this.bankRSTableAdapter = new CSTabbedWebBrowser.northwindDataSetTableAdapters.BankRSTableAdapter();
      this.dataGridView2 = new System.Windows.Forms.DataGridView();
      this.keyFirmsBindingSource = new System.Windows.Forms.BindingSource(this.components);
      this.keyFirmsTableAdapter = new CSTabbedWebBrowser.northwindDataSetTableAdapters.KeyFirmsTableAdapter();
      this.bankRSKeyFirmsBindingSource = new System.Windows.Forms.BindingSource(this.components);
      this.personTableAdapter1 = new CSTabbedWebBrowser.northwindDataSetTableAdapters.PersonTableAdapter();
      this.dataGridView3 = new System.Windows.Forms.DataGridView();
      this.кодDataGridViewTextBoxColumn2 = new System.Windows.Forms.DataGridViewTextBoxColumn();
      this.fullNameDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
      this.shortNameDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
      this.passportDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
      this.addressDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
      this.positionDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
      this.personBindingSource = new System.Windows.Forms.BindingSource(this.components);
      this.bindingSource1 = new System.Windows.Forms.BindingSource(this.components);
      this.kruzhkaBindingSource = new System.Windows.Forms.BindingSource(this.components);
      this.kruzhkaTableAdapter = new CSTabbedWebBrowser.northwindDataSetTableAdapters.KruzhkaTableAdapter();
      this.LoginRadio = new System.Windows.Forms.RadioButton();
      this.FirmRadio = new System.Windows.Forms.RadioButton();
      this.DiretorRadio = new System.Windows.Forms.RadioButton();
      this.кодDataGridViewTextBoxColumn1 = new System.Windows.Forms.DataGridViewTextBoxColumn();
      this.FirstName = new System.Windows.Forms.DataGridViewTextBoxColumn();
      this.firmDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
      this.keyDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
      this.Buhgalter = new System.Windows.Forms.DataGridViewTextBoxColumn();
      ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).BeginInit();
      ((System.ComponentModel.ISupportInitialize)(this.bankRSBindingSource)).BeginInit();
      ((System.ComponentModel.ISupportInitialize)(this.northwindDataSet)).BeginInit();
      ((System.ComponentModel.ISupportInitialize)(this.northwindDataSetBindingSource)).BeginInit();
      ((System.ComponentModel.ISupportInitialize)(this.dataGridView2)).BeginInit();
      ((System.ComponentModel.ISupportInitialize)(this.keyFirmsBindingSource)).BeginInit();
      ((System.ComponentModel.ISupportInitialize)(this.bankRSKeyFirmsBindingSource)).BeginInit();
      ((System.ComponentModel.ISupportInitialize)(this.dataGridView3)).BeginInit();
      ((System.ComponentModel.ISupportInitialize)(this.personBindingSource)).BeginInit();
      ((System.ComponentModel.ISupportInitialize)(this.bindingSource1)).BeginInit();
      ((System.ComponentModel.ISupportInitialize)(this.kruzhkaBindingSource)).BeginInit();
      this.SuspendLayout();
      // 
      // dataGridView1
      // 
      this.dataGridView1.AllowDrop = true;
      this.dataGridView1.AllowUserToOrderColumns = true;
      dataGridViewCellStyle1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(255)))));
      dataGridViewCellStyle1.ForeColor = System.Drawing.Color.Black;
      dataGridViewCellStyle1.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(255)))), ((int)(((byte)(192)))));
      dataGridViewCellStyle1.SelectionForeColor = System.Drawing.Color.Black;
      this.dataGridView1.AlternatingRowsDefaultCellStyle = dataGridViewCellStyle1;
      this.dataGridView1.AutoGenerateColumns = false;
      this.dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
      this.dataGridView1.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.кодDataGridViewTextBoxColumn,
            this.loginDataGridViewTextBoxColumn,
            this.passwdDataGridViewTextBoxColumn,
            this.firmsDataGridViewTextBoxColumn,
            this.startDateDataGridViewTextBoxColumn,
            this.endDateDataGridViewTextBoxColumn,
            this.pKeyDataGridViewTextBoxColumn});
      this.dataGridView1.DataSource = this.bankRSBindingSource;
      this.dataGridView1.Location = new System.Drawing.Point(0, -1);
      this.dataGridView1.Name = "dataGridView1";
      this.dataGridView1.Size = new System.Drawing.Size(515, 352);
      this.dataGridView1.TabIndex = 0;
      this.dataGridView1.CellContentClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridView1_CellContentClick);
      // 
      // кодDataGridViewTextBoxColumn
      // 
      this.кодDataGridViewTextBoxColumn.DataPropertyName = "Код";
      this.кодDataGridViewTextBoxColumn.HeaderText = "Код";
      this.кодDataGridViewTextBoxColumn.Name = "кодDataGridViewTextBoxColumn";
      this.кодDataGridViewTextBoxColumn.Visible = false;
      this.кодDataGridViewTextBoxColumn.Width = 49;
      // 
      // loginDataGridViewTextBoxColumn
      // 
      this.loginDataGridViewTextBoxColumn.DataPropertyName = "Login";
      this.loginDataGridViewTextBoxColumn.HeaderText = "Имя";
      this.loginDataGridViewTextBoxColumn.Name = "loginDataGridViewTextBoxColumn";
      this.loginDataGridViewTextBoxColumn.Width = 53;
      // 
      // passwdDataGridViewTextBoxColumn
      // 
      this.passwdDataGridViewTextBoxColumn.DataPropertyName = "Passwd";
      this.passwdDataGridViewTextBoxColumn.HeaderText = "Пароль";
      this.passwdDataGridViewTextBoxColumn.Name = "passwdDataGridViewTextBoxColumn";
      this.passwdDataGridViewTextBoxColumn.Width = 67;
      // 
      // firmsDataGridViewTextBoxColumn
      // 
      this.firmsDataGridViewTextBoxColumn.DataPropertyName = "Firms";
      this.firmsDataGridViewTextBoxColumn.HeaderText = "Firms";
      this.firmsDataGridViewTextBoxColumn.Name = "firmsDataGridViewTextBoxColumn";
      this.firmsDataGridViewTextBoxColumn.Resizable = System.Windows.Forms.DataGridViewTriState.True;
      this.firmsDataGridViewTextBoxColumn.Visible = false;
      this.firmsDataGridViewTextBoxColumn.Width = 56;
      // 
      // startDateDataGridViewTextBoxColumn
      // 
      this.startDateDataGridViewTextBoxColumn.DataPropertyName = "StartDate";
      this.startDateDataGridViewTextBoxColumn.HeaderText = "Начало";
      this.startDateDataGridViewTextBoxColumn.Name = "startDateDataGridViewTextBoxColumn";
      this.startDateDataGridViewTextBoxColumn.Width = 67;
      // 
      // endDateDataGridViewTextBoxColumn
      // 
      this.endDateDataGridViewTextBoxColumn.DataPropertyName = "EndDate";
      this.endDateDataGridViewTextBoxColumn.HeaderText = "Конец";
      this.endDateDataGridViewTextBoxColumn.Name = "endDateDataGridViewTextBoxColumn";
      this.endDateDataGridViewTextBoxColumn.Width = 61;
      // 
      // pKeyDataGridViewTextBoxColumn
      // 
      this.pKeyDataGridViewTextBoxColumn.DataPropertyName = "PKey";
      this.pKeyDataGridViewTextBoxColumn.HeaderText = "Пуб. ключ";
      this.pKeyDataGridViewTextBoxColumn.Name = "pKeyDataGridViewTextBoxColumn";
      this.pKeyDataGridViewTextBoxColumn.Width = 80;
      // 
      // bankRSBindingSource
      // 
      this.bankRSBindingSource.DataMember = "BankRS";
      this.bankRSBindingSource.DataSource = this.northwindDataSet;
      // 
      // northwindDataSet
      // 
      this.northwindDataSet.DataSetName = "northwindDataSet";
      this.northwindDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
      // 
      // northwindDataSetBindingSource
      // 
      this.northwindDataSetBindingSource.DataSource = this.northwindDataSet;
      this.northwindDataSetBindingSource.Position = 0;
      // 
      // bankRSTableAdapter
      // 
      this.bankRSTableAdapter.ClearBeforeFill = true;
      // 
      // dataGridView2
      // 
      this.dataGridView2.AllowUserToOrderColumns = true;
      dataGridViewCellStyle2.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(192)))));
      dataGridViewCellStyle2.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
      dataGridViewCellStyle2.SelectionForeColor = System.Drawing.Color.Black;
      this.dataGridView2.AlternatingRowsDefaultCellStyle = dataGridViewCellStyle2;
      this.dataGridView2.AutoGenerateColumns = false;
      this.dataGridView2.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
      this.dataGridView2.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.кодDataGridViewTextBoxColumn1,
            this.FirstName,
            this.firmDataGridViewTextBoxColumn,
            this.keyDataGridViewTextBoxColumn,
            this.Buhgalter});
      this.dataGridView2.DataSource = this.keyFirmsBindingSource;
      this.dataGridView2.Location = new System.Drawing.Point(521, -1);
      this.dataGridView2.Name = "dataGridView2";
      this.dataGridView2.Size = new System.Drawing.Size(312, 352);
      this.dataGridView2.TabIndex = 1;
      // 
      // keyFirmsBindingSource
      // 
      this.keyFirmsBindingSource.DataMember = "KeyFirms";
      this.keyFirmsBindingSource.DataSource = this.northwindDataSetBindingSource;
      // 
      // keyFirmsTableAdapter
      // 
      this.keyFirmsTableAdapter.ClearBeforeFill = true;
      // 
      // bankRSKeyFirmsBindingSource
      // 
      this.bankRSKeyFirmsBindingSource.DataMember = "BankRSKeyFirms";
      this.bankRSKeyFirmsBindingSource.DataSource = this.bankRSBindingSource;
      // 
      // personTableAdapter1
      // 
      this.personTableAdapter1.ClearBeforeFill = true;
      // 
      // dataGridView3
      // 
      this.dataGridView3.AllowUserToOrderColumns = true;
      dataGridViewCellStyle3.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(192)))));
      dataGridViewCellStyle3.Font = new System.Drawing.Font("Times New Roman", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(204)));
      dataGridViewCellStyle3.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
      dataGridViewCellStyle3.SelectionForeColor = System.Drawing.Color.Black;
      this.dataGridView3.AlternatingRowsDefaultCellStyle = dataGridViewCellStyle3;
      this.dataGridView3.AutoGenerateColumns = false;
      this.dataGridView3.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
      this.dataGridView3.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.кодDataGridViewTextBoxColumn2,
            this.fullNameDataGridViewTextBoxColumn,
            this.shortNameDataGridViewTextBoxColumn,
            this.passportDataGridViewTextBoxColumn,
            this.addressDataGridViewTextBoxColumn,
            this.positionDataGridViewTextBoxColumn});
      this.dataGridView3.DataSource = this.personBindingSource;
      this.dataGridView3.Location = new System.Drawing.Point(0, 357);
      this.dataGridView3.Name = "dataGridView3";
      this.dataGridView3.Size = new System.Drawing.Size(833, 225);
      this.dataGridView3.TabIndex = 2;
      // 
      // кодDataGridViewTextBoxColumn2
      // 
      this.кодDataGridViewTextBoxColumn2.DataPropertyName = "Код";
      this.кодDataGridViewTextBoxColumn2.HeaderText = "Код";
      this.кодDataGridViewTextBoxColumn2.Name = "кодDataGridViewTextBoxColumn2";
      // 
      // fullNameDataGridViewTextBoxColumn
      // 
      this.fullNameDataGridViewTextBoxColumn.DataPropertyName = "fullName";
      this.fullNameDataGridViewTextBoxColumn.HeaderText = "fullName";
      this.fullNameDataGridViewTextBoxColumn.Name = "fullNameDataGridViewTextBoxColumn";
      this.fullNameDataGridViewTextBoxColumn.Visible = false;
      // 
      // shortNameDataGridViewTextBoxColumn
      // 
      this.shortNameDataGridViewTextBoxColumn.DataPropertyName = "shortName";
      this.shortNameDataGridViewTextBoxColumn.HeaderText = "shortName";
      this.shortNameDataGridViewTextBoxColumn.Name = "shortNameDataGridViewTextBoxColumn";
      // 
      // passportDataGridViewTextBoxColumn
      // 
      this.passportDataGridViewTextBoxColumn.DataPropertyName = "passport";
      this.passportDataGridViewTextBoxColumn.HeaderText = "passport";
      this.passportDataGridViewTextBoxColumn.Name = "passportDataGridViewTextBoxColumn";
      // 
      // addressDataGridViewTextBoxColumn
      // 
      this.addressDataGridViewTextBoxColumn.DataPropertyName = "address";
      this.addressDataGridViewTextBoxColumn.HeaderText = "address";
      this.addressDataGridViewTextBoxColumn.Name = "addressDataGridViewTextBoxColumn";
      // 
      // positionDataGridViewTextBoxColumn
      // 
      this.positionDataGridViewTextBoxColumn.DataPropertyName = "position";
      this.positionDataGridViewTextBoxColumn.HeaderText = "position";
      this.positionDataGridViewTextBoxColumn.Name = "positionDataGridViewTextBoxColumn";
      // 
      // personBindingSource
      // 
      this.personBindingSource.DataMember = "Person";
      this.personBindingSource.DataSource = this.northwindDataSetBindingSource;
      // 
      // bindingSource1
      // 
      this.bindingSource1.DataMember = "KruzhkaKeyFirms";
      this.bindingSource1.DataSource = this.kruzhkaBindingSource;
      // 
      // kruzhkaBindingSource
      // 
      this.kruzhkaBindingSource.DataMember = "Kruzhka";
      this.kruzhkaBindingSource.DataSource = this.northwindDataSetBindingSource;
      // 
      // kruzhkaTableAdapter
      // 
      this.kruzhkaTableAdapter.ClearBeforeFill = true;
      // 
      // LoginRadio
      // 
      this.LoginRadio.AutoSize = true;
      this.LoginRadio.Location = new System.Drawing.Point(864, 287);
      this.LoginRadio.Name = "LoginRadio";
      this.LoginRadio.Size = new System.Drawing.Size(54, 18);
      this.LoginRadio.TabIndex = 3;
      this.LoginRadio.TabStop = true;
      this.LoginRadio.Text = "Логин";
      this.LoginRadio.UseVisualStyleBackColor = true;
      this.LoginRadio.CheckedChanged += new System.EventHandler(this.LoginRadio_CheckedChanged);
      // 
      // FirmRadio
      // 
      this.FirmRadio.AutoSize = true;
      this.FirmRadio.Location = new System.Drawing.Point(864, 322);
      this.FirmRadio.Name = "FirmRadio";
      this.FirmRadio.Size = new System.Drawing.Size(59, 18);
      this.FirmRadio.TabIndex = 4;
      this.FirmRadio.TabStop = true;
      this.FirmRadio.Text = "Фирма";
      this.FirmRadio.UseVisualStyleBackColor = true;
      this.FirmRadio.CheckedChanged += new System.EventHandler(this.FirmRadio_CheckedChanged);
      // 
      // DiretorRadio
      // 
      this.DiretorRadio.AutoSize = true;
      this.DiretorRadio.Location = new System.Drawing.Point(864, 357);
      this.DiretorRadio.Name = "DiretorRadio";
      this.DiretorRadio.Size = new System.Drawing.Size(74, 18);
      this.DiretorRadio.TabIndex = 5;
      this.DiretorRadio.TabStop = true;
      this.DiretorRadio.Text = "Директор";
      this.DiretorRadio.UseVisualStyleBackColor = true;
      this.DiretorRadio.CheckedChanged += new System.EventHandler(this.DiretorRadio_CheckedChanged);
      // 
      // кодDataGridViewTextBoxColumn1
      // 
      this.кодDataGridViewTextBoxColumn1.DataPropertyName = "Код";
      this.кодDataGridViewTextBoxColumn1.HeaderText = "Код";
      this.кодDataGridViewTextBoxColumn1.Name = "кодDataGridViewTextBoxColumn1";
      this.кодDataGridViewTextBoxColumn1.Visible = false;
      // 
      // FirstName
      // 
      this.FirstName.AutoSizeMode = System.Windows.Forms.DataGridViewAutoSizeColumnMode.Fill;
      this.FirstName.DataPropertyName = "FirstName";
      this.FirstName.HeaderText = "Фирма";
      this.FirstName.Name = "FirstName";
      // 
      // firmDataGridViewTextBoxColumn
      // 
      this.firmDataGridViewTextBoxColumn.DataPropertyName = "Firm";
      this.firmDataGridViewTextBoxColumn.HeaderText = "Firm";
      this.firmDataGridViewTextBoxColumn.Name = "firmDataGridViewTextBoxColumn";
      this.firmDataGridViewTextBoxColumn.Visible = false;
      // 
      // keyDataGridViewTextBoxColumn
      // 
      this.keyDataGridViewTextBoxColumn.DataPropertyName = "Key";
      this.keyDataGridViewTextBoxColumn.HeaderText = "Key";
      this.keyDataGridViewTextBoxColumn.Name = "keyDataGridViewTextBoxColumn";
      this.keyDataGridViewTextBoxColumn.Visible = false;
      // 
      // Buhgalter
      // 
      this.Buhgalter.DataPropertyName = "Buhgalter";
      this.Buhgalter.HeaderText = "Бухгалтер";
      this.Buhgalter.Name = "Buhgalter";
      // 
      // BankRS
      // 
      this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 14F);
      this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
      this.ClientSize = new System.Drawing.Size(1001, 644);
      this.Controls.Add(this.DiretorRadio);
      this.Controls.Add(this.FirmRadio);
      this.Controls.Add(this.LoginRadio);
      this.Controls.Add(this.dataGridView3);
      this.Controls.Add(this.dataGridView2);
      this.Controls.Add(this.dataGridView1);
      this.Name = "BankRS";
      this.Text = "BankRS";
      this.Load += new System.EventHandler(this.BankRS_Load);
      ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).EndInit();
      ((System.ComponentModel.ISupportInitialize)(this.bankRSBindingSource)).EndInit();
      ((System.ComponentModel.ISupportInitialize)(this.northwindDataSet)).EndInit();
      ((System.ComponentModel.ISupportInitialize)(this.northwindDataSetBindingSource)).EndInit();
      ((System.ComponentModel.ISupportInitialize)(this.dataGridView2)).EndInit();
      ((System.ComponentModel.ISupportInitialize)(this.keyFirmsBindingSource)).EndInit();
      ((System.ComponentModel.ISupportInitialize)(this.bankRSKeyFirmsBindingSource)).EndInit();
      ((System.ComponentModel.ISupportInitialize)(this.dataGridView3)).EndInit();
      ((System.ComponentModel.ISupportInitialize)(this.personBindingSource)).EndInit();
      ((System.ComponentModel.ISupportInitialize)(this.bindingSource1)).EndInit();
      ((System.ComponentModel.ISupportInitialize)(this.kruzhkaBindingSource)).EndInit();
      this.ResumeLayout(false);
      this.PerformLayout();

    }

    #endregion

    private System.Windows.Forms.DataGridView dataGridView1;
    private System.Windows.Forms.BindingSource northwindDataSetBindingSource;
    private northwindDataSet northwindDataSet;
    private System.Windows.Forms.BindingSource bankRSBindingSource;
    private northwindDataSetTableAdapters.BankRSTableAdapter bankRSTableAdapter;
    private System.Windows.Forms.DataGridView dataGridView2;
    private System.Windows.Forms.BindingSource keyFirmsBindingSource;
    private northwindDataSetTableAdapters.KeyFirmsTableAdapter keyFirmsTableAdapter;
    private System.Windows.Forms.BindingSource bankRSKeyFirmsBindingSource;
    private northwindDataSetTableAdapters.PersonTableAdapter personTableAdapter1;
    private System.Windows.Forms.DataGridView dataGridView3;
    private System.Windows.Forms.BindingSource personBindingSource;
    private System.Windows.Forms.BindingSource bindingSource1;
    private System.Windows.Forms.BindingSource kruzhkaBindingSource;
    private northwindDataSetTableAdapters.KruzhkaTableAdapter kruzhkaTableAdapter;
    private System.Windows.Forms.DataGridViewTextBoxColumn кодDataGridViewTextBoxColumn2;
    private System.Windows.Forms.DataGridViewTextBoxColumn кодDataGridViewTextBoxColumn;
    private System.Windows.Forms.DataGridViewTextBoxColumn loginDataGridViewTextBoxColumn;
    private System.Windows.Forms.DataGridViewTextBoxColumn passwdDataGridViewTextBoxColumn;
    private System.Windows.Forms.DataGridViewTextBoxColumn firmsDataGridViewTextBoxColumn;
    private System.Windows.Forms.DataGridViewTextBoxColumn startDateDataGridViewTextBoxColumn;
    private System.Windows.Forms.DataGridViewTextBoxColumn endDateDataGridViewTextBoxColumn;
    private System.Windows.Forms.DataGridViewTextBoxColumn pKeyDataGridViewTextBoxColumn;
    private System.Windows.Forms.RadioButton LoginRadio;
    private System.Windows.Forms.RadioButton FirmRadio;
    private System.Windows.Forms.RadioButton DiretorRadio;
    private System.Windows.Forms.DataGridViewTextBoxColumn fullNameDataGridViewTextBoxColumn;
    private System.Windows.Forms.DataGridViewTextBoxColumn shortNameDataGridViewTextBoxColumn;
    private System.Windows.Forms.DataGridViewTextBoxColumn passportDataGridViewTextBoxColumn;
    private System.Windows.Forms.DataGridViewTextBoxColumn addressDataGridViewTextBoxColumn;
    private System.Windows.Forms.DataGridViewTextBoxColumn positionDataGridViewTextBoxColumn;
    private System.Windows.Forms.DataGridViewTextBoxColumn кодDataGridViewTextBoxColumn1;
    private System.Windows.Forms.DataGridViewTextBoxColumn FirstName;
    private System.Windows.Forms.DataGridViewTextBoxColumn firmDataGridViewTextBoxColumn;
    private System.Windows.Forms.DataGridViewTextBoxColumn keyDataGridViewTextBoxColumn;
    private System.Windows.Forms.DataGridViewTextBoxColumn Buhgalter;
  }
}
namespace CSTabbedWebBrowser
{
	partial class Kruzhki
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
			this.northwindDataSet = new CSTabbedWebBrowser.northwindDataSet();
			this.personBindingSource = new System.Windows.Forms.BindingSource(this.components);
			this.personTableAdapter = new CSTabbedWebBrowser.northwindDataSetTableAdapters.PersonTableAdapter();
			this.personKruzhkaBindingSource = new System.Windows.Forms.BindingSource(this.components);
			this.kruzhkaTableAdapter = new CSTabbedWebBrowser.northwindDataSetTableAdapters.KruzhkaTableAdapter();
			this.dataGridView1 = new System.Windows.Forms.DataGridView();
			this.кодDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
			this.fullNameDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
			this.shortNameDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
			this.passportDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
			this.addressDataGridViewTextBoxColumn = new System.Windows.Forms.DataGridViewTextBoxColumn();
			((System.ComponentModel.ISupportInitialize)(this.northwindDataSet)).BeginInit();
			((System.ComponentModel.ISupportInitialize)(this.personBindingSource)).BeginInit();
			((System.ComponentModel.ISupportInitialize)(this.personKruzhkaBindingSource)).BeginInit();
			((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).BeginInit();
			this.SuspendLayout();
			// 
			// northwindDataSet
			// 
			this.northwindDataSet.DataSetName = "northwindDataSet";
			this.northwindDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
			// 
			// personBindingSource
			// 
			this.personBindingSource.DataMember = "Person";
			this.personBindingSource.DataSource = this.northwindDataSet;
			this.personBindingSource.CurrentChanged += new System.EventHandler(this.personBindingSource_CurrentChanged);
			// 
			// personTableAdapter
			// 
			this.personTableAdapter.ClearBeforeFill = true;
			// 
			// personKruzhkaBindingSource
			// 
			this.personKruzhkaBindingSource.DataMember = "PersonKruzhka";
			this.personKruzhkaBindingSource.DataSource = this.personBindingSource;
			// 
			// kruzhkaTableAdapter
			// 
			this.kruzhkaTableAdapter.ClearBeforeFill = true;
			// 
			// dataGridView1
			// 
			this.dataGridView1.AllowUserToOrderColumns = true;
			this.dataGridView1.AutoGenerateColumns = false;
			this.dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
			this.dataGridView1.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.кодDataGridViewTextBoxColumn,
            this.fullNameDataGridViewTextBoxColumn,
            this.shortNameDataGridViewTextBoxColumn,
            this.passportDataGridViewTextBoxColumn,
            this.addressDataGridViewTextBoxColumn});
			this.dataGridView1.DataSource = this.personBindingSource;
			this.dataGridView1.Dock = System.Windows.Forms.DockStyle.Fill;
			this.dataGridView1.Location = new System.Drawing.Point(0, 0);
			this.dataGridView1.Name = "dataGridView1";
			this.dataGridView1.Size = new System.Drawing.Size(795, 562);
			this.dataGridView1.TabIndex = 0;
			this.dataGridView1.CellContentClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridView1_CellContentClick);
			// 
			// кодDataGridViewTextBoxColumn
			// 
			this.кодDataGridViewTextBoxColumn.DataPropertyName = "Код";
			this.кодDataGridViewTextBoxColumn.HeaderText = "Код";
			this.кодDataGridViewTextBoxColumn.Name = "кодDataGridViewTextBoxColumn";
			// 
			// fullNameDataGridViewTextBoxColumn
			// 
			this.fullNameDataGridViewTextBoxColumn.DataPropertyName = "fullName";
			this.fullNameDataGridViewTextBoxColumn.HeaderText = "fullName";
			this.fullNameDataGridViewTextBoxColumn.Name = "fullNameDataGridViewTextBoxColumn";
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
			// Kruzhki
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 14F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.ClientSize = new System.Drawing.Size(795, 562);
			this.Controls.Add(this.dataGridView1);
			this.Name = "Kruzhki";
			this.Text = "Kruzhki";
			this.Load += new System.EventHandler(this.Kruzhki_Load);
			((System.ComponentModel.ISupportInitialize)(this.northwindDataSet)).EndInit();
			((System.ComponentModel.ISupportInitialize)(this.personBindingSource)).EndInit();
			((System.ComponentModel.ISupportInitialize)(this.personKruzhkaBindingSource)).EndInit();
			((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).EndInit();
			this.ResumeLayout(false);

		}

		#endregion

		private northwindDataSet northwindDataSet;
		private System.Windows.Forms.BindingSource personBindingSource;
		private northwindDataSetTableAdapters.PersonTableAdapter personTableAdapter;
		private System.Windows.Forms.BindingSource personKruzhkaBindingSource;
		private northwindDataSetTableAdapters.KruzhkaTableAdapter kruzhkaTableAdapter;
		private System.Windows.Forms.DataGridView dataGridView1;
		private System.Windows.Forms.DataGridViewTextBoxColumn кодDataGridViewTextBoxColumn;
		private System.Windows.Forms.DataGridViewTextBoxColumn fullNameDataGridViewTextBoxColumn;
		private System.Windows.Forms.DataGridViewTextBoxColumn shortNameDataGridViewTextBoxColumn;
		private System.Windows.Forms.DataGridViewTextBoxColumn passportDataGridViewTextBoxColumn;
		private System.Windows.Forms.DataGridViewTextBoxColumn addressDataGridViewTextBoxColumn;
	}
}
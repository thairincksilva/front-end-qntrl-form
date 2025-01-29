export const FILE_MAPPINGS = {
  // Documentos da Empresa
  contratoSocial: 'customfield_file0',
  cnd: 'customfield_file1',
  conselhoClasse: 'customfield_file2',
  dadosBancarios: 'customfield_file3',
  certificadoConselhoClasse: 'customfield_file4',
  inscricaoMunicipal: 'customfield_file5',
  cartaoCnpj: 'customfield_file7',
  
  // Antecedentes Criminais dos Sócios
  antecedentesS1: 'customfield_file4',
  antecedentesS2: 'customfield_file10',
  antecedentesS3: 'customfield_file9',
  antecedentesS4: 'customfield_file8'
};

export class FileUploadManager {
  constructor() {
    this.files = new Map();
  }

  addFile(fieldName, file) {
    if (file instanceof File) {
      this.files.set(fieldName, file);
      return true;
    }
    return false;
  }

  getFile(fieldName) {
    return this.files.get(fieldName);
  }

  getAllFiles() {
    return Array.from(this.files.entries()).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  }

  clear() {
    this.files.clear();
  }

  populateFormData(formData) {
    this.files.forEach((file, fieldName) => {
      if (file instanceof File) {
        formData.append(fieldName, file, file.name);
      }
    });
  }
}

export const fileUploadManager = new FileUploadManager(); 
export const FILE_MAPPINGS = {
  // Documentos da Empresa
  contratoSocial: 'customfield_file1',
  dadosBancarios: 'customfield_file2',
  certificadoConselhoClasse: 'customfield_file3',
  inscricaoMunicipal: 'customfield_file5',
  cnd: 'customfield_file6',
  cartaoCnpj: 'customfield_file7',
  
  // Antecedentes Criminais dos Sócios
  antecedentesS1: 'customfield_file4',  // Sócio 1
  antecedentesS2: 'customfield_file10', // Sócio 2
  antecedentesS3: 'customfield_file9',  // Sócio 3
  antecedentesS4: 'customfield_file8'   // Sócio 4
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
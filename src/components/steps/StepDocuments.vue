<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Documentos</h2>
    <form @submit.prevent="handleNext">
      <!-- Contrato Social -->
      <div class="mb-4">
        <label class="block mb-2">
          Contrato Social:
          <input
            type="file"
            @change="(e) => handleFileUpload('contratoSocial', e)"
            class="w-full border p-2 rounded"
          />
        </label>
      </div>

      <!-- CND -->
      <div class="mb-4">
        <label class="block mb-2">
          CND:
          <input
            type="file"
            @change="(e) => handleFileUpload('cnd', e)"
            class="w-full border p-2 rounded"
          />
        </label>
      </div>

      <!-- Conselho de Classe -->
      <div class="mb-4">
        <label class="block mb-2">
          Conselho de Classe:
          <input
            type="file"
            @change="(e) => handleFileUpload('conselhoClasse', e)"
            class="w-full border p-2 rounded"
          />
        </label>
      </div>

      <!-- Dados Bancários -->
      <div class="mb-4">
        <label class="block mb-2">
          Dados Bancários:
          <input
            type="file"
            @change="(e) => handleFileUpload('dadosBancarios', e)"
            class="w-full border p-2 rounded"
          />
        </label>
      </div>

      <!-- Certificado Conselho de Classe -->
      <div class="mb-4">
        <label class="block mb-2">
          Certificado Conselho de Classe:
          <input
            type="file"
            @change="(e) => handleFileUpload('certificadoConselhoClasse', e)"
            class="w-full border p-2 rounded"
          />
        </label>
      </div>

      <!-- Inscrição Municipal -->
      <div class="mb-4">
        <label class="block mb-2">
          Inscrição Municipal:
          <input
            type="file"
            @change="(e) => handleFileUpload('inscricaoMunicipal', e)"
            class="w-full border p-2 rounded"
          />
        </label>
      </div>

      <div class="flex justify-between mt-4">
        <button 
          type="button" 
          class="bg-gray-300 px-4 py-2 rounded"
          @click="$emit('prev')"
        >
          Voltar
        </button>
        <button 
          type="submit" 
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Próximo
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { FILE_MAPPINGS } from '../../utils/fileUploadManager';
import { fileUploadManager } from '../../utils/fileUploadManager';

export default {
  name: 'StepDocuments',
  props: {
    formData: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data() {
    return {
      localData: {
        customfield_file1: null,  // Contrato Social
        customfield_file2: null,  // Dados Bancarios 
        customfield_file3: null,  // Certificado Conselho de Classe
        customfield_file4: null,  // Atestado de Antecedentes Criminais Socio 1
        customfield_file5: null,  // Inscricao Municipal
        customfield_file6: null,  // CND
        customfield_file7: null,  // Cartao CNPJ
        customfield_file8: null,  // Atestado de Antecedentes Criminais Socio 4
        customfield_file9: null,  // Atestado de Antecedentes Criminais Socio 3
        customfield_file10: null  // Atestado de Antecedentes Criminais Socio 2
      }
    }
  },
  methods: {
    handleFileUpload(field, event) {
      const file = event.target.files[0];
      if (file) {
        const customFieldName = FILE_MAPPINGS[field];
        if (customFieldName) {
          fileUploadManager.addFile(customFieldName, file);
          this.localData[customFieldName] = file;
          
          console.log(`Arquivo ${field} selecionado:`, {
            nome: file.name,
            tamanho: file.size,
            tipo: file.type,
            campo: customFieldName
          });
        }
      }
    },
    handleNext() {
      console.log('Dados dos documentos antes do envio:', 
        Object.entries(this.localData)
          .filter(([_, value]) => value instanceof File)
          .map(([key, file]) => ({
            campo: key,
            arquivo: file.name
          }))
      );
      this.$emit('next', this.localData);
    }
  },
  created() {
    // Inicializa com os valores do formData se existirem
    if (this.formData) {
      this.localData = {
        customfield_file0: this.formData.customfield_file0 || null,
        customfield_file1: this.formData.customfield_file1 || null,
        customfield_file2: this.formData.customfield_file2 || null,
        customfield_file3: this.formData.customfield_file3 || null,
        customfield_file4: this.formData.customfield_file4 || null,
        customfield_file5: this.formData.customfield_file5 || null
      };
    }
  }
}
</script>

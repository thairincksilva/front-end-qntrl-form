export async function handleFileUpload(file) {
  if (!file) return '';
  
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('YOUR_UPLOAD_ENDPOINT', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    return data.fileId;
  } catch (error) {
    console.error('Erro ao fazer upload do arquivo:', error);
    return '';
  }
} 
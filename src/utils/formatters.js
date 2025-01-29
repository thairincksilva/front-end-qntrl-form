export function formatDate(date) {
  if (!date) return '';
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  return dateObj.getTime();
}

// Função para converter timestamp de volta para data (útil para exibição)
export function parseDate(timestamp) {
  if (!timestamp) return '';
  return new Date(Number(timestamp)).toISOString().split('T')[0];
}

export function formatPhone(phone, countryCode = '+55') {
  if (!phone) return '';
  return `${countryCode}${phone.replace(/\D/g, '')}`;
}

export function formatCurrency(value, format = {
  pattern: '#,##0.00###',
  decimal_seperator: ',',
  currency_seperator: '.'
}) {
  if (!value) return '0,00';
  
  const number = parseFloat(value);
  const [integerPart, decimalPart = ''] = number.toString().split('.');
  
  // Formata parte inteira com separadores
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, format.currency_seperator);
  
  // Formata parte decimal
  const formattedDecimal = decimalPart.padEnd(2, '0').slice(0, 2);
  
  return `${formattedInteger}${format.decimal_seperator}${formattedDecimal}`;
}

export function formatDateBR(date) {
  if (!date) return '';
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  // Formata para DD/MM/YYYY
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  
  return `${day}/${month}/${year}`;
} 
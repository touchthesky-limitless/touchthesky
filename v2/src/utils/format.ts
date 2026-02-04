export const formatNumber = (val: string | number) => {
  // Convert number to string if needed and strip non-digits
  const stringVal = typeof val === 'number' 
    ? val.toFixed(2) 
    : val.replace(/\D/g, '');

  // Add commas
  return stringVal.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatCPP = (val: number) => {
  return val.toLocaleString(undefined, { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  });
};
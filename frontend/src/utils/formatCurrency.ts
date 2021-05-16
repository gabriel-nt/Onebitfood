export function formatCurrency(value: number) {
  const formatter = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  return formatter.format(value);
}
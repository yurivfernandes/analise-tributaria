import { CNAE } from '../types/cnae';

export function exportToCSV(data: CNAE[], filename: string) {
  const headers = [
    'Código',
    'Denominação',
    'Seção',
    'Divisão',
    'Grupo',
    'Classe',
    'Subclasse',
    'Última Atualização'
  ];

  const rows = data.map(cnae => [
    cnae.codigo,
    cnae.denominacao,
    cnae.secao,
    cnae.divisao,
    cnae.grupo,
    cnae.classe,
    cnae.subclasse,
    new Date(cnae.ultima_atualizacao).toLocaleString('pt-BR')
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
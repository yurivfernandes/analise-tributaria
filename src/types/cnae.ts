export interface CNAE {
  id: string;
  codigo: string;
  denominacao: string;
  secao: string;
  divisao: string;
  grupo: string;
  classe: string;
  subclasse: string;
  ultima_atualizacao: string;
}

export interface CNAELog {
  id: string;
  data: string;
  status: 'success' | 'error';
  mensagem: string;
}

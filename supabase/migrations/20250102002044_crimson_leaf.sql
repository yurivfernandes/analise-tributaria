/*
  # Criação das tabelas de CNAE

  1. Novas Tabelas
    - `cnaes`: Armazena os dados dos CNAEs
      - `id` (uuid, chave primária)
      - `codigo` (texto, único)
      - `denominacao` (texto)
      - `secao` (texto)
      - `divisao` (texto)
      - `grupo` (texto)
      - `classe` (texto)
      - `subclasse` (texto)
      - `ultima_atualizacao` (timestamp com timezone)
      - `created_at` (timestamp com timezone)
      - `updated_at` (timestamp com timezone)

    - `cnae_logs`: Registra o histórico de atualizações
      - `id` (uuid, chave primária)
      - `data` (timestamp com timezone)
      - `status` (texto)
      - `mensagem` (texto)
      - `created_at` (timestamp com timezone)

  2. Segurança
    - Habilitar RLS em ambas as tabelas
    - Adicionar políticas para leitura e escrita
*/

-- Tabela de CNAEs
CREATE TABLE IF NOT EXISTS cnaes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo text UNIQUE NOT NULL,
  denominacao text NOT NULL,
  secao text NOT NULL,
  divisao text NOT NULL,
  grupo text NOT NULL,
  classe text NOT NULL,
  subclasse text NOT NULL,
  ultima_atualizacao timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Tabela de Logs
CREATE TABLE IF NOT EXISTS cnae_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  data timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL CHECK (status IN ('success', 'error')),
  mensagem text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE cnaes ENABLE ROW LEVEL SECURITY;
ALTER TABLE cnae_logs ENABLE ROW LEVEL SECURITY;

-- Políticas para CNAEs
CREATE POLICY "Todos podem ler CNAEs"
  ON cnaes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Apenas admin pode atualizar CNAEs"
  ON cnaes
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'admin@taxanalytics.com'
  ));

-- Políticas para Logs
CREATE POLICY "Todos podem ler logs"
  ON cnae_logs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Apenas admin pode criar logs"
  ON cnae_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'admin@taxanalytics.com'
  ));
/*
      # Add additional fields for individual and corporate clients

      1. Alter `customers` table to add new columns:
        - `inss_autonomo` (numeric, nullable)
        - `ir_livro_caixa` (numeric, nullable)
        - `ir_carne_leao` (numeric, nullable)
        - `monthly_salary` (numeric, nullable)
        - `dependents_livro_caixa` (integer, nullable)
        - `issqn` (numeric, nullable)
        - `partners` (jsonb, nullable)
    */

    ALTER TABLE customers
    ADD COLUMN inss_autonomo numeric CHECK (inss_autonomo >= 0),
    ADD COLUMN ir_livro_caixa numeric CHECK (ir_livro_caixa >= 0),
    ADD COLUMN ir_carne_leao numeric CHECK (ir_carne_leao >= 0),
    ADD COLUMN monthly_salary numeric CHECK (monthly_salary >= 0),
    ADD COLUMN dependents_livro_caixa integer CHECK (dependents_livro_caixa >= 0),
    ADD COLUMN issqn numeric CHECK (issqn >= 0),
    ADD COLUMN partners jsonb;

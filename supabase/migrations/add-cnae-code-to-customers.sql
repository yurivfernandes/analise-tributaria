/*
      # Add CNAE code to customers table

      1. Alter `customers` table to add new column:
        - `cnae_code` (text, nullable)
    */

    ALTER TABLE customers
    ADD COLUMN cnae_code text;

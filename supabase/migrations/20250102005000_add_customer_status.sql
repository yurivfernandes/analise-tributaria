/*
      # Add status field to customers table

      1. Alter `customers` table to add new column:
        - `status` (text, not null, default 'active')
    */

    ALTER TABLE customers
    ADD COLUMN status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive'));

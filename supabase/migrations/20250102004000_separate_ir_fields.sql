/*
      # Separate IR a Pagar and IR a Restituir fields

      1. Alter `customers` table to add new columns:
        - `ir_to_pay` (numeric, nullable)
        - `ir_to_refund` (numeric, nullable)
        - Update `partners` JSONB structure to include separate fields for IR a Pagar and IR a Restituir
    */

    ALTER TABLE customers
    ADD COLUMN ir_to_pay numeric CHECK (ir_to_pay >= 0),
    ADD COLUMN ir_to_refund numeric CHECK (ir_to_refund >= 0);

    -- Update existing partners JSONB structure if necessary

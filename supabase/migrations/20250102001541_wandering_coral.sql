/*
  # Create customers table

  1. New Tables
    - `customers`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `full_name` (text)
      - `company_name` (text)
      - `phone` (text)
      - `email` (text)
      - `annual_revenue` (numeric)
      - `professional_council` (text)
      - `accounting_fee` (numeric)
      - `city_tax` (numeric, nullable)
      - `iss_per_employee` (numeric, nullable)
      - `state_taxes` (numeric, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `customers` table
    - Add policies for authenticated users
*/

CREATE TABLE customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  full_name text NOT NULL,
  company_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  annual_revenue numeric NOT NULL CHECK (annual_revenue >= 0),
  professional_council text NOT NULL,
  accounting_fee numeric NOT NULL CHECK (accounting_fee >= 0),
  city_tax numeric CHECK (city_tax >= 0),
  iss_per_employee numeric CHECK (iss_per_employee >= 0),
  state_taxes numeric CHECK (state_taxes >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own customers"
  ON customers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own customers"
  ON customers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own customers"
  ON customers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);
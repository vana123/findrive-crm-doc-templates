/**
 * Seller (Продавець) data for invoice template.
 */
export type InvoiceSeller = {
  name: string;
  address: string;
  nip: string;
};

/**
 * Buyer (Покупець) data for invoice template — physical person.
 */
export type InvoiceBuyer = {
  name: string;
  passport?: string | null;
  pesel?: string | null;
};

/**
 * Single line in the invoice items table.
 */
export type InvoiceLineItemTemplate = {
  row_number: number;
  product_name: string;
  quantity: string;
  net_price: string;
  net_value: string;
  vat_percent: string;
  tax_amount: string;
  gross_value: string;
};

/**
 * Data passed to the invoice PDF template.
 */
export type InvoiceTemplateProps = {
  invoice_number: string;
  issue_date: string;
  type: "advance" | "deposit" | "rental";
  seller: InvoiceSeller;
  buyer: InvoiceBuyer;
  line_items: InvoiceLineItemTemplate[];
  total_net: string;
  total_tax: string;
  total_gross: string;
  /** Місце видачі */
  issue_place?: string | null;
  /** Дата продажу (для оренди — дата останньої рати) */
  sale_date?: string | null;
  /** Номер договору для тексту "Dotyczy umowy leasingu nr X z dnia Y" */
  contract_number?: string | null;
  /** Дата договору */
  contract_date?: string | null;
  /** Термін платіжу (наприклад дата останньої рати) */
  payment_deadline?: string | null;
  /** Сума прописом */
  amount_in_words?: string | null;
  /** Спосіб оплати (наприклад "Przelew") */
  payment_method?: string | null;
  /** Банк */
  bank_name?: string | null;
  /** Номер рахунку */
  bank_account?: string | null;
  /** Ім'я та прізвище виставника */
  issuer_name?: string | null;
};

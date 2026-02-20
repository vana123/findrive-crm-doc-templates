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
  /** Totals (can be computed from line_items or passed explicitly). */
  total_net: string;
  total_tax: string;
  total_gross: string;
};

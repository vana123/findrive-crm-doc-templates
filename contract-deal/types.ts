/**
 * Payment item for the contract schedule (subset of deal Payment).
 */
export type ContractPayment = {
  due_date: string;
  amount: string;
  status: string;
  purpose?: string | null;
  net_amount?: string | null;
  vat_amount?: string | null;
};

/**
 * Data passed to the contract-deal PDF template via props.
 */
export type ContractDealTemplateProps = {
  contractNumber: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string | null;
  vehicleDescription: string;
  vehicleYear: number;
  carNumber: string;
  contractDate?: string;
  payments?: ContractPayment[];
};

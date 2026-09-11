export interface EnquiryFormData {
  name: string;
  company_name: string;
  phone: string;
  email: string;
  product_interest: string;
  estimated_quantity: string;
  message: string;
  source_page?: string;
  honeypot?: string; // Bot protection
}

export interface EnquirySubmissionResult {
  success: boolean;
  message: string;
  enquiryId?: string;
}

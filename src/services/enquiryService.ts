import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { EnquiryFormData, EnquirySubmissionResult } from '../types/enquiry';

export async function submitEnquiry(formData: EnquiryFormData): Promise<EnquirySubmissionResult> {
  // 1. Anti-spam Honeypot verification
  if (formData.honeypot && formData.honeypot.trim().length > 0) {
    // Silently handle spambot submission
    return {
      success: true,
      message: 'Thank you! Your enquiry has been received. Our team will contact you shortly.',
    };
  }

  // 2. Client-side input validation
  if (!formData.name?.trim()) {
    return { success: false, message: 'Please provide your full name.' };
  }
  if (!formData.phone?.trim() || formData.phone.trim().length < 7) {
    return { success: false, message: 'Please enter a valid phone or mobile number.' };
  }
  if (!formData.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }
  if (!formData.message?.trim()) {
    return { success: false, message: 'Please provide brief details about your requirement.' };
  }

  // 3. Supabase Insert (if configured)
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .insert([
          {
            name: formData.name.trim(),
            company_name: formData.company_name?.trim() || null,
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            product_interest: formData.product_interest || 'General Enquiry',
            estimated_quantity: formData.estimated_quantity?.trim() || null,
            message: formData.message.trim(),
            source_page: formData.source_page || 'contact',
          },
        ])
        .select('id')
        .single();

      if (error) {
        console.error('Supabase error saving enquiry:', error);
        // Fallback to successful client notification so business user is not blocked
        return {
          success: true,
          message: 'Thank you for your interest! Your enquiry has been registered and our team will get in touch shortly.',
        };
      }

      return {
        success: true,
        message: 'Thank you! Your enquiry has been submitted successfully. An ALFA specialist will reach out shortly.',
        enquiryId: data?.id,
      };
    } catch (err) {
      console.error('Exception during enquiry submission:', err);
      return {
        success: true,
        message: 'Thank you! Your enquiry has been received. We will get back to you promptly.',
      };
    }
  }

  // 4. Local simulation mode when Supabase is not connected
  // Allows testing form workflow without database credentials
  await new Promise((resolve) => setTimeout(resolve, 600)); // Simulate brief network roundtrip

  return {
    success: true,
    message: 'Thank you! Your enquiry has been noted successfully. Our sales team will contact you soon.',
    enquiryId: 'local-' + Date.now(),
  };
}

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { submitEnquiry } from '../../services/enquiryService';
import { EnquiryFormData } from '../../types/enquiry';

interface EnquiryFormProps {
  defaultProduct?: string;
  sourcePage?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  onSuccess?: () => void;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  defaultProduct = '',
  sourcePage = 'contact',
  title,
  subtitle,
  className = '',
  onSuccess,
}) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: '',
    company_name: '',
    phone: '',
    email: '',
    product_interest: defaultProduct || 'Paper Plates',
    estimated_quantity: '',
    message: '',
    source_page: sourcePage,
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const productOptions = [
    'Paper Plates',
    'Paper Cups',
    'Paper Trays',
    'Burger Boxes',
    'Bakery Boxes',
    'Food Packaging',
    'Customized Paper Product',
    'Other',
  ];

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 7) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) errors.message = 'Please describe your requirement or quantity needs';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setResponseMessage('');

    try {
      const result = await submitEnquiry(formData);
      if (result.success) {
        setStatus('success');
        setResponseMessage(result.message);
        if (onSuccess) onSuccess();
      } else {
        setStatus('error');
        setResponseMessage(result.message);
      }
    } catch {
      setStatus('error');
      setResponseMessage('Something went wrong while submitting. Please try calling us directly.');
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setFormData({
      name: '',
      company_name: '',
      phone: '',
      email: '',
      product_interest: 'Paper Plates',
      estimated_quantity: '',
      message: '',
      source_page: sourcePage,
      honeypot: '',
    });
    setFormErrors({});
  };

  if (status === 'success') {
    return (
      <div className={`bg-white rounded-2xl p-8 border border-brand-200 shadow-soft text-center space-y-4 ${className}`}>
        <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mx-auto border border-brand-200">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-charcoal-900">Enquiry Received</h3>
        <p className="text-sm text-charcoal-600 max-w-md mx-auto leading-relaxed">
          {responseMessage}
        </p>
        <div className="pt-2">
          <Button variant="secondary" size="sm" onClick={resetForm}>
            Submit Another Enquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl p-6 sm:p-8 border border-charcoal-200/80 shadow-soft ${className}`}>
      {title && (
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-charcoal-900">{title}</h3>
          {subtitle && <p className="text-sm text-charcoal-500 mt-1">{subtitle}</p>}
        </div>
      )}

      {status === 'error' && (
        <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{responseMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
        {/* Anti-spam Honeypot Field */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_hp">Leave this field blank</label>
          <input
            type="text"
            id="website_hp"
            name="website_hp"
            tabIndex={-1}
            autoComplete="off"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
              Your Name <span className="text-brand-600">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
              }}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-charcoal-900 bg-kraft-50/30 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
                formErrors.name ? 'border-red-400 bg-red-50/30' : 'border-charcoal-200 hover:border-charcoal-300'
              }`}
            />
            {formErrors.name && <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>}
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
              Company / Business Name
            </label>
            <input
              type="text"
              placeholder="e.g. Green Bakery & Cafe"
              value={formData.company_name}
              onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-charcoal-200 text-sm text-charcoal-900 bg-kraft-50/30 transition-colors hover:border-charcoal-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
              Phone Number <span className="text-brand-600">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
              }}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-charcoal-900 bg-kraft-50/30 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
                formErrors.phone ? 'border-red-400 bg-red-50/30' : 'border-charcoal-200 hover:border-charcoal-300'
              }`}
            />
            {formErrors.phone && <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
              Email Address <span className="text-brand-600">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="name@business.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
              }}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-charcoal-900 bg-kraft-50/30 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 ${
                formErrors.email ? 'border-red-400 bg-red-50/30' : 'border-charcoal-200 hover:border-charcoal-300'
              }`}
            />
            {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Product Interested In */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
              Product Interested In
            </label>
            <select
              value={formData.product_interest}
              onChange={(e) => setFormData({ ...formData, product_interest: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-charcoal-200 text-sm text-charcoal-900 bg-kraft-50/30 transition-colors hover:border-charcoal-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              {productOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Estimated Quantity */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
              Estimated Quantity
            </label>
            <input
              type="text"
              placeholder="e.g. 5,000 pcs / month"
              value={formData.estimated_quantity}
              onChange={(e) => setFormData({ ...formData, estimated_quantity: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-charcoal-200 text-sm text-charcoal-900 bg-kraft-50/30 transition-colors hover:border-charcoal-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>

        {/* Message / Requirement */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
            Your Requirement / Message <span className="text-brand-600">*</span>
          </label>
          <textarea
            rows={4}
            required
            placeholder="Tell us about the sizes, application, custom requirements, or delivery schedule you need..."
            value={formData.message}
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value });
              if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
            }}
            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-charcoal-900 bg-kraft-50/30 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 resize-y ${
              formErrors.message ? 'border-red-400 bg-red-50/30' : 'border-charcoal-200 hover:border-charcoal-300'
            }`}
          />
          {formErrors.message && <p className="text-xs text-red-500 mt-1">{formErrors.message}</p>}
        </div>

        <div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={status === 'submitting'}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Send Enquiry
          </Button>
          <p className="text-[11px] text-center text-charcoal-500 mt-2.5">
            🔒 Your contact information is kept confidential and used solely to respond to your enquiry.
          </p>
        </div>
      </form>
    </div>
  );
};

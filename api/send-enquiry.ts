export const config = {
  runtime: 'edge',
};

function escapeHtml(text: string = ''): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req: Request): Promise<Response> {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const data = await req.json();

    // Anti-spam honeypot verification
    if (data.honeypot && data.honeypot.trim().length > 0) {
      return new Response(JSON.stringify({ success: true, message: 'Spam filtered' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!data.name || !data.email || !data.phone || !data.message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL || 'alfabiopaperproducts@gmail.com';
    const fromEmail = process.env.FROM_EMAIL || 'ALFA PAPER PRODUCTS <onboarding@resend.dev>';

    if (!resendApiKey) {
      console.error('RESEND_API_KEY environment variable is not configured');
      return new Response(JSON.stringify({ error: 'Server email misconfigured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f2ee; margin: 0; padding: 24px; color: #1f2937; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: #399139; padding: 24px 32px; color: #ffffff; }
    .header h1 { margin: 0 0 4px 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
    .header p { margin: 0; font-size: 13px; opacity: 0.9; }
    .content { padding: 32px; }
    .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #399139; margin-bottom: 12px; }
    .table-info { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .table-info td { padding: 10px 12px; border-bottom: 1px solid #f3f4f6; font-size: 14px; }
    .table-info td.label { font-weight: 600; color: #4b5563; width: 35%; background: #fafafa; border-radius: 4px; }
    .table-info td.val { color: #111827; font-weight: 500; }
    .message-box { background: #fafafa; border: 1px solid #e5e7eb; border-left: 4px solid #399139; padding: 16px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #374151; white-space: pre-wrap; margin-bottom: 24px; }
    .actions { text-align: center; margin-top: 24px; }
    .btn { display: inline-block; background: #399139; color: #ffffff !important; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 8px; text-decoration: none; box-shadow: 0 2px 4px rgba(57, 145, 57, 0.2); }
    .footer { background: #f9fafb; padding: 16px 32px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>New Commercial Enquiry</h1>
      <p>ALFA PAPER PRODUCTS Website Lead Notification</p>
    </div>
    <div class="content">
      <div class="section-title">Lead Contact Information</div>
      <table class="table-info">
        <tr>
          <td class="label">Customer Name</td>
          <td class="val"><strong>${escapeHtml(data.name)}</strong></td>
        </tr>
        <tr>
          <td class="label">Company / Brand</td>
          <td class="val">${escapeHtml(data.company_name || 'Individual / Not specified')}</td>
        </tr>
        <tr>
          <td class="label">Phone / Mobile</td>
          <td class="val"><a href="tel:${escapeHtml(data.phone)}" style="color: #399139; font-weight: bold; text-decoration: none;">${escapeHtml(data.phone)}</a></td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="val"><a href="mailto:${escapeHtml(data.email)}" style="color: #399139; text-decoration: none;">${escapeHtml(data.email)}</a></td>
        </tr>
      </table>

      <div class="section-title">Requirement Details</div>
      <table class="table-info">
        <tr>
          <td class="label">Product Interest</td>
          <td class="val"><strong>${escapeHtml(data.product_interest || 'General Enquiry')}</strong></td>
        </tr>
        <tr>
          <td class="label">Estimated Quantity</td>
          <td class="val">${escapeHtml(data.estimated_quantity || 'Not specified')}</td>
        </tr>
        <tr>
          <td class="label">Source Page</td>
          <td class="val">${escapeHtml(data.source_page || 'Website')}</td>
        </tr>
      </table>

      <div class="section-title">Customer Message</div>
      <div class="message-box">${escapeHtml(data.message)}</div>

      <div class="actions">
        <a href="mailto:${escapeHtml(data.email)}?subject=Re:%20ALFA%20PAPER%20PRODUCTS%20Enquiry%20-%20${encodeURIComponent(data.product_interest || 'Packaging')}" class="btn">Reply to Customer (${escapeHtml(data.email)})</a>
      </div>
    </div>
    <div class="footer">
      Sent automatically by ALFA PAPER PRODUCTS Enquiry Notification System via Resend.
    </div>
  </div>
</body>
</html>`;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [adminEmail],
        reply_to: data.email,
        subject: `[New Lead] ${data.product_interest || 'Enquiry'} - ${data.name} (${data.company_name || 'Individual'})`,
        html: htmlContent,
      }),
    });

    const resendData = await resendRes.json();

    if (!resendRes.ok) {
      console.error('Resend API error:', resendData);
      return new Response(JSON.stringify({ error: resendData }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, emailId: resendData.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: error?.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

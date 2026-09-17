const recipients = ['dianapagomez@gmail.com', 'miamihomesbyred@gmail.com'];
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow','POST'); return res.status(405).json({error:'Method not allowed.'}); }
  let origin;
  try { origin = new URL(req.headers.origin).host; } catch { return res.status(403).json({error:'Invalid request origin.'}); }
  if (origin !== req.headers.host) return res.status(403).json({error:'Invalid request origin.'});
  if (!String(req.headers['content-type'] || '').includes('application/json')) return res.status(415).json({error:'Invalid request format.'});
  if (Number(req.headers['content-length']) > 12000) return res.status(413).json({error:'Request too large.'});
  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) return res.status(400).json({error:'Invalid request.'});
  const read = (name, max) => typeof body[name] === 'string' && body[name].length <= max ? body[name].trim() : '';
  const firstName=read('firstName',80),lastName=read('lastName',80),email=read('email',254),phone=read('phone',40),message=read('message',2000);
  if (body.website) return res.status(400).json({error:'Unable to submit this request.'});
  if (!firstName || !lastName || !phone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /[\r\n]/.test(email+firstName+lastName+phone)) return res.status(400).json({error:'Please enter a valid name, email, and phone number.'});
  const key=process.env.MAILGUN_API_KEY,domain=process.env.MAILGUN_DOMAIN;
  if (!key || !domain) return res.status(503).json({error:'Online requests are temporarily unavailable. Please call Diana at 305-794-7294.'});
  const region=process.env.MAILGUN_REGION || 'US';
  if (!['US','EU'].includes(region) || !/^[a-zA-Z0-9.-]+$/.test(domain)) return res.status(503).json({error:'Online requests are temporarily unavailable. Please call Diana at 305-794-7294.'});
  const data=new FormData();
  data.set('from',`13300 Showing Lead <leads@${domain}>`);
  recipients.forEach(to=>data.append('to',to));
  data.set('h:Reply-To',email);
  data.set('subject','New showing request — 13300 SW 99th Terrace');
  data.set('text',`Property: 13300 SW 99th Terrace, Miami, FL 33186\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message || 'No additional message.'}\n\nSubmitted: ${new Date().toISOString()}`);
  data.set('o:tracking','no');
  try {
    const result=await fetch(`https://${region==='EU'?'api.eu.mailgun.net':'api.mailgun.net'}/v3/${domain}/messages`,{method:'POST',headers:{Authorization:`Basic ${Buffer.from(`api:${key}`).toString('base64')}`},body:data,signal:AbortSignal.timeout(12000)});
    if (!result.ok) return res.status(502).json({error:'We couldn’t send your request. Please try again or call Diana at 305-794-7294.'});
    return res.status(200).json({ok:true});
  } catch { return res.status(502).json({error:'We couldn’t send your request. Please try again or call Diana at 305-794-7294.'}); }
};

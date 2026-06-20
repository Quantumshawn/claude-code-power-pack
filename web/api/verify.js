const Stripe = require('stripe');
const payloadBase64 = require('./_payload');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  const sessionId = req.query.session_id;

  if (!sessionId || typeof sessionId !== 'string') {
    res.status(400).send('Missing session_id.');
    return;
  }

  let session;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch (err) {
    res.status(400).send('Invalid or expired session.');
    return;
  }

  if (session.payment_status !== 'paid') {
    res.status(402).send('Payment not completed.');
    return;
  }

  const buffer = Buffer.from(payloadBase64, 'base64');
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename="claude-code-power-pack.zip"');
  res.setHeader('Content-Length', buffer.length);
  res.status(200).send(buffer);
};

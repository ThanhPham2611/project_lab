const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export const paymentMethod = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
      line_items: [{
        price_data: {
          currency: 'VND',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 200000,
        },
        quantity: 2,
      }]
    })
    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.log(err)
    return res.status(401).json({ message: err.message })
  }
}
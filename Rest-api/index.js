global.__basedir = __dirname;
require('dotenv').config()
const dbConnector = require('./config/db');
// const mongoose = require('mongoose');
const apiRouter = require('./router');
const cors = require('cors');
// const config = require('./config/config');
const { errorHandler } = require('./utils');

dbConnector()
  .then(() => {
    const config = require('./config/config');

    const app = require('express')();
    require('./config/express')(app);

    app.use(cors({
      origin: config.origin,
      credentials: true
    }));

    const stripe = require("stripe")("sk_test_51NbNjYKmnZzSdyArmMPr7MJywogz2WsBCMyOej6h20M2d7vwn0K5WzyJyjufRoMWw5stYdsIRt9GNmMsBchimP8V00ki0Fnzvg");

    app.post('/api/checkout', async (req, res, next) => {
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          shipping_address_collection: {
            allowed_countries: ['US', 'CA'],
          },
          shipping_options: [
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 0,
                  currency: 'usd',
                },
                display_name: 'Free shipping',
                // Delivers between 5-7 business days
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 5,
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 7,
                  },
                }
              }
            },
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 1500,
                  currency: 'usd',
                },
                display_name: 'Next day air',
                // Delivers in exactly 1 business day
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 1,
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 1,
                  },
                }
              }
            },
          ],
          line_items: req.body.items.map((item) => ({
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images: [item.product]
              },
              unit_amount: item.price * 100
            },
            quantity: item.quantity
          })),
          mode: 'payment',
          success_url: "http://localhost:3000/success.html",
          cancel_url: "http://localhost:3000/cancel.html",
        });
        
        res.status(200).json(session);
      } catch (error) {
        next(error)
      }
    })
    app.use('/api', apiRouter);

    app.use(errorHandler);

    app.listen(config.port, console.log(`Listening on port ${config.port}!`));
  })
  .catch(console.error); 
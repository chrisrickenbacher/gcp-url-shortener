const functions = require('@google-cloud/functions-framework');
const fs = require('fs');
const providers = require('../lib/providers')


functions.http('urlShortener', async (req, res) => {

  const p = process.env.PROVIDER || 'yaml';

  if (req.method !== 'GET') {
    return res.status(405).send('Method not allowed');
  };

  const redirect = await providers[p](req.params[0])
    .catch((e) => {
      console.error(e)
      fs.readFile(`${__dirname}/../lib/404.html`, 'utf8', (err, data) => {
        if (err) {
          res.status(500).send('Something went wrong')
          console.log({
            short: req.params[0],
            success: false,
            error: 'something went wrong'
          })
          return false
        } else {
          res.status(404).send(data)
          console.log({
            short: req.params[0],
            success: false,
            error: 'unknown short url'
          })
          return true
        }
      })
    })

  console.log(redirect)

  if (!redirect || redirect.size === 0) {
    fs.readFile(`${__dirname}/../lib/404.html`, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Something went wrong')
        console.log({
          short: req.params[0],
          success: false,
          error: 'something went wrong'
        })
        return false
      } else {
        res.status(404).send(data)
        console.log({
          short: req.params[0],
          success: false,
          error: 'unknown short url'
        })
        return true
      }
    })
  } else {
    res.redirect(redirect)
    console.log({
      short: req.params[0],
      success: true,
      target: redirect
    })
    return true
  }
});
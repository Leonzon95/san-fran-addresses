import React from 'react'
import { Box, Card, CardContent, CardActions, Button } from '@material-ui/core'
import { useStyles } from './style'

export const Address = ({ city, state, street_address, zip_code, house }) => {
  const classes = useStyles()
  const { baths, price_cents, beds, days_on_market, market_url, square_feet } = house
  const price = (price_cents / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })

  return (
    <Card className={classes.outerCard}>
      <CardContent>
        <Box className={classes.streetAddress}>
          {street_address}
          <br />
          {city}, {state}
          <br />
          {zip_code}
        </Box>
        Price: {price}
        <br />
        Beds: {beds}
        <br />
        Baths: {baths}
        <br />
        Size: {square_feet} Sq. Ft.
        <br />
        Days on Market: {days_on_market}
      </CardContent>
      <CardActions>
        <Button size='small' color='primary' onClick={() => window.open(market_url, '_blank').focus()}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}

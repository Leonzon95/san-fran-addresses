import React, { useState, useEffect } from 'react'
import { getAddresses } from './services'
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Slider,
  Typography,
  LinearProgress,
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import SearchIcon from '@material-ui/icons/Search'
import { useStyles } from './style'
import { Address } from '../../components/Address/Address'
import { bedsRangeSliderMarks, squareFeetRangeSliderMarks } from '../../utils/constants'

export const AddressesSearch = () => {
  const classes = useStyles()
  const [addresses, setAddresses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('')
  const [bedRange, setBedsRange] = useState([0, 9])
  const [squareFeetRange, setSquareFeetRange] = useState([0, 8000])
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    handleGetAddresses()
  }, [page, sort])

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleGetAddresses()
    }, 1000)

    return () => clearTimeout(timeout)
  }, [bedRange, squareFeetRange])

  const handleGetAddresses = () => {
    // if (isLoading) return
    const getData = async () => {
      setIsLoading(true)
      const query = { q, page, per_page: 25, sort_by: sort, filters: { beds: bedRange, square_feet: squareFeetRange } }
      const data = await getAddresses(query)
      setAddresses(data.addresses)
      setPage(data.page)
      setPages(data.pages)
      setTotalCount(data.total_count)
    }

    getData().then(() => {
      setIsLoading(false)
    })
  }

  return (
    <Box className={classes.outerBox}>
      <Box textAlign='center' fontWeight='900' fontSize='2.5rem' marginBottom='2rem'>
        San Francisco Addresses
      </Box>
      <Box className={classes.searchForm}>
        <Box display='flex' alignItems='center'>
          <TextField
            className={classes.searchInput}
            name='searchTerm'
            label='Search'
            variant='outlined'
            value={q}
            onChange={({ target }) => setQ(target.value)}
            onKeyPress={({ key }) => (key === 'Enter' ? handleGetAddresses() : null)}
          />
          <Button variant='contained' color='primary' className={classes.searchButton} onClick={handleGetAddresses}>
            <SearchIcon style={{ fontSize: '2rem' }} />
          </Button>
        </Box>
        <Box minWidth='10rem'>
          <Typography id='beds-slider' gutterBottom>
            Beds Range
          </Typography>
          <Slider
            value={bedRange}
            onChange={(e, value) => setBedsRange(value)}
            valueLabelDisplay='auto'
            aria-labelledby='beds-slider'
            min={0}
            max={9}
            step={1}
            marks={bedsRangeSliderMarks}
          />
        </Box>
        <Box minWidth='10rem'>
          <Typography id='square-feet-slider' gutterBottom>
            Square Ft Range
          </Typography>
          <Slider
            value={squareFeetRange}
            onChange={(e, value) => setSquareFeetRange(value)}
            valueLabelDisplay='auto'
            aria-labelledby='square-feet-slider'
            min={0}
            max={8000}
            step={50}
            marks={squareFeetRangeSliderMarks}
          />
        </Box>
        <FormControl className={classes.sortInput}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sort}
            onChange={({ target }) => {
              setSort(target.value)
            }}
          >
            <MenuItem value='house.price_cents ASC'>Price: Low to High</MenuItem>
            <MenuItem value='house.price_cents DESC'>Price: High to Low</MenuItem>
            <MenuItem value='house.beds ASC'>Beds: Low to High</MenuItem>
            <MenuItem value='house.beds DESC'>Beds: High to Low</MenuItem>
            <MenuItem value='house.square_feet ASC'>Square Ft: Low to High</MenuItem>
            <MenuItem value='house.square_feet DESC NULLS LAST'>Square Ft: High to Low</MenuItem>
            <MenuItem value='house.days_on_market ASC'>Days on Market: Low to High</MenuItem>
            <MenuItem value='house.days_on_market DESC'>Days on Market: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {isLoading && (
        <Box marginBottom='-0.2rem'>
          <LinearProgress />
        </Box>
      )}
      <Box className={classes.searchForm} fontWeight='600' justifyContent='center !important'>
        Total: {totalCount} Addresses
      </Box>
      {!!addresses.length && (
        <>
          <Box className={classes.addressesGrid}>
            {addresses.map((address, idx) => {
              const { city, state, street_address, house, zip_code } = address
              return (
                <Address
                  key={idx}
                  city={city}
                  state={state}
                  street_address={street_address}
                  zip_code={zip_code}
                  house={house}
                />
              )
            })}
          </Box>
          <Box className={classes.pagination}>
            <Pagination page={page} count={pages} color='primary' onChange={(e, page) => setPage(page)} />
          </Box>
        </>
      )}
    </Box>
  )
}

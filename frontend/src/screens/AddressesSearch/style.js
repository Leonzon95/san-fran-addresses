import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
  outerBox: {
    padding: '1rem',
    background: 'linear-gradient(to right, #4ca2cd, #67B26F)',
    minHeight: '100%',
  },
  addressesGrid: {
    gridColumn: '1 / 3',
    gridRow: '5 / 6',
    display: 'grid',
    gridGap: '1rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
    justifyItems: 'center',
  },
  searchForm: {
    background: '#ffffff',
    marginBottom: '1rem',
    padding: '1rem',
    borderRadius: 4,
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    display: 'flex',
    justifyContent: 'space-between',
  },
  searchButton: {
    marginLeft: '-0.2rem',
    padding: '0.75rem',
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    boxShadow: 'none',
  },
  searchInput: {
    minWidth: '16rem',
  },
  sortInput: {
    minWidth: '12rem',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    background: '#ffffff',
    margin: '1rem 0',
    padding: '1rem',
    borderRadius: 4,
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  },
})

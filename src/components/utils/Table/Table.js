import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: '16px !important',
    fontSize: '15px'
  },
  body: {
    fontSize: '13px',
  },
  root: {
    padding: '4px 16px'
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
 
const useStyles = makeStyles({
  table: {
    minWidth: 700
  },
});

export default function CustomizedTables(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableContainer stickyHeader={true}>
          <Table className={classes.table} aria-label="customized table">
              <TableHead>
                  <TableRow>
                      {props.columns.map(column => {
                          return (
                              <StyledTableCell>{column}</StyledTableCell>
                          )
                      })} 
                  </TableRow>
              </TableHead>
              <TableBody>
                  {props.rows.map((row,index) => (
                      <StyledTableRow key={index}>
                          {row.map(value => ( 
                                  <StyledTableCell>{value}</StyledTableCell>
                              )
                          )}
                      </StyledTableRow>
                  ))} 
              </TableBody>
          </Table>
      </TableContainer>
      {props.rows.length == 0 &&
      <div style={{display: 'flex',alignItems: 'center',justifyContent: "center",height: "100px",fontSize: 18}}>
        <p>Empty Records</p>
      </div>}
    </React.Fragment>
  );
}

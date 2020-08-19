import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as d3 from 'd3';
import expenseData from '../staticData/ExtraExpense.csv';
import XLSX from 'xlsx';

// const outputFilename="";
// const workBook = XLSX.readFile('../staticData/ExtraExpense.xlsx');
// XLSX.writeFile(workBook, outputFilename, { bookType: "csv" });


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(2),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#00acc1',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function CustomizedTables() {
  const classes = useStyles();

  const [extraExpense, setExtraExpense] = React.useState([]);
  React.useEffect(() => {
    let isCancelled = false;
    d3.csv(expenseData).then(function (expenseData) {
      if (!isCancelled) {
        setExtraExpense(expenseData);
      }
    }).catch(function (err) {
      throw err;
    })
    return () => {
      isCancelled = true;
    };
  },[]);

  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2} style={{ backgroundColor: '#191a19', color: '#ffffff' }}>Extra Expense Details</TableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>Month</StyledTableCell>
                <StyledTableCell >Extra Expense</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {extraExpense.map((item,index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{item.Month}</TableCell>
                    <TableCell>{item.Extra_Expense}</TableCell>
                  </TableRow>);
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </>
  );
}

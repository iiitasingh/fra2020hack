import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as d3 from 'd3';
import giftContriData from '../staticData/ChhitijGift.csv';


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

  const [extraContri, setExtraContri] = React.useState([]);
  const [keyNames, setKeyNames] = React.useState([]);

  React.useEffect(() => {
    let isCancelled = false;
    d3.csv(giftContriData).then(function (giftContriData) {
      if (!isCancelled) {
        setExtraContri(giftContriData)
      setKeyNames(Object.keys(giftContriData[0]));
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
                <TableCell colSpan={keyNames.length} style={{ backgroundColor: '#191a19', color: '#ffffff' }}>Extra Expense Details</TableCell>
              </TableRow>
              <TableRow>
                {keyNames.map((item,index)=>{
                  return(<StyledTableCell key={index}>{item}</StyledTableCell>);                  
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {extraContri.map((item,index) => {
                return (
                  <TableRow key={index}>
                  {(Object.keys(item).map((key,index)=>{
                    return(<TableCell key={index}>{item[key]}</TableCell>);
                  }))}
                  </TableRow>);
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </>
  );
}

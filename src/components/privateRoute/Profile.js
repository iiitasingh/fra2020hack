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
import ScrumTab from './ScrumTab'


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    tableWrapper: {
        height: 700,
        position: "relative",
        left: 0,
        top: 0,
        textAlign: "center",
        overflow: 'hidden'
    },
    profileImage: {
        maxWidth: '100%',
    },
    profile: {
        position: 'absolute',
        top: -70,
        left: 50,
        textAlign: 'center'
    },
    profileBox: {
        position: 'relative',
    }
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
            <div className={classes.root} >
                <Paper className={classes.tableWrapper}>
                    <img src={process.env.PUBLIC_URL + '/img/team.jpg'} className={classes.profileImage} />
                </Paper>
                <div className={classes.profileBox}>
                    <Paper className={classes.profile} style={{ padding: 4 }}><img src={process.env.PUBLIC_URL + '/img/user.jpg'} /></Paper>
                </div>
            </div>
            <Paper className={classes.root} style={{marginTop: 150}}>
                <ScrumTab/>
            </Paper>

        </>
    );
}

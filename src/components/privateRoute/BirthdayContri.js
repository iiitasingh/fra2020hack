import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as d3 from 'd3';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import data2019 from '../staticData/2019.csv';
import data2020 from '../staticData/2020.csv';
import XLSX from 'xlsx';

// const workBook = XLSX.readFile('../staticData/');
// XLSX.writeFile(workBook, outputFilename, { bookType: "csv" });

// new code
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(2),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  icon: {
    fill: 'white',
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
  const [birthdayContri, setBirthdayContri] = React.useState([]);

  const [age, setAge] = React.useState("2019");

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    if(event.target.value === 2019){
      setAge(event.target.value);
      d3.csv(data2019).then(function (data) {
          setBirthdayContri(data);
      }).catch(function (err) {
        throw err;
      });
    }
    else {
      setAge(event.target.value);
      d3.csv(data2020).then(function (data) {
          setBirthdayContri(data);
      }).catch(function (err) {
        throw err;
      });
    }
  };

  React.useEffect(() => {
    let isCancelled = false;
    console.log("use effect");
    d3.csv(data2019).then(function (data2019) {
      if (!isCancelled) {
        setBirthdayContri(data2019);
      }
    }).catch(function (err) {
      throw err;
    })
    return () => {
      isCancelled = true;
    };
  }, []);

  // const vari = ({buttonState} == "Pending" ? );
  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell style={{ backgroundColor: '#191a19', color: '#ffffff' }}>Birthday Contribution  (Year)</TableCell>
                <TableCell colSpan={14} style={{ backgroundColor: '#191a19', color: '#ffffff' }}>
                  <FormControl variant="outlined" className={classes.formControl} style={{ width: 150, borderColor: '#ffffff' }}>
                    <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label" style={{ color: '#ffffff' }}>
                      Select Year
                      </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={age}
                      onChange={handleChange}
                      labelWidth={labelWidth}
                      inputProps={{
                        classes: {
                          icon: classes.icon,
                        },
                      }}
                      style={{ color: '#ffffff' }}
                    >
                      <MenuItem value={2019}>2019</MenuItem>
                      <MenuItem value={2020}>2020</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell >Mobile</StyledTableCell>
                <StyledTableCell >Birthday</StyledTableCell>
                <StyledTableCell align="right">January</StyledTableCell>
                <StyledTableCell align="right">February</StyledTableCell>
                <StyledTableCell align="right">March</StyledTableCell>
                <StyledTableCell align="right" >April</StyledTableCell>
                <StyledTableCell align="right">May</StyledTableCell>
                <StyledTableCell align="right">June</StyledTableCell>
                <StyledTableCell align="right">July</StyledTableCell>
                <StyledTableCell align="right">August</StyledTableCell>
                <StyledTableCell align="right">September</StyledTableCell>
                <StyledTableCell align="right">October</StyledTableCell>
                <StyledTableCell align="right">November</StyledTableCell>
                <StyledTableCell align="right">December</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {birthdayContri.map((item, index) => {
                return ((item.Name === 'Carry Over' || item.Name === 'Month Collection' || item.Name === 'Total' || item.Name === 'Spent' || item.Name === 'Remaining' || item.Name === 'Chhitij MarriageGift Contri') ? ((item.Name === 'Chhitij MarriageGift Contri' ? (
                  <TableRow key={index}>
                    <TableCell style={{ backgroundColor: '#78909c', color: '#ffffff' }}>{item.Name}</TableCell>
                    <TableCell style={{ backgroundColor: '#78909c', color: '#ffffff' }}>{item.Ph_No}</TableCell>
                    <TableCell style={{ backgroundColor: '#78909c', color: '#ffffff' }}>{item.DOB}</TableCell>
                    <TableCell align="right" style={{ backgroundColor: '#78909c', color: '#ffffff' }}>{item.January}</TableCell>
                    <TableCell align="right" style={{ backgroundColor: '#78909c', color: '#ffffff' }}>{item.February}</TableCell>
                    <TableCell align="right" style={{ backgroundColor: '#78909c', color: '#ffffff' }}>{item.March}</TableCell>
                    <TableCell align="right" style={{ backgroundColor: '#78909c', color: '#ffffff' }}>{item.April}</TableCell>
                    <TableCell align="right" style={{ backgroundColor: '#78909c', color: '#ffffff' }}>{item.May}</TableCell>
                    <TableCell align="right" style={{ backgroundColor: '#78909c', color: '#ffffff' }}>{item.June}</TableCell>
                    <TableCell align="right" style={{ backgroundColor: '#78909c', color: '#ffffff' }}>{item.July}</TableCell>
                    <TableCell align="right" style={{ backgroundColor: '#78909c', color: '#ffffff' }}>{item.August}</TableCell>
                    <TableCell align="right" style={{ backgroundColor: '#78909c', color: '#ffffff' }}>{item.September}</TableCell>
                    <TableCell align="right" style={{ backgroundColor: '#78909c', color: '#ffffff' }}>{item.October}</TableCell>
                    <TableCell align="right" style={{ backgroundColor: '#78909c', color: '#ffffff' }}>{item.November}</TableCell>
                    <TableCell align="right" style={{ backgroundColor: '#78909c', color: '#ffffff' }}>{item.December}</TableCell>
                  </TableRow>
                ) :
                  (
                    <TableRow key={index}>
                      <TableCell style={{ backgroundColor: '#191a19', color: '#ffffff' }}>{item.Name}</TableCell>
                      <TableCell style={{ backgroundColor: '#ffab91' }}>{item.Ph_No}</TableCell>
                      <TableCell style={{ backgroundColor: '#ffab91' }}>{item.DOB}</TableCell>
                      <TableCell align="right" style={{ backgroundColor: '#ffab91' }}>{item.January}</TableCell>
                      <TableCell align="right" style={{ backgroundColor: '#ffab91' }}>{item.February}</TableCell>
                      <TableCell align="right" style={{ backgroundColor: '#ffab91' }}>{item.March}</TableCell>
                      <TableCell align="right" style={{ backgroundColor: '#ffab91' }}>{item.April}</TableCell>
                      <TableCell align="right" style={{ backgroundColor: '#ffab91' }}>{item.May}</TableCell>
                      <TableCell align="right" style={{ backgroundColor: '#ffab91' }}>{item.June}</TableCell>
                      <TableCell align="right" style={{ backgroundColor: '#ffab91' }}>{item.July}</TableCell>
                      <TableCell align="right" style={{ backgroundColor: '#ffab91' }}>{item.August}</TableCell>
                      <TableCell align="right" style={{ backgroundColor: '#ffab91' }}>{item.September}</TableCell>
                      <TableCell align="right" style={{ backgroundColor: '#ffab91' }}>{item.October}</TableCell>
                      <TableCell align="right" style={{ backgroundColor: '#ffab91' }}>{item.November}</TableCell>
                      <TableCell align="right" style={{ backgroundColor: '#ffab91' }}>{item.December}</TableCell>
                    </TableRow>))
                ) :
                  (
                    <TableRow key={index} hover="true">
                      <TableCell >{item.Name}</TableCell>
                      <TableCell >{item.Ph_No}</TableCell>
                      <TableCell >{item.DOB}</TableCell>
                      <TableCell align="right">{item.January}</TableCell>
                      <TableCell align="right">{item.February}</TableCell>
                      <TableCell align="right">{item.March}</TableCell>
                      <TableCell align="right">{item.April}</TableCell>
                      <TableCell align="right">{item.May}</TableCell>
                      <TableCell align="right">{item.June}</TableCell>
                      <TableCell align="right">{item.July}</TableCell>
                      <TableCell align="right">{item.August}</TableCell>
                      <TableCell align="right">{item.September}</TableCell>
                      <TableCell align="right">{item.October}</TableCell>
                      <TableCell align="right">{item.November}</TableCell>
                      <TableCell align="right">{item.December}</TableCell>
                    </TableRow>)
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </>
  );
}

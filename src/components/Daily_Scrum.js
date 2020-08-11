import 'date-fns';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Scrumdata from './dailyScrum.json';
import TextField from '@material-ui/core/TextField';
import * as moment  from 'moment';


const useStyles1 = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '20%',
    },
}));

const useStyles = makeStyles(theme => ({
    grid: {
        width: '90%',
        marginLeft: '2%',
        flexDirection: 'row'
    },
    root: {
        width: '98%',
        margin: 'auto',
        marginTop: 10,
        marginBottom: 20,
        overflowX: 'auto'
    },
    table: {
        overflowX: 'auto',
        minWidth: 400,
        height: 540
    },
    button: {
        marginRight: theme.spacing(1),
    }
}));

const data = {
    users: {
        wentWell: [
            { id: 101, name: "Ashish", views: "wentWell" },
            { id: 102, name: "sumit", views: "ahdhfdaas" },
            { id: 103, name: "tushar", views: "ahdasdahas" }
        ],
        wentLess: [
            { id: 104, name: "Ashish", views: "ahdhas" },
            { id: 105, name: "sumit", views: "Wentlesswell" },
            { id: 106, name: "tushar", views: "ahdasdahas" }
        ],
        aboutNext: [
            { id: 107, name: "Ashish", views: "ahdhas" },
            { id: 108, name: "sumit", views: "about next" },
            { id: 109, name: "tushar", views: "ahdasdahas" }
        ]
    }
}

function DailyScrum() {
    const classes1 = useStyles1();
    const classes = useStyles();
    const [dailyscrumdata, setdailyscrumdata] = React.useState(Scrumdata);
    const [values, setValues] = React.useState({
        teamName: '',
        key: 0,
        scrumDate: '',
        dateIndex: 0
    });
    const [dailyStatus, setDailyStatus] = React.useState({
        member: '',
        key: 0,
        date: new Date(),
        yesterday: '',
        today: '',
        blocker: '',
    });

    const [state1, setState1] = useState({
        head: 'Yesterday',
        id: 0,
        emoji: 'smile',
        name: 'Swapnil',
        view: '',
        users: data.users.wentWell,
    });
    const [state2, setState2] = useState({
        head: 'Today',
        id: 0,
        emoji: 'future',
        name: 'Swapnil',
        view: '',
        users: data.users.wentLess,
    });
    const [state3, setState3] = useState({
        head: 'Blockers',
        id: 0,
        emoji: 'sad',
        name: 'Swapnil',
        view: '',
        users: data.users.aboutNext
    });

    const Pad = {
        paddingRight: 16,
    }

    function handleDateChange(date) {
        const beginDate = moment(date).format('YYYY-MM-DD');
        setDailyStatus({ date: beginDate });
    }
    const handleTeamChange = (event, key) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value, key: key.key, scrumDate: dailyscrumdata[key.key].statusDate[0].date,
            dateIndex: 0
        });
    }
    const dailyStatusChange = (event, key) => {
        setDailyStatus({
            ...dailyStatus,
            [event.target.name]: event.target.value
        });
    }

    const dailyStatusMemberChange = (event, key) => {
        setDailyStatus({
            ...dailyStatus,
            [event.target.name]: event.target.value, key: key.key
        });
    }
    const AddScrum = (event, key) => {
        if (dailyStatus.member.length > 0 && dailyStatus.yesterday.length > 0 && dailyStatus.today.length >0 && dailyStatus.blocker.length >0) {
            const viewArray = dailyscrumdata[0].statusDate[0].status.slice();
            let length = dailyscrumdata[0].statusDate[0].status.length;
            const id = dailyscrumdata[0].statusDate[0].status[length - 1].statusId + 1;
            const newView = {
                id: id,
                memberName: dailyStatus.member,
                yesterday: dailyStatus.yesterday,
                today: dailyStatus.today,
                blocker: dailyStatus.blocker,
            };

            viewArray.push(newView);
            console.log(viewArray);
            setdailyscrumdata({ ...dailyscrumdata, status: viewArray})
        } else{
            alert('Fill all fields.');
        }
    }
    const handleDate = (event, key) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value, dateIndex: key.key
        });
    }

    return (
        <Paper className={classes1.paper}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container className={classes.grid} >
                    <FormControl className={classes1.formControl} style={{ marginTop: 16 }}>
                        <InputLabel htmlFor="age-simple">Team name</InputLabel>
                        <Select
                            value={values.teamName}
                            onChange={handleTeamChange}
                            inputProps={{
                                name: 'teamName',
                                id: 'age-simple',
                            }}
                        >
                            {dailyscrumdata.map((Teamname, index) => {
                                return (
                                    <MenuItem value={Teamname.teamName} key={index}>{Teamname.teamName}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <FormControl className={classes1.formControl} style={{ marginTop: 16, marginLeft: '2%' }}>
                        <InputLabel htmlFor="date-simple">Select Date</InputLabel>
                        <Select
                            value={values.scrumDate}
                            onChange={handleDate}
                            inputProps={{
                                name: 'scrumDate',
                                id: 'date-simple',
                            }}
                        >
                            {dailyscrumdata[values.key].statusDate.map((dates, index) => {
                                return (
                                    <MenuItem value={dates.date} key={index}>{dates.date}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <KeyboardDatePicker
                        margin="normal"
                        id="mui-pickers-date"
                        label="Pick daily scrum date"
                        value={dailyStatus.date}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        style={{ width: '20%', marginLeft: '2%' }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <Paper className={classes.root} style={{ height: 540 }}>
                <table className="table table-bordered" style={{ marginBottom: 0 }}>
                    <thead>
                        <tr className="thead-light" style={{ textAlign: "center" }}>
                            <th style={{ width: "25%" }}>Member Name</th>
                            <th style={{ width: "25%" }}>Yesterday</th>
                            <th style={{ width: "25%" }}>Today</th>
                            <th style={{ width: "25%" }}>Blockers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dailyscrumdata[values.key].statusDate[values.dateIndex].status.map((status, index) => {
                            return (
                                <>
                                    <tr key={index}>
                                        <td>{status.memberName}</td>
                                        <td>{status.yesterday}</td>
                                        <td>{status.today}</td>
                                        <td>{status.blocker}</td>
                                    </tr>
                                </>
                            );
                        })}
                    </tbody>
                </table>
            </Paper>
            <Paper className={classes.root}>
                <table className="table" style={{ marginBottom: 0 }}>
                    <thead>
                        <tr className="thead-dark">
                            <th colSpan={3} style={{ width: "25%", textAlign: "left" }}>Add today's status</th>
                            <th style={{ width: "25%", textAlign: "right" }}><Button variant="contained" href="#contained-buttons" onClick={AddScrum} className={classes.button}>Add</Button></th>
                        </tr>
                        <tr className="thead-light" style={{ textAlign: "center" }}>
                            <th style={{ width: "25%" }}>Member Name</th>
                            <th style={{ width: "25%" }}>Yesterday</th>
                            <th style={{ width: "25%" }}>Today</th> 
                            <th style={{ width: "25%" }}>Blockers</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <FormControl className={classes1.formControl} style={{ width: "100%", paddingRight: "3%" }}>
                                    <InputLabel htmlFor="memberList1">Team name</InputLabel>
                                    <Select
                                        value={dailyStatus.member}
                                        onChange={dailyStatusMemberChange}
                                        inputProps={{
                                            name: 'member',
                                            id: 'memberList1',
                                            key: 0
                                        }}
                                    >
                                        {dailyscrumdata[values.key].statusDate[values.dateIndex].status.map((status, index) => {
                                            return (
                                                <MenuItem value={status.memberName} key={index}>{status.memberName}</MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </td>
                            <td><TextField
                                id="outlined-multiline-flexible"
                                label="Yesterday"
                                multiline
                                rowsMax="3"
                                name="yesterday"
                                value={dailyStatus.yesterday}
                                onChange={dailyStatusChange}
                                style={{ width: '100%', marginRight: -8, marginTop: 8 }}
                                className={""}
                                margin="normal"
                                inputProps={{
                                    fontSize: 8,
                                    maxLength: 140
                                }}
                                variant="outlined"
                            /></td>
                            <td><TextField
                                id="outlined-multiline-flexible"
                                label="Today"
                                multiline
                                rowsMax="3"
                                name="today"
                                value={dailyStatus.today}
                                onChange={dailyStatusChange}
                                style={{ width: '100%', marginRight: -8, marginTop: 8 }}
                                className={""}
                                margin="normal"
                                inputProps={{
                                    fontSize: 8,
                                    maxLength: 140
                                }}
                                variant="outlined"
                            /></td>
                            <td><TextField
                                id="outlined-multiline-flexible"
                                label="Blockers"
                                multiline
                                rowsMax="3"
                                name="blocker"
                                value={dailyStatus.blocker}
                                onChange={dailyStatusChange}
                                style={{ width: '100%', marginRight: -8, marginTop: 8 }}
                                className={""}
                                margin="normal"
                                inputProps={{
                                    fontSize: 8,
                                    maxLength: 140
                                }}
                                variant="outlined"
                            /></td>
                        </tr>
                    </tbody>
                </table>
            </Paper>
        </Paper>
    );
}

export default DailyScrum;

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
import * as moment from 'moment';


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
        minWidth: '100%',
    },
}));

const useStyles = makeStyles(theme => ({
    grid: {
        width: '98%',
        marginLeft: '0%',
        marginRight: '2%',
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
    },
    resize:{
        minHeight: '500px',
    },    

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
        if (dailyStatus.member.length > 0 && dailyStatus.yesterday.length > 0 && dailyStatus.today.length > 0 && dailyStatus.blocker.length > 0) {
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
            setdailyscrumdata({ ...dailyscrumdata, status: viewArray })
        } else {
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
                <Grid container spacing={3} className={classes.grid}>
                    <Grid item xs={12} sm={6}>
                        <FormControl className={classes1.formControl} style={{ marginTop: 16 }}>
                            <InputLabel htmlFor="age-simple">Select Model</InputLabel>
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl className={classes1.formControl} style={{ marginTop: 16, marginLeft: '2%' }}>
                            <InputLabel htmlFor="date-simple">Select Image Child</InputLabel>
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
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl className={classes1.formControl} style={{ marginLeft: '2%'}}>
                        <TextField id="standard-basic" label="Model Environment Name" />
                        </FormControl>
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>
            <Paper className={classes.root} >
                <table className="table " style={{ marginBottom: 0 }}>
                    <thead >
                        <tr className="thead-dark">
                            <th colSpan={2}>Edit Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label=""
                                    multiline
                                    rows={15}
                                    defaultValue="Edit Image"
                                    variant="outlined"
                                    style={{ margin: '10px', minWidth: '98%' }}
                                    inputProps={{
                                        classes: {
                                            input: classes.resize,
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr className="thead-light">
                            <th style={{ width: "25%", textAlign: "left" }}></th>
                            <th style={{ width: "25%", textAlign: "right" }}><Button variant="contained" href="#contained-buttons" onClick={AddScrum} className={classes.button}>Publish to Git</Button></th>
                        </tr>
                    </tbody>
                </table>
            </Paper>

        </Paper>
    );
}

export default DailyScrum;

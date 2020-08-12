import 'date-fns';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import modelDATA from './modelData.json';


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
    resize: {
        minHeight: '500px',
    },

}));

function Page2() {
    const classes1 = useStyles1();
    const classes = useStyles();
    const [modelData, setModelData] = useState(modelDATA);
    const [values, setValues] = useState({
        name: '',
        key: 0,
        child: '',
        childIndex: 0,
        env: '',
        desc: ''
    });


    const handleModelChange = (event, key) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value, key: key.key, child: modelData[key.key].child[0].name,
            env: modelData[key.key].child[0].Environment, desc: modelData[key.key].child[0].description
        });
    }
    const handleChild = (event, key) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value, childIndex: key.key, env: modelData[values.key].child[key.key].Environment,
            desc: modelData[values.key].child[key.key].description
        });
    }

    const handleChildDesc = (e, key) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const saveDockerFile = () => {
        console.log(values.name + ": name")
        console.log(values.child + ": child")
        console.log(values.desc + ": desc")

        const url = 'https://bolbconnectivitydemo.azurewebsites.net/api/writeToBlob?container_name=' + values.name + '&blob_name=' + values.child + '.txt';
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(values.desc),
            body: JSON.stringify(updatedChild.description),
            mode: 'cors',
            headers: {
                "Access-Control-Allow-Origin": '*',
                "Content-Type": "text/xml",
            }
        };

        fetch(url, requestOptions)
            .then(response => {
                if (response.status == 200) {
                    alert("Docker file saved successfully");
                }
                else {
                    alert("Docker file not saved.Please check");
                }
            })
            .then(data => {
                console.log(data);
            });
    };

    return (
        <Paper className={classes1.paper}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={3} className={classes.grid}>
                    <Grid item xs={12} sm={6}>
                        <FormControl className={classes1.formControl} style={{ marginTop: 16 }}>
                            <InputLabel htmlFor="age-simple">Select Risk Lab Model</InputLabel>
                            <Select
                                value={values.name}
                                onChange={handleModelChange}
                                inputProps={{
                                    name: 'name',
                                    id: 'age-simple',
                                }}
                            >
                                {modelData.map((modelName, index) => {
                                    return (
                                        <MenuItem value={modelName.name} key={index}>{modelName.name}</MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl className={classes1.formControl} style={{ marginTop: 16, marginLeft: '2%' }}>
                            <InputLabel htmlFor="date-simple">Select  Production Base Image</InputLabel>
                            <Select
                                value={values.child}
                                onChange={handleChild}
                                inputProps={{
                                    name: 'child',
                                    id: 'date-simple',
                                }}
                            >
                                {modelData[values.key].child.map((childs, index) => {
                                    return (
                                        <MenuItem value={childs.name} key={index}>{childs.name}</MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl className={classes1.formControl} style={{ marginLeft: '2%' }}>
                            <TextField id="standard-basic" label="Model Docker Image Name" value={values.env} name="env" onChange={handleChildDesc} />
                        </FormControl>
                    </Grid>
                </Grid>
            </MuiPickersUtilsProvider>
            <Paper className={classes.root} >
                <table className="table " style={{ marginBottom: 0 }}>
                    <thead >
                        <tr className="thead-dark">
                            <th colSpan={2}>Edit Model Docker File</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={2}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label=""
                                    multiline
                                    name="desc"
                                    rows={15}
                                    value={values.desc}
                                    variant="outlined"
                                    style={{ margin: '10px', minWidth: '98%' }}
                                    inputProps={{
                                        classes: {
                                            input: classes.resize,
                                        }
                                    }}
                                    onChange={handleChildDesc}
                                />
                            </td>
                        </tr>
                        <tr className="thead-light">
                            <th style={{ width: "25%", textAlign: "left" }}></th>
                            <th style={{ width: "25%", textAlign: "right" }}><Button variant="contained" href="#" onClick={saveDockerFile} className={classes.button}>Publish to Git</Button></th>
                        </tr>
                    </tbody>
                </table>
            </Paper>

        </Paper>
    );
}

export default Page2;

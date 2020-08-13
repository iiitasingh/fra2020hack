import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import modelDATA from './modelData.json';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import EditIcon from '@material-ui/icons/Edit';


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
    margin: 10,
    minWidth: '30%',
  },
  formControl1: {
    margin: 10,
    minWidth: '100%',
  },
}));

const useStyles = makeStyles(theme => ({
  grid: {
    width: '100%',
    marginLeft: '0%',
    marginRight: '2%',
    flexDirection: 'row'
  },
  grid1: {
    width: '98%',
    marginLeft: '0%',
    marginRight: '2%',
    flexDirection: 'row'
  },
  root: {
    width: '98%',
    margin: 'auto',
  },
  table: {
    minWidth: 700,
  },
  button: {
    marginRight: theme.spacing(1),
  },
  paper: {
    width: '100%',
  },
  box1: {
    paddingTop: 0,
    paddingRight: 4,
    paddingBottom: 0,
    paddingLeft: 0,
    height: 400,
    overflow: 'auto'
  },
  box2: {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 4,
    height: 400,
    overflow: 'auto'
  }
}));

export default function CustomizedTables() {
  const classes = useStyles();
  const classes1 = useStyles1();

  const [modelData, setModelData] = useState(modelDATA);
  const [model, setModel] = useState(
    {
      id: 0,
      name: '',
      description: '',
      author: '',
      size: 0,
      date: '',
      child: []
    });
  const [child, setChild] = useState(
    {
      id: 0,
      name: '',
      description: '',
      environment: '',
      url: ''
    });

  const [updatedChild, setUpdatedChild] = useState(
    {
      id: 0,
      name: '',
      description: '',
      environment: '',
      url: ''
    });

  const [values, setValues] = useState({
    name: '',
    key: 0,
    child: '',
    childIndex: 0,
    env: '',
    desc: '',
    check: false
  });

  const handelModel = (event) => {
    const m = event.target.getAttribute('data-item');
    // console.log(m);
    // setSelectedModel(modelData[m]);
    setModel(modelData[m]);
    setValues({ ...values, name: modelData[m].name, key: modelData[m].id, check: true })
  }
  const handelChild = (childId) => (event) => {
    // console.log(childId);
    setChild(model.child[childId]);
    setUpdatedChild(model.child[childId]);
  }

  const handelNewChild = (modelId) => (event) => {
    // console.log(modelId);
    // console.log(model.child.length);
    setChild({
      ...child, id: model.child.length,
      name: model.name,
      description: model.description,
      environment: 'PRD',
      url: 'http://github.com'
    });
    setUpdatedChild({
      ...updatedChild, id: model.child.length,
      name: model.name,
      description: model.description,
      environment: 'PRD',
      url: 'http://github.com'
    });

  }

  const handleChildChange = (e) => {
    //console.log(e.target.value);
    setUpdatedChild({ ...updatedChild, [e.target.name]: e.target.value });
  }

  const saveDockerFile = () => {
    console.log(model.name + ": name")
    console.log(updatedChild.name + ": child")
    console.log(updatedChild.description + ": desc")

    const url = 'https://bolbconnectivitydemo.azurewebsites.net/api/writeToBlob?container_name=' + model.name + '&blob_name=' + updatedChild.name + '.txt';
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(updatedChild.description),
      headers: {
        "Access-Control-Allow-Origin": '*',
        "Content-Type": "text/xml",
        }
    };

    fetch(url, requestOptions)
      .then(response => {
        if (response.status === 200) {
          alert("Docker file saved successfully");
        }
        else {
          alert("Docker file not saved.Please check");
        }
      })
      .then(data => {
        console.log(data)
      });
  };

  return (
    <Paper className={classes.paper}>
      <Paper className={classes.root} >
        <Grid container spacing={2} className={classes.grid}>
          <Grid item xs={12} sm={6}
            style={{
              paddingTop: 0,
              paddingLeft: 0,
              paddingBottom: 0,
              paddingRight: 4,
              height: 400,
              overflow: 'auto'
            }}>
            <Paper variant="outlined" style={{ overflow: 'auto' }}>
              <table className="table table-hover" style={{ marginBottom: 0 }}>
                <thead className="thead-dark">
                  <tr>
                    <th>Risk Lab Base Images</th>
                  </tr>
                </thead>
                <tbody>
                  {modelData.map((model, index) => {
                    return (
                      <tr key={index} >
                        <td data-item={model.id} onClick={handelModel}>{model.name}</td>
                      </tr>);
                  })}
                </tbody>
              </table>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}
            style={{
              paddingTop: 0,
              paddingLeft: 4,
              paddingBottom: 0,
              paddingRight: 0,
              height: 400,
              overflow: 'auto'
            }}>
            <Paper variant="outlined" style={{ overflow: 'auto' }}>
              <table className="table table-hover" style={{ marginBottom: 0 }}>
                <thead className="thead-dark">
                  <tr>
                    <th>Production Base Images</th>
                    <th style={{ textAlign: 'right', padding: 4 }}>
                      {
                        values.check ? (<Button variant="contained" href="#" onClick={handelNewChild(model.id)} className={classes.button} size="small">New</Button>) : (<></>)
                      }
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {model.child.map((childImg, index) => {
                    return (
                      <tr key={index}>
                        <td>{childImg.name} </td>
                        <td style={{ textAlign: 'right', paddingBottom: 6, paddingTop: 6 }} onClick={handelChild(childImg.id)}><EditIcon /></td>
                      </tr>);
                  })}
                </tbody>
              </table>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.root} style={{ marginTop: 30 }} >
        <Grid container spacing={2} className={classes.grid1}>
          <Grid item xs={6} sm={3}>
            <FormControl className={classes1.formControl1} >
              <TextField
                id="outlined-read-only-input"
                label=""
                value={child.name}
                InputProps={{
                  readOnly: true,
                  style: {
                    backgroundColor: '#F5F5F5'
                  }
                }}
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3}></Grid>
          <Grid item xs={6} sm={3}>
            <FormControl className={classes1.formControl1} >
              <TextField
                required
                id="outlined-required"
                label="Production Base Image Name"
                name='name'
                value={updatedChild.name}
                variant="outlined"
                onChange={handleChildChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormControl className={classes1.formControl1} >
              <TextField
                required
                id="outlined-required_1"
                label="Docker Registry URL"
                name='url'
                value={updatedChild.url}
                variant="outlined"
                onChange={handleChildChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} style={{ paddingTop: 0 }}>
            <FormControl className={classes1.formControl1} >
              <TextField
                id="outlined-multiline-static"
                label=""
                multiline
                rows={30}
                value={child.description}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                  style: {
                    backgroundColor: '#F5F5F5'
                  }
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} style={{ paddingTop: 0 }}>
            <FormControl className={classes1.formControl1} >
              <TextField
                id="outlined-multiline-static_1"
                label=""
                multiline
                rows={30}
                name='description'
                value={updatedChild.description}
                variant="outlined"
                inputProps={{
                  classes: {
                    input: classes.resize,
                  }
                }}
                onChange={handleChildChange}
              />
            </FormControl>
          </Grid>
        </Grid>
        <table className="table " style={{ marginBottom: 0 }}>
          <tbody>
            <tr className="thead-light">
              <th style={{ textAlign: "center" }}><Button variant="contained" onClick={saveDockerFile}>Publish To Git</Button></th>
            </tr>
          </tbody>
        </table>
      </Paper>
    </Paper>
  );
}

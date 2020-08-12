import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { ResponsiveBar } from '@nivo/bar';
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
    margin: theme.spacing(1),
    minWidth: '30%',
  },
  formControl1: {
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
  }
}));

export default function CustomizedTables() {
  const classes = useStyles();
  const classes1 = useStyles1();

  const [modelData, setModelData] = useState(modelDATA);
  const [selectedModel, setSelectedModel] = useState(modelDATA[0]);
  const [selectedChild, setSelectedChild] = useState(selectedModel.child[0]);

  const handelModel = (event) => {
    const m = event.target.getAttribute('data-item');
    console.log(m);
    setSelectedModel(modelData[m]);
  }
  const handelChild = (event) => {
    const id = event.target.getAttribute('child_id');
    console.log(id);
    setSelectedChild(selectedModel.child[id]);
  }
  const handleSave=()=>{
    // const m = selectedModel.id;
    // const i = selectedChild.id;
    // setSelectedModel({...selectedModel.child[i], name: selectedChild.name, description: selectedChild.description});
    // setModelData({...modelData[m], child: selectedModel.child})
  }
  const handleChildChange = (e) =>{
      console.log(e.target.value);
      setSelectedChild({...selectedChild, [e.target.name] : e.target.value});
  }

  return (
    <Paper className={classes.paper}>
      <Paper className={classes.root} >
        <Grid container spacing={2} className={classes.grid}>
          <Grid item xs={12} sm={6} style={{ padding: 0, height: 400, overflow: 'auto' }}>
            <table className="table table-bordered table-hover" style={{ marginBottom: 0 }}>
              <thead className="thead-dark">
                <tr>
                  <th colSpan={2} >Models</th>
                </tr>
              </thead>
              <tbody>
                {modelData.map((model, index) => {
                  return (
                    <tr key={index} >
                      <td data-item={model.id} onClick={handelModel}>{model.name}</td>
                      <td style={{ textAlign: 'right', paddingBottom: 6, paddingTop: 6 }}><Button variant="contained" href="#" className={classes.button}>New</Button></td>
                    </tr>);
                })}
              </tbody>
            </table>
          </Grid>
          <Grid item xs={12} sm={6} style={{ padding: 0, height: 400, overflow: 'auto' }}>
            <table className="table table-hover" style={{ marginBottom: 0 }}>
              <thead className="thead-dark">
                <tr>
                  <th>Child</th>
                </tr>
              </thead>
              <tbody>
              {selectedModel.child.map((childImg, index) => {
                  return (
                    <tr key={index} >
                      <td child_id={childImg.id} onClick={handelChild}>{childImg.name}</td>
                      <td style={{ textAlign: 'right', paddingBottom: 6, paddingTop: 6 }}><EditIcon/></td>
                    </tr>);
                })}
              </tbody>
            </table>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.root} style={{ marginTop: 30 }} >
        <Grid container spacing={2} className={classes.grid1}>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes1.formControl} >
              <TextField
                id="outlined-read-only-input"
                label=""
                value={selectedChild.name}
                InputProps={{
                  readOnly: true,
                  style:{
                    backgroundColor:'#F5F5F5'
                  }
                }}
                variant="outlined"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl className={classes1.formControl} >
              <TextField
                required
                id="outlined-required"
                label="Editable"
                name='name'
                value={selectedChild.name}
                variant="outlined"
                onChange={handleChildChange}
              />
            </FormControl>
            <FormControl className={classes1.formControl} >
              <TextField
                required
                id="outlined-required"
                label="Editable URL"
                name='name'
                value={selectedChild.name}
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
                value={selectedChild.description}
                variant="outlined"
                style={{ margin: '10px', minWidth: '100%' }}
                InputProps={{
                  readOnly: true,
                  style:{
                    backgroundColor:'#F5F5F5'
                  }
                }}
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
                name='description'
                value={selectedChild.description}
                variant="outlined"
                style={{ margin: '10px', minWidth: '100%' }}
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
              <th style={{ textAlign: "center" }}><Button variant="contained" onClick={handleSave}>Save</Button></th>
            </tr>
          </tbody>
        </table>
      </Paper>
    </Paper>
  );
}

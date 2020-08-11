import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FolderIcon from '@material-ui/icons/Folder';
import SaveIcon from '@material-ui/icons/Save';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { DOCIMAGES } from './comments';

const styles = theme => ({
    root: {
      minWidth: 275,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    titleList: {
    margin: theme.spacing(4, 0, 2),
    },
    button: {
        margin: theme.spacing(1),
    },
    textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    },
    resize:{
        height:250,
        width:400,
        wordwrap:'break-word',
    },
  });

  class PageOne extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedItem : null,
            editedText : null,
            comments : DOCIMAGES,
            checkedA: false,
        }
    }

    render(){
        const { classes} = this.props;
        const {dense} = "true";

        const handleChange = (event) => {
            this.setState({ ...this.state, [event.target.name]: event.target.checked });
        };

        const display = this.state.comments.map((item,i) => {
            return(
                <div key={item.id}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText key={i}
                            primary = {item.name}
                        />
                        <ListItemSecondaryAction>
                        <FormGroup row>
                            <FormControlLabel
                                control={<Checkbox checked={this.state.checkedA} onChange={handleChange} name="checkedA" />}
                            />
                        </FormGroup>
                        </ListItemSecondaryAction>
                    </ListItem>
                </div>
            );
        } )

        return(
            <div>
                <Container fixed>
                    <div>
                        <div className={classes.demo}>
                            <List dense={dense}>
                                {display}
                            </List>
                        </div>
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField id="outlined-basic" variant="outlined"
                                value="Domino_Analytics_Distribution"   
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField id="outlined-basic" label="Docker Edited Image" variant="outlined" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                        id="outlined-uncontrolled"
                                        label="Docker Base Image"
                                        name="message"
                                        value="Word of the Day 
                                        well meaning and kindly."//{this.props.stateVar.message}
                                        className={classes.textField}
                                        //onChange={(this.props.stateVar.flip)?this.props.handleStateChange:null}
                                        margin="normal"
                                        wordwrap="hard"
                                        variant="outlined"
                                        InputProps={{
                                            classes: {
                                            input: classes.resize,
                                            },
                                        }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                                <TextField
                                        id="outlined-uncontrolled"
                                        label="Docker Edited Image"
                                        name="message"
                                        value="Word of the Day 
                                        well meaning and kindly."//{this.props.stateVar.message}
                                        className={classes.textField}
                                        //onChange={(this.props.stateVar.flip)?this.props.handleStateChange:null}
                                        margin="normal"
                                        wordwrap="hard"
                                        variant="outlined"
                                        InputProps={{
                                            classes: {
                                            input: classes.resize,
                                            },
                                        }}
                                />
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>
                </Container>
            </div>
        );
    }
}
PageOne.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  
export default withStyles(styles)(PageOne);
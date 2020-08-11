import React, { useState } from 'react';
import { fade } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import AddButton from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600
    },
    search: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        position: 'relative',
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 600,
        },
    },

}));

const useStyles2 = makeStyles(theme => ({
    root: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: '100%',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    }
}));

const useStyles1 = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        margin: theme.spacing(2)
    },
    iconHover: {
        margin: theme.spacing(2),
        "&:hover": {
            color: red[800]
        }
    }
}));


export default function RecipeReviewCard(props) {
    const classes = useStyles();
    const classes1 = useStyles1();
    const classes2 = useStyles2();

    const [change, checkChange] = useState(false);

    const handleChange = e => {
        checkChange(true);
        let { name, value } = e.target;
        props.data[1]({ ...props.data[0], [name]: value })
    }

    const handleClick = () => {
        if (change) {
            const viewArray = props.data[0].users.slice();
            let length = props.data[0].users.length;
            const id = props.data[0].users[length - 1].id + 1;
            const newView = {
                id: id,
                name: props.data[0].name,
                views: props.data[0].view,
            };
            viewArray.push(newView);
            props.data[1]({ ...props.data[0], users: viewArray, view: '' })
            checkChange(false);
            console.log(props.data[0].users);
        } else {
            alert('Write your comment first');
        }
    };

    return (
        <Card className={classes.card}>
            <CardContent style={{ padding: 0 }}>
                <div className={classes.search} style={{ margin: 0 }}>
                    <div className={classes2.root}>
                        <AddButton color="error" onClick={handleClick} className={classes1.iconHover} style={{ marginRight: 7, marginLeft: 10 }} />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Your views..."
                            multiline
                            rowsMax="3"
                            name="view"
                            value={props.data[0].view}
                            style={{ width: '100%', marginRight: 10, marginLeft: 8, marginTop:8}}
                            onChange={handleChange}
                            className={classes2.textField}
                            margin="normal"
                            inputProps={{
                                fontSize: 8,
                                maxLength: 140
                            }}
                            variant="outlined"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

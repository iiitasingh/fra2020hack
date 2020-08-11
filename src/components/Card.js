import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Highlight from '@material-ui/icons/Highlight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Well from '@material-ui/icons/SentimentVerySatisfied';
import Lesswell from '@material-ui/icons/SentimentDissatisfied';
import ThumbsUpOutlined from '@material-ui/icons/ThumbUpOutlined';
import ThumbsUp from '@material-ui/icons/ThumbUp';
import Puzzle from '@material-ui/icons/Extension';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles1 = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    icon: {
        margin: theme.spacing(2),
    },
    iconHover: {
        margin: theme.spacing(2),
        '&:hover': {
            color: red[800],
        },
    },
}));
const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        height: 700,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));


const back = {
    backgroundColor: '#eeeeee',
}

const bar = {
    background: 'linear-gradient(45deg, #293f9e 50%, #e21212 50%)',
    width: 10,
    padding: 0,
    margin: 0
}


const useStyles2 = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
    },
    paper: {
        maxWidth: '100%',
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
}));

export default function RecipeReviewCard(props) {
    const classes = useStyles();
    const classes1 = useStyles1();
    const classes2 = useStyles2();
    const [expanded, setExpanded] = React.useState(false);

    function handleExpandClick() {
        setExpanded(!expanded);
    }

    const [thumb, setThumb] = React.useState({
        Thumb: ThumbsUpOutlined,
        like: false
    })
    const likedView = (event) => {
        console.log(event);
        if (!thumb.like) {
            setThumb({
                Thumb: ThumbsUp,
                like: true
            });
        } else {
            setThumb({
                Thumb: ThumbsUpOutlined,
                like: false
            });
        }
    }

    function emojis(data) {

        if (data.emoji === 'smile') {
            return (<Well color="error" className={classes1.iconHover} />);
        }
        else if (data.emoji === 'think') {
            return (<Puzzle color="error" className={classes1.iconHover} />);
        }
        else if (data.emoji === 'sad') {
            return (<Lesswell color="error" className={classes1.iconHover} />);
        }
        else if (data.emoji === 'future') {
            return (<Highlight color="error" className={classes1.iconHover} />);
        }
    }

    const newUser = props.data[0].users.map((user, index) => {
        return (
            <Paper className={classes2.paper} key={user.id}>
                <Grid container wrap="nowrap" spacing={2} style={{ margin: -16 }}>
                    <Grid item style={bar} />
                    <Grid item xs zeroMinWidth >
                        <Typography noWrap style={{ fontSize: 13}}>{user.views}</Typography>
                        <CardActions disableSpacing style={{ paddingBottom: 0 }}>
                            <thumb.Thumb color="error" className={classes1.iconHover} style={{ margin: 0 }} onClick={likedView} />
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="Show more"
                                style={{ padding: 0 }}
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardActions disableSpacing>
                                <Well color="error" className={classes1.iconHover} style={{ marginBottom: 0 }} />
                            </CardActions>
                        </Collapse>
                    </Grid>
                </Grid>
            </Paper>);
    });

    return (
        <Card className={classes.card}>
            <CardHeader style={back}
                titleTypographyProps={{ variant: 'h6'}}
                title={props.data[0].head}
                action={emojis(props.data[0])} />
            <CardContent style={{ overflow: 'auto', maxHeight: 600 }}>
                {newUser}
            </CardContent>
        </Card>
    );
}

import AppBar from '@material-ui/core/AppBar';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
const styles = theme=> ({
    App_title: {
        color: '#FFFFFF',
        padding: '3px',
        marginTop: '0px',
        marginLeft: '2%'
    },
    appBar: {
        backgroundColor: 'rgba(90, 206, 179,0.4)'
    },
    form_div: {
    },
    form_Paper: {
        backgroundColor: 'rgba(255, 255, 255,0.07)',
        marginTop: '5%',
        color: '#ffffff',
        
    },
    file_input: {
        display: 'none'
    },
    file_input_button: {
        color: '#ffffff',
        backgroundColor: 'rgba(255, 255, 255,0.5)'
    }
})
class Form extends Component{
    render(){
        const { classes } = this.props;
        return(
            <React.Fragment>
                <AppBar position="static" className={classes.appBar}>
                    <Typography variant="h4" className={classes.App_title}>
                        FPS-Booster
                    </Typography>
                </AppBar>
                <Grid container spacing={24} justify="center">
                    <Grid item xs={6}>
                        <Paper className={classes.form_Paper}>
                            <input id="raised-button-file" type="file" className={classes.file_input}/> 
                            <label htmlFor="raised-button-file">
                            Select video....
                                <Button raised="true" component="span" className={classes.file_input_button}> 
                                    Upload 
                                </Button> 
                            </label> 
                        </Paper>
                    </Grid>
                    
                </Grid>    
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Form);
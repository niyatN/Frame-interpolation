import React, { Component } from 'react';

//------------------- Material ui----------------------
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

// ------------------For Request Axios----------------
import axios from 'axios';


// import fileDownload from 'js-file-download'
var fileDownload = require('js-file-download')

const styles = theme=> ({
    App_title: {
        color: '#FFFFFF',
        padding: '3px',
        paddingLeft: '2%'
    },
    appBar: {
        backgroundColor: 'rgba(90, 206, 179,0.4)'
    },
    form_Paper: {
        backgroundColor: 'rgba(255, 255, 255,0.3)',
        paddingTop: '5%',
        marginTop: '5%'
    },
    formControl: {
        color: '#ffffff',
        width:'90%',
        paddingLeft: '5%'
    },
    form_title: {
        textAlign: 'center',
        color: '#ffffff'
    },
    form: {
        padding: '3%'
    },
    white_text: {
        color: '#ffffff'
    },
    input_file: {
        display: 'none'
        // visibility:'hidden'
    },
    select: {
        borderColor: '#ffffff'
    },
    download_button: {
        marginTop: '3%'
    }

})
class Form extends Component{
    state= {
        algorithm: '',
        video: '',
        downloadBotton:false,
        downloadURL:''
    }
    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value},()=>{
            console.log(this.state)
        })
    }
    handleFileUpload = (e) =>{
        this.setState({video:e.target.files[0]},()=>{
            console.log(this.state.video.name)
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault()
        const data = new FormData()
        data.append('algorithm',this.state.algorithm)
        data.append('file', this.state.video);
        data.append('filename', this.state.video.name);
        for (var value of data.values()) {
            console.log(value); 
        }
        let url = "http://127.0.0.1:5000"
        // let path =""
        if(this.state.algorithm==="surf"){
            url +="/surf"
        }
        else if(this.state.algorithm==="w"){
            url +="/w"
        }
        console.log(url)
        axios({
            url:url,
            method:'post',
            data: data,
            responseType:'blob'
        })
        .then((res)=>{
            // console.log(res)
            console.log(res)
            const url = window.URL.createObjectURL(new Blob([res.data], {type: 'video/avi'}));
            // console.log(url)
            // const link = document.createElement('a');
            // link.href = url;
            // fileDownload(res.data, '1.png', 'image/png')
            this.setState({downloadURL:url},()=>{
                console.log(this.state.downloadURL)
            })
            
            // link.setAttribute('download', '1.mp4'); 
            // document.body.appendChild(link);
            // link.click();
            // this.setState({downloadBotton:true},()=>{
            //     console.log(this.state.downloadBotton)
            // })
        })
        .catch((err)=>{
            console.log(err)
            throw err
        })

    }
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
                    <Grid item xs={5} >
                        <Paper className={classes.form_Paper}>
                        <form className={classes.form} onSubmit={this.handleSubmit} method="post">
                            <Typography variant="h3" gutterBottom className={classes.form_title}>
                                FPS Booster
                            </Typography>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="algorithm" className={classes.white_text}>Algorithm</InputLabel>
                                <Select
                                    value={this.state.algorithm}
                                    onChange={this.handleChange}
                                    name="algorithm"
                                    autoWidth
                                    id="algorithm"
                                    className={classes.white_text}
                                >
                                    <MenuItem value="">
                                    <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'surf'}>Surf</MenuItem>
                                    <MenuItem value={'w'}>Algorithm 1</MenuItem>
                                    <MenuItem value={'algo_2'}>Algorithm 2</MenuItem>
                                </Select>
                            </FormControl>
                            <br/><br />
                            {/* <FormControl  className={classes.formControl}>
                                <InputLabel htmlFor="file-input" className={classes.white_text}>
                                    Upload file........
                                </InputLabel>
                                <Input type="file" id="file-input" className={classes.input_file}/>
                            </FormControl> */}
                            <input
                                accept="*"
                                className={classes.input_file}
                                id="video"
                                multiple
                                type="file"
                                name="video"
                                onChange={this.handleFileUpload}
                            />
                            <Grid container>
                                <Grid item xs={6} >

                                    <label htmlFor="video">
                                    <Button variant="contained" component="span" color="primary"className={classes.button}>
                                        Upload
                                    </Button>
                                    <Typography variant="body1"  className={classes.white_text}>
                                        Select video.....
                                    </Typography>
                                    
                                    </label>
                                </Grid>
                                <Grid item xs={6} >
                                <Button variant="contained" size="large" color="primary" type="submit">
                                    Submit
                                </Button>
                                </Grid>
                                <br/><br/>
                                
                                {
                                    
                                    this.state.downloadURL!=='' && 
                                    (
                                        <a download="vid.avi" href={this.state.downloadURL}>
                                        <Button variant="contained" size="large" color="primary" className={classes.download_button}>
                                            download
                                        </Button>
                                        </a>
                                    )
                                }
                                
                            </Grid>
                        </form>
                        </Paper>
                    </Grid>
                    
                </Grid>    
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Form);
import React, { Fragment } from 'react'
import CustomBtn from './CustomBtn'
import UpIcon from '../icons/up.png'
import SaveIcon from '../icons/save.png'
import FolderIcon from '../icons/folder.png'
import CloseIcon from '../icons/cross.png'
import PremiumIcon from '../icons/diamond.png'
import ContactIcon from '../icons/contact.png'
import AboutIcon from '../icons/question.png'
import ZipIcon from '../icons/zip.png'

import {Toolbar, Typography} from '@material-ui/core'
import {makeStyles} from "@material-ui/core/styles"; 

const styles = makeStyles({
    bar:{
        paddingTop: "1.15rem",
        backgroundColor: "#fff",
        float: "left",
      marginLeft: "20px",
        display: "flex",
        ['@media (max-width:780px)']: { 
           flexDirection: "column",
           padding: "30px"
          }
    },
    
    menuItem: {
      float: "right",
      marginLeft: "20px",
      fontsize: "50px",
      padding:"30px",
      
      cursor: "pointer",
      height: "20px",
        "&:hover": {
            color:  "#4f25c8"
        },
        ['@media (max-width:780px)']: { 
            paddingBottom: "1rem" ,
          lineHeight: "5px"  }
    },
    menuItems: {
      float: "right",
      marginLeft: "20px",
      fontsize: "20px",
      padding:"50px",
      
      cursor: "pointer",
      height: "35px",
        "&:hover": {
            color:  "#4f25c8"
        },
        ['@media (max-width:780px)']: { 
            paddingBottom: "1rem" ,
            lineHeight: "5px"   }
    },
    button:{
      display: "flex" ,
      textAlign: "right",
      float: "right",
      position: "absolute",
      marginRight:"20px",
      justifyContent: "flex-end", paddingRight:"50px",
      ['@media (max-width:780px)']: { 
        paddingBottom: "1rem"  }
    }
})

function NavBar(props) {
    const classes = styles()
    return (
            <Toolbar position="sticky" color="rgba(0, 0, 0, 0.87)" className={classes.bar}>   
               <h1 style={{textAlign: "left" ,height: "95px", fontSize:"40px"}}>
               <img src={ZipIcon} style={{width: "60px", height: "60px"}} alt=""/>
                 UnZip</h1>
               {props.zipOpen
                  ? <Fragment>
                 <Typography variant="h5" className={classes.menuItems} onClick={props.newFolder} src={FolderIcon}>
                 <img src={FolderIcon} style={{width: "40px", height: "40px"}} alt=""/>
                   New Folder
                 </Typography>
                 <Typography variant="h5" className={classes.menuItems} onClick={props.uploadFile} src={UpIcon}>
                 <img src={UpIcon} style={{width: "40px", height: "40px" }} alt=""/>
                   Up Folder
                  </Typography>
                 <Typography variant="h5" className={classes.menuItems} onClick={props.downloadZip} src={SaveIcon}>
                 <img src={SaveIcon} style={{width: "40px", height: "40px"}} alt=""/>
                   Save Zip 
                  </Typography>
                  <Typography variant="h5" className={classes.menuItems} onClick={props.closeZip} src={CloseIcon}>
                  <img src={CloseIcon} style={{width: "40px", height: "40px"}} alt=""/>
                    Close All 
                  </Typography>
                   </Fragment>
                       :
                  <Fragment>
                  <Typography variant="h6" className={classes.menuItem} style={{height: "55px"}}>
                  <img src={AboutIcon} style={{width: "40px", height: "40px"}} alt=""/>
                   About Us
                  </Typography>
                  <Typography variant="h6" className={classes.menuItem} style={{height: "55px"}}>
                  <img src={PremiumIcon} style={{width: "40px", height: "40px"}} alt=""/>
                    Premium  
                  </Typography>
                  <Typography variant="h6" className={classes.menuItem} style={{height: "50px"}}>
                  <img src={ContactIcon} style={{width: "40px", height: "40px"}} alt=""/>
                    Contact Us 
                  </Typography>
                  <CustomBtn txt="Sign In" className={classes.button}/>
                </Fragment>
               }
               
            </Toolbar>
               
               
    )
}





export default NavBar
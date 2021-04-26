import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import {Typography} from '@material-ui/core'; 
import NavBar from './components/NavBar'
import Button from '@material-ui/core/Button';
import Grid from './components/Grid'

import StatusBar from './components/StatusBar'
import Footer from './components/Footer'
import ZipIcon from './icons/zip.png'
import UploadIcon from './icons/upload.png'
import AppIcon from './icons/computer.png'


import logo from './background.jpg'
import './App.css';
import {FileDrop} from 'react-file-drop'
import zipHandler from './components/zipHandler'
import FileSaver from 'file-saver'
import React, { Fragment, useCallback, useState } from 'react';

 
const theme = createMuiTheme({
  palette: {
    primary: {
      main:"#2e1667",
    },
    secondary: {
      main:"#c7d8ed",
    },
  },
  typography: {
    fontFamily: [
      'Roboto'
    ],
    h4: {
      fontWeight: 600,
      fontSize: 32,
      lineHeight: '2rem',
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
     
      },
    h5: {
      fontWeight: 100,
      lineHeight: '2rem',
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      
    },
  },
});

const styles = makeStyles({
  wrapper: {
    width: "65%",
    
    textAlign: "center"
  },
  bigSpace: {
    marginTop: "5rem"
  },
  littleSpace:{
    marginTop: "2.5rem",
  },
  images:{
    ['@media (max-width:780px)']: { 
      width: "700px"
     },
     ['@media (max-width:580px)']: { 
      width: "560px"
     }
  },
  button:{
    display: "flex" ,
    textAlign: "center",
    float: "center",
    position: "absolute",
    margin:"100px",
    padding:"50px"
  }
});
 
function Welcome(props) {
  const classes = styles()
    const [mainTitle, setmainTitle] = useState('UnZip app is an online extractor platform');
    const [loading, setloading] = useState(false);
    const [fileName, setfilename] = useState('unknown.zip');
    const fileInput = React.createRef()
  

  const handleFiles = (files) => {
    if (files[0]) {
      
      const fileName = files[0].name
      props.updateStatusBar('Loading preview...')
      zipHandler.loadFile(files[0], (err, zip) => {
        setloading( false)
        if (err) {
          props.updateStatusBar(`Failed to open ${fileName}`)
          console.log(err)
          setmainTitle( 'Whoops! Are you sure that was a zip file?')
          return
        }
        props.updateStatusBar(`Previewing ${fileName}`)
        props.zipLoaded(fileName)
      })
      setloading(true)
      setfilename(fileName)
    } else {
      props.updateStatusBar('Preview failed, no files dropped.')
    }
  }
  const onButtonClick = () => {
    
   fileInput.current.click();
  };
    
  
    return (
      <Fragment>
        <div>
          {loading
            ? <Fragment>
              <h1>Unpacking preview...</h1>
              <h4>Please wait while load {fileName}</h4>
            </Fragment>
            : <Fragment>
              <h2 style={{color: "orange"}}>
              <img src={AppIcon} style={{width: "20px", height: "20px"}} alt=""/>
                {mainTitle}</h2>
              <label htmlFor='fileInput'>
              <Button  onClick={onButtonClick} variant="outlined" color="primary" style={{color: "blueviolet"}}>Extract Here</Button>
              <div className={classes.littleSpace}>
                
                <div>
                <FileDrop 
                       onDrop={(files) => {handleFiles(files) }}
                    >
                            <h4 style={{color: "green"}}>Drag and Drop a file on the window</h4>
                            <img src={UploadIcon} style={{width: "40px", height: "40px"}} alt=""/>
                </FileDrop>
                </div>
              </div>
              </label>
              <input
                id='fileInput'
                type='file'
                onChange={() => {handleFiles(fileInput.current.files) }}
                ref={fileInput}
                style={{ position: 'fixed', top: '-1000px' }} />
            </Fragment>
          }
        </div>
      </Fragment>
    )
  
}



function App (props) {
  const classes = styles()
  const [browsing, setbrowsing] = useState(false);
  const [relativePath, setrelativePath] = useState('');
  const [folderContents, setfolderContents] = useState([]);
  const [status, setstatus] = useState('Idle');
  const [fileName, setfileName] = useState('none');
  const fileUploader = React.createRef()

  const updateStatusBar = (newStr) =>{
    setstatus(newStr)
  }
  
 const browseZipFolder = (relativePath) => {
    setrelativePath(relativePath)
      setfolderContents(zipHandler.filesInPath(relativePath))
      setbrowsing(true)
  }
  
  const enterFolder = (folderName) => {
    browseZipFolder(`${relativePath}${folderName}/`)
  }
  
  // It's 1:04AM
  const upOneFolder = () => {
    // TODO: Investigate why this always returns to root
    const folders = relativePath.split('/')
    folders.pop()
    folders.pop()
    const rP = folders.join('/')
    const newPath = `${rP}${(rP === '') ? '' : '/'}`
    browseZipFolder(newPath)
  }
  
  const downloadFile = (relName) => {
    const fileName = `${relativePath}${relName}`
    zipHandler.getFileAsBlob(fileName, (err, fBlob) => {
      if (err) {
        updateStatusBar('Failed to download file.')
        console.log(err)
        return
      }
      FileSaver.saveAs(fBlob, relName)
    })
  }
  
  const closeZip = () => {
    updateStatusBar(`Preview closed`)
    setbrowsing(false)
  }
  const createZip = () => {
    zipHandler.createNew()
    zipLoaded('newZip.zip')
    updateStatusBar('Zip file created')
  }
  const downloadZip = () => {
    zipHandler.getZipAsBlob((err, fBlob) => {
      if (err) {
        updateStatusBar('Failed to compress files!')
        console.log(err)
        return
      }
      FileSaver.saveAs(fBlob, fileName)
    })
  }
  const newFolder = () => {
    
    const folderName = prompt('Name for new folder:')
    if (folderName) {
      zipHandler.createFolder(`${this.state.relativePath}${folderName}`)
      
      browseZipFolder(relativePath)
      updateStatusBar(`Created ${folderName}/`)
    } else {
      updateStatusBar("Can't create a folder with no name!")
    }
  }
  const uploadFile = () => {
    fileUploader.current.click()
  }
  const memoizedHandleFileUpload = useCallback(() => {
    var files = fileUploader.current.files
    if (files.length > 0) {
      
  
  
      for (let f of files) {
        zipHandler.addFile(f, `${relativePath}${f.name}`, memoizedfileUploaded(files))
      }
    } else {
      updateStatusBar('No files were selected')
    }
  })
  
  const memoizedfileUploaded = useCallback((success) => {
    var files
    var filesUploaded = 0
      var errors = false
    filesUploaded++
    if (!success) {
      errors = true
    }
    if (filesUploaded === files.length) {
      updateStatusBar((errors)
        ? 'Some errors occurred while uploading. Check console.'
        : 'All files added successfully.'
      )
      browseZipFolder(relativePath)
    }
  })
  const zipLoaded = (fileName) => {
    setfileName(fileName)
    browseZipFolder('')
  }
 return(
    <div className="App">
      <ThemeProvider theme={theme}>
      <Fragment>
        <NavBar
        closeZip={() => {closeZip() }}
        createZip={() => {createZip() }}
        downloadZip={() => {downloadZip() }}
        newFolder={() => {newFolder() }}
        uploadFile={() => {uploadFile() }}
        zipOpen={browsing}/>
        <img src={logo} className={classes.images} alt=""/>
        
          <Typography variant="h4" color="primary">
          <img src={ZipIcon} style={{width: "50px", height: "50px"}} alt=""/>
             An Online Archive Tool for Free
          </Typography>
          <Typography variant="h5"  color="primary" className={classes.littleSpace}>
            At online UnZip app you can extract your zipped files without even installing the winZip or winRar.
             It is simple and easy tool for extracting and also you can create a zip folder here free of cost.
              We also have premium package where you canunzip or zip more than once. You can do this just by signing in to our account.
             For further queries you can contact us through mail or any of our social media account. Enjoy our service.
          </Typography>
          {browsing
          ? <Grid
            isRoot={(relativePath === '')}
            enterFolder={(x) => {enterFolder(x) }}
            upOneFolder={() => {upOneFolder() }}
            updateStatusBar={(x) => {updateStatusBar(x) }}
            downloadFile={(relName) => {downloadFile(relName) }}
            contents={folderContents} />
          : <Welcome
            zipLoaded={(x) => {zipLoaded(x) }}
            updateStatusBar={(x) => {updateStatusBar(x) }}
          />}
          <Fragment style={{marginTop: "5rem"}}>
        <StatusBar statusText={status} />
        </Fragment>
        <input
          id='fileUploader'
          type='file'
          onChange={memoizedHandleFileUpload}
          ref={fileUploader}
          style={{ position: 'fixed', top: '-1000px' }} />
       </Fragment>
       <div className={classes.bigSpace}>
          <Footer/>
        </div>
      </ThemeProvider>
    </div>
 )
  
}

export default App;

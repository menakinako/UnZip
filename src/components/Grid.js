import React, { Component, Fragment } from 'react'
import {makeStyles} from '@material-ui/core/styles'
import FolderIcon from '../icons/folder.png'
import DocumentIcon from '../icons/document.png'
import ImageIcon from '../icons/image.png'
import NoIcon from '../icons/no.png'
import ExtractIcon from '../icons/extract-file.png'
import DownloadIcon from '../icons/download.png'
import LeftIcon from '../icons/left.png'
import styled from 'styled-components'
import {Typography} from '@material-ui/core'; 



const BrowserStyled = styled.div`
  height: 300 px;
  marginLeft: 50px
  overflow-y: scroll;
`

const ZipItemStyled = styled.div`
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid '#a6a6a6'
  margin-right: 50px;
  display: flex;
  cursor: pointer;
  @media(max-width: 780px) {
    display: flex;
    margin-left: -20px;
  }
`

const ItemIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-top: 5px;
  margin-left: 560px;
  
  float: left;
  `
const imageTypes= ['png', 'jpg', 'jpeg', 'bmp']
class ZipItem extends Component {
    determineIcon () {
      if (!(this.props.file || this.props.folder)) {
        return NoIcon
      }
      if (this.props.file) {
        const fileSplit = this.props.item.split('.')
        const ext = fileSplit[fileSplit.length - 1]
        return (imageTypes.includes(ext.toLowerCase())) ? ImageIcon : DocumentIcon
      } else {
        if (this.props.up) return LeftIcon
        return FolderIcon
      }
    }
  
    render () {
      return (
        <ZipItemStyled onClick={this.props.onClick}>
          <ItemIcon src={this.determineIcon()} />
          <div style={{ float: 'center', fontSize: "20px", fontWeight: "500"}}>{this.props.item}</div>
        </ZipItemStyled>
      )
    }
  }
  
  class Grid extends Component {
    
    hasContent () {
      return (
        this.props.contents.files.length > 0 ||
        this.props.contents.folders.length > 0
      )
    }
  
    render () {
      return (
        <BrowserStyled style={{marginTop: "5rem"}}>
          <Typography variant="h4" color="primary" style={{color: "orange"}}>
          <img src={ExtractIcon} style={{width: "30px", height: "30px"}} alt=""/>
             Here are the extrated files
             </Typography>
             <Typography variant="h5"  color="primary" style={{marginTop: "2.5rem", marginBottom: "2.5rem", color: "blue"}}>
            You can download the files by clicking on it.
            <img src={DownloadIcon} style={{width: "40px", height: "40px"}} alt=""/>
          </Typography>
          {this.props.isRoot ? <Fragment /> : <ZipItem item='..' folder up onClick={() => {
            this.props.upOneFolder()
          }} /> }
  
          {this.hasContent()
            ? <Fragment>
              {this.props.contents.folders.map((x) => {
                return <ZipItem key={x} item={x} folder onClick={() => {
                  this.props.enterFolder(x)
                }} />
              })}
  
              {this.props.contents.files.map((x) => {
                return <ZipItem key={x} item={x} file onClick={() => {
                  this.props.downloadFile(x)
                }} />
              })}
            </Fragment>
            : <ZipItem item='This folder is empty' />
          }
  
        </BrowserStyled>
      )
    }
  }

export default Grid

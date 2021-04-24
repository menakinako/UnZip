import React, { Component } from 'react'
import styled from 'styled-components'


const StatusBarStyled = styled.div`
  height: 20px;
  background-color: #FFFFFF;
  color: #000000;
  padding-left: 20px;
  line-height: 10px;
`

class StatusBar extends Component {
  render () {
    return (
      <StatusBarStyled style={{marginTop: "5rem"}}>
        {this.props.statusText}
      </StatusBarStyled>
    )
  }
}

export default StatusBar
import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import './MenuBar.css';

export default class MenuBarSide extends Component {

  render() {
    return (
      <Menu >
      <Menu.Menu position='right'>
        <Menu.Item > <b className='Menu_title'>Jenkins File Generator</b> </Menu.Item>   
        </Menu.Menu>
      </Menu>
    )
  }
}
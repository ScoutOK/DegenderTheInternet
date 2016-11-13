import React, { Component } from 'react';
//import { Link } from 'react-router';
//import {connect} from 'react-redux';
//import { sendToPage } from '../ducks/convert'


export default class Popup extends Component {
  constructor () {
    super();
    this.state ={
      converted: false
    };
    this.degender = this.degender.bind(this);
  }
  degender () {
    if (this.state.converted) {
      this.setState({converted: false})
      chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {"message": "revert"});
      });
    } else {
      this.setState({converted: true})
      chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {"message": "convert"});
      });
    }
  }

  render() {
    return (
      <div id='popup-box'>
        <div className='button-box'>
          <button id='degender-button' onClick={this.degender}>{this.state.converted === true ? 'Revert' : 'Degender This Page'}</button>
        </div>
        <ul className='bottom'>
          <li>Settings</li>
          <li>Feedback</li>
        </ul>
      </div>
      )
  }
}



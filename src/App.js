import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Zone from './component/zone'
import ImgArray from './component/imgArray'
import Position from './component/position'
import Swap from './component/swap'

class App extends Component {
  render() {
    return (
      <div>
        <Swap />
      {/* <ImgArray></ImgArray> */}
      {/* <Zone></Zone>
      <Position></Position> */}
      </div>
    );
  }
}

export default App;

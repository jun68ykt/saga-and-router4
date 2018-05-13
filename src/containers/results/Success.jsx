import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class Success extends Component {

  render() {
    return(
      <div>
        <div className="message success">住所の取得に成功しました。</div>
        <br />
        <div>入力された値：<span className="em">{this.props.zipCode}</span></div>
        <div>取得された住所：<span className="em">{this.props.address}</span></div>
        <br />
        <Link to='/'>もどる</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(Success);
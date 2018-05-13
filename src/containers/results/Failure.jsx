import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class Failure extends Component {

  render() {
    return(
      <div>
        <div className="message failed">住所の取得に失敗しました。</div>
        <br />
        <div>入力された値：<span className="em">{this.props.zipCode}</span></div>
        {this.props.error && <div>エラーメッセージ：<span className="em">{this.props.error}</span></div>}
        <br />
        <Link to='/'>もどる</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(Failure);

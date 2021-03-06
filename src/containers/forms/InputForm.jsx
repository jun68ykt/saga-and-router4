import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAddressRequested } from "../../ducks/address";

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = { zipCode: this.props.zipCode || '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ zipCode: e.target.value.replace(/[^0-9]/, '') });
  }

  handleSubmit(e) {
    e.preventDefault();
    const meta = {
      pageOnSuccess: '/success',
      pageOnFailure: '/failure'
    };
    this.props.dispatch(getAddressRequested(this.state.zipCode, meta));
  }

  render() {
    return(
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="zipCode"
            value={this.state.zipCode}
            placeholder="半角数字で入力"
            onChange={this.handleChange} />
          { this.props.apiIsProcessing ?
            <span className="loading">処理中･･･
              <img alt='loading' className="loading-icon" src='/img/loading.gif'/></span>  :
            <input type="submit" value="送信" /> }
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(InputForm);

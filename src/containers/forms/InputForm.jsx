import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAddressRequested } from "../../ducks/address";

class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = { zipCode: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ zipCode: e.target.value.replace(/[^0-9]/, '') });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.dispatch(getAddressRequested(this.state.zipCode));
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
          <input type="submit" value="送信" />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps)(InputForm);

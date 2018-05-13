import React, { Component } from 'react';

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
    console.log(`郵便番号 ${this.state.zipCode} の住所取得を要求`); // TODO: dipatch で GET_ADDRESS_REQUESTEDを送出
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

export default InputForm;
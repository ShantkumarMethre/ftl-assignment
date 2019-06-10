import React from 'react';
import styled from 'styled-components';

const sliderThumbStyles = (props) => (`
  width: 25px;
  height: 25px;
  background: ${props.color};
  cursor: pointer;
  outline: 5px solid #333;
  opacity: ${props.opacity};
  -webkit-transition: .2s;
  transition: opacity .2s;
`);

const Styles = styled.div`
  display: flex;
  align-items: center;
  color: #888;
  margin-top: 2rem;
  margin-bottom: 2rem;

  .value {
    flex: 1;
    font-size: 2rem;
  }

  .slider {
    flex: 6;
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    border-radius: 5px;
    background: #efefef;
    outline: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      ${props => sliderThumbStyles(props)}
    }

    &::-moz-range-thumb {
      ${props => sliderThumbStyles(props)}
    }
  }
`;

export default class Slider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.min,
      droplets: []
    }
  }

  componentDidMount() {

    fetch('https://ftl-frontend-test.herokuapp.com/interest?amount=500&numMonths=6')
      .then(res => res.json())
      .then(droplets => {
        this.setState({
          droplets: droplets,
          name: null
        })
      });

  }


  handleOnChange(e) {
    this.setState({ value: e.target.value })
    this.props.event(this.state.value)
  }

  render() {
    return (
      <Styles opacity={this.state.value}>
        <input type="range" min={this.props.min} max={this.props.max} value={this.state.value} className="slider" onChange={this.handleOnChange.bind(this)} />
        <div className="value">{this.state.value}</div>
      </Styles>
    )
  }
}


import React from 'react';
import chroma from 'chroma-js';

import Select from 'react-select';

const colourOptions = [
  { value: 'm', label: 'Manual', color: '#666666' },
  { value: 'r', label: 'Red', color: '#FF5630' },
  { value: 'o', label: 'Orange', color: '#FF8B00' },
  { value: 'g', label: 'Green', color: '#36B37E' },
  { value: 's', label: 'Blue', color: '#00B8D9' },
  { value: 'v', label: 'Violet', color: '#5243AA' },
];

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  input: styles => ({ ...styles, ...dot() }),
  placeholder: styles => ({ ...styles, ...dot() }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

var mqtt    = require('mqtt');
var count = 0;
var options = {
  protocol: 'ws',
  // username: 'rover',
  // password: 'marsrover',
  keepalive: 60,
  reconnectPeriod: 1000,
};
var client  = mqtt.connect('ws://localhost:8081', options);

export default class App extends React.Component {
    state = {
      selectedOption: colourOptions[0],
    };
    handleChange = selectedOption => {
      this.setState({ selectedOption });
      console.log(`Option selected:`, selectedOption.value);
      if (client.connected == true){
        client.publish("marsrovercolour",selectedOption.value, options);
        }
    };
    render() {
      const { selectedOption } = this.state;
  
      return (
        <Select
          defaultValue={colourOptions[0]}
          value={selectedOption}
          onChange={this.handleChange}
          label="Single select"
          options={colourOptions}
          styles={colourStyles}
        />
      );
    }
  }
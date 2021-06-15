import React from 'react';
import chroma from 'chroma-js';

import Select from 'react-select';

const colourOptions = [
  { value: 'm', label: 'Manual', color: '#666666' },
  { value: 'r', label: 'Red', color: '#FF5630' },
  { value: 'o', label: 'Orange', color: '#FF8B00' },
  { value: 'g', label: 'Green', color: '#36B37E' },
  { value: 's', label: 'Sky blue', color: '#00B8D9' },
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

// AWS.config.region = 'us-east-1' // your region
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//   IdentityPoolId: 'us-east-1:4c401337-1b4e-43f4-962f-b56b513f2150',
// });

// const client = new AWSMqttClient({
//   region: AWS.config.region,
//   credentials: AWS.config.credentials,
//   endpoint: 'aliowe90dtiwt-ats.iot.us-east-1.amazonaws.com', // NOTE: See below on how to get the endpoint domain
//   expires: 600, // Sign url with expiration of 600 seconds
//   clientId: '6sumb39hv8b187ak5osp19ukpg', // clientId to register with MQTT broker. Need to be unique per client
//   will: {
//       topic: 'marsrover',
//       payload: 'Connection Closed abnormally..!',
//       qos: 0,
//       retain: false
//   } 
// })

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

// export default () => (
//   <Select
//     defaultValue={colourOptions[0]}
//     onChange={() => sendMessage('marsrovercolour', colourOptions.value, options)}
//     label="Single select"
//     options={colourOptions}
//     styles={colourStyles}
//   />
// );
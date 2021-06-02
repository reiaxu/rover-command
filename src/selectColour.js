import React from 'react';
import chroma from 'chroma-js';

import Select from 'react-select';

const colourOptions = [
  { value: 'manual', label: 'Manual', color: '#666666' },
  { value: 'red', label: 'Red', color: '#FF5630' },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'blue', label: 'Sky blue', color: '#00B8D9' },
  { value: 'violet', label: 'Violet', color: '#5243AA' },
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

export default () => (
  <Select
    defaultValue={colourOptions[0]}
    label="Single select"
    options={colourOptions}
    styles={colourStyles}
  />
);
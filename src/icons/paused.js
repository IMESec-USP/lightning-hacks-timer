import React from 'react'

export default (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={'icon ' + (props.highlighted ? 'fill-white' : 'fill-grey') } viewBox="0 0 20 20">
    <rect width="6" height="16" x="3" y="2" rx="1" ry="1"/>
    <rect width="6" height="16" x="11" y="2" rx="1" ry="1"/>
  </svg>
)
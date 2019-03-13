import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

export default () =>
  <div className='spinner fadein'>
    <FontAwesomeIcon icon={faCoffee} size='5x' color='#3B5998' />
  </div>

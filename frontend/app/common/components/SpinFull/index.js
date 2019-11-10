import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import './style.sass';

const SpinFull = ({ className = '', ...props }) => (
  <div className={`SpinFull ${className}`}>
    <Spin {...props} size="large" />
  </div>
);

SpinFull.propTypes = {
  className: PropTypes.string,
};

export default SpinFull;

import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Result } from 'antd';
import { cx } from 'ramda-extension';
import './styles.sass';

const UnknownError = props => (
  <Layout
    className={cx({
      UnknownError: true,
      'UnknownError--module': props.module,
    })}
  >
    <Result
      status="error"
      title="Um erro desconhecido ocorreu"
      subTitle="Perdão pela confusão! Tente novamente sua última operação e, caso o problema persista entre em contato conosco."
    />
  </Layout>
);

UnknownError.propTypes = {
  module: PropTypes.string,
};

export default (UnknownError);

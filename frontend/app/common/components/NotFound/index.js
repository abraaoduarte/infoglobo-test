import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Result } from 'antd';
import { cx } from 'ramda-extension';
import './styles.sass';

const NotFound = props => (
  <Layout
    className={cx({
      NotFound: true,
      'NotFound--module': props.module,
    })}
  >
    <Result
      status="404"
      title="404"
      subTitle="Perdão, a página que você acessou não existe."
    />
  </Layout>
);

NotFound.propTypes = {
  module: PropTypes.string,
};

export default (NotFound);

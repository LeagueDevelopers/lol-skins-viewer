import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

function Image (props) {
  const { path, port, style, className, children, onClick } = props;
  return (
    <div
      className={className}
      style={Object.assign({ backgroundImage: `url(http://127.0.0.1:${port}${path})` }, style)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

Image.propTypes = {
  port: PropTypes.number.isRequired,
  path: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func
};

export default connect(state => ({ port: state.app.proxy }))(Image);

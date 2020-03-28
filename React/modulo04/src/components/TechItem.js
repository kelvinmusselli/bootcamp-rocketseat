import React from 'react';
import PropTypes from 'prop-types';
// import { Container } from './styles';

function TechItem({ tech, onDelete }) {
  return (
    <li>
      {tech}&nbsp;
      <button onClick={onDelete} type="button">
        X
      </button>
    </li>
  );
}
TechItem.defaultProps = {
  tech: 'Default Props Quando passa nada'
};

TechItem.propTypes = {
  tech: PropTypes.string,
  onDelete: PropTypes.func.isRequired
};

export default TechItem;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Switch from 'react-switch';

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
`;

const StyledSpan = styled.span`
  padding: 10px;
  margin-left: auto;
`;

const CustomSwitch = ({ onChange, checked }) => (
  <StyledLabel>
    <StyledSpan>{`Show Only Free Events`}</StyledSpan>
    <Switch
      onChange={onChange}
      checked={checked}
      onColor={'#663399'}
      uncheckedIcon={false}
      checkedIcon={false}
      height={32}
      width={64}
    />
  </StyledLabel>
);

CustomSwitch.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
}

export default CustomSwitch;

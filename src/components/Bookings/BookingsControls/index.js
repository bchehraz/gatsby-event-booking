import React from 'react';
import styled from 'styled-components';
import { FaListUl, FaChartBar } from 'react-icons/fa';

const GraphButton = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
  border-radius: 5px;
  text-align: center;
  -webkit-transition: background 0.1s ease-in-out;
  -moz-transition: background 0.1s ease-in-out;
  -ms-transition: background 0.1s ease-in-out;
  -o-transition: background 0.1s ease-in-out;
  transition: background 0.1s ease-in-out;
  -webkit-box-shadow: 0 0px 2px 0px #333;
  box-shadow: 0 0px 2px 0px #333;
  ${({ active }) => active && '-webkit-box-shadow: none;'}
  ${({ active }) => active && 'box-shadow: none;'}

  background-color: ${({ active }) => active ? '#333' : '#fff'};
  padding: 5px 10px;
  min-width: 170px;
  h4 {
    color: ${({ active }) => active ? '#fff' : '#333'};
    padding: 5px;
  }
`;

const BookingsControls = ({ graphView, onChangeView }) => {
  const ButtonIcon = (graphView) ? FaListUl : FaChartBar;
  const ButtonText = (graphView) ? `List View` : `Graph View`;

  return (
    <GraphButton onClick={() => onChangeView()} active={graphView}>
      <ButtonIcon size={30} color={(graphView) ? '#fff' : '#333'} />
      <div style={{ margin: '0 auto' }}><h4>{ButtonText}</h4></div>
    </GraphButton>
  );
}

export default BookingsControls;

'use client';

import styled from 'styled-components';

export const DragIconWrapper = styled.div`
  display: inline-block;
  svg {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 1rem;
    opacity: 0;
  }
  svg:hover {
    background: #ececec;
  }
`;
export const IconWrapper = styled.div`
  display: inline-block;
  visibilty: hidden;
  svg {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    cursor: pointer;
    opacity: 0;
  }
  svg:hover {
    background: #ececec;
  }
`;
// export const ListContainer = styled.div`
//   font-family: 'Helvetica Neue', Helvetica, sans-serif;
//   margin: 2rem auto;
//   max-width: 30rem;
//   padding: 0.5rem 2rem 2rem;
//   border-radius: 0.2rem;
//   box-shadow: 0.1rem 0.1rem 0.4rem #aaaaaa;
// `;
export const ListItem = styled.div`
  color: #444444;
  padding: 0.5rem 0.3rem;
  border-bottom: 1px solid #dddddd;
  &:last-child {
    border-bottom: none;
  }
  span {
    display: inline-block;
    vertical-align: middle;
    width: 80%;
  }
  span:focus-visible {
    outline: unset;
  }
  background: white;
  :hover {
    svg {
      opacity: 0.6;
    }
  }
`;

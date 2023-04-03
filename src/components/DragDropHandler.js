import { DragIconWrapper } from '../styles';
import React from 'react';
import { Tooltip } from '@mui/material';

import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { resetServerContext } from 'react-beautiful-dnd';

export function DragHandle(props) {
  resetServerContext();
  return (
    <DragIconWrapper {...props}>
      <Tooltip title="Drag to move" id="dragger">
        <DragIndicatorIcon />
      </Tooltip>
    </DragIconWrapper>
  );
}

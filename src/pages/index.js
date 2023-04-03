import List from '../data';
import { IconWrapper, ListItem } from '../styles';
import { DragHandle } from '../components/DragDropHandler';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';
import { useState, createContext } from 'react';
import { resetServerContext } from 'react-beautiful-dnd';
import BlockDetail from '@/components/BlockDetail';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Container from '@mui/material/Container';
import uuid from 'react-uuid';

export const BlockListContext = createContext({
  isEditing: null,
  list: null,
  selectedId: null,
  setList: null,
});

const App = () => {
  resetServerContext();
  console.log(uuid());

  const [list, setList] = useState(List);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState('');

  const selectedItemHandler = (event) => {
    event.stopPropagation();
    if (event.target.nodeName === 'path') {
      setSelectedItemId(event.target.parentNode.id);
    } else {
      setSelectedItemId(event.target.id);
    }
    setIsEditing(true);
  };

  const closeModalHandler = () => {
    setIsEditing(false);
  };
  const DeleteItemById = () => {
    setIsEditing(false);
    setList((prevState) => prevState.filter((listItem) => listItem.id != item.id));
  };

  return (
    <>
      <BlockListContext.Provider
        value={{
          list: list,
          isEditing: isEditing,
          selectedId: selectedItemId,
          onCloseModal: closeModalHandler,
          setList: setList,
        }}
      >
        <DragDropContext
          onDragEnd={(param, _) => {
            const sourceIndex = param.source.index;
            const destinationIndex = param.destination.index;
            list.splice(destinationIndex, 0, list.splice(sourceIndex, 1)[0]);
            setList([...list]);
          }}
        >
          <Container>
            <h1>Blocks</h1>
            <Droppable droppableId="droppable-1">
              {(provided, _) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {list.map((item, i) => (
                    <Draggable key={item.id} draggableId={`draggable-${item.id}`} index={i}>
                      {(provided, snapshot) => (
                        <ListItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{
                            ...provided.draggableProps.style,
                            boxShadow: snapshot.isDragging ? '0 0 .4rem #666' : 'none',
                            opacity: snapshot.isDragging ? '.6' : '1',
                          }}
                        >
                          <IconWrapper>
                            <Tooltip title="Delete this block" placement="bottom">
                              <DeleteOutlineOutlinedIcon
                                id={String(item.id)}
                                onClick={() => {
                                  setIsEditing(false);
                                  setList((prevState) => prevState.filter((listItem) => listItem.id != item.id));
                                }}
                              />
                            </Tooltip>
                            <Tooltip title="Edit this block" placement="bottom">
                              <EditOutlinedIcon id={String(item.id)} onClick={selectedItemHandler} />
                            </Tooltip>
                          </IconWrapper>
                          <DragHandle {...provided.dragHandleProps} />
                          <span id={item.id}>{item.title}</span>
                        </ListItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Container>
        </DragDropContext>
        {isEditing && <BlockDetail selectedItemIdFromParent={selectedItemId} />}
      </BlockListContext.Provider>
    </>
  );
};

export default App;

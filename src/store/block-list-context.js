import List from '../data';
import React, { useState } from 'react';

const useBlockListContext = () => {
  const [list, setList] = useState(List);
  console.log(list);
  const BlockListContext = React.createContext({
    isEditing: false,
    list: list,
    selectedId: '',
    setList: setList,
  });

  return BlockListContext;
};

export default useBlockListContext;

import useBlockListContext from '@/store/block-list-context';
import { useContext, useEffect, useState } from 'react';

const Testers = () => {
  const { list, ...ctx } = useContext(useBlockListContext());

  //   console.log(ctx.list);

  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
};
export default Testers;

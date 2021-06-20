import {createContext} from 'react';
const CardContext = createContext({
  isSame: -1,
  clickFlag: 0,
  idx: 0,
  check: () => {},
  doneCheck: () => {},
  animalCount: 0,
});

export default CardContext;

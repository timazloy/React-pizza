import React from 'react';

export const ConfigurePizza = ({ keysTypes, changeSize, changeType, activeType, keysSizes, setActiveSize, activeSize }) => {
   return (
      <div className='pizza-block__selector'>
         <ul>
            {keysTypes.map((type, i) => (
               <li onClick={() => changeType(type, i)} className={activeType === type ? 'active' : ''} key={i}>
                  {keysTypes[i]}
               </li>
            ))}
         </ul>
         <ul>
            {keysSizes.map((size, i) => (
               <li onClick={() => changeSize(size, i)} className={activeSize === size ? 'active' : ''} key={i}>
                  {keysSizes[i]} см.
               </li>
            ))}
         </ul>
      </div>
   );
};

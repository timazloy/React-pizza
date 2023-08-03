import React from 'react';

export const ConfigurePizza = ({ keysTypes, setActiveType, activeType, keysSizes, setActiveSize, activeSize }) => {
   return (
      <div className='pizza-block__selector'>
         <ul>
            {keysTypes.map((type, i) => (
               <li onClick={() => setActiveType(i)} className={activeType === i ? 'active' : ''} key={i}>
                  {keysTypes[i]}
               </li>
            ))}
         </ul>
         <ul>
            {keysSizes.map((size, i) => (
               <li onClick={() => setActiveSize(i)} className={activeSize === i ? 'active' : ''} key={i}>
                  {keysSizes[i]} см.
               </li>
            ))}
         </ul>
      </div>
   );
};

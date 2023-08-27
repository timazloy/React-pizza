import React from 'react';

interface ConfigurePizzaProps {
   keysTypes: string[];
   keysSizes: string[];
   activeType: string;
   activeSize: string;
   changeType: (type: string, index: number) => void;
   changeSize: (size: string, index: number) => void;
}

export const ConfigurePizza: React.FC<ConfigurePizzaProps> = ({
   keysTypes,
   keysSizes,
   activeType,
   activeSize,
   changeType,
   changeSize
}) => {
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

declare module '*.jpg' {
   const src: string;
   export default src;
}

declare module '*.png' {
   const src: string;
   export default src;
}

declare module '*.gif' {
   const src: string;
   export default src;
}
declare module '*.scss' {
   interface IClassNames {
      [className: string]: string;
   }
   const classNames: IClassNames;
   export = classNames;
}

declare module '*.svg' {
   import * as React from 'react';

   export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

   const src: string;
   export default src;
}

declare module '*.module.css' {
   const classes: { readonly [key: string]: string };
   export default classes;
}

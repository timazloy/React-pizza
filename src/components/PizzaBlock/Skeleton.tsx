import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton: React.FC = (props: any) => (
   <ContentLoader
      speed={2}
      width={280}
      height={467}
      viewBox='0 0 280 467'
      backgroundColor='#f3f3f3'
      foregroundColor='#ecebeb'
      {...props}
   >
      <rect x='283' y='21' rx='0' ry='0' width='650' height='120' />
      <rect x='19' y='0' rx='200' ry='200' width='250' height='250' />
      <rect x='0' y='265' rx='0' ry='0' width='280' height='27' />
      <rect x='0' y='308' rx='0' ry='0' width='280' height='89' />
      <rect x='0' y='417' rx='0' ry='0' width='90' height='27' />
      <rect x='125' y='410' rx='0' ry='0' width='152' height='45' />
   </ContentLoader>
);

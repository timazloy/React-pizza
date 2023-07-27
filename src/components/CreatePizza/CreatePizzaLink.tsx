import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CreatePizzaLimk.module.scss';

type CreatePizzaLinkProps = {
   link: string;
   img: string;
   title: string;
};

export const CreatePizzaLink: React.FC<CreatePizzaLinkProps> = ({ link, img, title }) => {
   return (
      <Link to={link} className={styles.create_pizza}>
         <img src={img} alt='create pizza' className={styles.create_pizza__img}></img>
         <div className={styles.create_pizza__title}>{title}</div>
      </Link>
   );
};

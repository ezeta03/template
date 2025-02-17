import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from '../../../assets/sass/modules/SmallComponents/Wrapper.module.scss';
import Inicio from '../LargeComponents/Inicio';
import Calendar from '../LargeComponents/Calendar';

const Wrapper = () => {
  return (
    <div className={styles.wrapper}>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </div>
  );
};

export default Wrapper;
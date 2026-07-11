import React, { useContext } from 'react';
import { LangContext } from '../context/LangContext';

const AdminPanel = () => {
  const { t } = useContext(LangContext);
  return (
    <div className="card-ui p-8 text-center">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t('adminPanel')}</h1>
      <p className="text-gray-600 dark:text-gray-300">{t('restrictedPage')}</p>
    </div>
  );
};

export default AdminPanel;

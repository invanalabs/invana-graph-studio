import { MainLayout } from '@/layouts/mainLayout';
import { Network } from 'lucide-react';
import React from 'react';

const ModellerPage: React.FC = () => {
  return (
    <MainLayout logo={
      <>
        <Network className='h-4 w-4' /> <span className='font-bold'>Modeller</span>
      </>
    }>
      <h1>Modeller Page</h1>
      <p>Welcome to the Modeller Page!</p>
      {/* Add your modeller components and logic here */}
    </MainLayout>
  );
};

export default ModellerPage;
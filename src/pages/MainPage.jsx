import React from 'react';
import Table from '../components/Table';
import PlanetsProvider from '../context/PlanetsProvider';

export default function MainPage() {
  return (
    <PlanetsProvider>
      <Table />
    </PlanetsProvider>
  );
}

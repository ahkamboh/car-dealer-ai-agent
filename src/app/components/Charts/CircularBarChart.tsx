import { Card, DonutChart, Legend, Title } from '@tremor/react';

const sales = [
  {
    name: 'Completed',
    sales: 980,
  },
  {
    name: 'Pending',
    sales: 456,
  },
  
];

export function CircularBarChart() {
  return (
    <div className=" flex justify-center items-center">
    <DonutChart
      data={sales}
      category="sales"
      index="name"
      className="h-[90px] w-full text-white"
      colors={[
        'green-400',
        'blue-500',
      ]}
    />
    <Legend
          categories={['Completed', 'Pending']}
          colors={['blue', 'green']}
          className="max-w-sm"
        />
    </div>
  );
}
import React from 'react'
import { Card, CardBody } from '@nextui-org/react';
import LinesChart from '@/utils/LinesChart';

function CuadroChart({ data }) {
  return (
    // <div><LinesChart /></div>
    <>
      <p className='text-xl font-bold text-center'>Gráfico por Meses - {data?.ano}</p>
    
      <Card className='mt-4'>
        <CardBody>
          <LinesChart
            data={data}
          />
        </CardBody>
      </Card>
    </>
  )
}

export default CuadroChart
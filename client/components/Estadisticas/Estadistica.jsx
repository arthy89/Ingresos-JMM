import React from 'react'
import { title, subtitle } from "@/components/primitives";
import CuadroChart from './CuadroChart'
import TablaConceptos from './TablaConceptos'
import SelectComponent from './SelectComponent'
import { Card, CardBody } from '@nextui-org/react';

function Estadistica({
  fecha_sel,
  setFecha_sel,
  setAno_sel,
  setMes_ano_sel,
  data,
  isLoading,
}) {
  return (
    <>
      <div className='grid w-full grid-cols-2 gap-5'>
        <div className="flex flex-col gap-4">
          <SelectComponent
            fecha_sel={fecha_sel}
            setFecha_sel={setFecha_sel}
            setAno_sel={setAno_sel}
            setMes_ano_sel={setMes_ano_sel}
            />

          <Card className='w-2/4'>
            <CardBody>
              <div className='flex items-center gap-4'>
                <span className={title({ size: "xs", color: "red" })}>Total:</span>
                <span className={subtitle()}>S/. {data?.sum_total}</span>
              </div>
            </CardBody>
          </Card>
          
          <TablaConceptos
            data={data}
            isLoading={isLoading}
          />
        </div>

        <div>
          <CuadroChart
            data={data}
          />
        </div>
      </div>
    </>
  )
}

export default Estadistica
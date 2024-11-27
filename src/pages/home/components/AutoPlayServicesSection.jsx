import React from 'react'
import AutoplaySlider from '../../../components/AutoplaySlider';
import { SERVICES } from '../../../utilities/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AutoPlayServicesSection() {

    function renderCard(id, item) {
        return <div key={id} className='w-[200px] sm:w-[300px] m-2 p-2 flex items-center gap-3 border-4 border-[#78b3ceb2]'>
            <FontAwesomeIcon icon={item.icon} className='text-2xl text-[#69aece]' />
            <div className='flex flex-col'>
                <p className='text-nowrap font-bold'>{item.title}</p>
                <p className='text-xs text-slate-500'>{item.description}</p>
            </div>
        </div>
    }

    return (
        <AutoplaySlider renderProp={renderCard} items={SERVICES} speed={60} />
    )
}

export default AutoPlayServicesSection
import useGlobalState from '@/store/globalState';
import { CCIPMenuEnum } from '@/utils/types/store';
import { v4 as uuidv4 } from 'uuid';
import React from 'react'

export default function CCIPHeaderTopMenu() {

  const [ccipMenu, setCcipMenu] = useGlobalState('ccipMenu');
  const [ccipCategories, setCcipCategories] = useGlobalState('ccipCategories')
  
  const processCcipCategory = (category: string) => {
    // Implement extra logic here to switch between tabs or handle category selection
    console.log(`Selected category: ${category}`);
    if(category === ccipCategories.topCategories[0]) setCcipMenu(CCIPMenuEnum.GeneralAccess)
    if(category === ccipCategories.topCategories[1]) setCcipMenu(CCIPMenuEnum.PrivateBeta)
    if(category === ccipCategories.topCategories[2]) return
    // if(category === ccipCategories.topCategories[2]) setCcipMenu(CCIPMenuEnum.GApb)
  }
  
  return (
    <section id="ccipCategories" className="grid grid-cols-3 gap-1 justify-items-center sm:flex sm:flex-row sm:justify-items-start items-center justify-center w-full mt-5">
        {ccipCategories.topCategories.map((topCategory, index) => (
        <button
            key={uuidv4()}
            onClick={() => processCcipCategory(topCategory)}
            className={`${ccipMenu === topCategory && 'border-chainlinkBlue border-2'} hover:opacity-90 rounded-tl rounded-tr rounded-lg mx-1 bg-chainlinkBiscay text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:border-chainlinkBlue focus:ring-opacity-50 transition duration-300 ease-in-out`}
        >
            <div className={`text-md h-10 flex justify-center items-center ${ccipMenu === topCategory ? 'bg-chainlinkBlue text-chainlinkZircon': 'bg-chainlinkLavender text-chainlinkMirage'} rounded-tl rounded-tr w-32 sm:w-44`}>{topCategory}</div>
            <div className={`text-sm h-9 flex justify-center items-center text-chainlinkPerano`}>{ccipCategories.topExtra[index]}</div>
            <div className={`text-sm h-8 flex justify-center items-center bg-chainlinkMirage`}>{ccipCategories.topAddons[index]}</div>
        </button>
        ))}
    </section>
  )
}

import React, { useEffect, useState } from 'react'
import ConfettiExplosion from 'react-confetti-explosion';



const ProgressBar = ({ value }: { value: number }) => {
  const color = value <= 3 ? "bg-red-500" : value < 5  ? "bg-yellow-500" : "bg-green-500";

  const RealValue = value*100/6

  const [isExploding, setIsExploding] = useState(false)

  useEffect(() => {
    if(value === 6){setIsExploding(true)} else {setIsExploding(false)}
  })

  return (
    <div className='justify-between'>
        {isExploding ? <ConfettiExplosion />: null}
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">Progression</span>
        <span className="text-sm font-medium text-gray-700">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full ${color} transition-all duration-300`}
          style={{ width: `${RealValue}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar

import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;
  total: string;
  rate: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <div className="col-span-4 md:col-span-2 lg:col-span-1 m-2 grid grid-cols-4  rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
      <div className="flex col-span-1 ">
        <div className='float-start bg-blue-500 p-2 rounded-full h-12 w-12 justify-center'>
          {children}
        </div>
      </div>

      <div className="flex col-span-3 mx-2">

        <div className="text-center">
          <h4 className="text-xl font-bold mx-auto">
            {total}
          </h4>
          <span className="text-sm font-medium text-slate-700">{title}</span>
        </div>

        {/* <span className="text-sm font-medium text-slate-700 text-center">{title}</span> */}

        <span
          className={`flex items-center gap-1 text-sm font-medium ${levelUp && 'text-meta-3'
            } ${levelDown && 'text-meta-5'} `}
        >
          {rate}

          {levelUp && (
            <svg
              className="fill-meta-3"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                fill=""
              />
            </svg>
          )}
          {levelDown && (
            <svg
              className="fill-meta-5"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                fill=""
              />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;

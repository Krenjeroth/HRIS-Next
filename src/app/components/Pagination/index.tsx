"use client";
import { current } from '@reduxjs/toolkit';
import React from 'react';
import { useEffect } from 'react'

type Props = {
  currentPage: number
  setActivePage: any
  totalPages: number
}

function index(parameter: Props) {
  var pages = Math.floor(parameter.totalPages / 10);
  var excess = parameter.totalPages % 10;
  if (excess > 0) {
    pages += 1;
  }

  let startRange = Math.floor(parameter.currentPage / 5) * 5 + 1;

  let range = [];
  if (parameter.currentPage >= 5) {
    if (pages - parameter.currentPage <= 2) {
      startRange = pages-4; 
    }
    else {
      startRange = (parameter.currentPage - 3);
    }
    for (let i = startRange; i <= startRange + 6; i++) {
      if (i <= pages) {
        range.push(i);
      }
    }
  }
  else {
    for (let i = startRange; i < startRange + 5; i++) {
      if (i <= pages) {
        range.push(i);
      }
    }
  }

  function move(isNext: boolean) {
    if (isNext) {
      if (parameter.currentPage < pages) {
        parameter.setActivePage(parameter.currentPage + 1);
      }
    }
    else {
      if (parameter.currentPage > 1) {
        parameter.setActivePage(parameter.currentPage - 1);
      }
    }

  }

  return (
    <nav className='mt-5'>
      <ul className="inline-flex">
        <li>
          <button onClick={() => move(false)} className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-blue-100 hover:text-gray-700 ">Previous</button>
        </li>
        {range.map((item, index) => {
          return (
            <li key={index}>
              <button onClick={() => parameter.setActivePage(item)} className={`px-3 py-2 leading-tight  ${(parameter.currentPage === item) ? "bg-blue-500 text-white" : "bg-white  text-gray-500"} border border-gray-300 hover:bg-gray-100 hover:text-gray-700 `}>{item}</button>
            </li>
          );
        })}

        <li>
          <button onClick={() => move(true)} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-blue-100 hover:text-gray-700 ">Next</button>
        </li>
      </ul>
    </nav>
  )
}

export default index
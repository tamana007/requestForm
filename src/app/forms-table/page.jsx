'use client'
import React, { useState } from 'react'
import TableComp from '@/components/Table'
import ViewBtn from '@/components/ViewBtn'

function page() {
  const [clickView,setClickView]=useState(false);

  function handleView() {
    setClickView(true);
    console.log("viewed",clickView);
  }
  // function handleEdit() {
  //   console.log("editted");
  // }
  function handleDelete() {
    console.log("deleted");
  }

  return (
    <>
    {clickView?
    <ViewBtn/>
    :  <TableComp handleView={handleView} handleDelete={handleDelete} />}
    
    </>
  )
}

export default page
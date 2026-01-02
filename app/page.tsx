import React from 'react'

export default function HomePage() {
  return (
    <div className="container">
      <img src="/icon.svg" alt="Logo" width={100} height={100} />

      <h1 className="title">GALAXIE BAREV</h1>
      <p className="subtitle">Designové studio</p>
      <div className="button-group">
        <button className="my-button">Začít tvořit</button>
        <button className="my-button2">Zjistit více</button>
      </div>
    </div>
  )
}
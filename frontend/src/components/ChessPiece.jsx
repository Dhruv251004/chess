import React from 'react'

const ChessPiece = React.memo(({piece,top,left}) => {
  return (
    <div
      className={`w-20 h-20 absolute transition-all duration-3000 ease-in-out bg-contain`}
        style={{
          background: piece ? `url(${piece}) no-repeat center center/cover` : "none",
          zIndex: 2,
        }}
      >
      </div>
  )
})

ChessPiece.displayName = "ChessPiece";

export default ChessPiece

import React from 'react';
import { useSpring, animated } from 'react-spring';
import { BoardCell } from '../types/gameTypes';

interface CellProps {
  cell: BoardCell;
  index: number;
  onClick: (index: number) => void;
  isWinningCell: boolean;
  isLatestMove: boolean;
}

const Cell: React.FC<CellProps> = ({ 
  cell, 
  index, 
  onClick, 
  isWinningCell,
  isLatestMove
}) => {
  const isOccupied = cell !== null;
  
  // Animation for cell appearance
  const appearanceProps = useSpring({
    from: isLatestMove ? { transform: 'scale(0)', opacity: 0 } : { transform: 'scale(1)', opacity: 1 },
    to: { transform: 'scale(1)', opacity: 1 },
    config: { tension: 300, friction: 10 },
    reset: isLatestMove,
  });

  // Cell style
  const cellStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2.5rem',
    cursor: isOccupied ? 'not-allowed' : 'pointer',
    backgroundColor: isWinningCell ? 'rgba(255, 215, 0, 0.3)' : 'transparent',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease',
  };

  const handleClick = () => {
    if (!isOccupied) {
      onClick(index);
    }
  };

  return (
    <div 
      className="border border-2" 
      style={{ 
        aspectRatio: '1/1',
        borderRadius: '8px',
        margin: '5px'
      }}
      onClick={handleClick}
    >
      {isOccupied ? (
        <animated.div style={{ ...cellStyle, ...appearanceProps }}>
          {cell.emoji}
        </animated.div>
      ) : (
        <div style={cellStyle}></div>
      )}
    </div>
  );
};

export default Cell;
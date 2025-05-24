import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Cell from './Cell';
import { Board as BoardType } from '../types/gameTypes';

interface BoardProps {
  board: BoardType;
  winningPositions: number[];
  latestMovePosition: number | null;
  onCellClick: (index: number) => void;
}

const Board: React.FC<BoardProps> = ({ 
  board, 
  winningPositions, 
  latestMovePosition,
  onCellClick 
}) => {
  return (
    <Container className="board-container my-4" style={{ maxWidth: '450px' }}>
      <div className="board-grid">
        <Row className="g-0">
          {board.map((cell, index) => (
            <Col xs={4} key={index}>
              <Cell 
                cell={cell} 
                index={index} 
                onClick={onCellClick}
                isWinningCell={winningPositions.includes(index)}
                isLatestMove={latestMovePosition === index}
              />
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default Board;
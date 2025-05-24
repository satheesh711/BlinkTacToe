import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Player } from '../types/gameTypes';
import { useSpring, animated } from 'react-spring';

interface WinNotificationProps {
  winner: Player;
  onPlayAgain: () => void;
}

const WinNotification: React.FC<WinNotificationProps> = ({ winner, onPlayAgain }) => {
  // Animation for emoji celebration
  const emojiProps = useSpring({
    from: { transform: 'scale(0) rotate(0deg)' },
    to: { transform: 'scale(1) rotate(360deg)' },
    config: { tension: 200, friction: 10 },
  });

  // Animation for text
  const textProps = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 300,
  });

  return (
    <Modal show={true} centered backdrop="static">
      <Modal.Header style={{ 
        background: winner.category?.color || '#8A2BE2',
        color: 'white'
      }}>
        <Modal.Title className="w-100 text-center">Game Over!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center py-5">
        <animated.div style={emojiProps} className="winner-emoji mb-4">
          <div style={{ fontSize: '5rem' }}>
            {winner.category?.emojis.map((emoji, index) => (
              <span key={index} className="mx-1">{emoji}</span>
            ))}
          </div>
        </animated.div>
        <animated.div style={textProps}>
          <h2 className="mb-4">Player {winner.id} Wins!</h2>
          <p className="mb-3">
            Category: <span style={{ color: winner.category?.color }}>{winner.category?.name}</span>
          </p>
          <p className="mb-3">Score: {winner.score}</p>
        </animated.div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button 
          variant="primary" 
          size="lg" 
          onClick={onPlayAgain}
          style={{ 
            backgroundColor: winner.category?.color || '#8A2BE2',
            borderColor: winner.category?.color || '#8A2BE2',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            padding: '0.75rem 2rem',
          }}
        >
          Play Again
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WinNotification;
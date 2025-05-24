import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Player } from '../types/gameTypes';

interface PlayerTurnProps {
  players: Player[];
  currentPlayerId: number;
  currentEmoji: string;
}

const PlayerTurn: React.FC<PlayerTurnProps> = ({ 
  players, 
  currentPlayerId, 
  currentEmoji 
}) => {
  return (
    <Container className="player-turn my-3">
      <Row>
        {players.map((player) => (
          <Col key={player.id} md={6} className="mb-3">
            <Card 
              className={`player-card ${player.id === currentPlayerId ? 'active-player' : ''}`}
              style={{
                borderColor: player.category?.color || '#dee2e6',
                borderWidth: player.id === currentPlayerId ? '3px' : '1px',
                transition: 'all 0.3s ease',
                transform: player.id === currentPlayerId ? 'translateY(-5px)' : 'none',
              }}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-0">Player {player.id}</h5>
                    <small style={{ color: player.category?.color || 'gray' }}>
                      {player.category?.name || 'Selecting...'}
                    </small>
                  </div>
                  <div className="player-score" style={{ fontSize: '1.2rem' }}>
                    Score: {player.score}
                  </div>
                </div>
                
                {(
                  <div className="current-emoji mt-1 text-center">
                    <div className="current-label mb-1" style={{ fontSize: '1.4rem' }}>Your emoji:{player.id === currentPlayerId && currentEmoji}</div>
                  </div>
                )}
                
                <div className="player-emojis mt-2">
                  <small className="d-block mb-1">Board emojis:</small>
                  <div style={{ fontSize: '1.4rem' }}>
                    {player.emojis.length > 0 
                      ? player.emojis.map((e, i) => (
                          <span key={i} className="me-2">{e.emoji}</span>
                        ))
                      : <span className="text-muted">None yet</span>
                    }
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PlayerTurn;
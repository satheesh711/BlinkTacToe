import React, { useState } from 'react';
import { Modal, Button, Accordion } from 'react-bootstrap';
import { HelpCircle } from 'lucide-react';

const GameRules: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button 
        variant="outline-secondary" 
        onClick={handleShow} 
        className="rules-button position-fixed top-0 end-0 m-3"
        style={{ zIndex: 1030 }}
      >
        <HelpCircle size={20} className="me-1" />
        Rules
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Blink Tac Toe - Game Rules</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="lead">
            Welcome to Blink Tac Toe, a twist on the classic game where emojis vanish and reappear!
          </p>

          <Accordion defaultActiveKey="0" className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Game Setup</Accordion.Header>
              <Accordion.Body>
                <ol>
                  <li>The game is played on a 3x3 grid.</li>
                  <li>Each player selects an emoji category before the game starts.</li>
                  <li>Players cannot select the same category.</li>
                  <li>Player 1 goes first, followed by Player 2, alternating turns.</li>
                </ol>
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="1">
              <Accordion.Header>Emoji Assignments</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>On their turn, a player is assigned a random emoji from their chosen category.</li>
                  <li>The emoji must be placed on an empty cell on the board.</li>
                  <li>Each player can have a maximum of 3 emojis on the board at any time.</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="2">
              <Accordion.Header>The Vanishing Rule</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>When a player attempts to place their 4th emoji, their oldest emoji is automatically removed (First In, First Out).</li>
                  <li>The cell where the removed emoji was becomes empty and available for new placements.</li>
                  <li>The 4th emoji cannot be placed on the same cell where the 1st emoji was removed from.</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            
            <Accordion.Item eventKey="3">
              <Accordion.Header>Winning the Game</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>A player wins by forming a line of 3 of their emojis horizontally, vertically, or diagonally.</li>
                  <li>The game continues until one player wins.</li>
                  <li>Unlike traditional Tic Tac Toe, draws are not possible because of the vanishing emoji rule.</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <div className="strategy-tips">
            <h5>Strategy Tips</h5>
            <ul>
              <li>Pay attention to which emoji will vanish next when planning your moves.</li>
              <li>Sometimes it's better to block your opponent's potential winning move than to pursue your own line.</li>
              <li>Try to create multiple potential winning lines to increase your chances of success.</li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Got it!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GameRules;
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { EmojiCategory } from '../constants/emojiCategories';
import { Player } from '../types/gameTypes';
import CategoryCard from './CategoryCard';

interface CategorySelectionProps {
  players: Player[];
  categories: EmojiCategory[];
  onCategorySelect: (playerId: number, category: EmojiCategory) => void;
  onStartGame: () => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  players,
  categories,
  onCategorySelect,
  onStartGame,
}) => {
  const canStartGame = players.every(player => player.category !== null);
  const selectedCategoryIds = players
    .map(player => player.category?.id)
    .filter(id => id) as string[];

  return (
    <Container className="py-4">
      {players.map((player) => (
        <div key={player.id} className="mb-5">
          <h3 className="mb-3">
            Player {player.id}: Choose your emoji category
            {player.category && (
              <span className="ms-2" style={{ color: player.category.color }}>
                ({player.category.name})
              </span>
            )}
          </h3>
          <Row xs={1} md={2} lg={3} className="g-4">
            {categories.map((category) => (
              <Col key={category.id}>
                <CategoryCard
                  category={category}
                  isSelected={player.category?.id === category.id}
                  isDisabled={
                    selectedCategoryIds.includes(category.id) && 
                    player.category?.id !== category.id
                  }
                  onSelect={() => onCategorySelect(player.id, category)}
                />
              </Col>
            ))}
          </Row>
        </div>
      ))}
      
      <div className="text-center mt-4">
        <Button 
          variant="primary" 
          size="lg" 
          disabled={!canStartGame}
          onClick={onStartGame}
          className="px-5 py-3"
          style={{ fontSize: '1.2rem' }}
        >
          Start Game
        </Button>
      </div>
    </Container>
  );
};

export default CategorySelection;
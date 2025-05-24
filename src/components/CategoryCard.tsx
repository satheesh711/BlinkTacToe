import React from 'react';
import { Card } from 'react-bootstrap';
import { EmojiCategory } from '../constants/emojiCategories';

interface CategoryCardProps {
  category: EmojiCategory;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: (category: EmojiCategory) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  category, 
  isSelected, 
  isDisabled, 
  onSelect 
}) => {
  const cardStyle = {
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transform: isSelected ? 'scale(1.05)' : 'scale(1)',
    transition: 'transform 0.3s ease',
    opacity: isDisabled ? 0.5 : 1,
    borderColor: isSelected ? category.color : '#dee2e6',
    borderWidth: isSelected ? '3px' : '1px',
  };

  const handleClick = () => {
    if (!isDisabled) {
      onSelect(category);
    }
  };

  return (
    <Card 
      className="mb-3" 
      style={cardStyle} 
      onClick={handleClick}
    >
      <Card.Body className="text-center">
        <Card.Title>{category.name}</Card.Title>
        <div className="emoji-preview my-3" style={{ fontSize: '1.5rem' }}>
          {category.emojis.map((emoji, index) => (
            <span key={index} className="mx-1">{emoji}</span>
          ))}
        </div>
        {isSelected && (
          <div className="selected-badge" style={{ color: category.color }}>
            Selected
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;
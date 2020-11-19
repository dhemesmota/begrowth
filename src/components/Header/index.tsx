import React from 'react';

import { Link } from 'react-router-dom';

import { AiOutlineHeart, AiOutlineHome } from 'react-icons/ai';
import { Container } from './styles';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'small' }: HeaderProps) => (
  <Container size={size}>
    <header>
      <h1>BE GROWTH</h1>

      <nav>
        <Link to="/">
          <AiOutlineHome size={24} />
        </Link>
        <Link to="/favorites">
          <AiOutlineHeart size={24} />
        </Link>
      </nav>
    </header>
  </Container>
);

export default Header;

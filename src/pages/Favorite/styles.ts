import styled from 'styled-components';

interface CardProps {
  total?: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;

  h3 {
    font-size: 2.5rem;
    color: #ccd0d3;
  }
`;

export const ButtonFavorit = styled.button`
  border: none;
  background-color: transparent;
  padding: 10px;
`;

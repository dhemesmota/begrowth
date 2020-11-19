import styled from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
}

export const Container = styled.div<ContainerProps>`
  padding: 30px 0;
  border-bottom: 2px solid #383c48;

  header {
    max-width: 1120px;
    width: 100%;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      display: flex;
      align-items: center;

      a {
        text-decoration: none;
        font-size: 16px;
        transition: opacity 0.2s;
        border: 2px solid #383c48;
        padding: 20px;
        border-radius: 20px;
        color: #b165e1;

        display: flex;
        align-items: center;
        justify-content: center;

        & + a {
          margin-left: 32px;
        }

        &:hover {
          background-color: #383c48;
        }
      }
    }
  }
`;

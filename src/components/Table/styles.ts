import styled from 'styled-components';

export const Container = styled.section`
  margin-top: 64px;

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: #969cb3;
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }

    td {
      padding: 20px 32px;
      border: 0;
      font-size: 16px;
      font-weight: normal;
      color: #969cb3;
      border-bottom: 2px solid transparent;

      img {
        max-height: 80px;
        border-radius: 20px;
      }
    }

    td:first-child {
      border-radius: 20px 0 0 20px;
    }

    td:last-child {
      border-radius: 0 20px 20px 0;
    }

    tbody tr {
      background: #383c48;
      transition: all 0.2s;

      &:hover {
        background: #292d39;

        td {
          border-bottom-color: #3d3f4c;
        }
      }
    }
  }

  @media (max-width: 780px) {
    overflow-x: auto;
  }
`;

export const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  button,
  input {
    border: 2px solid #383c48;
    border-radius: 5px;
    height: 50px;
    padding: 10px 15px;
    background-color: transparent;
    transition: all 0.2s;
    color: #f2f5fe;

    &:hover {
      background-color: #383c48;
    }
  }

  input {
    width: 80px;
    text-align: center;
  }

  div {
    display: flex;
    align-items: center;

    input {
      border-right-width: 0;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      background-color: #2a2e3a;
      border-color: #383c48;
    }

    button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
`;

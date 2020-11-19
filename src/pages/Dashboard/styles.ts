import styled from 'styled-components';

import bgPhotos from '../../assets/photos.png';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
  position: relative;
`;

export const Section = styled.div`
  width: 100%;

  div#photos {
    display: block;
    width: 100%;
    height: 250px;
    background-image: url(${bgPhotos});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    border-radius: 20px;
    margin-bottom: 40px;
  }
`;

export const Loading = styled.div`
  z-index: 11111;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: transparent;
  color: #fff;
  font-size: 16px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Search = styled.div`
  div {
    position: relative;
    display: inline-block;
  }

  input,
  button {
    border: 2px solid #383c48;
    border-radius: 20px;
    height: 50px;
    padding: 10px 15px;
    background-color: #383c48;
    transition: all 0.2s;
    margin-left: auto;
    color: #f2f5fe;
  }

  input::placeholder {
    color: #8a8e9a;
  }

  button {
    transition: all 0.2s;
    position: absolute;
    right: 2px;
    top: 2px;
    background-color: #2a2e3a;
    border: 2px solid #2a2e3a;
    height: 46px;

    &:hover {
      background-color: #383c48;
    }
  }
`;

export const ButtonFavorit = styled.button`
  border: none;
  background-color: transparent;
  padding: 10px;
`;

export const NotFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 30px;
  margin-top: 100px;
  color: #8a8e9a;
  background-color: #383c48;
  border-radius: 20px;
`;

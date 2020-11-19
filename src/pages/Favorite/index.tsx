/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { AiFillHeart } from 'react-icons/ai';

import { Container, ButtonFavorit } from './styles';
import Table from '../../components/Table';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const Favorite: React.FC = () => {
  const [favoritePhotos, setFavoritePhotos] = useState<Photo[]>(() => {
    const photos = localStorage.getItem('@photos:favorite');

    if (!photos) return [];

    return JSON.parse(photos);
  });

  const handleFavoriteRemovePhoto = useCallback((photoRemove: Photo) => {
    const photos = localStorage.getItem('@photos:favorite');
    const parsedFavoritePhotos: Photo[] = photos ? JSON.parse(photos) : [];

    localStorage.setItem(
      '@photos:favorite',
      JSON.stringify(
        parsedFavoritePhotos?.filter((photo) => photo.id !== photoRemove.id),
      ),
    );

    setFavoritePhotos((state) =>
      state.filter((photo) => photo.id !== photoRemove.id),
    );

    toast.success('Photo removed from favorites');
  }, []);

  return (
    <>
      <Container>
        <h3>Your favorites</h3>

        <Table>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>PHOTO</th>
                <th>TITLE</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {favoritePhotos.map((photo) => (
                <tr key={photo.id}>
                  <td>{photo.id}</td>
                  <td>
                    <img src={photo.thumbnailUrl} alt={photo.title} />
                  </td>
                  <td className="title">{photo.title}</td>
                  <td>
                    <ButtonFavorit
                      onClick={() => handleFavoriteRemovePhoto(photo)}
                    >
                      <AiFillHeart size={28} color="#ff1919" />
                    </ButtonFavorit>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </Container>
    </>
  );
};

export default Favorite;

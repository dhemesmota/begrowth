/* eslint-disable react/jsx-curly-newline */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import ReactLoading from 'react-loading';

import api from '../../services/api';

import {
  Container,
  Section,
  Loading,
  Search,
  ButtonFavorit,
  NotFound,
} from './styles';
import Table from '../../components/Table';
import { Pagination } from '../../components/Table/styles';

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  favorite: boolean;
}

const Dashboard: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputSearchRef = useRef<HTMLInputElement>(null);

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const loadPhotos = useCallback(
    async (search: string | null): Promise<void> => {
      setLoading(true);

      const params = search
        ? {
            q: search,
          }
        : {
            albumId: page,
          };
      try {
        const response = await api.get<Photo[]>('/photos', {
          params,
        });

        const favoritePhotos = localStorage.getItem('@photos:favorite');
        const parsedFavoritePhotos: Photo[] = favoritePhotos
          ? JSON.parse(favoritePhotos)
          : [];

        setPhotos(
          response.data?.map((photo) => {
            return {
              ...photo,
              favorite: !!parsedFavoritePhotos?.find(
                (favorite) => favorite.id === photo.id,
              ),
            };
          }),
        );

        if (inputRef.current) {
          inputRef.current.value = String(page);
        }
      } catch (err) {
        toast.error('Ooops! Ocorreu um erro no servidor');
      } finally {
        setLoading(false);
      }
    },
    [page],
  );

  useEffect(() => {
    loadPhotos(null);
  }, [page, loadPhotos]);

  const handlePreviewPage = useCallback(() => {
    setPage((state) => (state < 2 ? 1 : state - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setPage((state) => state + 1);
  }, []);

  const handleNewPage = useCallback(() => {
    const newPage = Number(inputRef.current?.value) || 1;
    setPage(newPage < 2 ? 1 : newPage);
  }, []);

  const debounce = useCallback((func: Function, wait: number): Function => {
    let timeout: number;

    return function executedFunction(...args: number[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }, []);

  const returnedFunction = debounce(() => {
    if (
      inputSearchRef.current?.value &&
      inputSearchRef.current.value.length > 0
    ) {
      loadPhotos(inputSearchRef.current?.value);
    } else if (
      inputSearchRef.current?.value &&
      inputSearchRef.current.value.length === 0
    ) {
      loadPhotos(null);
    }
  }, 800);

  const handleClearSearch = useCallback(() => {
    loadPhotos(null);
    if (inputSearchRef.current) {
      inputSearchRef.current.value = '';
    }
  }, [loadPhotos]);

  const handleFavoritePhoto = useCallback((favoritePhoto: Photo) => {
    const favoritePhotos = localStorage.getItem('@photos:favorite');
    const parsedFavoritePhotos = favoritePhotos
      ? JSON.parse(favoritePhotos)
      : [];

    localStorage.setItem(
      '@photos:favorite',
      JSON.stringify([favoritePhoto, ...parsedFavoritePhotos]),
    );

    setPhotos((state) =>
      state.map((photo) =>
        photo.id === favoritePhoto.id ? { ...photo, favorite: true } : photo,
      ),
    );

    toast.success('Photo added to favorites');
  }, []);

  const handleFavoriteRemovePhoto = useCallback((favoritePhoto: Photo) => {
    const favoritePhotos = localStorage.getItem('@photos:favorite');
    const parsedFavoritePhotos: Photo[] = favoritePhotos
      ? JSON.parse(favoritePhotos)
      : [];

    localStorage.setItem(
      '@photos:favorite',
      JSON.stringify(
        parsedFavoritePhotos?.filter((photo) => photo.id !== favoritePhoto.id),
      ),
    );

    setPhotos((state) =>
      state.map((photo) =>
        photo.id === favoritePhoto.id ? { ...photo, favorite: false } : photo,
      ),
    );

    toast.success('Photo removed from favorites');
  }, []);

  return (
    <>
      <Container>
        <Section>
          <div id="photos" />

          <div>
            <Search>
              <div>
                <input
                  type="text"
                  name="search"
                  placeholder="Search"
                  ref={inputSearchRef}
                  onKeyUp={() => returnedFunction()}
                  disabled={loading}
                />
                {inputSearchRef?.current?.value && (
                  <button type="button" onClick={handleClearSearch}>
                    Clear
                  </button>
                )}
              </div>
            </Search>

            {loading ? (
              <Loading>
                <ReactLoading
                  type="spinningBubbles"
                  color="#f2f5fe"
                  height={100}
                />
                <p>Carregando...</p>
              </Loading>
            ) : (
              <>
                {photos.length > 0 ? (
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
                        {photos.map((photo) => (
                          <tr key={photo.id}>
                            <td>{photo.id}</td>
                            <td>
                              <img src={photo.thumbnailUrl} alt={photo.title} />
                            </td>
                            <td className="title">{photo.title}</td>
                            <td>
                              {photo.favorite ? (
                                <ButtonFavorit
                                  onClick={() =>
                                    handleFavoriteRemovePhoto(photo)
                                  }
                                >
                                  <AiFillHeart size={28} color="#ff1919" />
                                </ButtonFavorit>
                              ) : (
                                <ButtonFavorit
                                  onClick={() => handleFavoritePhoto(photo)}
                                >
                                  <AiOutlineHeart color="#969cb3" size={28} />
                                </ButtonFavorit>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <Pagination>
                      <button type="button" onClick={handlePreviewPage}>
                        Preview
                      </button>

                      <div>
                        <input type="number" name="pg" ref={inputRef} />
                        <button type="button" onClick={handleNewPage}>
                          Go
                        </button>
                      </div>

                      <button type="button" onClick={handleNextPage}>
                        Next
                      </button>
                    </Pagination>
                  </Table>
                ) : (
                  <NotFound>No data found</NotFound>
                )}
              </>
            )}
          </div>
        </Section>
      </Container>
    </>
  );
};

export default Dashboard;

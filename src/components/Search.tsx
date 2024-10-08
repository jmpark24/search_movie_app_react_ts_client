import React, { useRef, useCallback, FC, ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/movies';
import { setSearchText } from '../redux/slices/movieSlice';
import { searchMovies } from '../redux/thunks/movieThunks';

const Search: FC = () => {
  const [text, setText] = useState<string>('');
  const dispatch: AppDispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { page } = useSelector((state: RootState) => state.Movies);

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSearch = useCallback(() => {
    const trimmedText = text.trim();
    if (trimmedText) {
      dispatch(setSearchText(trimmedText));
      dispatch(searchMovies({ page: page, title: trimmedText }));
    }
  }, [text, dispatch, page]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    },
    [handleSearch]
  );

  return (
    <div className="flex gap-[10px] mb-[30px]">
      <input
        ref={inputRef}
        value={text}
        onChange={onChangeText}
        onKeyDown={handleKeyDown}
        placeholder="검색할 영화 제목을 입력하세요!"
        className="flex-grow h-[50px] px-[20px] rounded-[4px] border-none outline-none text-[14px] text-color-white bg-color-area placeholder:text-color-white-30"
      />
      <button className="flex-grow max-w-[150px] btn btn-primary" onClick={handleSearch}>
        검색!
      </button>
    </div>
  );
};

export default Search;

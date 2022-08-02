import react, { useState, useReducer } from "react";

const initialState = {
  favorites: [],
};

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      const isExist = state.favorites.find(
        (item) => item.id === action.payload.id
      );
      if (isExist) return { ...state };
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          (items) => items.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

const Card = ({ book }) => {
  const { id, imageLinks, title, isFavorite, handleClickRemove } = book;
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  //console.log(book);

  const handleClick = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
    console.log("se tomo la funcion", favorite);
  };

  return (
    <>
      {book.map((item) => {
        let thumbnail =
          item.volumeInfo.imageLinks &&
          item.volumeInfo.imageLinks.smallThumbnail;
        let amount = item.saleInfo.listPrice && item.saleInfo.listPrice.amount;
        if (thumbnail != undefined && amount != undefined) {
          return (
            <>
              <div className="card">
                <img src={thumbnail} alt="" />
                <div className="bottom">
                  <h3 className="title">{item.volumeInfo.title}</h3>
                  <br></br>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleClick({ item })}
                  >
                    Agregar a favoritos
                  </button>
                </div>
              </div>
            </>
          );
        }
      })}
    </>
  );
};
export default Card;

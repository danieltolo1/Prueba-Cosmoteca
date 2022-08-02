import react, { useState, useReducer } from "react";
import Card from "./Card";
import axios from "axios";
import "./Main.css";

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

const Main = () => {
  const [search, setSearch] = useState("");
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [bookData, setData] = useState([]);
  const searchBook = (evt) => {
    if (evt.key === "Enter") {
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            search +
            "&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU" +
            "&maxResults=40"
        )
        .then((res) => setData(res.data.items))
        .catch((err) => console.log(err));
    }
  };

  const handleClick = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
    console.log("se tomo la funcion 3", favorite);
  };

  return (
    <div className="container_Principal">
      <div className="primer_Container">
        <div className="header">
          <div className="row1">
            <h1>
              Escribe en el buscador el tema de tus libros favoritos y oprime
              ENTER
            </h1>
          </div>
          <div className="row2">
            <div className="search">
              <input
                type="text"
                placeholder="Enter Your Book Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={searchBook}
              />
              <button>
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="empaquetado">
          <div className="mini_Container">
            {<Card book={bookData} handleClick={handleClick} />}
          </div>
        </div>
      </div>
      <div className="segundo_Container">
        <div className="header">
          <div className="row1">
            <h1>Libros Favoritos</h1>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};
export default Main;

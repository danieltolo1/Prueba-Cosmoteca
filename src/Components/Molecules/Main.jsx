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
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "REMOVE_TO_FAVORITE":
      console.log(action.payload.id);
      return {
        favorites: state.favorites.filter(
          (items) => items.id !== action.payload.id
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
    //console.log(favorites);
  };

  const handleremove = (favorite) => {
    dispatch({ type: "REMOVE_TO_FAVORITE", payload: favorite });
    //console.log("remove es", favorite, favorites);
  };

  //console.log(favorites);
  return (
    <div className="container_Principal">
      <div className="primer_Container">
        <div className="header">
          <div className="row1">
            <h1>Escribe en el buscador el libro favorito y oprime ENTER</h1>
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
            <Card book={bookData} handleClick={handleClick} />
          </div>
        </div>
      </div>
      <div className="segundo_Container">
        <div className="header">
          <div className="row1">
            <h1>Libros Favoritos</h1>
          </div>

          <div className="mini_Container2">
            <Card book={favorites.favorites} handleremove={handleremove} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;

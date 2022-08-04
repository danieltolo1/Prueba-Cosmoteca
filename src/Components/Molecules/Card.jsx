import React, { useState, useReducer } from "react";

const Card = ({ book, handleClick, handleremove }) => {
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
              <div className="card" key={item.id}>
                <img src={thumbnail} alt="" />
                <div className="bottom">
                  <h3 className="title">{item.volumeInfo.title}</h3>
                  <br></br>
                </div>
                {!!handleClick && (
                  <div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleClick(item)}
                    >
                      Agregar a favoritos
                    </button>
                  </div>
                )}
                {!!handleremove && (
                  <div className="card" key={item.id}>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleremove(item)}
                    >
                      Eliminar de Favoritos
                    </button>
                  </div>
                )}
              </div>
            </>
          );
        }
      })}
    </>
  );
};
export default Card;

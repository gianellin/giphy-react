import React from "react";

function Giphy(props) {
  return (
    <div className="giphyA">
      <img src={props.gifItem.img_url} alt="url" />
    </div>
  );
}

export default Giphy;
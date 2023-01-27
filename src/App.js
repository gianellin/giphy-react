import "./styles.css";
import Form from './Components/Form/Form';
import Giphy from "./Components/Giphy/Giphy";
import { useEffect, useState } from "react";

export default function App() {
  const [gifItem, setGifItem] = useState({});
  const [prevGifs, setPrevGifs] = useState([]);

  const key = "Q0MzNjeaom0nAz2cESqT7QdOpyVuybsB";

  const makeApiCall = async () => {
    const gifItem = `https://api.giphy.com/v1/gifs/random?api_key=${key}`;
    try {
      const res = await fetch(gifItem);
      const json = await res.json();
      console.log("makeApiCall", json.data);
      setGifItem({ img_url: json.data.images.downsized.url });
    } catch (err) {
      console.log("err", err);
    }
  };
  //calling the function
  useEffect(() => {
    makeApiCall();
  }, []);

  const handleSubmit = async (val) => {
    if(val) {
      const gifItem = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${val}&limit=1`;
      const res = await fetch(gifItem);
      const json = await res.json();
      console.log('handleSumbit', json.data[0].images.downsized.url );
      setGifItem({ img_url: json.data[0].images.downsized.url });
    } else {
      makeApiCall()
    }
  };

  return (
    <div className="App">
      <h1>Giphy</h1>
      <Form handleSubmit={handleSubmit} />
      <br />
      <br />
      {/* this is returning the giphy */}
      {gifItem.img_url ? (
        <Giphy gifItem={gifItem} />
      ) : (
        <h2>It is just a gif</h2>
      )}
    </div>
  );
}

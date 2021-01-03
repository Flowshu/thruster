import React, { useEffect, useState } from 'react';
import CardPanel from '../components/CardPanel';
import GamesService from '../services/GamesService';
import { BACKEND_URL } from '../config/config';

export default function Games() {

    const gamesService = GamesService.Instance;
    const [games, setGames] = useState(new Array<any>());

    // TODO: HEAD then GET
    useEffect(() => {
        fetch(BACKEND_URL + '/games')
          .then(response => { return response.json() })
          .then(json => setGames(json));
      }, []);

    const handleAddGame = (payload: any) => {
      if (gamesService.addGame(payload)) {
        setGames(items => [...items, payload]);
      }
    };

    const handleRemoveGame = (payload: any) => {
      //gamesService.removeGame(payload);
      //setGames([]);
      //TODO
    };

    return <CardPanel 
      games={games} 
      handleAdd={handleAddGame} 
      handleRemove={handleRemoveGame}
    />;
}

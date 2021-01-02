import IGame from "../models/IGame";

export default class GamesService {
    private static _instance: GamesService;
    private _gamelist : IGame[];

    private constructor() {
        this._gamelist = new Array<IGame>();
    }

    public static get Instance() : GamesService {
        return this._instance || (this._instance = new GamesService());
    }

    public get gamelist() : IGame[] { return this._gamelist; }

    public fetchAllGames() {
        fetch('http://localhost:3001/games',{ method: 'GET' })
            .then(response => response.json())
            .catch(err => console.log(err));
    }

    public addGame(game: IGame) {
        this._gamelist.forEach(element => {
            if (element === game) return false;
        });
        this._gamelist.push(game);
        fetch('http://localhost:3001/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(game) })
        .then(response => response.json())
        .catch(err => console.log(err));
        return true;
    }

    public removeGame(title: string) {
        this._gamelist = this._gamelist.filter((game) => {
            return game.title !== title;
        });
    }
}

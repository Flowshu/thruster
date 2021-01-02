import ICollection from "../models/ICollection";

export class CollectionsService {
    private static _instance: CollectionsService;
    private _collectionList : ICollection[];

    private constructor() {
        this._collectionList = new Array<ICollection>(0);
    }

    public static get Instance() : CollectionsService {
        return this._instance || (this._instance = new CollectionsService());
    }

    public get collectionList() : ICollection[] { return this._collectionList; }

    public addCollection(collection: ICollection): boolean {
        this._collectionList.forEach(element => {
            if (element === collection) return false;
        });
        this._collectionList.push(collection);
        return true;
    }

    public removecollection(name: string) {
        this._collectionList = this._collectionList.filter((collection) => {
            return collection.name !== name;
        });
    }
}
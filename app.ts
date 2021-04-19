/*
    The app module has the responsibility to manage apps, just edit, add, delete;

    An app should have a name, url, description.

    Danny should be able to create the "vex" app with the url "vex.dev", description "god application".
    Danny wants to edit the description to "g" but descriptions can't be smaller than 5 length.
    Danny gets frustrated and tries to delete it.
    The End.

    LOG EVERYTHING

    FOLLOW THE S IN SOLID.

    TRY TO FOLLOW THE CODE STYLE OF EXISTING CODE.
*/

import { IValidatable } from ".";



export interface IApp {
    id: ID,
    name: Name,
    url: URL,
    description: Description
}

export interface IAppModule {
    /**
     * Inserts an app
     */
    add(app: IApp): Promise<IApp>;

    /**
     * deletes an app
     * @param ID app id
     */
    delete(ID: ID): Promise<void>;

    /**
     * Edits an app
     * @param editedApp the IApp to change the
     */
    edit(ID: ID, editedApp: IApp): Promise<IApp>;

    /**
     * Get an app by id
     * @param id the apps ID
     */
    get(Id: ID): Promise<IApp>;
}

export class ID implements IValidatable {
    private _value: number;

    constructor(id: number) {
        this._value = id;
    }

    get value(): number {
        return this._value;
    }

    isValid(): boolean {
        return true;
    }
}

export class Name implements IValidatable {
    private _value: string;

    constructor(name: string) {
        this._value = name;
    }

    get value(): string {
        return this._value;
    }

    isValid(): boolean {
        return true;
    }
}

class DescriptionNotValid extends Error {
    constructor(message : string) {
        super(message);

        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;

        // capturing the stack trace keeps the reference to your error class
        this.stack = new Error().stack;
    }
}

export class Description implements IValidatable {
    private _value: string;

    constructor(name: string) {
        this._value = name;

        if (!this.isValid()) {
            throw new DescriptionNotValid("Description length cannot be smaller than 5.");
        }
    }

    get value(): string {
        return this._value;
    }

    isValid(): boolean {
        return this._value.length >= 5;
    }
}

export class MemoryAppModule implements IAppModule {
    private _apps: IApp[] = [];

    add(app: IApp): Promise<IApp> {
        return new Promise((resolve, reject) => {
            this._apps.push(app);

            return resolve(app);
        });
    }

    delete(ID: ID): Promise<void> {
        return new Promise((resolve, reject) => {
            this._apps = this._apps.splice(this._apps.findIndex(app => app.id === ID), 0);

            console.log(this._apps);

            return resolve();
        });
    }

    edit(ID: ID, editedApp: IApp): Promise<IApp> {
        return new Promise((resolve, reject) => {
            const foundAppIndex = this._apps.findIndex(app => app.id === ID)
           
            this._apps[foundAppIndex] = editedApp;

            return resolve(this._apps[foundAppIndex]);
        });
    }

    get(id: ID): Promise<IApp> {
        return new Promise((resolve, reject) => {
            return resolve(this._apps[this._apps.findIndex(app => app.id === id)]);
        });
    }
}
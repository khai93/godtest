import { Logger } from 'tslog';
import { Description, IApp, IAppModule, ID, MemoryAppModule, Name } from './app';
import { ILoggerModule, TsLogLoggerModuleDependencies, NodeLoggerModule, TsLogLoggerModule } from './logger';

export type DannyDependencies = {
    logger: ILoggerModule,
    app: IAppModule
}

export interface IValidatable {
    isValid(): boolean
}

class UsernameNotValidError extends Error {

    constructor(message : string) {
        super(message);

        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;

        // capturing the stack trace keeps the reference to your error class

        this.stack = new Error().stack;
    }
}


class PasswordNotValidError extends Error {
    constructor(message : string) {
        super(message);

        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;

        // capturing the stack trace keeps the reference to your error class
        this.stack = new Error().stack;
    }
}

export class Username implements IValidatable {
    private _value: string;

    constructor(username: string) {
        this._value = username;

        if (!this.isValid()) {
            throw new UsernameNotValidError("Username has less than 3 characters");
        }
    }

    get value(): string {
        return this._value
    }

    isValid = () => this._value.length >= 3;
}

export class Age implements IValidatable {
    private _value: number;

    constructor(age: number) {
        this._value = age;
    }

    isValid(): boolean {
        return true;
    }

    get value(): number {
        return this._value;
    }
}

export class Password implements IValidatable {
    private readonly _value: string;

    constructor(username: string) {
        this._value = username;
        
        if (!this.isValid()) {
            throw new PasswordNotValidError("Password has less than 3 characters");
        }
    }

    get value(): string {
        return this._value;
    }

    isValid = () => this._value.length >= 3;
}

class Danny {
    constructor(private dependencies: DannyDependencies) {
        this.dependencies.logger.log("I AM DANNY");
    }

    register(username: Username, password: Password) {
        this.dependencies.logger.log(`Registering as ${username.value}:${password.value}`)
        this.dependencies.logger.log("Registered to Roblox.com");
    }

    createApp(app: IApp) {
        this.dependencies.logger.log("Danny created app '" + app.name.value + "'");
        return this.dependencies.app.add(app);
    }

    editApp(id: ID, editedApp: IApp) {
        this.dependencies.logger.log("Danny edited App '" + editedApp.name.value + "'");
        return this.dependencies.app.edit(id, editedApp);
    }

    deleteApp(id: ID) {
        this.dependencies.logger.log("Danny deleted an app");
        return this.dependencies.app.delete(id);
    }

    findApp(id: ID) {
        this.dependencies.logger.log("Danny tries to find the app with id '" + id + "'")
        return this.dependencies.app.get(id);
    }

    scream(error: Error) {
        this.dependencies.logger.error(error);
    }
}

const LoggerModule = new TsLogLoggerModule({tsLogLogger: new Logger({})});
const AppModule = new MemoryAppModule();
const DannyInstance = new Danny({logger: LoggerModule, app: AppModule});

try {
    DannyInstance.register(new Username("dng"), new Password("13232"));

    try {
        const vexApp: IApp = {
            id: new ID(1),
            name: new Name("vex"),
            url: new URL("http://vex.dev"),
            description: new Description("god application")
        };

        DannyInstance.createApp(vexApp);

        const editVexApp: IApp = {
            id: vexApp.id,
            name: vexApp.name,
            description: new Description("g"),
            url: vexApp.url
        };

        DannyInstance.editApp(vexApp.id, editVexApp);


    } catch (e) {
        DannyInstance.scream(e);

        // yes
        DannyInstance.deleteApp(new ID(1));
    }
} catch (e) {
    DannyInstance.scream(e);
}
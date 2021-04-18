import { Logger } from 'tslog';
import { ILoggerModule, TsLogLoggerModuleDependencies, NodeLoggerModule, TsLogLoggerModule } from './logger';

export type DannyDependencies = {
    logger: ILoggerModule
}

export interface IValidatable {
    isValid(): boolean
}


class UsernameNotValidError extends Error {
    constructor(message) {
        super(message);

        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;

        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);

        this.stack = new Error().stack;
    }
}


class PasswordNotValidError extends Error {
    constructor(message) {
        super(message);

        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;

        // capturing the stack trace keeps the reference to your error class
        this.stack = new Error().stack;
    }
}

export class Username implements IValidatable {
    private _username: string;

    constructor(username: string) {
        this._username = username;

        if (!this.isValid()) {
            throw new UsernameNotValidError("Username has less than 3 characters");
        }
    }

    isValid = () => this._username.length >= 3;
}

export class Password implements IValidatable {
    private _password: string;

    constructor(username: string) {
        this._password = username;

        if (!this.isValid()) {
            throw new PasswordNotValidError("Password has less than 3 characters");
        }
    }

    isValid = () => this._password.length >= 3;
}

class Danny {
    constructor(private dependencies: DannyDependencies) {
        this.dependencies.logger.log("I AM DANNY");
    }

    register(username: Username, password: Password) {
        this.dependencies.logger.log("Registered to Roblox.com");
    }

    scream(error: Error) {
        this.dependencies.logger.error(error);
    }
}

const LoggerModule = new TsLogLoggerModule({tsLogLogger: new Logger({})});

const DannyInstance = new Danny({logger: LoggerModule});

try {
    DannyInstance.register(new Username("dng"), new Password("12"));
} catch (e) {
    DannyInstance.scream(e);
}
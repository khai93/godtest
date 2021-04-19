import { ILogObject, Logger, LoggerWithoutCallSite } from "tslog";

LoggerWithoutCallSite
export interface ILoggerModule {
    log(message: string) : void;
    warn(message: string) : void;
    error(error: Error) : void;
}


export class NodeLoggerModule implements ILoggerModule {
    log(message: string) {
        console.log(message);
    }

    warn(message: string) {
        console.warn(message);
    }

    error(error: Error) {
        console.error(error.message);
    }
}

export type TsLogLoggerModuleDependencies = {
    tsLogLogger: Logger
}

export class TsLogLoggerModule implements ILoggerModule {

    constructor(private dependencies: TsLogLoggerModuleDependencies) {}

    log(message: string) {
        this.dependencies.tsLogLogger.silly(message);
    }
    warn(message: string) {
        this.dependencies.tsLogLogger.warn(message);
    }
    error(error: Error) {
        this.dependencies.tsLogLogger.prettyError(error);
    }

}


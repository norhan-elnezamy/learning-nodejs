import dotenv, {config} from "dotenv";

dotenv.config();

export class Config {

    private static configs = process.env;

    public static get(key: string): any
    {
        return this.configs[key] ?? null;
    }
}
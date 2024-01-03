export default class EnvReader {
  public read(key: string): string | undefined {
    return process.env[key.toUpperCase()];
  }
}

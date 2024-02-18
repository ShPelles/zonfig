export default class EnvReader {
  public read(path: string[]): string | undefined {
    const key = path.join("@").toUpperCase();
    return process.env[key];
  }
}

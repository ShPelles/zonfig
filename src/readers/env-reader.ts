export default class EnvReader {
  public read(path: string[]): string | undefined {
    const key = path.join("_").toUpperCase();
    return process.env[key];
  }
}

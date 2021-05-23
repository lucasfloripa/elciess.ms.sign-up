export interface IdGenerator {
  generate: () => Promise<string>
}

export interface HashComparer {
  compare: (hash: string, hashToCompare: string) => Promise<boolean>
}

declare module 'to-ico' {
  type ToIco = (
    files: Buffer[],
    options?: {
      resize?: boolean
      sizes: (16 | 24 | 32 | 48 | 64 | 128 | 256)[]
    }
  ) => Promise<Buffer>
  const foo: ToIco
  export = foo
}

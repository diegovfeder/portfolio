declare module '@vinxi/plugin-mdx' {
  const mdx: {
    withImports: (options?: any) => (config?: any) => any
    default: {
      withImports: (options?: any) => (config?: any) => any
    }
  }
  export default mdx
}

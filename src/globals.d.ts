// global types (don't require importing)
// declare function require(moduleName: string): any

// declare module '*.scss' {
//   const styles: Record<string, string>
//   export default styles
// }
// declare module '*.png' {
//   const content: string
//   export default content
// }
// declare module '*.jpg' {
//   const content: string
//   export default content
// }
// declare module '*.svg' {
//   const content: string
//   export default content
// }

declare module '*.woff' {
  const content: string
  export default content
}

// declare module '*.otf' {
//   const content: string
//   export default content
// }

// declare type QueryString = Record<string, string | undefined>

// declare type InputEvent = React.FormEvent<HTMLInputElement>
// declare type FormEvent = React.FormEvent<HTMLFormElement>
// declare type LinkEvent = React.MouseEvent<HTMLAnchorElement>
// declare type SelectEvent = React.ChangeEvent<HTMLSelectElement>
// declare type ButtonEvent = React.FormEvent<HTMLButtonElement>

// a class e.g. JS constructor function
// declare type Constructor<T, U extends Array<any> = any> = new (...args: U) => T

// interface Array<T> {
//   // mobx array methods. Only use if it's a mobx array.
//   // not sure if there's a way to do this non-globally?
//   replace(newItems: T[]): T[]
//   remove(value: T): boolean
//   clear(): T[]
// }

// interface Map<K, V> {
//   // mobx map methods. Only use if it's a mobx map.
//   // not sure if there's a way to do this non-globally?
//   toJSON(): Record<string, V>
// }

// declare module "googlemaps"
// declare module '@contentful/rich-text-html-renderer'
// declare module 'react-balance-text'
// declare module 'html-to-react'

// interface Window {
//   dataLayer: Record<string, any>[]
//   globals: {
//     pageData?: {
//       contentful?: {
//         data: any
//         document_paths: Array<string | number>
//       }
//     }
//     pageDataPath?: string
//     stripeApiKey: string
//     privateBeta: boolean
//     enableSubscriptions: boolean
//     authError?: string
//     mxtUser?: string
//   }
//   externalAuthCallback?(res: any): void
// }

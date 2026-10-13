import * as helmetPkg from 'react-helmet-async'

export const HelmetProvider = helmetPkg.HelmetProvider || helmetPkg.default?.HelmetProvider
export const Helmet = helmetPkg.Helmet || helmetPkg.default?.Helmet

export default helmetPkg

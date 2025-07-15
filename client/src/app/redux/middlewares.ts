import type { Middleware } from '@reduxjs/toolkit'

const loggerMiddleware: Middleware = (storeAPI) => (next) => (action) => {
    console.log('[Redux] Dispatching:', action)
    const result = next(action)
    console.log('[Redux] Next State:', storeAPI.getState())
    return result
}

export default loggerMiddleware;
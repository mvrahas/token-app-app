import React, {createContext} from 'react'
import Analytics from 'analytics'
import googleTagManager from '@analytics/google-tag-manager'


const AnalyticsContext = createContext<AnalyticsContextType|null>(null)


export const AnalyticsProvider : React.FC<Props> = ({children})=>{

    const analytics = Analytics({
        app: 'token-app',
        plugins: [
            googleTagManager({
              containerId: 'GTM-N37TMHT8'
            })
        ]
    })

    return(
        <AnalyticsContext.Provider value={analytics}>
            {children}
        </AnalyticsContext.Provider>
    )
}


export default AnalyticsContext
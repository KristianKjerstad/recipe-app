import { ReactPlugin } from '@microsoft/applicationinsights-react-js'
import { ApplicationInsights } from '@microsoft/applicationinsights-web'

let reactPlugin: null | ReactPlugin = null
let appInsights: null | ApplicationInsights = null

/**
 * Create the App Insights Telemetry Service
 * @return {{reactPlugin: ReactPlugin, appInsights: ApplicationInsights, initialize: Function}} - Object
 */
const createTelemetryService = () => {
    /**
     * Initialize the Application Insights class
     * @param {string} instrumentationKey - Application Insights Instrumentation Key
     * @param {Object} browserHistory - client's browser history, supplied by the withRouter HOC
     * @return {void}
     */
    const initialize = (instrumentationKey: string, browserHistory: any) => {
        if (!browserHistory) {
            throw new Error('Could not initialize Telemetry Service')
        }
        if (!instrumentationKey) {
            throw new Error('Instrumentation key not provided')
        }

        reactPlugin = new ReactPlugin()

        appInsights = new ApplicationInsights({
            config: {
                instrumentationKey: instrumentationKey,
                maxBatchInterval: 0,
                disableFetchTracking: false,
                extensions: [reactPlugin],
                extensionConfig: {
                    [reactPlugin?.identifier]: {
                        history: browserHistory,
                    },
                },
            },
        })

        appInsights?.loadAppInsights()
    }

    return { reactPlugin, appInsights, initialize }
}

export const ai = createTelemetryService()
export const getAppInsights = () => appInsights

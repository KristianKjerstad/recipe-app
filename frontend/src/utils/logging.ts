import { SeverityLevel } from '@microsoft/applicationinsights-common'

import { getAppInsights } from './telemetryService'

const DEV = 'Dev'

const getEnvironment = () => {
    return 'not dev' //DEV
}

export const info = (message: string) => {
    const obj = {
        message: message,
        severityLevel: SeverityLevel.Information,
    }

    if (getEnvironment() === DEV) {
        console.log(obj)
        return
    }

    const insights = getAppInsights()
    console.log('send info to app insights')
    if (insights) {
        insights.trackTrace(obj)
    }
}

export const warning = (message: string) => {
    const obj = {
        message: message,
        severityLevel: SeverityLevel.Warning,
    }

    if (getEnvironment() === DEV) {
        console.log(obj)
        return
    }

    const insights = getAppInsights()
    if (insights) {
        insights.trackTrace(obj)
    }
}

export const error = (error: string) => {
    const obj = {
        message: error,
        severityLevel: SeverityLevel.Error,
    }

    if (getEnvironment() === DEV) {
        console.log(obj)
        return
    }

    const insights = getAppInsights()
    if (insights) {
        insights.trackException(obj)
    }
}

export const event = (name: string, properties: any) => {
    const obj = {
        name,
        properties,
    }

    if (getEnvironment() === DEV) {
        console.log(obj)
        return
    }

    const insights = getAppInsights()
    if (insights) {
        insights.trackEvent(obj)
    }
}

import { withAITracking } from '@microsoft/applicationinsights-react-js'
import React, { Component, Fragment } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ai } from '../utils/telemetryService'

export function withRouter<ComponentProps>(
    Component: React.FunctionComponent<ComponentProps>
) {
    function ComponentWithRouterProp(props: ComponentProps) {
        const location = useLocation()
        const navigate = useNavigate()
        const params = useParams()

        return <Component {...props} router={{ location, navigate, params }} />
    }

    return ComponentWithRouterProp
}

type TelemetryProps = {
    // using `interface` is also ok
    history?: any
    instrumentationKey: string
    children?: any
    after: () => void
}
type TelemetryState = {
    initialized: boolean // like this
}

/**
 * This Component provides telemetry with Azure App Insights
 *
 * NOTE: the package '@microsoft/applicationinsights-react-js' has a HOC withAITracking that requires this to be a Class Component rather than a Functional Component
 */
class TelemetryProvider extends Component<TelemetryProps, TelemetryState> {
    state = {
        initialized: false,
    }

    componentDidMount() {
        const { history } = this.props
        const { initialized } = this.state
        const AppInsightsInstrumentationKey = this.props.instrumentationKey // PUT YOUR KEY HERE
        if (
            !initialized &&
            Boolean(AppInsightsInstrumentationKey) &&
            Boolean(history)
        ) {
            ai.initialize(AppInsightsInstrumentationKey, history)
            this.setState({ initialized: true })
        }

        this.props.after()
    }

    render() {
        const { children } = this.props
        return <Fragment>{children}</Fragment>
    }
}

export default withRouter(withAITracking(ai.reactPlugin, TelemetryProvider))

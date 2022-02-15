import React from 'react'
import { SceneExport } from 'scenes/sceneTypes'
import { dataManagementPageLogic } from 'scenes/data-management/dataManagementPageLogic'
import { DataManagementHeader } from 'scenes/data-management/DataManagementHeader'
import { Alert, Skeleton } from 'antd'
import { DefinitionDrawer } from 'scenes/events/definitions/DefinitionDrawer'
import { eventDefinitionsModel } from '~/models/eventDefinitionsModel'
import { preflightLogic } from 'scenes/PreflightCheck/logic'
import { useValues } from 'kea'
import { VolumeTable } from 'scenes/events/VolumeTable'
import { UsageDisabledWarning } from 'scenes/events/UsageDisabledWarning'

export function DataManagementEvents(): JSX.Element {
    const { preflight } = useValues(preflightLogic)
    const { eventDefinitions, loaded } = useValues(eventDefinitionsModel)

    return (
        <>
            <DataManagementHeader />
            {loaded ? (
                <>
                    {preflight && !preflight?.is_event_property_usage_enabled ? (
                        <UsageDisabledWarning tab="Events Stats" />
                    ) : (
                        (eventDefinitions.length === 0 || eventDefinitions[0].volume_30_day === null) && (
                            <>
                                <Alert
                                    type="warning"
                                    message="We haven't been able to get usage and volume data yet. Please check later."
                                />
                            </>
                        )
                    )}
                    <VolumeTable data={eventDefinitions} type="event" />
                </>
            ) : (
                <Skeleton active paragraph={{ rows: 5 }} />
            )}
            <DefinitionDrawer />
        </>
    )
}

export const scene: SceneExport = {
    component: DataManagementEvents,
    logic: dataManagementPageLogic,
}

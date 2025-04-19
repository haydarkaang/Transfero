import React from 'react'
import XCard from '../../XCommon/XCard'
import { PermissionObject } from '../../../type/PermissionTypes'
import IconFactory from '../../../util/IconFactory'

const RejectedPermissionList = ({ permissionList }: { permissionList: PermissionObject[] }) => {
    return (
        permissionList.map((p, i) => <XCard
            key={i}
            icon={IconFactory.createEntypoIcon('block', '#fff')}
            title={p.title}
            nodes={[{ text: p.description }]}
        />)
    )
}

export default RejectedPermissionList
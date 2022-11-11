import React, { useState } from 'react'
import { Col, Row, Select, Typography } from 'antd'

// local
import FilterAllDevices from './partials/filter/flterAllDevices'
import FilterByDevice from './partials/filter/filterByDevice'
import FilterByUser from './partials/filter/filterByUser'
import ListAllDevices from './partials/list/listAllDevices'

// scss
import styles from './deviceManagement.module.scss'
const DeviceManagement = () => {
  // state
  const [tableType, setTableType] = useState(0)

  const handleChangeTable = (value) => {
    setTableType(value)
  }
  return (
    <>
      <Row>
        <Col>
          <Typography.Text className={styles.labelSelectType}>Phân loại theo:</Typography.Text>
          <Select defaultValue={tableType} onChange={handleChangeTable}>
            <Select.Option value={0}>Default</Select.Option>
            <Select.Option value={1}>Devices</Select.Option>
            <Select.Option value={2}>User</Select.Option>
          </Select>
        </Col>
      </Row>
      {tableType === 0 && (
        <>
          <FilterAllDevices />
          <ListAllDevices />
        </>
      )}
      {tableType === 1 && <FilterByDevice />}
      {tableType === 2 && <FilterByUser />}
    </>
  )
}

export default DeviceManagement

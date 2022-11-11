import React from 'react'
import { Button, Col, Form, Input, Row, Select, Spin } from 'antd'

import styles from '../../deviceManagement.module.scss'

const { Option } = Select
const FilterAllDevices = () => {
  // state
  const { form } = Form.useForm()

  const onFinish = (value) => {
    console.log(value)
  }
  return (
    <Spin spinning={false}>
      <Form
        className={styles.filterContainer}
        form={form}
        initialValues={{
          deviceName: '',
          deviceCode: '',
          deviceType: 'All'
        }}
        onFinish={onFinish}
      >
        <Row className={styles.filterInput}>
          <Col xl={8}>
            <Form.Item name='deviceName' label='Name Equitment'>
              <Input allowClear placeholder='string for search' />
            </Form.Item>
          </Col>
          <Col xl={8}>
            <Form.Item name='deviceCode' label='Code Equitment'>
              <Input allowClear placeholder='string for search' />
            </Form.Item>
          </Col>
          <Col xl={6}>
            <Form.Item name='deviceType' label='Type Equitment'>
              <Select>
                <Option value='All'>All</Option>
                {/* {listDeviceType.map((type, index) => (
                  <Option key={index} value={`${type}`}>{type}</Option>
                ))} */}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col className={styles.filterButton} xl={24}>
            <Button htmlType='submit' type='primary'>
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  )
}

export default FilterAllDevices

import React from 'react'
import { Button, Row, Col, Form, Input, Spin } from 'antd'

import styles from '../../deviceManagement.module.scss'

const FilterByUser = () => {
  // state
  const { form } = Form.useForm()

  const onFinish = (value) => {
    console.log(value)
  }

  return (
    <Spin className={styles.spinningContainer} spinning={false}>
      <Form
        className={styles.filterDetailContainer}
        form={form}
        initialValues={{
          userName: ''
        }}
        onFinish={onFinish}
      >
        <Row className={styles.filterDetailWrapper}>
          <Col xl={10}>
            <Form.Item name='userName' label='User Name'>
              <Input autoFocus allowClear placeholder='string for search' />
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Button htmlType='submit' type='primary'>
              Search
            </Button>
          </Col>
        </Row>
      </Form>
    </Spin>
  )
}

export default FilterByUser

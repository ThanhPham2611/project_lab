import React, { useState } from 'react'
import { Col, Row, Form, Typography, Select, Table } from 'antd'

// scss
import styles from '../../deviceManagement.module.scss'

const headCells = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no'
  },
  {
    title: 'Equitment',
    dataIndex: 'deviceName',
    key: 'deviceName'
  },
  {
    title: 'Code',
    dataIndex: 'deviceCode',
    key: 'deviceCode'
  },
  {
    title: 'Type',
    dataIndex: 'deviceType',
    key: 'deviceType'
  },
  {
    title: 'Quantity',
    dataIndex: 'amount',
    key: 'amount'
  },
  {
    title: 'Import Date',
    dataIndex: 'importDate',
    key: 'importDate'
  },
  {
    title: 'QiS',
    dataIndex: 'quantityInStock',
    key: 'quantityInStock'
  },
  {
    title: 'QfB',
    dataIndex: 'quantityForBorrow',
    key: 'quantityForBorrow'
  },
  {
    title: 'Broken',
    dataIndex: 'broken',
    key: 'broken'
  },
  {
    title: 'Note',
    dataIndex: 'note',
    key: 'note'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action'
  }
]
const ListAllDevices = () => {
  // state
  const [itemPerPage, setItemsPerPage] = useState(5)

  const handlePerPageChange = (value) => {
    setItemsPerPage(value)
  }

  return (
    <>
      <Row>
        <Col className={styles.tableInfo} xl={24}>
          <Form>
            <Form.Item className={styles.tableInfo_detail} label='Total equitmemt'>
              <Typography.Text>0</Typography.Text>
            </Form.Item>
          </Form>
          <Form>
            <Form.Item className={styles.tableInfo_detail} label='Items per page'>
              <Select defaultValue={5} onChange={handlePerPageChange}>
                <Select.Option value={5}>5</Select.Option>
                <Select.Option value={10}>10</Select.Option>
                <Select.Option value={15}>15</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col className={styles.listDevices} xl={24}>
          <Table columns={headCells} />
        </Col>
      </Row>
    </>
  )
}

export default ListAllDevices

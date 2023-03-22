import { Col, Modal, Row } from "antd";
import React from "react";

import styles from './requestInfo.module.scss'
import moment from "moment";
import { deviceRequest } from "../../../utils";

const formatDate = 'DD-MM-YYYY HH:mm'

const ModalRequestInfo = ({ visiable, setVisiable, data }) => {
  const handleCancel = () => {
    setVisiable(false)
  }

  return (
    <Modal open={visiable} onCancel={handleCancel} footer={false}>
      <Row>
        <Col span={11} className={[styles.textLabel, styles.textFont]}>Người tạo đơn: </Col>
        <Col className={styles.textFont}>{`${data?.firstName} ${data?.lastName}`}</Col>
      </Row>
      <Row>
        <Col span={11} className={[styles.textLabel, styles.textFont]}>Email người tạo: </Col>
        <Col className={styles.textFont} style={{ textTransform: 'initial' }}>{data?.creator}</Col>
      </Row>
      <Row>
        <Col span={11} className={[styles.textLabel, styles.textFont]}>Ngành học: </Col>
        <Col className={styles.textFont}>{data?.majors}</Col>
      </Row>
      <Row>
        <Col span={11} className={[styles.textLabel, styles.textFont]}>Mã sinh viên: </Col>
        <Col className={styles.textFont}>{data?.studentCode}</Col>
      </Row>
      <Row>
        <Col span={11} className={[styles.textLabel, styles.textFont]}>Ngày tạo đơn: </Col>
        <Col className={styles.textFont}>{moment(data?.createdAt).format(formatDate)}</Col>
      </Row>
      <Row>
        <Col span={11} className={[styles.textLabel, styles.textFont]}>Ngày cập nhật đơn: </Col>
        <Col className={styles.textFont}>{moment(data?.updatedAt).format(formatDate)}</Col>
      </Row>
      <Row>
        <Col span={11} className={[styles.textLabel, styles.textFont]}>Lý do tạo đơn: </Col>
        <Col className={styles.textFont}>{data?.purpose}</Col>
      </Row>
      <Row>
        <Col span={11} className={[styles.textLabel, styles.textFont]}>Trạng thái đơn: </Col>
        <Col className={styles.textFont}>{deviceRequest(data?.status)}</Col>
      </Row>
      <Row>
        <Col span={11} className={[styles.textLabel, styles.textFont]}>Ngày mượn: </Col>
        <Col className={styles.textFont}>{moment(data?.borrowDate).format(formatDate)}</Col>
      </Row>
      <Row>
        <Col span={11} className={[styles.textLabel, styles.textFont]}>Ngày trả: </Col>
        <Col className={styles.textFont}>{moment(data?.returnDate).format(formatDate)}</Col>
      </Row>
    </Modal>
  )
}

export default ModalRequestInfo
import { Col, Modal, Row, Space, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";
import {
  ExclamationCircleFilled,
} from "@ant-design/icons";
import moment from "moment";
import { useDispatch } from "react-redux";

import { get, patch } from "../../../services/axios/baseAPI";
import { detailLocationDevice, deviceStatus } from "../../../utils";
import ButtonCancel from "../../button/buttonCancel";
import ButtonPrimary from "../../button/buttonPrimary";
import ModalBorrowDevice from "../modalBorrowDevice";
import { getlistDevice } from "../../../store/modules/deviceRegisterSlices";

import styles from './infoDevice.module.scss'

const { confirm } = Modal;

const ModalInfoDevice = ({ visiable, setVisiable, deviceCode }) => {
  //state
  const [loading, setLoading] = useState(false);
  const [dataDevice, setDataDevice] = useState('');
  const [modalBorrow, setModalBorrow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await get(`getInfoDevice`, { deviceCode })
        .then(res => {
          const { data } = res
          console.log(data)
          setLoading(false)
          setDataDevice(data)
        })
        .catch(err => {
          setLoading(false)
        })
    })()
  }, [visiable, deviceCode, modalBorrow])

  const handleCancel = () => {
    setVisiable(false)
  }

  const handleReturnDevice = () => {
    confirm({
      title: 'Bạn có muốn thu hồi thiết bị không ?',
      icon: <ExclamationCircleFilled />,
      onOk() {
        setLoading(true)
        patch(`editDevice/${dataDevice?.dataInfo?._id}`, {
          userId: dataDevice?.dataInfo?.userId,
          status: 0,
        })
          .then(() => {
            setLoading(false)
            notification.success({ message: "Thu hồi thành công" });
            setVisiable(false)
            dispatch(getlistDevice());
          })
          .catch(() => {
            setLoading(false)
            notification.error({ message: "Lỗi server" });
          });
      },
      onCancel() {
        return;
      },
    })
  }

  return (
    <Modal title='Thông tin thiết bị' open={visiable} onCancel={handleCancel} footer={false}>
      <Spin spinning={loading} tip='Đang tải....'>
        <Row>
          <Col span={9} className={[styles.textLabel, styles.textFont]}>Tên thiết bị: </Col>
          <Col className={styles.textFont}>{dataDevice?.dataInfo?.deviceName}</Col>
        </Row>
        <Row>
          <Col span={9} className={[styles.textLabel, styles.textFont]}>Mã thiết bị: </Col>
          <Col className={styles.textFont}>{dataDevice?.dataInfo?.deviceCode}</Col>
        </Row>
        <Row>
          <Col span={9} className={[styles.textLabel, styles.textFont]}>Ngày nhập: </Col>
          <Col className={styles.textFont}>{moment(dataDevice?.dataInfo?.createdAt).format('DD-MM-YYYY')}</Col>
        </Row>
        <Row>
          <Col span={9} className={[styles.textLabel, styles.textFont]}>Vị trí: </Col>
          <Col className={styles.textFont}>{detailLocationDevice(dataDevice?.dataInfo?.deviceLocation[0], dataDevice?.dataInfo?.deviceLocation[1])}</Col>
        </Row>
        <Row>
          <Col span={9} className={[styles.textLabel, styles.textFont]}>Trạng thái: </Col>
          <Col className={styles.textFont}>{deviceStatus(dataDevice?.dataInfo?.status)}</Col>
        </Row>
        {dataDevice.nameUser && (
          <div>
            <Row>
              <Col span={9} className={[styles.textLabel, styles.textFont]}>Người mượn: </Col>
              <Col className={styles.textFont}>{`${dataDevice.nameUser.firstName} ${dataDevice.nameUser.lastName}`}</Col>
            </Row>
            <Row>
              <Col span={9} className={[styles.textLabel, styles.textFont]}>Thời gian trả: </Col>
              <Col className={styles.textFont}>...</Col>
            </Row>
          </div>
        )
        }
        <Row style={{ marginTop: 20 }} justify='center'>
          <Space>
            {dataDevice?.dataInfo?.status === 0 ? <ButtonPrimary nameBtn='Cho mượn' onClickBtn={() => setModalBorrow(true)} /> : <ButtonPrimary nameBtn='Thu hồi' onClickBtn={handleReturnDevice} />}
            <ButtonCancel nameBtn='Hủy' onClickBtn={handleCancel} />
          </Space>
        </Row>
      </Spin>
      <ModalBorrowDevice
        isModal={modalBorrow}
        setIsModal={setModalBorrow}
        dataValue={dataDevice.dataInfo}
      />
    </Modal>
  )
}

export default ModalInfoDevice
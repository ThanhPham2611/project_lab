import React, { useEffect, useState } from "react";
import { Col, Empty, Modal, Row } from "antd";
import moment from "moment";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";

//local
import { get } from "../../../services/axios/baseAPI";

//scss
import styles from "./borrowLog.module.scss";

const borrowStatus = {
  borrowed: 1,
  return: 0,
};

const ModalBorrowLog = ({ isModal, setIsModal, deviceCode }) => {
  const [dataLog, setDataLog] = useState([]);

  useEffect(() => {
    (async () => {
      const logs = await get(`getBorrowLog`, { deviceCode });
      if (logs) {
        setDataLog(logs.data);
      }
    })();
  }, [deviceCode]);

  const onClose = () => {
    setIsModal(false);
  };

  return (
    <Modal title="Borrow logs" open={isModal} onCancel={onClose} footer={false}>
      {dataLog.length > 0 ? (
        <div>
          {dataLog.map((item) => (
            <Row
              key={item._id}
              justify="space-between"
              className={styles.wrapperRowLog}
            >
              <Col span={10}>{moment(item.borrowDate).format("LLL")}</Col>
              <Col span={9} className={styles.title}>
                {item.borrowerName}
              </Col>
              <Col span={3} className={styles.title}>
                {item.studentCode}
              </Col>
              <Col span={2}>
                {item.status === borrowStatus.borrowed ? (
                  <ArrowRightOutlined />
                ) : (
                  <ArrowLeftOutlined />
                )}
              </Col>
            </Row>
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </Modal>
  );
};

export default ModalBorrowLog;

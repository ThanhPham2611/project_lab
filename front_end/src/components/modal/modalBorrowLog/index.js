import React, { useEffect, useState } from "react";
import { Col, Empty, Modal, Pagination, Row, Tag } from "antd";
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
  const [dataLog, setDataLog] = useState({});
  const [pagination, setPagination] = useState({
    current_page: 1,
    page_size: 10
  })

  useEffect(() => {
    (async () => {
      const logs = await get(`getBorrowLog`, { deviceCode });
      if (logs) {
        setDataLog(logs);
      }
    })();
  }, [isModal]);

  const onClose = () => {
    setIsModal(false);
  };

  const handleChangePage = async (page, pageSize) => {
    setPagination({
      ...pagination,
      current_page: page,
      page_size: pageSize
    })
    const logs = await get(`getBorrowLog`, { deviceCode, size: pageSize, pagination: page - 1 })
    if (logs) {
      setDataLog(logs);
    }
  }

  return (
    <Modal
      title="Lịch sử mượn"
      open={isModal}
      onCancel={onClose}
      footer={false}
    >
      {dataLog.total > 0 ? (
        <div>
          {dataLog?.data.map((item) => (
            <Row
              key={item._id}
              justify="space-between"
              className={styles.wrapperRowLog}
            >
              <Col span={7}>{moment(item.createdAt).format('DD-MM-YYYY HH:mm')}</Col>
              <Col span={8} className={styles.title}>
                {item.borrowerName}
              </Col>
              <Col span={3} className={styles.title}>
                {item.studentCode}
              </Col>
              <Col span={4}>
                {item.status === borrowStatus.borrowed ? (
                  <Tag color='green'>Cho mượn</Tag>
                ) : (
                  <Tag color='blue'>Thu hồi</Tag>
                )}
              </Col>
            </Row>
          ))}
          <Row justify='center' className={styles.paginationContainer}>
            <Pagination
              defaultCurrent={1}
              total={dataLog.total}
              pageSize={pagination.page_size}
              pageSizeOptions={[10, 15, 20]}
              showSizeChanger
              onChange={(page, pageSize) => handleChangePage(page, pageSize)}
            />
          </Row>
        </div>
      ) : (
        <Empty />
      )}
    </Modal>
  );
};

export default ModalBorrowLog;

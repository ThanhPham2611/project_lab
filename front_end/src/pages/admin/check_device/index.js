import { Col, Divider, Input, Row, Spin } from "antd";
import React from "react";
import { CameraOutlined } from "@ant-design/icons";
import { QrReader } from "react-qr-reader";

//scss
import styles from "./checkDevice.module.scss";

const { Search } = Input;

const CheckDevice = () => {
  return (
    <Spin spinning={false}>
      <h1 className="titleHeaderPage">Check device</h1>
      <Divider />
      <Row justify="center" className="rowContent">
        <Col xxl={8}>
          <Search
            placeholder="Fill device code"
            allowClear
            suffix={<CameraOutlined className={styles.iconSuffix} />}
          />
        </Col>
      </Row>
      <Row>
        <QrReader
          onResult={(result) => {
            console.log(result);
          }}
          style={{ width: "100%" }}
        />
      </Row>
    </Spin>
  );
};

export default CheckDevice;

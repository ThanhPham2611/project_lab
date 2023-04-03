import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import moment from "moment";

import { EStatusRegister, formatDate } from "../../../utils";
import { deviceRegister } from "../../../store/modules/deviceRegisterSlices";

const HomeUser = () => {
  const { t } = useTranslation("common");
  const { push } = useHistory();
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.userInfo.userData);
  const { listDeviceRegister, loading } = useSelector(
    (state) => state.deviceRegister
  );

  const column = [
    {
      title: "STT",
      dataIndex: "index",
      render: (index) => <span>{index + 1}</span>,
    },
    {
      title: t("devices_request_user.column_student_code"),
      dataIndex: "studentCode",
    },
    {
      title: t("devices_request_user.column_device"),
      dataIndex: "devices",
      render: (data) => data.map((item) => <Tag>{item}</Tag>),
    },
    {
      title: t("devices_request_user.column_borrow_date"),
      dataIndex: "borrowDate",
      render: (data) => <span>{moment(data).format(formatDate)}</span>,
    },
    {
      title: t("devices_request_user.column_return_date"),
      dataIndex: "returnDate",
      render: (data) => <span>{moment(data).format(formatDate)}</span>,
    },
    {
      title: t("devices_request_user.column_status"),
      dataIndex: "status",
      render: (data) => (
        <Tag
          color={
            data === EStatusRegister.notApprove
              ? "#2db7f5"
              : data === EStatusRegister.approve
              ? "#87d068"
              : "#cd201f"
          }
        >
          {data === EStatusRegister.notApprove
            ? t("devices_request_user.name_status_not_approve")
            : data === EStatusRegister.approve
            ? t("devices_request_user.name_status_approved")
            : t("devices_request_user.name_status_refused")}
        </Tag>
      ),
    },
  ];

  useEffect(() => {
    dispatch(deviceRegister())
  }, [])

  return (
    <>
      <div>
        Chào mừng{" "}
        <span style={{ fontSize: "18px", fontWeight: "700" }}>
          {userInfo.firstName.toUpperCase()} {userInfo.lastName.toUpperCase()}
        </span>{" "}
        đã đến với phòng lab IOT của trường đại học Thăng Long!{" "}
      </div>
      <hr style={{ marginTop: "20px" }} />
      <div>
        <p
          style={{
            fontSize: "20px",
            fontWeight: "700",
            marginTop: "20px",
            marginBottom: "10px",
          }}
        >
          Danh sách đơn tạo
        </p>
        <p
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => push("/list-register-devices")}
        >
          Xem chi tiết
        </p>
        <Table
          loading={loading}
          columns={column}
          dataSource={listDeviceRegister}
        />
      </div>
      <hr style={{ marginTop: "20px" }} />
      <div style={{ marginTop: "20px" }}>
        <p>Thông tin cơ bản</p>
        <p>Phòng lab IOT Đại học Thăng Long</p>
        <p>
          Địa chỉ: Đại học Thăng Long, Nghiêm Xuân Yêm, Đại Kim, Hoàng Mai, Hà
          Nội
        </p>
        <p>Quản lý: Thầy Nguyễn Ngọc Tân</p>
      </div>
    </>
  );
};

export default HomeUser;

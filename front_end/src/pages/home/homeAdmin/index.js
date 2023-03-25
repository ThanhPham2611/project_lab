import React, { useEffect } from "react";
import { Table, Tag } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { EOffice, EBorrow } from "../../../utils/role";
import { EStatusRegister } from "../../../utils";
import { allUsers } from "../../../store/modules/usersSlices";
import { getlistDevice } from "../../../store/modules/deviceRegisterSlices";
import { listRequestDevice } from "../../../store/modules/deviceRegisterSlices";

const HomeAdmin = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const { listAllUser, loading: loadingUser } = useSelector((state) => state.userInfo);
  const { listDevice, loading: loadingDevice } = useSelector(
    (state) => state.deviceRegister
  );
  const { listRequest, loading: loadingRegister } = useSelector((state) => state.deviceRegister);


  const columnsUserTable = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Code",
      dataIndex: "studentCode",
      key: "studentCode",
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Chức vụ",
      dataIndex: "office",
      key: "office",
      render: (key) => (
        <span>
          {key === EOffice.admin
            ? "Admin"
            : key === EOffice.student
            ? "Sinh viên"
            : "Giảng viên"}
        </span>
      ),
    },
  ];

  const columnDevicesTable = [
    {
      title: "Tên thiết bị",
      dataIndex: "deviceName",
      key: "deviceName",
    },
    {
      title: "Mã thiết bị",
      dataIndex: "deviceCode",
      key: "deviceCode",
    },
    {
      title: "Loại thiết bị",
      dataIndex: "deviceType",
      key: "deviceType",
    },
    {
      title: "Người quản lý",
      dataIndex: "manager",
      key: "manager",
      render: (data) => (
        <span style={{ textTransform: "capitalize" }}>{data}</span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (data) => (
        <Tag color={EBorrow.borrowed === data ? "green" : "blue"}>
          {EBorrow.borrowed === data
            ? "Đã được mượn"
            : "Chưa được mượn"}
        </Tag>
      ),
    },
  ];

  const columnRequestsTable = [
    {
      title: "Email",
      dataIndex: "creator",
    },
    {
      title: "Họ và tên",
      render: (data) => <span>{`${data.firstName} ${data.lastName}`}</span>,
    },
    {
      title: "Code",
      dataIndex: "studentCode",
    },
    {
      title: "Ngày mượn",
      dataIndex: "borrowDate",
      render: (data) => <span>{moment(data).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Ngày trả",
      dataIndex: "returnDate",
      render: (data) => <span>{moment(data).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Trạng thái",
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
          {data === EStatusRegister.approve
            ? "Đã được duyệt"
            : data === EStatusRegister.notApprove
              ? "Chưa được duyệt"
              : "Từ chối"}
        </Tag>
      ),
    },
  ];

  const dataListUser = listAllUser.map((item) => {
    return {
      key: item._id,
      name: `${item.firstName} ${item.lastName}`,
      email: item.email,
      studentCode: item.studentCode,
      phone: `0${item.phone}`,
      office: item.office,
      role: item.role,
      birthday: moment(item.birthday).format("YYYY-MM-DD"),
    };
  });

  useEffect(() => {
    dispatch(allUsers());
    dispatch(getlistDevice());
    dispatch(listRequestDevice());
  }, []);

  return (
    <>
      <div>
        <p style={{ fontSize: "20px", fontWeight: "700" }}>
          Danh sách người dùng
        </p>
        <p
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => push("/list-users")}
        >
          Xem chi tiết
        </p>
        <Table
          loading={loadingUser}
          columns={columnsUserTable}
          dataSource={dataListUser}
        />
      </div>
      <div>
        <p style={{ fontSize: "20px", fontWeight: "700" }}>
          Danh sách thiết bị
        </p>
        <p
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => push("/management-devices")}
        >
          Xem chi tiết
        </p>
        <Table loading={loadingDevice} columns={columnDevicesTable} dataSource={listDevice} />
      </div>
      <div>
        <p style={{ fontSize: "20px", fontWeight: "700" }}>
          Danh sách mượn thiết bị
        </p>
        <p
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => push("/list-request-devices")}
        >
          Xem chi tiết
        </p>
        <Table loading={loadingRegister} columns={columnRequestsTable} dataSource={listRequest} />
      </div>
    </>
  );
};

export default HomeAdmin;

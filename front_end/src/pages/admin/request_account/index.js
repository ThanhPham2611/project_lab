import React, { useEffect } from "react";
import { Col, Divider, Input, notification, Row, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";

//local
import { getRequestAccount } from "../../../store/modules/requestAccount";
import { EOffice, ERole } from "../../../utils/role";
import ButtonPrimary from "../../../components/button/buttonPrimary";
import ButtonCancel from "../../../components/button/buttonCancel";
import { patch } from "../../../services/axios/baseAPI";

const { Search } = Input;

const RequestAccount = () => {
  const column = [
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Student code",
      dataIndex: "studentCode",
      render: (studentCode) => <span>{studentCode.toUpperCase()}</span>,
    },
    {
      title: "Major",
      dataIndex: "majors",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role) => <span>{role === ERole.admin ? "Admin" : "User"}</span>,
    },
    {
      title: "Office",
      dataIndex: "office",
      render: (office) => (
        <span>
          {office === EOffice.admin
            ? "Admin"
            : office === EOffice.student
            ? "Student"
            : "Teacher"}
        </span>
      ),
    },
    {
      title: "Action",
      render: (data) => (
        <ButtonPrimary
          nameBtn="Accept"
          onClickBtn={() => acceptAccount(data._id)}
        />
      ),
    },
  ];

  //redux
  const dispatch = useDispatch();
  const { listRequestAccount, loading } = useSelector(
    (state) => state.requestAccount
  );

  //state

  useEffect(() => {
    dispatch(getRequestAccount());
  }, []);

  const onSearch = (value) => {
    dispatch(getRequestAccount({ search: value }));
  };

  const acceptAccount = (id) => {
    patch(`editRequestAccount/${id}`, { isActive: true })
      .then(() => {
        notification.success({ message: "accept success user" });
        dispatch(getRequestAccount());
      })
      .catch((err) => {
        if (err.response.status === 404) {
          notification.error({ message: "Not found id user" });
        } else {
          notification.error({ message: "Error server" });
        }
      });
  };

  return (
    <div>
      <h1 className="titleHeaderPage">List request account</h1>
      <Divider />
      <Row className="rowContent">
        <Col xxl={4}>
          <Search
            placeholder="Fill student code"
            onSearch={onSearch}
            allowClear
          />
        </Col>
      </Row>

      <Table
        columns={column}
        dataSource={listRequestAccount}
        loading={loading}
      />
    </div>
  );
};

export default RequestAccount;

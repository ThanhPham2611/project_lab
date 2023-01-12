import React, { useEffect } from "react";
import { Col, Divider, Input, notification, Row, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";

//local
import { getRequestAccount } from "../../../store/modules/requestAccount";
import { EOffice, ERole } from "../../../utils/role";
import ButtonPrimary from "../../../components/button/buttonPrimary";
import { patch } from "../../../services/axios/baseAPI";
import { useTranslation } from "react-i18next";

const { Search } = Input;

const RequestAccount = () => {
  //translation
  const { t } = useTranslation("common");

  const column = [
    {
      title: t("request_account.label_email"),
      dataIndex: "email",
    },
    {
      title: t("request_account.label_student_code"),
      dataIndex: "studentCode",
      render: (studentCode) => <span>{studentCode.toUpperCase()}</span>,
    },
    {
      title: t("request_account.label_major"),
      dataIndex: "majors",
    },
    {
      title: t("request_account.label_role"),
      dataIndex: "role",
      render: (role) => (
        <span>
          {role === ERole.admin
            ? t("request_account.role_admin")
            : t("request_account.role_user")}
        </span>
      ),
    },
    {
      title: t("request_account.label_office"),
      dataIndex: "office",
      render: (office) => (
        <span>
          {office === EOffice.admin
            ? t("request_account.office_admin")
            : office === EOffice.student
            ? t("request_account.office_student")
            : t("request_account.office_teacher")}
        </span>
      ),
    },
    {
      title: t("request_account.label_action"),
      render: (data) => (
        <ButtonPrimary
          nameBtn={t("request_account.btn_accept")}
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
  }, [dispatch]);

  const onSearch = (value) => {
    dispatch(getRequestAccount({ search: value }));
  };

  const acceptAccount = (id) => {
    patch(`editRequestAccount/${id}`, { isActive: true })
      .then(() => {
        notification.success({
          message: t("request_account.notify_success_accept"),
        });
        dispatch(getRequestAccount());
      })
      .catch((err) => {
        if (err.response.status === 404) {
          notification.error({
            message: t("request_account.notify_error_found_id"),
          });
        } else {
          notification.error({
            message: t("request_account.notify_error_server"),
          });
        }
      });
  };

  return (
    <div>
      <h1 className="titleHeaderPage">{t("request_account.title_header")}</h1>
      <Divider />
      <Row className="rowContent">
        <Col xxl={4}>
          <Search
            placeholder={t("request_account.placeholder_student_code")}
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

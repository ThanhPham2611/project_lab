import { Button, Space, Table } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

//local
import { allUsers } from "../../../store/modules/usersSlices";

const ListUsers = () => {
  //translation
  const { t } = useTranslation("common");
  //format date
  const formatDate = "YYYY-MM-DD";
  const columns = [
    {
      title: t("list_user.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("list_user.email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("list_user.student_code"),
      dataIndex: "studentCode",
      key: "studentCode",
    },
    {
      title: t("list_user.phone"),
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: t("list_user.office"),
      dataIndex: "office",
      key: "office",
    },
    {
      title: t("list_user.birthday"),
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: t("list_user.action"),
      key: "action",
      render: (key) => (
        <Space>
          <Button>{t("list_user.btn_resetpass")}</Button>
          <Button>{t("list_user.btn_detail")}</Button>
        </Space>
      ),
    },
  ];

  //redux
  const dispatch = useDispatch();
  const { listAllUser, loading } = useSelector((state) => state.userInfo);
  console.log(listAllUser);

  const dataList = listAllUser.map((item) => {
    return {
      key: item._id,
      name: `${item.firstName} ${item.lastName}`,
      email: item.email,
      studentCode: item.studentCode,
      phone: `0${item.phone}`,
      office:
        item.office === 0 ? "Admin" : item.office === 1 ? "User" : "Teacher",
      birthday: moment(item.birthday).format(formatDate),
    };
  });

  useEffect(() => {
    dispatch(allUsers());
  }, []);

  return (
    <Table columns={columns} dataSource={dataList} bordered loading={loading} />
  );
};

export default ListUsers;

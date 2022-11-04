import { Button, Space, Table } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//local
import { allUsers } from "../../../store/modules/usersSlices";

const ListUsers = () => {
  //format date
  const formatDate = "YYYY-MM-DD";
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Student code",
      dataIndex: "studentCode",
      key: "studentCode",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Office",
      dataIndex: "office",
      key: "office",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Action",
      key: "action",
      render: (key) => (
        <Space>
          <Button>Reset password</Button>
          <Button>Detail user</Button>
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

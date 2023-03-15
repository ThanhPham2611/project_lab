export const ERole = {
  admin: 0,
  user: 1,
  root: 2,
};

export const EOffice = {
  admin: 0,
  student: 1,
  teacher: 2,
};

export const EBorrow = {
  notBorrow: 0,
  borrowed: 1,
};

export const listOffice = [
  {
    value: EOffice.admin,
    label: "Admin",
  },
  {
    value: EOffice.student,
    label: "Student",
  },
  {
    value: EOffice.teacher,
    label: "Teacher",
  },
];

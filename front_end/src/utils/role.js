export const ERole = {
  admin: 0,
  user: 1,
};

export const EOffice = {
  admin: 0,
  student: 1,
  teacher: 2,
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

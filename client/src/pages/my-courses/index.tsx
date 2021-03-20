import React from "react";
import CoursesAssignToFaculty from "../../components/CoursesAssignToFaculty";
import StudentCourses from "../../components/StudentCourses";
import { useMeQuery } from "../../generated/graphql";

interface Props {}

const index = (props: Props) => {
  const { data: me, loading: meLoading } = useMeQuery();
  if (meLoading) {
    return null;
  }
  return <div>{me?.me?.faculty ? <CoursesAssignToFaculty /> : <StudentCourses />}</div>;
};

export default index;

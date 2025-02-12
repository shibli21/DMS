import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  classSchedules: Array<ClassSchedule>;
  classScheduleByAll: Array<ClassSchedule>;
  studentOrFacultyClassSchedule: Array<ClassSchedule>;
  todaysClassSchedule: Array<ClassSchedule>;
  courses: Array<Course>;
  coursesByDeptSemester: Array<Course>;
  studentCoursesBySemester: Array<Course>;
  courseAssignToFaculties: Array<CourseAssignToFaculty>;
  courseAssignToFaculty: Array<CourseAssignToFaculty>;
  departments: Array<Department>;
  faculties: Array<Faculty>;
  me?: Maybe<MeResponse>;
  notices: Array<Notice>;
  myNotices: Array<Notice>;
  courseNotice: Array<Notice>;
  semesters: Array<Semester>;
  semestersByDepartmentAndSession: Array<Semester>;
  session: Session;
  sessions: Array<Session>;
  students: Array<Student>;
  student: Student;
};


export type QueryClassScheduleByAllArgs = {
  semesterId: Scalars['Int'];
  sessionId: Scalars['Int'];
  courseCode: Scalars['String'];
  departmentCode: Scalars['String'];
};


export type QueryCoursesByDeptSemesterArgs = {
  semesterId: Scalars['Int'];
  code: Scalars['String'];
};


export type QueryStudentCoursesBySemesterArgs = {
  semesterId: Scalars['Int'];
};


export type QueryCourseNoticeArgs = {
  input: CourseNoticeInputType;
};


export type QuerySemestersByDepartmentAndSessionArgs = {
  sessionId: Scalars['Int'];
  code: Scalars['String'];
};


export type QuerySessionArgs = {
  sessionId: Scalars['Int'];
};


export type QueryStudentArgs = {
  id: Scalars['Float'];
};

export type ClassSchedule = {
  __typename?: 'ClassSchedule';
  id: Scalars['Float'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  day: Scalars['String'];
  session: Session;
  semester: Semester;
  course: Course;
  department: Department;
  faculty: Faculty;
};

export type Session = {
  __typename?: 'Session';
  id: Scalars['Float'];
  name: Scalars['String'];
  startTime: Scalars['String'];
  endTime?: Maybe<Scalars['String']>;
  semester: Array<Semester>;
};

export type Semester = {
  __typename?: 'Semester';
  id: Scalars['Float'];
  number: Scalars['Float'];
  startTime: Scalars['String'];
  endTime?: Maybe<Scalars['String']>;
  session: Session;
  department: Department;
  course: Array<Course>;
};

export type Department = {
  __typename?: 'Department';
  id: Scalars['Float'];
  name: Scalars['String'];
  departmentCode: Scalars['String'];
  courses: Array<Course>;
};

export type Course = {
  __typename?: 'Course';
  id: Scalars['Float'];
  code: Scalars['String'];
  name: Scalars['String'];
  credit: Scalars['Float'];
  description: Scalars['String'];
  department: Department;
  semester: Semester;
  assignedFaculty: Array<CourseAssignToFaculty>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type CourseAssignToFaculty = {
  __typename?: 'CourseAssignToFaculty';
  id: Scalars['Float'];
  session: Session;
  semester: Semester;
  faculty: Faculty;
  department: Department;
  course: Course;
};

export type Faculty = {
  __typename?: 'Faculty';
  id: Scalars['Float'];
  username: Scalars['String'];
  designation: Scalars['String'];
  email: Scalars['String'];
  oneTimePassword?: Maybe<Scalars['String']>;
  gender: Scalars['String'];
  address: Scalars['String'];
  contactNumber: Scalars['Float'];
  assignedTo: Array<CourseAssignToFaculty>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type MeResponse = {
  __typename?: 'MeResponse';
  student?: Maybe<Student>;
  admin?: Maybe<Admin>;
  faculty?: Maybe<Faculty>;
};

export type Student = {
  __typename?: 'Student';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  registrationNumber: Scalars['Float'];
  session: Session;
  oneTimePassword?: Maybe<Scalars['String']>;
  gender: Scalars['String'];
  address: Scalars['String'];
  contactNumber: Scalars['Float'];
  department: Department;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Admin = {
  __typename?: 'Admin';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Notice = {
  __typename?: 'Notice';
  id: Scalars['Float'];
  title: Scalars['String'];
  description: Scalars['String'];
  course: Course;
  session: Session;
  semester: Semester;
  department: Department;
  createdAt: Scalars['String'];
};

export type CourseNoticeInputType = {
  sessionId?: Maybe<Scalars['Float']>;
  semesterId?: Maybe<Scalars['Float']>;
  courseCode?: Maybe<Scalars['String']>;
  departmentCode?: Maybe<Scalars['String']>;
  facultyId?: Maybe<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  registerAdmin: AdminResponse;
  adminLogin: AdminResponse;
  addClassSchedule: AddClassScheduleResponse;
  deleteClassSchedule: Scalars['Boolean'];
  addCourse: CourseResponse;
  assignCourseToFaculty: CourseAssignToFacultyResponse;
  addDepartment: DepartmentResponse;
  deleteDepartment: Scalars['Boolean'];
  addFaculty: FacultyResponse;
  registerFaculty: FacultyResponse;
  facultyLogin: FacultyResponse;
  deleteFaculty: Scalars['Boolean'];
  resetFacultyToken: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  publishNotice: NoticeResponse;
  addSemester: SemesterResponse;
  deleteSemester: Scalars['Boolean'];
  addSession: SessionResponse;
  deleteSession: Scalars['Boolean'];
  addStudent: StudentResponse;
  editStudent: StudentResponse;
  registerStudent: StudentResponse;
  studentLogin: StudentResponse;
  deleteStudent: Scalars['Boolean'];
  resetStudentToken: Scalars['Boolean'];
};


export type MutationRegisterAdminArgs = {
  input: RegisterAdminInputType;
};


export type MutationAdminLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationAddClassScheduleArgs = {
  input: AddClassScheduleInputType;
};


export type MutationDeleteClassScheduleArgs = {
  id: Scalars['Int'];
};


export type MutationAddCourseArgs = {
  input: AddCourseInputType;
};


export type MutationAssignCourseToFacultyArgs = {
  input: AssignCourseToFacultyInputType;
};


export type MutationAddDepartmentArgs = {
  code: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteDepartmentArgs = {
  code: Scalars['String'];
};


export type MutationAddFacultyArgs = {
  input: AddFacultyInputType;
};


export type MutationRegisterFacultyArgs = {
  input: RegisterFacultyInputType;
};


export type MutationFacultyLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationDeleteFacultyArgs = {
  id: Scalars['Int'];
};


export type MutationResetFacultyTokenArgs = {
  id: Scalars['Int'];
};


export type MutationPublishNoticeArgs = {
  input: AddNoticeInputType;
};


export type MutationAddSemesterArgs = {
  input: AddSemesterInputType;
};


export type MutationDeleteSemesterArgs = {
  id: Scalars['Int'];
};


export type MutationAddSessionArgs = {
  input: AddSessionInputType;
};


export type MutationDeleteSessionArgs = {
  id: Scalars['Int'];
};


export type MutationAddStudentArgs = {
  input: AddStudentInputType;
};


export type MutationEditStudentArgs = {
  input: AddStudentInputType;
};


export type MutationRegisterStudentArgs = {
  input: RegisterStudentInputType;
};


export type MutationStudentLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationDeleteStudentArgs = {
  id: Scalars['Int'];
};


export type MutationResetStudentTokenArgs = {
  registrationNumber: Scalars['Int'];
};

export type AdminResponse = {
  __typename?: 'AdminResponse';
  errors?: Maybe<Array<FieldError>>;
  admin?: Maybe<Admin>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type RegisterAdminInputType = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
  token: Scalars['String'];
};

export type AddClassScheduleResponse = {
  __typename?: 'AddClassScheduleResponse';
  errors?: Maybe<Array<FieldError>>;
  classSchedule?: Maybe<Scalars['Boolean']>;
};

export type AddClassScheduleInputType = {
  classes?: Maybe<Array<Classes>>;
  sessionId?: Maybe<Scalars['Float']>;
  semesterId?: Maybe<Scalars['Float']>;
  courseCode?: Maybe<Scalars['String']>;
  departmentCode?: Maybe<Scalars['String']>;
  facultyId?: Maybe<Scalars['Float']>;
};

export type Classes = {
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  day: Scalars['String'];
};

export type CourseResponse = {
  __typename?: 'CourseResponse';
  errors?: Maybe<Array<FieldError>>;
  course?: Maybe<Course>;
};

export type AddCourseInputType = {
  code: Scalars['String'];
  name: Scalars['String'];
  credit?: Maybe<Scalars['Float']>;
  description: Scalars['String'];
  semesterId?: Maybe<Scalars['Float']>;
  departmentCode?: Maybe<Scalars['String']>;
};

export type CourseAssignToFacultyResponse = {
  __typename?: 'CourseAssignToFacultyResponse';
  errors?: Maybe<Array<FieldError>>;
  courseAssignToFaculty?: Maybe<CourseAssignToFaculty>;
};

export type AssignCourseToFacultyInputType = {
  semesterId?: Maybe<Scalars['Float']>;
  sessionId?: Maybe<Scalars['Float']>;
  departmentCode?: Maybe<Scalars['String']>;
  facultyId?: Maybe<Scalars['Float']>;
  courseCode?: Maybe<Scalars['String']>;
};

export type DepartmentResponse = {
  __typename?: 'DepartmentResponse';
  errors?: Maybe<Array<FieldError>>;
  department?: Maybe<Department>;
};

export type FacultyResponse = {
  __typename?: 'FacultyResponse';
  errors?: Maybe<Array<FieldError>>;
  faculty?: Maybe<Faculty>;
};

export type AddFacultyInputType = {
  email: Scalars['String'];
  username: Scalars['String'];
  designation: Scalars['String'];
  gender: Scalars['String'];
  address: Scalars['String'];
  contactNumber?: Maybe<Scalars['Float']>;
};

export type RegisterFacultyInputType = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type NoticeResponse = {
  __typename?: 'NoticeResponse';
  errors?: Maybe<Array<FieldError>>;
  notice?: Maybe<Notice>;
};

export type AddNoticeInputType = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  sessionId?: Maybe<Scalars['Float']>;
  semesterId?: Maybe<Scalars['Float']>;
  courseCode?: Maybe<Scalars['String']>;
  departmentCode?: Maybe<Scalars['String']>;
  facultyId?: Maybe<Scalars['Float']>;
};

export type SemesterResponse = {
  __typename?: 'SemesterResponse';
  errors?: Maybe<Array<FieldError>>;
  semester?: Maybe<Semester>;
};

export type AddSemesterInputType = {
  number?: Maybe<Scalars['Float']>;
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
  sessionId?: Maybe<Scalars['Float']>;
  departmentCode?: Maybe<Scalars['String']>;
};

export type SessionResponse = {
  __typename?: 'SessionResponse';
  errors?: Maybe<Array<FieldError>>;
  session?: Maybe<Session>;
};

export type AddSessionInputType = {
  name?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
};

export type StudentResponse = {
  __typename?: 'StudentResponse';
  errors?: Maybe<Array<FieldError>>;
  student?: Maybe<Student>;
};

export type AddStudentInputType = {
  email: Scalars['String'];
  username: Scalars['String'];
  registrationNumber?: Maybe<Scalars['Float']>;
  sessionId: Scalars['Float'];
  gender: Scalars['String'];
  address: Scalars['String'];
  contactNumber?: Maybe<Scalars['Float']>;
  departmentCode?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
};

export type RegisterStudentInputType = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type FacultyLoginMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type FacultyLoginMutation = (
  { __typename?: 'Mutation' }
  & { facultyLogin: (
    { __typename?: 'FacultyResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, faculty?: Maybe<(
      { __typename?: 'Faculty' }
      & Pick<Faculty, 'id' | 'username' | 'designation' | 'email' | 'gender' | 'address' | 'contactNumber'>
    )> }
  ) }
);

export type RegisterFacultyMutationVariables = Exact<{
  input: RegisterFacultyInputType;
}>;


export type RegisterFacultyMutation = (
  { __typename?: 'Mutation' }
  & { registerFaculty: (
    { __typename?: 'FacultyResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, faculty?: Maybe<(
      { __typename?: 'Faculty' }
      & Pick<Faculty, 'id' | 'username' | 'designation' | 'email' | 'gender' | 'address' | 'contactNumber'>
    )> }
  ) }
);

export type PublishNoticeMutationVariables = Exact<{
  input: AddNoticeInputType;
}>;


export type PublishNoticeMutation = (
  { __typename?: 'Mutation' }
  & { publishNotice: (
    { __typename?: 'NoticeResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, notice?: Maybe<(
      { __typename?: 'Notice' }
      & Pick<Notice, 'id' | 'description'>
    )> }
  ) }
);

export type StudentLoginMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type StudentLoginMutation = (
  { __typename?: 'Mutation' }
  & { studentLogin: (
    { __typename?: 'StudentResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, student?: Maybe<(
      { __typename?: 'Student' }
      & Pick<Student, 'id' | 'username' | 'email'>
    )> }
  ) }
);

export type RegisterStudentMutationVariables = Exact<{
  input: RegisterStudentInputType;
}>;


export type RegisterStudentMutation = (
  { __typename?: 'Mutation' }
  & { registerStudent: (
    { __typename?: 'StudentResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, student?: Maybe<(
      { __typename?: 'Student' }
      & Pick<Student, 'id' | 'username' | 'email' | 'registrationNumber' | 'oneTimePassword' | 'gender' | 'address' | 'contactNumber'>
      & { session: (
        { __typename?: 'Session' }
        & Pick<Session, 'id' | 'name' | 'startTime' | 'endTime'>
      ), department: (
        { __typename?: 'Department' }
        & Pick<Department, 'id' | 'name' | 'departmentCode'>
      ) }
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type StudentOrFacultyClassScheduleQueryVariables = Exact<{ [key: string]: never; }>;


export type StudentOrFacultyClassScheduleQuery = (
  { __typename?: 'Query' }
  & { studentOrFacultyClassSchedule: Array<(
    { __typename?: 'ClassSchedule' }
    & Pick<ClassSchedule, 'id' | 'startTime' | 'endTime' | 'day'>
    & { course: (
      { __typename?: 'Course' }
      & Pick<Course, 'name'>
    ), semester: (
      { __typename?: 'Semester' }
      & Pick<Semester, 'number' | 'id'>
    ), faculty: (
      { __typename?: 'Faculty' }
      & Pick<Faculty, 'username' | 'designation'>
    ) }
  )> }
);

export type CourseAssignToFacultyQueryVariables = Exact<{ [key: string]: never; }>;


export type CourseAssignToFacultyQuery = (
  { __typename?: 'Query' }
  & { courseAssignToFaculty: Array<(
    { __typename?: 'CourseAssignToFaculty' }
    & Pick<CourseAssignToFaculty, 'id'>
    & { course: (
      { __typename?: 'Course' }
      & Pick<Course, 'id' | 'name' | 'code' | 'credit' | 'description'>
    ), semester: (
      { __typename?: 'Semester' }
      & Pick<Semester, 'id' | 'number'>
    ), session: (
      { __typename?: 'Session' }
      & Pick<Session, 'id' | 'name'>
    ), department: (
      { __typename?: 'Department' }
      & Pick<Department, 'name' | 'departmentCode'>
    ) }
  )> }
);

export type CourseNoticesQueryVariables = Exact<{
  input: CourseNoticeInputType;
}>;


export type CourseNoticesQuery = (
  { __typename?: 'Query' }
  & { courseNotice: Array<(
    { __typename?: 'Notice' }
    & Pick<Notice, 'id' | 'title' | 'description' | 'createdAt'>
  )> }
);

export type ClassScheduleByAllQueryVariables = Exact<{
  semesterId: Scalars['Int'];
  sessionId: Scalars['Int'];
  courseCode: Scalars['String'];
  departmentCode: Scalars['String'];
}>;


export type ClassScheduleByAllQuery = (
  { __typename?: 'Query' }
  & { classScheduleByAll: Array<(
    { __typename?: 'ClassSchedule' }
    & Pick<ClassSchedule, 'id' | 'startTime' | 'endTime' | 'day'>
    & { faculty: (
      { __typename?: 'Faculty' }
      & Pick<Faculty, 'username' | 'designation'>
    ) }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'MeResponse' }
    & { student?: Maybe<(
      { __typename?: 'Student' }
      & Pick<Student, 'id' | 'username' | 'email' | 'registrationNumber' | 'oneTimePassword' | 'gender' | 'address' | 'contactNumber'>
      & { department: (
        { __typename?: 'Department' }
        & Pick<Department, 'name'>
      ), session: (
        { __typename?: 'Session' }
        & Pick<Session, 'name'>
      ) }
    )>, admin?: Maybe<(
      { __typename?: 'Admin' }
      & Pick<Admin, 'id' | 'username' | 'email'>
    )>, faculty?: Maybe<(
      { __typename?: 'Faculty' }
      & Pick<Faculty, 'id' | 'username' | 'designation' | 'email' | 'oneTimePassword' | 'gender' | 'address' | 'contactNumber'>
    )> }
  )> }
);

export type MyNoticesQueryVariables = Exact<{ [key: string]: never; }>;


export type MyNoticesQuery = (
  { __typename?: 'Query' }
  & { myNotices: Array<(
    { __typename?: 'Notice' }
    & Pick<Notice, 'id' | 'title' | 'description' | 'createdAt'>
  )> }
);

export type StudentCoursesBySemesterQueryVariables = Exact<{
  input: Scalars['Int'];
}>;


export type StudentCoursesBySemesterQuery = (
  { __typename?: 'Query' }
  & { studentCoursesBySemester: Array<(
    { __typename?: 'Course' }
    & Pick<Course, 'id' | 'code' | 'name' | 'credit' | 'description'>
    & { department: (
      { __typename?: 'Department' }
      & Pick<Department, 'id' | 'name' | 'departmentCode'>
    ), semester: (
      { __typename?: 'Semester' }
      & Pick<Semester, 'id' | 'number'>
    ) }
  )> }
);

export type TodaysClassScheduleQueryVariables = Exact<{ [key: string]: never; }>;


export type TodaysClassScheduleQuery = (
  { __typename?: 'Query' }
  & { todaysClassSchedule: Array<(
    { __typename?: 'ClassSchedule' }
    & Pick<ClassSchedule, 'id' | 'startTime' | 'endTime' | 'day'>
    & { course: (
      { __typename?: 'Course' }
      & Pick<Course, 'name'>
    ), semester: (
      { __typename?: 'Semester' }
      & Pick<Semester, 'number' | 'id'>
    ), faculty: (
      { __typename?: 'Faculty' }
      & Pick<Faculty, 'id' | 'username' | 'designation'>
    ) }
  )> }
);


export const FacultyLoginDocument = gql`
    mutation FacultyLogin($password: String!, $email: String!) {
  facultyLogin(password: $password, email: $email) {
    errors {
      field
      message
    }
    faculty {
      id
      username
      designation
      email
      gender
      address
      contactNumber
    }
  }
}
    `;
export type FacultyLoginMutationFn = Apollo.MutationFunction<FacultyLoginMutation, FacultyLoginMutationVariables>;

/**
 * __useFacultyLoginMutation__
 *
 * To run a mutation, you first call `useFacultyLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFacultyLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [facultyLoginMutation, { data, loading, error }] = useFacultyLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useFacultyLoginMutation(baseOptions?: Apollo.MutationHookOptions<FacultyLoginMutation, FacultyLoginMutationVariables>) {
        return Apollo.useMutation<FacultyLoginMutation, FacultyLoginMutationVariables>(FacultyLoginDocument, baseOptions);
      }
export type FacultyLoginMutationHookResult = ReturnType<typeof useFacultyLoginMutation>;
export type FacultyLoginMutationResult = Apollo.MutationResult<FacultyLoginMutation>;
export type FacultyLoginMutationOptions = Apollo.BaseMutationOptions<FacultyLoginMutation, FacultyLoginMutationVariables>;
export const RegisterFacultyDocument = gql`
    mutation RegisterFaculty($input: RegisterFacultyInputType!) {
  registerFaculty(input: $input) {
    errors {
      field
      message
    }
    faculty {
      id
      username
      designation
      email
      gender
      address
      contactNumber
    }
  }
}
    `;
export type RegisterFacultyMutationFn = Apollo.MutationFunction<RegisterFacultyMutation, RegisterFacultyMutationVariables>;

/**
 * __useRegisterFacultyMutation__
 *
 * To run a mutation, you first call `useRegisterFacultyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterFacultyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerFacultyMutation, { data, loading, error }] = useRegisterFacultyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterFacultyMutation(baseOptions?: Apollo.MutationHookOptions<RegisterFacultyMutation, RegisterFacultyMutationVariables>) {
        return Apollo.useMutation<RegisterFacultyMutation, RegisterFacultyMutationVariables>(RegisterFacultyDocument, baseOptions);
      }
export type RegisterFacultyMutationHookResult = ReturnType<typeof useRegisterFacultyMutation>;
export type RegisterFacultyMutationResult = Apollo.MutationResult<RegisterFacultyMutation>;
export type RegisterFacultyMutationOptions = Apollo.BaseMutationOptions<RegisterFacultyMutation, RegisterFacultyMutationVariables>;
export const PublishNoticeDocument = gql`
    mutation PublishNotice($input: AddNoticeInputType!) {
  publishNotice(input: $input) {
    errors {
      field
      message
    }
    notice {
      id
      description
    }
  }
}
    `;
export type PublishNoticeMutationFn = Apollo.MutationFunction<PublishNoticeMutation, PublishNoticeMutationVariables>;

/**
 * __usePublishNoticeMutation__
 *
 * To run a mutation, you first call `usePublishNoticeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishNoticeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishNoticeMutation, { data, loading, error }] = usePublishNoticeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePublishNoticeMutation(baseOptions?: Apollo.MutationHookOptions<PublishNoticeMutation, PublishNoticeMutationVariables>) {
        return Apollo.useMutation<PublishNoticeMutation, PublishNoticeMutationVariables>(PublishNoticeDocument, baseOptions);
      }
export type PublishNoticeMutationHookResult = ReturnType<typeof usePublishNoticeMutation>;
export type PublishNoticeMutationResult = Apollo.MutationResult<PublishNoticeMutation>;
export type PublishNoticeMutationOptions = Apollo.BaseMutationOptions<PublishNoticeMutation, PublishNoticeMutationVariables>;
export const StudentLoginDocument = gql`
    mutation StudentLogin($password: String!, $email: String!) {
  studentLogin(password: $password, email: $email) {
    errors {
      field
      message
    }
    student {
      id
      username
      email
    }
  }
}
    `;
export type StudentLoginMutationFn = Apollo.MutationFunction<StudentLoginMutation, StudentLoginMutationVariables>;

/**
 * __useStudentLoginMutation__
 *
 * To run a mutation, you first call `useStudentLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStudentLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [studentLoginMutation, { data, loading, error }] = useStudentLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useStudentLoginMutation(baseOptions?: Apollo.MutationHookOptions<StudentLoginMutation, StudentLoginMutationVariables>) {
        return Apollo.useMutation<StudentLoginMutation, StudentLoginMutationVariables>(StudentLoginDocument, baseOptions);
      }
export type StudentLoginMutationHookResult = ReturnType<typeof useStudentLoginMutation>;
export type StudentLoginMutationResult = Apollo.MutationResult<StudentLoginMutation>;
export type StudentLoginMutationOptions = Apollo.BaseMutationOptions<StudentLoginMutation, StudentLoginMutationVariables>;
export const RegisterStudentDocument = gql`
    mutation RegisterStudent($input: RegisterStudentInputType!) {
  registerStudent(input: $input) {
    errors {
      field
      message
    }
    student {
      id
      username
      email
      registrationNumber
      session {
        id
        name
        startTime
        endTime
      }
      oneTimePassword
      gender
      address
      contactNumber
      department {
        id
        name
        departmentCode
      }
    }
  }
}
    `;
export type RegisterStudentMutationFn = Apollo.MutationFunction<RegisterStudentMutation, RegisterStudentMutationVariables>;

/**
 * __useRegisterStudentMutation__
 *
 * To run a mutation, you first call `useRegisterStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerStudentMutation, { data, loading, error }] = useRegisterStudentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterStudentMutation(baseOptions?: Apollo.MutationHookOptions<RegisterStudentMutation, RegisterStudentMutationVariables>) {
        return Apollo.useMutation<RegisterStudentMutation, RegisterStudentMutationVariables>(RegisterStudentDocument, baseOptions);
      }
export type RegisterStudentMutationHookResult = ReturnType<typeof useRegisterStudentMutation>;
export type RegisterStudentMutationResult = Apollo.MutationResult<RegisterStudentMutation>;
export type RegisterStudentMutationOptions = Apollo.BaseMutationOptions<RegisterStudentMutation, RegisterStudentMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const StudentOrFacultyClassScheduleDocument = gql`
    query StudentOrFacultyClassSchedule {
  studentOrFacultyClassSchedule {
    id
    startTime
    endTime
    day
    course {
      name
    }
    semester {
      number
      id
    }
    faculty {
      username
      designation
    }
  }
}
    `;

/**
 * __useStudentOrFacultyClassScheduleQuery__
 *
 * To run a query within a React component, call `useStudentOrFacultyClassScheduleQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentOrFacultyClassScheduleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentOrFacultyClassScheduleQuery({
 *   variables: {
 *   },
 * });
 */
export function useStudentOrFacultyClassScheduleQuery(baseOptions?: Apollo.QueryHookOptions<StudentOrFacultyClassScheduleQuery, StudentOrFacultyClassScheduleQueryVariables>) {
        return Apollo.useQuery<StudentOrFacultyClassScheduleQuery, StudentOrFacultyClassScheduleQueryVariables>(StudentOrFacultyClassScheduleDocument, baseOptions);
      }
export function useStudentOrFacultyClassScheduleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudentOrFacultyClassScheduleQuery, StudentOrFacultyClassScheduleQueryVariables>) {
          return Apollo.useLazyQuery<StudentOrFacultyClassScheduleQuery, StudentOrFacultyClassScheduleQueryVariables>(StudentOrFacultyClassScheduleDocument, baseOptions);
        }
export type StudentOrFacultyClassScheduleQueryHookResult = ReturnType<typeof useStudentOrFacultyClassScheduleQuery>;
export type StudentOrFacultyClassScheduleLazyQueryHookResult = ReturnType<typeof useStudentOrFacultyClassScheduleLazyQuery>;
export type StudentOrFacultyClassScheduleQueryResult = Apollo.QueryResult<StudentOrFacultyClassScheduleQuery, StudentOrFacultyClassScheduleQueryVariables>;
export const CourseAssignToFacultyDocument = gql`
    query CourseAssignToFaculty {
  courseAssignToFaculty {
    id
    course {
      id
      name
      code
      credit
      description
    }
    semester {
      id
      number
    }
    session {
      id
      name
    }
    department {
      name
      departmentCode
    }
  }
}
    `;

/**
 * __useCourseAssignToFacultyQuery__
 *
 * To run a query within a React component, call `useCourseAssignToFacultyQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseAssignToFacultyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseAssignToFacultyQuery({
 *   variables: {
 *   },
 * });
 */
export function useCourseAssignToFacultyQuery(baseOptions?: Apollo.QueryHookOptions<CourseAssignToFacultyQuery, CourseAssignToFacultyQueryVariables>) {
        return Apollo.useQuery<CourseAssignToFacultyQuery, CourseAssignToFacultyQueryVariables>(CourseAssignToFacultyDocument, baseOptions);
      }
export function useCourseAssignToFacultyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseAssignToFacultyQuery, CourseAssignToFacultyQueryVariables>) {
          return Apollo.useLazyQuery<CourseAssignToFacultyQuery, CourseAssignToFacultyQueryVariables>(CourseAssignToFacultyDocument, baseOptions);
        }
export type CourseAssignToFacultyQueryHookResult = ReturnType<typeof useCourseAssignToFacultyQuery>;
export type CourseAssignToFacultyLazyQueryHookResult = ReturnType<typeof useCourseAssignToFacultyLazyQuery>;
export type CourseAssignToFacultyQueryResult = Apollo.QueryResult<CourseAssignToFacultyQuery, CourseAssignToFacultyQueryVariables>;
export const CourseNoticesDocument = gql`
    query CourseNotices($input: CourseNoticeInputType!) {
  courseNotice(input: $input) {
    id
    title
    description
    createdAt
  }
}
    `;

/**
 * __useCourseNoticesQuery__
 *
 * To run a query within a React component, call `useCourseNoticesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseNoticesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseNoticesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCourseNoticesQuery(baseOptions: Apollo.QueryHookOptions<CourseNoticesQuery, CourseNoticesQueryVariables>) {
        return Apollo.useQuery<CourseNoticesQuery, CourseNoticesQueryVariables>(CourseNoticesDocument, baseOptions);
      }
export function useCourseNoticesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseNoticesQuery, CourseNoticesQueryVariables>) {
          return Apollo.useLazyQuery<CourseNoticesQuery, CourseNoticesQueryVariables>(CourseNoticesDocument, baseOptions);
        }
export type CourseNoticesQueryHookResult = ReturnType<typeof useCourseNoticesQuery>;
export type CourseNoticesLazyQueryHookResult = ReturnType<typeof useCourseNoticesLazyQuery>;
export type CourseNoticesQueryResult = Apollo.QueryResult<CourseNoticesQuery, CourseNoticesQueryVariables>;
export const ClassScheduleByAllDocument = gql`
    query ClassScheduleByAll($semesterId: Int!, $sessionId: Int!, $courseCode: String!, $departmentCode: String!) {
  classScheduleByAll(
    semesterId: $semesterId
    sessionId: $sessionId
    courseCode: $courseCode
    departmentCode: $departmentCode
  ) {
    id
    startTime
    endTime
    day
    faculty {
      username
      designation
    }
  }
}
    `;

/**
 * __useClassScheduleByAllQuery__
 *
 * To run a query within a React component, call `useClassScheduleByAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useClassScheduleByAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClassScheduleByAllQuery({
 *   variables: {
 *      semesterId: // value for 'semesterId'
 *      sessionId: // value for 'sessionId'
 *      courseCode: // value for 'courseCode'
 *      departmentCode: // value for 'departmentCode'
 *   },
 * });
 */
export function useClassScheduleByAllQuery(baseOptions: Apollo.QueryHookOptions<ClassScheduleByAllQuery, ClassScheduleByAllQueryVariables>) {
        return Apollo.useQuery<ClassScheduleByAllQuery, ClassScheduleByAllQueryVariables>(ClassScheduleByAllDocument, baseOptions);
      }
export function useClassScheduleByAllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClassScheduleByAllQuery, ClassScheduleByAllQueryVariables>) {
          return Apollo.useLazyQuery<ClassScheduleByAllQuery, ClassScheduleByAllQueryVariables>(ClassScheduleByAllDocument, baseOptions);
        }
export type ClassScheduleByAllQueryHookResult = ReturnType<typeof useClassScheduleByAllQuery>;
export type ClassScheduleByAllLazyQueryHookResult = ReturnType<typeof useClassScheduleByAllLazyQuery>;
export type ClassScheduleByAllQueryResult = Apollo.QueryResult<ClassScheduleByAllQuery, ClassScheduleByAllQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    student {
      id
      username
      email
      registrationNumber
      oneTimePassword
      gender
      address
      contactNumber
      department {
        name
      }
      session {
        name
      }
    }
    admin {
      id
      username
      email
    }
    faculty {
      id
      username
      designation
      email
      oneTimePassword
      gender
      address
      contactNumber
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MyNoticesDocument = gql`
    query MyNotices {
  myNotices {
    id
    title
    description
    createdAt
  }
}
    `;

/**
 * __useMyNoticesQuery__
 *
 * To run a query within a React component, call `useMyNoticesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyNoticesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyNoticesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyNoticesQuery(baseOptions?: Apollo.QueryHookOptions<MyNoticesQuery, MyNoticesQueryVariables>) {
        return Apollo.useQuery<MyNoticesQuery, MyNoticesQueryVariables>(MyNoticesDocument, baseOptions);
      }
export function useMyNoticesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyNoticesQuery, MyNoticesQueryVariables>) {
          return Apollo.useLazyQuery<MyNoticesQuery, MyNoticesQueryVariables>(MyNoticesDocument, baseOptions);
        }
export type MyNoticesQueryHookResult = ReturnType<typeof useMyNoticesQuery>;
export type MyNoticesLazyQueryHookResult = ReturnType<typeof useMyNoticesLazyQuery>;
export type MyNoticesQueryResult = Apollo.QueryResult<MyNoticesQuery, MyNoticesQueryVariables>;
export const StudentCoursesBySemesterDocument = gql`
    query StudentCoursesBySemester($input: Int!) {
  studentCoursesBySemester(semesterId: $input) {
    id
    code
    name
    credit
    description
    department {
      id
      name
      departmentCode
    }
    semester {
      id
      number
    }
  }
}
    `;

/**
 * __useStudentCoursesBySemesterQuery__
 *
 * To run a query within a React component, call `useStudentCoursesBySemesterQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentCoursesBySemesterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentCoursesBySemesterQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useStudentCoursesBySemesterQuery(baseOptions: Apollo.QueryHookOptions<StudentCoursesBySemesterQuery, StudentCoursesBySemesterQueryVariables>) {
        return Apollo.useQuery<StudentCoursesBySemesterQuery, StudentCoursesBySemesterQueryVariables>(StudentCoursesBySemesterDocument, baseOptions);
      }
export function useStudentCoursesBySemesterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudentCoursesBySemesterQuery, StudentCoursesBySemesterQueryVariables>) {
          return Apollo.useLazyQuery<StudentCoursesBySemesterQuery, StudentCoursesBySemesterQueryVariables>(StudentCoursesBySemesterDocument, baseOptions);
        }
export type StudentCoursesBySemesterQueryHookResult = ReturnType<typeof useStudentCoursesBySemesterQuery>;
export type StudentCoursesBySemesterLazyQueryHookResult = ReturnType<typeof useStudentCoursesBySemesterLazyQuery>;
export type StudentCoursesBySemesterQueryResult = Apollo.QueryResult<StudentCoursesBySemesterQuery, StudentCoursesBySemesterQueryVariables>;
export const TodaysClassScheduleDocument = gql`
    query TodaysClassSchedule {
  todaysClassSchedule {
    id
    startTime
    endTime
    day
    course {
      name
    }
    semester {
      number
      id
    }
    faculty {
      id
      username
      designation
    }
  }
}
    `;

/**
 * __useTodaysClassScheduleQuery__
 *
 * To run a query within a React component, call `useTodaysClassScheduleQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodaysClassScheduleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodaysClassScheduleQuery({
 *   variables: {
 *   },
 * });
 */
export function useTodaysClassScheduleQuery(baseOptions?: Apollo.QueryHookOptions<TodaysClassScheduleQuery, TodaysClassScheduleQueryVariables>) {
        return Apollo.useQuery<TodaysClassScheduleQuery, TodaysClassScheduleQueryVariables>(TodaysClassScheduleDocument, baseOptions);
      }
export function useTodaysClassScheduleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TodaysClassScheduleQuery, TodaysClassScheduleQueryVariables>) {
          return Apollo.useLazyQuery<TodaysClassScheduleQuery, TodaysClassScheduleQueryVariables>(TodaysClassScheduleDocument, baseOptions);
        }
export type TodaysClassScheduleQueryHookResult = ReturnType<typeof useTodaysClassScheduleQuery>;
export type TodaysClassScheduleLazyQueryHookResult = ReturnType<typeof useTodaysClassScheduleLazyQuery>;
export type TodaysClassScheduleQueryResult = Apollo.QueryResult<TodaysClassScheduleQuery, TodaysClassScheduleQueryVariables>;
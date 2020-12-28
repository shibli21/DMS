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

export type Admin = {
  __typename?: 'Admin';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Department = {
  __typename?: 'Department';
  id: Scalars['Float'];
  name: Scalars['String'];
  departmentCode: Scalars['String'];
  courses: Array<Course>;
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

export type Session = {
  __typename?: 'Session';
  id: Scalars['Float'];
  name: Scalars['String'];
  startTime: Scalars['String'];
  endTime?: Maybe<Scalars['String']>;
  semester: Array<Semester>;
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

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type AdminResponse = {
  __typename?: 'AdminResponse';
  errors?: Maybe<Array<FieldError>>;
  admin?: Maybe<Admin>;
};

export type AddClassScheduleResponse = {
  __typename?: 'AddClassScheduleResponse';
  errors?: Maybe<Array<FieldError>>;
  classSchedule?: Maybe<Scalars['Boolean']>;
};

export type CourseResponse = {
  __typename?: 'CourseResponse';
  errors?: Maybe<Array<FieldError>>;
  course?: Maybe<Course>;
};

export type CourseAssignToFacultyResponse = {
  __typename?: 'CourseAssignToFacultyResponse';
  errors?: Maybe<Array<FieldError>>;
  courseAssignToFaculty?: Maybe<CourseAssignToFaculty>;
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

export type MeResponse = {
  __typename?: 'MeResponse';
  student?: Maybe<Student>;
  admin?: Maybe<Admin>;
  faculty?: Maybe<Faculty>;
};

export type SemesterResponse = {
  __typename?: 'SemesterResponse';
  errors?: Maybe<Array<FieldError>>;
  semester?: Maybe<Semester>;
};

export type SessionResponse = {
  __typename?: 'SessionResponse';
  errors?: Maybe<Array<FieldError>>;
  session?: Maybe<Session>;
};

export type StudentResponse = {
  __typename?: 'StudentResponse';
  errors?: Maybe<Array<FieldError>>;
  student?: Maybe<Student>;
};

export type RegisterAdminInputType = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
  token: Scalars['String'];
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

export type AddCourseInputType = {
  code: Scalars['String'];
  name: Scalars['String'];
  credit?: Maybe<Scalars['Float']>;
  description: Scalars['String'];
  semesterId?: Maybe<Scalars['Float']>;
  departmentCode?: Maybe<Scalars['String']>;
};

export type AssignCourseToFacultyInputType = {
  semesterId?: Maybe<Scalars['Float']>;
  sessionId?: Maybe<Scalars['Float']>;
  departmentCode?: Maybe<Scalars['String']>;
  facultyId?: Maybe<Scalars['Float']>;
  courseCode?: Maybe<Scalars['String']>;
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

export type AddSemesterInputType = {
  number?: Maybe<Scalars['Float']>;
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
  sessionId?: Maybe<Scalars['Float']>;
  departmentCode?: Maybe<Scalars['String']>;
};

export type AddSessionInputType = {
  name?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
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
};

export type RegisterStudentInputType = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  classSchedules: Array<ClassSchedule>;
  classScheduleByAll: Array<ClassSchedule>;
  courses: Array<Course>;
  coursesByDeptSemester: Array<Course>;
  courseAssignToFaculties: Array<CourseAssignToFaculty>;
  departments: Array<Department>;
  faculties: Array<Faculty>;
  me?: Maybe<MeResponse>;
  semesters: Array<Semester>;
  semestersByDepartmentAndSession: Array<Semester>;
  session: Session;
  sessions: Array<Session>;
  students: Array<Student>;
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


export type QuerySemestersByDepartmentAndSessionArgs = {
  sessionId: Scalars['Int'];
  code: Scalars['String'];
};


export type QuerySessionArgs = {
  sessionId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  registerAdmin: AdminResponse;
  adminLogin: AdminResponse;
  addClassSchedule: AddClassScheduleResponse;
  addCourse: CourseResponse;
  assignCourseToFaculty: CourseAssignToFacultyResponse;
  addDepartment: DepartmentResponse;
  deleteDepartment: Scalars['Boolean'];
  addFaculty: FacultyResponse;
  registerFaculty: FacultyResponse;
  facultyLogin: FacultyResponse;
  logout: Scalars['Boolean'];
  addSemester: SemesterResponse;
  addSession: SessionResponse;
  addStudent: StudentResponse;
  registerStudent: StudentResponse;
  studentLogin: StudentResponse;
  deleteStudent: Scalars['Boolean'];
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


export type MutationAddSemesterArgs = {
  input: AddSemesterInputType;
};


export type MutationAddSessionArgs = {
  input: AddSessionInputType;
};


export type MutationAddStudentArgs = {
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

export type AddClassScheduleMutationVariables = Exact<{
  input: AddClassScheduleInputType;
}>;


export type AddClassScheduleMutation = (
  { __typename?: 'Mutation' }
  & { addClassSchedule: (
    { __typename?: 'AddClassScheduleResponse' }
    & Pick<AddClassScheduleResponse, 'classSchedule'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type AddCourseMutationVariables = Exact<{
  input: AddCourseInputType;
}>;


export type AddCourseMutation = (
  { __typename?: 'Mutation' }
  & { addCourse: (
    { __typename?: 'CourseResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, course?: Maybe<(
      { __typename?: 'Course' }
      & Pick<Course, 'id' | 'name' | 'credit' | 'description'>
      & { department: (
        { __typename?: 'Department' }
        & Pick<Department, 'id' | 'name' | 'departmentCode'>
      ) }
    )> }
  ) }
);

export type AddDepartmentMutationVariables = Exact<{
  code: Scalars['String'];
  name: Scalars['String'];
}>;


export type AddDepartmentMutation = (
  { __typename?: 'Mutation' }
  & { addDepartment: (
    { __typename?: 'DepartmentResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, department?: Maybe<(
      { __typename?: 'Department' }
      & Pick<Department, 'id' | 'name' | 'departmentCode'>
    )> }
  ) }
);

export type AddFacultyMutationVariables = Exact<{
  input: AddFacultyInputType;
}>;


export type AddFacultyMutation = (
  { __typename?: 'Mutation' }
  & { addFaculty: (
    { __typename?: 'FacultyResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, faculty?: Maybe<(
      { __typename?: 'Faculty' }
      & Pick<Faculty, 'id' | 'email' | 'username' | 'designation' | 'gender' | 'address' | 'contactNumber'>
    )> }
  ) }
);

export type AddSemesterMutationVariables = Exact<{
  input: AddSemesterInputType;
}>;


export type AddSemesterMutation = (
  { __typename?: 'Mutation' }
  & { addSemester: (
    { __typename?: 'SemesterResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, semester?: Maybe<(
      { __typename?: 'Semester' }
      & Pick<Semester, 'id' | 'number' | 'startTime' | 'endTime'>
    )> }
  ) }
);

export type AddSessionMutationVariables = Exact<{
  input: AddSessionInputType;
}>;


export type AddSessionMutation = (
  { __typename?: 'Mutation' }
  & { addSession: (
    { __typename?: 'SessionResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, session?: Maybe<(
      { __typename?: 'Session' }
      & Pick<Session, 'id' | 'name' | 'startTime' | 'endTime'>
    )> }
  ) }
);

export type AddStudentMutationVariables = Exact<{
  input: AddStudentInputType;
}>;


export type AddStudentMutation = (
  { __typename?: 'Mutation' }
  & { addStudent: (
    { __typename?: 'StudentResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, student?: Maybe<(
      { __typename?: 'Student' }
      & Pick<Student, 'id' | 'username' | 'email' | 'registrationNumber' | 'oneTimePassword' | 'gender' | 'address' | 'contactNumber' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type AdminLoginMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type AdminLoginMutation = (
  { __typename?: 'Mutation' }
  & { adminLogin: (
    { __typename?: 'AdminResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, admin?: Maybe<(
      { __typename?: 'Admin' }
      & Pick<Admin, 'id' | 'username' | 'email'>
    )> }
  ) }
);

export type AdminRegisterMutationVariables = Exact<{
  input: RegisterAdminInputType;
}>;


export type AdminRegisterMutation = (
  { __typename?: 'Mutation' }
  & { registerAdmin: (
    { __typename?: 'AdminResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, admin?: Maybe<(
      { __typename?: 'Admin' }
      & Pick<Admin, 'id' | 'username' | 'email'>
    )> }
  ) }
);

export type AssignCourseToFacultyMutationVariables = Exact<{
  input: AssignCourseToFacultyInputType;
}>;


export type AssignCourseToFacultyMutation = (
  { __typename?: 'Mutation' }
  & { assignCourseToFaculty: (
    { __typename?: 'CourseAssignToFacultyResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, courseAssignToFaculty?: Maybe<(
      { __typename?: 'CourseAssignToFaculty' }
      & Pick<CourseAssignToFaculty, 'id'>
      & { faculty: (
        { __typename?: 'Faculty' }
        & Pick<Faculty, 'username'>
      ), department: (
        { __typename?: 'Department' }
        & Pick<Department, 'name'>
      ), course: (
        { __typename?: 'Course' }
        & Pick<Course, 'name'>
      ) }
    )> }
  ) }
);

export type DeleteStudentMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteStudentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteStudent'>
);

export type DeleteDepartmentMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type DeleteDepartmentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteDepartment'>
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
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

export type CoursesByDeptSemesterQueryVariables = Exact<{
  departmentCode: Scalars['String'];
  semesterId: Scalars['Int'];
}>;


export type CoursesByDeptSemesterQuery = (
  { __typename?: 'Query' }
  & { coursesByDeptSemester: Array<(
    { __typename?: 'Course' }
    & Pick<Course, 'id' | 'code' | 'name'>
  )> }
);

export type DepartmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type DepartmentsQuery = (
  { __typename?: 'Query' }
  & { departments: Array<(
    { __typename?: 'Department' }
    & Pick<Department, 'id' | 'name' | 'departmentCode'>
  )> }
);

export type FacultiesQueryVariables = Exact<{ [key: string]: never; }>;


export type FacultiesQuery = (
  { __typename?: 'Query' }
  & { faculties: Array<(
    { __typename?: 'Faculty' }
    & Pick<Faculty, 'id' | 'username' | 'designation' | 'email' | 'gender' | 'address' | 'contactNumber'>
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
    )>, admin?: Maybe<(
      { __typename?: 'Admin' }
      & Pick<Admin, 'id' | 'username' | 'email'>
    )>, faculty?: Maybe<(
      { __typename?: 'Faculty' }
      & Pick<Faculty, 'id' | 'username' | 'designation' | 'email' | 'oneTimePassword' | 'gender' | 'address' | 'contactNumber'>
    )> }
  )> }
);

export type SemestersQueryVariables = Exact<{ [key: string]: never; }>;


export type SemestersQuery = (
  { __typename?: 'Query' }
  & { semesters: Array<(
    { __typename?: 'Semester' }
    & Pick<Semester, 'id' | 'number' | 'startTime' | 'endTime'>
    & { department: (
      { __typename?: 'Department' }
      & Pick<Department, 'id' | 'name' | 'departmentCode'>
    ), session: (
      { __typename?: 'Session' }
      & Pick<Session, 'id' | 'name' | 'startTime' | 'endTime'>
    ) }
  )> }
);

export type SemestersByDepartmentAndSessionQueryVariables = Exact<{
  sessionId: Scalars['Int'];
  code: Scalars['String'];
}>;


export type SemestersByDepartmentAndSessionQuery = (
  { __typename?: 'Query' }
  & { semestersByDepartmentAndSession: Array<(
    { __typename?: 'Semester' }
    & Pick<Semester, 'id' | 'number'>
  )> }
);

export type SessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionsQuery = (
  { __typename?: 'Query' }
  & { sessions: Array<(
    { __typename?: 'Session' }
    & Pick<Session, 'id' | 'name' | 'startTime' | 'endTime'>
  )> }
);

export type StudentsQueryVariables = Exact<{ [key: string]: never; }>;


export type StudentsQuery = (
  { __typename?: 'Query' }
  & { students: Array<(
    { __typename?: 'Student' }
    & Pick<Student, 'id' | 'username' | 'email' | 'gender' | 'address' | 'registrationNumber' | 'contactNumber' | 'oneTimePassword'>
    & { session: (
      { __typename?: 'Session' }
      & Pick<Session, 'id' | 'name'>
    ), department: (
      { __typename?: 'Department' }
      & Pick<Department, 'id' | 'name' | 'departmentCode'>
    ) }
  )> }
);

export type SessionQueryVariables = Exact<{
  sessionId: Scalars['Int'];
}>;


export type SessionQuery = (
  { __typename?: 'Query' }
  & { session: (
    { __typename?: 'Session' }
    & Pick<Session, 'id' | 'name' | 'startTime' | 'endTime'>
    & { semester: Array<(
      { __typename?: 'Semester' }
      & Pick<Semester, 'id' | 'number'>
    )> }
  ) }
);


export const AddClassScheduleDocument = gql`
    mutation AddClassSchedule($input: AddClassScheduleInputType!) {
  addClassSchedule(input: $input) {
    errors {
      field
      message
    }
    classSchedule
  }
}
    `;
export type AddClassScheduleMutationFn = Apollo.MutationFunction<AddClassScheduleMutation, AddClassScheduleMutationVariables>;

/**
 * __useAddClassScheduleMutation__
 *
 * To run a mutation, you first call `useAddClassScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddClassScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addClassScheduleMutation, { data, loading, error }] = useAddClassScheduleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddClassScheduleMutation(baseOptions?: Apollo.MutationHookOptions<AddClassScheduleMutation, AddClassScheduleMutationVariables>) {
        return Apollo.useMutation<AddClassScheduleMutation, AddClassScheduleMutationVariables>(AddClassScheduleDocument, baseOptions);
      }
export type AddClassScheduleMutationHookResult = ReturnType<typeof useAddClassScheduleMutation>;
export type AddClassScheduleMutationResult = Apollo.MutationResult<AddClassScheduleMutation>;
export type AddClassScheduleMutationOptions = Apollo.BaseMutationOptions<AddClassScheduleMutation, AddClassScheduleMutationVariables>;
export const AddCourseDocument = gql`
    mutation AddCourse($input: AddCourseInputType!) {
  addCourse(input: $input) {
    errors {
      field
      message
    }
    course {
      id
      name
      credit
      description
      department {
        id
        name
        departmentCode
      }
    }
  }
}
    `;
export type AddCourseMutationFn = Apollo.MutationFunction<AddCourseMutation, AddCourseMutationVariables>;

/**
 * __useAddCourseMutation__
 *
 * To run a mutation, you first call `useAddCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCourseMutation, { data, loading, error }] = useAddCourseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCourseMutation(baseOptions?: Apollo.MutationHookOptions<AddCourseMutation, AddCourseMutationVariables>) {
        return Apollo.useMutation<AddCourseMutation, AddCourseMutationVariables>(AddCourseDocument, baseOptions);
      }
export type AddCourseMutationHookResult = ReturnType<typeof useAddCourseMutation>;
export type AddCourseMutationResult = Apollo.MutationResult<AddCourseMutation>;
export type AddCourseMutationOptions = Apollo.BaseMutationOptions<AddCourseMutation, AddCourseMutationVariables>;
export const AddDepartmentDocument = gql`
    mutation AddDepartment($code: String!, $name: String!) {
  addDepartment(code: $code, name: $name) {
    errors {
      field
      message
    }
    department {
      id
      name
      departmentCode
    }
  }
}
    `;
export type AddDepartmentMutationFn = Apollo.MutationFunction<AddDepartmentMutation, AddDepartmentMutationVariables>;

/**
 * __useAddDepartmentMutation__
 *
 * To run a mutation, you first call `useAddDepartmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDepartmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDepartmentMutation, { data, loading, error }] = useAddDepartmentMutation({
 *   variables: {
 *      code: // value for 'code'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddDepartmentMutation(baseOptions?: Apollo.MutationHookOptions<AddDepartmentMutation, AddDepartmentMutationVariables>) {
        return Apollo.useMutation<AddDepartmentMutation, AddDepartmentMutationVariables>(AddDepartmentDocument, baseOptions);
      }
export type AddDepartmentMutationHookResult = ReturnType<typeof useAddDepartmentMutation>;
export type AddDepartmentMutationResult = Apollo.MutationResult<AddDepartmentMutation>;
export type AddDepartmentMutationOptions = Apollo.BaseMutationOptions<AddDepartmentMutation, AddDepartmentMutationVariables>;
export const AddFacultyDocument = gql`
    mutation AddFaculty($input: AddFacultyInputType!) {
  addFaculty(input: $input) {
    errors {
      field
      message
    }
    faculty {
      id
      email
      username
      designation
      gender
      address
      contactNumber
    }
  }
}
    `;
export type AddFacultyMutationFn = Apollo.MutationFunction<AddFacultyMutation, AddFacultyMutationVariables>;

/**
 * __useAddFacultyMutation__
 *
 * To run a mutation, you first call `useAddFacultyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFacultyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFacultyMutation, { data, loading, error }] = useAddFacultyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddFacultyMutation(baseOptions?: Apollo.MutationHookOptions<AddFacultyMutation, AddFacultyMutationVariables>) {
        return Apollo.useMutation<AddFacultyMutation, AddFacultyMutationVariables>(AddFacultyDocument, baseOptions);
      }
export type AddFacultyMutationHookResult = ReturnType<typeof useAddFacultyMutation>;
export type AddFacultyMutationResult = Apollo.MutationResult<AddFacultyMutation>;
export type AddFacultyMutationOptions = Apollo.BaseMutationOptions<AddFacultyMutation, AddFacultyMutationVariables>;
export const AddSemesterDocument = gql`
    mutation AddSemester($input: AddSemesterInputType!) {
  addSemester(input: $input) {
    errors {
      field
      message
    }
    semester {
      id
      number
      startTime
      endTime
    }
  }
}
    `;
export type AddSemesterMutationFn = Apollo.MutationFunction<AddSemesterMutation, AddSemesterMutationVariables>;

/**
 * __useAddSemesterMutation__
 *
 * To run a mutation, you first call `useAddSemesterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSemesterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSemesterMutation, { data, loading, error }] = useAddSemesterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddSemesterMutation(baseOptions?: Apollo.MutationHookOptions<AddSemesterMutation, AddSemesterMutationVariables>) {
        return Apollo.useMutation<AddSemesterMutation, AddSemesterMutationVariables>(AddSemesterDocument, baseOptions);
      }
export type AddSemesterMutationHookResult = ReturnType<typeof useAddSemesterMutation>;
export type AddSemesterMutationResult = Apollo.MutationResult<AddSemesterMutation>;
export type AddSemesterMutationOptions = Apollo.BaseMutationOptions<AddSemesterMutation, AddSemesterMutationVariables>;
export const AddSessionDocument = gql`
    mutation AddSession($input: AddSessionInputType!) {
  addSession(input: $input) {
    errors {
      field
      message
    }
    session {
      id
      name
      startTime
      endTime
    }
  }
}
    `;
export type AddSessionMutationFn = Apollo.MutationFunction<AddSessionMutation, AddSessionMutationVariables>;

/**
 * __useAddSessionMutation__
 *
 * To run a mutation, you first call `useAddSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSessionMutation, { data, loading, error }] = useAddSessionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddSessionMutation(baseOptions?: Apollo.MutationHookOptions<AddSessionMutation, AddSessionMutationVariables>) {
        return Apollo.useMutation<AddSessionMutation, AddSessionMutationVariables>(AddSessionDocument, baseOptions);
      }
export type AddSessionMutationHookResult = ReturnType<typeof useAddSessionMutation>;
export type AddSessionMutationResult = Apollo.MutationResult<AddSessionMutation>;
export type AddSessionMutationOptions = Apollo.BaseMutationOptions<AddSessionMutation, AddSessionMutationVariables>;
export const AddStudentDocument = gql`
    mutation AddStudent($input: AddStudentInputType!) {
  addStudent(input: $input) {
    errors {
      field
      message
    }
    student {
      id
      username
      email
      registrationNumber
      oneTimePassword
      gender
      address
      contactNumber
      createdAt
      updatedAt
    }
  }
}
    `;
export type AddStudentMutationFn = Apollo.MutationFunction<AddStudentMutation, AddStudentMutationVariables>;

/**
 * __useAddStudentMutation__
 *
 * To run a mutation, you first call `useAddStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addStudentMutation, { data, loading, error }] = useAddStudentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddStudentMutation(baseOptions?: Apollo.MutationHookOptions<AddStudentMutation, AddStudentMutationVariables>) {
        return Apollo.useMutation<AddStudentMutation, AddStudentMutationVariables>(AddStudentDocument, baseOptions);
      }
export type AddStudentMutationHookResult = ReturnType<typeof useAddStudentMutation>;
export type AddStudentMutationResult = Apollo.MutationResult<AddStudentMutation>;
export type AddStudentMutationOptions = Apollo.BaseMutationOptions<AddStudentMutation, AddStudentMutationVariables>;
export const AdminLoginDocument = gql`
    mutation AdminLogin($password: String!, $email: String!) {
  adminLogin(password: $password, email: $email) {
    errors {
      field
      message
    }
    admin {
      id
      username
      email
    }
  }
}
    `;
export type AdminLoginMutationFn = Apollo.MutationFunction<AdminLoginMutation, AdminLoginMutationVariables>;

/**
 * __useAdminLoginMutation__
 *
 * To run a mutation, you first call `useAdminLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminLoginMutation, { data, loading, error }] = useAdminLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAdminLoginMutation(baseOptions?: Apollo.MutationHookOptions<AdminLoginMutation, AdminLoginMutationVariables>) {
        return Apollo.useMutation<AdminLoginMutation, AdminLoginMutationVariables>(AdminLoginDocument, baseOptions);
      }
export type AdminLoginMutationHookResult = ReturnType<typeof useAdminLoginMutation>;
export type AdminLoginMutationResult = Apollo.MutationResult<AdminLoginMutation>;
export type AdminLoginMutationOptions = Apollo.BaseMutationOptions<AdminLoginMutation, AdminLoginMutationVariables>;
export const AdminRegisterDocument = gql`
    mutation AdminRegister($input: RegisterAdminInputType!) {
  registerAdmin(input: $input) {
    errors {
      field
      message
    }
    admin {
      id
      username
      email
    }
  }
}
    `;
export type AdminRegisterMutationFn = Apollo.MutationFunction<AdminRegisterMutation, AdminRegisterMutationVariables>;

/**
 * __useAdminRegisterMutation__
 *
 * To run a mutation, you first call `useAdminRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminRegisterMutation, { data, loading, error }] = useAdminRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminRegisterMutation(baseOptions?: Apollo.MutationHookOptions<AdminRegisterMutation, AdminRegisterMutationVariables>) {
        return Apollo.useMutation<AdminRegisterMutation, AdminRegisterMutationVariables>(AdminRegisterDocument, baseOptions);
      }
export type AdminRegisterMutationHookResult = ReturnType<typeof useAdminRegisterMutation>;
export type AdminRegisterMutationResult = Apollo.MutationResult<AdminRegisterMutation>;
export type AdminRegisterMutationOptions = Apollo.BaseMutationOptions<AdminRegisterMutation, AdminRegisterMutationVariables>;
export const AssignCourseToFacultyDocument = gql`
    mutation AssignCourseToFaculty($input: AssignCourseToFacultyInputType!) {
  assignCourseToFaculty(input: $input) {
    errors {
      field
      message
    }
    courseAssignToFaculty {
      id
      faculty {
        username
      }
      department {
        name
      }
      course {
        name
      }
    }
  }
}
    `;
export type AssignCourseToFacultyMutationFn = Apollo.MutationFunction<AssignCourseToFacultyMutation, AssignCourseToFacultyMutationVariables>;

/**
 * __useAssignCourseToFacultyMutation__
 *
 * To run a mutation, you first call `useAssignCourseToFacultyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignCourseToFacultyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignCourseToFacultyMutation, { data, loading, error }] = useAssignCourseToFacultyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignCourseToFacultyMutation(baseOptions?: Apollo.MutationHookOptions<AssignCourseToFacultyMutation, AssignCourseToFacultyMutationVariables>) {
        return Apollo.useMutation<AssignCourseToFacultyMutation, AssignCourseToFacultyMutationVariables>(AssignCourseToFacultyDocument, baseOptions);
      }
export type AssignCourseToFacultyMutationHookResult = ReturnType<typeof useAssignCourseToFacultyMutation>;
export type AssignCourseToFacultyMutationResult = Apollo.MutationResult<AssignCourseToFacultyMutation>;
export type AssignCourseToFacultyMutationOptions = Apollo.BaseMutationOptions<AssignCourseToFacultyMutation, AssignCourseToFacultyMutationVariables>;
export const DeleteStudentDocument = gql`
    mutation DeleteStudent($id: Int!) {
  deleteStudent(id: $id)
}
    `;
export type DeleteStudentMutationFn = Apollo.MutationFunction<DeleteStudentMutation, DeleteStudentMutationVariables>;

/**
 * __useDeleteStudentMutation__
 *
 * To run a mutation, you first call `useDeleteStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStudentMutation, { data, loading, error }] = useDeleteStudentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteStudentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStudentMutation, DeleteStudentMutationVariables>) {
        return Apollo.useMutation<DeleteStudentMutation, DeleteStudentMutationVariables>(DeleteStudentDocument, baseOptions);
      }
export type DeleteStudentMutationHookResult = ReturnType<typeof useDeleteStudentMutation>;
export type DeleteStudentMutationResult = Apollo.MutationResult<DeleteStudentMutation>;
export type DeleteStudentMutationOptions = Apollo.BaseMutationOptions<DeleteStudentMutation, DeleteStudentMutationVariables>;
export const DeleteDepartmentDocument = gql`
    mutation DeleteDepartment($code: String!) {
  deleteDepartment(code: $code)
}
    `;
export type DeleteDepartmentMutationFn = Apollo.MutationFunction<DeleteDepartmentMutation, DeleteDepartmentMutationVariables>;

/**
 * __useDeleteDepartmentMutation__
 *
 * To run a mutation, you first call `useDeleteDepartmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDepartmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDepartmentMutation, { data, loading, error }] = useDeleteDepartmentMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useDeleteDepartmentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDepartmentMutation, DeleteDepartmentMutationVariables>) {
        return Apollo.useMutation<DeleteDepartmentMutation, DeleteDepartmentMutationVariables>(DeleteDepartmentDocument, baseOptions);
      }
export type DeleteDepartmentMutationHookResult = ReturnType<typeof useDeleteDepartmentMutation>;
export type DeleteDepartmentMutationResult = Apollo.MutationResult<DeleteDepartmentMutation>;
export type DeleteDepartmentMutationOptions = Apollo.BaseMutationOptions<DeleteDepartmentMutation, DeleteDepartmentMutationVariables>;
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
export const CoursesByDeptSemesterDocument = gql`
    query CoursesByDeptSemester($departmentCode: String!, $semesterId: Int!) {
  coursesByDeptSemester(semesterId: $semesterId, code: $departmentCode) {
    id
    code
    name
  }
}
    `;

/**
 * __useCoursesByDeptSemesterQuery__
 *
 * To run a query within a React component, call `useCoursesByDeptSemesterQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoursesByDeptSemesterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCoursesByDeptSemesterQuery({
 *   variables: {
 *      departmentCode: // value for 'departmentCode'
 *      semesterId: // value for 'semesterId'
 *   },
 * });
 */
export function useCoursesByDeptSemesterQuery(baseOptions: Apollo.QueryHookOptions<CoursesByDeptSemesterQuery, CoursesByDeptSemesterQueryVariables>) {
        return Apollo.useQuery<CoursesByDeptSemesterQuery, CoursesByDeptSemesterQueryVariables>(CoursesByDeptSemesterDocument, baseOptions);
      }
export function useCoursesByDeptSemesterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CoursesByDeptSemesterQuery, CoursesByDeptSemesterQueryVariables>) {
          return Apollo.useLazyQuery<CoursesByDeptSemesterQuery, CoursesByDeptSemesterQueryVariables>(CoursesByDeptSemesterDocument, baseOptions);
        }
export type CoursesByDeptSemesterQueryHookResult = ReturnType<typeof useCoursesByDeptSemesterQuery>;
export type CoursesByDeptSemesterLazyQueryHookResult = ReturnType<typeof useCoursesByDeptSemesterLazyQuery>;
export type CoursesByDeptSemesterQueryResult = Apollo.QueryResult<CoursesByDeptSemesterQuery, CoursesByDeptSemesterQueryVariables>;
export const DepartmentsDocument = gql`
    query Departments {
  departments {
    id
    name
    departmentCode
  }
}
    `;

/**
 * __useDepartmentsQuery__
 *
 * To run a query within a React component, call `useDepartmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDepartmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDepartmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDepartmentsQuery(baseOptions?: Apollo.QueryHookOptions<DepartmentsQuery, DepartmentsQueryVariables>) {
        return Apollo.useQuery<DepartmentsQuery, DepartmentsQueryVariables>(DepartmentsDocument, baseOptions);
      }
export function useDepartmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DepartmentsQuery, DepartmentsQueryVariables>) {
          return Apollo.useLazyQuery<DepartmentsQuery, DepartmentsQueryVariables>(DepartmentsDocument, baseOptions);
        }
export type DepartmentsQueryHookResult = ReturnType<typeof useDepartmentsQuery>;
export type DepartmentsLazyQueryHookResult = ReturnType<typeof useDepartmentsLazyQuery>;
export type DepartmentsQueryResult = Apollo.QueryResult<DepartmentsQuery, DepartmentsQueryVariables>;
export const FacultiesDocument = gql`
    query Faculties {
  faculties {
    id
    username
    designation
    email
    gender
    address
    contactNumber
  }
}
    `;

/**
 * __useFacultiesQuery__
 *
 * To run a query within a React component, call `useFacultiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFacultiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFacultiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFacultiesQuery(baseOptions?: Apollo.QueryHookOptions<FacultiesQuery, FacultiesQueryVariables>) {
        return Apollo.useQuery<FacultiesQuery, FacultiesQueryVariables>(FacultiesDocument, baseOptions);
      }
export function useFacultiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FacultiesQuery, FacultiesQueryVariables>) {
          return Apollo.useLazyQuery<FacultiesQuery, FacultiesQueryVariables>(FacultiesDocument, baseOptions);
        }
export type FacultiesQueryHookResult = ReturnType<typeof useFacultiesQuery>;
export type FacultiesLazyQueryHookResult = ReturnType<typeof useFacultiesLazyQuery>;
export type FacultiesQueryResult = Apollo.QueryResult<FacultiesQuery, FacultiesQueryVariables>;
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
export const SemestersDocument = gql`
    query Semesters {
  semesters {
    id
    number
    startTime
    endTime
    department {
      id
      name
      departmentCode
    }
    session {
      id
      name
      startTime
      endTime
    }
  }
}
    `;

/**
 * __useSemestersQuery__
 *
 * To run a query within a React component, call `useSemestersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSemestersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSemestersQuery({
 *   variables: {
 *   },
 * });
 */
export function useSemestersQuery(baseOptions?: Apollo.QueryHookOptions<SemestersQuery, SemestersQueryVariables>) {
        return Apollo.useQuery<SemestersQuery, SemestersQueryVariables>(SemestersDocument, baseOptions);
      }
export function useSemestersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SemestersQuery, SemestersQueryVariables>) {
          return Apollo.useLazyQuery<SemestersQuery, SemestersQueryVariables>(SemestersDocument, baseOptions);
        }
export type SemestersQueryHookResult = ReturnType<typeof useSemestersQuery>;
export type SemestersLazyQueryHookResult = ReturnType<typeof useSemestersLazyQuery>;
export type SemestersQueryResult = Apollo.QueryResult<SemestersQuery, SemestersQueryVariables>;
export const SemestersByDepartmentAndSessionDocument = gql`
    query SemestersByDepartmentAndSession($sessionId: Int!, $code: String!) {
  semestersByDepartmentAndSession(code: $code, sessionId: $sessionId) {
    id
    number
  }
}
    `;

/**
 * __useSemestersByDepartmentAndSessionQuery__
 *
 * To run a query within a React component, call `useSemestersByDepartmentAndSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useSemestersByDepartmentAndSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSemestersByDepartmentAndSessionQuery({
 *   variables: {
 *      sessionId: // value for 'sessionId'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useSemestersByDepartmentAndSessionQuery(baseOptions: Apollo.QueryHookOptions<SemestersByDepartmentAndSessionQuery, SemestersByDepartmentAndSessionQueryVariables>) {
        return Apollo.useQuery<SemestersByDepartmentAndSessionQuery, SemestersByDepartmentAndSessionQueryVariables>(SemestersByDepartmentAndSessionDocument, baseOptions);
      }
export function useSemestersByDepartmentAndSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SemestersByDepartmentAndSessionQuery, SemestersByDepartmentAndSessionQueryVariables>) {
          return Apollo.useLazyQuery<SemestersByDepartmentAndSessionQuery, SemestersByDepartmentAndSessionQueryVariables>(SemestersByDepartmentAndSessionDocument, baseOptions);
        }
export type SemestersByDepartmentAndSessionQueryHookResult = ReturnType<typeof useSemestersByDepartmentAndSessionQuery>;
export type SemestersByDepartmentAndSessionLazyQueryHookResult = ReturnType<typeof useSemestersByDepartmentAndSessionLazyQuery>;
export type SemestersByDepartmentAndSessionQueryResult = Apollo.QueryResult<SemestersByDepartmentAndSessionQuery, SemestersByDepartmentAndSessionQueryVariables>;
export const SessionsDocument = gql`
    query Sessions {
  sessions {
    id
    name
    startTime
    endTime
  }
}
    `;

/**
 * __useSessionsQuery__
 *
 * To run a query within a React component, call `useSessionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSessionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSessionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSessionsQuery(baseOptions?: Apollo.QueryHookOptions<SessionsQuery, SessionsQueryVariables>) {
        return Apollo.useQuery<SessionsQuery, SessionsQueryVariables>(SessionsDocument, baseOptions);
      }
export function useSessionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SessionsQuery, SessionsQueryVariables>) {
          return Apollo.useLazyQuery<SessionsQuery, SessionsQueryVariables>(SessionsDocument, baseOptions);
        }
export type SessionsQueryHookResult = ReturnType<typeof useSessionsQuery>;
export type SessionsLazyQueryHookResult = ReturnType<typeof useSessionsLazyQuery>;
export type SessionsQueryResult = Apollo.QueryResult<SessionsQuery, SessionsQueryVariables>;
export const StudentsDocument = gql`
    query Students {
  students {
    id
    username
    email
    gender
    address
    registrationNumber
    contactNumber
    oneTimePassword
    session {
      id
      name
    }
    department {
      id
      name
      departmentCode
    }
  }
}
    `;

/**
 * __useStudentsQuery__
 *
 * To run a query within a React component, call `useStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useStudentsQuery(baseOptions?: Apollo.QueryHookOptions<StudentsQuery, StudentsQueryVariables>) {
        return Apollo.useQuery<StudentsQuery, StudentsQueryVariables>(StudentsDocument, baseOptions);
      }
export function useStudentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudentsQuery, StudentsQueryVariables>) {
          return Apollo.useLazyQuery<StudentsQuery, StudentsQueryVariables>(StudentsDocument, baseOptions);
        }
export type StudentsQueryHookResult = ReturnType<typeof useStudentsQuery>;
export type StudentsLazyQueryHookResult = ReturnType<typeof useStudentsLazyQuery>;
export type StudentsQueryResult = Apollo.QueryResult<StudentsQuery, StudentsQueryVariables>;
export const SessionDocument = gql`
    query Session($sessionId: Int!) {
  session(sessionId: $sessionId) {
    id
    name
    startTime
    endTime
    semester {
      id
      number
    }
  }
}
    `;

/**
 * __useSessionQuery__
 *
 * To run a query within a React component, call `useSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSessionQuery({
 *   variables: {
 *      sessionId: // value for 'sessionId'
 *   },
 * });
 */
export function useSessionQuery(baseOptions: Apollo.QueryHookOptions<SessionQuery, SessionQueryVariables>) {
        return Apollo.useQuery<SessionQuery, SessionQueryVariables>(SessionDocument, baseOptions);
      }
export function useSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SessionQuery, SessionQueryVariables>) {
          return Apollo.useLazyQuery<SessionQuery, SessionQueryVariables>(SessionDocument, baseOptions);
        }
export type SessionQueryHookResult = ReturnType<typeof useSessionQuery>;
export type SessionLazyQueryHookResult = ReturnType<typeof useSessionLazyQuery>;
export type SessionQueryResult = Apollo.QueryResult<SessionQuery, SessionQueryVariables>;
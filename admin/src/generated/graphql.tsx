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
  day: Scalars['Float'];
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

export type ClassScheduleResponse = {
  __typename?: 'ClassScheduleResponse';
  errors?: Maybe<Array<FieldError>>;
  classSchedule?: Maybe<ClassSchedule>;
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
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  day: Scalars['Float'];
  sessionId: Scalars['Float'];
  semesterId: Scalars['Float'];
  courseCode: Scalars['String'];
  departmentCode: Scalars['String'];
  facultyId: Scalars['Float'];
};

export type AddCourseInputType = {
  code: Scalars['String'];
  name: Scalars['String'];
  credit: Scalars['Float'];
  description: Scalars['String'];
  semesterId: Scalars['Float'];
  departmentCode: Scalars['String'];
};

export type AssignCourseToFacultyInputType = {
  semesterId: Scalars['Float'];
  sessionId: Scalars['Float'];
  departmentCode: Scalars['String'];
  facultyId: Scalars['Float'];
  courseCode: Scalars['String'];
};

export type AddFacultyInputType = {
  email: Scalars['String'];
  username: Scalars['String'];
  designation: Scalars['String'];
  gender: Scalars['String'];
  address: Scalars['String'];
  contactNumber: Scalars['Float'];
};

export type RegisterFacultyInputType = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type AddSemesterInputType = {
  number: Scalars['Float'];
  startTime: Scalars['String'];
  endTime?: Maybe<Scalars['String']>;
  sessionId: Scalars['Float'];
  departmentCode: Scalars['String'];
};

export type AddSessionInputType = {
  name: Scalars['String'];
  startTime: Scalars['String'];
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
  courses: Array<Course>;
  courseAssignToFaculties: Array<CourseAssignToFaculty>;
  departments: Array<Department>;
  faculties: Array<Faculty>;
  me?: Maybe<MeResponse>;
  semesters: Array<Semester>;
  sessions: Array<Session>;
  students: Array<Student>;
};

export type Mutation = {
  __typename?: 'Mutation';
  registerAdmin: AdminResponse;
  adminLogin: AdminResponse;
  addClassSchedule: ClassScheduleResponse;
  addCourse: CourseResponse;
  assignCourseToFaculty: CourseAssignToFacultyResponse;
  addDepartment: DepartmentResponse;
  addFaculty: FacultyResponse;
  registerFaculty: FacultyResponse;
  facultyLogin: FacultyResponse;
  logout: Scalars['Boolean'];
  addSemester: SemesterResponse;
  addSession: SessionResponse;
  addStudent: StudentResponse;
  registerStudent: StudentResponse;
  studentLogin: StudentResponse;
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

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type DepartmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type DepartmentsQuery = (
  { __typename?: 'Query' }
  & { departments: Array<(
    { __typename?: 'Department' }
    & Pick<Department, 'id' | 'name' | 'departmentCode'>
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

export type SessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionsQuery = (
  { __typename?: 'Query' }
  & { sessions: Array<(
    { __typename?: 'Session' }
    & Pick<Session, 'id' | 'name' | 'startTime' | 'endTime'>
  )> }
);


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
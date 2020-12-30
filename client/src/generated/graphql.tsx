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
  students: Array<Student>;
  session: Session;
  sessions: Array<Session>;
  semesters: Array<Semester>;
  semestersByDepartmentAndSession: Array<Semester>;
  me?: Maybe<MeResponse>;
  faculties: Array<Faculty>;
  departments: Array<Department>;
  courseAssignToFaculties: Array<CourseAssignToFaculty>;
  courses: Array<Course>;
  coursesByDeptSemester: Array<Course>;
  classSchedules: Array<ClassSchedule>;
  classScheduleByAll: Array<ClassSchedule>;
  hello: Scalars['String'];
};


export type QuerySessionArgs = {
  sessionId: Scalars['Int'];
};


export type QuerySemestersByDepartmentAndSessionArgs = {
  sessionId: Scalars['Int'];
  code: Scalars['String'];
};


export type QueryCoursesByDeptSemesterArgs = {
  semesterId: Scalars['Int'];
  code: Scalars['String'];
};


export type QueryClassScheduleByAllArgs = {
  semesterId: Scalars['Int'];
  sessionId: Scalars['Int'];
  courseCode: Scalars['String'];
  departmentCode: Scalars['String'];
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

export type Admin = {
  __typename?: 'Admin';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
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

export type Mutation = {
  __typename?: 'Mutation';
  addStudent: StudentResponse;
  registerStudent: StudentResponse;
  studentLogin: StudentResponse;
  deleteStudent: Scalars['Boolean'];
  addSession: SessionResponse;
  deleteSession: Scalars['Boolean'];
  addSemester: SemesterResponse;
  deleteSemester: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  addFaculty: FacultyResponse;
  registerFaculty: FacultyResponse;
  facultyLogin: FacultyResponse;
  deleteFaculty: Scalars['Boolean'];
  addDepartment: DepartmentResponse;
  deleteDepartment: Scalars['Boolean'];
  assignCourseToFaculty: CourseAssignToFacultyResponse;
  addCourse: CourseResponse;
  addClassSchedule: AddClassScheduleResponse;
  registerAdmin: AdminResponse;
  adminLogin: AdminResponse;
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


export type MutationAddSessionArgs = {
  input: AddSessionInputType;
};


export type MutationDeleteSessionArgs = {
  id: Scalars['Int'];
};


export type MutationAddSemesterArgs = {
  input: AddSemesterInputType;
};


export type MutationDeleteSemesterArgs = {
  id: Scalars['Int'];
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


export type MutationAddDepartmentArgs = {
  code: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteDepartmentArgs = {
  code: Scalars['String'];
};


export type MutationAssignCourseToFacultyArgs = {
  input: AssignCourseToFacultyInputType;
};


export type MutationAddCourseArgs = {
  input: AddCourseInputType;
};


export type MutationAddClassScheduleArgs = {
  input: AddClassScheduleInputType;
};


export type MutationRegisterAdminArgs = {
  input: RegisterAdminInputType;
};


export type MutationAdminLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type StudentResponse = {
  __typename?: 'StudentResponse';
  errors?: Maybe<Array<FieldError>>;
  student?: Maybe<Student>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
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

export type DepartmentResponse = {
  __typename?: 'DepartmentResponse';
  errors?: Maybe<Array<FieldError>>;
  department?: Maybe<Department>;
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

export type AdminResponse = {
  __typename?: 'AdminResponse';
  errors?: Maybe<Array<FieldError>>;
  admin?: Maybe<Admin>;
};

export type RegisterAdminInputType = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
  token: Scalars['String'];
};

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
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
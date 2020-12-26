import { useRouter } from "next/router";

const Comment = () => {
  const router = useRouter();
  const { departmentCode, session } = router.query;

  return (
    <>
      <h1>Department: {departmentCode}</h1>
      <h1>Session: {session}</h1>
    </>
  );
};

export default Comment;

import { useRouter } from "next/router";
import { lesson1 } from "../../../../../store/data";

export default function Question() {
  const router = useRouter();
  const { question } = router.query;

  if (question) {
    const data = lesson1.questions[question - 1];
    return <div>{JSON.stringify(data)}</div>;
  }
  return null;
}

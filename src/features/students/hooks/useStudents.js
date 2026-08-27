import { useQuery } from "@tanstack/react-query";
import { studentApi } from "../../../api/students";

export function useStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: studentApi.listStudents,
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { studentApi } from "../../../api/students";
import notify from "../../../utils/toast";

export function useStudentMutations() {
  const queryClient = useQueryClient();

  const onCreate = useMutation({
    mutationFn: studentApi.createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
      notify.success("Student created successfully!");
    },
  });

  const onUpdate = useMutation({
    mutationFn: ({ id, payload, role }) => {
      if (role === "student") {
        return studentApi.updateMyProfile(payload);
      }
      return studentApi.updateStudent(id, payload);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["students"]);
      if (variables.role === "student") {
        queryClient.invalidateQueries(["students", "me"]);
      }
      notify.success("Student updated successfully!");
    },
  });

  return { onCreate, onUpdate };
}

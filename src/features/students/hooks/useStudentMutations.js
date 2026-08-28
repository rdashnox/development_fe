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
    mutationFn: ({ id, payload }) => studentApi.updateStudent(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
      notify.success("Student updated successfully!");
    },
  });

  return { onCreate, onUpdate };
}

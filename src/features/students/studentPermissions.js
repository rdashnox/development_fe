export function getStudentManagementPermissions(role) {
  const isAdministrator = role === "administrator";
  const isCoordinator = role === "internship_coordinator";
  const isFaculty = role === "faculty_adviser";

  return {
    canView: isAdministrator || isCoordinator || isFaculty,
    canCreate: isAdministrator || isCoordinator,
    canUpdate: isAdministrator || isCoordinator,
  };
}

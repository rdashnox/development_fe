import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StudentForm from "./StudentForm";
import { MODES } from "../form/formConfig";

export default function StudentModal({
  open,
  onClose,
  disablePortal = false,
  mode: initialMode = MODES.VIEW,
  student = null,
  permissions,
  onSuccess,
  onCreate,
  onUpdate,
  isStudent,
}) {
  const [mode, setMode] = useState(initialMode);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleEditBtnPressed = () => setMode(MODES.EDIT);
  const handleCancelBtnPressed = () => {
    setError(null);
    setMode(MODES.VIEW);
  };

  const handleSubmitButtonPressed = () => {
    setIsSaving(true);
    document.getElementById("student-form")?.requestSubmit();
  };

  const handleSubmit = async (data) => {
    setError(null);
    try {
      if (mode === MODES.CREATE) {
        await onCreate?.(data);
        onSuccess?.("Student created successfully!");
      } else {
        await onUpdate?.({ id: student.id, payload: data });
        onSuccess?.("Student updated successfully!");
      }
      setIsSaving(false);
      onClose();
    } catch (submitError) {
      setIsSaving(false);
      setError(submitError.response?.data?.message || "Unable to save student.");
    }
  };

  const canEdit = permissions?.canUpdate;
  const canCreate = permissions?.canCreate;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      disablePortal={disablePortal}
    >
      <DialogTitle>
        {mode === MODES.VIEW
          ? "View Student"
          : mode === MODES.EDIT
            ? "Edit Student"
            : "Create Student"}

        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {error && <Alert severity="error">{error}</Alert>}
        <StudentForm
          key={mode}
          mode={mode}
          isStudent={isStudent}
          defaultValues={student || {}}
          onSubmit={handleSubmit}
          onInvalid={(errors) => console.log("FORM VALIDATION ERRORS:", errors)}
        />
      </DialogContent>

      <DialogActions>
        {mode === MODES.VIEW && canEdit && (
          <Button onClick={handleEditBtnPressed} variant="contained">
            Edit
          </Button>
        )}

        {mode !== MODES.VIEW && (
          <>
            <Button onClick={mode === MODES.CREATE ? onClose : handleCancelBtnPressed} disabled={isSaving}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmitButtonPressed}
              color="success"
              variant="contained"
              disabled={isSaving}
              startIcon={isSaving ? <CircularProgress size={20} /> : null}
            >
              {mode === MODES.CREATE ? "Submit" : "Save"}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

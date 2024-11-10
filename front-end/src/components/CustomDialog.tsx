// src/components/CustomDialog.jsx
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";

export type CustomeDialogModel = {
  isOpen: boolean
  content?: JSX.Element
  confirmButtonLabel?: string
  cancelButtonLabel?: string
  onConfirm: any
  onCancel?: any
}
const CustomDialog = ({
  isOpen,
  content,
  confirmButtonLabel,
  cancelButtonLabel,
  onConfirm,
  onCancel,
}: CustomeDialogModel) => {
  return (
    <React.Fragment>
      {/* Dialogコンポーネントの利用 */}
      <Dialog
        open={isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          top: "-65%",
          left: "0%",
        }}
      >
        {/* DialogContentコンポーネントの利用 */}
        <DialogContent>
          {/* DialogContentTextコンポーネントの利用 */}
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontSize: "25px", textAlign: "center" }}
          >
            {content}
          </DialogContentText>
        </DialogContent>

        {/* DialogActionsコンポーネントの利用 */}
        <DialogActions>
          {/* Buttonコンポーネントの利用 */}

          <Stack spacing={2} direction="row">
            {onCancel !== undefined &&
              <Button variant="outlined" size="small" onClick={onCancel} sx={{ fontSize: "14px" }} color="secondary">
                {cancelButtonLabel}
              </Button>
            }
            <Button variant="contained" size="small" onClick={onConfirm} sx={{ fontSize: "14px" }} color="primary">
              {confirmButtonLabel}
            </Button>
          </Stack>

        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default CustomDialog;
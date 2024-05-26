import Modal from "@mui/material/Modal";
import { keyframes } from "@mui/styled-engine";
import { styled } from "@mui/material/styles";

import useMobileView from "../hooks/useMobileView";

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
`;

const StyledDiv = styled("div")(() => ({
  position: "absolute",
  // top: "20%",
  bottom: 0,
  width: "100%",
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
  animation: `${slideUp} 0.2s cubic-bezier(0.5, 0, 0.1, 1) forwards`,
  overflowY: "scroll",
  borderRadius: "24px 24px 0px 0px",
  // Remove focus outline
  "&:focus": {
    outline: "none",
  },
}));

const StyledPCDiv = styled("div")(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  // border: '2px solid #000',
  borderRadius: "1rem",
  boxShadow: 24,
  // Remove focus outline
  "&:focus": {
    outline: "none",
  },
}));

export const ModelPopup = (props) => {
  const { open, setOpen, children } = props;

  const isMobileView = useMobileView();

  return (
    <Modal
      open={open}
      sx={{ '& .MuiBackdrop-root': { backgroundColor: '#000000c4' } }}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {isMobileView ? (
        <StyledDiv>{children}</StyledDiv>
      ) : (
        <StyledPCDiv>{children}</StyledPCDiv>
      )}
    </Modal>
  );
}
export default ModelPopup
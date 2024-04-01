import { Close } from "@mui/icons-material";
import { Children, Dispatch, SetStateAction } from "react";
interface ModalBaseProps {
  close: Dispatch<SetStateAction<boolean>>;
  header: string;
  details: string;
  confirm: Dispatch<SetStateAction<boolean>>;
}
export default function ModalBase({
  close,
  header,
  details,
  confirm,
}: ModalBaseProps) {

  return (
    <section>
      <div>
        <div>
          <Close onClick={() => close(false)}/>
        </div>
        <div>
          <h2>{header}</h2>
          <p>{details}</p>
        </div>
        <div>
          <div>
            <button onClick={() => close(false)}>Cancel</button>
          </div>
          <div>
            <button onClick={() => confirm(true)}>Confirm</button>
          </div>
        </div>
      </div>
    </section>
  );
}

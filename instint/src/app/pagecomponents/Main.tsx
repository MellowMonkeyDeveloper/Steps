"use client";

import ButtonIconInstint from "@/components/button/ButtonIconInstint";
import { Wallet } from "@mui/icons-material";
import icon from "../../../styles/icon.module.scss";
import { buttonIconStyles } from "../styles_objects/ButtonInstint";
export default function Main() {
  return (
    <div>
      <ButtonIconInstint
        content="Click"
        icon={<Wallet className={icon.iconBrandStandard} />}
        theme='Brand'
        buttonStyles={buttonIconStyles.button}
        spanStyles={buttonIconStyles.span}
        darkInstint={false}
      />
    </div>
  );
}

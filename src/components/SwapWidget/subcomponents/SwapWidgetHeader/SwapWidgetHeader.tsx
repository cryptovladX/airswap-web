import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { RFQ_EXPIRY_BUFFER_MS } from "../../../../constants/configParams";
import { ProtocolType } from "../../../../features/transactions/transactionsSlice";
import Timer from "../../../Timer/Timer";
import { Title } from "../../../Typography/Typography";
import {
  Button,
  Container,
  NewQuoteText,
  Quote,
  StyledIcon,
} from "./SwapWidgetHeader.styles";

interface SwapWidgetHeaderProps {
  title: string;
  isQuote: boolean;
  onGasFreeTradeButtonClick: () => void;
  protocol?: ProtocolType;
  expiry?: string;
}

const SwapWidgetHeader: FC<SwapWidgetHeaderProps> = ({
  title,
  isQuote,
  onGasFreeTradeButtonClick,
  protocol,
  expiry,
}) => {
  const { t } = useTranslation();

  const expiryTime = useMemo(() => {
    return expiry ? parseInt(expiry) - RFQ_EXPIRY_BUFFER_MS / 1000 : undefined;
  }, [expiry]);

  return (
    <Container>
      <Title type="h2">{title}</Title>

      {protocol === "last-look" && isQuote && (
        <Button onClick={onGasFreeTradeButtonClick}>
          <StyledIcon name="star" iconSize={0.875} />
          {t("orders.gasFreeTrade")}
        </Button>
      )}

      {protocol === "request-for-quote" && isQuote && (
        <Quote>
          <NewQuoteText>{t("orders.newQuoteIn")}</NewQuoteText>
          {expiryTime && <Timer expiryTime={expiryTime} />}
        </Quote>
      )}
    </Container>
  );
};

export default SwapWidgetHeader;

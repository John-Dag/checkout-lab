import { VisaIcon, MastercardIcon, AmexIcon, DiscoverIcon } from '../components/ui/icons/cards';

const ICON_SIZE = 28;

export const cardIcons: Record<string, React.ReactNode> = {
  visa: <VisaIcon size={ICON_SIZE} />,
  mastercard: <MastercardIcon size={ICON_SIZE} />,
  amex: <AmexIcon size={ICON_SIZE} />,
  discover: <DiscoverIcon size={ICON_SIZE} />,
};

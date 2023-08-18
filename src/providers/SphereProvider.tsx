import { PaymentLinkStoreFetchWrapper } from "@spherelabs/react-private";

export interface SphereProviderProps {
  children: React.ReactNode;
  paymentLinkId: string;
  apiOrigin?: string;
}

export const SphereProvider = ({
  children,
  paymentLinkId,
  apiOrigin,
}: SphereProviderProps) => {
  return (
    <PaymentLinkStoreFetchWrapper
      apiOrigin={apiOrigin}
      paymentLinkId={paymentLinkId}
    >
      {children}
    </PaymentLinkStoreFetchWrapper>
  );
};

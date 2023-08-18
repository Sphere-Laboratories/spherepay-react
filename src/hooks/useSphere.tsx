import { useConnection } from "@solana/wallet-adapter-react";
import { usePaymentLinkStore, useSubtotal } from "@spherelabs/react-private";
import { useCallback } from "react";
import { shallow } from "zustand/shallow";
import { useStoreWithEqualityFn } from "zustand/traditional";

export type SetLineItemQuantity = (
  newQuantity: number,
  lineItemId?: string
) => void;

export const useSphere = () => {
  const { connection } = useConnection();
  const store = usePaymentLinkStore();
  const { lineItems, setFieldValue, submitForm } = useStoreWithEqualityFn(
    store,
    (state) => ({
      lineItems: state.lineItems,
      setFieldValue: state.formik.setFieldValue,
      submitForm: state.formik.submitForm,
    }),
    shallow
  );

  const pay = useCallback(async () => {
    const txId = await submitForm();
    const status = await connection.confirmTransaction(txId, "confirmed");
    return status;
  }, [connection, submitForm]);

  const subtotal = useSubtotal();

  /**
   * Set the quantity of a line item.
   * @param newQuantity The new quantity of the line item.
   * @param lineItemId The id of the line item to update. If no id is provided, the first line item will be updated.
   */
  const setLineItemQuantity: SetLineItemQuantity = useCallback(
    (newQuantity: number, lineItemId?: string) => {
      if (lineItems) {
        const lineItemIndex =
          lineItemId === undefined
            ? 0 // if no lineItemId is provided, we assume that we are updating the first line item
            : lineItems.findIndex((lineItem) => lineItem.id === lineItemId);

        if (lineItemIndex < 0) {
          throw new Error(`Line item with id ${lineItemId} does not exist!`);
        }

        setFieldValue(`quantities[${lineItemIndex}]`, newQuantity);
      }
    },
    [setFieldValue, lineItems]
  );

  return {
    lineItems,
    setLineItemQuantity,
    subtotal,
    pay,
  };
};

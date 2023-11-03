import styles from "./cancel-booking-popup.module.scss";

import { VscChromeClose } from "react-icons/vsc";
import WithBackdrop from "#components/with-backdrop/with-backdrop";
import { connect } from "react-redux";
import { pushFlash } from "#redux/flash/flash.actions";
import { useMutation } from "@tanstack/react-query";
import { cancellBooking } from "#api/bookings.req";

function CancelBookingPopup({ bookingId, pushFlash, close }) {
  const cancelBookingMutation = useMutation({
    mutationFn: async () => {
      const response = await cancellBooking(bookingId);
      return response?.data;
    },
    onSuccess: (data) => {
      console.log({ data });
      pushFlash({
        type: "success",
        message: "Booking Cancelled Successfully",
      });
      close();
    },
    onError: (error) => {
      console.error({ error });
      pushFlash({
        type: "error",
        message: "Something went wrong",
      });
    },
  });
  return (
    <>
      <WithBackdrop close={close}>
        <div
          className={styles.cancelBookingPopup}
          onClick={(e) => e.stopPropagation()}
        >
          <button type="button" className={styles.closeBtn} onClick={close}>
            <VscChromeClose className={styles.icon} />
          </button>
          <h3>Cancel Booking</h3>
          <p>Are you sure you want to cancel this booking?</p>
          <div className={styles.btnContainer}>
            <button className={styles.outlinedBtn} onClick={close}>
              Keep this booking
            </button>
            <button
              className={styles.cancelBtn}
              onClick={cancelBookingMutation.mutate}
            >
              Cancel this booking
            </button>
          </div>
        </div>
      </WithBackdrop>
    </>
  );
}

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapState, { pushFlash })(CancelBookingPopup);

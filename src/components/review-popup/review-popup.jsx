import styles from "./review-popup.module.scss";

import { useEffect, useState } from "react";
import { AiOutlineStar, AiFillStar, AiOutlineClose } from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";
import WithBackdrop from "#components/with-backdrop/with-backdrop";
import CustomButton from "#components/custom-button/custom-button";
import Textbox from "#components/textbox/textbox";
import { useReviewWindow } from "#contexts/review-window.context";
import { connect } from "react-redux";
import { pushFlash } from "#redux/flash/flash.actions";
import { useMutation } from "@tanstack/react-query";
import { addReview } from "#api/review.req";
import { useForm } from "react-hook-form";
import ImageInput from "#components/image-input/image-input";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  // "image/svg+xml",
];

function ReviewPopup({ currentUser, pushFlash }) {
  const { propertyReviewing, closeReviewWindow } = useReviewWindow();
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);

  const { register, handleSubmit, reset } = useForm();

  const reviewMutation = useMutation({
    mutationFn: async (data) => {
      if (!rating) throw new Error("rating required");
      const formData = new FormData();
      formData.append("propertyId", propertyReviewing);
      formData.append("rating", rating);
      if (data?.comment) formData.append("comment", data.comment);

      if (images?.length)
        images.forEach((image) => {
          formData.append("images", image);
        });
      const response = await addReview(formData);
      return response?.data;
    },
    onSuccess: (data) => {
      console.log({ data });
      closeReviewWindow();
      pushFlash({
        type: "success",
        message: "Review Added Successfully",
      });
      reset();
      setImages([]);
      setRating(0);
    },
    onError: (error) => {
      console.error({ error });
      if (error?.message == "rating required") {
        pushFlash({
          type: "error",
          message: "Please select a rating",
        });
        return;
      }
      pushFlash({
        type: "error",
        message: "Something went wrong",
      });
    },
  });
  const handleFilesChange = (e) => {
    const file = e?.target?.files?.[0];
    console.log({ file });
    if (!file) return;
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      pushFlash({
        type: "error",
        message:
          "invalid file type, only images of format png | jpg | jpeg  and webp are allowd",
      });
      return;
    }
    if (file.size > 10_000_000) {
      pushFlash({
        type: "error",
        message: "file size exceeded maximum file size 10 MB",
      });
      return;
    }
    setImages((prevState) => [...prevState, file]);
  };
  const removeImage = (idx) => {
    setImages((prevState) => prevState.filter((_, fileIdx) => idx !== fileIdx));
  };

  return (
    <>
      {propertyReviewing && (
        <WithBackdrop close={closeReviewWindow}>
          <form
            onClick={(e) => e.stopPropagation()}
            className={styles.reviewPopup}
            onSubmit={handleSubmit(reviewMutation.mutate)}
          >
            <button
              type="button"
              className={styles.closeBtn}
              onClick={closeReviewWindow}
            >
              <VscChromeClose className={styles.icon} />
            </button>
            <h3>Leave a Review</h3>
            <div className={styles.rating}>
              {Array(5)
                .fill()
                .map((_, i) => {
                  const ratingValue = i + 1;
                  return ratingValue <= rating ? (
                    <AiFillStar
                      key={i}
                      className={`${styles.icon} ${styles.filled}`}
                      onClick={() => setRating(ratingValue)}
                    />
                  ) : (
                    <AiOutlineStar
                      className={styles.icon}
                      onClick={() => setRating(ratingValue)}
                    />
                  );
                })}
            </div>
            <div className={styles.userInfo}>
              <img src="/images/user-circle.png" alt="user" />
              <div className={styles.name}>
                <h4>
                  {currentUser?.fName} {currentUser?.lName}
                </h4>
                <p className={styles.labelPublic}>Posting Publicly</p>
              </div>
            </div>
            <Textbox
              placeholder="Write Something..."
              register={{ ...register("comment") }}
            />
            <div className={styles.imagesContainer}>
              {[...Array(images.length + 1 <= 5 ? images.length + 1 : 5)].map(
                (_, idx) => (
                  <ImageInput
                    removeImage={() => removeImage(idx)}
                    image={images?.[idx]}
                    onChange={handleFilesChange}
                  />
                )
              )}
              {/* <input type="file" multiple name="images" /> */}
            </div>
            <CustomButton>Save</CustomButton>
          </form>
        </WithBackdrop>
      )}
    </>
  );
}

const mapState = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapState, { pushFlash })(ReviewPopup);

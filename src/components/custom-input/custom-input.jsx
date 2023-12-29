import styles from "./custom-input.module.scss";
import { forwardRef, useId, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import PropTypes from "prop-types";

// CustomInput.propTypes = {
//   label: PropTypes.string,
//   secondary: PropTypes.bool,
//   transparent: PropTypes.bool,
//   error: PropTypes.string,
//   otp: PropTypes.bool,
//   register: PropTypes.object,
//   bold: PropTypes.bool,
// };
// function CustomInput({
//   label,
//   secondary,
//   transparent,
//   error,
//   otp,
//   register,
//   bold,
//   ...otherProps
// }) {
//   const id = useId();
//   const [show, setShow] = useState(false);
//   function handleTooglePassword() {
//     setShow((show) => !show);
//   }
//   return (
//     <div
//       className={`${styles.customInput} ${secondary ? styles.secondary : ""} ${
//         transparent ? styles.transparent : ""
//       }`}
//     >
//       {label && (
//         <label
//           className={`${styles.label} ${bold ? styles.bold : ""}`}
//           htmlFor={id}
//         >
//           {label}
//         </label>
//       )}
//       <div className={styles.inputContainer}>
//         <input
//           className={`${styles.input} ${otp ? styles.otp : ""}`}
//           id={id}
//           {...register}
//           {...otherProps}
//           type={
//             otherProps?.type === "password"
//               ? show
//                 ? "text"
//                 : "password"
//               : otherProps?.type
//           }
//         />
//         {otherProps?.type === "password" && (
//           <div onClick={handleTooglePassword} className={styles.toggleShow}>
//             {show ? (
//               <div className={styles.togglePassword}>
//                 <AiOutlineEyeInvisible className={styles.eyeLogo} />
//               </div>
//             ) : (
//               <div className={styles.togglePassword}>
//                 <AiOutlineEye className={styles.eyeLogo} />
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//       {error && <p className={styles.error}>{error}</p>}
//     </div>
//   );
// }
const CustomInput = forwardRef(
  (
    {
      label,
      secondary,
      transparent,
      error,
      otp,
      register,
      bold,
      ...otherProps
    },
    ref
  ) => {
    const id = useId();
    const [show, setShow] = useState(false);
    function handleTooglePassword() {
      setShow((show) => !show);
    }
    return (
      <div
        className={`${styles.customInput} ${
          secondary ? styles.secondary : ""
        } ${transparent ? styles.transparent : ""}`}
      >
        {label && (
          <label
            className={`${styles.label} ${bold ? styles.bold : ""}`}
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <div className={styles.inputContainer}>
          <input
            {...(ref ? { ref } : {})}
            className={`${styles.input} ${otp ? styles.otp : ""}`}
            id={id}
            {...register}
            {...otherProps}
            type={
              otherProps?.type === "password"
                ? show
                  ? "text"
                  : "password"
                : otherProps?.type
            }
          />
          {otherProps?.type === "password" && (
            <div onClick={handleTooglePassword} className={styles.toggleShow}>
              {show ? (
                <div className={styles.togglePassword}>
                  <AiOutlineEyeInvisible className={styles.eyeLogo} />
                </div>
              ) : (
                <div className={styles.togglePassword}>
                  <AiOutlineEye className={styles.eyeLogo} />
                </div>
              )}
            </div>
          )}
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  }
);

export default CustomInput;

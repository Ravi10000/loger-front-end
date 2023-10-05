import FlashActionTypes from "./flash.types";

export const pushFlash = ({ message, type }) => ({
  type: FlashActionTypes.PUSH_FLASH,
  payload: { message, type },
});

export const clearFlash = (id) => ({
  type: FlashActionTypes.CLEAR_FLASH,
  payload: id,
});

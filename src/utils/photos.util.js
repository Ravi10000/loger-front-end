function reorderPhotos(photos) {
  let newPhotos = [...photos];
  const mainPhotoIdx = newPhotos?.findIndex((photo) => photo?.isMain);
  let mainPhoto = null;
  if (mainPhotoIdx > -1) mainPhoto = newPhotos.splice(mainPhotoIdx, 1);
  if (mainPhoto) newPhotos = [mainPhoto[0], ...newPhotos];
  return newPhotos;
}

function extractPhotUrls(photos) {
  const photoUrls = photos?.map((photo) => photo?.photoUrl);
  return photoUrls;
}

export { reorderPhotos, extractPhotUrls };

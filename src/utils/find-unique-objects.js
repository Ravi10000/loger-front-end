export default function findUniqueObjects(arrayOfObjects) {
  const uniqueObjects = {};

  arrayOfObjects.forEach((currentObject) => {
    // const currentObject = arrayOfObjects[i];
    if (!uniqueObjects.hasOwnProperty(currentObject.name))
      uniqueObjects[currentObject.name] = {
        ...currentObject,
        roomCount: 1,
      };
    else
      uniqueObjects[currentObject.name] = {
        ...currentObject,
        roomCount: uniqueObjects[currentObject.name].roomCount + 1,
      };
  });

  // for (let i = 0; i < arrayOfObjects.length; i++) {
  //   const currentObject = arrayOfObjects[i];
  //   if (!uniqueObjects.hasOwnProperty(currentObject.name))
  //     uniqueObjects[currentObject.name] = {
  //       ...currentObject,
  //       roomCount: 1,
  //     };
  //   else
  //     uniqueObjects[currentObject.name] = {
  //       ...currentObject,
  //       roomCount: uniqueObjects[currentObject.name].roomCount + 1,
  //     };
  // }
  return Object.keys(uniqueObjects).map((key) => uniqueObjects[key]);
}

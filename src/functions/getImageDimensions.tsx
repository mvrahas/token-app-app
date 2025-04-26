const getImageDimensions = (file : File) : Promise<ImageDimensions> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      }
      img.onerror = (error) => {
        reject(error)
      }
      img.src = URL.createObjectURL(file);
    })
}
export default getImageDimensions
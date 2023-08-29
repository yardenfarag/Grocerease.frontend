
export const uploadService = {
    uploadImg
}

async function uploadImg(ev: React.ChangeEvent<HTMLInputElement>): Promise<string> {
    const CLOUD_NAME = "dfz8mxb4f"
    const UPLOAD_PRESET = "nytsfnhl"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  
    const formData = new FormData()
    formData.append('upload_preset', UPLOAD_PRESET)
    if (ev.target.files) {
      formData.append('file', ev.target.files[0])
    }
  
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        });
        const res_1 = await res.json() as string
        return res_1
    } catch (err) {
        console.error(err)
        throw err
    }
  }
  
from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url

def upload_image_to_cloudinary(image_file, username):
    # Upload the image with cache invalidation
    upload_response = upload(
        image_file,
        public_id=username,
        unique_filename=False,
        overwrite=True,
        invalidate=True
    )

    # Extract version from response to force cache refresh
    version = upload_response.get("version")
    srcURL = cloudinary_url(username, version=version)[0]

    return srcURL

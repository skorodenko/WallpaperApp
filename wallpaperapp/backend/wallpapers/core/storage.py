from storages.backends.s3boto3 import S3Boto3Storage


class MinioWallpaperStorage(S3Boto3Storage):
    location = "wallpapers"
    file_overwrite = False
from storages.backends.s3boto3 import S3Boto3Storage


class MinioWallpaperStorage(S3Boto3Storage):
    file_overwrite = False
    default_acl = 'public-read'
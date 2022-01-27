package products

import (
	"mime/multipart"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/cdgn-coding/antilope-ecommerce/ecommece-backend/src/clients"
)

func uploadFileToS3(key string, file multipart.File) error {
	bucket := os.Getenv("PRODUCTS_BUCKET_ID")
	s3Client := clients.GetS3Client()

	objectInput := s3.PutObjectInput{
		Bucket:      aws.String(bucket),
		Key:         aws.String(key),
		ACL:         aws.String("public-read"),
		ContentType: aws.String("image/jpeg"),
		Body:        file,
	}

	_, err := s3Client.PutObject(&objectInput)
	return err
}

package clients

import (
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

func GetS3Client() *s3.S3 {
	const localEndpoint = "http://localhost:4566"

	if os.Getenv("env") == "local" {
		config := aws.Config{
			Endpoint:         aws.String(localEndpoint),
			Region:           aws.String("us-east-1"),
			S3ForcePathStyle: aws.Bool(true),
		}
		session := session.Must(session.NewSession())
		return s3.New(session, &config)
	}

	options := session.Options{SharedConfigState: session.SharedConfigEnable}
	session := session.Must(session.NewSessionWithOptions(options))
	return s3.New(session)
}

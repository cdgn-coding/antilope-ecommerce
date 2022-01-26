package clients

import (
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/guregu/dynamo"
)

func GetDynamoDBClient() *dynamo.DB {
	if os.Getenv("env") == "local" {
		config := aws.Config{Endpoint: aws.String("http://localhost:8000"), Region: aws.String("us-east-1")}
		session := session.Must(session.NewSession())
		return dynamo.New(session, &config)
	}

	options := session.Options{SharedConfigState: session.SharedConfigEnable}
	session := session.Must(session.NewSessionWithOptions(options))
	return dynamo.New(session)
}

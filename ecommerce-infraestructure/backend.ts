import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const currentStack = pulumi.getStack();
const productsBucket = `${currentStack}-products`;

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket(productsBucket, {
  acl: "public-read",
  policy: pulumi.interpolate`{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "PublicReadGetObject",
                "Effect": "Allow",
                "Principal": "*",
                "Action": [
                    "s3:GetObject"
                ],
                "Resource": [
                    "arn:aws:s3:::${productsBucket}/*"
                ]
            }
        ]
    }`,
});

export const productsBucketId = bucket.id;

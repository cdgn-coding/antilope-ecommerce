import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const currentStack = pulumi.getStack();
const productsBucketName = `${currentStack}-products`;

export const productsBucket = new aws.s3.Bucket(productsBucketName, {
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
                    "arn:aws:s3:::${productsBucketName}/*"
                ]
            }
        ]
    }`,
});

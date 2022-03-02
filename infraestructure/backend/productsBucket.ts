import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

const productsBucketName = `products`;

export const productsBucket = new aws.s3.Bucket(productsBucketName, {
  acl: "public-read",
});

export const productsBucketPolicy = new aws.s3.BucketPolicy(
  productsBucketName,
  {
    bucket: productsBucket.id,
    policy: pulumi.interpolate`{
    "Id": "Policy1646070782890",
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "Stmt1646070780263",
        "Action": [
          "s3:GetObject"
        ],
        "Effect": "Allow",
        "Resource": "${productsBucket.arn}/*",
        "Principal": "*"
      }
    ]
  }`,
  }
);

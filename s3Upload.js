const AWS = require("aws-sdk");
const { uid } = require("uid");

const s3 = new AWS.S3();

const Bucket = "tvs-comp";

// exports.handler = async (event) => {
const uploadPdf = async (event) => {
  const Key = uid(16);

  const upload_pdf = await s3
    .upload({
      Bucket,
      Key,
      Body: new Uint8Array(event.arrayBuffer),
      ContentType: "application/pdf",
    })
    .promise();

  const response = {
    statusCode: 200,
    body: {
      key: upload_pdf["Key"],
      url: upload_pdf["Location"],
    },
  };
  return response;
};

const getPdfFromS3 = async (event) => {
  console.log(event);
  const params = {
    Bucket,
    Key: event.Key,
  };
  const res = await s3.getObject(params).promise();

  const response = {
    statusCode: 200,
    body: res,
  };
  return response;
};

module.exports.uploadPdf = uploadPdf;
module.exports.getPdf = getPdfFromS3;

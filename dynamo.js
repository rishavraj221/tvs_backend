const AWS = require("aws-sdk");
const { uid } = require("uid");

AWS.config.update({ region: "ap-south-1" });

const db = new AWS.DynamoDB();

const TableName = "tvs_comp";

const updatePdf = async (event) => {
  const pdfID = uid(16);

  console.log(event);

  const params = {
    TableName,
    Item: {
      id: { S: event.id || pdfID },
      emp_id: { S: event.emp_id },
      fileName: { S: event.fileName },
      approval: { S: "" },
      s3Data: { S: event.s3Data },
      saved: { BOOL: true },
    },
  };

  const res = await db.putItem(params).promise();

  console.log(res);

  const response = {
    statusCode: 200,
    body: { pdfID },
  };
  return response;
};

const scanAllPdfs = async () => {
  const params = {
    TableName,
  };

  const res = await db.scan(params).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify(res),
  };
  return response;
};

module.exports.updatePdf = updatePdf;
module.exports.scanAllPdfs = scanAllPdfs;

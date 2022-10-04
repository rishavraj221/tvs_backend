const AWS = require("aws-sdk");
const { uid } = require("uid");

AWS.config.update({ region: "ap-south-1" });

const db = new AWS.DynamoDB();

const TableName = "tvs_comp";
const TableNameNE = "tvs_pdfs";

const updatePdf = async (event) => {
  const pdfID = event.id || uid(16);

  const params = {
    TableName,
    Item: {
      id: { S: pdfID },
      emp_id: { S: event.emp_id },
      fileName: { S: event.fileName },
      content: { S: event.content },
    },
  };

  const res = await db.putItem(params).promise();

  const response = {
    statusCode: 200,
    body: { pdfID },
  };
  return response;
};

const updateNEPdf = async (event) => {
  const pdfID = event.id;

  const params = {
    TableName: TableNameNE,
    Item: {
      id: { S: pdfID },
      emp_id: { S: event.emp_id },
      fileName: { S: event.fileName },
      s3Data: { S: event.s3Data },
      approval: { S: event.approval },
    },
  };

  const res = await db.putItem(params).promise();

  const response = {
    statusCode: 200,
    body: "done",
  };

  return response;
};

const updateNEPdfApproval = async (event) => {
  const pdfID = event.id;

  var query_params = {
    Key: {
      id: { S: pdfID },
    },
    TableName: TableNameNE,
  };

  const res = await db.getItem(query_params).promise();
  const { approval, ...restItem } = res["Item"];

  const params = {
    TableName: TableNameNE,
    Item: { ...restItem, approval: { S: event.approval } },
  };

  const res2 = await db.putItem(params).promise();

  const response = {
    statusCode: 200,
    body: "done",
  };

  return response;
};

const scanSavedPdfs = async () => {
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

const scanNEPdfs = async () => {
  const params = {
    TableName: TableNameNE,
  };

  const res = await db.scan(params).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify(res),
  };
  return response;
};

module.exports.updatePdf = updatePdf;
module.exports.scanSavedPdfs = scanSavedPdfs;
module.exports.updateNEPdf = updateNEPdf;
module.exports.updateNEPdfApproval = updateNEPdfApproval;
module.exports.scanNEPdfs = scanNEPdfs;

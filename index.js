const html_to_pdf = require("html-pdf-node");

const options = { format: "A4" };
// Example of options with args //
// let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

// exports.handler = async (event) => {
const main_func = async (event) => {
  const file = { content: event.content };

  const res = await html_to_pdf.generatePdf(file, options);

  const response = {
    statusCode: 200,
    body: JSON.stringify(res),
  };
  return response;
};

module.exports.main_func = main_func;

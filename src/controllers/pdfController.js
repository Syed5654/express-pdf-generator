const { htmlToPdfBuffer } = require("../services/pdfService");

const getHtmlFromRequest = (req) => {
  if (typeof req.body === "string") {
    return req.body;
  }

  if (req.body && typeof req.body.html === "string") {
    return req.body.html;
  }

  return "";
};

const generatePdf = async (req, res, next) => {
  try {
    const html = getHtmlFromRequest(req);

    if (!html.trim()) {
      return res.status(400).json({
        message:
          "HTML is required. Send raw HTML text body or JSON body with { \"html\": \"...\" }.",
      });
    }

    const pdfBuffer = await htmlToPdfBuffer(html);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=generated.pdf");
    return res.status(200).send(pdfBuffer);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  generatePdf,
};

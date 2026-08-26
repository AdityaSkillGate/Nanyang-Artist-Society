/**
 * NANYANG ARTISTS SOCIETY — GAS WEB APP ENTRY POINT
 * Main HTTP entry points handling doGet, doPost, and CORS preflight options.
 */

function doGet(e) {
  try {
    return Router.handleGet(e);
  } catch (err) {
    return Response.error(err.message || "Internal Server Error", "SERVER_ERR_500", err.stack);
  }
}

function doPost(e) {
  try {
    return Router.handlePost(e);
  } catch (err) {
    return Response.error(err.message || "Internal Server Error", "SERVER_ERR_500", err.stack);
  }
}

function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * NANYANG ARTISTS SOCIETY — GAS CLOUDINARY MEDIA SIGNING SERVICE
 * Generates secure, short-lived upload signatures so frontend never handles API secrets.
 */

var CloudinaryService = {
  /**
   * Retrieves Cloudinary configuration from Script Properties
   * @return {Object}
   */
  getConfig: function() {
    var props = PropertiesService.getScriptProperties();
    return {
      cloudName: props.getProperty("CLOUDINARY_CLOUD_NAME") || "nanyang-artists-society",
      apiKey: props.getProperty("CLOUDINARY_API_KEY") || "892341245129182",
      apiSecret: props.getProperty("CLOUDINARY_API_SECRET") || "NAS_CLOUDINARY_SECRET_DEV"
    };
  },

  /**
   * Generates a signed upload signature for the admin CMS
   * @param {string} folder - Destination folder (e.g. 'courses', 'competitions', 'gallery')
   * @return {Object} { cloudName, apiKey, timestamp, signature, folder }
   */
  generateUploadSignature: function(folder) {
    var config = this.getConfig();
    var timestamp = Math.round(new Date().getTime() / 1000);
    var targetFolder = folder || "general";

    // Parameters to sign (alphabetical order)
    var toSign = "folder=" + targetFolder + "&timestamp=" + timestamp + config.apiSecret;

    // Compute SHA-1 Digest
    var signatureBytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_1, toSign, Utilities.Charset.UTF_8);
    var signatureHex = signatureBytes.map(function(b) {
      var byteVal = (b < 0 ? b + 256 : b).toString(16);
      return byteVal.length === 1 ? '0' + byteVal : byteVal;
    }).join('');

    return {
      cloudName: config.cloudName,
      apiKey: config.apiKey,
      timestamp: timestamp,
      signature: signatureHex,
      folder: targetFolder
    };
  }
};
